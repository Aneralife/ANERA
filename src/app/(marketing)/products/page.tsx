"use client";

export default function ProductsPage() {
  function toggleFaq(btn: HTMLButtonElement) {
    const item = btn.closest(".faq-item");
    if (!item) return;
    const isOpen = item.classList.contains("open");
    document
      .querySelectorAll(".faq-item.open")
      .forEach((el) => el.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  }

  return (
    <>
      {/* Products */}
      <section className="products-section" style={{ paddingTop: 180 }}>
        <div className="products-section__inner">
          <p className="label reveal">Our Formulas</p>
          <h2
            className="h2 reveal"
            style={{ color: "var(--black)", marginBottom: 60 }}
          >
            Welcome to the New You.
          </h2>
          <div className="products-grid">
            <div className="product-card reveal-left">
              <div className="product-card__visual">
                <div className="bottle-3d">
                  <div className="bottle-label">
                    <span className="bottle-label-brand">Anera</span>
                    <span className="bottle-label-name">NMN</span>
                    <span className="bottle-label-dose">15000</span>
                  </div>
                </div>
              </div>
              <div className="product-card__body">
                <span className="product-card__tag tag-gold">Best Seller</span>
                <h3 className="product-card__name">NMN 15000</h3>
                <p className="product-card__desc">
                  250 mg · 60 capsules. Pharmaceutical-grade NMN with
                  industry-leading purity. Endotoxin &lt;20 Eu/g — the cleanest
                  NMN available.
                </p>
                <div className="product-card__price">
                  $105 CAD <small>/ 60 capsules</small>
                </div>
                <div className="product-card__actions">
                  <a href="#" className="btn-dark">
                    Buy Now
                  </a>
                  <a href="#" className="btn-outline-dark">
                    Learn More
                  </a>
                </div>
              </div>
            </div>

            <div className="product-card reveal-right">
              <div
                className="product-card__visual"
                style={{
                  background:
                    "linear-gradient(135deg,#060d1a 0%,#0d1a30 50%,#060d1a 100%)",
                }}
              >
                <div
                  className="bottle-3d"
                  style={{
                    background:
                      "linear-gradient(160deg,#1e3a5f 0%,#0a1628 100%)",
                  }}
                >
                  <div className="bottle-label">
                    <span className="bottle-label-brand">Anera</span>
                    <span className="bottle-label-name">NMN</span>
                    <span className="bottle-label-dose">24000</span>
                  </div>
                </div>
              </div>
              <div className="product-card__body">
                <span className="product-card__tag tag-blue">Advanced</span>
                <h3 className="product-card__name">NMN 24000</h3>
                <p className="product-card__desc">
                  400 mg · 60 capsules. Maximum-strength formula for peak
                  longevity. The only NMN in the world clinically tested in
                  human trials.
                </p>
                <div className="product-card__price">
                  $120 CAD <small>/ 60 capsules</small>
                </div>
                <div className="product-card__actions">
                  <a href="#" className="btn-dark">
                    Buy Now
                  </a>
                  <a href="#" className="btn-outline-dark">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="compare-section">
        <div className="compare-section__inner">
          <p className="label reveal" style={{ textAlign: "center" }}>
            Why Anera
          </p>
          <h2
            className="h2 reveal"
            style={{ textAlign: "center", marginBottom: 60 }}
          >
            The Ultimate
            <br />
            Longevity Powerhouse.
          </h2>
          <table className="compare-table reveal">
            <thead>
              <tr>
                <th>Feature</th>
                <th>ANERA NMN</th>
                <th>Generic NMN</th>
                <th>CoQ10</th>
                <th>Creatine</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Pharmaceutical-grade purity", "✓", "✗", "✗", "✗"],
                ["Endotoxin <20 Eu/g", "✓", "✗", "✗", "✗"],
                [
                  "Clinically tested in human trials",
                  "✓",
                  "✗",
                  "Limited",
                  "Limited",
                ],
                ["Directly boosts NAD+ levels", "✓", "✓", "✗", "✗"],
                [
                  "No Lipopolysaccharide contamination",
                  "✓",
                  "✗",
                  "—",
                  "—",
                ],
              ].map((row, i) => (
                <tr key={i}>
                  <td>{row[0]}</td>
                  {row.slice(1).map((cell, j) => (
                    <td key={j}>
                      <span className={cell === "✓" ? "check" : "cross"}>
                        {cell}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Superfood */}
      <section className="superfood-section">
        <div className="superfood-section__inner">
          <div className="reveal-left">
            <p className="label">Why NMN?</p>
            <h2 className="h2" style={{ marginBottom: 24 }}>
              Nature&apos;s Most
              <br />
              Potent Molecule.
            </h2>
            <p className="body-lg" style={{ marginBottom: 40 }}>
              To get the equivalent of 250 mg of NMN from whole foods,
              you&apos;d need to eat an extraordinary amount. Supplementation is
              the only practical path.
            </p>
            <table className="sf-table">
              <thead>
                <tr>
                  <th>Superfood</th>
                  <th>Equivalent to 250 mg NMN</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>🥦 Broccoli</td>
                  <td>22 – 100 kg</td>
                </tr>
                <tr>
                  <td>🍅 Tomato</td>
                  <td>84 – 96 kg</td>
                </tr>
                <tr>
                  <td>🥑 Avocado</td>
                  <td>16 – 70 kg</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="sf-visual reveal-right">
            <div className="sf-circle">
              <div className="sf-circle-num">250</div>
              <div className="sf-circle-unit">mg NMN</div>
            </div>
            <p className="sf-caption">
              One capsule. Once daily.
              <br />
              All the NAD+ support your cells need.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="faq-section__inner">
          <p className="label reveal">Common Questions</p>
          <h2 className="h2 reveal" style={{ marginBottom: 60 }}>
            Everything You
            <br />
            Need to Know.
          </h2>
          {[
            {
              q: "What products does ANERA NMN replace?",
              a: "Anera doesn't replace a specific product — it offers a superior alternative. Our focus is on providing premium supplements that prioritise purity, efficacy, and transparency, setting a new standard for quality in the industry.",
            },
            {
              q: "What benefits can I expect from taking ANERA?",
              a: "Users commonly report increased energy levels, improved mental clarity and focus, better sleep quality, enhanced physical endurance, and a general sense of vitality. Results typically become noticeable within 2–4 weeks of consistent use.",
            },
            {
              q: "What makes ANERA NMN different from other supplements?",
              a: "Anera is the only NMN supplement in the world clinically tested in human trials. Our endotoxin levels are consistently below 20 Eu/g — far below the industry average of 50–1000 Eu/g. We manufacture to pharmaceutical-grade standards with full transparency.",
            },
            {
              q: "What measures does ANERA take to ensure quality?",
              a: "Every batch undergoes rigorous third-party testing for purity, potency, and safety. We test for endotoxins, heavy metals, microbial contamination, and verify NMN concentration. Our manufacturing facilities meet pharmaceutical-grade GMP standards.",
            },
          ].map((item, i) => (
            <div key={i} className="faq-item">
              <button
                className="faq-q"
                onClick={(e) => toggleFaq(e.currentTarget)}
              >
                {item.q}
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-a">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
