

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
     
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-3 absolute top-[-55px] left-4 bg-[#2B7A78] text-white rounded shadow-md hover:bg-[#226B6A] transition"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

     
      <div
        className={`fixed top-0 left-0 h-screen bg-[#2B7A78] text-white p-5 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-56 w-64 md:static z-50 shadow-lg`}
      >
        <h2 className="text-2xl font-bold mb-6 tracking-wide">Admin Panel</h2>

        <ul className="space-y-3">
          <li>
            <Link
              onClick={() => setIsOpen(false)}
              to="/dashboard"
              className="block p-2 rounded hover:bg-[#3AAFA9] transition"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setIsOpen(false)}
              to="/books"
              className="block p-2 rounded hover:bg-[#3AAFA9] transition"
            >
              Books
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setIsOpen(false)}
              to="/orders"
              className="block p-2 rounded hover:bg-[#3AAFA9] transition"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setIsOpen(false)}
              to="/users"
              className="block p-2 rounded hover:bg-[#3AAFA9] transition"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setIsOpen(false)}
              to="/new-book"
              className="block p-2 rounded hover:bg-[#3AAFA9] transition"
            >
              Add New Book
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
