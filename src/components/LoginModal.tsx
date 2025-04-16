"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, isSignup: false })
    });
    const data = await res.json();
    console.log('json', data);
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.user.name);
      router.push("/dashboard");
    } else setError(data.error || "Login failed");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-2xl bg-black/30">
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-2xl p-8 animate-fade-in">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Welcome Back</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" className="w-full mb-4 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full mb-4 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2.5 rounded-md shadow-md hover:from-blue-700 hover:to-blue-800 transition">Login</button>
        </form>
        <button onClick={onClose} className="mt-4 text-sm text-gray-500 hover:text-blue-600 transition underline w-full text-center">Cancel</button>
      </div>
    </div>
  );
}
