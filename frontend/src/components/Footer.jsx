// import React from "react";
// import { NavLink } from "react-router-dom";
// import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-16">
//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
//         {/* About Section */}
//         <div>
//           <h3 className="text-xl font-semibold text-white">About Us</h3>
//           <p className="mt-3 text-gray-400">
//             Discover the best books, top-rated reads, and must-have literature.
//             Your next adventure starts here.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="text-xl font-semibold text-white">Quick Links</h3>
//           <ul className="mt-3 space-y-2">
//             <li>
//               <NavLink
//                 to="/"
//                 className={({ isActive }) =>
//                   `transition ${isActive ? "text-yellow-400" : "hover:text-yellow-400"}`
//                 }
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/books"
//                 className={({ isActive }) =>
//                   `transition ${isActive ? "text-yellow-400" : "hover:text-yellow-400"}`
//                 }
//               >
//                 Books
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/about"
//                 className={({ isActive }) =>
//                   `transition ${isActive ? "text-yellow-400" : "hover:text-yellow-400"}`
//                 }
//               >
//                 About
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/contact"
//                 className={({ isActive }) =>
//                   `transition ${isActive ? "text-yellow-400" : "hover:text-yellow-400"}`
//                 }
//               >
//                 Contact
//               </NavLink>
//             </li>
//           </ul>
//         </div>

//         {/* Social Media Links */}
//         <div>
//           <h3 className="text-xl font-semibold text-white">Follow Us</h3>
//           <div className="mt-3 flex justify-center md:justify-start space-x-5">
//             <a href="#" className="hover:text-yellow-400 transition">
//               <Facebook size={24} />
//             </a>
//             <a href="#" className="hover:text-yellow-400 transition">
//               <Twitter size={24} />
//             </a>
//             <a href="#" className="hover:text-yellow-400 transition">
//               <Instagram size={24} />
//             </a>
//             <a href="#" className="hover:text-yellow-400 transition">
//               <Linkedin size={24} />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Copyright Section */}
//       <div className="mt-10 text-center text-gray-500">
//         © {new Date().getFullYear()} BookStore. All rights reserved.
//       </div>
//     </footer>
//   );
// }


import React from "react";
import { NavLink } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-tl from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-12 px-6 md:px-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        
        {/* About Section */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">About Us</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Discover the best books, top-rated reads, and must-have literature.
            Your next adventure starts here. Dive into worlds of knowledge and imagination.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {["Home", "Books", "About", "Contact"].map((link) => (
              <li key={link}>
                <NavLink
                  to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                  className={({ isActive }) =>
                    `transition-all duration-300 hover:text-yellow-400 font-medium ${
                      isActive ? "text-yellow-400" : "text-gray-300"
                    }`
                  }
                >
                  {link}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-5 mt-2">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
              <a
                href="#"
                key={idx}
                className="bg-gray-700 hover:bg-yellow-400 p-3 rounded-full transition-all duration-300 text-white hover:text-gray-900"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} BookStore. All rights reserved.
      </div>
    </footer>
  );
}
