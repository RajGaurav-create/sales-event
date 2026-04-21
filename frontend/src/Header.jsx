import React from 'react';
import { Link } from 'react-router-dom';
import { CartIcon } from './CartIcon';
import { ProfileDropdown } from './ProfileDropdown';
import Logo from './logo.png';

export function Header({ cartCount, username }) {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <img
            src={Logo}
            alt="Logo"
            className="h-9 w-auto cursor-pointer"
          />
          <span className="text-lg font-bold text-gray-800">
            ShopEase
          </span>
        </div>

         <Link 
          to="/chat" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          AI Chat
        </Link>


        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <CartIcon count={cartCount} />
          <ProfileDropdown username={username} />
        </div>
      </div>
    </header>
  );
}

