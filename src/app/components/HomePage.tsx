import { Link } from "react-router";
import { Users, Briefcase, Calendar, Globe, Award, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import bgPuea from "../../imports/BG__PUEA.jpeg";
import alumni3 from "../../imports/alumni_3.jpg";
import alumni4 from "../../imports/alumni_4.jpg";

export function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [alumni3, alumni4, bgPuea];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Users,
      title: "Connect with Alumni",
      description: "Build meaningful relationships with fellow graduates from around the world",
    },
    {
      icon: Briefcase,
      title: "Career Opportunities",
      description: "Access exclusive job postings and career resources from our network",
    },
    {
      icon: Calendar,
      title: "Events & Networking",
      description: "Attend reunions, workshops, and networking events throughout the year",
    },
  ];

  const stats = [
    { label: "Alumni Members", value: "50,000+", icon: Users },
    { label: "Job Postings", value: "1,200+", icon: Briefcase },
    { label: "Events Annually", value: "150+", icon: Calendar },
    { label: "Countries", value: "85+", icon: Globe },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-24 px-4 overflow-hidden min-h-[600px] flex items-center">
        {/* Animated Background Images */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Hero ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#9333EA]/35"></div>
          </div>
        ))}

        {/* Content */}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to PUEA Alumni Network
            </h1>
            <p className="text-xl md:text-2xl mb-10 opacity-95 leading-relaxed">
              Join our thriving community of Presbyterian University alumni. Network, grow your career, and stay connected
              with your alma mater.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="px-8 py-4 bg-white text-[#9333EA] rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg shadow-lg"
              >
                Join Now
              </Link>
              <Link
                to="/alumni"
                className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#9333EA] transition-all font-semibold text-lg"
              >
                Explore Alumni
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-[#156BF4]" />
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Stay Connected
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools you need to network, advance your career, and
              give back to your community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-8 bg-white rounded-2xl border border-gray-100 hover:border-[#156BF4]/30 hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-[#156BF4]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chairman's Message */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 p-8 md:p-16">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="w-72 h-72 rounded-full bg-purple-100 p-2">
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-7xl font-bold text-gray-400">
                      AN
                    </div>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-8 py-3 rounded-xl shadow-lg border border-gray-100">
                    <p className="font-bold text-gray-900 text-lg">Alban Ng'uono</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="w-16 h-16 bg-purple-50 rounded-xl flex items-center justify-center mb-6">
                  <Quote className="w-8 h-8 text-[#9333EA]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Chairman's Message</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Dear Alumni,
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  It is with great pleasure and honor that I welcome you to the Presbyterian University Alumni Association platform.
                  As we continue to grow our community, this platform serves as a bridge connecting our accomplished graduates
                  across the globe.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our mission is to foster meaningful connections, support career development, and maintain the strong bonds
                  that were formed during our time at Presbyterian University. Together, we can create opportunities, share
                  experiences, and contribute to the continued success of our alma mater.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  I encourage you to actively participate in our events, job portal, and networking opportunities.
                  Your success is our success, and together we will continue to make a positive impact in our communities.
                </p>
                <div className="mt-6">
                  <p className="font-bold text-gray-900">Alban Ng'uono</p>
                  <p className="text-gray-600">Chairman, PUEA Alumni Association</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Alumni Are Saying */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Alumni Are Saying</h2>
            <p className="text-xl text-gray-600">Hear from our vibrant community of graduates</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-[#156BF4]" />
              </div>
              <p className="text-gray-700 mb-8 italic leading-relaxed">
                "The PUEA Alumni network has been instrumental in my career growth. Through the job portal,
                I connected with amazing opportunities and mentors who guided me to success."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#156BF4] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  SM
                </div>
                <div>
                  <p className="font-bold text-gray-900">Sarah Mwangi</p>
                  <p className="text-sm text-gray-600">Class of 2019, Software Engineer</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-[#156BF4]" />
              </div>
              <p className="text-gray-700 mb-8 italic leading-relaxed">
                "Attending alumni events has kept me connected to the university and fellow graduates.
                The networking opportunities are invaluable, and I've made lifelong friendships."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#0EA5E9] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  JK
                </div>
                <div>
                  <p className="font-bold text-gray-900">John Kamau</p>
                  <p className="text-sm text-gray-600">Class of 2016, Business Consultant</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-[#156BF4]" />
              </div>
              <p className="text-gray-700 mb-8 italic leading-relaxed">
                "Being part of the PUEA Alumni community means staying connected to a family that supports
                and uplifts each other. I'm proud to give back and help current students achieve their dreams."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#10B981] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  GA
                </div>
                <div>
                  <p className="font-bold text-gray-900">Grace Achieng</p>
                  <p className="text-sm text-gray-600">Class of 2018, Medical Doctor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={bgPuea}
            alt="PUEA Graduation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#9333EA]/50"></div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Award className="w-10 h-10" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl md:text-2xl opacity-95 mb-10 leading-relaxed">
            Create your profile today and start connecting with thousands of alumni worldwide.
          </p>
          <Link
            to="/register"
            className="inline-block px-10 py-4 bg-white text-[#156BF4] rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg shadow-xl"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
