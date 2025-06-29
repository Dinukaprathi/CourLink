import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import ThemeSwitcher from "../common/ThemeSwitcher.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@redux/slices/authSlice.js";

const AuthenticatedNavbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state?.auth?.role);
  const path = role === "admin" ? "/admin" : "/owner";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section - logo and sidebar toggle */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleSidebar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-50 focus:outline-none lg:hidden"
            >
              <Menu size={20} />
            </button>
            
            <Link 
              to={path} 
              className="flex items-center text-xl font-semibold text-gray-800 hover:text-gray-900"
            >
              <span className="ml-2">CourtLink</span>
            </Link>
          </div>

          {/* Right section - controls */}
          <div className="flex items-center space-x-3">
            <ThemeSwitcher />
            
            <button 
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthenticatedNavbar;