

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, LogOut, Menu, X } from "lucide-react";
import footer_logo from "../assets/footer-logo.png";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { setAToken } = useContext(AdminContext);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAToken("");
    toast.success("Logout successful!");
    navigate("/");
  };

  return (
    <nav className="bg-[#3AAFA9] p-4 text-white flex justify-between items-center relative shadow-md">
      {/* Left Section - Logo */}
      <div className="flex items-center space-x-2">
        <img src={footer_logo} alt="Logo" className="h-10" />
        <h1 className="text-xl ml-12 sm:ml-6 font-bold tracking-wide">Book Store</h1>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded focus:outline-none hover:bg-[#2E8F8B]/30 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Middle Section - Admin Name */}
      <div className="hidden md:block text-lg font-semibold">Admin</div>

      {/* Right Section - Notifications & Logout */}
      <div className="hidden md:flex items-center space-x-4">
        <button className="relative p-2 rounded hover:bg-[#2E8F8B]/40 transition">
          <Bell size={24} />
          <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full px-1">
            3
          </span>
        </button>

        {/* ✅ Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 flex items-center space-x-2 transition"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* ✅ Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#2E8F8B] p-4 md:hidden flex flex-col space-y-4 shadow-lg">
          <div className="text-lg font-semibold text-center text-white">Admin</div>

          <button className="relative p-2 rounded hover:bg-[#3AAFA9]/40 flex items-center justify-center transition">
            <Bell size={24} />
            <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full px-1">
              3
            </span>
          </button>

          {/* ✅ Mobile Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 flex items-center justify-center space-x-2 transition"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
}
