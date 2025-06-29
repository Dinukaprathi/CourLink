import { Link, NavLink, useNavigate } from "react-router-dom";
import ThemeSwitcher from "../common/ThemeSwitcher.jsx";
import { logout } from "../../redux/slices/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

export default function AuthNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and main navigation */}
          <div className="flex items-center space-x-8">
  <Link to="/auth" className="flex items-center space-x-2">
    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-r from-green-600 to-blue-600">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
        <text x="4" y="17" fontSize="12" fontWeight="bold" fill="white">CL</text>
      </svg>
    </div>
    <span className="font-bold text-xl text-gray-800">CourtLink</span>
  </Link>
            
            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-1">
              <NavLink 
                to="/auth" 
                className={({ isActive }) => 
                  `px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive 
                      ? "text-green-600 bg-green-50" 
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  }`
                }
                end
              >
                Home
              </NavLink>
              
              <NavLink 
                to="/auth/turfs" 
                className={({ isActive }) => 
                  `px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive 
                      ? "text-green-600 bg-green-50" 
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  }`
                }
              >
                Turfs
              </NavLink>
              
              <NavLink 
                to="/auth/booking-history" 
                className={({ isActive }) => 
                  `px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive 
                      ? "text-green-600 bg-green-50" 
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  }`
                }
              >
                My Bookings
              </NavLink>
              
              <NavLink 
                to="/auth/become-owner" 
                className={({ isActive }) => 
                  `px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive 
                      ? "text-green-600 bg-green-50" 
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  }`
                }
              >
                Become an Owner
              </NavLink>
            </nav>
          </div>
          
          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            
            {/* Profile dropdown */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="flex items-center space-x-2 cursor-pointer">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center text-white font-medium">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="hidden md:inline-block text-sm font-medium text-gray-700">
                  {user?.name?.split(' ')[0] || 'Account'}
                </span>
              </label>
              
              <ul 
                tabIndex={0} 
                className="dropdown-content menu shadow-md bg-white rounded-box w-56 mt-2 z-50 border border-gray-100"
              >
                <li className="px-4 py-3 border-b border-gray-100">
                  <div className="font-medium text-gray-900">{user?.name || 'User'}</div>
                  <div className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</div>
                </li>
                <li>
                  <Link to="/auth/profile" className="text-gray-700 hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/auth/settings" className="text-gray-700 hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    Settings
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-700 hover:bg-gray-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                    </svg>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden ml-4">
            <label htmlFor="mobile-menu" className="dropdown">
              <div tabIndex={0} className="btn btn-ghost btn-square">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <ul tabIndex={0} className="dropdown-content menu menu-sm mt-3 z-[1] p-2 shadow bg-white rounded-box w-52 right-0">
                <li><Link to="/auth">Home</Link></li>
                <li><Link to="/auth/turfs">Turfs</Link></li>
                <li><Link to="/auth/booking-history">My Bookings</Link></li>
                <li><Link to="/auth/become-owner">Become an Owner</Link></li>
                <li className="border-t border-gray-100 mt-1 pt-1">
                  <Link to="/auth/profile">Profile</Link>
                </li>
                <li><Link to="/auth/settings">Settings</Link></li>
                <li>
                  <button onClick={handleLogout}>Sign Out</button>
                </li>
              </ul>
            </label>
          </div>
        </div>
      </div>
    </header>
  );
}