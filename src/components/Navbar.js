import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#87ceeb]">CRYPTOFOLIO</h1>
        
        <ul className="flex space-x-6">
          {["Home", "Book Now", "Admin"].map((text, index) => {
            const path = text === "Home" ? "/" : `/${text.toLowerCase().replace(" ", "")}`;
            return (
              <li key={index}>
                <Link
                  to={path}
                  className={`px-4 py-2 rounded-lg transition duration-300 ${
                    location.pathname === path ? "bg-[#87ceeb] text-black" : "hover:text-[#87ceeb]"
                  }`}
                >
                  {text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
