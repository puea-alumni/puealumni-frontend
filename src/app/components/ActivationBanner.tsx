import { Link } from "react-router";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function ActivationBanner() {
  const { isAuthenticated, user } = useAuth();

  // Don't show for logged-out visitors, admins (never gated), or already-active members
  if (!isAuthenticated) return null;
  if (user?.role === "admin") return null;
  if (!user?.activation || user.activation.status === "active") return null;

  return (
    <div className="w-full px-4 py-2.5 flex items-center justify-center gap-3 text-sm" style={{ backgroundColor: "#03045e" }}>
      <ShieldAlert className="w-4 h-4 text-[#ade8f4] flex-shrink-0" />
      <span className="text-white">
        Your membership is inactive — activate now to unlock all platform features and enjoy the full alumni experience.
      </span>
      <Link
        to="/activate"
        className="px-3 py-1 rounded-md text-xs font-semibold flex-shrink-0"
        style={{ backgroundColor: "#0077b6", color: "white" }}
      >
        Activate Now
      </Link>
    </div>
  );
}