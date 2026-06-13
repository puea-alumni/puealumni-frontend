import { useParams, Link } from "react-router";
import { MapPin, Briefcase, Clock, DollarSign, Building2, Users, CheckCircle } from "lucide-react";

export function JobDetailPage() {
  const { id } = useParams();

  const job = {
    id: 1,
    title: "Senior Software Engineer",
    company: "Google",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$150k - $200k",
    postedBy: "Sarah Johnson",
    postedDate: "2 days ago",
    department: "Cloud Infrastructure",
    applicants: 24,
    description: `We are looking for a Senior Software Engineer to join our Cloud Infrastructure team.
    You will be responsible for designing and building scalable distributed systems that power Google's cloud platform.`,
    responsibilities: [
      "Design and implement highly scalable distributed systems",
      "Collaborate with cross-functional teams to deliver cloud solutions",
      "Mentor junior engineers and contribute to technical direction",
      "Participate in code reviews and maintain high code quality standards",
      "Optimize system performance and reliability",
    ],
    requirements: [
      "5+ years of experience in software engineering",
      "Strong proficiency in Python, Go, or Java",
      "Experience with distributed systems and microservices architecture",
      "Knowledge of cloud platforms (GCP, AWS, or Azure)",
      "Excellent problem-solving and communication skills",
      "Bachelor's degree in Computer Science or related field",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "401(k) matching and retirement planning",
      "Flexible work arrangements and remote options",
      "Professional development and learning opportunities",
      "Generous PTO and parental leave",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link to="/jobs" className="text-[#9333EA] hover:text-[#0EA5E9] mb-6 inline-block">
          ← Back to Job Listings
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#9333EA] text-white p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                <p className="text-xl opacity-90">{job.company}</p>
              </div>
              <span className="px-4 py-2 bg-white text-[#9333EA] rounded-lg font-medium self-start">
                {job.type}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-90">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                <span>{job.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{job.applicants} applicants</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-4 mb-8 pb-8 border-b border-gray-200">
              <div className="flex-1 text-sm text-gray-600">
                Posted by <span className="font-medium text-gray-900">{job.postedBy}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{job.postedDate}</span>
              </div>
              <button className="px-6 py-3 bg-[#9333EA] text-white rounded-lg hover:bg-[#7c2bbf] transition-colors font-semibold">
                Apply Now
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#9333EA] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#9333EA] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h2>
                <ul className="space-y-3">
                  {job.benefits.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#9333EA] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <button className="w-full md:w-auto px-8 py-4 bg-[#9333EA] text-white rounded-lg hover:bg-[#7c2bbf] transition-colors font-semibold text-lg">
                  Apply for this Position
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
