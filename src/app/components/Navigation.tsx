import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Users, Briefcase, Calendar, LayoutDashboard, Heart } from "lucide-react";
import logo from "../../imports/Logo.jpeg";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/alumni", label: "Alumni", icon: Users },
    { path: "/events", label: "Events", icon: Calendar },
    { path: "/news", label: "News" },
    { path: "/spotlight", label: "Spotlight" },
    { path: "/market", label: "Market" },
    { path: "/admin", label: "Admin", icon: LayoutDashboard },
  ];

  const donateLink = { path: "/donate", label: "Donate", icon: Heart };

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="PUEA Alumni Logo" className="w-12 h-12 object-contain" />
              <span className="text-xl font-bold text-[#156BF4]">PUEA Alumni</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                    isActive(link.path)
                      ? "text-[#156BF4] bg-purple-50 font-semibold"
                      : "text-[#156BF4] hover:text-[#0EA5E9] hover:bg-purple-50"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              );
            })}
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
              <Link
                to="/donate"
                className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
              >
                <Heart className="w-4 h-4" /> Donate
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 text-[#156BF4] hover:text-[#0EA5E9] transition-colors font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-[#156BF4] hover:text-[#0EA5E9] transition-colors font-medium"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                    isActive(link.path)
                      ? "text-[#156BF4] bg-purple-50 font-semibold"
                      : "text-[#156BF4] hover:bg-purple-50"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-gray-200 space-y-1">
              <Link
                to="/donate"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-md font-medium"
              >
                <Heart className="w-4 h-4" /> Donate
              </Link>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-[#156BF4] hover:bg-purple-50 rounded-md font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-[#156BF4] hover:bg-purple-50 rounded-md font-medium"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
