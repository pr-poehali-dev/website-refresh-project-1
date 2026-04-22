export default function AboutAnimationFunnel() {
  return (
    <div className="relative w-full flex items-center justify-center min-h-[420px] select-none">
      <style>{`
        @keyframes resumeFall1 {
          0%   { transform: translateY(-60px) rotate(-8deg); opacity: 0; }
          15%  { opacity: 1; }
          55%  { transform: translateY(120px) rotate(-8deg); opacity: 1; }
          70%  { transform: translateY(160px) rotate(-8deg); opacity: 0; }
          100% { transform: translateY(160px) rotate(-8deg); opacity: 0; }
        }
        @keyframes resumeFall2 {
          0%   { transform: translateY(-60px) rotate(6deg); opacity: 0; }
          15%  { opacity: 1; }
          55%  { transform: translateY(120px) rotate(6deg); opacity: 1; }
          70%  { transform: translateY(160px) rotate(6deg); opacity: 0; }
          100% { transform: translateY(160px) rotate(6deg); opacity: 0; }
        }
        @keyframes resumeFall3 {
          0%   { transform: translateY(-60px) rotate(0deg); opacity: 0; }
          15%  { opacity: 1; }
          55%  { transform: translateY(120px) rotate(0deg); opacity: 1; }
          70%  { transform: translateY(160px) rotate(0deg); opacity: 0; }
          100% { transform: translateY(160px) rotate(0deg); opacity: 0; }
        }
        @keyframes candidateRise {
          0%   { transform: translateY(30px); opacity: 0; }
          20%  { transform: translateY(30px); opacity: 0; }
          50%  { transform: translateY(0px); opacity: 1; }
          80%  { transform: translateY(0px); opacity: 1; }
          95%  { transform: translateY(0px); opacity: 0; }
          100% { transform: translateY(0px); opacity: 0; }
        }
        @keyframes funnelGlow {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.8; }
        }
        @keyframes shieldPop {
          0%   { transform: scale(0.5); opacity: 0; }
          55%  { transform: scale(0.5); opacity: 0; }
          70%  { transform: scale(1.2); opacity: 1; }
          80%  { transform: scale(1.0); opacity: 1; }
          95%  { opacity: 0; }
          100% { opacity: 0; }
        }
        .resume-1 { animation: resumeFall1 4s ease-in infinite 0s; }
        .resume-2 { animation: resumeFall2 4s ease-in infinite 0.9s; }
        .resume-3 { animation: resumeFall3 4s ease-in infinite 1.8s; }
        .candidate-rise { animation: candidateRise 4s ease-out infinite 0s; }
        .funnel-glow { animation: funnelGlow 4s ease-in-out infinite; }
        .shield-pop { animation: shieldPop 4s ease-out infinite 0s; }
      `}</style>

      <svg viewBox="0 0 300 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[300px]">

        {/* === РЕЗЮМЕ 1 === */}
        <g className="resume-1" style={{ transformOrigin: "90px 60px" }}>
          <rect x="72" y="44" width="36" height="44" rx="4" fill="white" stroke="#d0d0d0" strokeWidth="1.5"/>
          <line x1="79" y1="56" x2="101" y2="56" stroke="#c0c0c0" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="79" y1="63" x2="101" y2="63" stroke="#c0c0c0" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="79" y1="70" x2="95"  y2="70" stroke="#c0c0c0" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="85" cy="50" r="4" fill="#e8e8e8"/>
        </g>

        {/* === РЕЗЮМЕ 2 === */}
        <g className="resume-2" style={{ transformOrigin: "150px 50px" }}>
          <rect x="132" y="34" width="36" height="44" rx="4" fill="white" stroke="#d0d0d0" strokeWidth="1.5"/>
          <line x1="139" y1="46" x2="161" y2="46" stroke="#c0c0c0" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="139" y1="53" x2="161" y2="53" stroke="#c0c0c0" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="139" y1="60" x2="155" y2="60" stroke="#c0c0c0" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="145" cy="40" r="4" fill="#e8e8e8"/>
        </g>

        {/* === РЕЗЮМЕ 3 === */}
        <g className="resume-3" style={{ transformOrigin: "210px 60px" }}>
          <rect x="192" y="44" width="36" height="44" rx="4" fill="white" stroke="#d0d0d0" strokeWidth="1.5"/>
          <line x1="199" y1="56" x2="221" y2="56" stroke="#c0c0c0" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="199" y1="63" x2="221" y2="63" stroke="#c0c0c0" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="199" y1="70" x2="215" y2="70" stroke="#c0c0c0" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="205" cy="50" r="4" fill="#e8e8e8"/>
        </g>

        {/* === ВОРОНКА === */}
        <path d="M60 160 L150 240 L240 160 Z" fill="rgba(192,64,0,0.07)" stroke="#c04000" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M120 240 L150 310 L180 240 Z" fill="rgba(192,64,0,0.1)" stroke="#c04000" strokeWidth="1.5" strokeLinejoin="round"/>

        {/* Свечение внутри воронки */}
        <ellipse cx="150" cy="210" rx="40" ry="18" fill="#c04000" className="funnel-glow" style={{ filter: "blur(12px)" }}/>

        {/* === КАНДИДАТ снизу === */}
        <g className="candidate-rise" style={{ transformOrigin: "150px 340px" }}>
          {/* Фон-круг */}
          <circle cx="150" cy="340" r="30" fill="rgba(192,64,0,0.08)" stroke="#c04000" strokeWidth="1.5"/>
          {/* Голова */}
          <circle cx="150" cy="330" r="9" fill="#c04000" opacity="0.9"/>
          {/* Тело */}
          <path d="M135 355 Q135 345 150 345 Q165 345 165 355" fill="#c04000" opacity="0.9"/>
        </g>

        {/* === ЩИТ со звездой === */}
        <g className="shield-pop" style={{ transformOrigin: "170px 320px" }}>
          <path d="M170 312 L178 315 L178 323 Q178 329 170 332 Q162 329 162 323 L162 315 Z"
            fill="#c04000" stroke="white" strokeWidth="1"/>
          <path d="M167 322 L169 324 L174 319" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </g>

        {/* Подпись снизу */}
        <text x="150" y="390" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fill="#c04000" opacity="0.7">
          Ваш кандидат
        </text>

      </svg>
    </div>
  );
}
