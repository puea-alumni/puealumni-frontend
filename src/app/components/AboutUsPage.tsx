import { useState } from "react";
import { Users, Target, Eye, Award } from "lucide-react";
import chairmanImg from "../../imports/WhatsApp_Image_2026-06-02_at_22.58.01.jpeg";

type Tab = "mission" | "leadership" | "whatwedo";

export function AboutUsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("mission");

  const tabs: { id: Tab; label: string }[] = [
    { id: "mission", label: "Mission & Vision" },
    { id: "leadership", label: "Leadership" },
    { id: "whatwedo", label: "What We Do" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="py-20 px-4 text-white" style={{ backgroundColor: "#03045e" }}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">About PUEA Alumni Association</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto" style={{ color: "#ade8f4" }}>
            Connecting Presbyterian University graduates worldwide, fostering professional growth,
            and maintaining lifelong bonds with our alma mater.
          </p>
        </div>
      </section>

      {/* Chairman's Message */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: "#03045e" }}>
            Chairman's Message
          </h2>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-shrink-0 flex flex-col items-center">
              <img
                src={chairmanImg}
                alt="Alban Ng'uono — Chairperson"
                className="w-52 h-64 object-cover rounded-xl shadow-md border-4"
                style={{ borderColor: "#0077b6" }}
              />
              <p className="mt-3 font-bold text-center" style={{ color: "#03045e" }}>Alban Ng&apos;uono</p>
              <p className="text-sm text-center" style={{ color: "#0077b6" }}>Chairperson, PUEA Alumni</p>
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl p-8 border-l-4" style={{ borderColor: "#0077b6" }}>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Dear Fellow Alumni,
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                It is my great honour to serve as the Chairperson of the Presbyterian University of East Africa Alumni Association. Our association exists to bridge the gap between our past experiences at PUEA and the professionals, leaders, and community members we have become.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We are committed to creating meaningful connections, driving impactful programs, and ensuring that every alumnus feels valued and supported in their journey beyond the university gates.
              </p>
              <p className="text-gray-700 leading-relaxed">
                I invite you to engage actively with our programs, mentor our current students, and help us build a stronger PUEA community. Together, we can achieve more.
              </p>
              <p className="mt-6 font-semibold" style={{ color: "#03045e" }}>— Alban Ng&apos;uono</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="px-4 py-2 sticky top-16 z-40 shadow-sm" style={{ backgroundColor: "#ade8f4" }}>
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="px-6 py-3 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors"
              style={
                activeTab === t.id
                  ? { backgroundColor: "#3f37c9", color: "#fff" }
                  : { backgroundColor: "transparent", color: "#03045e" }
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* Mission & Vision Tab */}
      {activeTab === "mission" && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: "#ade8f4" }}>
                  <Target className="w-7 h-7" style={{ color: "#03045e" }} />
                </div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: "#03045e" }}>Our Mission</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Networking Alumni members through effective communication and proper mentorship programmes.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: "#ade8f4" }}>
                  <Eye className="w-7 h-7" style={{ color: "#03045e" }} />
                </div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: "#03045e" }}>Our Vision</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To champion the provision of services to the university community by promoting interaction
                  between all members of the alumni and the neighboring community and Africa as a whole.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-8 h-8" style={{ color: "#3f37c9" }} />
                <h2 className="text-2xl font-bold" style={{ color: "#03045e" }}>Our Core Values</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Excellence", body: "We strive for the highest standards in all our endeavors and encourage our members to pursue continuous improvement." },
                  { title: "Community", body: "We believe in the power of connection and support, fostering a strong sense of belonging among all alumni." },
                  { title: "Integrity", body: "We uphold the highest ethical standards and demonstrate transparency in all our activities and interactions." },
                  { title: "Service", body: "We are committed to giving back to our university and communities through volunteer work and mentorship." },
                  { title: "Innovation", body: "We embrace new ideas and creative solutions to meet the evolving needs of our alumni network." },
                  { title: "Diversity", body: "We celebrate the diverse backgrounds and experiences of our alumni, fostering an inclusive environment for all." },
                ].map((v) => (
                  <div key={v.title} className="p-4 rounded-lg" style={{ backgroundColor: "#ade8f4" }}>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "#03045e" }}>{v.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{v.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Leadership Tab */}
      {activeTab === "leadership" && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3" style={{ color: "#03045e" }}>Our Leadership Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Meet the dedicated executive committee leading the PUEA Alumni Association
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {[
                { initials: "AN", name: "Alban Ng'uono", role: "Chairperson", desc: "Presides over all meetings of the Executive Committee and Annual General Meetings, providing leadership and strategic direction.", accent: "#0077b6" },
                { initials: "GA", name: "Gentrix Achenda", role: "Vice Chairperson", desc: "Performs duties of the Chairperson in their absence and carries out other duties assigned by the Executive Committee.", accent: "#3f37c9" },
                { initials: "BM", name: "Bivon Mbaka", role: "Secretary", desc: "Handles all organizational matters and correspondence, maintains custody of member names and addresses.", accent: "#0077b6" },
                { initials: "DM", name: "Daniel Muteti", role: "Treasurer", desc: "Manages all financial matters, fundraising activities, and prepares quarterly financial reports.", accent: "#3f37c9" },
                { initials: "MN", name: "Mike Njoroge", role: "Outgoing Alumni Chairperson", desc: "Ex-Official", accent: "#0077b6" },
                { initials: "KD", name: "Kapchanga Daniel", role: "PUSA President", desc: "Ex-Official", accent: "#3f37c9" },
                { initials: "MS", name: "Mathew Samuel", role: "Chairperson of Subcommittees", desc: "Leads and coordinates various subcommittees within the association.", accent: "#0077b6" },
                { initials: "CW", name: "Charity Wabungu", role: "Ex-Official", desc: "", accent: "#3f37c9" },
                { initials: "A", name: "Abigael", role: "Ex-Official", desc: "", accent: "#0077b6" },
                { initials: "J", name: "Jackline", role: "Ex-Official", desc: "", accent: "#3f37c9" },
              ].map((m) => (
                <div key={m.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold text-white mx-auto mb-4"
                    style={{ backgroundColor: m.accent }}
                  >
                    {m.initials}
                  </div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: "#03045e" }}>{m.name}</h3>
                  <p className="font-semibold mb-3 text-sm" style={{ color: "#3f37c9" }}>{m.role}</p>
                  {m.desc && <p className="text-sm text-gray-600 leading-relaxed">{m.desc}</p>}
                </div>
              ))}
            </div>

            <div className="text-center">
              <a
                href="/constitution.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 text-white rounded-lg font-semibold text-lg shadow-lg transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#0077b6" }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Alumni Constitution
              </a>
            </div>
          </div>
        </section>
      )}

      {/* What We Do Tab */}
      {activeTab === "whatwedo" && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3" style={{ color: "#03045e" }}>What We Do</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The PUEA Alumni Association provides comprehensive support and opportunities for our graduates
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Users className="w-10 h-10" />, title: "Networking Events", body: "Regular gatherings, reunions, and professional networking opportunities to connect alumni across generations and industries." },
                { icon: <Target className="w-10 h-10" />, title: "Career Development", body: "Job portal, mentorship programs, and career workshops to support professional growth and advancement." },
                { icon: <Award className="w-10 h-10" />, title: "Recognition Programs", body: "Alumni spotlight and awards to celebrate outstanding achievements and contributions to society." },
                { icon: <Users className="w-10 h-10" />, title: "Mentorship", body: "Connecting experienced alumni with current students and recent graduates for guidance and support." },
                { icon: <Target className="w-10 h-10" />, title: "Community Service", body: "Organizing volunteer initiatives and giving back to the university and local communities." },
                { icon: <Award className="w-10 h-10" />, title: "Scholarships", body: "Providing financial support to deserving students through alumni-funded scholarship programs." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-xl border-2 transition-colors bg-white"
                  style={{ borderColor: "#ade8f4" }}
                >
                  <div style={{ color: "#0077b6" }} className="mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "#03045e" }}>{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Join Us CTA */}
      <section className="py-16 px-4 text-white" style={{ backgroundColor: "#0077b6" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg opacity-90 mb-8" style={{ color: "#ade8f4" }}>
            Be part of a network of alumni making a difference worldwide
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/login"
              className="px-8 py-3 rounded-lg font-semibold transition-colors text-[#03045e]"
              style={{ backgroundColor: "#ade8f4" }}
            >
              Become a Member
            </a>
            <a
              href="/events"
              className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-semibold"
            >
              Upcoming Events
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
