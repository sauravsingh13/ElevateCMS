import React from 'react';
import Link from 'next/link';
import AdminNavbar from "@/components/AdminNavbar";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>
        <Link href="/admin/create-post">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Create New Post</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
