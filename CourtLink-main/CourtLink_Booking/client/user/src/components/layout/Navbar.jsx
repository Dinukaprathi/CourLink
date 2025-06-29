import { Link } from "react-router-dom";
import ThemeSwitcher from "../common/ThemeSwitcher";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 animate-slide-in-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-r from-green-600 to-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">CourtLink</span>
              </Link>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden sm:ml-8 sm:flex sm:items-center sm:space-x-2">
              <Link 
                to="/" 
                className="px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
              >
                Home
              </Link>
              
              <Link 
                to="/turfs" 
                className="px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
              >
                Turfs
              </Link>
            </div>
          </div>
          
          {/* Right side */}
          <div className="flex items-center">
            {/* Theme switcher */}
            <div className="flex-shrink-0 mr-2">
              <ThemeSwitcher />
            </div>
            
            {/* Login button */}
            <Link 
              to="/login" 
              className="ml-4 px-4 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-colors duration-300"
            >
              Login
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu menu-sm z-[1] mt-3 p-2 shadow bg-white rounded-box w-52"
              >
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/turfs">Turfs</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;