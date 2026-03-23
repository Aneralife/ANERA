import Link from "next/link";

export default function SciencePage() {
  return (
    <>
      {/* Science */}
      <section className="science-section" style={{ paddingTop: 180 }}>
        <div className="science-section__inner">
          <div className="science-visual reveal-left">
            <div className="science-big">&lt;20</div>
            <div className="science-big-overlay">
              <div className="num">&lt;20</div>
              <div className="unit">Eu/g</div>
              <div className="caption">Endotoxin Units per gram</div>
            </div>
          </div>
          <div className="science-text reveal-right">
            <p className="label">The Science</p>
            <h2 className="h2" style={{ marginBottom: 24 }}>
              Endotoxin-Free.
              <br />
              By Design.
            </h2>
            <p className="body-lg" style={{ marginBottom: 32 }}>
              In 2022, Dr. David Sinclair revealed that most NMN supplements
              were contaminated with endotoxin. Anera was built to be different
              from day one.
            </p>
            <div className="science-callout">
              <p>
                <strong>
                  ANERA™ NMN endotoxin is generally &lt;20 Eu/g
                </strong>{" "}
                without Lipopolysaccharide. Other NMN brands on the market may
                contain 50–1000 Eu/g — up to 50× more contamination.
              </p>
            </div>
            <Link href="/products" className="btn-primary">
              Explore Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-row">
        <div className="stats-row__inner">
          <div className="stat reveal">
            <div className="stat__num">
              &lt;20<sup>Eu/g</sup>
            </div>
            <div className="stat__label">
              Endotoxin level
              <br />
              Industry&apos;s lowest
            </div>
          </div>
          <div className="stat reveal" style={{ transitionDelay: ".1s" }}>
            <div className="stat__num">
              100<sup>%</sup>
            </div>
            <div className="stat__label">
              Pharmaceutical-grade
              <br />
              purity standard
            </div>
          </div>
          <div className="stat reveal" style={{ transitionDelay: ".2s" }}>
            <div className="stat__num">2</div>
            <div className="stat__label">
              Clinically tested
              <br />
              human trial formulas
            </div>
          </div>
          <div className="stat reveal" style={{ transitionDelay: ".3s" }}>
            <div className="stat__num">
              31<sup>+</sup>
            </div>
            <div className="stat__label">
              Verified Google
              <br />
              reviews
            </div>
          </div>
        </div>
      </div>

      {/* Superfood / Why NMN */}
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
    </>
  );
}
