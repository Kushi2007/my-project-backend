import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, MapPin, Calendar, User, Tag } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const product = getProductById(id!);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Product not found.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-green-600 hover:text-green-700"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    if (product.sellerId === user.id) {
      toast.error('You cannot buy your own product');
      return;
    }

    addToCart(product.id);
    toast.success('Added to cart!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={20} className="mr-1" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <p className="text-4xl font-bold text-green-600 mb-4">
              ${product.price}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Tag size={18} className="mr-2" />
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {product.category}
              </span>
            </div>

            <div className="flex items-center text-gray-600">
              <MapPin size={18} className="mr-2" />
              <span>{product.location}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <Calendar size={18} className="mr-2" />
              <span>Listed on {new Date(product.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <User size={18} className="mr-2" />
              <span>Seller: {product.sellerName}</span>
            </div>

            <div className="bg-green-50 px-3 py-2 rounded-lg">
              <span className="text-green-800 font-medium">Condition: {product.condition}</span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {user && product.sellerId !== user.id && (
              <button
                onClick={handleAddToCart}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>
            )}

            {product.sellerId === user?.id && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-center font-medium">
                  This is your product listing
                </p>
              </div>
            )}

            {!user && (
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Login to Purchase
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;