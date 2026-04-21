import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:9090/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        data.role === "ADMIN"
          ? navigate("/admindashboard")
          : navigate("/customerhome");
      } else {
        throw new Error(data.error || "Login failed");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1601597111158-2fceff292cdc')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Glass Card */}
      <div className="relative w-[380px] rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 text-white">
        <h1 className="text-3xl font-semibold text-center mb-6 tracking-wide">
          Admin Login
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-2 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="text-sm opacity-80">Username</label>
            <input
              type="text"
              placeholder="Enter admin username"
              className="mt-1 w-full rounded-xl bg-white/20 px-4 py-2 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm opacity-80">Password</label>
            <input
              type="password"
              placeholder="Enter admin password"
              className="mt-1 w-full rounded-xl bg-white/20 px-4 py-2 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 py-2 font-semibold text-black hover:scale-[1.02] transition-transform shadow-lg"
          >
            Enter As Admin
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/70">
          Not Admin?{" "}
          <a href="/" className="text-cyan-400 hover:underline">
            Login as User
          </a>
        </p>
      </div>
    </div>
  );
}
