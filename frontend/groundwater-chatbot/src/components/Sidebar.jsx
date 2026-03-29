import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const STATES = [
  "Andhra Pradesh", "Bihar", "Gujarat", "Haryana", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Punjab",
  "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh",
  "West Bengal",
];

const DISTRICTS_BY_STATE = {
  "Tamil Nadu": ["Coimbatore", "Chennai", "Madurai", "Salem", "Tiruchirappalli",
    "Tirunelveli", "Vellore", "Erode", "Tiruppur", "Dindigul"],
  "Karnataka": ["Bengaluru Urban", "Mysuru", "Belagavi", "Hubballi", "Dharwad"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Palakkad"],
};

const Sidebar = ({ selectedState, setSelectedState, selectedDistrict, setSelectedDistrict }) => {
  const [stations, setStations] = useState([]);
  const [systemStatus, setSystemStatus] = useState(null);
  const [activeTab, setActiveTab] = useState("area");

  const districts = DISTRICTS_BY_STATE[selectedState] || [];

  // Fetch system status on mount
  useEffect(() => {
    fetch(`${API_BASE}/`)
      .then((r) => r.json())
      .then(setSystemStatus)
      .catch(() => setSystemStatus(null));
  }, []);

  // Fetch stations when district changes
  useEffect(() => {
    if (!selectedDistrict) { setStations([]); return; }
    fetch(`${API_BASE}/stations?district=${selectedDistrict}`)
      .then((r) => r.json())
      .then((d) => setStations(d.stations || []))
      .catch(() => setStations([]));
  }, [selectedDistrict]);

  return (
    <div className="w-72 bg-slate-900 text-white flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="p-5 border-b border-slate-700">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">💧</span>
          <div>
            <h1 className="text-xl font-bold">AquaBot AI</h1>
            <p className="text-xs text-slate-400">Groundwater Information System</p>
          </div>
        </div>
        {systemStatus && (
          <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 bg-emerald-400 rounded-full inline-block animate-pulse" />
            {systemStatus.knowledge_chunks} knowledge chunks · 
            {systemStatus.realtime_data ? " 📡 Live data" : " No live data"}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700">
        {["area", "stations", "topics"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-xs capitalize transition
              ${activeTab === tab ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">

        {/* Area Tab */}
        {activeTab === "area" && (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">State</label>
              <select
                value={selectedState}
                onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(""); }}
                className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-sm text-white"
              >
                <option value="">All India</option>
                {STATES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-sm text-white"
                disabled={!selectedState}
              >
                <option value="">All Districts</option>
                {districts.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>

            {selectedDistrict && (
              <div className="bg-slate-800 rounded-lg p-3 text-xs">
                <p className="text-slate-300 font-medium mb-2">📍 {selectedDistrict}</p>
                <p className="text-slate-400">
                  Context is now set. Your queries will be answered with area-specific data.
                </p>
              </div>
            )}

            {/* Categories */}
            <div>
              <p className="text-xs text-slate-400 mb-2">Knowledge Areas:</p>
              <div className="space-y-1">
                {[
                  { icon: "💧", label: "Water Levels", color: "text-blue-400" },
                  { icon: "🗺️", label: "Hydrogeology", color: "text-purple-400" },
                  { icon: "🧪", label: "Water Quality", color: "text-red-400" },
                  { icon: "📊", label: "Resource Assessment", color: "text-orange-400" },
                  { icon: "📋", label: "NOC & Regulation", color: "text-yellow-400" },
                  { icon: "🌱", label: "Management", color: "text-green-400" },
                  { icon: "📚", label: "Training", color: "text-indigo-400" },
                  { icon: "📖", label: "Definitions", color: "text-slate-400" },
                ].map((item) => (
                  <div key={item.label} className={`flex items-center gap-2 text-xs ${item.color}`}>
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stations Tab */}
        {activeTab === "stations" && (
          <div>
            <p className="text-xs text-slate-400 mb-3">
              {selectedDistrict
                ? `Monitoring stations in ${selectedDistrict}:`
                : "Select a district to see stations"}
            </p>
            {stations.length > 0 ? (
              <div className="space-y-2">
                {stations.map((s) => (
                  <div key={s.code} className="bg-slate-800 rounded p-2 text-xs">
                    <p className="font-medium text-white">{s.code}</p>
                    <p className="text-slate-300">{s.name}</p>
                    <p className="text-slate-400">Tehsil: {s.tehsil || "–"}</p>
                    <p className="text-slate-400">Depth: {s.wellDepth ? `${s.wellDepth} m` : "–"}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs
                      ${s.status === "Active" ? "bg-emerald-900 text-emerald-300" : "bg-slate-700 text-slate-400"}`}>
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-xs">No stations loaded.</p>
            )}
          </div>
        )}

        {/* Topics Tab */}
        {activeTab === "topics" && (
          <div className="text-xs space-y-3">
            <p className="text-slate-400">Sample questions to try:</p>
            {[
              "What is the current water level in Coimbatore?",
              "How do I apply for NOC from CGWA?",
              "What does 'over-exploited' mean?",
              "What recharge techniques work in hard rock?",
              "Is fluoride a problem in Tamil Nadu?",
              "What training courses does CGWB offer?",
              "How is GW resource assessed under GEC 2015?",
              "What reports are available for my district?",
            ].map((q) => (
              <p key={q} className="text-slate-300 bg-slate-800 rounded p-2">
                💬 {q}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-700 text-xs text-slate-500">
        Data: CGWB · India-WRIS · GEC 2015
      </div>
    </div>
  );
};

export default Sidebar;
