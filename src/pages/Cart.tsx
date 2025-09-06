import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { products, addPurchase } = useProducts();
  const { user } = useAuth();
  const navigate = useNavigate();

  const cartProducts = cartItems.map(item => ({
    ...products.find(p => p.id === item.productId)!,
    quantity: item.quantity
  })).filter(item => item.id); // Filter out any undefined products

  const total = getCartTotal(products);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Create purchase record
    addPurchase({
      userId: user.id,
      products: cartItems,
      total: total,
      date: new Date().toISOString(),
      status: 'completed'
    });

    clearCart();
    toast.success('Order placed successfully!');
    navigate('/purchases');
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">Please login to view your cart</p>
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {cartProducts.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started</p>
          <button
            onClick={() => navigate('/')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.title}
                    </h3>
                    <p className="text-gray-600">{product.category}</p>
                    <p className="text-lg font-bold text-green-600">
                      ${product.price}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                      className="p-1 rounded-md hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                      className="p-1 rounded-md hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3">
              {cartProducts.map(product => (
                <div key={product.id} className="flex justify-between text-sm">
                  <span>{product.title} (x{product.quantity})</span>
                  <span>${(product.price * product.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <hr className="my-4" />
            
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-green-600">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors mt-6"
            >
              Checkout
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-100 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors mt-3"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;