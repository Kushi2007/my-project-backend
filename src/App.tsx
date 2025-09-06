import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import PreviousPurchases from './pages/PreviousPurchases';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/edit-product/:id" element={<EditProduct />} />
                <Route path="/purchases" element={<PreviousPurchases />} />
              </Routes>
              <Toaster position="top-right" />
            </div>
          </Router>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;