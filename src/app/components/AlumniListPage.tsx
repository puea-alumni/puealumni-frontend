import { Link } from "react-router";
import { Search, MapPin, Briefcase, Calendar } from "lucide-react";
import { useState } from "react";

const mockAlumni = [
  {
    id: 1,
    name: "Sarah Johnson",
    graduationYear: 2018,
    degree: "Computer Science",
    company: "Google",
    position: "Senior Software Engineer",
    location: "San Francisco, CA",
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    graduationYear: 2016,
    degree: "Business Administration",
    company: "McKinsey & Company",
    position: "Management Consultant",
    location: "New York, NY",
    avatar: "MC",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    graduationYear: 2019,
    degree: "Electrical Engineering",
    company: "Tesla",
    position: "Hardware Engineer",
    location: "Austin, TX",
    avatar: "ER",
  },
  {
    id: 4,
    name: "David Kim",
    graduationYear: 2017,
    degree: "Marketing",
    company: "Meta",
    position: "Product Marketing Manager",
    location: "Menlo Park, CA",
    avatar: "DK",
  },
  {
    id: 5,
    name: "Jessica Williams",
    graduationYear: 2015,
    degree: "Medicine",
    company: "Johns Hopkins Hospital",
    position: "Chief Resident",
    location: "Baltimore, MD",
    avatar: "JW",
  },
  {
    id: 6,
    name: "Robert Taylor",
    graduationYear: 2020,
    degree: "Data Science",
    company: "Amazon",
    position: "Data Scientist",
    location: "Seattle, WA",
    avatar: "RT",
  },
];

export function AlumniListPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAlumni = mockAlumni.filter((alumni) =>
    alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.degree.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Alumni Directory</h1>
          <p className="text-xl text-gray-600">Connect with fellow graduates from our community</p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, company, or degree..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9333EA] focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((alumni) => (
            <Link
              key={alumni.id}
              to={`/alumni/${alumni.id}`}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-[#9333EA] text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                  {alumni.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{alumni.name}</h3>
                  <p className="text-sm text-gray-600">{alumni.degree}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>Class of {alumni.graduationYear}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Briefcase className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">{alumni.position}</div>
                    <div className="text-gray-600">{alumni.company}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span>{alumni.location}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredAlumni.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No alumni found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
