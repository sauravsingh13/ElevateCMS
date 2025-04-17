"use client";
import { useState } from "react";

export default function SignupModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, isSignup: true })
    });
    const data = await res.json();
    if (res.ok) window.location.href = "/dashboard";
    else setError(data.error || "Signup failed");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-2xl bg-black/30">
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-2xl p-8 animate-fade-in">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 drop-shadow-md mb-6 animate-pulse">
            Create Your Elevate Account 🚀
        </h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSignup}>
          <input type="text" placeholder="Name" className="w-full mb-4 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" className="w-full mb-4 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full mb-4 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2.5 rounded-md shadow-md hover:from-blue-700 hover:to-blue-800 transition">Create Account</button>
        </form>
        <button onClick={onClose} className="mt-4 text-sm text-gray-500 hover:text-blue-600 transition underline w-full text-center">Cancel</button>
      </div>
    </div>
  );
}
