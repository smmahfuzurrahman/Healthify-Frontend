const TypingAnimation = () => {
  return (
    <div className="bg-blue-100 w-24 h-12 rounded-full flex items-center justify-center gap-2 p-2">
      <div className="dot bg-blue-400 w-3 h-3 rounded-full animate-bounce"></div>
      <div className="dot bg-blue-400 w-3 h-3 rounded-full animate-bounce animation-delay-200"></div>
      <div className="dot bg-blue-400 w-3 h-3 rounded-full animate-bounce animation-delay-400"></div>
    </div>
  );
};

export default TypingAnimation;
