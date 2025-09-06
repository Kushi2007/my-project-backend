import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { MapPin, Calendar } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-2xl font-bold text-green-600 mb-2">
          ${product.price}
        </p>
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <MapPin size={14} className="mr-1" />
          <span>{product.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Calendar size={14} className="mr-1" />
          <span>{new Date(product.createdAt).toLocaleDateString()}</span>
        </div>
        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
          {product.category}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;