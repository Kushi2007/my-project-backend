import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Calendar, DollarSign, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';

const PreviousPurchases: React.FC = () => {
  const { user } = useAuth();
  const { getUserPurchases, products } = useProducts();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">Please login to view your purchase history</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  const purchases = getUserPurchases(user.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Previous Purchases</h1>

      {purchases.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Package size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No purchases yet</h2>
          <p className="text-gray-600 mb-6">Start shopping to see your purchase history here</p>
          <button
            onClick={() => navigate('/')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {purchases.map(purchase => (
            <div key={purchase.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Order #{purchase.id}
                  </h2>
                  <div className="flex items-center text-gray-600 mt-1">
                    <Calendar size={16} className="mr-1" />
                    <span>{new Date(purchase.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-green-600 font-bold text-lg">
                    <DollarSign size={20} />
                    <span>{purchase.total.toFixed(2)}</span>
                  </div>
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
                    {purchase.status}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-900 mb-3">Items purchased:</h3>
                <div className="space-y-3">
                  {purchase.products.map(item => {
                    const product = products.find(p => p.id === item.productId);
                    if (!product) return null;

                    return (
                      <div key={item.productId} className="flex items-center space-x-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {product.title}
                          </h4>
                          <p className="text-gray-600">
                            Quantity: {item.quantity} × ${product.price} = ${(product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousPurchases;