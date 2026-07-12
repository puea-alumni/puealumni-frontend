import { Link } from "react-router";
import { Users, Briefcase, Calendar, Globe, Award, Quote, MapPin, Clock, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import bgPuea from "../../imports/BG__PUEA.jpeg";
import alumni3 from "../../imports/alumni_3.jpg";
import alumni4 from "../../imports/alumni_4.jpg";
import { useApi } from "../lib/hooks";
import { endpoints } from "../lib/api";
import type { Event } from "./EventsPage";

// ─── Stats & feature data (static — UI labels only, values come from API) ───
const FEATURES = [
  { icon: Users, title: "Connect with Alumni", description: "Build meaningful relationships with fellow graduates from around the world" },
  { icon: Briefcase, title: "Career Opportunities", description: "Access exclusive job postings and career resources from our network" },
  { icon: Calendar, title: "Events & Networking", description: "Attend reunions, workshops, and networking events throughout the year" },
];

const STAT_LABELS = [
  { label: "Alumni Members", icon: Users },
  { label: "Job Postings", icon: Briefcase },
  { label: "Events Annually", icon: Calendar },
  { label: "Countries", icon: Globe },
];

// ─── Upcoming Events card ────────────────────────────────────────────────────
const SHADE_CYCLE = ["#03045e", "#0077b6", "#0096c7", "#00b4d8", "#48cae4"];

function EventCard({ event, index }: { event: Event; index: number }) {
  const shade = SHADE_CYCLE[index % SHADE_CYCLE.length];
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col">
      <div className="h-3 w-full" style={{ backgroundColor: shade }} />
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-bold text-base mb-3 leading-snug" style={{ color: "#03045e" }}>{event.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{event.description}</p>
        <div className="space-y-1.5 mb-5">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" style={{ color: shade }} />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: shade }} />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: shade }} />
            <span>{event.location}</span>
          </div>
        </div>
        <Link
          to="/events"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: shade }}
        >
          Register <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="h-3 w-full bg-gray-200" />
      <div className="p-6 space-y-3 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
        <div className="space-y-2 pt-2">
          <div className="h-3 bg-gray-100 rounded w-1/2" />
          <div className="h-3 bg-gray-100 rounded w-2/5" />
          <div className="h-3 bg-gray-100 rounded w-3/5" />
        </div>
        <div className="h-10 bg-gray-200 rounded-xl mt-2" />
      </div>
    </div>
  );
}

