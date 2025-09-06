import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Purchase } from '../types';
import { dummyProducts } from '../data/dummyData';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getUserProducts: (userId: string) => Product[];
  purchases: Purchase[];
  addPurchase: (purchase: Omit<Purchase, 'id'>) => void;
  getUserPurchases: (userId: string) => Purchase[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(dummyProducts);
      localStorage.setItem('products', JSON.stringify(dummyProducts));
    }

    const storedPurchases = localStorage.getItem('purchases');
    if (storedPurchases) {
      setPurchases(JSON.parse(storedPurchases));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('purchases', JSON.stringify(purchases));
  }, [purchases]);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...productData } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const getUserProducts = (userId: string): Product[] => {
    return products.filter(product => product.sellerId === userId);
  };

  const addPurchase = (purchaseData: Omit<Purchase, 'id'>) => {
    const newPurchase: Purchase = {
      ...purchaseData,
      id: Date.now().toString()
    };
    setPurchases(prev => [...prev, newPurchase]);
  };

  const getUserPurchases = (userId: string): Purchase[] => {
    return purchases.filter(purchase => purchase.userId === userId);
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      getUserProducts,
      purchases,
      addPurchase,
      getUserPurchases
    }}>
      {children}
    </ProductContext.Provider>
  );
};