import React from 'react';

export default function ProductList({ products, onAddToCart }) {
  if (!products || products.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        No products available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <div
          key={product.product_id}
          className="group rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          {/* Image */}
          <div className="aspect-square overflow-hidden rounded-t-xl bg-gray-100">
            <img
              src={product.images?.[0]}
              alt={product.name}
              loading="lazy"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300';
              }}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col p-4">
            <h3 className="truncate text-sm font-semibold text-gray-800">
              {product.name}
            </h3>

            <p className="mt-1 line-clamp-2 text-xs text-gray-600">
              {product.description}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-lg font-bold text-indigo-600">
                ₹{product.price}
              </span>

              <button
                onClick={() => onAddToCart(product.product_id)}
                className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
