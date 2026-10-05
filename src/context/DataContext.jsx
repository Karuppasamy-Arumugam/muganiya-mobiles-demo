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

    const productWithId = {
      ...newProduct,
      id: data.id,
      slug: data.slug,
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