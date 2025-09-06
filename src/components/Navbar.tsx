import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Plus, Package, History } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemCount = getCartItemCount();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-green-600">
              Second Nature
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/add-product"
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-gray-100 transition-colors"
                >
                  <Plus size={18} />
                  <span className="hidden sm:block">Sell</span>
                </Link>

                <Link
                  to="/cart"
                  className="relative flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-gray-100 transition-colors"
                >
                  <ShoppingCart size={18} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                  <span className="hidden sm:block">Cart</span>
                </Link>

                <Link
                  to="/purchases"
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-gray-100 transition-colors"
                >
                  <History size={18} />
                  <span className="hidden sm:block">Purchases</span>
                </Link>

                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-gray-100 transition-colors"
                >
                  <User size={18} />
                  <span className="hidden sm:block">{user.username}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-colors"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/login'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/signup'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-700 hover:text-green-600 border border-green-600'
                  }`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;