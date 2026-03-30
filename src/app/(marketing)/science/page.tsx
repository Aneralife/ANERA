"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ── Animated counter that counts up to a target number ─────── */
function useCountUp(target: number, duration = 1500) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    let raf: number;
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return { value, ref, started };
}

export default function SciencePage() {
  const counter = useCountUp(20, 1800);

  return (
    <>
      {/* Video Hero with Science Section */}
      <div className="science-video-hero">
        <video
          className="science-video-hero__bg"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/assets/science.webm" type="video/webm" />
        </video>
        <div className="science-video-hero__overlay" />
        <div className="science-video-hero__section">
          <div className="science-section__inner">
            <div className="science-visual reveal-left" ref={counter.ref}>
              <div className="science-big" aria-hidden="true">&lt;20</div>
              <div className={`science-big-overlay${counter.started ? " science-big-overlay--animated" : ""}`}>
                <div className="num">
                  &lt;{counter.value}
                </div>
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
                    ANERA&trade; NMN endotoxin is generally &lt;20 Eu/g
                  </strong>{" "}
                  without Lipopolysaccharide. Other NMN brands on the market may
                  contain 50&ndash;1000 Eu/g &mdash; up to 50&times; more contamination.
                </p>
              </div>
              <Link href="/products" className="btn-primary">
                Explore Products &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

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
                  <td>Broccoli</td>
                  <td>22 &ndash; 100 kg</td>
                </tr>
                <tr>
                  <td>Tomato</td>
                  <td>84 &ndash; 96 kg</td>
                </tr>
                <tr>
                  <td>Avocado</td>
                  <td>16 &ndash; 70 kg</td>
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
