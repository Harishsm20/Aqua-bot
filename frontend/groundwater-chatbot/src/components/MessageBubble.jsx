/**
 * MessageBubble - renders bot/user messages.
 * Supports simple markdown: **bold**, bullet lists, newlines, headings (#)
 */

const parseMarkdown = (text) => {
  if (!text) return "";

  return text
    .split("\n")
    .map((line, i) => {
      // Headings
      if (line.startsWith("### ")) return `<h3 class="text-base font-bold mt-3 mb-1 text-slate-800">${line.slice(4)}</h3>`;
      if (line.startsWith("## ")) return `<h2 class="text-base font-bold mt-3 mb-1 text-slate-800">${line.slice(3)}</h2>`;
      if (line.startsWith("# ")) return `<h2 class="text-lg font-bold mt-3 mb-1 text-slate-800">${line.slice(2)}</h2>`;

      // Bullet
      if (line.startsWith("• ") || line.startsWith("- ") || line.startsWith("* "))
        return `<li class="ml-4 list-disc">${line.slice(2)}</li>`;

      // Numbered
      if (/^\d+\.\s/.test(line))
        return `<li class="ml-4 list-decimal">${line.replace(/^\d+\.\s/, "")}</li>`;

      // Bold and italic → HTML, then strip any leftover * symbols
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
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm mr-2 flex-shrink-0 mt-1">
          💧
        </div>
      )}
      <div
        className={`max-w-2xl px-4 py-3 rounded-2xl shadow-sm text-sm
          ${isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-white text-slate-800 rounded-bl-none border border-slate-100"
          }`}
      >
        {isUser ? (
          <div>
            {message.location && (
              <p className="text-xs opacity-75 mb-1">📍 {message.location}</p>
            )}
            <p>{message.text}</p>
          </div>
        ) : (
          <div
            className="prose-sm"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(message.text) }}
          />
        )}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm ml-2 flex-shrink-0 mt-1">
          👤
        </div>
      )}
    </div>
  );
};

export default MessageBubble;