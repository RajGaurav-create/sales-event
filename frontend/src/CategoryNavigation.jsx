import React from 'react';

function CategoryNavigation({ onCategoryClick }) {
  const categories = [
    'Shirts',
    'Pants',
    'Accessories',
    'Mobiles',
    'Electronics',
  ];

  return (
    <nav className="border-b bg-white">
      <ul className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-6 py-3 scrollbar-hide">
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => onCategoryClick(category)}
            className="cursor-pointer whitespace-nowrap rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm font-medium text-gray-700 transition
                       hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600"
          >
            {category}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CategoryNavigation;
