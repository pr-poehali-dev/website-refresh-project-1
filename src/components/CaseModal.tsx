import { useEffect } from "react";
import Icon from "@/components/ui/icon";

interface CaseSection {
  title: string;
  items?: string[];
  text?: string;
}

interface CaseFunnel {
  label: string;
  value: string;
}

export interface CaseData {
  id: number;
  tag: string;
  title: string;
  desc: string;
  result: string;
  duration: string;
  icon: string;
  fullContent?: {
    situation?: CaseSection;
    target?: CaseSection;
    preparation?: CaseSection;
    vacancy?: CaseSection;
    search?: CaseSection;
    funnel?: CaseFunnel[];
    challenges?: CaseSection;
    outcome?: CaseSection;
    conclusion?: CaseSection;
  };
}

interface CaseModalProps {
  case_: CaseData | null;
  onClose: () => void;
}

export default function CaseModal({ case_, onClose }: CaseModalProps) {
  useEffect(() => {
    if (!case_) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [case_, onClose]);

  if (!case_) return null;

  const fc = case_.fullContent;

  const renderSection = (section: CaseSection) => (
    <div className="mb-8">
      <h3 className="font-display text-lg font-bold mb-3 text-foreground">{section.title}</h3>
      {section.text && (
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">{section.text}</p>
      )}
      {section.items && (
        <ul className="space-y-2">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 font-body text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-neon mt-2 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-7 pb-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-neon/10 flex items-center justify-center">
              <Icon name={case_.icon} size={20} className="text-neon" fallback="Briefcase" />
            </div>
            <div>
              <span className="inline-block bg-neon/10 border border-neon/20 text-neon font-body text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-1">
                {case_.tag}
              </span>
              <h2 className="font-display text-2xl font-bold leading-tight">{case_.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors shrink-0 ml-4"
          >
            <Icon name="X" size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-7">
          {/* Result badges */}
          <div className="flex gap-4 mb-8">
            <div className="bg-neon/10 border border-neon/20 rounded-xl px-5 py-3">
              <div className="font-display text-2xl font-bold text-neon">{case_.result}</div>
              <div className="font-body text-xs text-muted-foreground mt-0.5">результат</div>
            </div>
            <div className="bg-secondary rounded-xl px-5 py-3">
              <div className="font-display text-2xl font-bold">{case_.duration}</div>
              <div className="font-body text-xs text-muted-foreground mt-0.5">срок закрытия</div>
            </div>
          </div>

          {!fc ? (
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{case_.desc}</p>
          ) : (
            <>
              {fc.situation && renderSection(fc.situation)}
              {fc.target && renderSection(fc.target)}
              {fc.preparation && renderSection(fc.preparation)}
              {fc.vacancy && renderSection(fc.vacancy)}
              {fc.search && renderSection(fc.search)}

              {fc.funnel && (
                <div className="mb-8">
                  <h3 className="font-display text-lg font-bold mb-4 text-foreground">Воронка</h3>
                  <div className="space-y-2">
                    {fc.funnel.map((f, i) => (
                      <div key={i} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                        <span className="font-body text-sm text-muted-foreground">{f.label}</span>
                        <span className="font-display text-base font-bold text-foreground">{f.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {fc.challenges && renderSection(fc.challenges)}
              {fc.outcome && renderSection(fc.outcome)}

              {fc.conclusion && (
                <div className="bg-neon/5 border border-neon/20 rounded-xl p-5">
                  <h3 className="font-display text-base font-bold mb-2 text-neon">Вывод</h3>
                  {fc.conclusion.text && (
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">{fc.conclusion.text}</p>
                  )}
                  {fc.conclusion.items && (
                    <ul className="space-y-1.5">
                      {fc.conclusion.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 font-body text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-neon mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
