import { useEffect, useRef, useState } from "react";

const segments = [
  { text: "Мы не копим устаревшие анкеты — рынок меняется слишком быстро. Вместо этого под каждую вакансию включаем ", highlight: false },
  { text: "технологии маркетинга и продаж", highlight: true, index: 0 },
  { text: ": ", highlight: false },
  { text: "упаковываем, работаем с воронкой, ищем точечно", highlight: true, index: 1 },
  { text: ". А ещё ", highlight: false },
  { text: "за 18 лет мы хорошо изучили местный рынок", highlight: true, index: 2 },
  { text: " и часто просто знаем, ", highlight: false },
  { text: "кому ваше предложение может быть интересно уже сегодня", highlight: true, index: 3 },
  { text: ". Так к вам ", highlight: false },
  { text: "приходят те, кто действительно готов к переменам", highlight: true, index: 4 },
  { text: ", а не те, кто обновил резюме «на всякий случай».", highlight: false },
];

const HIGHLIGHT_COUNT = 5;

export default function HighlightText() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number>(-1);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done) {
          let i = 0;
          const next = () => {
            setActive(i);
            i++;
            if (i < HIGHLIGHT_COUNT) {
              setTimeout(next, 1800);
            } else {
              setDone(true);
            }
          };
          setTimeout(next, 300);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [done]);

  return (
    <section ref={ref} className="py-16 border-t border-border">
      <style>{`
        .hl-phrase {
          border-radius: 3px;
          padding: 1px 2px;
          transition: background 0.9s ease-in-out, color 0.9s ease-in-out, font-weight 0.9s ease-in-out;
          background: transparent;
          color: inherit;
        }
        .hl-phrase.hl-active {
          background: rgba(184, 76, 61, 0.12);
          color: #3A3A3A;
          font-weight: 600;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-body text-lg text-foreground/75 leading-relaxed">
          {segments.map((seg, i) => {
            if (!seg.highlight) return <span key={i}>{seg.text}</span>;
            const isActive = active >= seg.index!;
            return (
              <span key={i} className={`hl-phrase${isActive ? " hl-active" : ""}`}>
                {seg.text}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
