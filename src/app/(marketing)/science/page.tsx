"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

/* ── Five Pillars data ────────────────────────────────────────── */
const PILLARS = [
  {
    id: "energize",
    label: "Energize",
    color: "#000000",
    video: "/assets/energy.webm",
    
    desc: "NMN fuels your mitochondria — the powerhouses of your cells — by replenishing NAD+ levels. The result is sustained, clean energy production that combats the fatigue of aging at its cellular root.",
    benefits: [
      "Boosts mitochondrial function and ATP output",
      "Combats chronic fatigue at the cellular level",
      "Supports stamina for physical and mental performance",
      "Helps maintain energy consistency throughout the day",
    ],
  },
  {
    id: "focus",
    label: "Focus",
    color: "#000000",
    video: "/assets/focus.webm",
   
    desc: "Your brain is the most NAD+-hungry organ in your body. By restoring optimal NAD+ levels, NMN supports sharp cognition, faster neural signaling, and the mental clarity that often diminishes with age.",
    benefits: [
      "Supports cognitive function and mental clarity",
      "Enhances neural NAD+ metabolism",
      "May improve memory retention and recall",
      "Promotes neuroprotection against oxidative stress",
    ],
  },
  {
    id: "protect",
    label: "Protect",
    color: "#000000",
    video: "/assets/protect.webm",
  
    desc: "NMN activates sirtuins — proteins often called \"longevity genes\" — which are central to cellular repair, inflammation control, and defense against the DNA damage that accumulates over a lifetime.",
    benefits: [
      "Activates SIRT1 and other longevity-linked sirtuins",
      "Supports DNA repair mechanisms",
      "Reduces systemic inflammatory markers",
      "Fortifies cellular defense against oxidative damage",
    ],
  },
  {
    id: "optimize",
    label: "Optimize",
    color: "#000000",
    video: "/assets/optimize.webm",
   
    desc: "NAD+ plays a foundational role in how your body processes nutrients and maintains metabolic balance. NMN helps regulate glucose metabolism, insulin sensitivity, and weight management from within.",
    benefits: [
      "Improves insulin sensitivity and glucose regulation",
      "Supports healthy body composition",
      "Promotes efficient nutrient utilization",
      "Linked to cardiovascular and metabolic health markers",
    ],
  },
  {
    id: "rejuvenate",
    label: "Rejuvenate",
    color: "#000000",
    video: "/assets/rejuvenate.webm",
   
    desc: "NMN helps activate the cellular recycling process known as autophagy, clearing damaged components and stimulating renewal. The result is skin, tissue, and organ systems that function with renewed vitality.",
    benefits: [
      "Stimulates autophagy — the body's cellular clean-up process",
      "Supports collagen synthesis and skin health",
      "Promotes tissue regeneration and recovery",
      "Contributes to a more youthful physiological age",
    ],
  },
];

const NMN_INFO = {
  desc: "Nicotinamide Mononucleotide (NMN) is a naturally occurring molecule that serves as a direct precursor to NAD+, the vital coenzyme your cells need to produce energy, repair DNA, and regulate biological processes linked to aging.",
  benefits: [
    "Precursor to NAD+ — the molecule of cellular energy",
    "Naturally present in trace amounts in foods like broccoli and avocado",
    "Declines significantly with age, contributing to fatigue and cellular stress",
    "Supplementation helps restore youthful NAD+ levels throughout the body",
    "Backed by research at leading longevity institutions worldwide",
  ],
};

