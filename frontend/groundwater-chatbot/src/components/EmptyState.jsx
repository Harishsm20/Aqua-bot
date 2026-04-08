const features = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="8" stroke="#3b82f6" strokeWidth="1.5"/>
        <path d="M9 5v4l3 2" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Real-time Data",
    desc: "24K+ CGWB monitoring stations",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="3" stroke="#0284c7" strokeWidth="1.5"/>
        <path d="M6 9l2 2 4-4" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "AI Powered",
    desc: "Instant answers with context",
    bg: "bg-sky-50",
    border: "border-sky-100",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L2 7v9h5v-4h4v4h5V7L9 2z" stroke="#0891b2" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Location Smart",
    desc: "Area-specific insights",
    bg: "bg-cyan-50",
    border: "border-cyan-100",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="2" stroke="#0369a1" strokeWidth="1.5"/>
        <path d="M5 6h8M5 9h8M5 12h5" stroke="#0369a1" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    title: "Regulatory",
    desc: "NOC and compliance guidance",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
];

const EmptyState = ({ selectedDistrict, selectedState }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 py-8" style={{ animation: "msgFadeIn 0.4s ease-out both" }}>
      <div className="mb-5 relative">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center shadow-lg">
          <svg width="28" height="34" viewBox="0 0 28 34" fill="none">
            <path d="M14 1C14 1 3 13 3 21a11 11 0 0022 0C25 13 14 1 14 1z" fill="#3b82f6" fillOpacity="0.7" />
            <path d="M14 10C14 10 9 16 9 21a5 5 0 0010 0C19 16 14 10 14 10z" fill="#bfdbfe" />
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-1.5">Welcome to AquaBot</h2>

      <p className="text-slate-500 mb-7 max-w-sm text-sm leading-relaxed">
        Your AI-powered assistant for{" "}
        <span className="font-semibold text-blue-700">
          {selectedDistrict ? `groundwater data in ${selectedDistrict}` : "comprehensive groundwater information across India"}
        </span>
      </p>

      <div className="grid grid-cols-2 gap-3 max-w-lg mb-7 w-full">
        {features.map((f, i) => (
          <div
            key={f.title}
            className={`flex items-start gap-3 p-3.5 ${f.bg} rounded-xl border ${f.border} text-left`}
            style={{ animation: `msgFadeIn 0.3s ease-out ${i * 0.07}s both` }}
          >
            <div className="flex-shrink-0 mt-0.5">{f.icon}</div>
            <div>
              <h3 className="font-semibold text-slate-800 text-xs">{f.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-slate-400 text-xs flex items-center gap-1.5">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1v4l3 2" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round"/>
          <circle cx="6" cy="6" r="5" stroke="#94a3b8" strokeWidth="1.2"/>
        </svg>
        Select a topic below or type your question to get started
      </p>
    </div>
  );
};

export default EmptyState;
