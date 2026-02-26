const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-white px-4 py-3 rounded-2xl shadow rounded-bl-none">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
