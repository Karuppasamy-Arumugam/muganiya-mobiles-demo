import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { loadDatabase, saveDatabase, resetDatabase } from '../services/storageService';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [db, setDb] = useState(() => loadDatabase());

  // Save changes to localStorage whenever db changes
  useEffect(() => {
    saveDatabase(db);
  }, [db]);

  // Public Filtered Helpers
  const publishedProducts = useMemo(() => {
    return (db.products || []).filter((p) => p.status === 'published');
  }, [db.products]);

  const activeOffers = useMemo(() => {
    return (db.offers || []).filter((o) => o.status === 'active');
  }, [db.offers]);

  // Product Actions
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: newProduct.id || `prod-${Date.now()}`,
      slug: newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      createdAt: new Date().toISOString()
    };
    setDb((prev) => ({
      ...prev,
      products: [productWithId, ...prev.products]
    }));
    return productWithId;
  };

  const updateProduct = (id, updates) => {
    setDb((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    }));
  };

  const deleteProduct = (id) => {
    setDb((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id)
    }));
  };

  // Category Actions
  const addCategory = (category) => {
    const newCat = {
      ...category,
      id: category.id || `cat-${Date.now()}`,
      slug: category.slug || category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    };
    setDb((prev) => ({
      ...prev,
      categories: [...prev.categories, newCat]
    }));
  };

  const updateCategory = (id, updates) => {
    setDb((prev) => ({
      ...prev,
      categories: prev.categories.map((c) => (c.id === id ? { ...c, ...updates } : c))
    }));
  };

  const deleteCategory = (id) => {
    setDb((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c.id !== id)
    }));
  };

  // Offer Actions
  const addOffer = (offer) => {
    const newOffer = {
      ...offer,
      id: offer.id || `off-${Date.now()}`
    };
    setDb((prev) => ({
      ...prev,
      offers: [newOffer, ...prev.offers]
    }));
  };

  const updateOffer = (id, updates) => {
    setDb((prev) => ({
      ...prev,
      offers: prev.offers.map((o) => (o.id === id ? { ...o, ...updates } : o))
    }));
  };

  const deleteOffer = (id) => {
    setDb((prev) => ({
      ...prev,
      offers: prev.offers.filter((o) => o.id !== id)
    }));
  };

  // Banner Actions
  const updateBanners = (banners) => {
    setDb((prev) => ({ ...prev, banners }));
  };

  // Service Actions
  const updateServices = (services) => {
    setDb((prev) => ({ ...prev, services }));
  };

  // Content & Settings Actions
  const updateWebsiteContent = (websiteContent) => {
    setDb((prev) => ({ ...prev, websiteContent }));
  };

  const updateContactSettings = (contactSettings) => {
    setDb((prev) => ({ ...prev, contactSettings }));
  };

  const updateChatbotSettings = (chatbotSettings) => {
    setDb((prev) => ({ ...prev, chatbotSettings }));
  };

  // Enquiries Actions
  const addEnquiry = (enquiry) => {
    const newEnquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
      notes: '',
      repairProgress: enquiry.enquiryType?.includes('Repair') ? 'Received' : 'Not Applicable'
    };
    setDb((prev) => ({
      ...prev,
      enquiries: [newEnquiry, ...prev.enquiries]
    }));
    return newEnquiry;
  };

  const updateEnquiry = (id, updates) => {
    setDb((prev) => ({
      ...prev,
      enquiries: prev.enquiries.map((e) => (e.id === id ? { ...e, ...updates } : e))
    }));
  };

  const deleteEnquiry = (id) => {
    setDb((prev) => ({
      ...prev,
      enquiries: prev.enquiries.filter((e) => e.id !== id)
    }));
  };

  // Reset to default sample seed data
  const handleResetData = () => {
    const fresh = resetDatabase();
    setDb(fresh);
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

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
