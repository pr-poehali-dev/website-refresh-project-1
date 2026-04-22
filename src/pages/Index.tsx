import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";



const HERO_BG = "https://cdn.poehali.dev/projects/32fc6043-456c-426f-a7ea-92d970737be3/files/0ab03755-f179-4741-8a6f-18114a72a3d4.jpg";

const stats = [
  { value: "2300+", label: "закрытых вакансий — от малого бизнеса до крупных корпораций", icon: "Briefcase", desc: "с 2008 года" },
  { value: "18 лет", label: "локальной экспертизы — знаем где искать и чем мотивировать", icon: "MapPin", desc: "на рынке Иркутска" },
  { value: "96%", label: "клиентов выбирают нас снова. Строим партнёрство на годы", icon: "RefreshCw", desc: "высокий NPS" },
  { value: "14 дней", label: "средний срок подбора, старт поиска в день обращения", icon: "Timer", desc: "от заявки до оффера", footnote: true },
];

const cases = [
  {
    id: 1,
    tag: "Производство",
    title: "Завод «СибМет»",
    desc: "Завод терял контракты из-за нехватки инженеров. Закрыли 12 позиций за 25 дней — производство восстановлено в срок.",
    result: "12 специалистов",
    duration: "25 дней",
    icon: "Factory",
  },
  {
    id: 2,
    tag: "IT & Digital",
    title: "Стартап «Baikal Dev»",
    desc: "После ухода ключевых разработчиков проект стоял. Собрали новую команду с нуля — запуск продукта не сорван.",
    result: "8 разработчиков",
    duration: "40 дней",
    icon: "Code2",
  },
  {
    id: 3,
    tag: "Торговля",
    title: "Сеть «Сибирский стиль»",
    desc: "Открытие новой точки под угрозой срыва: нет управляющего и персонала. Укомплектовали команду за 18 дней — открытие состоялось.",
    result: "16 сотрудников",
    duration: "18 дней",
    icon: "ShoppingBag",
  },
  {
    id: 4,
    tag: "Финансы",
    title: "МФО «БайкалКредит»",
    desc: "Три агентства отказались от задачи. Мы нашли финансового директора с редкой специализацией — компания прошла проверку ЦБ без нареканий.",
    result: "1 топ-менеджер",
    duration: "35 дней",
    icon: "TrendingUp",
  },
  {
    id: 5,
    tag: "Медицина",
    title: "Клиника «МедЦентр+»",
    desc: "Дефицит врачей грозил закрытием трёх отделений. Укомплектовали штат хирургии, кардиологии и физиотерапии — клиника работает в полную силу.",
    result: "22 врача",
    duration: "60 дней",
    icon: "Heart",
  },
  {
    id: 6,
    tag: "Строительство",
    title: "ГК «ВостокСтрой»",
    desc: "Крупнейший жилой проект региона стоял без ключевых руководителей. Нашли прораба, снабженца и главного инженера — сроки сданы в контракт.",
    result: "3 руководителя",
    duration: "28 дней",
    icon: "Building2",
  },
];

const services = [
  {
    icon: "Search",
    title: "Точечный подбор",
    desc: "Находим тех, кто выдержит давление и не уйдёт при первых трудностях. Работаем через закрытые базы и личные рекомендации — не только hh.ru.",
  },
  {
    icon: "Users",
    title: "Массовый найм",
    desc: "Когда бизнес растёт или перестраивается — быстро комплектуем команды от 10 до 100+ человек без потери в качестве отбора.",
  },
  {
    icon: "Award",
    title: "Executive Search",
    desc: "Когда на кону устойчивость бизнеса — ищем топ-менеджеров и редких экспертов, которые принимают решения в условиях неопределённости. Полная конфиденциальность.",
  },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function useCountUp(target: string, duration = 1500, active = false) {
  const [display, setDisplay] = useState("0");
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const num = parseInt(target.replace(/\D/g, ""));
    if (!num) { setDisplay(target); return; }
    const suffix = target.replace(/[\d]/g, "");
    let start = 0;
    const step = Math.ceil(num / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, num);
      setDisplay(start + suffix);
      if (start >= num) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [active]);

  return display;
}

