import { supabase } from './supabaseClient';

function getImageUrl(storagePath, bucketName) {
  if (!storagePath) return '';
  if (/^https?:\/\//i.test(storagePath)) return storagePath;

  return supabase.storage
    .from(bucketName)
    .getPublicUrl(storagePath).data.publicUrl;
}

function toCatalogProduct(row, related) {
  const productVariants = related.variants
    .filter((variant) => variant.product_id === row.id)
    .map((variant) => ({
      id: variant.id,
      sku: variant.sku || '',
      color: variant.color_name || '',
      ram: variant.ram || '',
      storage: variant.storage || '',
      variantAttributes: variant.variant_attributes || {},
      sellingPrice: Number(variant.price || row.base_price || 0),
      originalPrice: Number(
        variant.original_price ?? row.original_price ?? variant.price ?? 0
      ),
      stockStatus:
        variant.is_available && variant.stock_quantity > 0
          ? 'In Stock'
          : 'Out of Stock'
    }));

  const colors = [
    ...new Map(
      related.variants
        .filter(
          (variant) =>
            variant.product_id === row.id && variant.color_name
        )
        .map((variant) => [
          variant.color_name,
          {
            name: variant.color_name,
            hex: variant.color_hex || '#777777'
          }
        ])
    ).values()
  ];

  const productSpecs = related.specifications.filter(
    (spec) => spec.product_id === row.id
  );

  const specifications = Object.fromEntries(
    productSpecs.map((spec) => [spec.name, spec.value])
  );

  const images = related.images
    .filter((image) => image.product_id === row.id)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((image) => getImageUrl(image.storage_path, 'product-images'))
    .filter(Boolean);

  const category = related.categories.find(
    (item) => item.id === row.category_id
  );

  const basePrice = Number(row.base_price || 0);

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand || '',
    model: row.model || '',
    tagline: row.tagline || '',
    category: category?.name || '',
    categorySlug: category?.slug || '',
    description: row.description || '',
    sellingPrice: productVariants[0]?.sellingPrice ?? basePrice,
    originalPrice: Number(row.original_price ?? basePrice),
    status:
      row.status === 'active' && row.is_active
        ? 'published'
        : 'draft',
    isFeatured: Boolean(row.is_featured),
    isLatestLaunch: Boolean(row.is_latest_launch),
    isBestSeller: Boolean(row.is_best_seller),
    badges: row.badges || [],
    highlights: row.highlights || [],
    variants: productVariants,
    colors,
    ramOptions: [
      ...new Set(productVariants.map((variant) => variant.ram).filter(Boolean))
    ],
    storageOptions: [
      ...new Set(
        productVariants.map((variant) => variant.storage).filter(Boolean)
      )
    ],
    stockStatus: productVariants.some(
      (variant) => variant.stockStatus === 'In Stock'
    )
      ? 'In Stock'
      : 'Out of Stock',
    specifications,
    specsType: productSpecs[0]?.group_name || '',
    images,
    coverImage: images[0] || ''
  };
}

function mapBanner(row) {
  return {
    id: row.id,
    title: row.title || '',
    subtitle: row.subtitle || '',
    badge: row.badge_text || '',
    ctaText: row.button_label || 'Explore Now',
    link: row.target_url || '/mobiles',
    imagePath: row.image_path || '',
    imageUrl: getImageUrl(row.image_path, 'banner-images'),
    active: Boolean(row.is_active),
    order: row.sort_order ?? 0
  };
}

function mapSupabaseService(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.name || '',
    subtitle: row.description || '',
    imagePath: row.image_path || '',
    features: Array.isArray(row.features) ? row.features : [],
    enquiryService: row.enquiry_service || '',
    icon: row.icon || 'Wrench',
    order: row.sort_order ?? 0,
    active: Boolean(row.is_active)
  };
}

export async function fetchSupabaseCatalog(existingDatabase = {}) {
  if (!supabase) return null;

  const [
    productsResult,
    categoriesResult,
    variantsResult,
    imagesResult,
    specsResult,
    bannersResult,
    servicesResult
  ] = await Promise.all([
    supabase.from('products').select('*').order('name'),
    supabase.from('categories').select('*').order('sort_order'),
    supabase.from('product_variants').select('*'),
    supabase.from('product_images').select('*'),
    supabase
      .from('product_specifications')
      .select('*')
      .order('sort_order'),
    supabase.from('banners').select('*').order('sort_order'),
    supabase.from('services').select('*').order('sort_order')
  ]);

  const failedResult = [
    productsResult,
    categoriesResult,
    variantsResult,
    imagesResult,
    specsResult,
    bannersResult,
    servicesResult
  ].find((result) => result.error);

  if (failedResult) throw failedResult.error;

  const related = {
    categories: categoriesResult.data || [],
    variants: variantsResult.data || [],
    images: imagesResult.data || [],
    specifications: specsResult.data || []
  };

  return {
    ...existingDatabase,
    categories: related.categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug
    })),
    products: (productsResult.data || []).map((row) =>
      toCatalogProduct(row, related)
    ),
    banners: (bannersResult.data || []).map(mapBanner),
    services: (servicesResult.data || []).map(mapSupabaseService)
  };
}