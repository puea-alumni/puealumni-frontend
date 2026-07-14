import { useState, useEffect } from "react";
import {
  Users,
  ShieldCheck,
  DollarSign,
  Clock,
  Activity,
} from "lucide-react";
import api from "../../lib/api";
import { StatsSkeleton, ListSkeleton } from "./ui/Skeleton";
import { ErrorState } from "./ui/ErrorState";

// ---------------------------------------------------------------------------
// Types matching the real Laravel responses
// ---------------------------------------------------------------------------

interface DashboardSummary {
  users: { total: number; alumni: number; admins: number };
  revenue: { total: number; donations: number; fees: number };
  payments: { total: number; pending: number; failed: number };
}

interface AlumniUser {
  id: number;
  name: string;
  email: string;
  graduation_year?: number;
  role: string;
  created_at?: string;
}

interface Payment {
  id: number;
  amount: number;
  type: string;
  status: string;
  user?: { name: string; email: string };
  created_at?: string;
}

// Handles both a flat array and Laravel's nested paginator shape without
// assuming which one ApiResponse/PaymentResource actually produce.
function extractList<T>(payload: any): T[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);

// ---------------------------------------------------------------------------
// A small generic fetch hook, mirroring the {data, loading, error, retry}
// shape the existing Skeleton/ErrorState components already expect — just
// backed by the axios client (auth header + 401 handling) instead of fetch.
// ---------------------------------------------------------------------------

function useAdminFetch<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(undefined);

    fetcher()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err.response?.data?.message || "Could not load this data."
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadKey]);

  const retry = () => setReloadKey((k) => k + 1);

  return { data, loading, error, retry };
}

// ---------------------------------------------------------------------------
// The shared header + tab bar now live in AdminLayout.tsx — this file only
// renders the Overview content that sits inside it.
// ---------------------------------------------------------------------------

function StatCard({
  label,
  value,
  icon: Icon,
  shade,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  shade: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center mb-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: shade + "22" }}
        >
          <Icon className="w-6 h-6" style={{ color: shade }} />
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-3xl font-bold" style={{ color: "#03045e" }}>
        {value}
      </p>
    </div>
  );
}

export function AdminDashboard() {
  const summary = useAdminFetch<DashboardSummary>(() =>
    api.get("/admin/dashboard").then((res) => res.data.data)
  );

  const alumni = useAdminFetch<AlumniUser[]>(() =>
    api
      .get("/admin/users", { params: { role: "alumni" } })
      .then((res) => extractList<AlumniUser>(res.data.data))
  );

  const payments = useAdminFetch<Payment[]>(() =>
    api.get("/admin/payments").then((res) => extractList<Payment>(res.data.data))
  );

  const s = summary.data;
  const recentAlumni = (alumni.data || []).slice(0, 5);
  const recentPayments = (payments.data || []).slice(0, 5);

  const daysAgo = (dateString?: string) => {
    if (!dateString) return null;
    const diff = Date.now() - new Date(dateString).getTime();
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <>
      {/* Stats */}
      {summary.loading && <StatsSkeleton />}
      {summary.error && !summary.loading && (
        <ErrorState
          title="Could not load dashboard stats"
          message={summary.error}
          onRetry={summary.retry}
        />
      )}
      {s && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Alumni"
            value={s.users.alumni.toLocaleString()}
            icon={Users}
            shade="#0077b6"
          />
          <StatCard
            label="Admins"
            value={s.users.admins.toLocaleString()}
            icon={ShieldCheck}
            shade="#03045e"
          />
          <StatCard
            label="Total Revenue"
            value={formatCurrency(s.revenue.total)}
            icon={DollarSign}
            shade="#00b4d8"
          />
          <StatCard
            label="Pending Payments"
            value={s.payments.pending.toLocaleString()}
            icon={Clock}
            shade="#0096c7"
          />
        </div>
      )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Alumni */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <h2 className="font-bold" style={{ color: "#03045e" }}>
                Recent Registrations
              </h2>
            </div>
            {alumni.loading && (
              <div className="p-4">
                <ListSkeleton rows={4} />
              </div>
            )}
            {alumni.error && !alumni.loading && (
              <ErrorState
                title="Could not load alumni"
                message={alumni.error}
                onRetry={alumni.retry}
              />
            )}
            {!alumni.loading && recentAlumni.length === 0 && !alumni.error && (
              <div className="px-6 py-8 text-center text-sm text-gray-400">
                No recent registrations.
              </div>
            )}
            {!alumni.loading && recentAlumni.length > 0 && (
              <div className="divide-y divide-gray-50">
                {recentAlumni.map((a) => {
                  const days = daysAgo(a.created_at);
                  return (
                    <div key={a.id} className="flex items-center gap-4 px-6 py-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                        style={{ backgroundColor: "#0077b6" }}
                      >
                        {a.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-semibold text-sm truncate"
                          style={{ color: "#03045e" }}
                        >
                          {a.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">{a.email}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-gray-400">
                          {a.graduation_year ? `Class of ${a.graduation_year}` : "—"}
                        </p>
                        {days !== null && (
                          <p className="text-xs" style={{ color: "#0077b6" }}>
                            {days === 0 ? "Today" : `${days}d ago`}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Payments */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <h2 className="font-bold" style={{ color: "#03045e" }}>
                Recent Payments
              </h2>
              <Activity className="w-4 h-4 text-gray-300" />
            </div>
            {payments.loading && (
              <div className="p-4">
                <ListSkeleton rows={4} />
              </div>
            )}
            {payments.error && !payments.loading && (
              <ErrorState
                title="Could not load payments"
                message={payments.error}
                onRetry={payments.retry}
              />
            )}
            {!payments.loading && recentPayments.length === 0 && !payments.error && (
              <div className="px-6 py-8 text-center text-sm text-gray-400">
                No payments recorded yet.
              </div>
            )}
            {!payments.loading && recentPayments.length > 0 && (
              <div className="divide-y divide-gray-50">
                {recentPayments.map((p) => (
                  <div key={p.id} className="flex items-center gap-4 px-6 py-4">
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-semibold text-sm truncate"
                        style={{ color: "#03045e" }}
                      >
                        {p.user?.name || "Unknown user"}
                      </p>
                      <p className="text-xs text-gray-400 capitalize">{p.type}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold" style={{ color: "#03045e" }}>
                        {formatCurrency(p.amount)}
                      </p>
                      <span
                        className={`text-xs font-semibold capitalize ${
                          p.status === "success"
                            ? "text-green-600"
                            : p.status === "pending"
                            ? "text-amber-600"
                            : "text-red-500"
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl border border-gray-100 p-6 text-center text-sm text-gray-400">
          Job postings and events management are coming soon
        </div>
    </>
  );
}