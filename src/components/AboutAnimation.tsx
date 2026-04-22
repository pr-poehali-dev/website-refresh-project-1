const CARDS = [
  { name: "Алексей М.", role: "Менеджер по продажам", exp: "5 лет" },
  { name: "Ирина К.", role: "Бухгалтер", exp: "8 лет" },
  { name: "Дмитрий Р.", role: "Инженер-технолог", exp: "3 года" },
  { name: "Наталья С.", role: "HR-специалист", exp: "6 лет" },
  { name: "Сергей В.", role: "Руководитель отдела", exp: "10 лет" },
];

const CHOSEN = 2;

export default function AboutAnimation() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[420px] overflow-hidden select-none">
      <style>{`
        @keyframes cardFloat {
          0%   { transform: translateY(0px); opacity: 0.55; }
          50%  { transform: translateY(-10px); opacity: 0.65; }
          100% { transform: translateY(0px); opacity: 0.55; }
        }
        @keyframes cardChosen {
          0%, 100% { box-shadow: 0 0 0 2px #c04000, 0 8px 32px rgba(192,64,0,0.18); transform: scale(1.06); }
          50%       { box-shadow: 0 0 0 3px #c04000, 0 12px 40px rgba(192,64,0,0.28); transform: scale(1.08); }
        }
        @keyframes checkPop {
          0%   { transform: scale(0.5); opacity: 0; }
          60%  { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes tagPulse {
          0%, 100% { opacity: 0.9; }
          50%       { opacity: 0.55; }
        }
        .card-float-0 { animation: cardFloat 5.0s ease-in-out infinite 0.0s; }
        .card-float-1 { animation: cardFloat 5.5s ease-in-out infinite 0.6s; }
        .card-float-2 { animation: cardChosen 3s ease-in-out infinite; }
        .card-float-3 { animation: cardFloat 4.8s ease-in-out infinite 1.8s; }
        .card-float-4 { animation: cardFloat 5.2s ease-in-out infinite 2.4s; }
        .check-pop { animation: checkPop 0.5s cubic-bezier(.36,.07,.19,.97) forwards 0.3s; opacity: 0; }
        .tag-pulse { animation: tagPulse 2.5s ease-in-out infinite; }
      `}</style>

      <div className="mb-6 text-xs font-body uppercase tracking-widest text-foreground/35 flex items-center gap-2">
        <span className="w-8 h-px bg-foreground/20 inline-block" />
        поток кандидатов
        <span className="w-8 h-px bg-foreground/20 inline-block" />
      </div>

      <div className="flex flex-col gap-3 w-full max-w-[320px]">
        {CARDS.map((c, i) => {
          const isChosen = i === CHOSEN;
          return (
            <div
              key={i}
              className={`card-float-${i} rounded-2xl px-5 py-4 flex items-center gap-4 border`}
              style={isChosen ? {
                background: "rgba(192,64,0,0.06)",
                borderColor: "#c04000",
              } : {
                background: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={isChosen ? {
                  background: "rgba(192,64,0,0.15)",
                  color: "#c04000",
                } : {
                  background: "hsl(var(--muted))",
                  color: "hsl(var(--muted-foreground))",
                }}
              >
                {c.name[0]}{c.name.split(" ")[1][0]}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className="font-body font-semibold text-sm truncate"
                  style={isChosen ? { color: "#c04000" } : { color: "hsl(var(--foreground) / 0.7)" }}
                >
                  {c.name}
                </p>
                <p className="font-body text-xs text-foreground/50 truncate">{c.role} · {c.exp}</p>
              </div>

              {isChosen ? (
                <div
                  className="check-pop w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#c04000" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ) : (
                <div className="w-7 h-7 rounded-full flex-shrink-0" style={{ border: "1px solid hsl(var(--border))", opacity: 0.4 }} />
              )}
            </div>
          );
        })}
      </div>

      <div
        className="mt-6 tag-pulse rounded-full px-4 py-1.5 text-xs font-body font-semibold"
        style={{ background: "rgba(192,64,0,0.1)", color: "#c04000" }}
      >
        Ваш кандидат найден
      </div>
    </div>
  );
}
