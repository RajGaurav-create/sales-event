import React from 'react';
import { useNavigate } from 'react-router-dom';

export function CartIcon({ count = 0 }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/UserCartPage')}
      className="relative flex items-center justify-center rounded-full p-2 transition hover:bg-gray-100"
    >
      {/* Cart Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-7 w-7 text-gray-700"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h18l-2 9H5L3 3zM8.5 18a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm7 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
        />
      </svg>

      {/* Badge */}
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white shadow-md">
          {count}
        </span>
      )}
    </button>
  );
}
