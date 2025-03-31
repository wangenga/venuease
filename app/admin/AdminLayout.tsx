'use client';

import React from "react";
import Link from "next/link";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className=" pt-20 flex min-h-screen">
        
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 border-r border-gray-200">
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin"
                className="block px-4 py-2 rounded hover:bg-gray-200"
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                href="/admin/listings"
                className="block px-4 py-2 rounded hover:bg-gray-200"
              >
                Listings
              </Link>
            </li>
            <li>
              <Link
                href="/admin/bookings"
                className="block px-4 py-2 rounded hover:bg-gray-200"
              >
                Bookings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
