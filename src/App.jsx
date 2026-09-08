import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import WishlistDrawer from './components/common/WishlistDrawer';
import FloatingActions from './components/common/FloatingActions';

// Public Pages
import HomePage from './pages/public/HomePage';
import MobilesPage from './pages/public/MobilesPage';
import CategoriesPage from './pages/public/CategoriesPage';
import ProductDetailsPage from './pages/public/ProductDetailsPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import PrivacyPage from './pages/public/PrivacyPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductEditor from './pages/admin/AdminProductEditor';
import AdminCategories from './pages/admin/AdminCategories';
import AdminOffers from './pages/admin/AdminOffers';
import AdminBanners from './pages/admin/AdminBanners';
import AdminServices from './pages/admin/AdminServices';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminContent from './pages/admin/AdminContent';
import AdminContact from './pages/admin/AdminContact';
import AdminChatbot from './pages/admin/AdminChatbot';
import AdminDemoSettings from './pages/admin/AdminDemoSettings';

import { useAuth } from './context/AuthContext';

function ProtectedAdminRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-root d-flex flex-column min-vh-100">
      {/* Render Public Header & Navbar on public pages */}
      {!isAdminRoute && (
        <>
          <Header />
          <Navbar />
        </>
      )}

      {/* Main Routes */}
      <div className="flex-grow-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/mobiles" element={<MobilesPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/products/:slug" element={<ProductDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<AdminProductEditor />} />
            <Route path="products/edit/:id" element={<AdminProductEditor />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="offers" element={<AdminOffers />} />
            <Route path="banners" element={<AdminBanners />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="contact" element={<AdminContact />} />
            <Route path="chatbot" element={<AdminChatbot />} />
            <Route path="demo" element={<AdminDemoSettings />} />
          </Route>

          {/* Fallback Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Render Public Footer & Overlays */}
      {!isAdminRoute && (
        <>
          <Footer />
          <WishlistDrawer />
          <FloatingActions />
        </>
      )}
    </div>
  );
}
