import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Menu, X, Heart, ChevronDown,
  Users, Calendar, Briefcase, ShoppingBag,
  LayoutDashboard, Info, BookOpen, Trophy,
  Clock, FileText, PlusCircle, GraduationCap,
  Star, Building2, Tag, Home, Phone, Hammer,
  User as UserIcon, LogOut,
} from "lucide-react";
import logo from "../../imports/Logo.jpeg";
import { useAuth } from "../../context/AuthContext";

interface SubItem { path: string; label: string; icon: React.ElementType; desc: string }
interface NavItem { path: string; label: string; icon: React.ElementType; items?: SubItem[] }

const BASE_NAV: NavItem[] = [
  { path: "/", label: "Home", icon: Home },
  {
    path: "/about",
    label: "About Us",
    icon: Info,
    items: [
      { path: "/about", label: "About PUEA Alumni", icon: Info, desc: "Who we are and what we stand for" },
      { path: "/about", label: "Mission & Vision", icon: BookOpen, desc: "Our purpose and long-term goals" },
      { path: "/about", label: "Leadership Team", icon: Users, desc: "Meet the executive committee" },
      { path: "/about", label: "Alumni Constitution", icon: FileText, desc: "Download the official PDF" },
    ],
  },
  {
    path: "/alumni",
    label: "Alumni",
    icon: Users,
    items: [
      { path: "/alumni", label: "Alumni Directory", icon: Users, desc: "Browse and search all members" },
      { path: "/spotlight", label: "Alumni Spotlight", icon: Star, desc: "Distinguished alumni stories" },
      { path: "/spotlight", label: "Alumni Achievements", icon: Trophy, desc: "Celebrating our brightest" },
    ],
  },
  {
    path: "/events",
    label: "Events & News",
    icon: Calendar,
    items: [
      { path: "/events", label: "Upcoming Events", icon: Calendar, desc: "Register for upcoming gatherings" },
      { path: "/events", label: "Past Events", icon: Clock, desc: "Relive previous events" },
      { path: "/news", label: "Latest News", icon: FileText, desc: "Announcements & updates" },
      { path: "/projects", label: "Projects", icon: Hammer, desc: "Alumni-driven community projects" },
    ],
  },
  {
    path: "/jobs",
    label: "Jobs",
    icon: Briefcase,
    items: [
      { path: "/jobs", label: "Job Listings", icon: Briefcase, desc: "Browse all open positions" },
      { path: "/jobs/post", label: "Post a Job", icon: PlusCircle, desc: "Share an opportunity" },
      { path: "/jobs/internships", label: "Internships", icon: GraduationCap, desc: "Programmes for students" },
    ],
  },
  {
    path: "/market",
    label: "Marketplace",
    icon: ShoppingBag,
    items: [
      { path: "/market", label: "Products & Services", icon: ShoppingBag, desc: "Browse alumni listings" },
      { path: "/market", label: "Business Directory", icon: Building2, desc: "Alumni-owned businesses" },
      { path: "/market", label: "Featured Listings", icon: Tag, desc: "Top picks this month" },
    ],
  },
  { path: "/contact", label: "Contact", icon: Phone },
];

const ADMIN_NAV_ITEM: NavItem = { path: "/admin", label: "Admin", icon: LayoutDashboard };

