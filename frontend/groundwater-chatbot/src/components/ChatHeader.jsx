const ChatHeader = ({ selectedDistrict, selectedState, onGenerateReport, isTyping }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white border-b border-blue-700 px-6 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center text-2xl">
          💧
        </div>
        <div>
          <h2 className="font-bold text-lg">
            {selectedDistrict
              ? `${selectedDistrict}, ${selectedState || ""}`
              : "All India Groundwater Chat"}
          </h2>
          <p className="text-sm text-blue-100">Powered by AI + Real-time Data</p>
        </div>
      </div>

      <button
        onClick={onGenerateReport}
        disabled={isTyping}
        className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-400 text-white text-sm px-5 py-2.5 rounded-lg transition flex items-center gap-2 font-semibold shadow-md hover:shadow-lg"
      >
        📄 Generate Report
      </button>
    </div>
  );
};

export default ChatHeader;
