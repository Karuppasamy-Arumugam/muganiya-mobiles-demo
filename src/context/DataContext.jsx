import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { loadDatabase, saveDatabase, resetDatabase } from '../services/storageService';
import { fetchSupabaseCatalog } from '../services/supabaseCatalogService';
import { isSupabaseConfigured, supabase } from '../services/supabaseClient';

const DataContext = createContext(null);

function mapStoreSettings(row, fallback = {}) {
  const openingHours = row?.opening_hours;
  const hoursText = typeof openingHours === 'string'
    ? openingHours
    : openingHours?.display || fallback.hours || '';

  return {
    ...fallback,
    shopName: row?.store_name || fallback.shopName || 'Muganiyaa-Mobiles',
    phone: row?.phone ?? fallback.phone ?? '',
    whatsapp: row?.whatsapp ?? fallback.whatsapp ?? '',
    email: row?.email ?? fallback.email ?? '',
    address: row?.address ?? fallback.address ?? '',
    hours: hoursText,
    mapQuery: openingHours?.map_query || fallback.mapQuery || row?.address || '',
    mapUrl: row?.map_url || ''
  };
}

function mapSupabaseEnquiry(row) {
  const [enquiryType, ...itemParts] = String(row.subject || 'General Enquiry').split(' — ');
  const statusLabels = { new: 'New', contacted: 'In Progress', resolved: 'Handled', archived: 'Handled' };
  return {
    id: row.id,
    customerName: row.name,
    phone: row.phone,
    email: row.email || '',
    enquiryType: enquiryType || 'General Enquiry',
    selectedProductOrService: itemParts.join(' — '),
    message: row.message,
    createdAt: row.created_at,
    status: statusLabels[row.internal_status] || 'New',
    notes: row.internal_notes || '',
    repairProgress: 'Not Applicable'
  };
}

function toSupabaseEnquiryStatus(status) {
  return ({ New: 'new', 'In Progress': 'contacted', Handled: 'resolved' })[status] || 'new';
}

