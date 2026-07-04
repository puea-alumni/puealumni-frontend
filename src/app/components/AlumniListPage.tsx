import { Link } from "react-router";
import { Search, MapPin, Briefcase, Calendar, Users, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useApi } from "../lib/hooks";
import { endpoints } from "../lib/api";
import { GridSkeleton } from "./ui/Skeleton";
import { ErrorState } from "./ui/ErrorState";
import { EmptyState } from "./ui/EmptyState";

export interface AlumniMember {
  id: number | string;
  name: string;
  graduationYear: number;
  degree: string;
  company: string;
  position: string;
  location: string;
  avatarInitials?: string;
  avatarUrl?: string;
}

const SHADE_CYCLE = ["#03045e", "#0077b6", "#0096c7", "#00b4d8", "#48cae4"];

export function AlumniListPage() {
  const [search, setSearch] = useState("");
  const { data, loading, error, retry } = useApi<AlumniMember[]>(endpoints.alumni.list());

  const filtered = (data ?? []).filter((a) =>
    [a.name, a.company, a.degree, a.location]
      .some((f) => f.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f4f8" }}>
      {/* Header */}
      <div className="py-12 px-4" style={{ backgroundColor: "#03045e" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Alumni Directory</h1>
          <p className="text-lg" style={{ color: "#90e0ef" }}>Connect with fellow graduates from our community</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#0077b6" }} />
            <input
              type="text"
              placeholder="Search by name, company, degree or location…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6]"
              style={{ borderColor: "#ade8f4" }}
            />
          </div>
        </div>

        {/* Stats row — populated from API */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Members", value: data ? data.length : "—" },
            { label: "Countries", value: "—" },
            { label: "Industries", value: "—" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border p-4 text-center" style={{ borderColor: "#ade8f4" }}>
              <div className="text-2xl font-bold" style={{ color: "#03045e" }}>{s.value}</div>
              <div className="text-sm mt-1" style={{ color: "#0077b6" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Loading */}
        {loading && <GridSkeleton cols={3} rows={2} />}

        {/* Error */}
        {!loading && error && (
          <ErrorState
            title="Could not load alumni"
            message={error}
            onRetry={retry}
          />
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <EmptyState
            icon={Users}
            title={search ? "No alumni match your search" : "No alumni found"}
            description={search ? "Try adjusting your search terms." : "Alumni will appear here once they register."}
            action={search ? { label: "Clear Search", onClick: () => setSearch("") } : undefined}
          />
        )}

        {/* Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((alumni, i) => {
              const shade = SHADE_CYCLE[i % SHADE_CYCLE.length];
              const initials = alumni.avatarInitials ?? alumni.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
              return (
                <Link
                  key={alumni.id}
                  to={`/alumni/${alumni.id}`}
                  className="bg-white rounded-xl border hover:shadow-lg transition-all group overflow-hidden"
                  style={{ borderColor: "#ade8f4" }}
                >
                  <div className="h-1.5 w-full" style={{ backgroundColor: shade }} />
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      {alumni.avatarUrl ? (
                        <img src={alumni.avatarUrl} alt={alumni.name} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0" style={{ backgroundColor: shade }}>
                          {initials}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold truncate group-hover:underline" style={{ color: "#03045e" }}>{alumni.name}</h3>
                        <p className="text-sm" style={{ color: "#0077b6" }}>{alumni.degree}</p>
                        <div className="flex items-center gap-1 text-xs mt-1 text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>Class of {alumni.graduationYear}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm pt-3 border-t" style={{ borderColor: "#f0f4f8" }}>
                      <div className="flex items-start gap-2">
                        <Briefcase className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#0096c7" }} />
                        <div>
                          <div className="font-medium text-gray-800">{alumni.position}</div>
                          <div className="text-gray-500">{alumni.company}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "#0096c7" }} />
                        <span>{alumni.location}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
