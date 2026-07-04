import { useState } from "react";
import { Award, TrendingUp, Star, Briefcase, Users, Heart, Megaphone, Trophy, BookOpen } from "lucide-react";
import { useApi } from "../lib/hooks";
import { endpoints } from "../lib/api";
import { ErrorState } from "./ui/ErrorState";
import { EmptyState } from "./ui/EmptyState";
import { Skeleton } from "./ui/Skeleton";

// ─── Types ───────────────────────────────────────────────────────────────────
export type SpotlightCategory =
  | "All"
  | "Success Story"
  | "Career Achievement"
  | "Business Highlight"
  | "Community Initiative"
  | "Award & Recognition"
  | "Featured Alumni"
  | "Announcement";

export interface SpotlightPost {
  id: number | string;
  title: string;
  category: SpotlightCategory;
  alumniName: string;
  alumniTitle: string;
  graduationYear?: number;
  content: string;
  excerpt: string;
  publishedAt: string;
  avatarInitials?: string;
  avatarUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  tags?: string[];
}

// ─── Config ──────────────────────────────────────────────────────────────────
const CATEGORIES: { label: SpotlightCategory; icon: React.ElementType; shade: string }[] = [
  { label: "All", icon: Star, shade: "#03045e" },
  { label: "Success Story", icon: TrendingUp, shade: "#0077b6" },
  { label: "Career Achievement", icon: Briefcase, shade: "#0096c7" },
  { label: "Business Highlight", icon: Trophy, shade: "#00b4d8" },
  { label: "Community Initiative", icon: Heart, shade: "#48cae4" },
  { label: "Award & Recognition", icon: Award, shade: "#0077b6" },
  { label: "Featured Alumni", icon: Users, shade: "#03045e" },
  { label: "Announcement", icon: Megaphone, shade: "#0096c7" },
];