export function DataProvider({ children }) {
  const [db, setDb] = useState(() => {
    const saved = loadDatabase();
    // In Supabase mode, do not display the old local/demo catalogue while fetching.
    return isSupabaseConfigured ? { ...saved, products: [], categories: [] } : saved;
  });

  // Load public catalogue rows from local Supabase when local credentials exist.
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    fetchSupabaseCatalog(loadDatabase())
      .then((catalogue) => {
        if (catalogue && !cancelled) setDb((current) => ({ ...current, ...catalogue }));
      })
      .catch((error) => console.error('Could not load catalogue from Supabase:', error.message));
    return () => { cancelled = true; };
  }, []);

  // Load enquiries into the admin inbox and keep it updated when new submissions arrive.
  useEffect(() => {
    if (!supabase) return undefined;
    let cancelled = false;

    const loadEnquiries = async () => {
      const { data, error } = await supabase
        .from('enquiries')
        .select('id, name, phone, email, subject, message, internal_status, internal_notes, created_at')
        .order('created_at', { ascending: false });
      if (error) throw error;
      if (!cancelled) {
        setDb((current) => ({ ...current, enquiries: (data || []).map(mapSupabaseEnquiry) }));
      }
    };

    const refreshEnquiries = () => {
      loadEnquiries().catch((error) => console.error('Could not load enquiries from Supabase:', error.message));
    };
    refreshEnquiries();
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && ['INITIAL_SESSION', 'SIGNED_IN', 'TOKEN_REFRESHED'].includes(event)) {
        // Defer the request so it runs after Supabase finishes updating its auth state.
        setTimeout(() => { if (!cancelled) refreshEnquiries(); }, 0);
      }
    });
    const channel = supabase
      .channel('enquiries-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'enquiries' }, (payload) => {
        if (cancelled) return;
        setDb((current) => {
          const rows = current.enquiries || [];
          if (payload.eventType === 'DELETE') {
            return { ...current, enquiries: rows.filter((item) => item.id !== payload.old.id) };
          }
          const item = mapSupabaseEnquiry(payload.new);
          const exists = rows.some((row) => row.id === item.id);
          return {
            ...current,
            enquiries: exists
              ? rows.map((row) => row.id === item.id ? item : row)
              : [item, ...rows]
          };
        });
      })
      .subscribe();

    return () => {
      cancelled = true;
      authListener.subscription.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, []);

  // Keep showroom/contact settings synced from Supabase and live changes.
  useEffect(() => {
    if (!supabase) return undefined;
    let cancelled = false;

    const applyStoreSettings = (row) => {
      if (!row) return;
      setDb((current) => ({
        ...current,
        contactSettings: mapStoreSettings(row, current.contactSettings)
      }));
    };

    supabase
      .from('store_settings')
      .select('id, store_name, phone, whatsapp, email, address, opening_hours, map_url')
      .eq('id', true)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) throw error;
        if (!cancelled) applyStoreSettings(data);
      })
      .catch((error) => console.error('Could not load showroom settings from Supabase:', error.message));

    const channel = supabase
      .channel('store-settings-live')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'store_settings'
      }, (payload) => {
        if (!cancelled && payload.new?.id === true) applyStoreSettings(payload.new);
      })
      .subscribe((status) => {
        if (status === 'CHANNEL_ERROR') {
          console.error('Live showroom settings updates could not be connected.');
        }
      });

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

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

  const updateContactSettings = async (contactSettings) => {
    if (!supabase) throw new Error('Supabase is not configured. Contact settings were not saved.');

    const openingHours = {
      display: contactSettings.hours || '',
      map_query: contactSettings.mapQuery || ''
    };
    const { data, error } = await supabase
      .from('store_settings')
      .upsert({
        id: true,
        store_name: contactSettings.shopName || 'Muganiyaa-Mobiles',
        phone: contactSettings.phone || '',
        whatsapp: contactSettings.whatsapp || '',
        email: contactSettings.email || '',
        address: contactSettings.address || '',
        opening_hours: openingHours,
        map_url: contactSettings.mapUrl || '',
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' })
      .select('id, store_name, phone, whatsapp, email, address, opening_hours, map_url')
      .single();

    if (error) throw error;
    const savedSettings = mapStoreSettings(data, contactSettings);
    setDb((prev) => ({ ...prev, contactSettings: savedSettings }));
    return savedSettings;
  };

  const updateChatbotSettings = (chatbotSettings) => {
    setDb((prev) => ({ ...prev, chatbotSettings }));
  };

  // Enquiries Actions
  const addEnquiry = async (enquiry) => {
    if (supabase) {
      const subject = [enquiry.enquiryType || 'General Enquiry', enquiry.selectedProductOrService]
        .filter(Boolean)
        .join(' — ');
      const { data, error } = await supabase
        .from('enquiries')
        .insert({
          name: enquiry.customerName.trim(),
          phone: enquiry.phone.trim(),
          email: enquiry.email?.trim() || null,
          subject,
          message: enquiry.message.trim()
        })
        .select('id, name, phone, email, subject, message, internal_status, internal_notes, created_at')
        .single();

      if (error) throw error;
      const savedEnquiry = mapSupabaseEnquiry(data);
      setDb((prev) => ({
        ...prev,
        enquiries: [savedEnquiry, ...(prev.enquiries || []).filter((row) => row.id !== savedEnquiry.id)]
      }));
      return savedEnquiry;
    }

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

  const updateEnquiry = async (id, updates) => {
    if (supabase && (updates.status || updates.notes !== undefined)) {
      const payload = {};
      if (updates.status) payload.internal_status = toSupabaseEnquiryStatus(updates.status);
      if (updates.notes !== undefined) payload.internal_notes = updates.notes;
      const { error } = await supabase.from('enquiries').update(payload).eq('id', id);
      if (error) throw error;
    }
    setDb((prev) => ({
      ...prev,
      enquiries: prev.enquiries.map((e) => (e.id === id ? { ...e, ...updates } : e))
    }));
  };

  const deleteEnquiry = async (id) => {
    if (supabase) {
      const { error } = await supabase.from('enquiries').delete().eq('id', id);
      if (error) throw error;
    }
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
