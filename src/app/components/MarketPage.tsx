import { useState } from "react";
import { Tag, MapPin, Phone, Mail, ShoppingBag, Plus, X, CheckCircle } from "lucide-react";
import { useApi } from "../lib/hooks";
import { endpoints } from "../lib/api";
import { GridSkeleton } from "./ui/Skeleton";
import { ErrorState } from "./ui/ErrorState";
import { EmptyState } from "./ui/EmptyState";

export interface Listing {
  id: number | string;
  title: string;
  category: string;
  price: string;
  sellerName: string;
  sellerPhone: string;
  sellerEmail: string;
  location: string;
  description: string;
  imageUrl?: string;
  featured?: boolean;
}

const CATEGORY_SHADE: Record<string, string> = {
  Electronics: "#03045e",
  Services: "#0077b6",
  "Real Estate": "#0096c7",
  Vehicles: "#00b4d8",
  "Fashion & Apparel": "#48cae4",
  Food: "#90e0ef",
};
const DEFAULT_SHADE = "#0077b6";

function PostListingModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: POST to endpoints.market.listings()
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ backgroundColor: "#03045e" }}>
          <h2 className="text-lg font-bold text-white">Post a Listing</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
            {[
              { name: "title", label: "Listing Title", type: "text", placeholder: "e.g. MacBook Pro 14\" M1" },
              { name: "price", label: "Price / Rate", type: "text", placeholder: "e.g. KES 50,000 or Negotiable" },
              { name: "location", label: "Location", type: "text", placeholder: "e.g. Nairobi, Remote" },
              { name: "phone", label: "Contact Phone", type: "tel", placeholder: "+254 712 345 678" },
              { name: "email", label: "Contact Email", type: "email", placeholder: "you@example.com" },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium mb-1" style={{ color: "#03045e" }}>{f.label}</label>
                <input name={f.name} type={f.type} required placeholder={f.placeholder}
                  className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6]" style={{ borderColor: "#ade8f4" }} />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#03045e" }}>Category</label>
              <select name="category" required className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6] bg-white" style={{ borderColor: "#ade8f4" }}>
                <option value="">Select a category…</option>
                {Object.keys(CATEGORY_SHADE).map((c) => <option key={c}>{c}</option>)}
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#03045e" }}>Description</label>
              <textarea name="description" rows={3} required placeholder="Describe what you are offering…"
                className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6] resize-none" style={{ borderColor: "#ade8f4" }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#03045e" }}>Image (optional)</label>
              <input name="image" type="file" accept="image/*"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:text-white file:bg-[#0077b6]" />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border text-sm font-semibold" style={{ borderColor: "#ade8f4", color: "#03045e" }}>Cancel</button>
              <button type="submit" className="flex-1 py-3 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: "#03045e" }}>Post Listing</button>
            </div>
          </form>
        ) : (
          <div className="text-center py-12 px-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#90e0ef" }}>
              <CheckCircle className="w-9 h-9" style={{ color: "#03045e" }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: "#03045e" }}>Listing Submitted!</h3>
            <p className="text-gray-500 text-sm">Your listing has been submitted for review and will appear once approved.</p>
            <button onClick={onClose} className="mt-6 px-6 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: "#0077b6" }}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

export function MarketPage() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showPost, setShowPost] = useState(false);
  const { data, loading, error, retry } = useApi<Listing[]>(endpoints.market.listings());

  const categories = ["All", ...Array.from(new Set((data ?? []).map((l) => l.category)))];
  const filtered = categoryFilter === "All" ? (data ?? []) : (data ?? []).filter((l) => l.category === categoryFilter);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f4f8" }}>
      <div className="py-12 px-4" style={{ backgroundColor: "#03045e" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Alumni Marketplace</h1>
          <p className="text-lg" style={{ color: "#90e0ef" }}>Buy, sell, and trade with fellow PUEA alumni</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Actions + filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className="px-4 py-2 rounded-xl text-sm font-medium border transition-all"
                style={categoryFilter === c
                  ? { backgroundColor: "#0077b6", color: "#fff", borderColor: "#0077b6" }
                  : { backgroundColor: "#fff", color: "#0077b6", borderColor: "#ade8f4" }}
              >
                {c}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowPost(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex-shrink-0"
            style={{ backgroundColor: "#0077b6" }}
          >
            <Plus className="w-4 h-4" /> Post a Listing
          </button>
        </div>

        {loading && <GridSkeleton cols={3} rows={2} />}
        {!loading && error && <ErrorState title="Could not load listings" message={error} onRetry={retry} />}
        {!loading && !error && filtered.length === 0 && (
          <EmptyState
            icon={ShoppingBag}
            title={categoryFilter !== "All" ? "No listings in this category" : "No listings yet"}
            description="Alumni listings will appear here once submitted and approved."
            action={categoryFilter !== "All" ? { label: "Show All", onClick: () => setCategoryFilter("All") } : undefined}
          />
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((listing) => {
              const shade = CATEGORY_SHADE[listing.category] ?? DEFAULT_SHADE;
              const initials = listing.sellerName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
              return (
                <div key={listing.id} className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-all" style={{ borderColor: "#ade8f4" }}>
                  <div className="h-32 flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: shade }}>
                    {listing.imageUrl
                      ? <img src={listing.imageUrl} alt={listing.title} className="w-full h-full object-cover" />
                      : <ShoppingBag className="w-12 h-12 text-white/40" />}
                    {listing.featured && (
                      <span className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold bg-white" style={{ color: shade }}>Featured</span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: shade }}>{listing.category}</span>
                      <Tag className="w-4 h-4 text-gray-300" />
                    </div>
                    <h3 className="font-bold mb-1 text-sm" style={{ color: "#03045e" }}>{listing.title}</h3>
                    <p className="text-lg font-bold mb-2" style={{ color: "#0077b6" }}>{listing.price}</p>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">{listing.description}</p>
                    <div className="border-t pt-4 space-y-2" style={{ borderColor: "#f0f4f8" }}>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: shade }}>{initials}</div>
                        <span className="font-medium">{listing.sellerName}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500"><MapPin className="w-3.5 h-3.5" />{listing.location}</div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <a href={`tel:${listing.sellerPhone}`} className="flex-1 px-3 py-2 border rounded-lg text-xs font-medium text-center flex items-center justify-center gap-1 transition-colors hover:bg-gray-50" style={{ borderColor: "#ade8f4", color: "#03045e" }}>
                        <Phone className="w-3.5 h-3.5" /> Call
                      </a>
                      <a href={`mailto:${listing.sellerEmail}`} className="flex-1 px-3 py-2 rounded-lg text-xs font-medium text-center text-white flex items-center justify-center gap-1" style={{ backgroundColor: "#0077b6" }}>
                        <Mail className="w-3.5 h-3.5" /> Email
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showPost && <PostListingModal onClose={() => setShowPost(false)} />}
    </div>
  );
}
