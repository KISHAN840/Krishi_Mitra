import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Page } from "../Router";

interface SupportPageProps {
  onPageChange?: (page: Page) => void;
}

export function SupportPage({ onPageChange }: SupportPageProps) {
  const experts = [
    {
      name: "Dr. Rajesh Kumar",
      specialization: "Crop Disease Specialist",
      experience: "15 years",
      rating: 4.9,
      languages: ["Hindi", "English"],
      availability: "Online",
      image: "https://images.unsplash.com/photo-1710170909047-135c7a010e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhZ3JpY3VsdHVyZSUyMGV4cGVydCUyMG1hbGV8ZW58MXx8fHwxNzU3MDE2NDU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      phone: "+91-7399066889",
      whatsappNumber: "917399066889",
      consultationFee: "₹199",
      callRate: "₹15/min"
    },
    {
      name: "Dr. Priya Sharma",
      specialization: "Soil & Nutrition Expert",
      experience: "12 years", 
      rating: 4.8,
      languages: ["Hindi", "English", "Punjabi"],
      availability: "Available",
      image: "https://images.unsplash.com/photo-1708417152629-65db5c36a6d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjB3b21hbiUyMGFncmljdWx0dXJhbCUyMGV4cGVydHxlbnwxfHx8fDE3NTcwMTY0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      phone: "+91-9876543211",
      whatsappNumber: "919876543211",
      consultationFee: "₹199",
      callRate: "₹10/min"
    },
    {
      name: "Amit Singh",
      specialization: "Irrigation & Water Management",
      experience: "10 years",
      rating: 4.7,
      languages: ["Hindi", "English"],
      availability: "Busy",
      image: "https://images.unsplash.com/photo-1740477138822-906f6b845579?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjB3b21hbiUyMGFncmljdWx0dXJhbCUyMGV4cGVydHxlbnwxfHx8fDE3NTcwMTY0MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      phone: "+91-9876543212",
      whatsappNumber: "919876543212",
      consultationFee: "₹199",
      callRate: "₹15/min"
    }
  ];

  const faqs = [
    {
      question: "How do I identify wheat rust disease?",
      answer: "Look for orange-colored pustules on leaves and stems. Use our AI disease detection feature for accurate diagnosis.",
      category: "Disease Management"
    },
    {
      question: "What's the best time to irrigate crops?",
      answer: "Early morning (5-7 AM) or evening (6-8 PM) to minimize water loss due to evaporation.",
      category: "Irrigation"
    },
    {
      question: "How to improve soil fertility naturally?",
      answer: "Use organic compost, practice crop rotation, and apply bio-fertilizers. Regular soil testing is recommended.",
      category: "Soil Health"
    },
    {
      question: "When should I sell my crops for best prices?",
      answer: "Monitor market trends in our Market section. Generally, sell when demand is high and supply is low.",
      category: "Market"
    },
    {
      question: "My crops are not germinating properly, what should I do?",
      answer: "Check seed quality, soil moisture (should be 50-60%), soil temperature (15-25°C), and sowing depth. Poor germination often results from old seeds or improper soil conditions.",
      category: "Seed & Sowing"
    },
    {
      question: "How much fertilizer should I apply per acre?",
      answer: "For wheat: 120kg N + 60kg P + 40kg K per hectare. For rice: 100kg N + 50kg P + 50kg K. Always conduct soil tests first for precise recommendations.",
      category: "Fertilizer Management" 
    },
    {
      question: "What to do if crops are damaged by hailstorm?",
      answer: "Assess damage immediately. If <30% damage, apply fungicide to prevent diseases. If >70% damage, consider replanting. Document for insurance claims.",
      category: "Weather Damage"
    },
    {
      question: "How to get government subsidies for farming equipment?",
      answer: "Visit nearest Krishi Vigyan Kendra or Agriculture Office. Required documents: Aadhaar, land records, bank account details. Subsidy ranges from 25-50% of equipment cost.",
      category: "Government Schemes"
    }
  ];

  const commonFarmingProblems = [
    {
      problem: "Confused about which variety of wheat to plant",
      solutions: ["HD-2967 for timely sowing (Nov 10-25)", "PBW-343 for late sowing (Dec 1-15)", "DBW-88 for drought-prone areas"],
      urgency: "High",
      season: "Winter Season"
    },
    {
      problem: "Don't know when to harvest corn for maximum profit",
      solutions: ["Check moisture content - harvest at 18-20%", "Monitor market prices daily", "Consider weather forecast for next 7 days"],
      urgency: "Medium", 
      season: "Current Season"
    },
    {
      problem: "Uncertain about organic vs chemical fertilizer choice",
      solutions: ["Organic: Better soil health, premium prices, 3-year transition", "Chemical: Quick results, higher immediate yield", "Hybrid approach: 60% organic + 40% chemical"],
      urgency: "Medium",
      season: "Year Round"
    },
    {
      problem: "Struggling with water scarcity and irrigation scheduling",
      solutions: ["Install drip irrigation (50% water savings)", "Use mulching to retain moisture", "Practice alternate wetting and drying for rice"],
      urgency: "High",
      season: "Summer Season"
    }
  ];

  const communityPosts = [
    {
      author: "Farmer Suresh",
      location: "Meerut, UP",
      question: "Best organic fertilizer for wheat crops?",
      replies: 12,
      timeAgo: "2 hours ago",
      tags: ["Wheat", "Organic", "Fertilizer"],
      avatar: "https://images.unsplash.com/photo-1740477138822-906f6b845579?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBwb3J0cmFpdCUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc1NzAxNjQyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      author: "Farmer Geeta",
      location: "Ghaziabad, UP", 
      question: "Dealing with aphid infestation in mustard crops",
      replies: 8,
      timeAgo: "5 hours ago",
      tags: ["Mustard", "Pest Control", "Aphids"],
      avatar: "https://images.unsplash.com/photo-1708417152629-65db5c36a6d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjB3b21hbiUyMGFncmljdWx0dXJhbCUyMGV4cGVydHxlbnwxfHx8fDE3NTcwMTY0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      author: "Farmer Ravi",
      location: "Noida, UP",
      question: "Drip irrigation setup for small farms",
      replies: 15,
      timeAgo: "1 day ago",
      tags: ["Irrigation", "Technology", "Small Farm"],
      avatar: "https://images.unsplash.com/photo-1710170909047-135c7a010e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhZ3JpY3VsdHVyZSUyMGV4cGVydCUyMG1hbGV8ZW58MXx8fHwxNzU3MDE2NDU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const resources = [
    {
      title: "Seasonal Crop Calendar",
      description: "Complete guide for sowing and harvesting times",
      type: "PDF Guide",
      downloads: "2.3k",
      icon: "📅",
      url: "https://www.fao.org/3/i0100e/i0100e02.htm",
      fileSize: "2.5 MB",
      pages: "24 pages"
    },
    {
      title: "Pest Identification Manual",
      description: "Visual guide to identify common pests and diseases",
      type: "Interactive Guide", 
      downloads: "1.8k",
      icon: "🐛",
      url: "https://www.extension.iastate.edu/crops/pest-identification",
      fileSize: "Web-based",
      pages: "Interactive"
    },
    {
      title: "Soil Testing Kit Instructions",
      description: "How to test soil pH, nutrients, and moisture",
      type: "Video Tutorial",
      downloads: "1.5k",
      icon: "🧪",
      url: "https://www.youtube.com/playlist?list=PLrAXtmRdnEQvyRa7VIglrPINdCy7K5V8B",
      fileSize: "Video series",
      pages: "45 min"
    },
    {
      title: "Government Scheme Updates",
      description: "Latest farming subsidies and support programs",
      type: "News Update",
      downloads: "3.1k",
      icon: "🏛️",
      url: "https://www.india.gov.in/topics/agriculture",
      fileSize: "Web portal",
      pages: "Updated daily"
    }
  ];

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="relative py-12 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1708794666324-85ad91989d20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtaW5nJTIwZXhwZXJ0JTIwYWdyaWN1bHR1cmUlMjBjb25zdWx0YXRpb258ZW58MXx8fHwxNzU3MDgxNTc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-slate-800/70 to-green-900/80" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl text-purple-300 mb-4 drop-shadow-lg">Farmer Support Hub</h1>
          <p className="text-white/90 text-lg drop-shadow-md">Expert guidance, community support, and resources for successful farming</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Expert Consultation */}
        <section className="mb-12">
          <h2 className="text-white text-2xl mb-6">Connect with Agricultural Experts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {experts.map((expert, index) => (
              <div
                key={index}
                className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-[#9b59b6]/30 hover:border-[#9b59b6]/50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-center mb-4">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-[#9b59b6]/50">
                    <ImageWithFallback
                      src={expert.image}
                      alt={expert.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-white text-xl mb-1">{expert.name}</h3>
                  <p className="text-[#9b59b6]">{expert.specialization}</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-white/70">Experience:</span>
                    <span className="text-white">{expert.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Rating:</span>
                    <span className="text-[#f1c40f]">★ {expert.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Languages:</span>
                    <span className="text-white text-sm">{expert.languages.join(", ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      expert.availability === 'Available' ? 'bg-[#2ecc71]/20 text-[#2ecc71]' :
                      expert.availability === 'Online' ? 'bg-[#f1c40f]/20 text-[#f1c40f]' :
                      'bg-[#e74c3c]/20 text-[#e74c3c]'
                    }`}>
                      {expert.availability}
                    </span>
                  </div>
                </div>
                
                {/* Consultation Pricing */}
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm">Chat Consultation:</span>
                    <span className="text-[#2ecc71]">{expert.consultationFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm">Voice Call Rate:</span>
                    <span className="text-[#f1c40f]">{expert.callRate}</span>
                  </div>
                </div>

                {/* WhatsApp Options */}
                <div className="space-y-2">
                  <a
                    href={`https://wa.me/${expert.whatsappNumber}?text=Hi%20${expert.name.replace(' ', '%20')},%20I%20need%20agricultural%20consultation%20regarding%20${expert.specialization.toLowerCase()}.%20I%20would%20like%20to%20book%20a%20paid%20chat%20consultation%20for%20${expert.consultationFee}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-[#25d366] to-[#128c7e] hover:from-[#128c7e] hover:to-[#075e54] rounded-lg py-2 text-white transition-all flex items-center justify-center gap-2 group"
                  >
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                    </svg>
                    WhatsApp Chat - {expert.consultationFee}
                  </a>

                  <a
                    href={`tel:${expert.phone}`}
                    className="w-full bg-gradient-to-r from-[#3498db] to-[#2980b9] hover:from-[#2980b9] hover:to-[#1c598a] rounded-lg py-2 text-white transition-all flex items-center justify-center gap-2 group"
                  >
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Voice Call - {expert.callRate}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common Farmer Confusions */}
        <section className="mb-12">
          <h2 className="text-white text-2xl mb-6">Common Farmer Confusions & Clear Solutions</h2>
          <div className="space-y-6">
            {commonFarmingProblems.map((item, index) => (
              <div key={index} className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-[#e67e22]/30">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">😕</span>
                    <h3 className="text-white text-lg">{item.problem}</h3>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      item.urgency === 'High' ? 'bg-[#e74c3c]/20 text-[#e74c3c]' : 'bg-[#f1c40f]/20 text-[#f1c40f]'
                    }`}>
                      {item.urgency}
                    </span>
                    <span className="px-3 py-1 bg-[#3498db]/20 text-[#3498db] rounded-full text-xs">
                      {item.season}
                    </span>
                  </div>
                </div>
                <div className="ml-11">
                  <h4 className="text-[#2ecc71] mb-3">✅ Clear Solutions:</h4>
                  <ul className="space-y-2">
                    {item.solutions.map((solution, idx) => (
                      <li key={idx} className="text-white/80 text-sm flex items-start gap-2">
                        <span className="text-[#f1c40f] mt-1">•</span>
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-white text-2xl mb-6">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-[#2ecc71]/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-white pr-4">{faq.question}</h4>
                  <span className="px-3 py-1 bg-[#2ecc71]/20 text-[#2ecc71] rounded-full text-xs whitespace-nowrap">
                    {faq.category}
                  </span>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Community Forum */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-2xl">Community Forum</h2>
            <button className="bg-[#2ecc71] hover:bg-[#27ae60] px-4 py-2 rounded-lg text-black transition-all">
              Ask Question
            </button>
          </div>
          
          <div className="space-y-4">
            {communityPosts.map((post, index) => (
              <div
                key={index}
                className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#3498db]/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#3498db]/30 flex-shrink-0">
                      <ImageWithFallback
                        src={post.avatar}
                        alt={post.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">{post.question}</h4>
                      <div className="flex items-center space-x-4 text-sm text-white/70">
                        <span>👤 {post.author}</span>
                        <span>📍 {post.location}</span>
                        <span>💬 {post.replies} replies</span>
                        <span>🕒 {post.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-[#3498db]/20 text-[#3498db] rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resources & Downloads */}
        <section>
          <h2 className="text-white text-2xl mb-6">Resources & Guides</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="backdrop-blur-lg bg-gradient-to-br from-[#f1c40f]/20 to-[#e67e22]/20 rounded-xl p-6 border border-[#f1c40f]/30 hover:border-[#f1c40f]/50 transition-all duration-300 hover:scale-105 cursor-pointer group block relative"
                title={`Access ${resource.title} - ${resource.type}`}
              >
                <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">{resource.icon}</div>
                <h4 className="text-white mb-2 group-hover:text-yellow-200 transition-colors">{resource.title}</h4>
                <p className="text-white/70 text-sm mb-4 group-hover:text-white/80 transition-colors">{resource.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#f1c40f] text-sm group-hover:text-yellow-200 transition-colors">{resource.type}</span>
                    <span className="text-white/60 text-xs">📥 {resource.downloads}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50">{resource.fileSize}</span>
                    <span className="text-white/50">{resource.pages}</span>
                  </div>
                </div>
                
                {/* External link indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-[#f1c40f]/20 rounded-full p-1.5">
                    <svg className="w-3 h-3 text-[#f1c40f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-2 w-full mt-4 bg-[#f1c40f]/20 hover:bg-[#f1c40f]/30 rounded-lg py-2 text-[#f1c40f] transition-all group-hover:bg-[#f1c40f]/40 group-hover:text-yellow-200">
                  {resource.type === 'PDF Guide' ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download PDF
                    </>
                  ) : resource.type === 'Video Tutorial' ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4" />
                      </svg>
                      Watch Videos
                    </>
                  ) : resource.type === 'Interactive Guide' ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                      Launch Tool
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Visit Portal
                    </>
                  )}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="mt-12">
          <div className="backdrop-blur-lg bg-gradient-to-r from-[#e74c3c]/20 to-[#c0392b]/20 rounded-2xl p-8 border border-[#e74c3c]/30 text-center">
            <h3 className="text-[#e74c3c] text-2xl mb-4">🚨 Emergency Agricultural Helpline</h3>
            <p className="text-white/80 mb-6">24/7 support for urgent farming issues - Free emergency consultation</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <a 
                href="tel:18001801551" 
                className="flex items-center space-x-2 bg-[#e74c3c]/20 hover:bg-[#e74c3c]/30 rounded-lg px-6 py-3 transition-all hover:scale-105 group"
              >
                <span className="text-2xl group-hover:animate-pulse">📞</span>
                <span className="text-white text-xl group-hover:text-red-200">1800-180-1551</span>
              </a>
              <a 
                href="https://wa.me/919876543210?text=🚨%20EMERGENCY%20AGRICULTURAL%20HELP%20NEEDED%20🚨%0A%0AUrgent%20farming%20issue%20requiring%20immediate%20assistance.%20Please%20help!" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-[#25d366]/20 hover:bg-[#25d366]/30 rounded-lg px-6 py-3 transition-all hover:scale-105 group"
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                </svg>
                <span className="text-white group-hover:text-green-200">Emergency WhatsApp</span>
              </a>
            </div>
            <p className="text-white/60 text-sm mt-4">
              Tap to instantly connect with our emergency agricultural support team
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
