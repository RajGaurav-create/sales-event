import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useravatar from './useravatar.png';

export function ProfileDropdown({ username }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="relative inline-block text-left">
      {/* Profile Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm transition hover:bg-gray-50 hover:shadow-md"
      >
        <img
          src={useravatar}
          alt="User Avatar"
          onError={(e) => (e.target.src = 'fallback-logo.png')}
          className="h-9 w-9 rounded-full border-2 border-indigo-500 object-cover"
        />
        <span className="text-sm font-semibold text-gray-800">
          {username || 'Guest'}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-44 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2">
          <button
            className="block w-full px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            Profile
          </button>

          <button
            onClick={() => navigate('/orders')}
            className="block w-full px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            Orders
          </button>

          <div className="border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
