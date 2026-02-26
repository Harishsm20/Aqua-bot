const MessageBubble = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xl px-4 py-3 rounded-2xl shadow
        ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-white text-slate-800 rounded-bl-none"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;
