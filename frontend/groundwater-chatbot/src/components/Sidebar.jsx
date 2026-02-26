const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-900 text-white p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">AquaBot AI</h1>

      <div className="mb-4">
        <label className="text-sm text-slate-400">Select State</label>
        <select className="w-full mt-2 p-2 rounded bg-slate-800 border border-slate-700">
          <option>Kerala</option>
          <option>Tamil Nadu</option>
          <option>Karnataka</option>
        </select>
      </div>

      <div className="mt-auto text-xs text-slate-500">
        AI-based Groundwater Information System
      </div>
    </div>
  );
};

export default Sidebar;
