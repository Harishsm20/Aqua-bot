import { useState, useRef, useEffect } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import WaterFlowLoader from "./WaterFlowLoader";
import DataDisplay from "./DataDisplay";
import SourceBadge from "./SourceBadge";
import ChatHeader from "./ChatHeader";
import QuickActions from "./QuickActions";
import EmptyState from "./EmptyState";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const ChatWindow = ({ selectedDistrict, selectedState }) => {
  const [messages, setMessages] = useState([]);

  const [isTyping, setIsTyping] = useState(false);
  const [reportMode, setReportMode] = useState(false);
  const bottomRef = useRef(null);
  const historyRef = useRef([]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    const userMessage = {
      id: Date.now(),
      text,
      sender: "user",
      sources: [],
      location: selectedDistrict ? `${selectedDistrict}, ${selectedState}` : "All India",
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    historyRef.current = [
      ...historyRef.current,
      { role: "user", content: text },
    ].slice(-10);

    try {
      const endpoint = reportMode ? `${API_BASE}/report` : `${API_BASE}/chat`;
      const body = reportMode
        ? {
            area: `${selectedDistrict || "the selected area"}, ${selectedState || "India"}`,
            district: selectedDistrict,
            state: selectedState,
            include_realtime: true,
          }
        : {
            message: text,
            district: selectedDistrict || "",
            state: selectedState || "",
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
        text: data.reply || "No response generated",
        sender: "bot",
        sources: data.sources || [],
        dataUsed: data.data_used,
        structuredData: data.structured_data || data.data,
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
          text: `Error: ${err.message}`,
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

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col flex-1 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <ChatHeader
        selectedDistrict={selectedDistrict}
        selectedState={selectedState}
        onGenerateReport={handleGenerateReport}
        isTyping={isTyping}
      />

      {/* Messages Area or Empty State */}
      <div className="flex-1 overflow-y-auto">
        {!hasMessages ? (
          <EmptyState selectedDistrict={selectedDistrict} selectedState={selectedState} />
        ) : (
          <div className="p-6 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id}>
                <MessageBubble message={msg} />
                {msg.sender === "bot" && msg.structuredData && (
                  <div className="mt-3 ml-2 max-w-2xl">
                    <DataDisplay data={msg.structuredData} />
                  </div>
                )}
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
            {isTyping && <WaterFlowLoader />}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <QuickActions onSelectAction={handleSend} isTyping={isTyping} />

      {/* Chat Input */}
      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  );
};

export default ChatWindow;
