import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

type ChatMessage = {
  role?: string;
  content?: string;
  text?: string;
};

function getMessageText(message: ChatMessage): string {
  return String(message.content || message.text || "").trim();
}

function getSearchWords(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9₹]+/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1);
}

function publicImageUrl(storagePath: string | null | undefined): string {
  if (!storagePath) return "";
  if (/^https?:\/\//i.test(storagePath)) return storagePath;

  const { data } = (globalThis as any).__supabaseStorage
    .from("product-images")
    .getPublicUrl(storagePath);

  return data?.publicUrl || "";
}

export default {
  fetch: withSupabase(
    { auth: ["publishable", "secret"] },
    async (req, ctx) => {
      try {
        if (req.method !== "POST") {
          return Response.json(
            { error: "Use POST to send a chat message." },
            { status: 405 },
          );
        }

        const apiKey = Deno.env.get("GEMINI_API_KEY");
        if (!apiKey) {
          return Response.json(
            { error: "The assistant is not configured yet." },
            { status: 503 },
          );
        }

        const body = await req.json();
        const message = String(body.message || "").trim();
        const history = Array.isArray(body.history)
          ? (body.history as ChatMessage[]).slice(-8)
          : [];

        if (!message) {
          return Response.json(
            { error: "Please enter a message." },
            { status: 400 },
          );
        }

        if (message.length > 1000) {
          return Response.json(
            { error: "Please keep your message under 1000 characters." },
            { status: 400 },
          );
        }

        const [
          productsResult,
          categoriesResult,
          variantsResult,
          imagesResult,
          specsResult,
        ] = await Promise.all([
          ctx.supabase
            .from("products")
            .select(
              "id, category_id, name, slug, brand, description, base_price, original_price, status, is_active, is_featured, highlights",
            )
            .eq("is_active", true)
            .eq("status", "active")
            .order("name"),
          ctx.supabase.from("categories").select("id, name, slug"),
          ctx.supabase
            .from("product_variants")
            .select(
              "id, product_id, sku, color_name, color_hex, ram, storage, price, original_price, stock_quantity, is_available",
            ),
          ctx.supabase
            .from("product_images")
            .select("product_id, storage_path, sort_order, is_primary")
            .order("sort_order"),
          ctx.supabase
            .from("product_specifications")
            .select("product_id, group_name, name, value, sort_order")
            .order("sort_order"),
        ]);

        const failedQuery = [
          productsResult,
          categoriesResult,
          variantsResult,
          imagesResult,
          specsResult,
        ].find((result) => result.error);

        if (failedQuery?.error) {
          console.error("Catalogue query failed:", failedQuery.error.message);
          return Response.json(
            { error: "I couldn't load the store catalogue. Please try again." },
            { status: 500 },
          );
        }

        const products = productsResult.data || [];
        const categories = categoriesResult.data || [];
        const variants = variantsResult.data || [];
        const images = imagesResult.data || [];
        const specifications = specsResult.data || [];

        const words = getSearchWords(message);

        const rankedProducts = products
          .map((product) => {
            const category = categories.find(
              (item) => item.id === product.category_id,
            );

            const productVariants = variants.filter(
              (variant) => variant.product_id === product.id,
            );

            const productSpecs = specifications.filter(
              (spec) => spec.product_id === product.id,
            );

            const productImages = images
              .filter((image) => image.product_id === product.id)
              .sort(
                (a, b) =>
                  Number(Boolean(b.is_primary)) - Number(Boolean(a.is_primary)) ||
                  a.sort_order - b.sort_order,
              )
              .map((image) => publicImageUrl(image.storage_path, ctx.supabase.storage))
              .filter(Boolean);

            const searchableText = [
              product.name,
              product.brand,
              product.description,
              category?.name,
              ...(product.highlights || []),
              ...productVariants.flatMap((variant) => [
                variant.color_name,
                variant.ram,
                variant.storage,
              ]),
              ...productSpecs.flatMap((spec) => [spec.name, spec.value]),
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

            const score = words.reduce(
              (total, word) => total + (searchableText.includes(word) ? 1 : 0),
              0,
            );

            return {
              row: product,
              category,
              variants: productVariants,
              specifications: productSpecs,
              images: productImages,
              score,
            };
          })
          .sort(
            (a, b) =>
              b.score - a.score ||
              Number(Boolean(b.row.is_featured)) -
                Number(Boolean(a.row.is_featured)),
          );

        // Send a compact, relevant selection to Gemini instead of the whole database.
        const catalogueForGemini = rankedProducts.slice(0, 12).map((item) => ({
          id: item.row.id,
          name: item.row.name,
          brand: item.row.brand,
          category: item.category?.name || "",
          description: item.row.description || "",
          price: Number(item.row.base_price || 0),
          originalPrice: Number(
            item.row.original_price ?? item.row.base_price ?? 0,
          ),
          highlights: item.row.highlights || [],
          variants: item.variants.map((variant) => ({
            color: variant.color_name || "",
            ram: variant.ram || "",
            storage: variant.storage || "",
            price: Number(variant.price || item.row.base_price || 0),
            inStock: Boolean(variant.is_available) &&
              Number(variant.stock_quantity || 0) > 0,
          })),
          specifications: item.specifications.map((spec) => ({
            group: spec.group_name || "",
            name: spec.name,
            value: spec.value,
          })),
        }));

        const conversation = history
          .map((item) => {
            const text = getMessageText(item);
            if (!text) return null;

            const role = item.role === "assistant" || item.role === "model"
              ? "model"
              : item.role === "user"
              ? "user"
              : null;

            return role
              ? { role, parts: [{ text: text.slice(0, 1000) }] }
              : null;
          })
          .filter(Boolean) as Array<{
            role: "user" | "model";
            parts: Array<{ text: string }>;
          }>;

        conversation.push({
          role: "user",
          parts: [{
            text:
              `Customer message:\n${message}\n\n` +
              `Store catalogue (use only these facts):\n${
                JSON.stringify(catalogueForGemini)
              }\n\n` +
              `Return JSON with exactly these keys: ` +
              `"reply" (a concise, helpful answer) and ` +
              `"recommendedProductIds" (an array of product IDs from the catalogue, maximum 3). ` +
              `If an exact product is unavailable, recommend the closest matching products in the catalogue. ` +
              `Never invent prices, stock, specifications, offers, or products. ` +
              `If the catalogue does not contain the requested fact, say you are unsure and invite the customer to contact the store.`,
          }],
        });

        const model = Deno.env.get("GEMINI_MODEL") || "gemini-3.5-flash-lite";

        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": apiKey,
            },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{
                  text:
                      "You are the helpful product assistant for Muganiyaa-Mobiles in Tenkasi, Tamil Nadu. " +
                      "The chat widget already displays a welcome greeting, so do not start replies with 'Vanakkam', 'Hello', or 'Hi'. Start directly with the answer. " +
                      "Answer in the customer's language when practical. Use only facts present in the supplied store catalogue. " +
                      "Never invent prices, price ranges, stock, specifications, offers, or products. " +
                      "When asked for a category collection, list only matching products found in the catalogue. " +
                      "If the catalogue lacks the requested information, say so and invite the customer to contact the store.",
                }],
              },
              contents: conversation,
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 600,
                responseMimeType: "application/json",
              },
            }),
          },
        );

        if (!geminiResponse.ok) {
          const errorText = await geminiResponse.text();
          console.error("Gemini request failed:", errorText);
          return Response.json(
            { error: "The assistant couldn't respond right now. Please try again." },
            { status: 502 },
          );
        }

        const geminiData = await geminiResponse.json();
        const rawText =
          geminiData.candidates?.[0]?.content?.parts
            ?.map((part: { text?: string }) => part.text || "")
            .join("") || "";

        let aiResult: {
          reply?: string;
          recommendedProductIds?: string[];
        };

        try {
          aiResult = JSON.parse(rawText);
        } catch {
          console.error("Gemini returned invalid JSON.");
          return Response.json(
            { error: "The assistant returned an unreadable response. Please try again." },
            { status: 502 },
          );
        }

        const allowedIds = new Set(catalogueForGemini.map((product) => product.id));
        const recommendedIds = Array.isArray(aiResult.recommendedProductIds)
          ? aiResult.recommendedProductIds
              .filter((id) => allowedIds.has(id))
              .slice(0, 3)
          : [];

        const recommendedProducts = recommendedIds
          .map((id) => rankedProducts.find((item) => item.row.id === id))
          .filter(Boolean)
          .map((item: any) => {
            const productVariants = item.variants.map((variant: any) => ({
              id: variant.id,
              sku: variant.sku || "",
              color: variant.color_name || "",
              ram: variant.ram || "",
              storage: variant.storage || "",
              sellingPrice: Number(
                variant.price || item.row.base_price || 0,
              ),
              originalPrice: Number(
                variant.original_price ??
                  item.row.original_price ??
                  variant.price ??
                  0,
              ),
              stockStatus: variant.is_available &&
                  Number(variant.stock_quantity || 0) > 0
                ? "In Stock"
                : "Out of Stock",
            }));

            const specs = Object.fromEntries(
              item.specifications.map((spec: any) => [
                spec.name,
                spec.value,
              ]),
            );

            return {
              id: item.row.id,
              slug: item.row.slug,
              name: item.row.name,
              brand: item.row.brand || "",
              category: item.category?.name || "",
              description: item.row.description || "",
              sellingPrice: productVariants[0]?.sellingPrice ??
                Number(item.row.base_price || 0),
              originalPrice: Number(
                item.row.original_price ?? item.row.base_price ?? 0,
              ),
              status: "published",
              isFeatured: Boolean(item.row.is_featured),
              highlights: item.row.highlights || [],
              variants: productVariants,
              stockStatus: productVariants.some(
                  (variant: any) => variant.stockStatus === "In Stock",
                )
                ? "In Stock"
                : "Out of Stock",
              specifications: specs,
              images: item.images,
              coverImage: item.images[0] || "",
            };
          });

        return Response.json({
          text: String(aiResult.reply || "How can I help you find a product?"),
          products: recommendedProducts,
          cta: null,
        });
      } catch (error) {
        console.error(
          "Assistant function error:",
          error instanceof Error ? error.message : error,
        );
        return Response.json(
          { error: "Something went wrong. Please try again." },
          { status: 500 },
        );
      }
    },
  ),
};