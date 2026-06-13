import { Award, TrendingUp } from "lucide-react";

export function SpotlightPage() {
  const spotlights = [
    {
      id: 1,
      name: "Dr. Mary Wanjiku",
      title: "Medical Researcher",
      achievement: "Breakthrough in Malaria Treatment",
      description: "Dr. Wanjiku's groundbreaking research on malaria treatment has been published in the prestigious Journal of Tropical Medicine, offering new hope for millions.",
      year: 2015,
      image: "MW",
    },
    {
      id: 2,
      name: "Peter Odhiambo",
      title: "Tech Entrepreneur",
      achievement: "Founded FinTech Startup Raising $5M",
      description: "Peter's innovative mobile payment solution has revolutionized digital transactions in East Africa, recently securing Series A funding.",
      year: 2018,
      image: "PO",
    },
    {
      id: 3,
      name: "Faith Njeri",
      title: "Environmental Activist",
      achievement: "UN Environmental Award Winner",
      description: "Faith's work in sustainable farming practices has earned international recognition and is transforming agricultural communities across Kenya.",
      year: 2017,
      image: "FN",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Alumni Spotlight</h1>
          <p className="text-xl text-gray-600">Celebrating the achievements of our distinguished alumni</p>
        </div>

        <div className="space-y-8">
          {spotlights.map((spotlight) => (
            <div key={spotlight.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-64 bg-[#9333EA] flex items-center justify-center p-8">
                  <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-[#9333EA]">
                    {spotlight.image}
                  </div>
                </div>
                <div className="flex-1 p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">{spotlight.name}</h2>
                      <p className="text-lg text-gray-600 mb-2">{spotlight.title}</p>
                      <p className="text-sm text-gray-500">Class of {spotlight.year}</p>
                    </div>
                    <Award className="w-8 h-8 text-[#9333EA]" />
                  </div>
                  <div className="mb-4">
                    <div className="inline-block px-4 py-2 bg-purple-50 rounded-lg">
                      <p className="text-[#9333EA] font-semibold flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        {spotlight.achievement}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{spotlight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
