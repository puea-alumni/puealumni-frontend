import { Calendar, Clock } from "lucide-react";

export function NewsPage() {
  const news = [
    {
      id: 1,
      title: "PUEA Alumni Association Hosts Annual Homecoming",
      category: "Events",
      date: "May 20, 2026",
      readTime: "3 min read",
      excerpt: "Over 500 alumni gathered at the main campus for the annual homecoming celebration, featuring keynote speeches, networking sessions, and campus tours.",
      image: "🎓",
    },
    {
      id: 2,
      title: "New Scholarship Fund Established for Underprivileged Students",
      category: "Announcements",
      date: "May 15, 2026",
      readTime: "4 min read",
      excerpt: "The Alumni Association has launched a KES 5 million scholarship fund to support talented students from disadvantaged backgrounds.",
      image: "📚",
    },
    {
      id: 3,
      title: "Alumni Mentorship Program Expands to All Faculties",
      category: "Programs",
      date: "May 10, 2026",
      readTime: "5 min read",
      excerpt: "Following successful pilot programs, the mentorship initiative will now connect current students with alumni professionals across all academic departments.",
      image: "🤝",
    },
    {
      id: 4,
      title: "PUEA Ranked Among Top Universities in East Africa",
      category: "University News",
      date: "May 5, 2026",
      readTime: "2 min read",
      excerpt: "Presbyterian University has been recognized for academic excellence and graduate employability in the latest regional university rankings.",
      image: "🏆",
    },
    {
      id: 5,
      title: "Virtual Career Fair Connects Alumni with Job Seekers",
      category: "Career",
      date: "April 28, 2026",
      readTime: "3 min read",
      excerpt: "The first virtual career fair saw participation from 50 companies founded or led by PUEA alumni, offering opportunities to recent graduates.",
      image: "💼",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest News</h1>
          <p className="text-xl text-gray-600">Stay updated with the latest from PUEA Alumni Association</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {news.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-[#9333EA] text-white p-12 flex items-center justify-center text-6xl">
                {item.image}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-[#9333EA]/10 text-[#9333EA] rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{item.readTime}</span>
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.excerpt}</p>
                <button className="text-[#9333EA] hover:text-[#0EA5E9] font-semibold">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
