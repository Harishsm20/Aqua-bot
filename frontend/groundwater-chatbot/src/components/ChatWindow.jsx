import { useState, useRef, useEffect } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I can help you with groundwater levels, quality, NOC guidance and reports.",
      sender: "bot",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text) => {
    const userMessage = { text, sender: "user" };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulated API delay
    setTimeout(() => {
      const botMessage = {
        text: "Analyzing groundwater data for your selected area...",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col flex-1 bg-slate-100">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={bottomRef}></div>
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
