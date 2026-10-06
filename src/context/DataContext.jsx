import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo
} from 'react';
import {
  loadDatabase,
  saveDatabase,
  resetDatabase
} from '../services/storageService';
import { supabase } from '../services/supabaseClient';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [db, setDb] = useState(() => loadDatabase());

  // Keep the app's local browser data in sync with its current state.
  useEffect(() => {
    saveDatabase(db);
  }, [db]);

  // Load products and their related records from Supabase.
  useEffect(() => {
    if (!supabase) return undefined;

    let cancelled = false;

    async function loadProductsFromSupabase() {
      const [
        { data: categories, error: categoryError },
        { data: products, error: productError },
        { data: specificationRows, error: specificationError },
        { data: imageRows, error: imageError },
        { data: variantRows, error: variantError },
        { data: productOfferRows, error: productOfferError }
      ] = await Promise.all([
        supabase.from('categories').select('id, name, slug'),
        supabase
          .from('products')
          .select(
            'id, category_id, name, slug, brand, description, base_price, status, is_active, is_featured, highlights, model, tagline, original_price, is_latest_launch, is_best_seller, badges'
          )
          .order('name'),
        supabase
          .from('product_specifications')
          .select('product_id, group_name, name, value, sort_order')
          .order('sort_order'),
        supabase
          .from('product_images')
          .select('product_id, storage_path, sort_order, is_primary')
          .order('sort_order'),
        supabase
          .from('product_variants')
          .select(
            'id, product_id, sku, color_name, color_hex, ram, storage, price, original_price, stock_quantity, is_available'
          ),
        supabase.from('product_offers').select('product_id, offer_id')
      ]);

      if (categoryError) throw categoryError;
      if (productError) throw productError;
      if (specificationError) throw specificationError;
      if (imageError) throw imageError;
      if (variantError) throw variantError;
      if (productOfferError) throw productOfferError;
      if (cancelled) return;

      const categoryById = new Map(
        (categories || []).map((category) => [category.id, category])
      );

      const specificationsByProductId = new Map();
      for (const row of specificationRows || []) {
        const entry = specificationsByProductId.get(row.product_id) || {
          values: {},
          groupName: row.group_name || ''
        };
        entry.values[row.name] = row.value;
        specificationsByProductId.set(row.product_id, entry);
      }

      const imagesByProductId = new Map();
      for (const row of imageRows || []) {
        const images = imagesByProductId.get(row.product_id) || [];
        images.push(row);
        imagesByProductId.set(row.product_id, images);
      }

      const variantsByProductId = new Map();
      for (const row of variantRows || []) {
        const variants = variantsByProductId.get(row.product_id) || [];
        variants.push(row);
        variantsByProductId.set(row.product_id, variants);
      }

      const offersByProductId = new Map();
      for (const row of productOfferRows || []) {
        const offerIds = offersByProductId.get(row.product_id) || [];
        offerIds.push(row.offer_id);
        offersByProductId.set(row.product_id, offerIds);
      }

      setDb((previousDb) => {
        const localProductBySlug = new Map(
          (previousDb.products || []).map((product) => [product.slug, product])
        );

        const loadedProducts = (products || []).map((row) => {
          const category = categoryById.get(row.category_id);
          const localProduct = localProductBySlug.get(row.slug);
          const productImages = imagesByProductId.get(row.id) || [];
          const savedVariants = variantsByProductId.get(row.id) || [];
          const savedSpecifications =
            specificationsByProductId.get(row.id);

          const imageUrls = productImages
            .map((image) => image.storage_path)
            .filter(Boolean);

          const variants = savedVariants.map((variant) => {
            const localVariant = (localProduct?.variants || []).find(
              (item) => item.sku === variant.sku
            );

            return {
              ...localVariant,
              id: variant.id,
              sku: variant.sku || '',
              color: variant.color_name || '',
              ram: variant.ram || '',
              storage: variant.storage || '',
              sellingPrice: Number(variant.price || 0),
              originalPrice: Number(
                variant.original_price ?? localVariant?.originalPrice ?? variant.price ?? 0
              ),
              stockStatus:
                variant.is_available && variant.stock_quantity > 0
                  ? 'In Stock'
                  : 'Out of Stock'
            };
          });

          const colors = [
            ...new Map(
              savedVariants
                .filter((variant) => variant.color_name)
                .map((variant) => [
                  variant.color_name,
                  {
                    name: variant.color_name,
                    hex: variant.color_hex || '#000000'
                  }
                ])
            ).values()
          ];

          const specEntry = savedSpecifications;

          return {
            ...localProduct,
            id: row.id,
            name: row.name,
            slug: row.slug,
            brand: row.brand || '',
            model: row.model || '',
            tagline: row.tagline || '',
            description: row.description || '',
            category: category?.name || localProduct?.category || '',
            categorySlug: category?.slug || localProduct?.categorySlug || '',
            sellingPrice: Number(row.base_price || 0),
            originalPrice:
              row.original_price == null
                ? Number(row.base_price || 0)
                : Number(row.original_price),
            status:
              row.status === 'active' && row.is_active
                ? 'published'
                : row.status,
            isFeatured: Boolean(row.is_featured),
            isLatestLaunch: Boolean(row.is_latest_launch),
            isBestSeller: Boolean(row.is_best_seller),
            badges: row.badges || [],
            highlights: row.highlights || [],
            images: imageUrls.length ? imageUrls : localProduct?.images || [],
            coverImage:
              productImages.find((image) => image.is_primary)?.storage_path ||
              imageUrls[0] ||
              localProduct?.coverImage ||
              '',
            variants: variants.length ? variants : localProduct?.variants || [],
            colors: colors.length ? colors : localProduct?.colors || [],
            ramOptions: [
              ...new Set(savedVariants.map((variant) => variant.ram).filter(Boolean))
            ],
            storageOptions: [
              ...new Set(savedVariants.map((variant) => variant.storage).filter(Boolean))
            ],
            offers: offersByProductId.get(row.id) || [],
            specsType:
              specEntry?.groupName || localProduct?.specsType || 'phone',
            specifications:
              specEntry?.values || localProduct?.specifications || {}
          };
        });

        return {
          ...previousDb,
          categories: categories || previousDb.categories || [],
          products: loadedProducts
        };
      });
    }

    loadProductsFromSupabase().catch((error) => {
      console.error('Could not load products from Supabase:', error);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Public filtered helpers
  const publishedProducts = useMemo(() => {
    return (db.products || []).filter((product) => product.status === 'published');
  }, [db.products]);

  const activeOffers = useMemo(() => {
    return (db.offers || []).filter((offer) => offer.status === 'active');
  }, [db.offers]);

  // Product actions
  const addProduct = async (newProduct) => {
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', newProduct.categorySlug)
      .single();

    if (categoryError) {
      throw categoryError;
    }

    const isPublished = newProduct.status === 'published';
    const slug =
      newProduct.slug ||
      newProduct.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const { data, error } = await supabase
      .from('products')
      .insert({
        category_id: category.id,
        name: newProduct.name,
        slug,
        brand: newProduct.brand || '',
        model: newProduct.model || null,
        tagline: newProduct.tagline || null,
        description: newProduct.description || '',
        base_price: Number(newProduct.sellingPrice || 0),
        original_price: Number(newProduct.originalPrice ?? newProduct.sellingPrice ?? 0),
        is_latest_launch: Boolean(newProduct.isLatestLaunch),
        is_best_seller: Boolean(newProduct.isBestSeller),
        badges: newProduct.badges || [],
        status: isPublished ? 'active' : 'draft',
        is_active: isPublished,
        is_featured: Boolean(newProduct.isFeatured),
        highlights: (newProduct.highlights || []).filter(Boolean)
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    const variantRows = (newProduct.variants || []).map((variant) => {
      const isAvailable = variant.stockStatus !== 'Out of Stock';
      const color = (newProduct.colors || []).find(
        (item) => item.name === variant.color
      );

      return {
        product_id: data.id,
        sku: variant.sku || null,
        color_name: variant.color || null,
        color_hex: color?.hex || null,
        ram: variant.ram || null,
        storage: variant.storage || null,
        price: Number(variant.sellingPrice ?? newProduct.sellingPrice ?? 0),
        original_price: Number(
          variant.originalPrice ?? newProduct.originalPrice ?? variant.sellingPrice ?? 0
        ),
        stock_quantity: isAvailable ? 1 : 0,
        is_available: isAvailable
      };
    });

    if (variantRows.length > 0) {
      const { error: variantError } = await supabase
        .from('product_variants')
        .insert(variantRows);

      if (variantError) {
        const { error: rollbackError } = await supabase
          .from('products')
          .delete()
          .eq('id', data.id);

        if (rollbackError) {
          console.error('Could not remove product after variant save failed:', rollbackError);
        }

        throw variantError;
      }
    }
    const specificationRows = Object.entries(
      newProduct.specifications || {}
    )
      .filter(([, value]) => String(value ?? '').trim())
      .map(([name, value], index) => ({
        product_id: data.id,
        group_name: newProduct.specsType || null,
        name,
        value: String(value).trim(),
        sort_order: index
      }));

    if (specificationRows.length > 0) {
      const { error: specificationSaveError } = await supabase
        .from('product_specifications')
        .insert(specificationRows);

      if (specificationSaveError) {
        const { error: rollbackError } = await supabase
          .from('products')
          .delete()
          .eq('id', data.id);

        if (rollbackError) {
          console.error('Could not remove product after specification save failed:', rollbackError);
        }

        throw specificationSaveError;
      }
    }

    const imageUrls = [
      ...new Set(
        [
          newProduct.coverImage,
          ...(newProduct.images || [])
        ].filter((image) => typeof image === 'string' && image.trim())
      )
    ];

    const imageRows = imageUrls.map((url, index) => ({
      product_id: data.id,
      storage_path: url,
      alt_text: newProduct.name,
      sort_order: index,
      is_primary: url === newProduct.coverImage
    }));

    if (imageRows.length > 0) {
      const { error: imageSaveError } = await supabase
        .from('product_images')
        .insert(imageRows);

      if (imageSaveError) {
        const { error: rollbackError } = await supabase
          .from('products')
          .delete()
          .eq('id', data.id);

        if (rollbackError) {
          console.error(
            'Could not remove product after image save failed:',
            rollbackError
          );
        }

        throw imageSaveError;
      }
    }

    const offerRows = [
      ...new Set(newProduct.offers || [])
    ].map((offerId) => ({
      product_id: data.id,
      offer_id: offerId
    }));

    if (offerRows.length > 0) {
      const { error: offerSaveError } = await supabase
        .from('product_offers')
        .insert(offerRows);

      if (offerSaveError) {
        const { error: rollbackError } = await supabase
          .from('products')
          .delete()
          .eq('id', data.id);

        if (rollbackError) {
          console.error('Could not remove product after offer save failed:', rollbackError);
        }

        throw offerSaveError;
      }
    }
    const productWithId = {
      ...newProduct,
      id: data.id,
      slug: slug,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };

    setDb((previousDb) => ({
      ...previousDb,
      products: [productWithId, ...(previousDb.products || [])]
    }));

    return productWithId;
  };

  const updateProduct = async (id, updates) => {
    if (!supabase) {
      throw new Error('Supabase is not configured.');
    }

    const currentProduct = (db.products || []).find((product) => product.id === id);
    if (!currentProduct) {
      throw new Error('Could not find this product in the current catalogue.');
    }

    // Merge partial updates too; the visibility toggle only sends { status }.
    const product = { ...currentProduct, ...updates };

    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', product.categorySlug)
      .single();

    if (categoryError) throw categoryError;

    const slug =
      product.slug ||
      product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    const isPublished = product.status === 'published';

    const { error: productError } = await supabase
      .from('products')
      .update({
        category_id: category.id,
        name: product.name,
        slug,
        brand: product.brand || '',
        model: product.model || null,
        tagline: product.tagline || null,
        description: product.description || '',
        base_price: Number(product.sellingPrice || 0),
        original_price: Number(
          product.originalPrice ?? product.sellingPrice ?? 0
        ),
        status: isPublished ? 'active' : 'draft',
        is_active: isPublished,
        is_featured: Boolean(product.isFeatured),
        is_latest_launch: Boolean(product.isLatestLaunch),
        is_best_seller: Boolean(product.isBestSeller),
        badges: product.badges || [],
        highlights: (product.highlights || []).filter(Boolean)
      })
      .eq('id', id);

    if (productError) throw productError;

    const replaceRelatedRows = async (table, rows) => {
      const { error: deleteError } = await supabase
        .from(table)
        .delete()
        .eq('product_id', id);

      if (deleteError) throw deleteError;

      if (rows.length > 0) {
        const { error: insertError } = await supabase
          .from(table)
          .insert(rows);

        if (insertError) throw insertError;
      }
    };

    if (Object.prototype.hasOwnProperty.call(updates, 'variants')) {
      const variantRows = (product.variants || []).map((variant) => {
        const color = (product.colors || []).find(
          (item) => item.name === variant.color
        );
        const isAvailable = variant.stockStatus !== 'Out of Stock';

        return {
          product_id: id,
          sku: variant.sku || null,
          color_name: variant.color || null,
          color_hex: color?.hex || null,
          ram: variant.ram || null,
          storage: variant.storage || null,
          price: Number(variant.sellingPrice ?? product.sellingPrice ?? 0),
          original_price: Number(
            variant.originalPrice ?? product.originalPrice ?? 0
          ),
          stock_quantity: isAvailable ? 1 : 0,
          is_available: isAvailable
        };
      });

      await replaceRelatedRows('product_variants', variantRows);
    }

    if (Object.prototype.hasOwnProperty.call(updates, 'specifications')) {
      const specificationRows = Object.entries(product.specifications || {})
        .filter(([, value]) => String(value ?? '').trim())
        .map(([name, value], index) => ({
          product_id: id,
          group_name: product.specsType || null,
          name,
          value: String(value).trim(),
          sort_order: index
        }));

      await replaceRelatedRows('product_specifications', specificationRows);
    }

    if (
      Object.prototype.hasOwnProperty.call(updates, 'images') ||
      Object.prototype.hasOwnProperty.call(updates, 'coverImage')
    ) {
      const imageUrls = [
        ...new Set(
          [product.coverImage, ...(product.images || [])].filter(
            (image) => typeof image === 'string' && image.trim()
          )
        )
      ];
      const imageRows = imageUrls.map((url, index) => ({
        product_id: id,
        storage_path: url,
        alt_text: product.name,
        sort_order: index,
        is_primary: url === product.coverImage
      }));

      await replaceRelatedRows('product_images', imageRows);
    }

    if (Object.prototype.hasOwnProperty.call(updates, 'offers')) {
      const offerRows = [
        ...new Set(product.offers || [])
      ].map((offerId) => ({
        product_id: id,
        offer_id: offerId
      }));

      await replaceRelatedRows('product_offers', offerRows);
    }

    const updatedProduct = {
      ...product,
      id,
      slug,
      status: isPublished ? 'published' : 'draft',
      updatedAt: new Date().toISOString()
    };

    setDb((previousDb) => ({
      ...previousDb,
      products: (previousDb.products || []).map((item) =>
        item.id === id ? updatedProduct : item
      )
    }));

    return updatedProduct;
  };

  const deleteProduct = async (id) => {
    if (!supabase) {
      throw new Error('Supabase is not configured.');
    }

    const { data: imageRows, error: imageError } = await supabase
      .from('product_images')
      .select('storage_path')
      .eq('product_id', id);

    if (imageError) throw imageError;

    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
      .select('id')
      .single();

    if (deleteError) throw deleteError;

    // The database foreign keys cascade-delete variants, specifications,
    // image rows, and offer links when the product row is deleted.
    setDb((previousDb) => ({
      ...previousDb,
      products: (previousDb.products || []).filter(
        (product) => product.id !== id
      )
    }));

    const objectPaths = [
      ...new Set(
        (imageRows || [])
          .map((row) => {
            const storagePath = row.storage_path;
            if (!storagePath) return null;

            try {
              const parsedUrl = new URL(storagePath);
              const marker =
                '/storage/v1/object/public/product-images/';
              const markerIndex = parsedUrl.pathname.indexOf(marker);

              if (markerIndex === -1) return null;

              return decodeURIComponent(
                parsedUrl.pathname.slice(markerIndex + marker.length)
              );
            } catch {
              // Also support rows containing a relative object path.
              return /^https?:\/\//i.test(storagePath)
                ? null
                : storagePath.replace(/^\/+/, '');
            }
          })
          .filter((path) => path && path.startsWith('products/'))
      )
    ];

    if (objectPaths.length === 0) return { success: true };

    try {
      const { error: storageError } = await supabase.storage
        .from('product-images')
        .remove(objectPaths);

      if (storageError) {
        console.error('Product deleted, but image cleanup failed:', storageError);
        return {
          success: true,
          storageCleanupWarning:
            'The product was deleted, but some image files could not be removed from Supabase Storage.'
        };
      }
    } catch (storageError) {
      console.error('Product deleted, but image cleanup failed:', storageError);
      return {
        success: true,
        storageCleanupWarning:
          'The product was deleted, but some image files could not be removed from Supabase Storage.'
      };
    }

    return { success: true };
  };

  // Category actions
  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: category.id || `cat-${Date.now()}`,
      slug:
        category.slug ||
        category.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
    };

    setDb((previousDb) => ({
      ...previousDb,
      categories: [...(previousDb.categories || []), newCategory]
    }));
  };

  const updateCategory = (id, updates) => {
    setDb((previousDb) => ({
      ...previousDb,
      categories: (previousDb.categories || []).map((category) =>
        category.id === id ? { ...category, ...updates } : category
      )
    }));
  };

  const deleteCategory = (id) => {
    setDb((previousDb) => ({
      ...previousDb,
      categories: (previousDb.categories || []).filter(
        (category) => category.id !== id
      )
    }));
  };

  // Offer actions
  const addOffer = (offer) => {
    const newOffer = {
      ...offer,
      id: offer.id || `off-${Date.now()}`
    };

    setDb((previousDb) => ({
      ...previousDb,
      offers: [newOffer, ...(previousDb.offers || [])]
    }));
  };

  const updateOffer = (id, updates) => {
    setDb((previousDb) => ({
      ...previousDb,
      offers: (previousDb.offers || []).map((offer) =>
        offer.id === id ? { ...offer, ...updates } : offer
      )
    }));
  };

  const deleteOffer = (id) => {
    setDb((previousDb) => ({
      ...previousDb,
      offers: (previousDb.offers || []).filter((offer) => offer.id !== id)
    }));
  };

  // Banner actions
  const updateBanners = (banners) => {
    setDb((previousDb) => ({ ...previousDb, banners }));
  };

  // Service actions
  const updateServices = (services) => {
    setDb((previousDb) => ({ ...previousDb, services }));
  };

  // Content and settings actions
  const updateWebsiteContent = (websiteContent) => {
    setDb((previousDb) => ({ ...previousDb, websiteContent }));
  };

  const updateContactSettings = (contactSettings) => {
    setDb((previousDb) => ({ ...previousDb, contactSettings }));
  };

  const updateChatbotSettings = (chatbotSettings) => {
    setDb((previousDb) => ({ ...previousDb, chatbotSettings }));
  };

  // Enquiry actions
  const addEnquiry = (enquiry) => {
    const newEnquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
      notes: '',
      repairProgress: enquiry.enquiryType?.includes('Repair')
        ? 'Received'
        : 'Not Applicable'
    };

    setDb((previousDb) => ({
      ...previousDb,
      enquiries: [newEnquiry, ...(previousDb.enquiries || [])]
    }));

    return newEnquiry;
  };

  const updateEnquiry = (id, updates) => {
    setDb((previousDb) => ({
      ...previousDb,
      enquiries: (previousDb.enquiries || []).map((enquiry) =>
        enquiry.id === id ? { ...enquiry, ...updates } : enquiry
      )
    }));
  };

  const deleteEnquiry = (id) => {
    setDb((previousDb) => ({
      ...previousDb,
      enquiries: (previousDb.enquiries || []).filter(
        (enquiry) => enquiry.id !== id
      )
    }));
  };

  // Reset to default sample seed data
  const handleResetData = () => {
    const freshDatabase = resetDatabase();
    setDb(freshDatabase);
  };

  const value = {
    db,
    publishedProducts,
    activeOffers,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    addOffer,
    updateOffer,
    deleteOffer,
    updateBanners,
    updateServices,
    updateWebsiteContent,
    updateContactSettings,
    updateChatbotSettings,
    addEnquiry,
    updateEnquiry,
    deleteEnquiry,
    resetData: handleResetData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }

  return context;
}

