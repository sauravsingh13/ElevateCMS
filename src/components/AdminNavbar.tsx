import React from 'react';
import Link from 'next/link';

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-semibold">My CMS</Link>
        <div>
          <Link href="/admin" className="text-white ml-4">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
