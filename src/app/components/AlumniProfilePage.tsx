import { useParams, Link } from "react-router";
import { MapPin, Briefcase, Calendar, Mail, Linkedin, Globe, Award, GraduationCap } from "lucide-react";

export function AlumniProfilePage() {
  const { id } = useParams();

  const alumni = {
    id: 1,
    name: "Sarah Johnson",
    graduationYear: 2018,
    degree: "Bachelor of Science in Computer Science",
    company: "Google",
    position: "Senior Software Engineer",
    location: "San Francisco, CA",
    avatar: "SJ",
    email: "sarah.johnson@example.com",
    linkedin: "linkedin.com/in/sarahjohnson",
    website: "sarahjohnson.dev",
    bio: "Passionate software engineer with expertise in distributed systems and cloud architecture. Love mentoring junior developers and contributing to open-source projects.",
    skills: ["Python", "JavaScript", "React", "Kubernetes", "Cloud Architecture", "System Design"],
    achievements: [
      "Led migration of legacy system to microservices architecture",
      "Published 3 research papers on distributed computing",
      "Speaker at Google I/O 2023",
    ],
    education: [
      {
        degree: "Master of Science in Computer Science",
        institution: "Stanford University",
        year: "2020",
      },
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University Name",
        year: "2018",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link to="/alumni" className="text-[#9333EA] hover:text-[#0EA5E9] mb-6 inline-block">
          ← Back to Alumni Directory
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#9333EA] h-32"></div>

          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row gap-6 -mt-16 mb-6">
              <div className="w-32 h-32 bg-[#9333EA] text-white rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white shadow-lg">
                {alumni.avatar}
              </div>

              <div className="flex-1 mt-16 md:mt-20">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{alumni.name}</h1>
                <p className="text-xl text-gray-600 mb-4">{alumni.position} at {alumni.company}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{alumni.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Class of {alumni.graduationYear}</span>
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col gap-2 mt-16 md:mt-20">
                <a
                  href={`mailto:${alumni.email}`}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 justify-center"
                >
                  <Mail className="w-4 h-4" />
                  <span className="hidden md:inline">Email</span>
                </a>
                <button className="px-4 py-2 bg-[#9333EA] text-white rounded-lg hover:bg-[#7c2bbf] transition-colors">
                  Connect
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">About</h2>
                  <p className="text-gray-700 leading-relaxed">{alumni.bio}</p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {alumni.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-purple-50 text-[#9333EA] rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Key Achievements</h2>
                  <ul className="space-y-2">
                    {alumni.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Award className="w-5 h-5 text-[#9333EA] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Education</h3>
                  <div className="space-y-4">
                    {alumni.education.map((edu, index) => (
                      <div key={index}>
                        <div className="flex items-start gap-2 mb-1">
                          <GraduationCap className="w-5 h-5 text-[#9333EA] mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900">{edu.degree}</div>
                            <div className="text-sm text-gray-600">{edu.institution}</div>
                            <div className="text-sm text-gray-500">{edu.year}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Contact & Social</h3>
                  <div className="space-y-3">
                    <a
                      href={`mailto:${alumni.email}`}
                      className="flex items-center gap-2 text-gray-700 hover:text-[#9333EA]"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-sm truncate">{alumni.email}</span>
                    </a>
                    <a
                      href={`https://${alumni.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-700 hover:text-[#9333EA]"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span className="text-sm truncate">LinkedIn</span>
                    </a>
                    <a
                      href={`https://${alumni.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-700 hover:text-[#9333EA]"
                    >
                      <Globe className="w-4 h-4" />
                      <span className="text-sm truncate">{alumni.website}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
