import React, { useState, useEffect } from 'react';
import CategoryNavigation from './CategoryNavigation';
import ProsuctList from './ProsuctList';
import { Footer } from './Footer';
import {Header} from './Header';

function CustomerHomePage() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState('');
  const [cartError, setCartError] = useState(false);
  const [isCartLoading, setCartLoading] = useState(true);

  const fetchProduct = async (category = 'Shirts') => {

      console.log("Fetching products for:", category);
    try {
      const response = await fetch(
       `http://localhost:8080/api/products?category=${encodeURIComponent(category)}`,
        { credentials: 'include' }
      );
      const data = await response.json();

      setUsername(data.user?.name || 'Guest');
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };

  const fetchCartCount = async () => {
    setCartLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/cart/items/count?username=${username}`,
        { credentials: 'include' }
      );
      const count = await response.json();
      setCartCount(count);
      setCartError(false);
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartError(true);
    } finally {
      setCartLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    console.log(category);
    fetchProduct(category);
  };

  const handleAddToCart = async (productId) => {
    if (!username) return;

    try {
      const response = await fetch('http://localhost:8080/api/cart/add', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, productId }),
      });

      if (response.ok) fetchCartCount();
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (username) fetchCartCount();
  }, [username]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <Header
        cartCount={isCartLoading ? '...' : cartError ? '!' : cartCount}
        username={username}
      />

      {/* Category Navigation */}
      <CategoryNavigation onCategoryClick={handleCategoryClick} />

      {/* Main Content */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        <ProsuctList products={products} onAddToCart={handleAddToCart} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default CustomerHomePage;
