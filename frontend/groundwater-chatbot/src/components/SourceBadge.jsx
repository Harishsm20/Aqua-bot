const CATEGORY_COLORS = {
  WATER_LEVEL: "bg-blue-100 text-blue-700",
  HYDROGEOLOGY: "bg-purple-100 text-purple-700",
  WATER_QUALITY: "bg-red-100 text-red-700",
  RESOURCE_ASSESSMENT: "bg-orange-100 text-orange-700",
  NOC_REGULATION: "bg-yellow-100 text-yellow-800",
  MANAGEMENT: "bg-green-100 text-green-700",
  DEFINITIONS: "bg-slate-100 text-slate-600",
  TRAINING: "bg-indigo-100 text-indigo-700",
  REPORTS: "bg-teal-100 text-teal-700",
  COMPREHENSIVE_REPORT: "bg-emerald-100 text-emerald-700",
};

const SourceBadge = ({ source, highlight }) => {
  const category = source.split(":")[0]?.trim();
  const label = source.split(":").slice(1).join(":").trim() || source;
  const colorClass = highlight
    ? "bg-emerald-100 text-emerald-700"
    : CATEGORY_COLORS[category] || "bg-slate-100 text-slate-600";

  return (
    <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${colorClass}`}>
      {source}
    </span>
  );
};

export default SourceBadge;
