import { Outlet, Link, useLocation } from "react-router";
import {
  Users,
  DollarSign,
  Settings,
  BarChart3,
  LayoutGrid,
} from "lucide-react";

const TABS = [
  { label: "Overview", icon: LayoutGrid, path: "/admin", active: true },
  { label: "Users", icon: Users, path: "/admin/users", active: true },
  { label: "Payments", icon: DollarSign, path: null, active: false },
  { label: "Settings", icon: Settings, path: null, active: false },
  { label: "Analytics", icon: BarChart3, path: null, active: false },
];

export function AdminLayout() {
  const location = useLocation();

  const isTabActive = (path: string | null) => {
    if (!path) return false;
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f4f8" }}>
      <div className="py-10 px-4" style={{ backgroundColor: "#03045e" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-1">Admin Dashboard</h1>
          <p style={{ color: "#90e0ef" }} className="text-sm">
            Overview of your alumni network platform
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = isTabActive(tab.path);

            if (!tab.active || !tab.path) {
              return (
                <div
                  key={tab.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-400 border border-gray-100 cursor-not-allowed"
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  <span className="text-[10px] uppercase font-semibold bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded">
                    Soon
                  </span>
                </div>
              );
            }

            return (
              <Link
                key={tab.label}
                to={tab.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active ? "text-white" : "bg-white text-gray-500 border border-gray-100 hover:bg-gray-50"
                }`}
                style={active ? { backgroundColor: "#0077b6" } : {}}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </Link>
            );
          })}
        </div>

        <Outlet />
      </div>
    </div>
  );
}