function catShade(cat: string) {
  return CATEGORIES.find((c) => c.label === cat)?.shade ?? "#0077b6";
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function PostSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse ${featured ? "md:flex" : ""}`}>
      <div className={featured ? "md:w-72 h-56 md:h-auto bg-gray-200" : "h-40 bg-gray-200"} />
      <div className="p-6 space-y-3 flex-1">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        {featured && <Skeleton className="h-6 w-3/4" />}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex items-center gap-3 pt-2">
          <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Post card ────────────────────────────────────────────────────────────────
function PostCard({ post, featured = false }: { post: SpotlightPost; featured?: boolean }) {
  const shade = catShade(post.category);
  const initials = post.avatarInitials ?? post.alumniName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const CatIcon = CATEGORIES.find((c) => c.label === post.category)?.icon ?? Star;

  if (featured) {
    return (
      <div className="bg-white rounded-2xl border overflow-hidden hover:shadow-xl transition-all md:flex" style={{ borderColor: "#ade8f4" }}>
        {/* Image / colour panel */}
        <div className="md:w-72 flex-shrink-0 relative" style={{ backgroundColor: shade, minHeight: "220px" }}>
          {post.imageUrl
            ? <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover absolute inset-0" />
            : <div className="absolute inset-0 flex items-center justify-center"><CatIcon className="w-16 h-16 text-white/30" /></div>}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white" style={{ color: shade }}>{post.category}</span>
          </div>
          {post.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#03045e" }}>⭐ Featured</span>
            </div>
          )}
        </div>
        <div className="p-8 flex flex-col justify-between flex-1">
          <div>
            <h2 className="text-2xl font-bold mb-3 leading-snug" style={{ color: "#03045e" }}>{post.title}</h2>
            <p className="text-gray-500 leading-relaxed mb-5 text-sm">{post.excerpt}</p>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: "#90e0ef", color: "#03045e" }}>{tag}</span>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t" style={{ borderColor: "#f0f4f8" }}>
            <div className="flex items-center gap-3">
              {post.avatarUrl
                ? <img src={post.avatarUrl} alt={post.alumniName} className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
                : <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: shade }}>{initials}</div>}
              <div>
                <p className="font-bold text-sm" style={{ color: "#03045e" }}>{post.alumniName}</p>
                <p className="text-xs" style={{ color: "#0077b6" }}>{post.alumniTitle}{post.graduationYear ? ` · Class of ${post.graduationYear}` : ""}</p>
              </div>
            </div>
            <button className="text-sm font-semibold flex items-center gap-1 hover:opacity-70 transition-opacity" style={{ color: "#0077b6" }}>
              Read More →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-all flex flex-col" style={{ borderColor: "#ade8f4" }}>
      <div className="h-2 w-full" style={{ backgroundColor: shade }} />
      <div className="relative h-36 overflow-hidden" style={{ backgroundColor: shade }}>
        {post.imageUrl
          ? <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          : <div className="absolute inset-0 flex items-center justify-center"><CatIcon className="w-12 h-12 text-white/30" /></div>}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white" style={{ color: shade }}>{post.category}</span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-sm leading-snug mb-2" style={{ color: "#03045e" }}>{post.title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "#f0f4f8" }}>
          <div className="flex items-center gap-2">
            {post.avatarUrl
              ? <img src={post.avatarUrl} alt={post.alumniName} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
              : <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: shade }}>{initials}</div>}
            <div>
              <p className="text-xs font-semibold leading-tight" style={{ color: "#03045e" }}>{post.alumniName}</p>
              <p className="text-xs" style={{ color: "#0077b6" }}>{post.publishedAt}</p>
            </div>
          </div>
          <button className="text-xs font-semibold hover:opacity-70 transition-opacity" style={{ color: "#0077b6" }}>Read →</button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function SpotlightPage() {
  const [activeCategory, setActiveCategory] = useState<SpotlightCategory>("All");
  const { data, loading, error, retry } = useApi<SpotlightPost[]>(endpoints.spotlight.list());

  const filtered = activeCategory === "All"
    ? (data ?? [])
    : (data ?? []).filter((p) => p.category === activeCategory);

  const featuredPost = filtered.find((p) => p.featured) ?? filtered[0];
  const rest = featuredPost ? filtered.filter((p) => p.id !== featuredPost.id) : filtered;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f4f8" }}>
      {/* Header */}
      <div className="py-14 px-4 text-white" style={{ backgroundColor: "#03045e" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#90e0ef" }}>
              <Star className="w-5 h-5" style={{ color: "#03045e" }} />
            </div>
            <span className="text-sm font-semibold" style={{ color: "#90e0ef" }}>Alumni Spotlight</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Celebrating Our Alumni</h1>
          <p className="text-lg max-w-2xl" style={{ color: "#90e0ef" }}>
            Success stories, career achievements, community initiatives, and recognitions from the PUEA alumni community.
          </p>
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="sticky top-16 z-30 border-b shadow-sm" style={{ backgroundColor: "#ade8f4", borderColor: "#90e0ef" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {CATEGORIES.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => setActiveCategory(label)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0"
                style={activeCategory === label
                  ? { backgroundColor: "#03045e", color: "#fff" }
                  : { color: "#03045e", backgroundColor: "transparent" }}
              >
                <Icon className="w-3.5 h-3.5" /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        {/* Loading */}
        {loading && (
          <>
            <PostSkeleton featured />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => <PostSkeleton key={n} />)}
            </div>
          </>
        )}

        {/* Error */}
        {!loading && error && <ErrorState title="Could not load spotlight" message={error} onRetry={retry} />}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <EmptyState
            icon={Star}
            title={activeCategory !== "All" ? `No ${activeCategory} posts yet` : "No spotlight posts yet"}
            description="Alumni stories and achievements will appear here once published by the admin."
            action={activeCategory !== "All" ? { label: "Show All", onClick: () => setActiveCategory("All") } : undefined}
          />
        )}

        {/* Featured post */}
        {!loading && !error && featuredPost && <PostCard post={featuredPost} featured />}

        {/* Grid */}
        {!loading && !error && rest.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        )}

        {/* Load more placeholder */}
        {!loading && !error && filtered.length > 0 && (
          <div className="text-center pt-4">
            <button
              className="px-8 py-3 rounded-xl text-sm font-semibold border-2 transition-all hover:text-white hover:bg-[#0077b6]"
              style={{ borderColor: "#0077b6", color: "#0077b6" }}
              // onClick: TODO — fetch next page from API
            >
              Load More Posts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
