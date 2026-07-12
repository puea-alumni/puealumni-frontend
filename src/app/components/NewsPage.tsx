import { Calendar, Clock, Newspaper } from "lucide-react";
import { useApi } from "../lib/hooks";
import { endpoints } from "../lib/api";
import { ErrorState } from "./ui/ErrorState";
import { EmptyState } from "./ui/EmptyState";
import { Skeleton } from "./ui/Skeleton";

export interface NewsArticle {
  id: number | string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  imageUrl?: string;
  author?: string;
}

const CATEGORY_SHADES: Record<string, string> = {
  Events: "#03045e",
  Announcements: "#0077b6",
  Programs: "#0096c7",
  "University News": "#00b4d8",
  Career: "#0077b6",
};
const DEFAULT_SHADE = "#0096c7";

function ArticleSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 overflow-hidden ${featured ? "md:flex" : ""}`}>
      {featured
        ? <div className="md:w-56 h-40 md:h-auto" style={{ backgroundColor: "#ade8f4" }} />
        : <div className="h-24 w-full" style={{ backgroundColor: "#ade8f4" }} />}
      <div className="p-6 space-y-3 flex-1">
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

export function NewsPage() {
  const { data, loading, error, retry } = useApi<NewsArticle[]>(endpoints.news.list());

  const [featured, ...rest] = data ?? [];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f4f8" }}>
      <div className="py-12 px-4" style={{ backgroundColor: "#03045e" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Latest News</h1>
          <p className="text-lg" style={{ color: "#90e0ef" }}>Stay updated with the latest from PUEA Alumni Association</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {loading && (
          <>
            <div className="mb-8"><ArticleSkeleton featured /></div>
            <div className="grid lg:grid-cols-2 gap-6">{[1, 2, 3, 4].map((n) => <ArticleSkeleton key={n} />)}</div>
          </>
        )}

        {!loading && error && <ErrorState title="Could not load news" message={error} onRetry={retry} />}

        {!loading && !error && (!data || data.length === 0) && (
          <EmptyState icon={Newspaper} title="No news articles yet" description="News and announcements will appear here once published." />
        )}

        {!loading && !error && featured && (
          <>
            {/* Featured */}
            <div className="mb-8 bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition-all" style={{ borderColor: "#ade8f4" }}>
              <div className="md:flex">
                <div
                  className="md:w-56 flex items-center justify-center text-6xl flex-shrink-0"
                  style={{ backgroundColor: CATEGORY_SHADES[featured.category] ?? DEFAULT_SHADE, minHeight: "160px" }}
                >
                  {featured.imageUrl
                    ? <img src={featured.imageUrl} alt={featured.title} className="w-full h-full object-cover" />
                    : <Newspaper className="w-12 h-12 text-white/60" />}
                </div>
                <div className="flex-1 p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: CATEGORY_SHADES[featured.category] ?? DEFAULT_SHADE }}>
                      {featured.category}
                    </span>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Featured</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2" style={{ color: "#03045e" }}>{featured.title}</h2>
                  <p className="text-gray-500 leading-relaxed mb-4 text-sm">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{featured.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
                    {featured.author && <span>By {featured.author}</span>}
                  </div>
                  <button className="text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: "#0077b6" }}>Read More →</button>
                </div>
              </div>
            </div>

            {/* Grid */}
            {rest.length > 0 && (
              <div className="grid lg:grid-cols-2 gap-6">
                {rest.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-all" style={{ borderColor: "#ade8f4" }}>
                    <div
                      className="h-24 flex items-center justify-center"
                      style={{ backgroundColor: CATEGORY_SHADES[item.category] ?? DEFAULT_SHADE }}
                    >
                      {item.imageUrl
                        ? <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                        : <Newspaper className="w-8 h-8 text-white/60" />}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: CATEGORY_SHADES[item.category] ?? DEFAULT_SHADE }}>
                          {item.category}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-gray-400 ml-auto">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{item.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.readTime}</span>
                        </div>
                      </div>
                      <h2 className="text-base font-bold mb-2" style={{ color: "#03045e" }}>{item.title}</h2>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.excerpt}</p>
                      <button className="text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: "#0077b6" }}>Read More →</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
