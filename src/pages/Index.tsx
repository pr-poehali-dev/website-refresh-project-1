import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_BG = "https://cdn.poehali.dev/projects/32fc6043-456c-426f-a7ea-92d970737be3/files/0ab03755-f179-4741-8a6f-18114a72a3d4.jpg";

const stats = [
  { value: "500+", label: "закрытых вакансий" },
  { value: "8 лет", label: "на рынке Иркутска" },
  { value: "94%", label: "клиентов возвращаются" },
  { value: "30 дней", label: "средний срок подбора" },
];

const cases = [
  {
    id: 1,
    tag: "Производство",
    title: "Завод «СибМет»",
    desc: "Закрыли 12 инженерных вакансий за 25 дней, включая редкого специалиста по криогенным установкам.",
    result: "12 специалистов",
    duration: "25 дней",
    icon: "Factory",
  },
  {
    id: 2,
    tag: "IT & Digital",
    title: "Стартап «Baikal Dev»",
    desc: "Собрали команду из 8 разработчиков с нуля. Помогли выстроить HR-процессы и онбординг.",
    result: "8 разработчиков",
    duration: "40 дней",
    icon: "Code2",
  },
  {
    id: 3,
    tag: "Торговля",
    title: "Сеть «Сибирский стиль»",
    desc: "Подобрали управляющего для новой точки и 15 продавцов-консультантов по всему Иркутску.",
    result: "16 сотрудников",
    duration: "18 дней",
    icon: "ShoppingBag",
  },
  {
    id: 4,
    tag: "Финансы",
    title: "МФО «БайкалКредит»",
    desc: "Нашли финансового директора с опытом в микрофинансировании — задача, от которой отказались 3 агентства.",
    result: "1 топ-менеджер",
    duration: "35 дней",
    icon: "TrendingUp",
  },
  {
    id: 5,
    tag: "Медицина",
    title: "Клиника «МедЦентр+»",
    desc: "Укомплектовали штат трёх новых отделений: хирургия, кардиология, физиотерапия.",
    result: "22 врача",
    duration: "60 дней",
    icon: "Heart",
  },
  {
    id: 6,
    tag: "Строительство",
    title: "ГК «ВостокСтрой»",
    desc: "Сформировали топ-команду для крупнейшего жилого проекта региона — прораб, снабженец, главный инженер.",
    result: "3 руководителя",
    duration: "28 дней",
    icon: "Building2",
  },
];

const services = [
  {
    icon: "Search",
    title: "Точечный подбор",
    desc: "Находим специалистов, которых нет на hh.ru. Наши источники — закрытые базы и личные рекомендации.",
  },
  {
    icon: "Users",
    title: "Массовый найм",
    desc: "Комплектуем команды от 10 до 100+ человек в сжатые сроки без потери качества.",
  },
  {
    icon: "Award",
    title: "Executive Search",
    desc: "Поиск топ-менеджеров и редких экспертов. Работаем конфиденциально.",
  },
];

function useCountUp(target: string, duration = 1500) {
  const [display, setDisplay] = useState("0");
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
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
  }, []);

  return display;
}

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const count = useCountUp(value);
  return (
    <div
      className="text-center animate-fade-up"
      style={{ animationDelay: `${delay}s`, animationFillMode: "both" }}
    >
      <div className="font-display text-5xl font-bold text-neon neon-glow mb-2">{count}</div>
      <div className="text-sm text-muted-foreground uppercase tracking-widest font-body">{label}</div>
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="font-display text-xl font-bold tracking-wider">
            HR<span className="text-neon">·</span>ИРК
          </button>

          <div className="hidden md:flex items-center gap-8">
            {[["home", "Главная"], ["cases", "Кейсы"], ["services", "Услуги"], ["contact", "Контакты"]].map(([id, label]) => (
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

        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 rounded-full bg-orange-500/8 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 border border-neon/40 rounded-full px-4 py-1.5 mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              <span className="font-body text-xs text-neon uppercase tracking-widest">Рекрутинговое агентство · Иркутск</span>
            </div>

            <h1 className="font-display text-6xl md:text-8xl font-bold leading-none mb-6 animate-fade-up-delay-1">
              НАХОДИМ<br />
              <span className="text-neon neon-glow">ЛУЧШИХ.</span><br />
              БЫСТРО.
            </h1>

            <p className="font-body text-lg text-muted-foreground max-w-xl leading-relaxed mb-10 animate-fade-up-delay-2">
              Закрываем вакансии от линейного персонала до топ-менеджмента. Работаем с бизнесом Иркутска и Байкальского региона с 2016 года.
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
      <section className="border-y border-border py-16 bg-card/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <StatCard key={i} value={s.value} label={s.label} delay={i * 0.1} />
            ))}
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
              <input
                type="text"
                placeholder="Ваше имя"
                className="bg-background border border-border rounded-xl px-5 py-4 font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-neon/60 transition-colors"
              />
              <input
                type="tel"
                placeholder="Телефон"
                className="bg-background border border-border rounded-xl px-5 py-4 font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-neon/60 transition-colors"
              />
              <textarea
                rows={4}
                placeholder="Опишите вакансию или задачу"
                className="bg-background border border-border rounded-xl px-5 py-4 font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-neon/60 transition-colors resize-none"
              />
              <button className="bg-neon text-white font-body font-semibold py-4 rounded-xl hover:opacity-90 transition-all hover:scale-[1.02] text-base mt-1">
                Отправить заявку →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-bold">
            HR<span className="text-neon">·</span>ИРК
          </span>
          <span className="font-body text-xs text-muted-foreground">
            © 2016–2026 HR-Иркутск. Рекрутинговое агентство.
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