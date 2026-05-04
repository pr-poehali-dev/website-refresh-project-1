export default function HighlightText() {
  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <blockquote className="border-l-4 pl-8" style={{ borderColor: '#c04000' }}>
          <p className="font-body text-xl text-foreground/80 leading-relaxed">
            Мы не копим устаревшие анкеты — рынок меняется слишком быстро. Вместо этого под каждую вакансию включаем технологии маркетинга и продаж: упаковываем, работаем с воронкой, ищем точечно. А ещё за 18 лет мы хорошо изучили местный рынок и часто просто знаем, кому ваше предложение может быть интересно уже сегодня. Так к вам приходят те, кто действительно готов к переменам, а не те, кто обновил резюме «на всякий случай».
          </p>
          <footer className="mt-4 font-body text-sm text-foreground/45">— Щепина Ирина, директор агентства «Перспектива»</footer>
        </blockquote>
      </div>
    </section>
  );
}
