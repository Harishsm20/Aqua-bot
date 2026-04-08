import { useState } from "react";

const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center gap-2.5 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
      <input
        type="text"
        value={input}
        placeholder="Ask about groundwater levels, quality, NOC requirements..."
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-slate-50 text-slate-800 placeholder:text-slate-400 disabled:bg-slate-100 disabled:text-slate-400 transition-all text-sm"
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />

      <button
        onClick={handleSubmit}
        disabled={disabled || !input.trim()}
        className="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M14 8L2 2l3 6-3 6 12-6z" fill="currentColor"/>
        </svg>
      </button>
    </div>
  );
};

export default ChatInput;
