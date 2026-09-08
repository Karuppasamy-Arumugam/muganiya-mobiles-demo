// Storage Service for Muganiyaa-Mobiles Demo
// Central data abstraction layer managing browser persistence and reactive updates

import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_OFFERS,
  INITIAL_BANNERS,
  INITIAL_SERVICES,
  INITIAL_WEBSITE_CONTENT,
  INITIAL_CONTACT_SETTINGS,
  INITIAL_CHATBOT_SETTINGS,
  INITIAL_ENQUIRIES
} from './seedData';

const STORAGE_KEY = 'muganiyaa_store_v1';
const WISHLIST_KEY = 'muganiyaa_wishlist_ids';
const AUTH_KEY = 'muganiyaa_admin_session';

export function getDefaultDatabase() {
  return {
    version: '1.0.0',
    products: INITIAL_PRODUCTS,
    categories: INITIAL_CATEGORIES,
    offers: INITIAL_OFFERS,
    banners: INITIAL_BANNERS,
    services: INITIAL_SERVICES,
    websiteContent: INITIAL_WEBSITE_CONTENT,
    contactSettings: INITIAL_CONTACT_SETTINGS,
    chatbotSettings: INITIAL_CHATBOT_SETTINGS,
    enquiries: INITIAL_ENQUIRIES
  };
}

export function loadDatabase() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getDefaultDatabase();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error('Error reading localStorage database, loading fallback:', err);
    return getDefaultDatabase();
  }
}

export function saveDatabase(db) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (err) {
    console.error('Error saving to localStorage:', err);
  }
}

export function resetDatabase() {
  const initial = getDefaultDatabase();
  saveDatabase(initial);
  return initial;
}

// Wishlist ID management
export function loadWishlistIds() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveWishlistIds(ids) {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
  } catch (err) {
    console.error('Error saving wishlist:', err);
  }
}

// Admin Auth Session
export function loadAdminSession() {
  try {
    return localStorage.getItem(AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setAdminSession(isAuthenticated) {
  try {
    if (isAuthenticated) {
      localStorage.setItem(AUTH_KEY, 'true');
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  } catch (err) {
    console.error('Error updating admin auth:', err);
  }
}
