const ChatHeader = ({ selectedDistrict, selectedState, onGenerateReport, isTyping }) => {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white border-b border-blue-800 px-6 py-3.5 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/15 shadow-inner">
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
            <path d="M9 1C9 1 2 9 2 14a7 7 0 0014 0C16 9 9 1 9 1z" fill="rgba(255,255,255,0.85)" />
            <path d="M9 7C9 7 5.5 11 5.5 14a3.5 3.5 0 007 0C12.5 11 9 7 9 7z" fill="rgba(180,220,255,0.75)" />
          </svg>
        </div>
        <div>
          <h2 className="font-semibold text-base leading-tight text-white">
            {selectedDistrict
              ? `${selectedDistrict}, ${selectedState || ""}`
              : "All India Groundwater Chat"}
          </h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <p className="text-xs text-blue-200">Powered by AI and Real-time Data</p>
          </div>
        </div>
      </div>

      <button
        onClick={onGenerateReport}
        disabled={isTyping}
        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-500 disabled:cursor-not-allowed text-white text-xs px-4 py-2 rounded-lg transition-all duration-200 font-semibold shadow hover:shadow-md active:scale-95 border border-emerald-400/30"
      >
        <svg width="13" height="14" viewBox="0 0 13 14" fill="none">
          <rect x="1" y="1" width="11" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M4 5h5M4 7.5h5M4 10h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        Generate Report
      </button>
    </div>
  );
};

export default ChatHeader;
