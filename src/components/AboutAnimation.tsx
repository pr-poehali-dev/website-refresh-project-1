export default function AboutAnimation() {
  return (
    <div className="relative w-full h-full min-h-[420px] flex items-center justify-center">
      <svg
        viewBox="0 0 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[480px]"
      >
        <style>{`
          @keyframes float1 {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-8px) translateX(4px); }
          }
          @keyframes float2 {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(6px) translateX(-5px); }
          }
          @keyframes float3 {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-5px) translateX(-6px); }
          }
          @keyframes rotateSlow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse1 {
            0%, 100% { opacity: 0.7; r: 6; }
            50% { opacity: 0.25; r: 8; }
          }
          @keyframes pulse2 {
            0%, 100% { opacity: 0.5; r: 5; }
            50% { opacity: 0.15; r: 7; }
          }
          @keyframes pulse3 {
            0%, 100% { opacity: 0.6; r: 5; }
            50% { opacity: 0.2; r: 7; }
          }
          @keyframes dash {
            0% { stroke-dashoffset: 200; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes dashFlow {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -200; }
          }
          @keyframes arcDraw {
            0%, 100% { stroke-dashoffset: 60; opacity: 0.18; }
            50% { stroke-dashoffset: 0; opacity: 0.35; }
          }

          .g-float1 { animation: float1 6s ease-in-out infinite; transform-origin: center; }
          .g-float2 { animation: float2 7s ease-in-out infinite; transform-origin: center; }
          .g-float3 { animation: float3 8s ease-in-out infinite; transform-origin: center; }
          .g-rotate { animation: rotateSlow 18s linear infinite; transform-origin: 240px 170px; }
          .dot-pulse1 { animation: pulse1 3s ease-in-out infinite; }
          .dot-pulse2 { animation: pulse2 4s ease-in-out infinite 0.8s; }
          .dot-pulse3 { animation: pulse3 3.5s ease-in-out infinite 1.5s; }
          .line-flow { animation: dashFlow 4s linear infinite; stroke-dasharray: 6 10; }
          .line-flow2 { animation: dashFlow 5s linear infinite 1s; stroke-dasharray: 6 10; }
          .arc-anim { animation: arcDraw 4s ease-in-out infinite; }
          .arc-anim2 { animation: arcDraw 5s ease-in-out infinite 1.2s; }
        `}</style>

        {/* Фоновые дуги — аналитика */}
        <g className="g-float3">
          <circle cx="240" cy="310" r="110" stroke="#d0d0d0" strokeWidth="1" strokeDasharray="60 20" opacity="0.2" className="arc-anim" fill="none" />
          <circle cx="240" cy="310" r="140" stroke="#c04000" strokeWidth="0.8" strokeDasharray="40 30" opacity="0.12" className="arc-anim2" fill="none" />
        </g>

        {/* Воронка */}
        <g className="g-rotate">
          <polygon
            points="180,120 300,120 265,175 215,175"
            fill="rgba(192,64,0,0.08)"
            stroke="rgba(192,64,0,0.35)"
            strokeWidth="1.5"
          />
          <polygon
            points="215,178 265,178 252,220 228,220"
            fill="rgba(192,64,0,0.12)"
            stroke="rgba(192,64,0,0.4)"
            strokeWidth="1.5"
          />
          <polygon
            points="228,223 252,223 244,248 236,248"
            fill="rgba(192,64,0,0.18)"
            stroke="rgba(192,64,0,0.5)"
            strokeWidth="1.5"
          />
          {/* Акцентная точка — выход воронки */}
          <circle cx="240" cy="258" r="5" fill="#c04000" opacity="0.9" className="dot-pulse1" />
        </g>

        {/* Геометки — точные попадания */}
        <g className="g-float1">
          <g transform="translate(110, 230)">
            <circle cx="0" cy="0" r="14" stroke="#c04000" strokeWidth="1.5" fill="rgba(192,64,0,0.06)" />
            <circle cx="0" cy="0" r="5" fill="#c04000" opacity="0.7" className="dot-pulse2" />
            <line x1="0" y1="14" x2="0" y2="24" stroke="#c04000" strokeWidth="1.5" opacity="0.5" />
          </g>
        </g>

        <g className="g-float2">
          <g transform="translate(360, 200)">
            <circle cx="0" cy="0" r="12" stroke="#c04000" strokeWidth="1.5" fill="rgba(192,64,0,0.06)" />
            <circle cx="0" cy="0" r="4" fill="#c04000" opacity="0.6" className="dot-pulse3" />
            <line x1="0" y1="12" x2="0" y2="21" stroke="#c04000" strokeWidth="1.5" opacity="0.5" />
          </g>
        </g>

        <g className="g-float3">
          <g transform="translate(340, 340)">
            <circle cx="0" cy="0" r="10" stroke="rgba(192,64,0,0.5)" strokeWidth="1.2" fill="rgba(192,64,0,0.05)" />
            <circle cx="0" cy="0" r="3.5" fill="#c04000" opacity="0.5" className="dot-pulse1" />
            <line x1="0" y1="10" x2="0" y2="18" stroke="#c04000" strokeWidth="1.2" opacity="0.4" />
          </g>
        </g>

        {/* Соединительные линии */}
        <line x1="110" y1="230" x2="240" y2="258" stroke="#b0b0b0" strokeWidth="1" opacity="0.3" className="line-flow" />
        <line x1="360" y1="200" x2="240" y2="170" stroke="#b0b0b0" strokeWidth="1" opacity="0.3" className="line-flow2" />
        <line x1="340" y1="340" x2="240" y2="258" stroke="#b0b0b0" strokeWidth="1" opacity="0.25" className="line-flow" />
        <line x1="110" y1="230" x2="340" y2="340" stroke="#c8c8c8" strokeWidth="0.8" opacity="0.18" className="line-flow2" />

        {/* Диаграмма — дуга аналитики */}
        <g className="g-float2">
          <path
            d="M 60 380 Q 90 330 140 350 Q 170 360 160 400"
            stroke="#a0a0a0"
            strokeWidth="1.5"
            fill="none"
            opacity="0.25"
            strokeDasharray="8 6"
            className="arc-anim"
          />
          <circle cx="60" cy="380" r="3" fill="#b0b0b0" opacity="0.4" />
          <circle cx="160" cy="400" r="3" fill="#c04000" opacity="0.5" />
        </g>

        <g className="g-float1">
          <path
            d="M 370 380 Q 400 340 430 360 Q 450 370 440 410"
            stroke="#a0a0a0"
            strokeWidth="1.5"
            fill="none"
            opacity="0.2"
            strokeDasharray="8 6"
            className="arc-anim2"
          />
          <circle cx="370" cy="380" r="3" fill="#b0b0b0" opacity="0.35" />
          <circle cx="440" cy="410" r="3" fill="#c04000" opacity="0.4" />
        </g>

        {/* Мелкие декоративные точки */}
        <circle cx="170" cy="380" r="2.5" fill="#c0c0c0" opacity="0.3" className="dot-pulse2" />
        <circle cx="390" cy="140" r="2" fill="#c0c0c0" opacity="0.25" className="dot-pulse3" />
        <circle cx="80" cy="160" r="2" fill="#c04000" opacity="0.2" className="dot-pulse1" />
        <circle cx="420" cy="300" r="2.5" fill="#c0c0c0" opacity="0.25" className="dot-pulse2" />
      </svg>
    </div>
  );
}
