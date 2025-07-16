import React, { useState } from 'react';
import { Link } from "react-router-dom"; // Import Link from react-router-dom

// Header Component
const Header = () => { // Removed setPage from props
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between flex-wrap rounded-lg shadow-md">
      {/* My Gallery (Brand/Logo) - Links to Home Route */}
      <Link
        to="/"
        onClick={() => setIsMenuOpen(false)} // Close menu on navigation
        className="text-white text-3xl font-extrabold tracking-wide hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
        aria-label="Go to Home"
      >
        My Gallery
      </Link>

      {/* Toggler Button (Hamburger Icon for small screens) */}
      <button
        className="lg:hidden block text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 p-3 rounded-lg "
        type="button"
        aria-label="Toggle navigation"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen ? "true" : "false"}
      >
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Collapsible Menu Content (Add Image & Add Category) */}
      <div
        className={`${isMenuOpen ? 'block' : 'hidden'} lg:flex lg:items-center w-full lg:w-auto mt-4 lg:mt-0`}
        id="navbarSupportedContent"
      >
        {/* Changed flex-col to flex-row, added flex-wrap and justify-center, and adjusted spacing */}
        <ul className="flex flex-row flex-wrap justify-center space-x-4 w-full lg:w-auto lg:ml-auto items-center">
          {/* Add Image Link - Navigates to /add-image */}
          <li>
            <Link
              to="/add-image"
              onClick={() => setIsMenuOpen(false)} // Close menu on navigation
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 block text-center lg:w-auto my-2 lg:my-0"
              aria-label="Add a new image"
            >
              Add Image
            </Link>
          </li>
          {/* Add Category Link - Navigates to /add-category */}
          <li>
            <Link
              to="/add-category"
              onClick={() => setIsMenuOpen(false)} // Close menu on navigation
              className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 block text-center lg:w-auto my-2 lg:my-0"
              aria-label="Add a new category"
            >
              Add Category
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Header;
