import { Users, Briefcase, Calendar, TrendingUp, DollarSign, RefreshCw } from "lucide-react";
import { useApi } from "../lib/hooks";
import { endpoints } from "../lib/api";
import { StatsSkeleton, ListSkeleton, Skeleton } from "./ui/Skeleton";
import { ErrorState } from "./ui/ErrorState";

export interface AdminStats {
  totalAlumni: number;
  activeJobs: number;
  upcomingEvents: number;
  totalDonations: number;
  alumniGrowth?: string;
  jobsGrowth?: string;
  eventsChange?: string;
  donationsGrowth?: string;
}

export interface RecentAlumnus {
  id: number | string;
  name: string;
  email: string;
  graduationYear: number;
  joinedDaysAgo: number;
}

export interface RecentJob {
  id: number | string;
  title: string;
  company: string;
  applicants: number;
  status: "Active" | "Pending" | "Closed" | string;
}

export interface AdminEvent {
  id: number | string;
  name: string;
  date: string;
  attendees: number;
  revenue: string;
}

function StatCard({ label, value, change, icon: Icon, shade }: { label: string; value: string; change?: string; icon: React.ElementType; shade: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: shade + "22" }}>
          <Icon className="w-6 h-6" style={{ color: shade }} />
        </div>
        {change && <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: "#dcfce7", color: "#16a34a" }}>{change}</span>}
      </div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-3xl font-bold" style={{ color: "#03045e" }}>{value}</p>
    </div>
  );
}

export function AdminDashboard() {
  const stats = useApi<AdminStats>(endpoints.admin.stats());
  const alumni = useApi<RecentAlumnus[]>(endpoints.admin.recentAlumni());
  const jobs = useApi<RecentJob[]>(endpoints.admin.recentJobs());
  const events = useApi<AdminEvent[]>(endpoints.admin.events());

  const s = stats.data;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f4f8" }}>
      <div className="py-10 px-4" style={{ backgroundColor: "#03045e" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-1">Admin Dashboard</h1>
          <p style={{ color: "#90e0ef" }} className="text-sm">Overview of your alumni network platform</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        {stats.loading && <StatsSkeleton />}
        {stats.error && <ErrorState title="Could not load stats" message={stats.error} onRetry={stats.retry} />}
        {s && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Alumni" value={s.totalAlumni.toLocaleString()} change={s.alumniGrowth} icon={Users} shade="#0077b6" />
            <StatCard label="Active Jobs" value={s.activeJobs.toLocaleString()} change={s.jobsGrowth} icon={Briefcase} shade="#0096c7" />
            <StatCard label="Upcoming Events" value={s.upcomingEvents.toLocaleString()} change={s.eventsChange} icon={Calendar} shade="#03045e" />
            <StatCard label="Total Donations" value={`KES ${s.totalDonations.toLocaleString()}`} change={s.donationsGrowth} icon={DollarSign} shade="#00b4d8" />
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Alumni */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <h2 className="font-bold" style={{ color: "#03045e" }}>Recent Registrations</h2>
              {alumni.error && <button onClick={alumni.retry} className="text-xs text-gray-400 flex items-center gap-1"><RefreshCw className="w-3 h-3" />Retry</button>}
            </div>
            {alumni.loading && <div className="p-4"><ListSkeleton rows={4} /></div>}
            {alumni.error && !alumni.loading && <ErrorState title="Could not load alumni" message={alumni.error} onRetry={alumni.retry} />}
            {!alumni.loading && alumni.data && alumni.data.length === 0 && (
              <div className="px-6 py-8 text-center text-sm text-gray-400">No recent registrations.</div>
            )}
            {!alumni.loading && alumni.data && alumni.data.length > 0 && (
              <div className="divide-y divide-gray-50">
                {alumni.data.map((a) => (
                  <div key={a.id} className="flex items-center gap-4 px-6 py-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: "#0077b6" }}>
                      {a.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate" style={{ color: "#03045e" }}>{a.name}</p>
                      <p className="text-xs text-gray-400 truncate">{a.email}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-gray-400">Class of {a.graduationYear}</p>
                      <p className="text-xs" style={{ color: "#0077b6" }}>{a.joinedDaysAgo}d ago</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Jobs */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <h2 className="font-bold" style={{ color: "#03045e" }}>Recent Job Listings</h2>
              {jobs.error && <button onClick={jobs.retry} className="text-xs text-gray-400 flex items-center gap-1"><RefreshCw className="w-3 h-3" />Retry</button>}
            </div>
            {jobs.loading && <div className="p-4"><ListSkeleton rows={4} /></div>}
            {jobs.error && !jobs.loading && <ErrorState title="Could not load jobs" message={jobs.error} onRetry={jobs.retry} />}
            {!jobs.loading && jobs.data && jobs.data.length === 0 && (
              <div className="px-6 py-8 text-center text-sm text-gray-400">No job listings yet.</div>
            )}
            {!jobs.loading && jobs.data && jobs.data.map((job) => (
              <div key={job.id} className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate" style={{ color: "#03045e" }}>{job.title}</p>
                  <p className="text-xs text-gray-400">{job.company}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-gray-500">{job.applicants} applicants</p>
                  <span className={`text-xs font-semibold ${job.status === "Active" ? "text-green-600" : job.status === "Pending" ? "text-amber-600" : "text-gray-400"}`}>
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Events */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden lg:col-span-2">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <h2 className="font-bold" style={{ color: "#03045e" }}>Upcoming Events</h2>
            </div>
            {events.loading && (
              <div className="p-4 space-y-3">
                {[1,2,3].map((n) => <Skeleton key={n} className="h-14 w-full" />)}
              </div>
            )}
            {events.error && !events.loading && <ErrorState title="Could not load events" message={events.error} onRetry={events.retry} />}
            {!events.loading && events.data && events.data.length === 0 && (
              <div className="px-6 py-8 text-center text-sm text-gray-400">No upcoming events.</div>
            )}
            {!events.loading && events.data && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-50">
                      {["Event", "Date", "Attendees", "Revenue"].map((h) => (
                        <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {events.data.map((ev) => (
                      <tr key={ev.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium" style={{ color: "#03045e" }}>{ev.name}</td>
                        <td className="px-6 py-4 text-gray-500">{ev.date}</td>
                        <td className="px-6 py-4 text-gray-500">{ev.attendees.toLocaleString()}</td>
                        <td className="px-6 py-4 font-semibold" style={{ color: "#0077b6" }}>{ev.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
