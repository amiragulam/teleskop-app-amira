import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-900">
      <div className="container mx-auto p-4 md:px-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-orange-400 text-xl font-bold">
              Teleskop
            </Link>
          </div>
          <div className="hidden md:flex">
            <NavLink to="/" label="API" />
            <NavLink to="/assets" label="Assets" />
            <NavLink to="/contact" label="Contact" />
          </div>
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, label }) => {
  return (
    <Link
      to={to}
      className="text-orange-400 px-3 py-2 rounded-md text-sm font-medium hover:text-white"
    >
      {label}
    </Link>
  );
};

const MobileMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="text-orange-400 p-2 focus:outline-none focus:text-white"
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
          <MobileMenuItem to="/" label="Home" toggleMenu={toggleMenu} />
          <MobileMenuItem to="/assets" label="Assets" toggleMenu={toggleMenu} />
          <MobileMenuItem
            to="/contact"
            label="Contact"
            toggleMenu={toggleMenu}
          />
        </div>
      )}
    </div>
  );
};

const MobileMenuItem = ({ to, label, toggleMenu }) => {
  return (
    <Link
      to={to}
      onClick={toggleMenu}
      className="block px-4 py-2 text-sm text-slate-900 hover:bg-gray-100"
    >
      {label}
    </Link>
  );
};

export default Navbar;
