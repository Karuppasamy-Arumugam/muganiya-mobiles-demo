import React, { createContext, useContext, useState } from 'react';
import { loadAdminSession, setAdminSession } from '../services/storageService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => loadAdminSession());

  const login = (username, password) => {
    // Demonstration owner authentication
    if (
      (username === 'admin' && password === 'admin123') ||
      (username === 'demo' && password === 'demo') ||
      username === 'owner'
    ) {
      setIsAuthenticated(true);
      setAdminSession(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid demo credentials. Use admin / admin123.' };
  };

  const loginAsDemo = () => {
    setIsAuthenticated(true);
    setAdminSession(true);
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminSession(false);
  };

  const value = {
    isAuthenticated,
    login,
    loginAsDemo,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
