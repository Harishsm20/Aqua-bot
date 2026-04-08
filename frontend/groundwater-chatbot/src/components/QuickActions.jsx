import { useState } from "react";

const ACTIONS = [
  {
    id: "water-level",
    label: "Water Level",
    desc: "Current levels and trends",
    textColor: "text-blue-700",
    bgColor: "bg-blue-50",
    border: "border-blue-200 hover:border-blue-400",
    dotColor: "bg-blue-500",
    questions: [
      "What is the water level in this area?",
      "Show me water level trends",
      "Is the water level rising or falling?",
    ],
  },
  {
    id: "quality",
    label: "Water Quality",
    desc: "Testing and contamination",
    textColor: "text-red-700",
    bgColor: "bg-red-50",
    border: "border-red-200 hover:border-red-400",
    dotColor: "bg-red-500",
    questions: [
      "What are the water quality parameters?",
      "Is fluoride present in this district?",
      "What contamination issues exist here?",
    ],
  },
  {
    id: "noc",
    label: "NOC and Compliance",
    desc: "Permits and regulations",
    textColor: "text-amber-700",
    bgColor: "bg-amber-50",
    border: "border-amber-200 hover:border-amber-400",
    dotColor: "bg-amber-500",
    questions: [
      "How do I apply for NOC?",
      "What are the NOC conditions?",
      "Tell me about CGWA guidelines",
    ],
  },
  {
    id: "assessment",
    label: "Resource Assessment",
    desc: "GEC methodology and categories",
    textColor: "text-orange-700",
    bgColor: "bg-orange-50",
    border: "border-orange-200 hover:border-orange-400",
    dotColor: "bg-orange-500",
    questions: [
      "Is this area over-exploited?",
      "What is the assessment status?",
      "Explain the resource categories",
    ],
  },
  {
    id: "hydro",
    label: "Hydrogeology",
    desc: "Geology and aquifer types",
    textColor: "text-cyan-700",
    bgColor: "bg-cyan-50",
    border: "border-cyan-200 hover:border-cyan-400",
    dotColor: "bg-cyan-500",
    questions: [
      "What is the hydrogeology here?",
      "Explain aquifer types",
      "Tell me about groundwater zones",
    ],
  },
  {
    id: "management",
    label: "Management",
    desc: "Conservation and solutions",
    textColor: "text-green-700",
    bgColor: "bg-green-50",
    border: "border-green-200 hover:border-green-400",
    dotColor: "bg-green-500",
    questions: [
      "What are recharge techniques?",
      "How can we conserve groundwater?",
      "What management practices work?",
    ],
  },
];

const QuickActions = ({ onSelectAction, isTyping }) => {
  const [expanded, setExpanded] = useState(true);
  const [selectedAction, setSelectedAction] = useState(null);

  const active = ACTIONS.find((a) => a.id === selectedAction);

  return (
    <div className="bg-white border-t border-slate-100">
      <div className="px-5 py-2.5 flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Quick Topics</p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-6 h-6 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {expanded && (
        <div className="px-5 pb-3" style={{ animation: "msgFadeIn 0.2s ease-out both" }}>
          {!selectedAction ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {ACTIONS.map((action, i) => (
                <button
                  key={action.id}
                  onClick={() => setSelectedAction(action.id)}
                  style={{ animationDelay: `${i * 0.03}s`, animation: "msgFadeIn 0.25s ease-out both" }}
                  className={`flex flex-col items-start gap-1.5 p-2.5 rounded-lg border transition-all duration-150 hover:shadow-sm active:scale-95 ${action.bgColor} ${action.border}`}
                >
                  <div className={`w-2 h-2 rounded-full ${action.dotColor}`} />
                  <div>
                    <p className={`text-xs font-semibold leading-tight ${action.textColor}`}>{action.label}</p>
                    <p className="text-xs text-slate-400 leading-tight mt-0.5 hidden md:block">{action.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div style={{ animation: "msgFadeIn 0.2s ease-out both" }}>
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={() => setSelectedAction(null)}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition font-medium"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back
                </button>
                {active && (
                  <span className={`text-xs font-semibold ${active.textColor}`}>{active.label}</span>
                )}
              </div>

              {active && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {active.questions.map((q, i) => (
                    <button
                      key={q}
                      onClick={() => {
                        onSelectAction(q);
                        setSelectedAction(null);
                      }}
                      disabled={isTyping}
                      style={{ animationDelay: `${i * 0.05}s`, animation: "msgFadeIn 0.25s ease-out both" }}
                      className="text-left px-3 py-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-xs text-slate-700 hover:text-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed leading-relaxed"
                    >
                      {q}
                    </button>
                  ))}
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