function Dropdown({ items, onClose }: { items: SubItem[]; onClose: () => void }) {
  return (
    <div className="absolute top-[calc(100%+6px)] left-0 w-60 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 py-1">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={`${item.path}-${item.label}`}
            to={item.path}
            onClick={onClose}
            className="flex items-start gap-3 px-4 py-3 hover:bg-[#90e0ef]/25 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "#ade8f4" }}>
              <Icon className="w-4 h-4" style={{ color: "#03045e" }} />
            </div>
            <div>
              <div className="text-sm font-semibold leading-tight" style={{ color: "#03045e" }}>{item.label}</div>
              <div className="text-xs mt-0.5 leading-tight" style={{ color: "#0077b6" }}>{item.desc}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const NAV: NavItem[] =
    isAuthenticated && user?.role === "admin"
      ? [...BASE_NAV, ADMIN_NAV_ITEM]
      : BASE_NAV;

  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    await logout();
    setProfileOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
    setMobileExpanded(null);
    setProfileOpen(false);
  }, [location.pathname]);

  const isActive = (item: NavItem) => {
    if (item.path === "/") return location.pathname === "/";
    if (item.path === "/events") return location.pathname.startsWith("/events") || location.pathname.startsWith("/news");
    if (item.path === "/alumni") return location.pathname.startsWith("/alumni") || location.pathname.startsWith("/spotlight");
    if (item.path === "/market") return location.pathname.startsWith("/market");
    if (item.path === "/jobs") return location.pathname.startsWith("/jobs");
    return location.pathname.startsWith(item.path);
  };

  const toggle = (path: string) => setOpenMenu((p) => (p === path ? null : path));

  return (
    <nav ref={navRef} className="sticky top-0 z-50 shadow-md" style={{ backgroundColor: "#ade8f4" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-4">

          {/* Brand — logo + name only, no Home link here */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logo} alt="PUEA Alumni" className="w-9 h-9 object-contain" />
            <span className="text-sm font-bold whitespace-nowrap" style={{ color: "#03045e" }}>PUEA Alumni</span>
          </Link>

          {/* Desktop nav — fills remaining space, centred */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {NAV.map((item) => {
              const active = isActive(item);
              const open = openMenu === item.path;
              return (
                <div key={item.path} className="relative">
                  {item.items ? (
                    <button
                      onClick={() => toggle(item.path)}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-all whitespace-nowrap"
                      style={active ? { backgroundColor: "#0077b6", color: "#fff" } : { color: "#03045e" }}
                    >
                      {item.label}
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-all whitespace-nowrap"
                      style={active ? { backgroundColor: "#0077b6", color: "#fff" } : { color: "#03045e" }}
                    >
                      {item.label}
                    </Link>
                  )}
                  {item.items && open && <Dropdown items={item.items} onClose={() => setOpenMenu(null)} />}
                </div>
              );
            })}
          </div>

          {/* Auth + Donate — right side */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <Link
              to="/donate"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-semibold text-white"
              style={{ backgroundColor: "#0077b6" }}
            >
              <Heart className="w-3.5 h-3.5" /> Donate
            </Link>

            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-lg transition-colors hover:bg-white/40"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white"
                    style={{ backgroundColor: "#03045e" }}
                  >
                    {initials || <UserIcon className="w-4 h-4" />}
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${profileOpen ? "rotate-180" : ""}`}
                    style={{ color: "#03045e" }}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold truncate" style={{ color: "#03045e" }}>
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#ade8f4]/25"
                      style={{ color: "#03045e" }}
                    >
                      <UserIcon className="w-4 h-4" /> Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-lg text-[13px] font-medium border"
                  style={{ color: "#03045e", borderColor: "#0077b6" }}
                >
                  Login
                </Link>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-lg text-[13px] font-semibold text-white"
                  style={{ backgroundColor: "#03045e" }}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden ml-auto">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md"
              style={{ color: "#03045e" }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t overflow-y-auto"
          style={{ backgroundColor: "#ade8f4", borderColor: "#0077b6", maxHeight: "80vh" }}
        >
          <div className="px-4 py-3 space-y-1">
            {NAV.map((item) => {
              const active = isActive(item);
              const expanded = mobileExpanded === item.path;
              return (
                <div key={item.path}>
                  <div className="flex items-stretch rounded-lg overflow-hidden">
                    <Link
                      to={item.path}
                      onClick={() => !item.items && setMobileOpen(false)}
                      className="flex-1 flex items-center gap-2 px-3 py-2.5 text-sm font-medium"
                      style={active ? { backgroundColor: "#0077b6", color: "#fff" } : { color: "#03045e" }}
                    >
                      {item.label}
                    </Link>
                    {item.items && (
                      <button
                        onClick={() => setMobileExpanded(expanded ? null : item.path)}
                        className="px-3 border-l"
                        style={
                          active
                            ? { backgroundColor: "#0077b6", color: "#fff", borderColor: "#005f91" }
                            : { color: "#03045e", borderColor: "#90e0ef" }
                        }
                        aria-label={`Expand ${item.label}`}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>
                  {item.items && expanded && (
                    <div className="ml-3 mt-1 mb-1 border-l-2 pl-3 space-y-0.5" style={{ borderColor: "#0077b6" }}>
                      {item.items.map((sub) => (
                        <Link
                          key={`${sub.path}-${sub.label}`}
                          to={sub.path}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 rounded-md text-sm"
                          style={{ color: "#0077b6" }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-3 border-t space-y-1.5" style={{ borderColor: "#0077b6" }}>
              <Link
                to="/donate"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: "#0077b6" }}
              >
                <Heart className="w-4 h-4" /> Donate
              </Link>

              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white"
                      style={{ backgroundColor: "#03045e" }}
                    >
                      {initials || <UserIcon className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#03045e" }}>{user?.name}</p>
                      <p className="text-xs text-gray-600">{user?.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium"
                    style={{ color: "#03045e" }}
                  >
                    <UserIcon className="w-4 h-4" /> Profile
                  </Link>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium" style={{ color: "#03045e" }}>Login</Link>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "#03045e" }}>Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}