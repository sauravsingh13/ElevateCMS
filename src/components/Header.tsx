"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  let router = useRouter();
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("name");
      if (storedName) setName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    router.push("/");
  };

  return (
    <header className="flex justify-between items-center max-w-7xl mx-auto bg-gradient-to-r from-white via-slate-50 to-white/90 backdrop-blur px-6 py-4 rounded-xl shadow-md h-20 transition-all duration-300">
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="text-gray-700 hover:text-gray-900"
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      </div>
      <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">
        ElevateCMS
      </div>
      <div className="flex items-center gap-4">
        <h2 className="text-sm text-gray-600">Welcome, {name}</h2>
        <button
          onClick={handleLogout}
          className="text-sm bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-md transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
