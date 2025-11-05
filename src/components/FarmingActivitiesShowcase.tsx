import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

export function FarmingActivitiesShowcase() {
  const { t } = useLanguage();
  const farmingActivities = [
    {
      activity: "Terrace gardening",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.hBSlOWnZ_oS8t6QGgiB-9AHaE8?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3",
      description: "Preparing soil for kitchen gardening",
      farmer: "Practical knowledge of kitchen, terrace gardening.",
      season: "Pre-sowing",
      difficulty: "Modern",
      link: "https://youtu.be/PlDILbVXanE?si=fV24tGnNXz7EnAXd",
      linkDescription:
        "Learn about modern kitchen farming methods",
    },
    {
      activity: "Field Monitoring",
      image:
        "https://images.unsplash.com/photo-1567471945805-069e09c11098?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXJzJTIwd29ya2luZyUyMGZpZWxkJTIwYWN0aXZpdGllc3xlbnwxfHx8fDE3NTcwMTcyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Daily crop health inspection",
      farmer: "Checking for pest and disease",
      season: "Growing Season",
      difficulty: "Essential",
      link: "https://youtu.be/c_WKqyJa4AU?si=3pCANrl-iw3jgKtK",
      linkDescription: "Crop monitoring and scouting guide",
    },
    {
      activity: "Harvest Operations",
      image:
        "https://images.unsplash.com/photo-1655666614319-3918eba90451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGhhcnZlc3RpbmclMjB0cmFjdG9yfGVufDF8fHx8MTc1NzAxNjQzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Mechanized wheat harvesting",
      farmer: "Using combine harvester",
      season: "Harvest Season",
      difficulty: "Advanced",
      link: "https://youtu.be/HVl5uDMJvRY?si=X2QfLPO7YmT6Me1V",
      linkDescription:
        "Modern harvesting equipment and techniques",
    },
    {
      activity: "Irrigation Management",
      image:
        "https://images.unsplash.com/photo-1689349483530-bb7a0734d9fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcnJpZ2F0aW9uJTIwZmFybWluZyUyMHdhdGVyfGVufDF8fHx8MTc1NzAxNjQzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Smart irrigation system",
      farmer: "Automated water distribution",
      season: "Year Round",
      difficulty: "Modern",
      link: "https://youtu.be/jDXGPw0VP6A?si=IZ9UEUorXp1RqmhR",
      linkDescription:
        "Smart irrigation solutions and technology",
    },
  ];

  const challengingScenarios = [
    {
      scenario: "Drought Management",
      challenge: "Water scarcity affecting crop growth",
      farmerReaction: "Implementing conservation techniques",
      solution: "Drip irrigation + mulching",
      impact: "60% water savings achieved",
      link: "https://www.youtube.com/live/GhH1jpOrVIg?si=8h4gnkHLvQSJhBhO",
      linkDescription: "FAO drought management strategies",
    },
    {
      scenario: "Pest Outbreak",
      challenge: "Sudden aphid infestation in wheat",
      farmerReaction: "Emergency pesticide application",
      solution: "Integrated pest management",
      impact: "95% pest control success",
      link: "https://youtu.be/0US13rBCa5I?si=cpyqzIQxj1hl3sup",
      linkDescription: "EPA Integrated Pest Management guide",
    },
    {
      scenario: "Market place for better prices",
      challenge: "low price then expected ",
      farmerReaction: "Delaying harvest, seeking alternatives",
      solution: "Contract farming + storage",
      impact: "Minimized losses, better prices",
      link: "https://www.krishi-market.com/",
      linkDescription:
        "Krishi Market online market for farmers.",
    },
    {
      scenario: "Weather Knowledge",
      challenge: "Unexpected rain during harvest",
      farmerReaction: "Using protective covers, quick drying",
      solution: "Weather forecasting + preparation",
      impact: "Saved 80% of crop quality",
      link: "https://youtu.be/iRUnEL_wpDg?si=-gRcN4Hf3xtjtfwO",
      linkDescription:
        "Indian Monsoon| भारतीय मानसून की उत्पत्ति कैसे होती है|South West,North East monsoon| ITCZ क्या है ",
    },
  ];

  return (
    <div className="mb-12">
      {/* Main Farming Activities */}
      <section className="mb-12">
        <h2 className="text-slate-800 dark:text-white text-2xl mb-6">
          {t("home.farmingActivities")}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {farmingActivities.map((activity, index) => (
            <a
              key={index}
              href={activity.link}
              target="_blank"
              rel="noopener noreferrer"
              className="modern-card rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 glow-effect cursor-pointer group block"
              title={activity.linkDescription}
            >
              <div className="relative h-48">
                <ImageWithFallback
                  src={activity.image}
                  alt={activity.activity}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white mb-2 group-hover:text-blue-200 transition-colors">
                      {activity.activity}
                    </h3>
                    <p className="text-white/80 text-sm group-hover:text-white/90 transition-colors">
                      {activity.description}
                    </p>
                  </div>
                </div>
                <span
                  className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs ${
                    activity.difficulty === "Traditional"
                      ? "bg-amber-600/90 text-white"
                      : activity.difficulty === "Essential"
                        ? "bg-blue-600/90 text-white"
                        : activity.difficulty === "Advanced"
                          ? "bg-red-600/90 text-white"
                          : "bg-emerald-600/90 text-white"
                  }`}
                >
                  {activity.difficulty}
                </span>
                {/* External link indicator */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 rounded-full p-1.5">
                    <svg
                      className="w-3 h-3 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600 dark:text-slate-400 text-sm group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                    {activity.farmer}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                    {activity.season}
                  </span>
                </div>
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    Learn More
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Challenging Farming Scenarios */}
      <section>
        <h2 className="text-slate-800 dark:text-white text-2xl mb-6">
          Challenging Farming Scenarios & Farmer Solutions
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {challengingScenarios.map((scenario, index) => (
            <a
              key={index}
              href={scenario.link}
              target="_blank"
              rel="noopener noreferrer"
              className="modern-card rounded-xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer group block"
              title={scenario.linkDescription}
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  ⚡
                </span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-orange-600 dark:text-orange-400 text-lg mb-2 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors">
                      {scenario.scenario}
                    </h3>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full p-1">
                        <svg
                          className="w-3 h-3 text-orange-600 dark:text-orange-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-3 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                    <strong>Challenge:</strong>{" "}
                    {scenario.challenge}
                  </p>
                </div>
              </div>

              <div className="ml-11 space-y-3">
                <p className="text-amber-700 dark:text-amber-300 text-sm group-hover:text-amber-800 dark:group-hover:text-amber-200 transition-colors">
                  <strong>Farmer's Initial Reaction:</strong>{" "}
                  {scenario.farmerReaction}
                </p>
                <p className="text-emerald-700 dark:text-emerald-300 text-sm group-hover:text-emerald-800 dark:group-hover:text-emerald-200 transition-colors">
                  <strong>KrishiMitra Solution:</strong>{" "}
                  {scenario.solution}
                </p>
                <p className="text-blue-700 dark:text-blue-300 text-sm group-hover:text-blue-800 dark:group-hover:text-blue-200 transition-colors">
                  <strong>Result Achieved:</strong>{" "}
                  {scenario.impact}
                </p>
                <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
                  <span className="text-orange-600 dark:text-orange-400 text-xs flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    Read Expert Guide
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}