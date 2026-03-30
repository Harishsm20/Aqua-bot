import { useState } from "react";

const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-3 shadow-lg">
      <input
        type="text"
        value={input}
        placeholder="Ask me about groundwater levels, water quality, NOC requirements..."
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        className="flex-1 p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-800 placeholder:text-slate-400 disabled:bg-slate-100 disabled:text-slate-500 transition"
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />

      <button
        onClick={handleSubmit}
        disabled={disabled || !input.trim()}
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-400 text-white px-6 py-3 rounded-xl transition font-semibold flex items-center gap-2 shadow-md hover:shadow-lg disabled:shadow-none"
      >
        <span>✈️</span> Send
      </button>
    </div>
  );
};

export default ChatInput;
