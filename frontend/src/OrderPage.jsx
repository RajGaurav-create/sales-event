import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState('');
  const [cartError, setCartError] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (username) fetchCartCount();
  }, [username]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/orders', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();

      setOrders(data.products || []);
      setUsername(data.username || 'Guest');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartCount = async () => {
    setIsCartLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/cart/items/count?username=${username}`,
        { credentials: 'include' }
      );
      const count = await response.json();
      setCartCount(count);
      setCartError(false);
    } catch {
      setCartError(true);
    } finally {
      setIsCartLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header
        cartCount={isCartLoading ? '...' : cartError ? '!' : cartCount}
        username={username}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Your Orders
        </h1>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20 text-gray-500">
            Loading orders...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg text-gray-600">
              No orders found.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Start shopping to place your first order.
            </p>
          </div>
        )}

        {/* Orders List */}
        {!loading && !error && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-5 shadow-sm"
              >
                {/* Header */}
                <div className="mb-4 flex justify-between border-b pb-2">
                  <h3 className="font-semibold text-gray-800">
                    Order ID: {order.order_id}
                  </h3>
                  <span className="text-sm text-gray-500">
                    Qty: {order.quantity}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-col gap-4 sm:flex-row">
                  <img
                    src={order.image_url || 'https://via.placeholder.com/120'}
                    alt={order.name}
                    className="h-28 w-28 rounded-lg object-cover"
                  />

                  <div className="flex-1 space-y-1 text-sm">
                    <h4 className="font-semibold text-gray-800">
                      {order.name}
                    </h4>
                    <p className="text-gray-500">
                      {order.description}
                    </p>

                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                      <p>
                        <span className="font-medium">Price:</span>{' '}
                        ₹{order.price_per_unit.toFixed(2)}
                      </p>
                      <p>
                        <span className="font-medium">Total:</span>{' '}
                        ₹{order.total_price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
