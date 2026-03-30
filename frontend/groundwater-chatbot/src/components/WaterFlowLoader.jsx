const css = `
  @keyframes wf-wave-scroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes wf-rise {
    0%   { clip-path: inset(62% 0 0 0 round 50%); }
    50%  { clip-path: inset(36% 0 0 0 round 50%); }
    100% { clip-path: inset(62% 0 0 0 round 50%); }
  }
  @keyframes wf-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes wf-spin-rev {
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
  }
  @keyframes wf-fade-text {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1;   }
  }
  @keyframes wf-bubble1 {
    0%, 100% { transform: translateY(0) scale(1);    opacity: 0.6; }
    50%       { transform: translateY(-14px) scale(1.2); opacity: 0.9; }
  }
  @keyframes wf-bubble2 {
    0%, 100% { transform: translateY(0) scale(1);    opacity: 0.4; }
    50%       { transform: translateY(-10px) scale(1.1); opacity: 0.7; }
  }
  @keyframes wf-bubble3 {
    0%, 100% { transform: translateY(0) scale(1);    opacity: 0.3; }
    50%       { transform: translateY(-8px) scale(1.15); opacity: 0.6; }
  }

  .wf-root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px;
    gap: 18px;
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
  }

  /* Ring wrappers */
  .wf-ring-outer {
    animation: wf-spin 3s linear infinite;
    position: absolute; top: 0; left: 0;
  }
  .wf-ring-inner {
    animation: wf-spin-rev 5s linear infinite;
    position: absolute; top: 0; left: 0;
  }

  /* Water circle */
  .wf-water-circle {
    position: absolute;
    top: 8px; left: 8px;
    width: 72px; height: 72px;
    border-radius: 50%;
    overflow: hidden;
    background: #071428;
    animation: wf-rise 3s ease-in-out infinite;
  }
  .wf-wave-svg {
    position: absolute;
    bottom: 0; left: 0;
    width: 200%; height: 100%;
    animation: wf-wave-scroll 2s linear infinite;
  }

  /* Bubbles */
  .wf-bubble {
    position: absolute;
    border-radius: 50%;
  }
  .wf-bubble-1 {
    bottom: 18px; left: 22px;
    width: 5px; height: 5px;
    background: rgba(150,210,255,0.7);
    animation: wf-bubble1 2.2s ease-in-out infinite;
  }
  .wf-bubble-2 {
    bottom: 22px; left: 36px;
    width: 3px; height: 3px;
    background: rgba(120,190,255,0.6);
    animation: wf-bubble2 2.8s ease-in-out infinite 0.4s;
  }
  .wf-bubble-3 {
    bottom: 16px; left: 48px;
    width: 4px; height: 4px;
    background: rgba(180,220,255,0.5);
    animation: wf-bubble3 2.5s ease-in-out infinite 0.8s;
  }

  /* Drop icon */
  .wf-drop {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  /* Text */
  .wf-label {
    text-align: center;
  }
  .wf-label-main {
    font-size: 13px;
    font-weight: 500;
    color: #90bef0;
    letter-spacing: 0.03em;
    animation: wf-fade-text 2.5s ease-in-out infinite;
  }
  .wf-label-sub {
    font-size: 11px;
    color: #3d6a9a;
    margin-top: 3px;
  }
`;

/**
 * WaterFlowLoader
 *
 * Props:
 *   message {string}  - Override the loading text (default: "Analyzing groundwater data...")
 *   size    {number}  - Diameter of the loader in px (default: 88)
 */
export default function WaterFlowLoader({
  message = "Analyzing groundwater data...",
  size = 88,
}) {
  const innerSize = size - 16; // water circle is 8px inset on each side

  return (
    <>
      <style>{css}</style>

      <div className="wf-root">

        {/* Circle container */}
        <div style={{ position: "relative", width: size, height: size }}>

          {/* Outer spinning arc (blue) */}
          <svg
            className="wf-ring-outer"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
          >
            <circle
              cx={size / 2} cy={size / 2} r={size / 2 - 4}
              fill="none"
              stroke="rgba(45,140,255,0.13)"
              strokeWidth="2"
            />
            <circle
              cx={size / 2} cy={size / 2} r={size / 2 - 4}
              fill="none"
              stroke="#2d8cff"
              strokeWidth="2"
              strokeDasharray={`${size * 0.57} ${size * 2.28}`}
              strokeLinecap="round"
            />
          </svg>

          {/* Inner counter-spinning arc (teal) */}
          <svg
            className="wf-ring-inner"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
          >
            <circle
              cx={size / 2} cy={size / 2} r={size / 2 - 8}
              fill="none"
              stroke="rgba(0,212,168,0.18)"
              strokeWidth="1"
            />
            <circle
              cx={size / 2} cy={size / 2} r={size / 2 - 8}
              fill="none"
              stroke="#00d4a8"
              strokeWidth="1"
              strokeDasharray={`${size * 0.32} ${size * 2.25}`}
              strokeLinecap="round"
            />
          </svg>

          {/* Water circle with animated waves */}
          <div className="wf-water-circle">
            <svg
              className="wf-wave-svg"
              viewBox="0 0 200 72"
              preserveAspectRatio="none"
            >
              {/* Wave layer 1 – lightest, fastest */}
              <path
                d="M0,40 C10,34 20,28 30,34 C40,40 50,46 60,40
                   C70,34 80,28 90,34 C100,40 110,46 120,40
                   C130,34 140,28 150,34 C160,40 170,46 180,40
                   C190,34 200,28 200,34 L200,72 L0,72 Z"
                fill="rgba(45,140,255,0.55)"
              />
              {/* Wave layer 2 – mid */}
              <path
                d="M0,46 C12,40 22,36 34,42 C46,48 54,44 66,40
                   C78,36 86,42 100,46 C114,50 122,44 134,40
                   C146,36 156,42 166,46 C176,50 186,44 200,40
                   L200,72 L0,72 Z"
                fill="rgba(30,100,220,0.45)"
              />
              {/* Wave layer 3 – deepest */}
              <path
                d="M0,52 C15,48 25,44 38,50 C51,56 58,52 70,48
                   C82,44 92,50 104,54 C116,58 126,52 138,48
                   C150,44 162,50 174,54 C186,58 196,52 200,50
                   L200,72 L0,72 Z"
                fill="rgba(15,60,160,0.55)"
              />
            </svg>

            {/* Rising bubbles */}
            <div className="wf-bubble wf-bubble-1" />
            <div className="wf-bubble wf-bubble-2" />
            <div className="wf-bubble wf-bubble-3" />
          </div>

          {/* Water-drop icon centred on top */}
          <div className="wf-drop">
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
              <path
                d="M9 1C9 1 2 8.5 2 14a7 7 0 0014 0C16 8.5 9 1 9 1z"
                fill="rgba(180,220,255,0.9)"
              />
              <path
                d="M9 7C9 7 5.5 11 5.5 14a3.5 3.5 0 007 0C12.5 11 9 7 9 7z"
                fill="rgba(255,255,255,0.7)"
              />
            </svg>
          </div>
        </div>

        {/* Label */}
        <div className="wf-label">
          <div className="wf-label-main">{message}</div>
          <div className="wf-label-sub">CGWB · India-WRIS</div>
        </div>

      </div>
    </>
  );
}