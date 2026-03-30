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

const KNOWLEDGE_AREAS = [
  { icon: "💧", label: "Water Levels",    bg: "rgba(45,140,255,0.12)"   },
  { icon: "🗺️", label: "Hydrogeology",   bg: "rgba(130,80,200,0.12)"   },
  { icon: "🧪", label: "Water Quality",  bg: "rgba(220,50,50,0.12)"    },
  { icon: "📊", label: "Resource Data",  bg: "rgba(220,130,30,0.12)"   },
  { icon: "📋", label: "NOC & Rules",    bg: "rgba(200,180,0,0.12)"    },
  { icon: "🌱", label: "Management",     bg: "rgba(30,180,80,0.12)"    },
  { icon: "📚", label: "Training",       bg: "rgba(60,100,220,0.12)"   },
  { icon: "📖", label: "Definitions",    bg: "rgba(90,90,90,0.15)"     },
];

const SAMPLE_TOPICS = [
  "What is the current water level in Coimbatore?",
  "How do I apply for NOC from CGWA?",
  "What does 'over-exploited' mean?",
  "What recharge techniques work in hard rock?",
  "Is fluoride a problem in Tamil Nadu?",
  "What training courses does CGWB offer?",
  "How is GW resource assessed under GEC?",
  "What reports are available for my district?",
];

