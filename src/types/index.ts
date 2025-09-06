export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  sellerId: string;
  sellerName: string;
  createdAt: string;
  condition: string;
  location: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Purchase {
  id: string;
  userId: string;
  products: CartItem[];
  total: number;
  date: string;
  status: string;
}

export const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Books',
  'Sports',
  'Toys',
  'Beauty',
  'Automotive',
  'Other'
];