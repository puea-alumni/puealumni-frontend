import { useState } from "react";
import { Calendar, MapPin, Users, Clock, CreditCard, CheckCircle, X, CalendarOff } from "lucide-react";
import { useApi } from "../lib/hooks";
import { endpoints } from "../lib/api";
import { GridSkeleton } from "./ui/Skeleton";
import { ErrorState } from "./ui/ErrorState";
import { EmptyState } from "./ui/EmptyState";

export interface Event {
  id: number | string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  price: number;
  currency?: string;
  description: string;
  imageUrl?: string;
  status?: "upcoming" | "past" | "cancelled";
}

const SHADE_CYCLE = ["#03045e", "#0077b6", "#0096c7", "#00b4d8"];

function PaymentModal({ event, onClose }: { event: Event; onClose: () => void }) {
  const [complete, setComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const currency = event.currency ?? "KES";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: POST to endpoints.events.register(event.id) with form data
    setTimeout(() => { setSubmitting(false); setComplete(true); }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {!complete ? (
          <>
            <div className="flex items-center justify-between px-6 py-4" style={{ backgroundColor: "#03045e" }}>
              <h2 className="text-lg font-bold text-white">Complete Registration</h2>
              <button onClick={onClose} className="text-white/60 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              <div className="rounded-xl p-4 mb-5 border" style={{ backgroundColor: "#90e0ef", borderColor: "#ade8f4" }}>
                <h3 className="font-bold text-sm mb-1" style={{ color: "#03045e" }}>{event.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{event.date} · {event.time}</p>
                <p className="text-2xl font-bold" style={{ color: "#03045e" }}>{currency} {event.price.toLocaleString()}</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "#03045e" }}>Full Name</label>
                  <input name="fullName" type="text" required placeholder="John Doe" className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6]" style={{ borderColor: "#ade8f4" }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "#03045e" }}>Email</label>
                  <input name="email" type="email" required placeholder="you@example.com" className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6]" style={{ borderColor: "#ade8f4" }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "#03045e" }}>Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input name="cardNumber" type="text" required maxLength={19} placeholder="1234 5678 9012 3456" className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6]" style={{ borderColor: "#ade8f4" }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: "#03045e" }}>Expiry</label>
                    <input name="expiry" type="text" required maxLength={5} placeholder="MM/YY" className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6]" style={{ borderColor: "#ade8f4" }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: "#03045e" }}>CVV</label>
                    <input name="cvv" type="text" required maxLength={4} placeholder="123" className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6]" style={{ borderColor: "#ade8f4" }} />
                  </div>
                </div>
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border text-sm font-semibold" style={{ borderColor: "#ade8f4", color: "#03045e" }}>Cancel</button>
                  <button type="submit" disabled={submitting} className="flex-1 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60" style={{ backgroundColor: "#03045e" }}>
                    {submitting ? "Processing…" : `Pay ${currency} ${event.price.toLocaleString()}`}
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="text-center py-12 px-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#90e0ef" }}>
              <CheckCircle className="w-9 h-9" style={{ color: "#03045e" }} />
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: "#03045e" }}>Registration Complete!</h3>
            <p className="text-gray-500 text-sm">Your ticket for <span className="font-semibold">{event.title}</span> has been confirmed. Check your email for details.</p>
            <button onClick={onClose} className="mt-6 px-6 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: "#0077b6" }}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

export function EventsPage() {
  const [selectedId, setSelectedId] = useState<number | string | null>(null);
  const { data, loading, error, retry } = useApi<Event[]>(endpoints.events.list());

  const selectedEvent = (data ?? []).find((e) => e.id === selectedId);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f4f8" }}>
      <div className="py-12 px-4" style={{ backgroundColor: "#03045e" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Upcoming Events</h1>
          <p className="text-lg" style={{ color: "#90e0ef" }}>Connect with fellow alumni at exclusive events</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {loading && <GridSkeleton cols={2} rows={2} />}
        {!loading && error && <ErrorState title="Could not load events" message={error} onRetry={retry} />}
        {!loading && !error && (!data || data.length === 0) && (
          <EmptyState icon={CalendarOff} title="No upcoming events" description="Events will appear here once they are published by the admin." />
        )}

        {!loading && !error && data && data.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-6">
            {data.map((event, i) => {
              const shade = SHADE_CYCLE[i % SHADE_CYCLE.length];
              return (
                <div key={event.id} className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-all" style={{ borderColor: "#ade8f4" }}>
                  <div className="flex items-center justify-between px-6 py-4" style={{ backgroundColor: shade }}>
                    {event.imageUrl
                      ? <img src={event.imageUrl} alt={event.title} className="h-12 w-12 rounded-lg object-cover" />
                      : <Calendar className="w-8 h-8 text-white/80" />}
                    <span className="text-xl font-bold text-white">{event.currency ?? "KES"} {event.price.toLocaleString()}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2" style={{ color: "#03045e" }}>{event.title}</h3>
                    <p className="text-sm text-gray-500 mb-5 leading-relaxed">{event.description}</p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {[
                        { Icon: Calendar, text: event.date },
                        { Icon: Clock, text: event.time },
                        { Icon: MapPin, text: event.location },
                        { Icon: Users, text: `${event.attendees.toLocaleString()} attending` },
                      ].map(({ Icon, text }) => (
                        <div key={text} className="flex items-start gap-2 text-sm">
                          <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#0077b6" }} />
                          <span className="text-gray-600 leading-tight">{text}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelectedId(event.id)}
                      className="w-full py-3 rounded-xl font-semibold text-white text-sm hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "#0077b6" }}
                    >
                      Register Now — {event.currency ?? "KES"} {event.price.toLocaleString()}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedEvent && <PaymentModal event={selectedEvent} onClose={() => setSelectedId(null)} />}
    </div>
  );
}
