import { ImageWithFallback } from './figma/ImageWithFallback';

export function FeatureGrid() {
  const features = [
    { 
      icon: "🌾", 
      title: "Crop Guide", 
      description: "Expert cultivation tips",
      image: "https://images.unsplash.com/photo-1721594489316-14f1cfff9566?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGdyYWluJTIwaGFydmVzdCUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc1NzA4MTU3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    { 
      icon: "💧", 
      title: "Irrigation Planner", 
      description: "Smart water management",
      image: "https://images.unsplash.com/photo-1722108499258-bbd299116c43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwZmllbGQlMjBmYXJtaW5nJTIwYXNpYW4lMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NTcwODE1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    { 
      icon: "🚜", 
      title: "Marketplace", 
      description: "Buy & sell crops",
      image: "https://images.unsplash.com/photo-1566701802598-b3e76bc465ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXQlMjBhZ3JpY3VsdHVyZSUyMGZhcm1lciUyMHNlbGxpbmclMjBwcm9kdWNlfGVufDF8fHx8MTc1NzA4MTU3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    { 
      icon: "📰", 
      title: "News Summaries", 
      description: "Latest agriculture news",
      image: "https://images.unsplash.com/photo-1715199281915-2131a7f4f211?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGZhcm1pbmclMjB0ZWNobm9sb2d5JTIwZHJvbmUlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NTcwODE1NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    { 
      icon: "🧑‍🌾", 
      title: "Disease Detection", 
      description: "AI-powered diagnosis",
      image: "https://images.unsplash.com/photo-1595012255680-0a044900356a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwZmllbGQlMjBnb2xkZW4lMjBoYXJ2ZXN0fGVufDF8fHx8MTc1NzA4MTU3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    { 
      icon: "📈", 
      title: "Analytics", 
      description: "Farm performance insights",
      image: "https://images.unsplash.com/photo-1755245291656-34f9a96bee38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWF0aGVyJTIwbW9uaXRvcmluZyUyMGFncmljdWx0dXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTcwODE1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    { 
      icon: "⚠️", 
      title: "Alerts", 
      description: "Weather & pest warnings",
      image: "https://images.unsplash.com/photo-1754976645304-b27b44ddb9f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXJtaW5nJTIwbGFuZHNjYXBlJTIwZ3JlZW4lMjBmaWVsZHN8ZW58MXx8fHwxNzU3MDgxNTc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    { 
      icon: "📞", 
      title: "Connect Experts", 
      description: "24/7 expert support",
      image: "https://images.unsplash.com/photo-1708794666324-85ad91989d20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtaW5nJTIwZXhwZXJ0JTIwYWdyaWN1bHR1cmUlMjBjb25zdWx0YXRpb258ZW58MXx8fHwxNzU3MDgxNTc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-white mb-6 text-center">Farm Management Tools</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 dark:from-slate-800/30 dark:to-slate-900/20 rounded-xl overflow-hidden border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <ImageWithFallback
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-6 h-full flex flex-col justify-end">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                {feature.icon}
              </div>
              <h4 className="text-white mb-2 group-hover:text-blue-300 transition-colors drop-shadow-md">
                {feature.title}
              </h4>
              <p className="text-white/90 text-sm leading-relaxed drop-shadow-md">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}