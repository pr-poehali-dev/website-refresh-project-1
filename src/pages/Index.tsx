import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import AboutAnimation from "@/components/AboutAnimation";
import CaseModal, { type CaseData } from "@/components/CaseModal";



const HERO_BG = "https://cdn.poehali.dev/projects/32fc6043-456c-426f-a7ea-92d970737be3/files/0ab03755-f179-4741-8a6f-18114a72a3d4.jpg";

const stats = [
  { value: "2300+", label: "закрытых вакансий — от малого бизнеса до крупных корпораций", icon: "Briefcase", desc: "с 2008 года" },
  { value: "18 лет", label: "локальной экспертизы — знаем где искать и чем мотивировать", icon: "MapPin", desc: "на рынке Иркутска" },
  { value: "96%", label: "клиентов выбирают нас снова. Строим партнёрство на годы", icon: "RefreshCw", desc: "высокий NPS" },
  { value: "14 дней", label: "средний срок подбора, старт поиска в день обращения", icon: "Timer", desc: "от заявки до оффера", footnote: true },
];

const cases: CaseData[] = [
  {
    id: 1,
    tag: "Торговля",
    title: "Подбор главного бухгалтера для розничной сети автозапчастей",
    desc: "Предыдущие кандидаты не справлялись с объёмом и спецификой розницы. Нашли специалиста с релевантным опытом и закрыли позицию за 13 дней.",
    result: "1 специалист",
    duration: "13 дней",
    icon: "Calculator",
    fullContent: {
      situation: {
        title: "Ситуация клиента",
        text: "Розничная сеть автозапчастей искала главного бухгалтера. На первый взгляд — стандартная позиция, но по факту:",
        items: [
          "несколько торговых точек",
          "высокая операционная нагрузка",
          "товарный учет и складские остатки",
          "необходимость держать под контролем всю финансовую картину",
          "предыдущие кандидаты не справлялись с объёмом и спецификой розницы",
        ],
      },
      target: {
        title: "Кого искали на самом деле",
        text: "Формально — главный бухгалтер. Фактически — специалист, который:",
        items: [
          "имеет опыт в розничной сети (желательно с товарным учетом)",
          "понимает специфику учета автозапчастей",
          "умеет работать с большим количеством операций",
          "выстраивает процессы, а не просто «ведёт учет»",
          "способен держать под контролем финансовую дисциплину",
        ],
      },
      preparation: {
        title: "Что сделали до старта поиска",
        text: "Перед запуском:",
        items: [
          "сформировали портрет кандидата с акцентом на розничный опыт",
          "уточнили структуру компании и объём операций",
          "определили ключевые зоны риска (учет товара, сверки, нагрузка)",
          "убрали из требований второстепенные критерии",
        ],
      },
      vacancy: {
        title: "Как переписали вакансию",
        text: "Сместили акцент на:",
        items: [
          "масштаб и структуру бизнеса",
          "уровень ответственности",
          "реальные задачи (а не формальные обязанности)",
          "понятную зону влияния",
        ],
      },
      search: {
        title: "Как искали",
        text: "Использовали комбинированный подход с упором на точечный поиск:",
        items: [
          "подбор кандидатов из розничных сетей и компаний с товарным учетом",
          "работа с релевантным опытом, а не «универсальными бухгалтерами»",
          "персонализированные приглашения",
        ],
      },
      funnel: [
        { label: "Приглашения", value: "32" },
        { label: "Первичных контактов", value: "21" },
        { label: "Собеседований", value: "14" },
        { label: "Кандидатов в шорт-листе", value: "5" },
        { label: "Представлено клиенту", value: "3" },
        { label: "Вышел на работу", value: "1" },
      ],
      challenges: {
        title: "Основные сложности",
        items: [
          "важно было сочетание: розница + управленческий уровень",
          "высокая нагрузка — не все кандидаты готовы к такому объёму",
          "кандидаты с опытом в автозапчастях — узкий сегмент",
          "необходимо было оценить системность и внимательность, а не только опыт",
        ],
      },
      outcome: {
        title: "Результат",
        text: "Позиция закрыта за 13 дней. Кандидат:",
        items: [
          "имеет релевантный опыт в розничной сети",
          "быстро погрузился в процессы",
          "взял под контроль учет и финансовую дисциплину",
        ],
      },
      conclusion: {
        title: "Вывод",
        text: "В подборе главного бухгалтера для розницы ключевую роль играет не просто опыт, а понимание операционной нагрузки и товарного учета. Результат в этом кейсе обеспечили:",
        items: [
          "точный профиль кандидата",
          "фокус на релевантном опыте",
          "качественная оценка на этапе интервью",
        ],
      },
    },
  },
  {
    id: 2,
    tag: "B2B продажи",
    title: "Подбор менеджера по продажам B2B (премиальные смазочные материалы)",
    desc: "Предыдущие кандидаты не могли обосновать премиальную цену. Нашли нишевого специалиста с техническим пониманием продукта — позиция закрыта за 17 дней.",
    result: "1 специалист",
    duration: "17 дней",
    icon: "Handshake",
    fullContent: {
      situation: {
        title: "Ситуация клиента",
        text: "Компания — поставщик премиальных смазочных материалов — искала менеджера по продажам в B2B-сегменте. Клиенты — производственные предприятия и компании с собственным подвижным составом (тяжёлая техника, транспорт). Предыдущие кандидаты:",
        items: [
          "либо не могли обосновать премиальную цену",
          "либо не понимали, как продукт влияет на эксплуатацию техники",
        ],
      },
      target: {
        title: "Кого искали на самом деле",
        text: "Формально — менеджер по продажам. Фактически — специалист, который:",
        items: [
          "понимает экономику эксплуатации техники, а не только продукт",
          "умеет продавать через ценность, а не цену",
          "разбирается в смазочных материалах и их применении",
          "способен вести диалог с техническими специалистами клиента",
          "работает с долгим циклом сделки и развитием клиентов",
        ],
      },
      preparation: {
        title: "Что сделали до старта поиска",
        text: "Перед поиском сфокусировали задачу:",
        items: [
          "определили, какие знания критичны (техника + продукт)",
          "зафиксировали, как именно продаётся премиум-сегмент",
          "выделили ключевые аргументы ценности (ресурс, износ, простои)",
          "сузили целевые компании для поиска",
          "синхронизировали ожидания с клиентом: нужен не «универсальный продавец», а нишевый специалист",
        ],
      },
      vacancy: {
        title: "Как переписали вакансию",
        text: "Сместили акцент на:",
        items: [
          "работу с премиальным продуктом и сложными клиентами",
          "экспертную роль в продажах",
          "влияние на эффективность бизнеса клиента",
          "прозрачную и достижимую систему дохода",
        ],
      },
      search: {
        title: "Как искали",
        text: "Сделали упор на прямой поиск:",
        items: [
          "хантинг из сегментов: смазочные материалы, запчасти, тяжёлая техника",
          "поиск специалистов, уже работающих с промышленными клиентами",
          "персонализированные предложения с акцентом на продукт и рынок",
          "работа с кандидатами, которые не откликаются на стандартные вакансии",
        ],
      },
      funnel: [
        { label: "Приглашения", value: "58" },
        { label: "Первичных контактов", value: "36" },
        { label: "Собеседований", value: "22" },
        { label: "Кандидатов в шорт-листе", value: "8" },
        { label: "Представлено клиенту", value: "3" },
        { label: "Вышел на работу", value: "1" },
      ],
      challenges: {
        title: "Основные сложности",
        items: [
          "редкое сочетание: продажи + понимание техники + продуктовая экспертиза",
          "необходимость продавать дорогой продукт через экономику, а не скидки",
          "кандидаты с нужным опытом редко находятся в активном поиске",
          "важно было оценить глубину понимания, а не «общий опыт в продажах»",
        ],
      },
      outcome: {
        title: "Результат",
        text: "Позиция закрыта за 17 дней. Кандидат:",
        items: [
          "имеет релевантный опыт в сегменте",
          "умеет аргументировать ценность премиального продукта",
          "ведёт диалог на уровне технических специалистов клиента",
        ],
      },
      conclusion: {
        title: "Вывод",
        text: "В продажах премиального B2B-продукта выигрывает не тот, кто «лучше продаёт», а тот, кто глубже понимает бизнес клиента. В этом кейсе результат дали:",
        items: [
          "чёткая фокусировка на нужной экспертизе",
          "правильная упаковка роли",
          "работа с узким, но релевантным рынком",
        ],
      },
    },
  },
  {
    id: 3,
    tag: "Ритейл",
    title: "Подбор продавцов-консультантов премиальной бытовой техники в шоурум",
    desc: "Рынок перегрет, хорошие продавцы не ищут работу активно. Нашли двух специалистов уровня бренда через точечный хантинг за 14 дней.",
    result: "2 специалиста",
    duration: "14 дней",
    icon: "ShoppingBag",
    fullContent: {
      situation: {
        title: "Ситуация клиента",
        text: "Клиент — шоурум премиальной бытовой техники — искал продавцов-консультантов. Задача звучала стандартно, но по факту была сложнее: нужны не «продавцы», а специалисты, которые умеют работать с дорогим продуктом и соответствующей аудиторией. На старте:",
        items: [
          "низкая конверсия из откликов",
          "кандидаты без нужного уровня сервиса",
          "риск «сжечь» клиентов неподходящими сотрудниками",
        ],
      },
      target: {
        title: "Кого искали на самом деле",
        text: "Формально — продавец-консультант. Фактически — человек, который:",
        items: [
          "умеет продавать премиальный продукт, а не «скидки и акции»",
          "чувствует клиента и работает через сервис, а не давление",
          "умеет презентовать сложный технический продукт простым языком",
          "выглядит и коммуницирует на уровне бренда",
        ],
      },
      preparation: {
        title: "Что сделали до старта поиска",
        text: "Сначала «собрали» позицию:",
        items: [
          "сформировали портрет кандидата (опыт, стиль коммуникации, поведенка)",
          "уточнили сценарий продаж и тип клиента",
          "выявили, какие кандидаты точно не подойдут (даже с опытом)",
          "усилили привлекательность вакансии: продукт, шоурум, уровень клиентов",
        ],
      },
      vacancy: {
        title: "Как переписали вакансию",
        text: "Сместили акцент с обязанностей на:",
        items: [
          "работу с премиальным сегментом",
          "качество взаимодействия с клиентом",
          "продукт, который «продаёт себя», но требует грамотной презентации",
          "понятную систему дохода",
        ],
      },
      search: {
        title: "Как искали",
        text: "Откликов было недостаточно, поэтому подключили активный поиск:",
        items: [
          "хантинг продавцов из премиум-сегмента (техника, мебель, интерьеры)",
          "поиск кандидатов с сильным сервисом, даже если продукт отличался",
          "персонализированные приглашения",
          "работали не по количеству, а по качеству контакта",
        ],
      },
      funnel: [
        { label: "Приглашения", value: "85" },
        { label: "Первичных контактов", value: "52" },
        { label: "Собеседований", value: "34" },
        { label: "Кандидатов в шорт-листе", value: "12" },
        { label: "Представлено клиенту", value: "6" },
        { label: "Вышли на работу", value: "2" },
      ],
      challenges: {
        title: "Основные сложности",
        items: [
          "рынок перегрет: хорошие продавцы уже работают и не ищут работу активно",
          "разрыв между «продавцом» и «консультантом премиум-сегмента»",
          "важно было оценить не только продажи, но и уровень сервиса и коммуникации",
          "часть сильных кандидатов не готова работать в шоуруме (ожидания ≠ реальность)",
        ],
      },
      outcome: {
        title: "Результат",
        text: "За 14 дней закрыты 2 позиции. Оба кандидата:",
        items: [
          "соответствуют уровню бренда",
          "быстро вошли в работу",
          "показывают уверенное взаимодействие с клиентами",
        ],
      },
      conclusion: {
        title: "Вывод",
        text: "В таких вакансиях решает не опыт «в продажах в целом», а:",
        items: [
          "понимание сегмента",
          "точный портрет кандидата",
          "умение находить тех, кто уже работает на нужном уровне",
        ],
      },
    },
  },
  {
    id: 4,
    tag: "Производство",
    title: "Подбор менеджеров по продажам B2B в производственную компанию (горнодобывающая отрасль)",
    desc: "Узкий рынок, длинный цикл сделки, сложный технический продукт. Нашли двух специалистов с релевантным опытом в B2B — оба вышли за 18 дней.",
    result: "2 специалиста",
    duration: "18 дней",
    icon: "HardHat",
    fullContent: {
      situation: {
        title: "Ситуация клиента",
        text: "Производственная компания (оборудование и запасные части для горнодобывающей отрасли) искала менеджера по продажам B2B. На старте задача выглядела как «нужен продажник», но по факту:",
        items: [
          "длинный цикл сделки",
          "сложный технический продукт",
          "работа с промышленными предприятиями",
          "необходимость выстраивать отношения, а не просто «продавать»",
        ],
      },
      target: {
        title: "Кого искали на самом деле",
        text: "Формально — менеджер по продажам. Фактически — специалист, который:",
        items: [
          "имеет опыт в B2B-продажах сложного продукта",
          "понимает специфику промышленного рынка",
          "умеет вести длинные сделки и переговоры",
          "способен самостоятельно развивать направление",
        ],
      },
      preparation: {
        title: "Что сделали до старта поиска",
        text: "Сначала «разобрали» позицию:",
        items: [
          "сформировали портрет кандидата (опыт, тип клиентов, стиль продаж)",
          "уточнили реальный цикл сделки и ожидания по результату",
          "определили, какие кандидаты точно не подойдут",
          "убрали лишние требования, чтобы не сужать воронку",
        ],
      },
      vacancy: {
        title: "Как переписали вакансию",
        text: "Сместили акцент с формального списка задач на:",
        items: [
          "уровень клиентов (промышленные предприятия)",
          "сложность и ценность продукта",
          "роль в развитии продаж",
          "прозрачную систему дохода",
        ],
      },
      search: {
        title: "Как искали",
        text: "Основной упор сделали на прямой поиск:",
        items: [
          "хантинг из смежных производственных и технических компаний",
          "работа с кандидатами вне активного поиска",
          "персонализированные предложения",
        ],
      },
      funnel: [
        { label: "Приглашения", value: "55" },
        { label: "Первичных контактов", value: "34" },
        { label: "Собеседований", value: "21" },
        { label: "Кандидатов в шорт-листе", value: "8" },
        { label: "Представлено клиенту", value: "4" },
        { label: "Вышли на работу", value: "2" },
      ],
      challenges: {
        title: "Основные сложности",
        items: [
          "узкий рынок кандидатов с релевантным опытом",
          "необходимость сочетания продаж и технического понимания",
          "длинный цикл сделки — не все кандидаты готовы к такому формату",
          "часть сильных специалистов не рассматривает нишевые отрасли",
        ],
      },
      outcome: {
        title: "Результат",
        text: "В процессе финального отбора оба кандидата полностью соответствовали задаче. Вместо выбора одного было принято решение вывести обоих. Оба специалиста:",
        items: [
          "имеют релевантный опыт в B2B",
          "быстро погрузились в продукт",
          "начали развивать клиентскую базу",
        ],
      },
      conclusion: {
        title: "Вывод",
        text: "Сильный подбор — это не только «закрыть вакансию», а дать бизнесу выбор. Точная настройка поиска, работа с релевантным рынком и качественная оценка кандидатов позволили:",
        items: [
          "не просто закрыть позицию",
          "а усилить команду сразу двумя сильными специалистами",
        ],
      },
    },
  },
  {
    id: 5,
    tag: "Финансы",
    title: "МФО «БайкалКредит»",

    desc: "Три агентства отказались от задачи. Мы нашли финансового директора с редкой специализацией — компания прошла проверку ЦБ без нареканий.",
    result: "1 топ-менеджер",
    duration: "35 дней",
    icon: "TrendingUp",
  },
  {
    id: 6,
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
  const [activeCase, setActiveCase] = useState<CaseData | null>(null);
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
    <>
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
            {[["home", "Главная"], ["services", "О нас"], ["steps", "Этапы"], ["cases", "Кейсы"], ["contact", "Контакты"]].map(([id, label]) => (
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
            {[["home", "Главная"], ["services", "О нас"], ["steps", "Этапы"], ["cases", "Кейсы"], ["contact", "Контакты"]].map(([id, label]) => (
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
        {/* Блок проблем — bento grid */}
        <h2 className="font-display text-5xl font-bold mb-8">Ищете надёжного сотрудника, но при этом :</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20" style={{gridTemplateRows: "auto"}}>
          <FadeCard delay={0} className="col-span-2 flex flex-col gap-4 bg-card rounded-2xl p-7" style={{boxShadow: "0 8px 32px rgba(192,64,0,0.12), 0 2px 8px rgba(192,64,0,0.06)"}}>
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Icon name="Bot" size={20} className="text-red-400" />
            </div>
            <div>
              <p className="font-body font-semibold text-foreground mb-2">Кандидаты пишут резюме с помощью ChatGPT</p>
              <p className="font-body text-base text-foreground/65 leading-relaxed">Кандидат красиво расписал свой опыт, а на собеседовании выясняется, что резюме за него сделала нейросеть. Сам он уже не помнит половины терминов. Время в очередной раз потрачено зря.</p>
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
            <div className="border-l-4 pl-4" style={{borderColor: '#c04000'}}>
              <p className="font-body font-semibold mb-2" style={{color: '#c04000'}}>В результате:</p>
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

      {/* ABOUT */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="font-display text-5xl font-bold">Почему наш подход работает</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <p className="font-body text-lg text-foreground/75 leading-relaxed mb-6">
              Рынок труда за последние годы изменился до неузнаваемости. Кандидаты стали требовательнее, скорость принятия решений выросла, а старые методы поиска перестали давать результат. Мы прошли через все эти изменения и научились работать в новых условиях.
            </p>
            <p className="font-body text-lg text-foreground/75 leading-relaxed">
              Сегодня мы совмещаем 18-летнюю экспертизу подбора персонала с современными инструментами маркетинга и продаж.<br />Вакансия — такой же продукт, как и любой другой. Мы умеем её «упаковать» и донести до нужной аудитории. Сделать заметной именно для <span style={{color: '#c04000'}}>Вашего</span> кандидата, который, возможно, не находился в активном поиске работы.
            </p>
          </div>
          <AboutAnimation />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FadeCard delay={0} className="case-card rounded-xl p-5 group cursor-default overflow-hidden" style={{background: '#c04000'}}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{background: 'rgba(255,255,255,0.15)'}}>
              <Icon name="MapPin" size={18} fallback="Star" className="text-white" />
            </div>
            <h3 className="font-display text-lg font-bold mb-2 text-white">Глубокое знание локального рынка</h3>
            <p className="font-body text-white/80 leading-relaxed text-base">Мы понимаем, кто, где и за сколько работает в Иркутске и области. Это <strong className="text-white">экономит ваше время</strong> на старте.</p>
          </FadeCard>
          <FadeCard delay={0.15} className="case-card rounded-xl p-5 group cursor-default overflow-hidden" style={{background: '#c04000'}}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{background: 'rgba(255,255,255,0.15)'}}>
              <Icon name="Megaphone" size={18} fallback="Star" className="text-white" />
            </div>
            <h3 className="font-display text-lg font-bold mb-2 text-white">Специализация рекрутеров по направлениям</h3>
            <p className="font-body text-white/80 leading-relaxed text-base">Вашу вакансию ведёт эксперт в вашей сфере. Находит нужных людей <strong className="text-white">быстрее и точнее</strong>, потому что знает рынок изнутри.</p>
          </FadeCard>
          <FadeCard delay={0.3} className="case-card rounded-xl p-5 group cursor-default overflow-hidden" style={{background: '#c04000'}}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{background: 'rgba(255,255,255,0.15)'}}>
              <Icon name="RefreshCw" size={18} fallback="Star" className="text-white" />
            </div>
            <h3 className="font-display text-lg font-bold mb-2 text-white">Адаптация к меняющимся условиям</h3>
            <p className="font-body text-white/80 leading-relaxed text-base">Рынок штормит — мы подстраиваем стратегию поиска под текущую реальность, а не действуем по шаблону.</p>
          </FadeCard>
        </div>
      </section>

      {/* STEPS */}
      <section id="steps" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="font-body text-xs text-neon uppercase tracking-widest">Как мы работаем</span>
            <h2 className="font-display text-5xl font-bold mt-3">ЭТАПЫ РАБОТЫ</h2>
          </div>
          <div className="flex flex-col gap-0">
            {[
              { n: "1", title: "Составляем портрет кандидата и анализируем рынок", desc: "Получите чёткое понимание, кто именно вам нужен, и актуальную вилку зарплат в Иркутске. Отталкивайтесь от реальных цифр, а не от догадок." },
              { n: "2", title: "Фиксируем план и реалистичные сроки", desc: "Знайте, когда ждать первых финалистов и когда сотрудник выйдет на работу. Планируйте ресурсы без сюрпризов." },
              { n: "3", title: "Упаковываем вакансию и запускаем прямой поиск", desc: "Получайте внимание кандидатов, которые не находятся в активном поиске. Мы доносим ценность вашей компании через точечные каналы и рекомендации." },
              { n: "4", title: "Проводим многоступенчатый отбор", desc: "Не тратьте время на отсев неподходящих резюме. До личной встречи дойдут только те, кто прошёл интервью, тесты и проверку рекомендаций." },
              { n: "5", title: "Готовим подробное заключение на финалистов", desc: "Встречайтесь с мотивированными кандидатами и выбирайте лучшего, опираясь на объективные данные: сильные стороны, зоны роста, факты." },
              { n: "6", title: "Сопровождаем оффер и контролируем выход", desc: null },
            ].map((step, i) => (
              <FadeCard key={i} delay={i * 0.07} className="group grid md:grid-cols-[100px_1fr] gap-6 items-start py-8 border-b border-border last:border-0">
                <span className="font-display text-8xl font-bold text-neon leading-none">{step.n}</span>
                <div className="pt-2">
                  <h3 className="font-display text-xl font-bold mb-2">{step.title}</h3>
                  {step.desc !== null
                    ? <p className="font-body text-muted-foreground leading-relaxed">{step.desc}</p>
                    : <p className="font-body text-muted-foreground leading-relaxed">Предлагайте условия и будьте спокойны: мы держим контакт с кандидатом до первого рабочего дня. Если на испытательном сроке что-то не складывается — <strong className="text-neon">бесплатно находим замену</strong>.</p>
                  }
                </div>
              </FadeCard>
            ))}
          </div>
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
              <div
                key={c.id}
                onClick={() => setActiveCase(c)}
                className="case-card bg-card border border-border rounded-2xl p-7 flex flex-col group hover:-translate-y-2 hover:shadow-xl hover:shadow-black/10 hover:border-neon/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="inline-block bg-neon/10 border border-neon/20 text-neon font-body text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                    {c.tag}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-neon/10 transition-colors">
                    <Icon name={c.icon} size={18} className="text-muted-foreground group-hover:text-neon transition-colors" fallback="Briefcase" />
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold mb-3">{c.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{c.desc}</p>

                <div className="flex items-center justify-between pt-5 border-t border-border">
                  <div className="flex items-center gap-4">
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
                  {c.fullContent && (
                    <span className="flex items-center gap-1 font-body text-xs text-neon group-hover:gap-2 transition-all">
                      Подробнее <Icon name="ArrowRight" size={14} />
                    </span>
                  )}
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
            © 2008–2026 Перспектива. Рекрутинговое агентство.
          </span>
          <div className="flex items-center gap-4">
            <button className="font-body text-xs text-muted-foreground hover:text-neon transition-colors">
              Политика конфиденциальности
            </button>
          </div>
        </div>
      </footer>
    </div>

    <CaseModal case_={activeCase} onClose={() => setActiveCase(null)} />
    </>
  );
}