function StatCard({ value, label, delay, icon, desc, footnote, inView }: { value: string; label: string; delay: number; icon: string; desc: string; footnote?: boolean; inView: boolean }) {
  const count = useCountUp(value, 1500, inView);
  return (
    <div
      className="group relative flex flex-col gap-4 p-7 rounded-2xl bg-card border border-border hover:border-neon/30 transition-all duration-500 hover:shadow-lg overflow-hidden"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s, box-shadow 0.3s, border-color 0.3s`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neon/0 to-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center">
          <Icon name={icon} size={18} className="text-neon" fallback="Star" />
        </div>
        <span className="font-body text-xs text-muted-foreground/60 uppercase tracking-wider">{desc}</span>
      </div>
      <div>
        <div className="font-display text-5xl font-bold text-neon neon-glow leading-none mb-2">{count}</div>
        <div className="font-body text-sm text-foreground/70 leading-tight">
          {footnote ? <>средний срок подбора<sup className="text-neon ml-0.5">*</sup>, старт поиска в день обращения</> : label}
        </div>
      </div>
    </div>
  );
}

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${open ? "border-neon/40 bg-card shadow-sm" : "border-border bg-card/60 hover:border-border/80"}`}
    >
      <button
        className="w-full flex items-center gap-5 text-left px-7 py-5 group"
        onClick={() => setOpen(!open)}
      >
        <span className={`flex-shrink-0 font-display text-sm font-bold w-7 transition-colors duration-200 ${open ? "text-neon" : "text-muted-foreground/50"}`}>
          {String(index).padStart(2, "0")}
        </span>
        <span className={`flex-1 font-display text-lg font-bold transition-colors duration-200 ${open ? "text-neon" : "group-hover:text-foreground"}`}>
          {question}
        </span>
        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${open ? "bg-neon text-white rotate-45" : "bg-[#c04000]/10 text-neon"}`}>
          <Icon name="Plus" size={14} />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96" : "max-h-0"}`}>
        <p className="font-body text-foreground/70 leading-relaxed px-7 pb-6 border-t border-border/50 pt-4 ml-12">
          {answer}
        </p>
      </div>
    </div>
  );
}

