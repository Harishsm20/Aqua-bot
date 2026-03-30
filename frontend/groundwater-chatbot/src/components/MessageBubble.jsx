const parseMarkdown = (text) => {
  if (!text) return "";

  return text
    .split("\n")
    .map((line, i) => {
      if (line.startsWith("### ")) return `<h3 class="text-base font-bold mt-3 mb-1 text-slate-800">${line.slice(4)}</h3>`;
      if (line.startsWith("## ")) return `<h2 class="text-base font-bold mt-3 mb-1 text-slate-800">${line.slice(3)}</h2>`;
      if (line.startsWith("# ")) return `<h2 class="text-lg font-bold mt-3 mb-1 text-slate-800">${line.slice(2)}</h2>`;

      if (line.startsWith("• ") || line.startsWith("- ") || line.startsWith("* "))
        return `<li class="ml-4 list-disc">${line.slice(2)}</li>`;

      if (/^\d+\.\s/.test(line))
        return `<li class="ml-4 list-decimal">${line.replace(/^\d+\.\s/, "")}</li>`;

      const withBold = line
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/\*/g, "");

      return withBold
        ? `<p class="leading-relaxed">${withBold}</p>`
        : `<br/>`;
    })
    .join("");
};

const MessageBubble = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      {!isUser && (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm mr-3 flex-shrink-0 mt-1 shadow-md">
          💧
        </div>
      )}
      <div
        className={`max-w-2xl px-4 py-3 rounded-2xl text-sm transition-all ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none shadow-md"
            : "bg-white text-slate-800 rounded-bl-none border border-slate-200 shadow-sm hover:shadow-md"
        }`}
      >
        {isUser ? (
          <div>
            {message.location && (
              <p className="text-xs opacity-80 mb-1 flex items-center gap-1">
                <span>📍</span> {message.location}
              </p>
            )}
            <p className="leading-relaxed">{message.text}</p>
          </div>
        ) : (
          <div
            className="prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(message.text) }}
          />
        )}
      </div>
      {isUser && (
        <div className="w-9 h-9 rounded-full bg-slate-300 flex items-center justify-center text-sm ml-3 flex-shrink-0 mt-1 shadow-md">
          👤
        </div>
      )}
    </div>
  );
};

export default MessageBubble;