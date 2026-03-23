import Link from "next/link";

export default function PillarsPage() {
  return (
    <>
      {/* Pillars */}
      <section className="pillars-section" style={{ paddingTop: 180 }}>
        <div className="pillars-section__inner">
          <div className="pillars-header">
            <div className="reveal-left">
              <p className="label">Our Framework</p>
              <h2 className="h2">
                Five Pillars
                <br />
                of Longevity.
              </h2>
            </div>
            <p className="body-lg reveal-right">
              Every Anera product is built around five foundational principles of
              human performance and healthy aging.
            </p>
          </div>
          <div className="pillars-grid">
            {[
              {
                num: "01",
                icon: "⚡",
                name: "Energize",
                desc: "Fuel your body with lasting, cellular vitality from within.",
              },
              {
                num: "02",
                icon: "🎯",
                name: "Focus",
                desc: "Sharpen your mind and enhance mental clarity every day.",
              },
              {
                num: "03",
                icon: "📈",
                name: "Optimize",
                desc: "Elevate your performance in every aspect of life.",
              },
              {
                num: "04",
                icon: "🛡️",
                name: "Protect",
                desc: "Safeguard your cells from the effects of aging.",
              },
              {
                num: "05",
                icon: "✨",
                name: "Rejuvenate",
                desc: "Restore youthfulness from the inside out.",
              },
            ].map((p, i) => (
              <div
                key={p.num}
                className="pillar reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="pillar__num">{p.num}</div>
                <div className="pillar__icon">{p.icon}</div>
                <div className="pillar__name">{p.name}</div>
                <div className="pillar__desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mission-section">
        <div className="mission-section__inner">
          <p className="mission-eyebrow reveal">Mission · Story · Promise</p>
          <h2 className="mission-title reveal">
            Built to
            <br />
            <em>Heal Humanity.</em>
          </h2>
          <p className="mission-body reveal">
            The story of Anera is rooted in a single purpose: to help heal
            humanity by delivering the world&apos;s most advanced, pure, and
            effective longevity formulations. We believe health is the
            foundation of a life well-lived — and those who seek the best
            deserve uncompromising quality.
          </p>
          <Link href="/products" className="btn-primary reveal">
            Shop Products →
          </Link>
        </div>
      </section>
    </>
  );
}