/* ─── styles ─── */
const css = `
  .aq-sidebar {
    width: 272px;
    height: 100vh;
    min-height: 600px;
    background: #0b1628;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-right: 1px solid rgba(56,130,210,0.15);
    position: relative;
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
  }
  .aq-sidebar::before {
    content: '';
    position: absolute;
    top: -60px; left: 50%;
    transform: translateX(-50%);
    width: 220px; height: 120px;
    background: radial-gradient(ellipse, rgba(45,140,255,0.16) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  /* Header */
  .aq-header {
    padding: 18px 20px 16px;
    border-bottom: 1px solid rgba(56,130,210,0.15);
    position: relative;
    z-index: 1;
  }
  .aq-logo-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .aq-logo-icon {
    width: 42px; height: 42px;
    background: linear-gradient(135deg, #1a4a8a, #0d2f5c);
    border-radius: 12px;
    border: 1px solid rgba(45,140,255,0.3);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }
  .aq-logo-icon::after {
    content: '';
    position: absolute;
    bottom: -4px; left: -4px; right: -4px;
    height: 16px;
    background: rgba(45,140,255,0.22);
    border-radius: 50% 50% 0 0;
  }
  .aq-logo-text h1 {
    font-size: 16px;
    font-weight: 600;
    color: #e8f3ff;
    letter-spacing: 0.02em;
    line-height: 1.2;
    margin: 0;
  }
  .aq-logo-text p {
    font-size: 11px;
    color: #5d7fa8;
    margin: 2px 0 0;
  }
  .aq-status-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 12px;
    padding: 5px 10px;
    background: rgba(0,212,168,0.07);
    border: 1px solid rgba(0,212,168,0.15);
    border-radius: 20px;
    width: fit-content;
  }
  .aq-pulse-dot {
    width: 6px; height: 6px;
    background: #00d4a8;
    border-radius: 50%;
    animation: aq-pulse-dot 2s ease-in-out infinite;
  }
  @keyframes aq-pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.55; transform: scale(0.8); }
  }
  .aq-status-pill span {
    font-size: 11px;
    color: #00d4a8;
  }

  /* Tabs */
  .aq-tabs {
    display: flex;
    border-bottom: 1px solid rgba(56,130,210,0.15);
    padding: 0 10px;
    gap: 2px;
    position: relative;
    z-index: 1;
  }
  .aq-tab {
    flex: 1;
    padding: 10px 6px;
    font-size: 11px;
    font-weight: 600;
    color: #5d7fa8;
    cursor: pointer;
    border: none;
    background: none;
    border-bottom: 2px solid transparent;
    transition: color 0.2s, border-color 0.2s;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-family: inherit;
  }
  .aq-tab.active {
    color: #2d8cff;
    border-bottom-color: #2d8cff;
  }
  .aq-tab:hover:not(.active) { color: #c8ddf5; }

  /* Scroll area */
  .aq-scroll {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    scrollbar-width: thin;
    scrollbar-color: rgba(56,130,210,0.2) transparent;
    position: relative;
    z-index: 1;
  }
  .aq-scroll::-webkit-scrollbar { width: 3px; }
  .aq-scroll::-webkit-scrollbar-thumb {
    background: rgba(56,130,210,0.2);
    border-radius: 2px;
  }

  /* Field / Select */
  .aq-field { margin-bottom: 14px; }
  .aq-field-label {
    font-size: 10px;
    font-weight: 600;
    color: #5d7fa8;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 6px;
    display: block;
  }
  .aq-select-wrap { position: relative; }
  .aq-select-wrap::after {
    content: '';
    position: absolute;
    right: 12px; top: 50%;
    width: 6px; height: 6px;
    border-right: 1.5px solid #5d7fa8;
    border-bottom: 1.5px solid #5d7fa8;
    transform: translateY(-65%) rotate(45deg);
    pointer-events: none;
  }
  .aq-select {
    width: 100%;
    padding: 9px 32px 9px 12px;
    background: #111f35;
    border: 1px solid rgba(56,130,210,0.18);
    border-radius: 10px;
    font-size: 13px;
    color: #c8ddf5;
    appearance: none;
    cursor: pointer;
    transition: border-color 0.2s;
    outline: none;
    font-family: inherit;
  }
  .aq-select:focus { border-color: rgba(45,140,255,0.5); }
  .aq-select option { background: #111f35; }
  .aq-select:disabled { opacity: 0.45; cursor: not-allowed; }

  /* Area card */
  .aq-area-card {
    padding: 12px;
    background: linear-gradient(135deg, rgba(45,140,255,0.08), rgba(0,212,168,0.05));
    border: 1px solid rgba(45,140,255,0.2);
    border-radius: 12px;
    margin-bottom: 16px;
  }
  .aq-area-card-title {
    font-size: 12px;
    font-weight: 600;
    color: #90bef0;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .aq-area-card p {
    font-size: 11px;
    color: #5d7fa8;
    line-height: 1.5;
    margin: 0;
  }

  /* Knowledge grid */
  .aq-section-label {
    font-size: 10px;
    font-weight: 600;
    color: #5d7fa8;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .aq-k-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }
  .aq-k-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    background: #111f35;
    border: 1px solid rgba(56,130,210,0.18);
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
  }
  .aq-k-item:hover {
    background: #162640;
    border-color: rgba(45,140,255,0.3);
  }
  .aq-k-icon {
    width: 28px; height: 28px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px;
    flex-shrink: 0;
  }
  .aq-k-item span {
    font-size: 11px;
    color: #c8ddf5;
    line-height: 1.2;
  }

  /* Station card */
  .aq-station-card {
    padding: 12px;
    background: #111f35;
    border: 1px solid rgba(56,130,210,0.18);
    border-radius: 12px;
    margin-bottom: 8px;
    transition: border-color 0.2s;
  }
  .aq-station-card:hover { border-color: rgba(45,140,255,0.3); }
  .aq-station-code {
    font-size: 12px;
    font-weight: 600;
    color: #2d8cff;
    margin-bottom: 2px;
  }
  .aq-station-name {
    font-size: 11px;
    color: #c8ddf5;
    margin-bottom: 5px;
  }
  .aq-station-meta { font-size: 10px; color: #5d7fa8; }
  .aq-badge {
    display: inline-block;
    margin-top: 6px;
    padding: 2px 8px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 600;
  }
  .aq-badge-active {
    background: rgba(0,212,168,0.1);
    color: #00d4a8;
    border: 1px solid rgba(0,212,168,0.2);
  }
  .aq-badge-inactive {
    background: rgba(93,127,168,0.1);
    color: #5d7fa8;
    border: 1px solid rgba(56,130,210,0.18);
  }

  /* Topics */
  .aq-topic-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 10px 12px;
    background: #111f35;
    border: 1px solid rgba(56,130,210,0.18);
    border-radius: 10px;
    margin-bottom: 6px;
    font-size: 12px;
    color: #c8ddf5;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    line-height: 1.5;
  }
  .aq-topic-item:hover {
    background: #162640;
    border-color: rgba(45,140,255,0.3);
  }
  .aq-topic-dot {
    width: 5px; height: 5px;
    background: #2d8cff;
    border-radius: 50%;
    margin-top: 6px;
    flex-shrink: 0;
  }

  /* Footer */
  .aq-footer {
    padding: 12px 16px;
    border-top: 1px solid rgba(56,130,210,0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 1;
  }
  .aq-footer-text { font-size: 10px; color: #3d6a9a; }
  .aq-footer-dots { display: flex; gap: 4px; }
  .aq-footer-dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: rgba(56,130,210,0.2);
  }
  .aq-footer-dot.active { background: #2d8cff; }

  .aq-empty-hint {
    font-size: 11px;
    color: #3d6a9a;
    margin-bottom: 12px;
  }
`;

