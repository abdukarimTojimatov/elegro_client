import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full mb-8">
      <nav className="relative w-1/2 mx-auto">
        {/* Gradient effects similar to header */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Navigation links */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center space-x-8 md:space-x-12 text-lg md:text-xl ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white hover:text-indigo-400 transition-colors duration-200  ${
                  isActive ? "border-b-2 border-indigo-500" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/expenses"
              className={({ isActive }) =>
                `text-white hover:text-indigo-400 transition-colors duration-200 ${
                  isActive ? "border-b-2 border-indigo-500" : ""
                }`
              }
            >
              Expenses
            </NavLink>
            <NavLink
              to="/incomes"
              className={({ isActive }) =>
                `text-white hover:text-indigo-400 transition-colors duration-200 ${
                  isActive ? "border-b-2 border-indigo-500" : ""
                }`
              }
              å
            >
              Incomes
            </NavLink>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `text-white hover:text-indigo-400 transition-colors duration-200 ${
                  isActive ? "border-b-2 border-indigo-500" : ""
                }`
              }
            >
              Orders
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
