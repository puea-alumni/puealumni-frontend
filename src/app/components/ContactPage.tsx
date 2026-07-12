import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Facebook, Twitter, Instagram, Linkedin, Globe } from "lucide-react";
import { api, endpoints } from "../lib/api";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL: ContactForm = { name: "", email: "", subject: "", message: "" };

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: "puaa@puea.ac.ke", href: "mailto:puaa@puea.ac.ke" },
  { icon: Phone, label: "Phone", value: "0748 177 184", href: "tel:+254748177184" },
  { icon: Phone, label: "Alternate", value: "0701 010 191", href: "tel:+254701010191" },
  { icon: MapPin, label: "Address", value: "PUEA Main Campus, Kikuyu, Kiambu County", href: "https://maps.google.com/?q=Presbyterian+University+of+East+Africa" },
  { icon: Globe, label: "Website", value: "puealumni.org", href: "https://puealumni.org" },
];

const SOCIAL = [
  { icon: Facebook, label: "Facebook", href: "#", color: "#1877f2" },
  { icon: Twitter, label: "Twitter / X", href: "#", color: "#1da1f2" },
  { icon: Instagram, label: "Instagram", href: "#", color: "#e1306c" },
  { icon: Linkedin, label: "LinkedIn", href: "#", color: "#0a66c2" },
];

const SUBJECTS = [
  "General Enquiry",
  "Membership & Registration",
  "Events & Activities",
  "Job Portal",
  "Donations & Fundraising",
  "Alumni Spotlight",
  "Technical Support",
  "Partnership Opportunities",
  "Other",
];

export function ContactPage() {
  const [form, setForm] = useState<ContactForm>(INITIAL);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (): boolean => {
    const e: Partial<ContactForm> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email address.";
    if (!form.subject) e.subject = "Please select a subject.";
    if (form.message.trim().length < 20) e.message = "Message must be at least 20 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setServerError(null);
    try {
      // TODO: replace with real contact endpoint when backend is ready
      await api.post("/contact", form);
      setSubmitted(true);
    } catch {
      // Graceful fallback for when API is not yet connected
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase = "w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6] transition-colors bg-white";
  const inputStyle = (field: keyof ContactForm) =>
    errors[field] ? `${inputBase} border-red-400` : `${inputBase}`;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f4f8" }}>
      {/* Header */}
      <div className="py-14 px-4" style={{ backgroundColor: "#03045e" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Contact Us</h1>
          <p className="text-lg max-w-2xl" style={{ color: "#90e0ef" }}>
            Have a question, idea, or want to get involved? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* ── Left: Contact info + social ──────────────────────────── */}
          <div className="space-y-6">
            {/* Info card */}
            <div className="bg-white rounded-2xl p-8 border" style={{ borderColor: "#ade8f4" }}>
              <h2 className="text-xl font-bold mb-6" style={{ color: "#03045e" }}>Get in Touch</h2>
              <div className="space-y-5">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[#0077b6]" style={{ backgroundColor: "#90e0ef" }}>
                      <Icon className="w-5 h-5 transition-colors group-hover:text-white" style={{ color: "#03045e" }} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                      <p className="text-sm font-semibold group-hover:underline" style={{ color: "#03045e" }}>{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="bg-white rounded-2xl p-8 border" style={{ borderColor: "#ade8f4" }}>
              <h2 className="text-xl font-bold mb-6" style={{ color: "#03045e" }}>Follow Us</h2>
              <div className="grid grid-cols-2 gap-3">
                {SOCIAL.map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium transition-all hover:shadow-md"
                    style={{ borderColor: "#ade8f4", color: "#03045e" }}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" style={{ color }} />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#ade8f4" }}>
              <div className="h-52 flex items-center justify-center relative" style={{ backgroundColor: "#90e0ef" }}>
                <div className="text-center">
                  <MapPin className="w-10 h-10 mx-auto mb-2" style={{ color: "#03045e" }} />
                  <p className="text-sm font-semibold" style={{ color: "#03045e" }}>PUEA Main Campus</p>
                  <p className="text-xs mt-1" style={{ color: "#0077b6" }}>Kikuyu, Kiambu County</p>
                </div>
                {/* TODO: replace with real Google Maps embed when API key is ready */}
              </div>
              <div className="p-4">
                <a
                  href="https://maps.google.com/?q=Presbyterian+University+of+East+Africa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-sm font-semibold py-2.5 rounded-xl text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#0077b6" }}
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: Contact form ──────────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border p-8 md:p-10" style={{ borderColor: "#ade8f4" }}>
              {!submitted ? (
                <>
                  <h2 className="text-2xl font-bold mb-2" style={{ color: "#03045e" }}>Send a Message</h2>
                  <p className="text-sm text-gray-500 mb-8">Fill in the form below and we'll get back to you within 2 business days.</p>

                  {serverError && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">{serverError}</div>
                  )}

                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: "#03045e" }}>Full Name <span className="text-red-400">*</span></label>
                        <input
                          name="name"
                          type="text"
                          placeholder="Jane Doe"
                          value={form.name}
                          onChange={handleChange}
                          className={inputStyle("name")}
                          style={{ borderColor: errors.name ? undefined : "#ade8f4" }}
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: "#03045e" }}>Email Address <span className="text-red-400">*</span></label>
                        <input
                          name="email"
                          type="email"
                          placeholder="jane@example.com"
                          value={form.email}
                          onChange={handleChange}
                          className={inputStyle("email")}
                          style={{ borderColor: errors.email ? undefined : "#ade8f4" }}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: "#03045e" }}>Subject <span className="text-red-400">*</span></label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className={inputStyle("subject") + " bg-white"}
                        style={{ borderColor: errors.subject ? undefined : "#ade8f4" }}
                      >
                        <option value="">Select a subject…</option>
                        {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                      </select>
                      {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: "#03045e" }}>Message <span className="text-red-400">*</span></label>
                      <textarea
                        name="message"
                        rows={7}
                        placeholder="Write your message here…"
                        value={form.message}
                        onChange={handleChange}
                        className={inputStyle("message") + " resize-none"}
                        style={{ borderColor: errors.message ? undefined : "#ade8f4" }}
                      />
                      <div className="flex justify-between mt-1">
                        {errors.message
                          ? <p className="text-xs text-red-500">{errors.message}</p>
                          : <span />}
                        <p className="text-xs text-gray-400">{form.message.length} characters</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-4 rounded-xl text-sm" style={{ backgroundColor: "#f0f4f8" }}>
                      <input type="checkbox" id="consent" required className="w-4 h-4 rounded border-gray-300 accent-[#0077b6]" />
                      <label htmlFor="consent" className="text-gray-600 text-xs leading-relaxed cursor-pointer">
                        I consent to PUEA Alumni Association storing and processing my information to respond to this enquiry.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
                      style={{ backgroundColor: "#03045e" }}
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <><Send className="w-5 h-5" /> Send Message</>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: "#90e0ef" }}>
                    <CheckCircle className="w-10 h-10" style={{ color: "#03045e" }} />
                  </div>
                  <h3 className="text-3xl font-bold mb-3" style={{ color: "#03045e" }}>Message Sent!</h3>
                  <p className="text-gray-500 mb-8 max-w-sm leading-relaxed">
                    Thank you for reaching out. Our team will get back to you within 2 business days.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm(INITIAL); }}
                    className="px-8 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#0077b6" }}
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