export default function Sidebar({ selectedState, setSelectedState, selectedDistrict, setSelectedDistrict }) {
  const [stations, setStations]       = useState([]);
  const [systemStatus, setSystemStatus] = useState(null);
  const [activeTab, setActiveTab]     = useState("area");

  const districts = DISTRICTS_BY_STATE[selectedState] || [];

  useEffect(() => {
    fetch(`${API_BASE}/`)
      .then((r) => r.json())
      .then(setSystemStatus)
      .catch(() => setSystemStatus(null));
  }, []);

  useEffect(() => {
    if (!selectedDistrict) { setStations([]); return; }
    fetch(`${API_BASE}/stations?district=${selectedDistrict}`)
      .then((r) => r.json())
      .then((d) => setStations(d.stations || []))
      .catch(() => setStations([]));
  }, [selectedDistrict]);

  return (
    <>
      <style>{css}</style>

      <div className="aq-sidebar">

        {/* ── Header ── */}
        <div className="aq-header">
          <div className="aq-logo-row">
            <div className="aq-logo-icon">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11 3C11 3 6 8 6 13a5 5 0 0010 0c0-5-5-10-5-10z" fill="rgba(45,140,255,0.75)" />
                <path d="M11 8C11 8 8.5 10.5 8.5 13a2.5 2.5 0 005 0c0-2.5-2.5-5-2.5-5z" fill="rgba(180,220,255,0.9)" />
              </svg>
            </div>
            <div className="aq-logo-text">
              <h1>AquaBot AI</h1>
              <p>Groundwater Information System</p>
            </div>
          </div>

          {systemStatus && (
            <div className="aq-status-pill">
              <div className="aq-pulse-dot" />
              <span>
                {systemStatus.knowledge_chunks?.toLocaleString()} chunks
                {systemStatus.realtime_data ? " · 📡 Live" : ""}
              </span>
            </div>
          )}
        </div>

        {/* ── Tabs ── */}
        <div className="aq-tabs">
          {["area", "stations", "topics"].map((tab) => (
            <button
              key={tab}
              className={`aq-tab${activeTab === tab ? " active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Scroll area ── */}
        <div className="aq-scroll">

          {/* AREA TAB */}
          {activeTab === "area" && (
            <div>
              <div className="aq-field">
                <span className="aq-field-label">State</span>
                <div className="aq-select-wrap">
                  <select
                    className="aq-select"
                    value={selectedState}
                    onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(""); }}
                  >
                    <option value="">All India</option>
                    {STATES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="aq-field">
                <span className="aq-field-label">District</span>
                <div className="aq-select-wrap">
                  <select
                    className="aq-select"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    disabled={!selectedState}
                  >
                    <option value="">All Districts</option>
                    {districts.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              {selectedDistrict && (
                <div className="aq-area-card">
                  <div className="aq-area-card-title">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="5" r="2.5" fill="#90bef0" />
                      <path d="M6 8.5C4 10 1 11 1 11s2-3 5-3 5 3 5 3-3-1-5-2.5z" fill="rgba(144,190,240,0.4)" />
                    </svg>
                    {selectedDistrict}, {selectedState}
                  </div>
                  <p>Context set — queries will use area-specific groundwater data.</p>
                </div>
              )}

              <div>
                <p className="aq-section-label">Knowledge areas</p>
                <div className="aq-k-grid">
                  {KNOWLEDGE_AREAS.map((item) => (
                    <div key={item.label} className="aq-k-item">
                      <div className="aq-k-icon" style={{ background: item.bg }}>
                        {item.icon}
                      </div>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STATIONS TAB */}
          {activeTab === "stations" && (
            <div>
              <p className="aq-empty-hint">
                {selectedDistrict
                  ? `Stations in ${selectedDistrict}:`
                  : "Select a district in the Area tab to filter."}
              </p>
              {stations.length > 0 ? (
                stations.map((s) => (
                  <div key={s.code} className="aq-station-card">
                    <div className="aq-station-code">{s.code}</div>
                    <div className="aq-station-name">{s.name}</div>
                    <div className="aq-station-meta">
                      Tehsil: {s.tehsil || "–"} · Depth: {s.wellDepth ? `${s.wellDepth} m` : "–"}
                    </div>
                    <span className={`aq-badge ${s.status === "Active" ? "aq-badge-active" : "aq-badge-inactive"}`}>
                      {s.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="aq-empty-hint">No stations loaded.</p>
              )}
            </div>
          )}

          {/* TOPICS TAB */}
          {activeTab === "topics" && (
            <div>
              <p className="aq-empty-hint">Tap a question to send it.</p>
              {SAMPLE_TOPICS.map((q) => (
                <div key={q} className="aq-topic-item">
                  <div className="aq-topic-dot" />
                  {q}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="aq-footer">
          <span className="aq-footer-text">Data: CGWB · India-WRIS · GEC</span>
          <div className="aq-footer-dots">
            <div className="aq-footer-dot active" />
            <div className="aq-footer-dot active" />
            <div className="aq-footer-dot" />
          </div>
        </div>

      </div>
    </>
  );
}