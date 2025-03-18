import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.svg";
import User from "./User";
import { nav } from "../../assets/data/data";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (window.scrollY > 100) {
        header.classList.add("sticky", "top-0", "shadow-lg", "z-[9999]");
      } else {
        header.classList.remove("sticky", "top-0", "shadow-md", "z-[9999]");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="header bg-white !shadow-md transition-all duration-300 z-44">
      <div className="container mx-auto flex justify-between items-center py-6 px-6">
        {/* Hamburger Menu (Mobile Only) */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 h-0.5 bg-gray-700 mb-1 transition-transform"></div>
          <div className="w-6 h-0.5 bg-gray-700 mb-1 transition-opacity"></div>
          <div className="w-6 h-0.5 bg-gray-700 transition-transform"></div>
        </button>

        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="logo" className="w-24" />
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6">
            {nav.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.url}
                  className="text-gray-700 hover:text-blue-500 transition capitalize"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Account */}
        <div className="account flex items-center">
          <User />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg z-50">
          <ul className="flex flex-col py-4">
            {nav.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.url}
                  className="block px-6 py-3 text-gray-700 hover:bg-gray-100 transition capitalize"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;