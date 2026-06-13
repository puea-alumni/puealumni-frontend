import { useState } from "react";
import { Calendar, MapPin, Users, Clock, DollarSign, CreditCard, CheckCircle } from "lucide-react";

const mockEvents = [
  {
    id: 1,
    title: "Annual Alumni Reunion 2026",
    date: "June 15, 2026",
    time: "6:00 PM - 11:00 PM",
    location: "Grand Ballroom, University Campus",
    attendees: 234,
    price: 75,
    description: "Join us for our biggest reunion event of the year with dinner, entertainment, and networking.",
    image: "🎉",
  },
  {
    id: 2,
    title: "Tech Career Workshop",
    date: "May 30, 2026",
    time: "2:00 PM - 5:00 PM",
    location: "Innovation Center, Building A",
    attendees: 89,
    price: 25,
    description: "Learn about the latest trends in tech careers and network with industry leaders.",
    image: "💼",
  },
  {
    id: 3,
    title: "Homecoming Weekend",
    date: "October 10-12, 2026",
    time: "All Weekend",
    location: "University Campus",
    attendees: 567,
    price: 150,
    description: "Three days of festivities, games, and celebrations. Includes meals and activities.",
    image: "🏈",
  },
  {
    id: 4,
    title: "Networking Mixer",
    date: "July 20, 2026",
    time: "7:00 PM - 10:00 PM",
    location: "Downtown Convention Center",
    attendees: 156,
    price: 35,
    description: "Casual networking event with drinks and hors d'oeuvres.",
    image: "🤝",
  },
];

export function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handleRegister = (eventId: number) => {
    setSelectedEvent(eventId);
    setShowPayment(true);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentComplete(true);
    setTimeout(() => {
      setShowPayment(false);
      setPaymentComplete(false);
      setSelectedEvent(null);
    }, 3000);
  };

  const selectedEventData = mockEvents.find((e) => e.id === selectedEvent);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
          <p className="text-xl text-gray-600">Connect with fellow alumni at exclusive events</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {mockEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="bg-[#9333EA] text-white p-6 flex items-center justify-center text-6xl">
                {event.image}
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-5 h-5 text-[#9333EA]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-5 h-5 text-[#9333EA]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-5 h-5 text-[#9333EA]" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users className="w-5 h-5 text-[#9333EA]" />
                    <span>{event.attendees} attending</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <DollarSign className="w-5 h-5 text-[#9333EA]" />
                    <span className="text-2xl font-bold text-[#9333EA]">${event.price}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleRegister(event.id)}
                  className="w-full py-3 px-4 bg-[#9333EA] text-white rounded-lg hover:bg-[#7c2bbf] transition-colors font-semibold"
                >
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPayment && selectedEventData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
            {!paymentComplete ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Registration</h2>
                <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">{selectedEventData.title}</h3>
                  <p className="text-sm text-gray-600">{selectedEventData.date}</p>
                  <p className="text-2xl font-bold text-[#9333EA] mt-2">${selectedEventData.price}</p>
                </div>

                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9333EA] focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        maxLength={19}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9333EA] focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9333EA] focus:border-transparent"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        required
                        maxLength={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9333EA] focus:border-transparent"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowPayment(false)}
                      className="flex-1 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 px-4 bg-[#9333EA] text-white rounded-lg hover:bg-[#7c2bbf] transition-colors font-semibold"
                    >
                      Pay ${selectedEventData.price}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Complete!</h3>
                <p className="text-gray-600">
                  Your ticket for {selectedEventData.title} has been confirmed.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
