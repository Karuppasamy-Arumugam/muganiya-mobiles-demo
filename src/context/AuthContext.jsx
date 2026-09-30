import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

const AuthContext = createContext(null);
const ADMIN_ROLES = ['admin', 'owner', 'manager'];

async function checkAdminProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('role, status')
    .eq('id', userId)
    .maybeSingle();

  if (error) return false;
  return data?.status === 'active' && ADMIN_ROLES.includes(data.role);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return undefined;
    }

    let isMounted = true;

    async function updateSession(session) {
      if (!session?.user) {
        if (isMounted) {
          setIsAuthenticated(false);
          setIsLoading(false);
        }
        return;
      }

      const allowed = await checkAdminProfile(session.user.id);
      if (!isMounted) return;

      setIsAuthenticated(allowed);
      setIsLoading(false);

      if (!allowed) {
        await supabase.auth.signOut();
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setTimeout(() => {
          void updateSession(session);
        }, 0);
      }
    );

    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error('Could not restore Supabase session:', error.message);
        if (isMounted) {
          setIsAuthenticated(false);
          setIsLoading(false);
        }
        return;
      }

      void updateSession(data.session);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function login(email, password) {
    if (!supabase) {
      return { success: false, error: 'Supabase is not configured.' };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return { success: false, error: error.message };
    }

    const allowed = await checkAdminProfile(data.user.id);
    if (!allowed) {
      await supabase.auth.signOut();
      return {
        success: false,
        error: 'This account does not have an active admin profile.'
      };
    }

    setIsAuthenticated(true);
    return { success: true };
  }

  async function logout() {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}