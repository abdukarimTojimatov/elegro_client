import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsDropdownOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path); // Use navigate instead of window.location.href
    closeMobileMenu();
  };

  return (
    <div className="w-full mb-8">
      <nav className="relative">
        {/* Gradient effects */}
        <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-full blur-sm" />
        <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-full" />

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex justify-between items-center px-4 py-4">
          <div className="text-xl font-bold text-white">Menu</div>
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-center space-x-8 md:space-x-12 text-lg md:text-xl">
              <button
                onClick={() => handleNavigation("/")}
                className="text-white hover:text-indigo-400 transition-colors duration-200"
              >
                Xarajatlar
              </button>
              <button
                onClick={() => handleNavigation("/sharings")}
                className="text-white hover:text-indigo-400 transition-colors duration-200"
              >
                Ulushlar
              </button>
              <button
                onClick={() => handleNavigation("/orders")}
                className="text-white hover:text-indigo-400 transition-colors duration-200"
              >
                Buyurtma
              </button>
              {/* <button
                onClick={() => handleNavigation("/orders/create")}
                className="text-white hover:text-indigo-400 transition-colors duration-200"
              >
                Buyurtmalar Yaratish
              </button> */}
              <button
                onClick={() => handleNavigation("/rawMaterial")}
                className="text-white hover:text-indigo-400 transition-colors duration-200"
              >
                Homashyolar
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute z-20 w-full bg-indigo-700">
            <div className="flex flex-col items-center space-y-4 py-6">
              <button
                onClick={() => handleNavigation("/")}
                className="text-white text-lg hover:text-indigo-300"
              >
                Xarajatlar
              </button>
              <button
                onClick={() => handleNavigation("/sharings")}
                className="text-white text-lg hover:text-indigo-300"
              >
                Ulushlar
              </button>
              <button
                onClick={() => handleNavigation("/incomes")}
                className="text-white text-lg hover:text-indigo-300"
              >
                Dashboard
              </button>
              <button
                onClick={() => handleNavigation("/orders")}
                className={`text-white text-lg hover:text-indigo-300 ${
                  isDropdownOpen ? "border-b-2 border-indigo-500" : ""
                }`}
              >
                Buyurtma
              </button>
              {/* <button
                onClick={() => handleNavigation("/orders/create")}
                className={`text-white text-lg hover:text-indigo-300 ${
                  isDropdownOpen ? "border-b-2 border-indigo-500" : ""
                }`}
              >
                Buyurtma Yaratish
              </button> */}
              <button
                onClick={() => handleNavigation("/rawMaterial")}
                className={`text-white text-lg hover:text-indigo-300 ${
                  isDropdownOpen ? "border-b-2 border-indigo-500" : ""
                }`}
              >
                Homashyolar
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
