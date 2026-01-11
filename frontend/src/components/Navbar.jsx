

import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { UserAppContext } from "../context/UserAppContext";
import {  useNavigate } from "react-router-dom";

const Navbar = () => {
  const { token, setToken, userId } = useContext(UserAppContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const cartItemCount = cart.length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
     navigate("/");
  };

  return (
    <nav className="bg-[#3AAFA9] text-white shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide flex items-center gap-2 hover:opacity-90 transition-all duration-200"
        >
          📚 BookVerse
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-lg font-medium">
          {["Home", "Books", "About", "Contact"].map((item, index) => (
            <Link
              key={index}
              to={`/${item === "Home" ? "" : item.toLowerCase()}`}
              className="relative hover:text-[#DEF2F1] after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} className="hover:scale-110 transition-transform" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Auth Section */}
          {!token ? (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-[#3AAFA9] transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-[#3AAFA9] px-4 py-2 rounded-lg font-semibold hover:bg-[#DEF2F1] transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 font-semibold hover:opacity-90 transition-all"
              >
                <User size={22} />
                <span>Profile</span>
              </button>

              {dropdownOpen && (
                <ul className="absolute right-0 mt-3 w-44 bg-white text-gray-700 rounded-lg shadow-xl overflow-hidden animate-fadeIn">
                  <li>
                    <Link
                      to="/my-profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cart"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      My Cart
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/my-orders/${userId}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden fixed top-0 right-0 w-72 h-full bg-[#3AAFA9] shadow-2xl z-40 p-6 animate-slideIn">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setMenuOpen(false)}
          >
            <X size={28} />
          </button>

          <div className="mt-16 flex flex-col gap-6 text-lg font-semibold text-white">
            {["Home", "Books", "About", "Contact"].map((item, index) => (
              <Link
                key={index}
                to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#DEF2F1]"
              >
                {item}
              </Link>
            ))}

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 hover:text-[#DEF2F1]"
            >
              <ShoppingCart size={22} /> Cart
              {cartItemCount > 0 && (
                <span className="ml-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {!token ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="bg-white text-[#3AAFA9] px-4 py-2 rounded-lg text-center font-medium hover:bg-[#DEF2F1]"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="border border-white px-4 py-2 rounded-lg text-center font-medium hover:bg-white hover:text-[#3AAFA9]"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/my-profile"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-[#DEF2F1]"
                >
                  My Profile
                </Link>
                <Link
                  to={`/my-orders/${userId}`}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-[#DEF2F1]"
                >
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white text-[#3AAFA9] px-4 py-2 rounded-lg font-semibold hover:bg-[#DEF2F1]"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
