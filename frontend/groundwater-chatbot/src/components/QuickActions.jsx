import { useState } from "react";

const QuickActions = ({ onSelectAction, isTyping }) => {
  const [expanded, setExpanded] = useState(true);

  const actions = [
    {
      id: "water-level",
      icon: "💧",
      title: "Water Level",
      description: "Current levels & trends",
      color: "from-blue-400 to-blue-600",
      textColor: "text-blue-700",
      bgColor: "bg-blue-50",
      questions: [
        "What is the water level in this area?",
        "Show me water level trends",
        "Is the water level rising or falling?",
      ],
    },
    {
      id: "quality",
      icon: "🧪",
      title: "Water Quality",
      description: "Testing & contamination",
      color: "from-red-400 to-red-600",
      textColor: "text-red-700",
      bgColor: "bg-red-50",
      questions: [
        "What are the water quality parameters?",
        "Is fluoride present in this district?",
        "What contamination issues exist here?",
      ],
    },
    {
      id: "noc",
      icon: "📋",
      title: "NOC & Compliance",
      description: "Permits & regulations",
      color: "from-yellow-400 to-yellow-600",
      textColor: "text-yellow-700",
      bgColor: "bg-yellow-50",
      questions: [
        "How do I apply for NOC?",
        "What are the NOC conditions?",
        "Tell me about CGWA guidelines",
      ],
    },
    {
      id: "assessment",
      icon: "📊",
      title: "Resource Assessment",
      description: "GEC & categories",
      color: "from-orange-400 to-orange-600",
      textColor: "text-orange-700",
      bgColor: "bg-orange-50",
      questions: [
        "Is this area over-exploited?",
        "What is the assessment status?",
        "Explain the resource categories",
      ],
    },
    {
      id: "hydro",
      icon: "🗺️",
      title: "Hydrogeology",
      description: "Geology & aquifers",
      color: "from-cyan-400 to-cyan-600",
      textColor: "text-cyan-700",
      bgColor: "bg-cyan-50",
      questions: [
        "What is the hydrogeology here?",
        "Explain aquifer types",
        "Tell me about groundwater zones",
      ],
    },
    {
      id: "management",
      icon: "🌱",
      title: "Management",
      description: "Conservation & solutions",
      color: "from-green-400 to-green-600",
      textColor: "text-green-700",
      bgColor: "bg-green-50",
      questions: [
        "What are recharge techniques?",
        "How can we conserve groundwater?",
        "What management practices work?",
      ],
    },
  ];

  const [selectedAction, setSelectedAction] = useState(null);

  return (
    <div className="bg-white border-t">
      <div className="px-6 py-3 border-b flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">Comprehensive Groundwater Intelligence</p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-slate-400 hover:text-slate-600 transition"
        >
          {expanded ? "−" : "+"}
        </button>
      </div>

      {expanded && (
        <div className="p-6">
          {!selectedAction ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => setSelectedAction(action.id)}
                  className={`p-4 rounded-lg border-2 border-transparent transition-all hover:shadow-md ${action.bgColor}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{action.icon}</span>
                    <div className="text-left">
                      <h3 className={`font-semibold text-sm ${action.textColor}`}>{action.title}</h3>
                      <p className="text-xs text-slate-500">{action.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div>
              <button
                onClick={() => setSelectedAction(null)}
                className="text-sm text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-1 transition"
              >
                ← Back to Topics
              </button>

              {actions.find((a) => a.id === selectedAction) && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{actions.find((a) => a.id === selectedAction).icon}</span>
                    <div>
                      <h3 className="font-bold text-slate-800">{actions.find((a) => a.id === selectedAction).title}</h3>
                      <p className="text-sm text-slate-500">{actions.find((a) => a.id === selectedAction).description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {actions.find((a) => a.id === selectedAction).questions.map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          onSelectAction(q);
                          setSelectedAction(null);
                        }}
                        disabled={isTyping}
                        className="text-left p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-sm text-slate-700 hover:text-blue-700 transition disabled:opacity-50"
                      >
                        💬 {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuickActions;
