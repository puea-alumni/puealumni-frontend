import { useState } from "react";
import { Search, MapPin, Briefcase, Clock, DollarSign, Filter, X, CheckCircle } from "lucide-react";
import { useApi } from "../lib/hooks";
import { endpoints } from "../lib/api";
import { GridSkeleton } from "./ui/Skeleton";
import { ErrorState } from "./ui/ErrorState";
import { EmptyState } from "./ui/EmptyState";

export interface Job {
  id: number | string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | string;
  salary?: string;
  postedByName?: string;
  postedAt: string;
  description: string;
  logoUrl?: string;
  applyUrl?: string;
}

const TYPE_SHADE: Record<string, string> = {
  "Full-time": "#03045e",
  "Part-time": "#0077b6",
  Contract: "#0096c7",
  Internship: "#00b4d8",
};

function ApplyModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: POST form data to endpoints.jobs.apply(job.id)
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ backgroundColor: "#03045e" }}>
          <h2 className="text-lg font-bold text-white">Apply — {job.title}</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
            <div className="rounded-xl p-3 text-sm border" style={{ backgroundColor: "#90e0ef", borderColor: "#ade8f4" }}>
              <span className="font-semibold" style={{ color: "#03045e" }}>{job.company}</span>
              <span className="text-gray-600"> · {job.location}</span>
            </div>
            {[
              { name: "fullName", label: "Full Name", type: "text", placeholder: "Jane Doe" },
              { name: "email", label: "Email Address", type: "email", placeholder: "jane@example.com" },
              { name: "phone", label: "Phone Number", type: "tel", placeholder: "+254 712 345 678" },
              { name: "linkedIn", label: "LinkedIn / Portfolio URL", type: "url", placeholder: "https://linkedin.com/in/…" },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium mb-1" style={{ color: "#03045e" }}>{f.label}</label>
                <input name={f.name} type={f.type} required={f.type !== "url"} placeholder={f.placeholder}
                  className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6]" style={{ borderColor: "#ade8f4" }} />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#03045e" }}>Cover Letter</label>
              <textarea name="coverLetter" rows={4} placeholder="Why are you a great fit for this role?" required
                className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6] resize-none" style={{ borderColor: "#ade8f4" }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#03045e" }}>Resume / CV</label>
              <input name="resume" type="file" accept=".pdf,.doc,.docx"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:text-white"
                style={{ ["--file-bg" as string]: "#0077b6" }} />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border text-sm font-semibold" style={{ borderColor: "#ade8f4", color: "#03045e" }}>Cancel</button>
              <button type="submit" disabled={submitting} className="flex-1 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60" style={{ backgroundColor: "#03045e" }}>
                {submitting ? "Submitting…" : "Submit Application"}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-12 px-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#90e0ef" }}>
              <CheckCircle className="w-9 h-9" style={{ color: "#03045e" }} />
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: "#03045e" }}>Application Submitted!</h3>
            <p className="text-gray-500 text-sm">Your application for <span className="font-semibold">{job.title}</span> at {job.company} has been received.</p>
            <button onClick={onClose} className="mt-6 px-6 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: "#0077b6" }}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

export function JobPortalPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [applyingTo, setApplyingTo] = useState<Job | null>(null);

  const { data, loading, error, retry } = useApi<Job[]>(endpoints.jobs.list());

  const types = ["All", "Full-time", "Part-time", "Contract", "Internship"];

  const filtered = (data ?? []).filter((j) => {
    const matchSearch = [j.title, j.company, j.location].some((f) => f.toLowerCase().includes(search.toLowerCase()));
    const matchType = typeFilter === "All" || j.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f4f8" }}>
      <div className="py-12 px-4" style={{ backgroundColor: "#03045e" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Job Portal</h1>
          <p className="text-lg" style={{ color: "#90e0ef" }}>Exclusive opportunities from our alumni network</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Search + filter bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#0077b6" }} />
            <input
              type="text"
              placeholder="Search by title, company, or location…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6]"
              style={{ borderColor: "#ade8f4" }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all border"
                style={typeFilter === t
                  ? { backgroundColor: "#0077b6", color: "#fff", borderColor: "#0077b6" }
                  : { backgroundColor: "#fff", color: "#0077b6", borderColor: "#ade8f4" }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Post a job CTA */}
        <div className="mb-6 p-4 rounded-xl border flex items-center justify-between gap-4" style={{ backgroundColor: "#90e0ef", borderColor: "#ade8f4" }}>
          <div>
            <p className="font-semibold text-sm" style={{ color: "#03045e" }}>Are you an employer or alumnus with an opportunity?</p>
            <p className="text-xs" style={{ color: "#0077b6" }}>Post a job and reach thousands of PUEA graduates.</p>
          </div>
          <button className="px-5 py-2 rounded-lg text-sm font-semibold text-white flex-shrink-0" style={{ backgroundColor: "#03045e" }}>
            Post a Job
          </button>
        </div>

        {loading && <GridSkeleton cols={2} rows={3} />}
        {!loading && error && <ErrorState title="Could not load jobs" message={error} onRetry={retry} />}
        {!loading && !error && filtered.length === 0 && (
          <EmptyState
            icon={Briefcase}
            title={search || typeFilter !== "All" ? "No jobs match your filters" : "No job listings yet"}
            description={search || typeFilter !== "All" ? "Try adjusting your search or filter." : "Job opportunities will appear here once posted."}
            action={search || typeFilter !== "All" ? { label: "Clear Filters", onClick: () => { setSearch(""); setTypeFilter("All"); } } : undefined}
          />
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-6">
            {filtered.map((job) => (
              <div key={job.id} className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-all" style={{ borderColor: "#ade8f4" }}>
                {/* Top stripe */}
                <div className="h-1.5" style={{ backgroundColor: TYPE_SHADE[job.type] ?? "#0077b6" }} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <div className="flex items-start gap-3">
                      {job.logoUrl
                        ? <img src={job.logoUrl} alt={job.company} className="w-12 h-12 rounded-lg object-contain border border-gray-100 flex-shrink-0" />
                        : <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-sm" style={{ backgroundColor: TYPE_SHADE[job.type] ?? "#0077b6" }}>
                            {job.company.slice(0, 2).toUpperCase()}
                          </div>}
                      <div>
                        <h3 className="text-base font-bold" style={{ color: "#03045e" }}>{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-white flex-shrink-0" style={{ backgroundColor: TYPE_SHADE[job.type] ?? "#0077b6" }}>
                      {job.type}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{job.description}</p>

                  <div className="grid grid-cols-2 gap-2 mb-5 text-sm">
                    <div className="flex items-center gap-2 text-gray-600"><MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "#0096c7" }} />{job.location}</div>
                    {job.salary && <div className="flex items-center gap-2 text-gray-600"><DollarSign className="w-4 h-4 flex-shrink-0" style={{ color: "#0096c7" }} />{job.salary}</div>}
                    <div className="flex items-center gap-2 text-gray-400 col-span-2"><Clock className="w-4 h-4 flex-shrink-0" />{job.postedAt}</div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t" style={{ borderColor: "#f0f4f8" }}>
                    <button
                      onClick={() => setApplyingTo(job)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "#0077b6" }}
                    >
                      Apply Now
                    </button>
                    {job.applyUrl && (
                      <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-xl text-sm font-semibold border hover:bg-gray-50 transition-colors" style={{ borderColor: "#ade8f4", color: "#03045e" }}>
                        External
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {applyingTo && <ApplyModal job={applyingTo} onClose={() => setApplyingTo(null)} />}
    </div>
  );
}
