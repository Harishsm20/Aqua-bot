const WaterFlowLoader = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <style>{`
        @keyframes waterFlow {
          0%, 100% {
            transform: translateY(-10px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(10px);
            opacity: 1;
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: translateX(0) scaleY(1);
          }
          50% {
            transform: translateX(50%) scaleY(1.2);
          }
        }

        .water-drop {
          animation: waterFlow 1.5s ease-in-out infinite;
        }

        .water-drop-1 { animation-delay: 0s; }
        .water-drop-2 { animation-delay: 0.3s; }
        .water-drop-3 { animation-delay: 0.6s; }

        .water-wave {
          animation: wave 2s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>

      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-2">
          <div className="water-drop water-drop-1">
            <span className="text-2xl">💧</span>
          </div>
          <div className="water-drop water-drop-2">
            <span className="text-2xl">💧</span>
          </div>
          <div className="water-drop water-drop-3">
            <span className="text-2xl">💧</span>
          </div>
        </div>

        <div className="water-wave text-center">
          <div className="text-sm font-medium text-blue-600">Analyzing groundwater data...</div>
        </div>
      </div>
    </div>
  );
};

export default WaterFlowLoader;
