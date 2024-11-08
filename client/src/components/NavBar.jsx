import { Moon, Sun, MenuIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";
import AuthStore from "../store/AuthStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { isAuthenticated, user } = AuthStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="shadow-md py-4 fixed top-0 left-0 min-w-full dark:bg-green-300">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">
            Job<span className="text-teal-500">Finder</span>
          </h1>
          <span className="text-sm ml-2">Primary</span>
        </div>
        <div className="flex items-center space-x-4">
        {/* Hamburger Icon for Small Screens */}
        <button
          className="lg:hidden hover:text-gray-800 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon />
        </button>

        {/* Navigation Links */}
        <div
          className={`flex-col lg:flex lg:flex-row lg:space-x-8 absolute lg:static lg:bg-transparent dark:bg-green-300 transition-all duration-300 ${
            isOpen ? "top-16 left-0 w-full z-10" : "hidden lg:flex"
          }`}
        >
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
            <Link to="/" className="hover:text-teal-500 font-semibold" onClick={()=> setIsOpen(!isOpen)}>
              Home
            </Link>
            <Link to="/about" className="hover:text-teal-500" onClick={()=> setIsOpen(!isOpen)}>
              About
            </Link>
            <Link to="/jobs" className="hover:text-teal-500" onClick={()=> setIsOpen(!isOpen)}>
              Jobs
            </Link>

            <Link to="/contact" className="hover:text-teal-500" onClick={()=> setIsOpen(!isOpen)}>
              Contact
            </Link>
          </div>
          
        </div>
          {/* Dark Mode Toggle (Icon placeholder) */}
          <button className="hover:text-gray-800" onClick={toggleTheme}>
            {theme == "dark" ? <Sun /> : <Moon />}
          </button>

          {/* Profile or Login Button */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <Link to="/profile">
                {user?.profilePicture?<img
                  src={`data:image/jpeg;base64,${Buffer.from(user?.profilePicture).toString('base64')}`}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-amber-300"
                />:<img src="https://via.placeholder.com/150" alt="profile" className="w-10 h-10 rounded-full border-2 border-amber-300" />}
              </Link>
            ) : (
              <button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
                <Link to="/login">Login</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
