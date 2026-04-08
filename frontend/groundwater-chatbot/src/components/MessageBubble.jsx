const renderInline = (text) => {
  if (!text) return null;
  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldIdx = remaining.indexOf("**");
    if (boldIdx === -1) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }
    const boldEnd = remaining.indexOf("**", boldIdx + 2);
    if (boldEnd === -1) {
      parts.push(<span key={key++}>{remaining.replace(/\*\*/g, "")}</span>);
      break;
    }
    if (boldIdx > 0) {
      parts.push(<span key={key++}>{remaining.slice(0, boldIdx)}</span>);
    }
    parts.push(
      <strong key={key++} className="font-semibold text-slate-900">
        {remaining.slice(boldIdx + 2, boldEnd)}
      </strong>
    );
    remaining = remaining.slice(boldEnd + 2);
  }

  return parts;
};

const renderContent = (text) => {
  if (!text) return null;
  const lines = text.split("\n");
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-sm font-bold mt-4 mb-1 text-slate-800 border-b border-slate-100 pb-1">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-base font-bold mt-4 mb-1 text-blue-800 border-b border-blue-100 pb-1">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="text-lg font-bold mt-4 mb-2 text-slate-900">
          {line.slice(2)}
        </h1>
      );
      i++;
      continue;
    }

    if (line.match(/^[-*]\s/) || line.startsWith("- ") || line.startsWith("* ") || line.startsWith("* ")) {
      const listItems = [];
      while (i < lines.length && (lines[i].match(/^[-*]\s/) || lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
        const content = lines[i].replace(/^[-*]\s/, "");
        listItems.push(
          <li key={i} className="flex gap-2 items-start">
            <span className="text-blue-400 mt-1.5 flex-shrink-0 text-xs">&#9679;</span>
            <span className="text-slate-800">{renderInline(content)}</span>
          </li>
        );
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-1.5 my-2 pl-1">
          {listItems}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const listItems = [];
      let num = 1;
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        const content = lines[i].replace(/^\d+\.\s/, "");
        listItems.push(
          <li key={i} className="flex gap-2 items-start">
            <span className="text-blue-600 font-semibold flex-shrink-0 min-w-5 text-xs mt-0.5">{num}.</span>
            <span className="text-slate-800">{renderInline(content)}</span>
          </li>
        );
        i++;
        num++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="space-y-1.5 my-2 pl-1">
          {listItems}
        </ol>
      );
      continue;
    }

    const cleaned = line.replace(/\*/g, "");
    if (cleaned.trim()) {
      elements.push(
        <p key={i} className="leading-relaxed text-slate-800">
          {renderInline(cleaned)}
        </p>
      );
    }
    i++;
  }

  return elements;
};

const MessageBubble = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-1`}
      style={{ animation: "msgFadeIn 0.25s ease-out both" }}
    >
      {!isUser && (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mr-3 flex-shrink-0 mt-1 shadow-md">
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path d="M8 1C8 1 2 8 2 13a6 6 0 0012 0C14 8 8 1 8 1z" fill="rgba(255,255,255,0.9)" />
            <path d="M8 7C8 7 5.5 10 5.5 13a2.5 2.5 0 005 0C10.5 10 8 7 8 7z" fill="rgba(180,220,255,0.8)" />
          </svg>
        </div>
      )}

      <div
        className={`max-w-2xl px-4 py-3 rounded-2xl text-sm transition-shadow ${
          isUser
            ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-none shadow-md"
            : "bg-white text-slate-800 rounded-bl-none border border-slate-100 shadow-sm hover:shadow-md"
        }`}
      >
        {isUser ? (
          <div>
            {message.location && (
              <p className="text-xs opacity-70 mb-1 flex items-center gap-1">
                <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
                  <path d="M4.5 0C2.57 0 1 1.57 1 3.5 1 6.125 4.5 11 4.5 11S8 6.125 8 3.5C8 1.57 6.43 0 4.5 0zm0 4.75a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" fill="currentColor"/>
                </svg>
                {message.location}
              </p>
            )}
            <p className="leading-relaxed">{message.text}</p>
          </div>
        ) : (
          <div className="space-y-1.5 text-sm leading-relaxed">
            {renderContent(message.text)}
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center ml-3 flex-shrink-0 mt-1 shadow">
          <svg width="14" height="15" viewBox="0 0 14 15" fill="none">
            <circle cx="7" cy="5" r="3" fill="#94a3b8" />
            <path d="M1 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </svg>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