function UnderlineText({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView(0.5);
  return (
    <p ref={ref} className="font-body font-semibold text-neon mb-2 relative inline-block">
      {children}
      <span
        className="absolute left-0 bottom-0 h-[2px] bg-neon rounded-full transition-all duration-700 ease-out"
        style={{ width: inView ? "100%" : "0%" }}
      />
    </p>
  );
}

function FadeCard({ className, style, delay = 0, children, onClick }: { className?: string; style?: React.CSSProperties; delay?: number; children: React.ReactNode; onClick?: () => void }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function StatsSection() {
  const { ref, inView } = useInView(0.15);
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={i} value={s.value} label={s.label} icon={s.icon} desc={s.desc} delay={i * 0.15} footnote={s.footnote} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.phone.trim()) return;
    setFormStatus('sending');
    try {
      const res = await fetch('https://functions.poehali.dev/093a5946-7475-4880-9fc3-f0afd7cd23cc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', phone: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Левая стойка */}
              <rect x="2" y="4" width="5" height="28" rx="2.5" fill="#c04000"/>
              {/* Правая стойка */}
              <rect x="29" y="4" width="5" height="28" rx="2.5" fill="#c04000"/>
              {/* Перекладина */}
              <rect x="2" y="4" width="32" height="5" rx="2.5" fill="#c04000"/>
              {/* Стрелка вперёд — движение, перспектива */}
              <path d="M12 26 L18 14 L24 26" stroke="#c04000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M15 26 L18 19 L21 26" fill="#c04000" opacity="0.25"/>
            </svg>
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl font-bold tracking-wide text-foreground">ПЕРСПЕКТИВА</span>
              <span className="font-body text-[9px] tracking-[0.2em] text-muted-foreground uppercase mt-0.5">кадровый центр</span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {[["home", "Главная"], ["about", "О нас"], ["cases", "Кейсы"], ["services", "Услуги"], ["contact", "Контакты"]].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`nav-link font-body text-sm uppercase tracking-widest transition-colors ${activeSection === id ? "text-neon active" : "text-muted-foreground hover:text-foreground"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:block bg-neon text-white font-body font-medium text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity animate-pulse-glow"
          >
            Оставить заявку
          </button>

          <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-card border-b border-border px-6 py-4 flex flex-col gap-4">
            {[["home", "Главная"], ["cases", "Кейсы"], ["services", "Услуги"], ["contact", "Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="font-body text-sm uppercase tracking-widest text-left text-muted-foreground hover:text-neon transition-colors">
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        </div>

        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#c04000]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 rounded-full bg-[#c04000]/8 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[#c04000]/10 border border-[#c04000]/30 rounded-full px-4 py-1.5 mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              <span className="font-body text-xs text-neon uppercase tracking-widest">Агентство Перспектива · Иркутск</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 animate-fade-up-delay-1">
              РАЗВИВАЙТЕ БИЗНЕС<br />
              С ЛУЧШИМИ СОТРУДНИКАМИ<br />
              <span className="text-neon neon-glow">ДАЖЕ В УСЛОВИЯХ ШТОРМА.</span>
            </h1>

            <p className="font-body text-lg text-foreground/75 max-w-xl leading-relaxed mb-10 animate-fade-up-delay-2">
              Подбираем команду, которая не подведет даже при критических изменениях рынка. Работаем с оплатой за результат.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up-delay-3">
              <button
                onClick={() => scrollTo("contact")}
                className="bg-neon text-white font-body font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-all hover:scale-105 text-base"
              >
                Обсудить вакансию
              </button>
              <button
                onClick={() => scrollTo("cases")}
                className="border border-border text-foreground font-body font-medium px-8 py-4 rounded-full hover:border-neon/60 transition-all text-base"
              >
                Смотреть кейсы
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <StatsSection />

      {/* ABOUT */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 -left-48 w-[600px] h-[600px] rounded-full bg-[#c04000]/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-48 w-[500px] h-[500px] rounded-full bg-[#c04000]/6 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
        <span className="font-body text-xs text-neon uppercase tracking-widest">О нас</span>

        {/* Блок проблем — bento grid */}
        <h2 className="font-display text-5xl font-bold mt-3 mb-8">Ищете надёжного сотрудника, но при этом :</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20" style={{gridTemplateRows: "auto"}}>
          <FadeCard delay={0} className="col-span-2 flex flex-col gap-4 bg-card rounded-2xl p-7" style={{boxShadow: "0 8px 32px rgba(192,64,0,0.12), 0 2px 8px rgba(192,64,0,0.06)"}}>
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Icon name="Bot" size={20} className="text-red-400" />
            </div>
            <div>
              <p className="font-body font-semibold text-foreground mb-2">Кандидаты пишут резюме с помощью ChatGPT</p>
              <p className="font-body text-base text-foreground/65 leading-relaxed">Красивое резюме — а на деле человек не помнит половины терминов. Время потрачено зря.</p>
            </div>
          </FadeCard>
          <FadeCard delay={0.1} className="col-span-1 flex flex-col gap-4 bg-card rounded-2xl p-7" style={{boxShadow: "0 8px 32px rgba(192,64,0,0.12), 0 2px 8px rgba(192,64,0,0.06)"}}>
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Icon name="UserX" size={20} className="text-red-400" />
            </div>
            <div>
              <p className="font-body font-semibold text-foreground mb-2">Профильные кандидаты не откликаются вообще</p>
              <p className="font-body text-base text-foreground/65 leading-relaxed">Вы разместили вакансию на HH, за неделю пришло 40 откликов. 38 — мимо (нет опыта, хотят удалёнку, не читали требования). А те двое, кто подходит, не ответили на звонок.</p>
            </div>
          </FadeCard>
          <FadeCard delay={0.05} className="col-span-1 flex flex-col gap-4 bg-card rounded-2xl p-7" style={{boxShadow: "0 8px 32px rgba(192,64,0,0.12), 0 2px 8px rgba(192,64,0,0.06)"}}>
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-red-400" />
            </div>
            <div>
              <p className="font-body font-semibold text-foreground mb-2">Нет объективных данных по уровню з/п</p>
              <p className="font-body text-base text-foreground/65 leading-relaxed">Боитесь продешевить и упустить лучших — или переплатить просто «хорошему рассказчику».</p>
            </div>
          </FadeCard>
          <FadeCard delay={0.1} className="col-span-2 flex flex-col gap-4 bg-card rounded-2xl p-7" style={{boxShadow: "0 8px 32px rgba(192,64,0,0.12), 0 2px 8px rgba(192,64,0,0.06)"}}>
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Icon name="Timer" size={20} className="text-red-400" />
            </div>
            <div>
              <p className="font-body font-semibold text-foreground mb-2">Вы теряете сильных кандидатов из-за пауз</p>
              <p className="font-body text-base text-foreground/65 leading-relaxed">Пока вы взвешиваете, сравниваете и назначаете ещё одно собеседование — сильный кандидат уже принял предложение от другой компании.</p>
            </div>
          </FadeCard>
          <FadeCard delay={0.15} className="col-span-1 flex flex-col gap-4 bg-card rounded-2xl p-7" style={{boxShadow: "0 8px 32px rgba(192,64,0,0.12), 0 2px 8px rgba(192,64,0,0.06)"}}>
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Icon name="ShieldQuestion" size={20} className="text-red-400" />
            </div>
            <div>
              <p className="font-body font-semibold text-foreground mb-2">Сложно проверить компетенции кандидата</p>
              <p className="font-body text-base text-foreground/65 leading-relaxed">Кто реально справится с задачами, а кто просто прошёл курс «как пройти собеседование»?</p>
            </div>
          </FadeCard>
          <FadeCard delay={0.2} className="col-span-1 flex flex-col gap-4 bg-card rounded-2xl p-7" style={{boxShadow: "0 8px 32px rgba(192,64,0,0.12), 0 2px 8px rgba(192,64,0,0.06)"}}>
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Icon name="AlertCircle" size={20} className="text-red-500" />
            </div>
            <div>
              <UnderlineText>В результате:</UnderlineText>
              <p className="font-body text-base text-foreground/75 leading-relaxed">Вы тратите время на бесконечный отбор, упускаете лучших и рискуете взять того, кто красиво говорит, но не приносит результата.</p>
            </div>
          </FadeCard>
        </div>

        {/* Блок решений — bento grid */}
        <h2 className="font-display text-5xl font-bold text-neon mb-8">Наймите сотрудников, в которых не ошибетесь</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <FadeCard delay={0} className="col-span-1 flex flex-col gap-4 bg-card rounded-2xl p-7" style={{boxShadow: "0 8px 32px rgba(192,64,0,0.12), 0 2px 8px rgba(192,64,0,0.06)"}}>
            <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center">
              <Icon name="BadgeCheck" size={20} className="text-neon" />
            </div>
            <div>
              <p className="font-body font-semibold text-foreground mb-2">Оцениваем реальный опыт кандидата</p>
              <p className="font-body text-base text-foreground/65 leading-relaxed">Глубинные интервью, тестовые задания и проверка фактов — вы встречаетесь только с теми, чей опыт подтверждён.</p>
            </div>
          </FadeCard>
          <FadeCard delay={0.1} className="col-span-2 flex flex-col gap-4 bg-card rounded-2xl p-7" style={{boxShadow: "0 8px 32px rgba(192,64,0,0.12), 0 2px 8px rgba(192,64,0,0.06)"}}>
            <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center">
              <Icon name="Search" size={20} className="text-neon" />
            </div>
            <div>
              <p className="font-body font-semibold text-foreground mb-2">Привлекаем лучших через «упаковку» вакансии</p>
              <p className="font-body text-base text-foreground/65 leading-relaxed">Используем маркетинговые инструменты и прямой поиск, чтобы выходить на пассивных кандидатов. Умеем так презентовать вакансию, что откликаются даже те, кто не планировал менять место.</p>
            </div>
          </FadeCard>
          <FadeCard delay={0.05} className="col-span-2 flex flex-col gap-4 bg-card rounded-2xl p-7" style={{boxShadow: "0 8px 32px rgba(192,64,0,0.12), 0 2px 8px rgba(192,64,0,0.06)"}}>
            <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-neon" />
            </div>
            <div>
              <p className="font-body font-semibold text-foreground mb-2">Не даём потерять финалиста на финише</p>
              <p className="font-body text-base text-foreground/65 leading-relaxed">Держим постоянный контакт с финалистом, первыми узнаём о встречных предложениях. Помогаем найти компромисс, чтобы сделка состоялась на выгодных для вас условиях.</p>
            </div>
          </FadeCard>
          <FadeCard delay={0.1} className="col-span-1 flex flex-col gap-4 bg-card rounded-2xl p-7" style={{boxShadow: "0 8px 32px rgba(192,64,0,0.12), 0 2px 8px rgba(192,64,0,0.06)"}}>
            <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center">
              <Icon name="BarChart2" size={20} className="text-neon" />
            </div>
            <div>
              <p className="font-body font-semibold text-foreground mb-2">Даём актуальную аналитику по зарплатам</p>
              <p className="font-body text-base text-foreground/65 leading-relaxed">Знаем реальные вилки и ожидания кандидатов в Иркутске — через нас ежемесячно проходят десятки офферов.</p>
            </div>
          </FadeCard>
          <FadeCard delay={0.15} className="col-span-1 flex flex-col gap-4 bg-card rounded-2xl p-7" style={{boxShadow: "0 8px 32px rgba(192,64,0,0.12), 0 2px 8px rgba(192,64,0,0.06)"}}>
            <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center">
              <Icon name="ClipboardCheck" size={20} className="text-neon" />
            </div>
            <div>
              <p className="font-body font-semibold text-foreground mb-2">Находим тех, кто приносит результат</p>
              <p className="font-body text-base text-foreground/65 leading-relaxed">Ориентируемся не на «красивый опыт», а на способность решать ваши бизнес-задачи.</p>
            </div>
          </FadeCard>
          <FadeCard delay={0.2} className="col-span-1 md:col-span-1 flex flex-col gap-4 bg-neon rounded-2xl p-7 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon name="ArrowRight" size={20} className="text-white" />
            </div>
            <div>
              <p className="font-body font-semibold text-white mb-2">Готовы начать?</p>
              <p className="font-body text-base text-white/80 leading-relaxed mb-4">Расскажите о вакансии — стартуем в день обращения.</p>
            </div>
          </FadeCard>
        </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-body text-xs text-neon uppercase tracking-widest">Что мы делаем</span>
          <h2 className="font-display text-5xl font-bold mt-3">НАШИ УСЛУГИ</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="case-card card-hover bg-card border border-border rounded-2xl p-8 group">
              <div className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center mb-6 group-hover:bg-neon/20 transition-colors">
                <Icon name={s.icon} size={22} className="text-neon" fallback="Star" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">{s.title}</h3>
              <p className="font-body text-muted-foreground leading-relaxed text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="font-body text-xs text-neon uppercase tracking-widest">Результаты в цифрах</span>
            <h2 className="font-display text-5xl font-bold mt-3">НАШИ КЕЙСЫ</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c) => (
              <div key={c.id} className="case-card card-hover bg-card border border-border rounded-2xl p-7 flex flex-col group">
                <div className="flex items-start justify-between mb-5">
                  <span className="inline-block bg-neon/10 border border-neon/20 text-neon font-body text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                    {c.tag}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-neon/10 transition-colors">
                    <Icon name={c.icon} size={18} className="text-muted-foreground group-hover:text-neon transition-colors" fallback="Briefcase" />
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold mb-3">{c.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{c.desc}</p>

                <div className="flex items-center gap-4 pt-5 border-t border-border">
                  <div>
                    <div className="font-display text-xl font-bold text-neon">{c.result}</div>
                    <div className="font-body text-xs text-muted-foreground">результат</div>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div>
                    <div className="font-display text-xl font-bold">{c.duration}</div>
                    <div className="font-body text-xs text-muted-foreground">срок</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-card/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="font-body text-xs text-neon uppercase tracking-widest">Частые вопросы</span>
            <h2 className="font-display text-5xl font-bold mt-3">ВОПРОСЫ И ОТВЕТЫ</h2>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { q: "Вопрос 1", a: "Ответ на вопрос 1 — текст появится позже." },
              { q: "Вопрос 2", a: "Ответ на вопрос 2 — текст появится позже." },
              { q: "Вопрос 3", a: "Ответ на вопрос 3 — текст появится позже." },
              { q: "Вопрос 4", a: "Ответ на вопрос 4 — текст появится позже." },
              { q: "Вопрос 5", a: "Ответ на вопрос 5 — текст появится позже." },
            ].map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 max-w-7xl mx-auto px-6">
        <div className="relative bg-card border border-neon/20 rounded-3xl p-10 md:p-16 overflow-hidden grain">
          <div className="absolute top-0 right-0 w-96 h-96 bg-neon/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-body text-xs text-neon uppercase tracking-widest">Готовы начать?</span>
              <h2 className="font-display text-5xl font-bold mt-3 mb-5">ОБСУДИМ<br />ВАШУ ЗАДАЧУ</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-8">
                Оставьте заявку — в течение 2 часов мы свяжемся и расскажем, как быстро закрыть вашу вакансию.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: "Phone", text: "+7 (3952) 00-00-00" },
                  { icon: "Mail", text: "hr@hr-irk.ru" },
                  { icon: "MapPin", text: "Иркутск, ул. Ленина, 1" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-neon/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={15} className="text-neon" fallback="Info" />
                    </div>
                    <span className="font-body text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {formStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-neon/15 flex items-center justify-center">
                    <Icon name="CheckCircle" size={28} className="text-neon" />
                  </div>
                  <p className="font-display text-2xl font-bold">Заявка отправлена!</p>
                  <p className="font-body text-muted-foreground">Мы свяжемся с вами в течение 2 часов.</p>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    className="bg-background border border-border rounded-xl px-5 py-4 font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-neon/60 transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Телефон"
                    value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    className="bg-background border border-border rounded-xl px-5 py-4 font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-neon/60 transition-colors"
                  />
                  <textarea
                    rows={4}
                    placeholder="Опишите вакансию или задачу"
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="bg-background border border-border rounded-xl px-5 py-4 font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-neon/60 transition-colors resize-none"
                  />
                  {formStatus === 'error' && (
                    <p className="font-body text-sm text-red-400">Что-то пошло не так. Попробуйте ещё раз.</p>
                  )}
                  <button
                    onClick={handleSubmit}
                    disabled={formStatus === 'sending' || !formData.name.trim() || !formData.phone.trim()}
                    className="bg-neon text-white font-body font-semibold py-4 rounded-xl hover:opacity-90 transition-all hover:scale-[1.02] text-base mt-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                  >
                    {formStatus === 'sending' ? 'Отправляем...' : 'Отправить заявку →'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 mb-4">
          <p className="font-body text-sm text-muted-foreground">* Срок на поиск линейного специалиста при условии, что условия по оплате не ниже среднерыночных.</p>
        </div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-bold">
            HR<span className="text-neon">·</span>ИРК
          </span>
          <span className="font-body text-xs text-muted-foreground">
            © 2008–2026 HR-Иркутск. Рекрутинговое агентство.
          </span>
          <div className="flex items-center gap-4">
            <button className="font-body text-xs text-muted-foreground hover:text-neon transition-colors">
              Политика конфиденциальности
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}