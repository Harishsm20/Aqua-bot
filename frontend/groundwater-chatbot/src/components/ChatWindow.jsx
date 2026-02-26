import { useState, useRef, useEffect } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import SourceBadge from "./SourceBadge";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const ChatWindow = ({ selectedDistrict, selectedState }) => {
  const [messages, setMessages] = useState([
    {
      id: 0,
      text: "👋 Hello! I'm **AquaBot**, your AI assistant for groundwater information.\n\nI can help you with:\n• 💧 Water level scenarios & trends\n• 🗺️ Hydrogeological profiles\n• 🧪 Water quality & contamination\n• 📊 GW Resource Assessment (GEC 2015)\n• 📋 NOC guidance & application process\n• 🌱 Management & recharge practices\n• 📚 Reports, definitions, training\n• 📄 Comprehensive Area Reports\n\nAsk me anything about groundwater!",
      sender: "bot",
      sources: [],
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [reportMode, setReportMode] = useState(false);
  const bottomRef = useRef(null);
  const historyRef = useRef([]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    const userMessage = { id: Date.now(), text, sender: "user", sources: [] };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Maintain chat history for context
    historyRef.current = [
      ...historyRef.current,
      { role: "user", content: text },
    ].slice(-10); // Keep last 10 turns

    try {
      const endpoint = reportMode ? `${API_BASE}/report` : `${API_BASE}/chat`;
      const body = reportMode
        ? {
            area: `${selectedDistrict || "the selected area"}, ${selectedState || "India"}`,
            district: selectedDistrict,
            include_realtime: true,
          }
        : {
            message: text,
            district: selectedDistrict,
            state: selectedState,
            history: historyRef.current.slice(0, -1),
            report_mode: false,
          };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const botMessage = {
        id: Date.now() + 1,
        text: data.reply,
        sender: "bot",
        sources: data.sources || [],
        dataUsed: data.data_used,
      };

      historyRef.current = [
        ...historyRef.current,
        { role: "assistant", content: data.reply },
      ].slice(-10);

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: `⚠️ Error: ${err.message}. Make sure the backend is running on ${API_BASE}`,
          sender: "bot",
          sources: [],
        },
      ]);
    } finally {
      setIsTyping(false);
      if (reportMode) setReportMode(false);
    }
  };

  const handleGenerateReport = () => {
    setReportMode(true);
    handleSend(
      `Generate a comprehensive groundwater report for ${selectedDistrict || "the selected area"}, ${selectedState || "India"}`
    );
  };

  return (
    <div className="flex flex-col flex-1 bg-slate-50 overflow-hidden">
      {/* Top bar */}
      <div className="bg-white border-b px-6 py-3 flex items-center justify-between shadow-sm">
        <div>
          <h2 className="font-semibold text-slate-800">
            {selectedDistrict
              ? `${selectedDistrict}, ${selectedState || ""}`
              : "All India Groundwater Chat"}
          </h2>
          <p className="text-xs text-slate-400">Powered by RAG + Gemini</p>
        </div>
        <button
          onClick={handleGenerateReport}
          disabled={isTyping}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          📄 Generate Area Report
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id}>
            <MessageBubble message={msg} />
            {msg.sender === "bot" && msg.sources?.length > 0 && (
              <div className="mt-1 ml-2 flex flex-wrap gap-1">
                {msg.sources.map((s, i) => (
                  <SourceBadge key={i} source={s} />
                ))}
                {msg.dataUsed && (
                  <SourceBadge source="📡 Real-time WRIS Data" highlight />
                )}
              </div>
            )}
          </div>
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Quick questions */}
      <div className="bg-white border-t px-4 pt-3 pb-1">
        <p className="text-xs text-slate-400 mb-2">Quick queries:</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {[
            "What is the water level in Coimbatore?",
            "What are NOC conditions for extraction?",
            "Is this area over-exploited?",
            "What training courses are available?",
            "Define hydraulic transmissivity",
          ].map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              disabled={isTyping}
              className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-full px-3 py-1 transition disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  );
};

export default ChatWindow;
