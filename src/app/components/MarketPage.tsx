import { Tag, MapPin, Phone, Mail } from "lucide-react";

export function MarketPage() {
  const listings = [
    {
      id: 1,
      title: "Laptop - MacBook Pro 14\" M1",
      category: "Electronics",
      price: "KES 120,000",
      seller: "James Omondi",
      contact: "0712345678",
      email: "james@example.com",
      location: "Nairobi",
      description: "Gently used MacBook Pro, excellent condition. Includes original charger and box.",
      image: "💻",
    },
    {
      id: 2,
      title: "Business Consultancy Services",
      category: "Services",
      price: "Negotiable",
      seller: "Sarah Njeri",
      contact: "0723456789",
      email: "sarah@example.com",
      location: "Remote",
      description: "Offering business strategy and financial consultancy for startups and SMEs.",
      image: "📊",
    },
    {
      id: 3,
      title: "2-Bedroom Apartment for Rent",
      category: "Real Estate",
      price: "KES 35,000/month",
      seller: "Peter Kimani",
      contact: "0734567890",
      email: "peter@example.com",
      location: "Kikuyu",
      description: "Modern apartment near PUEA campus. Secure, with parking and amenities.",
      image: "🏠",
    },
    {
      id: 4,
      title: "Web Development Services",
      category: "Services",
      price: "Starting KES 50,000",
      seller: "Grace Wambui",
      contact: "0745678901",
      email: "grace@example.com",
      location: "Remote",
      description: "Full-stack web development for businesses. Portfolio available upon request.",
      image: "🌐",
    },
    {
      id: 5,
      title: "Toyota Fielder 2015",
      category: "Vehicles",
      price: "KES 950,000",
      seller: "David Mutua",
      contact: "0756789012",
      email: "david@example.com",
      location: "Kiambu",
      description: "Well maintained, low mileage. Full service history. Ready for inspection.",
      image: "🚗",
    },
    {
      id: 6,
      title: "Graphic Design & Branding",
      category: "Services",
      price: "From KES 10,000",
      seller: "Lucy Akinyi",
      contact: "0767890123",
      email: "lucy@example.com",
      location: "Remote",
      description: "Professional logo design, branding, and marketing materials for your business.",
      image: "🎨",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Alumni Marketplace</h1>
          <p className="text-xl text-gray-600">Buy, sell, or trade with fellow PUEA alumni</p>
        </div>

        <div className="mb-6">
          <button className="px-6 py-3 bg-[#9333EA] text-white rounded-lg hover:bg-[#7c2bbf] transition-colors font-semibold">
            + Post a Listing
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-[#9333EA] text-white p-8 flex items-center justify-center text-5xl">
                {listing.image}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-purple-100 text-[#9333EA] rounded-full text-xs font-medium">
                    {listing.category}
                  </span>
                  <Tag className="w-4 h-4 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{listing.title}</h3>
                <p className="text-2xl font-bold text-[#9333EA] mb-3">{listing.price}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{listing.description}</p>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-8 h-8 bg-[#9333EA] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {listing.seller.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span className="font-medium">{listing.seller}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{listing.location}</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <a
                    href={`tel:${listing.contact}`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </a>
                  <a
                    href={`mailto:${listing.email}`}
                    className="flex-1 px-4 py-2 bg-[#9333EA] text-white rounded-lg hover:bg-[#7c2bbf] transition-colors text-center text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
