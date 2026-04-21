import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [overallPrice, setOverallPrice] = useState(0);
  const [username, setUsername] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate(); // To redirect users after successful payment

  // Fetch cart items on component load
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/cart/items", {
          credentials: "include", // Include session cookie
        });
        if (!response.ok) throw new Error("Failed to fetch cart items");
        const data = await response.json();

        setCartItems(
          data?.cart?.products.map((item) => ({
            ...item,
            total_price: parseFloat(item.total_price).toFixed(2),
            price_per_unit: parseFloat(item.price_per_unit).toFixed(2),
          })) || []
        );
        setOverallPrice(parseFloat(data?.cart?.overall_total_price || 0).toFixed(2));
        setUsername(data?.username || ""); // Save the username from the response
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // Calculate subtotal whenever cart items change
  useEffect(() => {
    const total = cartItems
      .reduce((total, item) => total + parseFloat(item.total_price), 0)
      .toFixed(2);
    setSubtotal(total);
  }, [cartItems]);

  // Remove item from the cart
  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch("http://localhost:8080/api/cart/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, productId }),
      });
      if (response.status === 204) {
        setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== productId));
      } else throw new Error("Failed to remove item");
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Update quantity of an item
  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        handleRemoveItem(productId);
        return;
      }
      const response = await fetch("http://localhost:8080/api/cart/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, productId, quantity: newQuantity }),
      });
      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.product_id === productId
              ? {
                  ...item,
                  quantity: newQuantity,
                  total_price: (item.price_per_unit * newQuantity).toFixed(2),
                }
              : item
          )
        );
      } else throw new Error("Failed to update quantity");
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Razorpay integration for payment
  const handleCheckout = async () => {
    try {
      const requestBody = {
        totalAmount: subtotal,
        cartItems: cartItems.map((item) => ({
          productId: item.product_id,
          quantity: item.quantity,
          price: item.price_per_unit,
        })),
      };

      // Create Razorpay order via backend
      const response = await fetch("http://localhost:8080/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error(await response.text());
      const razorpayOrderId = await response.text();

      // Open Razorpay checkout interface
      const options = {
        key: "rzp_test_S9aIWhANSeEGz9", // Replace with your Razorpay Key ID
        amount: subtotal * 100, // Razorpay expects amount in paise
        currency: "INR",
        name: "SalesSavvy",
        description: "Test Transaction",
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            // Payment success, verify on backend
            const verifyResponse = await fetch("http://localhost:8080/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id, // Ensure key matches backend
                razorpayPaymentId: response.razorpay_payment_id, // Ensure key matches backend
                razorpaySignature: response.razorpay_signature, // Ensure key matches backend
              }),
            });
            const result = await verifyResponse.text();
            if (verifyResponse.ok) {
              alert("Payment verified successfully!");
              navigate("/customerhome"); // Redirect to Customer Home Page
            } else {
              alert("Payment verification failed: " + result);
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: username,
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Payment failed. Please try again.");
      console.error("Error during checkout:", error);
    }
  };

  const totalProducts = () => cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const shipping = (5.0 * 74).toFixed(2); // Hardcoded shipping value

  if (cartItems.length === 0) {
    return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
  <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-10 text-center max-w-md w-full border border-white/20">

    <div className="text-6xl mb-6">🛒</div>

    <h2 className="text-3xl font-bold text-white mb-3">
      Your Cart is Empty
    </h2>

    <p className="text-white/80 mb-8">
      Looks like you haven’t added anything yet.
      Start shopping to fill it up!
    </p>

    <button className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
    onClick={() => navigate("/customerhome")}>
      Start Shopping
    </button>

  </div>
</div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
  <Header cartCount={totalProducts()} username={username} />

  <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

    {/* CART SECTION */}
    <div className="lg:col-span-2 bg-slate-900/80 backdrop-blur rounded-2xl p-6 shadow-xl border border-slate-800">

      <a
        href="#"
        className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition mb-6"
      >
        ← Continue Shopping
      </a>

      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Shopping Cart</h2>
        <p className="text-slate-400 mt-1">
          You have {cartItems.length} items in your cart
        </p>
      </div>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.product_id}
            className="flex gap-6 p-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 transition border border-slate-700"
          >
            <img
              src={item.image_url || "https://via.placeholder.com/80?text=No+Image"}
              alt={item.name}
              className="h-24 w-24 rounded-lg object-cover border border-slate-700"
            />

            <div className="flex flex-1 justify-between">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-slate-400 text-sm mt-1">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center rounded-lg border border-slate-600">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product_id, item.quantity - 1)
                    }
                    className="px-3 py-1 hover:bg-slate-700 rounded-l-lg"
                  >
                    −
                  </button>
                  <span className="px-4 font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product_id, item.quantity + 1)
                    }
                    className="px-3 py-1 hover:bg-slate-700 rounded-r-lg"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-indigo-400">
                    ₹{item.total_price}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(item.product_id)}
                    className="text-red-400 hover:text-red-300 transition text-lg"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ORDER SUMMARY */}
    <div className="bg-slate-900/80 backdrop-blur rounded-2xl p-6 shadow-xl border border-slate-800 h-fit sticky top-24">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-4 text-slate-300">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium text-slate-100">₹{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-medium text-slate-100">₹{shipping}</span>
        </div>

        <div className="flex justify-between">
          <span>Total Products</span>
          <span className="font-medium text-slate-100">
            {totalProducts()}
          </span>
        </div>

        <div className="border-t border-slate-700 pt-4 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-indigo-400">
            ₹{(parseFloat(subtotal) + parseFloat(shipping)).toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 font-semibold text-white shadow-lg hover:scale-[1.02] hover:shadow-indigo-500/30 transition"
      >
        Proceed to Checkout
      </button>
    </div>
  </div>

  <Footer />
</div>

  );
};

export default CartPage;