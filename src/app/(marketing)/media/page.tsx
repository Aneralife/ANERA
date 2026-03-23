export default function MediaPage() {
  return (
    <>
      {/* Media Hub */}
      <section className="media-section" style={{ paddingTop: 180 }}>
        <div className="media-section__inner">
          <div className="media-header reveal">
            <div>
              <p className="label">Media Hub</p>
              <h2 className="h2">Podcast + Articles.</h2>
            </div>
          </div>
          <div className="media-grid">
            {[
              {
                icon: "🧬",
                date: "March 9, 2026",
                title:
                  "Dr. Gabriel Alizaidy Joins the Anera Scientific Advisory Board",
              },
              {
                icon: "🫁",
                date: "March 5, 2026",
                title:
                  "VO₂ Max, Mitochondria, and NMN: How Oxygen Power Drives Longevity",
              },
              {
                icon: "⏱️",
                date: "February 24, 2026",
                title:
                  "How Long Does NMN Take to Work? Realistic Timeline From Day 1 to 6 Months",
              },
            ].map((article, i) => (
              <a
                key={i}
                href="#"
                className="article-card reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="article-card__img">{article.icon}</div>
                <div className="article-card__body">
                  <p className="article-card__date">{article.date}</p>
                  <h3 className="article-card__title">{article.title}</h3>
                  <span className="article-card__link">Read more →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker">
        <div className="ticker-track" aria-hidden="true">
          {[
            "Repair",
            "Regenerate",
            "Restore",
            "Energize",
            "Focus",
            "Optimize",
            "Protect",
            "Rejuvenate",
            "Longevity",
            "Repair",
            "Regenerate",
            "Restore",
            "Energize",
            "Focus",
            "Optimize",
            "Protect",
            "Rejuvenate",
            "Longevity",
          ].map((word, i) => (
            <span key={i}>{word}</span>
          ))}
        </div>
      </div>
    </>
  );
}
