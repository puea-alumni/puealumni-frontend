import { Link } from "react-router";
import { Search, MapPin, Briefcase, Clock, DollarSign, Filter } from "lucide-react";
import { useState } from "react";

const mockJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Google",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$150k - $200k",
    postedBy: "Sarah Johnson",
    postedDate: "2 days ago",
    description: "Join our team to build next-generation cloud infrastructure.",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "Meta",
    location: "Menlo Park, CA",
    type: "Full-time",
    salary: "$140k - $180k",
    postedBy: "David Kim",
    postedDate: "5 days ago",
    description: "Lead product strategy for our social commerce initiatives.",
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "Amazon",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$130k - $170k",
    postedBy: "Robert Taylor",
    postedDate: "1 week ago",
    description: "Apply ML to optimize supply chain operations at scale.",
  },
  {
    id: 4,
    title: "UX Designer",
    company: "Apple",
    location: "Cupertino, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    postedBy: "Emily Rodriguez",
    postedDate: "1 week ago",
    description: "Design intuitive experiences for millions of users worldwide.",
  },
  {
    id: 5,
    title: "Marketing Manager",
    company: "Tesla",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110k - $150k",
    postedBy: "Michael Chen",
    postedDate: "2 weeks ago",
    description: "Drive brand awareness and customer acquisition strategies.",
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "Netflix",
    location: "Los Gatos, CA",
    type: "Full-time",
    salary: "$140k - $180k",
    postedBy: "Sarah Johnson",
    postedDate: "3 days ago",
    description: "Build and maintain infrastructure serving 200M+ users.",
  },
];

export function JobPortalPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = mockJobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Job Portal</h1>
          <p className="text-xl text-gray-600">Exclusive opportunities from our alumni network</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9333EA] focus:border-transparent"
            />
          </div>
          <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 justify-center">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <Link
              key={job.id}
              to={`/jobs/${job.id}`}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-lg text-gray-700 mb-3">{job.company}</p>
                </div>
                <span className="px-3 py-1 bg-purple-100 text-[#9333EA] rounded-full text-sm font-medium">
                  {job.type}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{job.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span>{job.salary}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Posted by <span className="font-medium text-gray-700">{job.postedBy}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{job.postedDate}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No jobs found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