export function HomePage() {
  const [imgIndex, setImgIndex] = useState(0);
  const heroImages = [alumni3, alumni4, bgPuea];

  useEffect(() => {
    const t = setInterval(() => setImgIndex((i) => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Upcoming events — API-ready
  const { data: events, loading: eventsLoading } = useApi<Event[]>(endpoints.events.list());
  const upcomingEvents = events ? events.slice(0, 4) : [];

  return (
    <div className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative text-white py-24 px-4 overflow-hidden min-h-[600px] flex items-center">
        {heroImages.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === imgIndex ? "opacity-100" : "opacity-0"}`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ backgroundColor: "#03045e", opacity: 0.55 }} />
          </div>
        ))}
        <div className="max-w-7xl mx-auto relative z-10 w-full px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to PUEA Alumni Network
            </h1>
            <p className="text-xl md:text-2xl mb-10 leading-relaxed" style={{ color: "#90e0ef" }}>
              Join our thriving community of Presbyterian University alumni. Network, grow your career, and stay connected with your alma mater.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/login" className="px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all hover:opacity-90" style={{ backgroundColor: "#90e0ef", color: "#03045e" }}>
                Join Now
              </Link>
              <Link to="/alumni" className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all font-semibold text-lg">
                Explore Alumni
              </Link>
            </div>
          </div>
        </div>
        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setImgIndex(i)}
              className="w-2 h-2 rounded-full transition-all"
              style={{ backgroundColor: i === imgIndex ? "#90e0ef" : "rgba(255,255,255,0.4)" }}
            />
          ))}
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="py-12 border-b" style={{ backgroundColor: "#90e0ef" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STAT_LABELS.map(({ label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#03045e" }}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                {/* Value will come from API — show placeholder until loaded */}
                <div className="text-3xl font-bold mb-1" style={{ color: "#03045e" }}>—</div>
                <div className="text-sm font-medium" style={{ color: "#0077b6" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#03045e" }}>Everything You Need to Stay Connected</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#0077b6" }}>
              Our platform provides all the tools you need to network, advance your career, and give back to your community.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-8 rounded-2xl border-2 transition-all hover:shadow-lg" style={{ borderColor: "#90e0ef" }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: "#90e0ef" }}>
                  <Icon className="w-7 h-7" style={{ color: "#03045e" }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "#03045e" }}>{title}</h3>
                <p className="leading-relaxed" style={{ color: "#0077b6" }}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Alumni Are Saying ────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: "#f0f4f8" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-3" style={{ color: "#03045e" }}>What Alumni Are Saying</h2>
            <p className="text-lg" style={{ color: "#0077b6" }}>Hear from our vibrant community of graduates</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 — Abigail Arusa */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border flex flex-col" style={{ borderColor: "#ade8f4" }}>
              {/* Opening quote accent */}
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 flex-shrink-0" style={{ backgroundColor: "#90e0ef" }}>
                <Quote className="w-5 h-5" style={{ color: "#03045e" }} />
              </div>

              <blockquote className="text-gray-600 leading-relaxed italic flex-1 mb-8 text-sm md:text-base">
                "I am grateful for the opportunity to be part of the alumni community. Being a member of the alumni network allows me to stay connected, continue learning, and build meaningful professional relationships."
              </blockquote>

              <div className="pt-5 border-t" style={{ borderColor: "#f0f4f8" }}>
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0"
                    style={{ backgroundColor: "#0077b6" }}
                  >
                    AA
                  </div>
                  <div>
                    <p className="font-bold" style={{ color: "#03045e" }}>Abigail Arusa</p>
                    <p className="text-xs mt-0.5" style={{ color: "#0077b6" }}>
                      SAP Certified Consultant
                    </p>
                    <div className="flex flex-wrap gap-x-3 mt-1.5">
                      <span className="text-xs text-gray-400">B.Sc. Computer Science</span>
                      <span className="text-xs text-gray-400">Class of 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 — Mathew K. Samuel */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border flex flex-col" style={{ borderColor: "#ade8f4" }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 flex-shrink-0" style={{ backgroundColor: "#90e0ef" }}>
                <Quote className="w-5 h-5" style={{ color: "#03045e" }} />
              </div>

              <blockquote className="text-gray-600 leading-relaxed italic flex-1 mb-8 text-sm md:text-base">
                "Being connected through PUAA gives me a sense of close family connection with my peers, valuable social capital, strategic networking opportunities, and the ability to continue advancing whenever possible. This is more than an individual effort to make the Alumni an association — it is a safe space to nurture one another as we pursue personal development while also working together to elevate our University to even higher standards."
              </blockquote>

              <div className="pt-5 border-t" style={{ borderColor: "#f0f4f8" }}>
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0"
                    style={{ backgroundColor: "#03045e" }}
                  >
                    MS
                  </div>
                  <div>
                    <p className="font-bold" style={{ color: "#03045e" }}>Mathew K. Samuel</p>
                    <p className="text-xs mt-0.5" style={{ color: "#0077b6" }}>
                      Diplomatic Liaison Officer, Bandung Africa Organization
                    </p>
                    <div className="flex flex-wrap gap-x-3 mt-1.5">
                      <span className="text-xs text-gray-400">BBA — Accounting & Public Finance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ──────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: "#f0f4f8" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2 className="text-4xl font-bold mb-2" style={{ color: "#03045e" }}>Upcoming Events</h2>
              <p className="text-lg" style={{ color: "#0077b6" }}>Don't miss out — register your spot today</p>
            </div>
            <Link
              to="/events"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#0077b6" }}
            >
              View All Events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {eventsLoading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((n) => <EventCardSkeleton key={n} />)}
            </div>
          )}

          {!eventsLoading && upcomingEvents.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border" style={{ borderColor: "#ade8f4" }}>
              <Calendar className="w-12 h-12 mx-auto mb-4" style={{ color: "#ade8f4" }} />
              <p className="font-semibold" style={{ color: "#03045e" }}>No upcoming events</p>
              <p className="text-sm text-gray-500 mt-1">Events will appear here once published.</p>
            </div>
          )}

          {!eventsLoading && upcomingEvents.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingEvents.map((ev, i) => <EventCard key={ev.id} event={ev} index={i} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative py-28 px-4 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgPuea} alt="PUEA Campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ backgroundColor: "#03045e", opacity: 0.72 }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="w-18 h-18 rounded-2xl flex items-center justify-center mx-auto mb-8" style={{ backgroundColor: "#90e0ef", width: "72px", height: "72px" }}>
            <Award className="w-9 h-9" style={{ color: "#03045e" }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">Ready to Join Our Community?</h2>
          <p className="text-xl opacity-90 mb-10 leading-relaxed" style={{ color: "#90e0ef" }}>
            Create your profile today and start connecting with thousands of alumni worldwide.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/login" className="px-10 py-4 rounded-xl font-semibold text-lg shadow-xl transition-all hover:opacity-90" style={{ backgroundColor: "#90e0ef", color: "#03045e" }}>
              Get Started
            </Link>
            <Link to="/contact" className="px-10 py-4 rounded-xl font-semibold text-lg border-2 border-white text-white hover:bg-white/10 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
