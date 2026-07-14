import { useState, useEffect, useRef } from "react";
import {
  Search,
  ShieldCheck,
  ShieldOff,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { ListSkeleton } from "./ui/Skeleton";
import { ErrorState } from "./ui/ErrorState";

interface Activation {
  status: string;
  expires_at: string | null;
  days_remaining: number;
}

interface AdminUser {
  id: string;
  alumni_number: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  graduation_year?: string | number;
  degree?: string | null;
  job_title?: string | null;
  company?: string | null;
  city?: string | null;
  bio?: string | null;
  provider?: string | null;
  verified?: boolean;
  created_at?: string;
  activation: Activation;
  activated_at?: string | null;
}

const PAGE_SIZE = 15;

function initialsOf(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"
  );
}

function ActivationBadge({ activation }: { activation: Activation }) {
  const isActive = activation.status === "active";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
        isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
      }`}
    >
      {isActive ? <ShieldCheck className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
      {activation.status}
    </span>
  );
}

export function AdminUsersPage() {
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"" | "alumni" | "admin">("");
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [confirmTarget, setConfirmTarget] = useState<AdminUser | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState("");

  // Debounce the search box so we're not firing a request on every keystroke
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [roleFilter]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(undefined);

        const response = await api.get("/admin/users", {
          params: {
            search: debouncedSearch || undefined,
            role: roleFilter || undefined,
            page,
          },
        });

        // The real response is a flat array under data — no pagination
        // meta is exposed, so "did we get a full page" is our only signal.
        const payload = response.data.data;
        const list: AdminUser[] = Array.isArray(payload) ? payload : [];

        setUsers(list);
        setHasNextPage(list.length === PAGE_SIZE);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || "Could not load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedSearch, roleFilter, page]);

  const performRoleChange = async (targetUser: AdminUser) => {
    const newRole = targetUser.role === "admin" ? "alumni" : "admin";

    try {
      setUpdatingId(targetUser.id);
      setActionError("");

      const response = await api.patch(`/admin/users/${targetUser.id}/role`, {
        role: newRole,
      });

      const updated = response.data.data;

      setUsers((prev) =>
        prev.map((u) => (u.id === targetUser.id ? { ...u, role: updated.role } : u))
      );
    } catch (err: any) {
      console.error(err);
      setActionError(
        err.response?.data?.message || "Could not update this user's role."
      );
    } finally {
      setUpdatingId(null);
      setConfirmTarget(null);
    }
  };

  const requestRoleChange = (targetUser: AdminUser) => {
    setOpenMenuId(null);
    const isSelf = targetUser.id === currentUser?.id;
    const newRole = targetUser.role === "admin" ? "alumni" : "admin";

    if (isSelf && newRole !== "admin") {
      setActionError("You cannot demote your own account.");
      return;
    }

    setConfirmTarget(targetUser);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as "" | "alumni" | "admin")}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
        >
          <option value="">All roles</option>
          <option value="alumni">Alumni</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {actionError && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
          {actionError}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {loading && (
          <div className="p-4">
            <ListSkeleton rows={6} />
          </div>
        )}

        {error && !loading && (
          <ErrorState
            title="Could not load users"
            message={error}
            onRetry={() => setPage((p) => p)}
          />
        )}

        {!loading && !error && users.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-gray-400">
            No users match your search.
          </div>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Alumnus", "Alumni No.", "Degree", "Role", "Activation", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((u) => {
                  const isSelf = u.id === currentUser?.id;
                  const isAdmin = u.role === "admin";

                  return (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ backgroundColor: isAdmin ? "#03045e" : "#0077b6" }}
                          >
                            {initialsOf(u.name)}
                          </div>
                          <div className="min-w-0">
                            <p
                              className="font-semibold truncate"
                              style={{ color: "#03045e" }}
                            >
                              {u.name} {isSelf && <span className="text-gray-400 font-normal text-xs">(you)</span>}
                            </p>
                            <p className="text-xs text-gray-400 truncate">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {u.alumni_number}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {u.degree || <span className="text-gray-300 italic">Not provided</span>}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs font-semibold capitalize px-2.5 py-1 rounded-full ${
                            isAdmin ? "bg-[#ade8f4]/50 text-[#03045e]" : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <ActivationBadge activation={u.activation} />
                      </td>
                      <td className="px-6 py-4 relative">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === u.id ? null : u.id)}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {openMenuId === u.id && (
                          <div
                            ref={menuRef}
                            className="absolute right-6 top-12 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-1 z-20"
                          >
                            <button
                              onClick={() => requestRoleChange(u)}
                              disabled={isSelf && isAdmin}
                              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              {isAdmin ? (
                                <ShieldOff className="w-4 h-4" />
                              ) : (
                                <ShieldCheck className="w-4 h-4" />
                              )}
                              {isAdmin ? "Demote to Alumni" : "Promote to Admin"}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!loading && !error && (users.length > 0 || page > 1) && (
        <div className="flex items-center justify-between">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <span className="text-sm text-gray-400">Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasNextPage}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {confirmTarget && (
        <ConfirmDialog
          targetUser={confirmTarget}
          updating={updatingId === confirmTarget.id}
          onCancel={() => setConfirmTarget(null)}
          onConfirm={() => performRoleChange(confirmTarget)}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Confirmation modal for promote/demote
// ---------------------------------------------------------------------------

function ConfirmDialog({
  targetUser,
  updating,
  onCancel,
  onConfirm,
}: {
  targetUser: AdminUser;
  updating: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const isAdmin = targetUser.role === "admin";
  const action = isAdmin ? "Demote" : "Promote";
  const newRole = isAdmin ? "alumni" : "admin";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#ade8f4" }}
          >
            {isAdmin ? (
              <ShieldOff className="w-5 h-5" style={{ color: "#03045e" }} />
            ) : (
              <ShieldCheck className="w-5 h-5" style={{ color: "#03045e" }} />
            )}
          </div>
          <h3 className="text-lg font-bold" style={{ color: "#03045e" }}>
            {action} {targetUser.name}?
          </h3>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          This will change {targetUser.name}'s role to{" "}
          <span className="font-semibold capitalize">{newRole}</span>. They will{" "}
          {newRole === "admin"
            ? "gain access to the admin dashboard."
            : "lose access to the admin dashboard."}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={updating}
            className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-sm disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={updating}
            className="flex-1 py-2.5 px-4 text-white rounded-lg transition-colors font-semibold text-sm disabled:opacity-50"
            style={{ backgroundColor: "#0077b6" }}
          >
            {updating ? "Updating..." : `Yes, ${action.toLowerCase()}`}
          </button>
        </div>
      </div>
    </div>
  );
}