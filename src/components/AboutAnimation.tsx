import { useEffect, useRef, useState } from "react";

const CARDS = [
  { name: "Алексей М.", role: "Менеджер по продажам", exp: "5 лет", photo: "https://cdn.poehali.dev/projects/32fc6043-456c-426f-a7ea-92d970737be3/files/586134e2-1eac-4619-9370-a22dd180ba37.jpg" },
  { name: "Ирина К.", role: "Бухгалтер", exp: "8 лет", photo: "https://cdn.poehali.dev/projects/32fc6043-456c-426f-a7ea-92d970737be3/files/e134c85d-c21f-4a51-b49b-13546170b8ca.jpg" },
  { name: "Дмитрий Р.", role: "Инженер-технолог", exp: "3 года", photo: "https://cdn.poehali.dev/projects/32fc6043-456c-426f-a7ea-92d970737be3/files/3218c667-5cca-4213-a26e-a0063762f405.jpg" },
  { name: "Наталья С.", role: "HR-специалист", exp: "6 лет", photo: "https://cdn.poehali.dev/projects/32fc6043-456c-426f-a7ea-92d970737be3/files/57e90962-0c51-469d-b36e-2c72d6a0fff2.jpg" },
  { name: "Сергей В.", role: "Руководитель отдела", exp: "10 лет", photo: "https://cdn.poehali.dev/projects/32fc6043-456c-426f-a7ea-92d970737be3/files/530d72cc-3a63-4f61-9de6-fb78b4f2ba4a.jpg" },
  { name: "Юлия Т.", role: "Финансовый аналитик", exp: "4 года", photo: "https://cdn.poehali.dev/projects/32fc6043-456c-426f-a7ea-92d970737be3/files/235d313a-d956-4406-b337-29eb781b6a9f.jpg" },
  { name: "Павел Н.", role: "Главный бухгалтер", exp: "12 лет", photo: "https://cdn.poehali.dev/projects/32fc6043-456c-426f-a7ea-92d970737be3/files/af0b14ed-7604-49d9-8f34-1d988b52f613.jpg" },
];

const CARD_H = 72;
const GAP = 12;
const STEP = CARD_H + GAP;
const VISIBLE = 5;
const PAUSE_MS = 2000;
const MOVE_MS = 700;
const CHOSEN_POS = 2;

export default function AboutAnimation() {
  const [topIndex, setTopIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [chosenIdx, setChosenIdx] = useState((0 + CHOSEN_POS) % CARDS.length);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const topRef = useRef(0);

  const n = CARDS.length;
  const containerH = VISIBLE * STEP - GAP;

  useEffect(() => {
    const tick = () => {
      setAnimating(true);
      timerRef.current = setTimeout(() => {
        const next = (topRef.current + 1) % n;
        topRef.current = next;
        setTopIndex(next);
        setChosenIdx((next + CHOSEN_POS) % n);
        setAnimating(false);
        timerRef.current = setTimeout(tick, PAUSE_MS);
      }, MOVE_MS);
    };
    timerRef.current = setTimeout(tick, PAUSE_MS);
    return () => clearTimeout(timerRef.current);
  }, []);

  const slots = Array.from({ length: VISIBLE + 1 }, (_, i) => {
    const idx = (topIndex + i) % n;
    return { card: CARDS[idx], idx };
  });

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[420px] select-none">
      <div
        className="relative w-full max-w-[420px]"
        style={{
          height: containerH,
          maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            transform: animating ? `translateY(-${STEP}px)` : "translateY(0px)",
            transition: animating ? `transform ${MOVE_MS}ms cubic-bezier(0.4,0,0.2,1)` : "none",
          }}
        >
          {slots.map(({ card, idx }, i) => {
            const isChosen = idx === chosenIdx && !animating;
            return (
              <div
                key={`${idx}-${i}`}
                className="rounded-2xl px-5 flex items-center gap-4 border transition-all duration-300"
                style={{
                  height: CARD_H,
                  marginBottom: GAP,
                  background: isChosen ? "rgba(192,64,0,0.06)" : "hsl(var(--card))",
                  borderColor: isChosen ? "#c04000" : "hsl(var(--border))",
                  borderWidth: isChosen ? 2 : 1,
                  boxShadow: isChosen ? "0 8px 24px rgba(192,64,0,0.15)" : undefined,
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex-shrink-0 overflow-hidden transition-all duration-300"
                  style={isChosen ? { outline: "2px solid #c04000", outlineOffset: "1px" } : {}}
                >
                  <img src={card.photo} alt={card.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className="font-body font-semibold text-sm truncate transition-colors duration-300"
                    style={{ color: isChosen ? "#c04000" : "hsl(var(--foreground) / 70%)" }}
                  >
                    {card.name}
                  </p>
                  <p className="font-body text-xs text-foreground/45 truncate">{card.role} · {card.exp}</p>
                </div>

                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={isChosen ? { background: "#c04000" } : { border: "1px solid hsl(var(--border))", opacity: 0.3 }}
                >
                  {isChosen && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="mt-5 rounded-full px-4 py-1.5 text-xs font-body font-semibold transition-opacity duration-500"
        style={{ background: "rgba(192,64,0,0.1)", color: "#c04000", opacity: !animating ? 1 : 0.2 }}
      >
        Ваш кандидат найден
      </div>
    </div>
  );
}