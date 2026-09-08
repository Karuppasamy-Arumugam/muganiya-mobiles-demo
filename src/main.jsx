import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx';
import { DataProvider } from './context/DataContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <DataProvider>
        <WishlistProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </WishlistProvider>
      </DataProvider>
    </HashRouter>
  </StrictMode>
);
