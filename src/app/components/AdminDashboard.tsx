import { Users, Briefcase, Calendar, TrendingUp, UserPlus, Activity, DollarSign, Eye } from "lucide-react";

export function AdminDashboard() {
  const stats = [
    { label: "Total Alumni", value: "50,234", change: "+12.5%", icon: Users, color: "blue" },
    { label: "Active Jobs", value: "1,247", change: "+8.2%", icon: Briefcase, color: "green" },
    { label: "Upcoming Events", value: "23", change: "+4", icon: Calendar, color: "purple" },
    { label: "Total Revenue", value: "$124,500", change: "+15.3%", icon: DollarSign, color: "yellow" },
  ];

  const recentAlumni = [
    { name: "Alice Thompson", email: "alice@example.com", graduationYear: 2024, joinedDays: 1 },
    { name: "Bob Martinez", email: "bob@example.com", graduationYear: 2023, joinedDays: 2 },
    { name: "Carol Lee", email: "carol@example.com", graduationYear: 2024, joinedDays: 3 },
    { name: "David Park", email: "david@example.com", graduationYear: 2022, joinedDays: 5 },
  ];

  const recentJobs = [
    { title: "Software Engineer", company: "Google", applicants: 45, status: "Active" },
    { title: "Product Manager", company: "Meta", applicants: 32, status: "Active" },
    { title: "Data Scientist", company: "Amazon", applicants: 28, status: "Active" },
    { title: "UX Designer", company: "Apple", applicants: 19, status: "Pending" },
  ];

  const upcomingEvents = [
    { name: "Annual Alumni Reunion 2026", date: "June 15, 2026", attendees: 234, revenue: "$17,550" },
    { name: "Tech Career Workshop", date: "May 30, 2026", attendees: 89, revenue: "$2,225" },
    { name: "Networking Mixer", date: "July 20, 2026", attendees: 156, revenue: "$5,460" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of your alumni network platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: "bg-purple-50 text-[#9333EA]",
              green: "bg-green-100 text-green-600",
              purple: "bg-purple-100 text-purple-600",
              yellow: "bg-yellow-100 text-yellow-600",
            }[stat.color];

            return (
              <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Alumni</h2>
              <UserPlus className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentAlumni.map((alumni, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#9333EA] text-white rounded-full flex items-center justify-center font-bold">
                      {alumni.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{alumni.name}</div>
                      <div className="text-sm text-gray-500">{alumni.email}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Class of {alumni.graduationYear}</div>
                    <div className="text-xs text-gray-500">{alumni.joinedDays}d ago</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Job Postings</h2>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentJobs.map((job, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <div className="font-medium text-gray-900">{job.title}</div>
                    <div className="text-sm text-gray-500">{job.company}</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                      <Eye className="w-4 h-4" />
                      <span>{job.applicants} applicants</span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        job.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Event Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Attendees</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {upcomingEvents.map((event, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{event.name}</td>
                    <td className="py-3 px-4 text-gray-600">{event.date}</td>
                    <td className="py-3 px-4 text-gray-600">{event.attendees}</td>
                    <td className="py-3 px-4 font-semibold text-green-600">{event.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
