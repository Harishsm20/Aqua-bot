const EmptyState = ({ selectedDistrict, selectedState }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <div className="mb-6 w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-5xl shadow-lg">
        💧
      </div>

      <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome to AquaBot</h2>

      <p className="text-slate-600 mb-8 max-w-md">
        Your AI-powered assistant for{" "}
        <span className="font-semibold">
          {selectedDistrict ? `groundwater data in ${selectedDistrict}` : "comprehensive groundwater information"}
        </span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mb-8">
        {[
          { icon: "📊", title: "Real-time Data", desc: "24K+ monitoring stations" },
          { icon: "🤖", title: "AI Powered", desc: "Instant answers with context" },
          { icon: "🗺️", title: "Location Smart", desc: "Area-specific insights" },
          { icon: "📋", title: "Regulatory", desc: "NOC & compliance guidance" },
        ].map((feature) => (
          <div key={feature.title} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-2xl mb-2">{feature.icon}</div>
            <h3 className="font-semibold text-slate-800 text-sm">{feature.title}</h3>
            <p className="text-xs text-slate-500">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-slate-500 text-sm">
        👇 Select a topic below or type your question to get started
      </div>
    </div>
  );
};

export default EmptyState;
