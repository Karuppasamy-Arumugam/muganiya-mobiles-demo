import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadWishlistIds, saveWishlistIds } from '../services/storageService';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlistIds, setWishlistIds] = useState(() => loadWishlistIds());
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    saveWishlistIds(wishlistIds);
  }, [wishlistIds]);

  const openWishlist = () => setIsWishlistOpen(true);
  const closeWishlist = () => setIsWishlistOpen(false);

  const toggleWishlist = (productId) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  const clearWishlist = () => {
    setWishlistIds([]);
  };

  const isInWishlist = (productId) => wishlistIds.includes(productId);

  const value = {
    wishlistIds,
    wishlistCount: wishlistIds.length,
    isWishlistOpen,
    openWishlist,
    closeWishlist,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
