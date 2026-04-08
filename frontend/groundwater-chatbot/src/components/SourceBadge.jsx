const CATEGORY_COLORS = {
  WATER_LEVEL: "bg-blue-50 text-blue-700 border-blue-200",
  HYDROGEOLOGY: "bg-sky-50 text-sky-700 border-sky-200",
  WATER_QUALITY: "bg-red-50 text-red-700 border-red-200",
  RESOURCE_ASSESSMENT: "bg-orange-50 text-orange-700 border-orange-200",
  NOC_REGULATION: "bg-amber-50 text-amber-700 border-amber-200",
  MANAGEMENT: "bg-green-50 text-green-700 border-green-200",
  DEFINITIONS: "bg-slate-50 text-slate-600 border-slate-200",
  TRAINING: "bg-cyan-50 text-cyan-700 border-cyan-200",
  REPORTS: "bg-teal-50 text-teal-700 border-teal-200",
  COMPREHENSIVE_REPORT: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const SourceBadge = ({ source, highlight }) => {
  const category = source.split(":")[0]?.trim();
  const colorClass = highlight
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : CATEGORY_COLORS[category] || "bg-slate-50 text-slate-600 border-slate-200";

  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md font-medium border ${colorClass}`}>
      {source}
    </span>
  );
};

export default SourceBadge;
