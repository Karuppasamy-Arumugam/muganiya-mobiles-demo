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

  // Load products, categories, specifications, and images from Supabase.
  useEffect(() => {
    if (!supabase) return undefined;

    let cancelled = false;

    async function loadProductsFromSupabase() {
      const [
        { data: categories, error: categoryError },
        { data: products, error: productError },
        { data: specificationRows, error: specificationError },
        { data: imageRows, error: imageError }
      ] = await Promise.all([
        supabase.from('categories').select('id, name, slug'),
        supabase
          .from('products')
          .select(
            'id, category_id, name, slug, brand, description, base_price, status, is_active, is_featured, highlights'
          )
          .order('name'),
        supabase
          .from('product_specifications')
          .select('product_id, name, value, sort_order')
          .order('sort_order'),
        supabase
          .from('product_images')
          .select('product_id, storage_path, sort_order, is_primary')
          .order('sort_order')
      ]);

      if (categoryError) throw categoryError;
      if (productError) throw productError;
      if (specificationError) throw specificationError;
      if (imageError) throw imageError;
      if (cancelled) return;

      const categoryById = new Map(
        (categories || []).map((category) => [category.id, category])
      );

      const specificationsByProductId = new Map();

      for (const row of specificationRows || []) {
        const specifications =
          specificationsByProductId.get(row.product_id) || {};

        specifications[row.name] = row.value;
        specificationsByProductId.set(row.product_id, specifications);
      }

      const imagesByProductId = new Map();

      for (const row of imageRows || []) {
        const images = imagesByProductId.get(row.product_id) || [];
        images.push(row);
        imagesByProductId.set(row.product_id, images);
      }

      setDb((previousDb) => {
        const localProductBySlug = new Map(
          (previousDb.products || []).map((product) => [product.slug, product])
        );

        const loadedProducts = (products || []).map((row) => {
          const category = categoryById.get(row.category_id);
          const localProduct = localProductBySlug.get(row.slug);
          const productImages = imagesByProductId.get(row.id) || [];

          const imageUrls = productImages
            .map((image) => image.storage_path)
            .filter(Boolean);

          const primaryImage =
            productImages.find((image) => image.is_primary)?.storage_path ||
            imageUrls[0] ||
            '';

          const isPublished = row.status === 'active' && row.is_active;

          return {
            ...localProduct,
            id: row.id,
            name: row.name,
            slug: row.slug,
            brand: row.brand,
            description: row.description || '',
            category: category?.name || localProduct?.category || '',
            categorySlug: category?.slug || localProduct?.categorySlug || '',
            sellingPrice: Number(row.base_price || 0),
            originalPrice:
              localProduct?.originalPrice ?? Number(row.base_price || 0),
            status: isPublished ? 'published' : row.status,
            isFeatured: Boolean(row.is_featured),
            highlights: row.highlights || [],
            images: imageUrls.length ? imageUrls : localProduct?.images || [],
            coverImage: primaryImage || localProduct?.coverImage || '',
            variants: localProduct?.variants || [],
            specifications:
              specificationsByProductId.get(row.id) ||
              localProduct?.specifications ||
              {}
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
        brand: newProduct.brand,
        description: newProduct.description,
        base_price: Number(newProduct.sellingPrice || 0),
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
        price: Number(
          variant.sellingPrice ?? newProduct.sellingPrice ?? 0
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

  const updateProduct = (id, updates) => {
    setDb((previousDb) => ({
      ...previousDb,
      products: (previousDb.products || []).map((product) =>
        product.id === id
          ? {
            ...product,
            ...updates,
            updatedAt: new Date().toISOString()
          }
          : product
      )
    }));
  };

  const deleteProduct = (id) => {
    setDb((previousDb) => ({
      ...previousDb,
      products: (previousDb.products || []).filter(
        (product) => product.id !== id
      )
    }));
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