import { Users, Target, Eye, Award } from "lucide-react";

export function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#9333EA] text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">About PUEA Alumni Association</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Connecting Presbyterian University graduates worldwide, fostering professional growth,
            and maintaining lifelong bonds with our alma mater.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="w-16 h-16 bg-purple-50 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-[#9333EA]" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Networking Alumni members through effective communication and proper mentorship programmes.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="w-16 h-16 bg-purple-50 rounded-lg flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-[#9333EA]" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                To champion the provision of services to the university community by promoting interaction
                between all members of the alumni and the neighboring community and Africa as a whole.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-10 h-10 text-[#9333EA]" />
              <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
                <p className="text-gray-600">
                  We strive for the highest standards in all our endeavors and encourage our members
                  to pursue continuous improvement.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Community</h3>
                <p className="text-gray-600">
                  We believe in the power of connection and support, fostering a strong sense of
                  belonging among all alumni.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Integrity</h3>
                <p className="text-gray-600">
                  We uphold the highest ethical standards and demonstrate transparency in all our
                  activities and interactions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Service</h3>
                <p className="text-gray-600">
                  We are committed to giving back to our university and communities through volunteer
                  work and mentorship.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We embrace new ideas and creative solutions to meet the evolving needs of our
                  alumni network.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Diversity</h3>
                <p className="text-gray-600">
                  We celebrate the diverse backgrounds and experiences of our alumni, fostering an
                  inclusive environment for all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated executive committee leading the PUEA Alumni Association
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Chairperson */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="w-24 h-24 bg-[#9333EA] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                AN
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Alban Ng'uono</h3>
              <p className="text-[#9333EA] font-semibold mb-3">Chairperson</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Presides over all meetings of the Executive Committee and Annual General Meetings,
                providing leadership and strategic direction.
              </p>
            </div>

            {/* Vice Chairperson */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="w-24 h-24 bg-[#0EA5E9] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                GA
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Gentrix Achenda</h3>
              <p className="text-[#9333EA] font-semibold mb-3">Vice Chairperson</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Performs duties of the Chairperson in their absence and carries out other duties
                assigned by the Executive Committee.
              </p>
            </div>

            {/* Secretary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="w-24 h-24 bg-[#10B981] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                BM
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Bivon Mbaka</h3>
              <p className="text-[#9333EA] font-semibold mb-3">Secretary</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Handles all organizational matters and correspondence, maintains custody of member
                names and addresses.
              </p>
            </div>

            {/* Treasurer */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="w-24 h-24 bg-[#9333EA] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                DM
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Daniel Muteti</h3>
              <p className="text-[#9333EA] font-semibold mb-3">Treasurer</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Manages all financial matters, fundraising activities, and prepares quarterly financial reports.
              </p>
            </div>

            {/* Outgoing Chairperson */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="w-24 h-24 bg-[#0EA5E9] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                MN
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Mike Njoroge</h3>
              <p className="text-[#9333EA] font-semibold mb-3">Outgoing Alumni Chairperson</p>
              <p className="text-sm text-gray-600 leading-relaxed">Ex-Official</p>
            </div>

            {/* PUSA President */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="w-24 h-24 bg-[#10B981] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                KD
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Kapchanga Daniel</h3>
              <p className="text-[#9333EA] font-semibold mb-3">PUSA President</p>
              <p className="text-sm text-gray-600 leading-relaxed">Ex-Official</p>
            </div>

            {/* Subcommittee Chairperson */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="w-24 h-24 bg-[#9333EA] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                MS
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Mathew Samuel</h3>
              <p className="text-[#9333EA] font-semibold mb-3">Chairperson of Subcommittees</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Leads and coordinates various subcommittees within the association.
              </p>
            </div>

            {/* Ex-Officials */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="w-24 h-24 bg-[#0EA5E9] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                CW
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Charity Wabungu</h3>
              <p className="text-[#9333EA] font-semibold mb-3">Ex-Official</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="w-24 h-24 bg-[#10B981] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                A
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Abigael</h3>
              <p className="text-[#9333EA] font-semibold mb-3">Ex-Official</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="w-24 h-24 bg-[#9333EA] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                J
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Jackline</h3>
              <p className="text-[#9333EA] font-semibold mb-3">Ex-Official</p>
            </div>
          </div>

          {/* Constitution Link */}
          <div className="text-center">
            <a
              href="/constitution.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#9333EA] text-white rounded-lg hover:bg-[#7c2bbf] transition-colors font-semibold text-lg shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Alumni Constitution
            </a>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The PUEA Alumni Association provides comprehensive support and opportunities for our graduates
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border-2 border-purple-100 hover:border-[#9333EA] transition-colors">
              <Users className="w-12 h-12 text-[#9333EA] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Networking Events</h3>
              <p className="text-gray-600">
                Regular gatherings, reunions, and professional networking opportunities to connect
                alumni across generations and industries.
              </p>
            </div>

            <div className="p-6 rounded-xl border-2 border-purple-100 hover:border-[#9333EA] transition-colors">
              <Target className="w-12 h-12 text-[#9333EA] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Career Development</h3>
              <p className="text-gray-600">
                Job portal, mentorship programs, and career workshops to support professional growth
                and advancement.
              </p>
            </div>

            <div className="p-6 rounded-xl border-2 border-purple-100 hover:border-[#9333EA] transition-colors">
              <Award className="w-12 h-12 text-[#9333EA] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Recognition Programs</h3>
              <p className="text-gray-600">
                Alumni spotlight and awards to celebrate outstanding achievements and contributions
                to society.
              </p>
            </div>

            <div className="p-6 rounded-xl border-2 border-purple-100 hover:border-[#9333EA] transition-colors">
              <Users className="w-12 h-12 text-[#9333EA] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mentorship</h3>
              <p className="text-gray-600">
                Connecting experienced alumni with current students and recent graduates for guidance
                and support.
              </p>
            </div>

            <div className="p-6 rounded-xl border-2 border-purple-100 hover:border-[#9333EA] transition-colors">
              <Target className="w-12 h-12 text-[#9333EA] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Service</h3>
              <p className="text-gray-600">
                Organizing volunteer initiatives and giving back to the university and local
                communities.
              </p>
            </div>

            <div className="p-6 rounded-xl border-2 border-purple-100 hover:border-[#9333EA] transition-colors">
              <Award className="w-12 h-12 text-[#9333EA] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Scholarships</h3>
              <p className="text-gray-600">
                Providing financial support to deserving students through alumni-funded scholarship
                programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 px-4 bg-[#9333EA] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl opacity-90 mb-8">
            Be part of a network of over 50,000 alumni making a difference worldwide
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/register"
              className="px-8 py-3 bg-white text-[#9333EA] rounded-lg hover:bg-gray-100 transition-colors font-semibold"
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