export default function SciencePage() {
  const counter = useCountUp(20, 1800);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const [showNmn, setShowNmn] = useState(false);
  const orbitRef = useRef<HTMLDivElement>(null);

  function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) { audio.play(); setAudioPlaying(true); }
    else { audio.pause(); setAudioPlaying(false); }
  }

  /* Position pillar nodes around orbit */
  useEffect(() => {
    function positionNodes() {
      const container = orbitRef.current;
      if (!container) return;
      const w = container.offsetWidth;
      const cx = w / 2, cy = w / 2, r = w * 0.365;
      PILLARS.forEach((p, i) => {
        const angle = (-90 + (360 / 5) * i) * Math.PI / 180;
        const el = container.querySelector(`[data-pillar="${p.id}"]`) as HTMLElement | null;
        if (el) {
          el.style.left = `${cx + r * Math.cos(angle)}px`;
          el.style.top = `${cy + r * Math.sin(angle)}px`;
        }
      });
    }
    positionNodes();
    window.addEventListener("resize", positionNodes);
    return () => window.removeEventListener("resize", positionNodes);
  }, []);

  const closeModal = useCallback(() => { setActivePillar(null); setShowNmn(false); }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeModal]);

  const activeData = PILLARS.find((p) => p.id === activePillar);

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
                Endotoxin Free.
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
              <p className="science-study-link">
                <a href="https://www.frontiersin.org/journals/aging/articles/10.3389/fragi.2022.851698/full" target="_blank" rel="noopener noreferrer">
                  Read the Clinical Study: A Multicentre, Randomised, Double Blind, Placebo Controlled Study to Evaluate the Efficacy and Safety of Uthever (NMN Supplement) &rarr;
                </a>
              </p>
              <Link href="/products" className="btn-primary">
                Explore Products &rarr;
              </Link>
            </div>
          </div>
          <div className="science-audio-wrap">
            <audio ref={audioRef} src="/assets/science.mp3" loop preload="none" />
            <button className={`inline-audio-btn inline-audio-btn--dark${audioPlaying ? " playing" : ""}`} onClick={toggleAudio} aria-label={audioPlaying ? "Pause music" : "Play music"}>
              {audioPlaying ? (
                <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg> Pause</>
              ) : (
                <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19" /><path d="M15.54 8.46a5 5 0 010 7.07" /></svg> Listen</>
              )}
            </button>
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
              99<sup>%</sup>
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
        <video className="superfood-section__bg" autoPlay muted loop playsInline>
          <source src="/assets/hand.webm" type="video/webm" />
        </video>
        <div className="superfood-section__overlay" />
        <div className="superfood-section__inner superfood-section__inner--centered">
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
        </div>
      </section>

      {/* ── Five Pillars of Longevity ────────────────────────────── */}
      <section className="fp-section">
        <video className="fp-section__bg" autoPlay muted loop playsInline>
          <source src="/assets/science-background.webm" type="video/webm" />
        </video>
        <div className="fp-section__overlay" />
        <div className="fp-header">
          <p className="fp-eyebrow">Science-Backed Longevity</p>
          <h2 className="fp-title">The Five Pillars of Longevity</h2>
          <p className="fp-sub">Powered by Anera NMN &mdash; Click to explore</p>
        </div>

        <div className="fp-layout">
          {/* Left — orbit */}
          <div className="fp-layout__left">
            <div className="fp-orbit" ref={orbitRef}>
              <div className="fp-nmn-rays" />
              <div className="fp-nmn-glow" />
              <div className="fp-pulse" />
              <div className="fp-pulse fp-pulse--delayed" />

              <svg className="fp-rings" viewBox="0 0 640 640">
                <circle cx="320" cy="320" r="235" fill="none" stroke="var(--fp-ring)" strokeWidth="1" strokeDasharray="4 6" />
                <circle cx="320" cy="320" r="145" fill="none" stroke="var(--fp-ring-inner)" strokeWidth="0.5" />
                {PILLARS.map((p, i) => {
                  const angle = (-90 + (360 / 5) * i) * Math.PI / 180;
                  const x = 320 + 235 * Math.cos(angle);
                  const y = 320 + 235 * Math.sin(angle);
                  return <line key={p.id} x1="320" y1="320" x2={x} y2={y} stroke={`${p.color}30`} strokeWidth="0.5" strokeDasharray="3 5" />;
                })}
              </svg>

              <button className="fp-nmn" onClick={() => { setActivePillar(null); setShowNmn(true); }} aria-label="What is NMN?">
                <video className="fp-nmn__video" autoPlay muted loop playsInline>
                  <source src="/assets/cold-blue.webm" type="video/webm" />
                </video>
                <div className="fp-nmn__content" />
              </button>

              {PILLARS.map((p) => (
                <button
                  key={p.id}
                  data-pillar={p.id}
                  className={`fp-node fp-node--${p.id}${activePillar === p.id ? " fp-node--active" : ""}`}
                  onClick={() => { setShowNmn(false); setActivePillar(p.id); }}
                  aria-label={p.label}
                >
                  <video className="fp-node__video" autoPlay muted loop playsInline>
                    <source src={p.video} type="video/webm" />
                  </video>
                </button>
              ))}
            </div>
          </div>

          {/* Right — info panel */}
          <div className="fp-layout__right">
            {showNmn ? (
              <div className="fp-info fp-info--visible">
                
                <p className="fp-info__eyebrow">The Science Behind It All</p>
                <h3 className="fp-info__title" style={{ color: "#000000" }}>What is NMN?</h3>
                <p className="fp-info__desc">{NMN_INFO.desc}</p>
                <ul className="fp-info__list">
                  {NMN_INFO.benefits.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ) : activeData ? (
              <div className="fp-info fp-info--visible" key={activeData.id}>
                
                <p className="fp-info__eyebrow">Pillar {PILLARS.indexOf(activeData) + 1} of 5</p>
                <h3 className="fp-info__title" >{activeData.label}</h3>
                <p className="fp-info__desc">{activeData.desc}</p>
                <ul className="fp-info__list">
                  {activeData.benefits.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ) : (
              <div className="fp-info fp-info--empty">
                <p className="fp-info__placeholder">Click a pillar or NMN to explore</p>
              </div>
            )}
          </div>
        </div>

        <div className="fp-mission">
          <p className="fp-mission__lead">At Anera, our mission is simple: to help you, and through you, help humanity.</p>
          <p>The science behind NMN is rooted in supporting the body at its foundation &mdash; restoring cellular energy, strengthening resilience, and protecting long-term health as we age.</p>
          <p>By focusing on purity, safety, and real science, we are committed to delivering solutions that empower people to live stronger, recover better, and thrive longer.</p>
          <p className="fp-mission__emphasis">This is more than a supplement.</p>
          <p className="fp-mission__emphasis">This is our commitment to building a healthier future &mdash; one life at a time.</p>
        </div>
      </section>
    </>
  );
}
