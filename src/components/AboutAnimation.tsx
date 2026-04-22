import { useEffect, useRef, useState } from "react";

const CARDS = [
  { name: "Алексей М.", role: "Менеджер по продажам", exp: "5 лет" },
  { name: "Ирина К.", role: "Бухгалтер", exp: "8 лет" },
  { name: "Дмитрий Р.", role: "Инженер-технолог", exp: "3 года" },
  { name: "Наталья С.", role: "HR-специалист", exp: "6 лет" },
  { name: "Сергей В.", role: "Руководитель отдела", exp: "10 лет" },
  { name: "Юлия Т.", role: "Финансовый аналитик", exp: "4 года" },
  { name: "Павел Н.", role: "Главный бухгалтер", exp: "12 лет" },
];

const CARD_HEIGHT = 72;
const CARD_GAP = 12;
const STEP = CARD_HEIGHT + CARD_GAP;
const VISIBLE = 5;
const CHOSEN_INDEX = 2;
const SPEED = 0.4;

export default function AboutAnimation() {
  const [offset, setOffset] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number>();
  const offsetRef = useRef(0);
  const pauseRef = useRef(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const totalCards = CARDS.length;
  const totalHeight = totalCards * STEP;

  useEffect(() => {
    const animate = () => {
      if (!pauseRef.current) {
        offsetRef.current = (offsetRef.current + SPEED) % totalHeight;
        setOffset(offsetRef.current);

        const centerCard = Math.floor((offsetRef.current + CHOSEN_INDEX * STEP) / STEP) % totalCards;
        const prev = chosen;
        if (centerCard !== prev) {
          setChosen(centerCard);
          pauseRef.current = true;
          setPaused(true);
          if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
          pauseTimerRef.current = setTimeout(() => {
            pauseRef.current = false;
            setPaused(false);
          }, 1800);
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  const visibleCards = [];
  for (let i = 0; i < VISIBLE + 2; i++) {
    const rawIndex = Math.floor(offset / STEP) + i;
    const cardIndex = ((rawIndex % totalCards) + totalCards) % totalCards;
    const y = i * STEP - (offset % STEP);
    visibleCards.push({ card: CARDS[cardIndex], y, cardIndex });
  }

  const containerHeight = VISIBLE * STEP - CARD_GAP;

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[420px] select-none">
      <div className="mb-5 text-xs font-body uppercase tracking-widest text-foreground/35 flex items-center gap-2">
        <span className="w-8 h-px bg-foreground/20 inline-block" />
        поток кандидатов
        <span className="w-8 h-px bg-foreground/20 inline-block" />
      </div>

      {/* Контейнер с масками сверху и снизу */}
      <div
        className="relative w-full max-w-[320px] overflow-hidden"
        style={{
          height: containerHeight,
          maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      >
        {visibleCards.map(({ card, y, cardIndex }, i) => {
          const isChosen = paused && cardIndex === chosen;
          return (
            <div
              key={i}
              className="absolute left-0 right-0 rounded-2xl px-5 flex items-center gap-4 border transition-all duration-300"
              style={{
                top: y,
                height: CARD_HEIGHT,
                background: isChosen ? "rgba(192,64,0,0.06)" : "hsl(var(--card))",
                borderColor: isChosen ? "#c04000" : "hsl(var(--border))",
                boxShadow: isChosen ? "0 0 0 2px #c04000, 0 8px 32px rgba(192,64,0,0.18)" : undefined,
                transform: isChosen ? "scale(1.04)" : "scale(1)",
                zIndex: isChosen ? 2 : 1,
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={isChosen ? {
                  background: "rgba(192,64,0,0.15)",
                  color: "#c04000",
                } : {
                  background: "hsl(var(--muted))",
                  color: "hsl(var(--muted-foreground))",
                }}
              >
                {card.name[0]}{card.name.split(" ")[1][0]}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className="font-body font-semibold text-sm truncate"
                  style={{ color: isChosen ? "#c04000" : "hsl(var(--foreground) / 70%)" }}
                >
                  {card.name}
                </p>
                <p className="font-body text-xs text-foreground/45 truncate">{card.role} · {card.exp}</p>
              </div>

              {isChosen ? (
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#c04000" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ) : (
                <div className="w-7 h-7 rounded-full flex-shrink-0" style={{ border: "1px solid hsl(var(--border))", opacity: 0.3 }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Подпись */}
      <div
        className="mt-5 rounded-full px-4 py-1.5 text-xs font-body font-semibold transition-opacity duration-500"
        style={{
          background: "rgba(192,64,0,0.1)",
          color: "#c04000",
          opacity: paused ? 1 : 0.3,
        }}
      >
        Ваш кандидат найден
      </div>
    </div>
  );
}
