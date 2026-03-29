"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ── Carousel hook (Apple Store behaviour) ───────────────────── */
const GUTTER_PCT = 0.074; // 7.4 % left gutter on page 0

function useCarousel(itemWidth: number, gap: number, perPage: number) {
  const slideRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  const measure = useCallback(() => {
    const slide = slideRef.current;
    if (!slide) return;
    const totalItems = slide.children.length;
    const max = Math.max(0, Math.ceil(totalItems / perPage) - 1);
    setMaxPage(max);
  }, [perPage]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const go = useCallback(
    (i: number) => {
      const next = Math.max(0, Math.min(i, maxPage));
      setPage(next);

      const slide = slideRef.current;
      const inner = innerRef.current;
      if (!slide || !inner) return;

      const step = itemWidth + gap;
      const gutterPx = window.innerWidth * GUTTER_PCT;

      if (next === 0) {
        // Page 0: restore left gutter, transform to origin
        inner.style.paddingLeft = `${gutterPx}px`;
        slide.style.transform = "translateX(0)";
      } else {
        // Page 1+: remove left gutter, shift so previous-page's last card peeks in
        inner.style.paddingLeft = "0";
        const offset = next * perPage * step - gutterPx;
        slide.style.transform = `translateX(-${offset}px)`;
      }
    },
    [maxPage, itemWidth, gap, perPage],
  );

  return { slideRef, innerRef, page, maxPage, go, measure };
}

/* ── Data ────────────────────────────────────────────────────── */
const catItems = [
  { label: "NMN + TR 24000", img: "/assets/24000 NMN.png", available: true, href: "#nmn24000" },
  { label: "NMN 15000", img: "/assets/15000 NMN.png", available: true, href: "#" },
  { label: "NMN 7500", img: "/assets/7500 NMN.png", available: false, href: "#" },
  { label: "NMN 100000", img: "/assets/NMN Powder.png", available: false, href: "#" },
  { label: "Trans-Resveratrol", img: "/assets/TR.png", available: false, href: "#" },
  { label: "Fisetin 6000", img: "/assets/Fisetin.png", available: false, href: "#" },
  { label: "Quercetin 45000", img: "/assets/Quercentin.png", available: false, href: "#" },
  { label: "Berberine 45000", img: "/assets/Berberin.png", available: false, href: "#" },
  { label: "TMG 45000", img: "/assets/TMG.png", available: false, href: "#" },
  { label: "Selenium 24000", img: "/assets/Selenium.png", available: false, href: "#" },
  { label: "Magnesium L-Threonate", img: "/assets/Magnesium.png", available: false, href: "#" },
  { label: "Creatine 300000", img: "/assets/Creatine.png", available: false, href: "#" },
  { label: "Taurine 300000", img: "/assets/Taurine.png", available: false, href: "#" },
];

type PCard = {
  name: string;
  cat: string;
  desc: string;
  price: string;
  img: string;
  imgHover?: string;
  available: boolean;
  bestSeller?: boolean;
};

const productCards: PCard[] = [
  { name: "NMN + Trans-Resveratrol 24000", cat: "NAD+ Booster", desc: "250mg NMN + 150mg Trans-Resveratrol \u00b7 60 capsules. Boosts NAD+, fights oxidative stress, and supports cellular repair.", price: "$120 CAD", img: "/assets/24000 NMN.png", imgHover: "/assets/NMN 24000-1.jpeg", available: true, bestSeller: true },
  { name: "NMN 15000", cat: "NAD+ Booster", desc: "250mg per capsule \u00b7 60 capsules. Higher-potency NAD+ support for stronger energy and cellular repair.", price: "$105 CAD", img: "/assets/15000 NMN.png", available: true },
  { name: "NMN 7500", cat: "NAD+ Booster", desc: "125mg per capsule \u00b7 60 capsules. Supports NAD+, energy, and cellular health. Ideal entry-level daily dose.", price: "Price TBD", img: "/assets/7500 NMN.png", available: false },
  { name: "NMN 100000", cat: "NAD+ Booster", desc: "Pure NMN powder \u00b7 100g. Maximum NAD+ support with flexible dosing and rapid sublingual absorption.", price: "Price TBD", img: "/assets/NMN Powder.png", available: false },
  { name: "Trans-Resveratrol 45000", cat: "Antioxidant", desc: "500mg per capsule \u00b7 90 capsules. Fights free radicals, supports heart health, and promotes healthy aging.", price: "Price TBD", img: "/assets/TR.png", available: false },
  { name: "Fisetin 6000", cat: "Longevity / Senolytic", desc: "100mg per capsule \u00b7 60 capsules. Supports cellular cleanup, brain health, and anti-inflammatory effects.", price: "Price TBD", img: "/assets/Fisetin.png", available: false },
  { name: "Quercetin 45000", cat: "Antioxidant / Immune", desc: "500mg per capsule \u00b7 90 capsules. Strong antioxidant that supports immunity and reduces inflammation.", price: "Price TBD", img: "/assets/Quercentin.png", available: false },
  { name: "Berberine 45000", cat: "Metabolic", desc: "500mg per capsule \u00b7 90 capsules. Supports glucose balance, improves metabolism, and promotes heart health.", price: "Price TBD", img: "/assets/Berberin.png", available: false },
  { name: "TMG 45000", cat: "Methylation Support", desc: "500mg per capsule \u00b7 90 capsules. Supports homocysteine balance, promotes heart health, and aids cellular methylation.", price: "Price TBD", img: "/assets/TMG.png", available: false },
  { name: "Selenium 24000", cat: "Mineral", desc: "200mcg per capsule \u00b7 90 capsules. Supports immune system, promotes thyroid function, and provides antioxidant protection.", price: "Price TBD", img: "/assets/Selenium.png", available: false },
  { name: "Magnesium L-Threonate 4500", cat: "Mineral / Brain Health", desc: "50mg per capsule \u00b7 90 capsules. Improves memory, enhances focus, and supports overall brain health.", price: "Price TBD", img: "/assets/Magnesium.png", available: false },
  { name: "Micronized Creatine 300000", cat: "Performance", desc: "Powder \u00b7 300g. Increases power output, supports muscle recovery, and enhances athletic performance.", price: "Price TBD", img: "/assets/Creatine.png", available: false },
  { name: "Taurine 300000", cat: "Mineral / Performance", desc: "Powder \u00b7 300g. Improves endurance, supports cardiovascular health, and aids post-exercise recovery.", price: "Price TBD", img: "/assets/Taurine.png", available: false },
];

const compSupplements = [
  { feature: "Directly boosts NAD+ levels", info: "Measured by blood NAD+ levels", anera: "check", coq10: "check", creatine: "x", resveratrol: "Partial", generic: "Partial" },
  { feature: "Targets root cause of age-related energy decline", info: "Addresses mitochondrial dysfunction", anera: "check", coq10: "Partial", creatine: "x", resveratrol: "Partial", generic: "Partial" },
  { feature: "Pharmaceutical-grade purity", info: "", anera: "check", coq10: "x", creatine: "x", resveratrol: "x", generic: "x" },
  { feature: "Human clinically tested", info: "", anera: "check", coq10: "Limited", creatine: "check", resveratrol: "Limited", generic: "x" },
  { feature: "Endotoxin <20 Eu/g", info: "", anera: "check", coq10: "x", creatine: "x", resveratrol: "x", generic: "x" },
  { feature: "Dual-action (NAD+ + antioxidant)", info: "", anera: "check", coq10: "x", creatine: "x", resveratrol: "Partial", generic: "x" },
];

const compNad = [
  { feature: "Directly boosts NAD+ levels", anera: "check", tru: "check", alive: "check", renue: "check" },
  { feature: "Pharmaceutical-grade purity", anera: "check", tru: "x", alive: "x", renue: "x" },
  { feature: "Human clinically tested", anera: "check", tru: "x", alive: "x", renue: "x" },
  { feature: "Endotoxin <20 Eu/g", anera: "check", tru: "x", alive: "x", renue: "x" },
  { feature: "Trans-Resveratrol included", anera: "check", tru: "x", alive: "x", renue: "x" },
  { feature: "Dual-action (NAD+ + antioxidant)", anera: "check", tru: "x", alive: "Partial", renue: "x" },
];

const benefitTabs = [
  { id: "energy", label: "Energy", number: "78", unit: "%", statLabel: "of participants reported increased sustained energy within 30 days", title: "Sustained All-Day Energy", text: "NMN directly fuels NAD+ production in every cell, restoring the metabolic efficiency that declines with age. Unlike caffeine, which masks fatigue, NMN addresses the root cause.", source: "Igarashi et al., 2022 \u2014 Randomized, double-blind, placebo-controlled" },
  { id: "aging", label: "Cellular Aging", number: "38", unit: "%", statLabel: "improvement in key biomarkers of cellular aging over 60 days", title: "Reverse Cellular Clock", text: "NAD+ activates sirtuins \u2014 the \"longevity genes\" \u2014 that repair DNA damage and regulate epigenetic aging. Higher NAD+ levels are directly linked to slower biological aging.", source: "Yi et al., 2023 \u2014 NAD+ and sirtuin activation study" },
  { id: "brain", label: "Brain Health", number: "2.4", unit: "\u00d7", statLabel: "faster cognitive processing speed versus placebo group", title: "Sharper Mind, Faster Recall", text: "The brain consumes 20% of the body\u2019s energy. NMN ensures mitochondria in neurons operate at peak efficiency, supporting memory, focus, and neuroprotection against age-related decline.", source: "Niu et al., 2021 \u2014 Neurological benefits of NMN" },
  { id: "sleep", label: "Sleep Quality", number: "62", unit: "%", statLabel: "of users reported improved sleep quality within 3 weeks", title: "Deeper, More Restorative Sleep", text: "NAD+ is essential for circadian rhythm regulation. By restoring NAD+ levels, NMN helps synchronize your internal clock, leading to deeper REM cycles and more restorative sleep.", source: "Levine et al., 2020 \u2014 NAD+ and circadian biology" },
  { id: "cardio", label: "Cardiovascular", number: "29", unit: "%", statLabel: "improvement in vascular elasticity in clinical studies", title: "Healthier Heart & Vessels", text: "NMN improves endothelial function, the lining of blood vessels responsible for healthy blood flow. Combined with Trans-Resveratrol\u2019s cardioprotective properties, it offers comprehensive cardiovascular support.", source: "de Picciotto et al., 2016 \u2014 NMN and vascular aging" },
];

const timelinePanels = [
  { id: "week1", label: "Week 1-2", time: "1-2", unit: "Weeks", pct: 20, desc: "Initial cellular NAD+ replenishment begins", title: "Foundation Phase", text: "Your cells begin absorbing NMN and converting it to NAD+. Blood NAD+ levels start rising within 24 hours. Most people notice subtle improvements in morning alertness and reduced afternoon energy dips." },
  { id: "month1", label: "Month 1", time: "30", unit: "Days", pct: 45, desc: "Noticeable energy and clarity improvements", title: "Activation Phase", text: "Sirtuin enzymes are now consistently activated. Users typically report sustained energy throughout the day, improved mental clarity, and better sleep quality. Exercise recovery may also improve." },
  { id: "month3", label: "Month 3", time: "90", unit: "Days", pct: 75, desc: "Significant biomarker improvements measurable", title: "Optimization Phase", text: "Clinical biomarkers show measurable improvement: better cholesterol ratios, improved fasting glucose, and enhanced vascular function. Skin quality often improves as cellular repair accelerates." },
  { id: "month6", label: "Month 6+", time: "6+", unit: "Months", pct: 100, desc: "Full systemic benefits and long-term protection", title: "Protection Phase", text: "NAD+ levels are now consistently elevated. Long-term benefits include sustained DNA repair, ongoing sirtuin activation, and cumulative protection against age-related cellular decline. This is where the true longevity benefits compound." },
];

const reviews = [
  { author: "Nofella Auliya", verified: true, stars: 5, title: "Game-changer for my skin", text: "I\u2019ve been using Anera for a few months now, and I can honestly say it\u2019s been a game-changer for my skin, especially when it comes to managing acne and eczema. This supplement works from the inside out, and I\u2019ve seen noticeable improvements since I started. If you\u2019re struggling with skin issues, I really recommend giving Anera a shot!", date: "1 year ago" },
  { author: "Janet L", verified: true, stars: 5, title: "No more midday fatigue", text: "After consistent daily use for 6 months, I can say I am extremely pleased with the benefits of taking NMN. No more feeling fatigue mid day, my hair looks fuller and my skin feels more plump. Definitely recommend for those who need a boost in their daily lifestyle.", date: "1 year ago" },
  { author: "Abraham Aguirre Castro", verified: true, stars: 5, title: "Boosted my energy throughout the day", text: "It has boost my energy throughout the day.", date: "1 year ago" },
  { author: "Daniel De La Cruz", verified: true, stars: 5, title: "Replaced my daily vitamins with Anera", text: "Being a competitive bodybuilder, I tried NMN for 1 month and stopped taking preworkout. I was able to push through intense training, focus and clarity improved, and my wrist pain was gone after 3 weeks! My cardio performance was better than expected. I\u2019ve replaced my daily vitamins with ANERA 24000 NMN + TR. #HEALTHISWEALTH", date: "1 year ago" },
  { author: "Tammy Watson", verified: true, stars: 5, title: "Better sleep, more energy, weight loss", text: "I started taking Anera NMN as I was transitioning off anxiety and depression medication. I found that I was able to sleep well and wake up feeling refreshed. My skin started to brighten up and my metabolism is kicking back in. Now I find I have energy to work out in the morning, and the scale is moving again.", date: "1 year ago" },
  { author: "Qui Tran", verified: true, stars: 5, title: "Best product I have tried", text: "Hands down best product I have tried. Lots of energy when using compared to other brands.", date: "1 year ago" },
  { author: "Jose Ram\u00edrez", verified: true, stars: 5, title: "Energy, joint pain relief, mental clarity", text: "I\u2019ve been taking Anera for two weeks now, and from the very first days, I noticed an increase in my energy levels. I\u2019ve dealt with joint pain my entire life from playing football, but in just two weeks, that pain has almost completely disappeared. My mental clarity improved and I\u2019m getting much more done in a single day.", date: "1 year ago" },
  { author: "Damien Henderson", verified: true, stars: 5, title: "So much energy throughout the day", text: "Anera product is definitely a supplement you should purchase! I\u2019ve tried the NMN 60 capsule bottle first, and the product is legit \u2014 I have so much energy throughout the day! Now I just reloaded on 2 bottles of the NMN Trans. Highly recommend!", date: "1 year ago" },
];

const faqs = [
  { q: "What is NMN and how does it work?", a: "NMN (Nicotinamide Mononucleotide) is a naturally occurring molecule that your body converts directly into NAD+, a critical coenzyme involved in over 500 enzymatic reactions. As we age, NAD+ levels decline by up to 50% every 20 years. NMN supplementation directly replenishes NAD+, supporting energy metabolism, DNA repair, and cellular health." },
  { q: "What makes Anera different from other NMN supplements?", a: "Anera is the only NMN supplement in the world clinically tested in human trials. Our endotoxin levels are consistently below 20 Eu/g — far below the industry average of 50–1000 Eu/g. We manufacture to pharmaceutical-grade standards, include Trans-Resveratrol for dual-action benefits, and provide full transparency with third-party testing documentation." },
  { q: "When will I start seeing results?", a: "Most users report initial improvements in energy and mental clarity within 1-2 weeks. More significant benefits like improved sleep quality, better exercise recovery, and enhanced biomarkers typically develop over 1-3 months of consistent use. Long-term benefits continue to compound over 6+ months." },
  { q: "Is NMN safe? Are there any side effects?", a: "NMN has been extensively studied in both animal and human clinical trials with an excellent safety profile. Our pharmaceutical-grade NMN is manufactured under strict GMP conditions and undergoes rigorous third-party testing. No significant adverse effects have been reported in clinical studies at recommended dosages." },
  { q: "How should I take NMN + Trans-Resveratrol 24000?", a: "Take 1 capsule daily with a meal, preferably in the morning. The Trans-Resveratrol component is fat-soluble, so taking it with food enhances absorption. Consistency is key — daily supplementation maintains optimal NAD+ levels for maximum benefit." },
  { q: "Can I take NMN with other supplements or medications?", a: "NMN is generally well-tolerated alongside other supplements. However, if you are taking prescription medications, particularly blood thinners or diabetes medications, we recommend consulting your healthcare provider before starting any new supplement regimen." },
];

/* ── Arrow SVG ───────────────────────────────────────────────── */
function ArrowSvg({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
      <path d={dir === "prev" ? "M8 2L2 8L8 14" : "M2 2L8 8L2 14"} stroke="#1d1d1f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Cell renderer ───────────────────────────────────────────── */
function CompCell({ val, gold }: { val: string; gold?: boolean }) {
  if (val === "check")
    return <span className={`st-check-icon${gold ? " st-check-icon--gold" : ""}`}>&#10003;</span>;
  if (val === "x")
    return <span className="st-x-icon">&#8856;</span>;
  if (val === "Partial")
    return <span className="st-partial-text">Partial</span>;
  if (val === "Limited")
    return <span className="st-limited-text">Limited</span>;
  return <span>{val}</span>;
}

/* ══════════════════════════════════════════════════════════════ */
export default function StorePage() {
  const [compMode, setCompMode] = useState<"supplements" | "nad">("supplements");
  const [activeTab, setActiveTab] = useState("energy");
  const [activeTimeline, setActiveTimeline] = useState("week1");
  const topCarousel = useCarousel(120, 0, 8);   // 8 icons per page
  const botCarousel = useCarousel(400, 20, 3);  // 3 cards per page

  /* reveal on scroll */
  useEffect(() => {
    const els = document.querySelectorAll(".st-reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* re-measure carousels after mount & set initial gutter */
  const topMeasure = topCarousel.measure;
  const botMeasure = botCarousel.measure;
  const topGo = topCarousel.go;
  const botGo = botCarousel.go;
  useEffect(() => {
    topMeasure(); botMeasure();
    // set initial padding from JS so it stays in sync with GUTTER_PCT
    topGo(0); botGo(0);
  }, [topMeasure, botMeasure, topGo, botGo]);

  function addToCart() {
    // TODO: integrate with cart state
  }

  return (
    <>
      {/* ── Store Hero ────────────────────────────────────────── */}
      <div className="st-hero">
        <div className="st-hero__inner st-reveal">
          <h1 className="st-hero__title">Store.</h1>
          <div className="st-hero__right">
            <p className="st-hero__tagline">The best way to buy the longevity supplements you love.</p>
          </div>
        </div>
      </div>

      {/* ── Top Carousel — icon shelf ─────────────────────────── */}
      <div className="st-shelf st-shelf--gray">
        <button className={`st-arrow st-arrow--prev${topCarousel.page <= 0 ? " hidden" : ""}`} onClick={() => topCarousel.go(topCarousel.page - 1)} aria-label="Previous"><ArrowSvg dir="prev" /></button>
        <button className={`st-arrow st-arrow--next${topCarousel.page >= topCarousel.maxPage ? " hidden" : ""}`} onClick={() => topCarousel.go(topCarousel.page + 1)} aria-label="Next"><ArrowSvg dir="next" /></button>
        <div className="st-shelf__inner" ref={topCarousel.innerRef}>
          <div className="st-shelf__track">
            <div className="st-shelf__slide" ref={topCarousel.slideRef}>
              {catItems.map((item, i) => (
                <a key={i} href={item.href} className={`st-cat-item${item.available ? " available" : " unavailable"}`}>
                  <div className="st-cat-item__img-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.img} alt={item.label} className="st-cat-item__img" />
                  </div>
                  <span className="st-cat-item__label">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="st-dots">
          {Array.from({ length: topCarousel.maxPage + 1 }).map((_, i) => (
            <button key={i} className={`st-dot${i === topCarousel.page ? " active" : ""}`} onClick={() => topCarousel.go(i)} />
          ))}
        </div>
      </div>

      {/* ── Bottom Carousel — product cards ───────────────────── */}
      <div style={{ background: "var(--bg-alt, #f5f5f7)" }}>
        <div className="st-latest-header st-reveal">
          <h2 className="st-latest-header__title">The latest.&nbsp;<span className="st-latest-header__sub">Take a look at what&#39;s new, right now.</span></h2>
        </div>
        <div className="st-shelf st-shelf--transparent st-latest-pad" style={{ borderBottom: "1px solid var(--border, #e8e8ed)" }}>
          <button className={`st-arrow st-arrow--prev${botCarousel.page <= 0 ? " hidden" : ""}`} onClick={() => botCarousel.go(botCarousel.page - 1)} aria-label="Previous"><ArrowSvg dir="prev" /></button>
          <button className={`st-arrow st-arrow--next${botCarousel.page >= botCarousel.maxPage ? " hidden" : ""}`} onClick={() => botCarousel.go(botCarousel.page + 1)} aria-label="Next"><ArrowSvg dir="next" /></button>
          <div className="st-shelf__inner" ref={botCarousel.innerRef}>
            <div className="st-shelf__track">
              <div className="st-shelf__slide" ref={botCarousel.slideRef}>
                {productCards.map((card, i) => (
                  <a key={i} href="#" className={`st-pcard${card.available ? " available" : " unavailable"}`} onClick={(e) => e.preventDefault()}>
                    <div className="st-pcard__inner">
                      <div className="st-pcard__badges">
                        <span className="st-pcard__badges-left">
                          {card.available && <span className="st-pcard__badge st-badge--available">Available</span>}
                          {!card.available && <span className="st-pcard__badge st-badge--soon">Coming Soon</span>}
                        </span>
                        {card.bestSeller && <span className="st-pcard__badge st-badge--bestseller">Best Seller</span>}
                      </div>
                      <div className="st-pcard__img-wrap">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={card.img} alt={card.name} className="st-pcard__img" />
                        {card.imgHover && (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={card.imgHover} alt={card.name} className="st-pcard__img st-pcard__img--hover" />
                        )}
                      </div>
                      <div className="st-pcard__info">
                        <div className="st-pcard__cat">{card.cat}</div>
                        <div className="st-pcard__name">{card.name}</div>
                        <div className="st-pcard__desc">{card.desc}</div>
                        <div className="st-pcard__footer">
                          <span className="st-pcard__price" style={!card.available ? { color: "var(--fg-muted, #86868b)" } : undefined}>{card.price}</span>
                          {card.available ? (
                            <button className="st-pcard__add" onClick={(e) => { e.preventDefault(); addToCart(); }}>Add</button>
                          ) : (
                            <span className="st-pcard__soon-lbl">Coming soon</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="st-dots">
            {Array.from({ length: botCarousel.maxPage + 1 }).map((_, i) => (
              <button key={i} className={`st-dot${i === botCarousel.page ? " active" : ""}`} onClick={() => botCarousel.go(i)} />
            ))}
          </div>
        </div>
      </div>

      {/* ── NMN 24000 Product Section Intro ───────────────────── */}
      <div className="st-product-intro" id="nmn24000">
        <div className="st-product-intro__left st-reveal">
          <h2>NMN + Trans-Resveratrol 24000<br />The Ultimate Longevity Powerhouse.</h2>
          <p>250mg NMN + 150mg Trans-Resveratrol per capsule. The only NMN clinically tested in human trials, with &lt;20 Eu/g endotoxin &mdash; the lowest purity standard in the industry.</p>
          <div className="st-product-intro__badge-row">
            <span className="st-pill st-pill--gold">&#9733; Best Seller</span>
            <span className="st-pill st-pill--white">Pharmaceutical Grade</span>
            <span className="st-pill st-pill--white">Human Clinically Tested</span>
            <span className="st-pill st-pill--white">&lt;20 Eu/g Endotoxin</span>
          </div>
        </div>
        <div className="st-product-intro__right st-reveal st-reveal-delay-1">
          <div className="st-price-main">$120 <span style={{ fontSize: 22, fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>CAD</span></div>
          <div className="st-price-sub">or from $96/mo with Subscribe &amp; Save</div>
          <button className="st-btn-buy" onClick={addToCart}>Add to Cart</button>
        </div>
      </div>

      {/* ── Comparison ────────────────────────────────────────── */}
      <section className="st-comparison" id="compare">
        <div className="st-comparison__inner">
          <div className="st-comparison-header st-reveal">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 24, flexWrap: "wrap" as const }}>
              <span className="st-comparison-toggle-label">Compare us to other</span>
              <div className="st-comparison-toggle">
                <button className={`st-toggle-btn${compMode === "supplements" ? " active" : ""}`} onClick={() => setCompMode("supplements")}>Supplements</button>
                <button className={`st-toggle-btn${compMode === "nad" ? " active" : ""}`} onClick={() => setCompMode("nad")}>NAD+ Boosters</button>
              </div>
            </div>
            <h2 className="st-comparison-title">The Ultimate Longevity<br />Powerhouse</h2>
          </div>

          {/* Supplements table */}
          {compMode === "supplements" && (
            <div className="st-comparison-table-wrap st-reveal">
              <table className="st-comparison-table">
                <thead>
                  <tr>
                    <th style={{ width: "30%" }}></th>
                    <th>
                      <div className="st-product-col-header" style={{ background: "var(--card-bg, #fff)", borderRadius: "20px 20px 0 0" }}>
                        <div className="st-product-col-img" style={{ background: "var(--fg, #1d1d1f)", color: "white", fontSize: 20, fontWeight: 800 }}>A</div>
                        <span className="st-product-col-brand st-product-col-brand--gold">anera</span>
                        <div className="st-product-col-name">NMN + TR 24000</div>
                      </div>
                    </th>
                    <th><div className="st-product-col-header"><div className="st-product-col-img" style={{ background: "#f59e0b" }}>&#127997;</div><div className="st-product-col-name">CoQ10</div></div></th>
                    <th><div className="st-product-col-header"><div className="st-product-col-img" style={{ background: "#e5e7eb" }}>&#9898;</div><div className="st-product-col-name">Creatine</div></div></th>
                    <th><div className="st-product-col-header"><div className="st-product-col-img" style={{ background: "#7c3aed", color: "white" }}>&#128995;</div><div className="st-product-col-name">Resveratrol</div></div></th>
                    <th><div className="st-product-col-header"><div className="st-product-col-img" style={{ background: "#e5e7eb" }}>&#9898;</div><div className="st-product-col-name">Generic NMN</div></div></th>
                  </tr>
                </thead>
                <tbody>
                  {compSupplements.map((row, i) => (
                    <tr key={i}>
                      <td><div className="st-feature-info">{row.feature}{row.info && <span className="st-info-icon" title={row.info}>&#9432;</span>}</div></td>
                      <td style={{ background: "var(--card-bg, #fff)" }}><CompCell val={row.anera} gold /></td>
                      <td><CompCell val={row.coq10} /></td>
                      <td><CompCell val={row.creatine} /></td>
                      <td><CompCell val={row.resveratrol} /></td>
                      <td><CompCell val={row.generic} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* NAD+ table */}
          {compMode === "nad" && (
            <div className="st-comparison-table-wrap st-reveal">
              <table className="st-comparison-table">
                <thead>
                  <tr>
                    <th style={{ width: "30%" }}></th>
                    <th>
                      <div className="st-product-col-header" style={{ background: "var(--card-bg, #fff)", borderRadius: "20px 20px 0 0" }}>
                        <div className="st-product-col-img" style={{ background: "var(--fg, #1d1d1f)", color: "white", fontSize: 20, fontWeight: 800 }}>A</div>
                        <span className="st-product-col-brand st-product-col-brand--gold">anera</span>
                        <div className="st-product-col-name">NMN + TR 24000</div>
                      </div>
                    </th>
                    <th><div className="st-product-col-header"><div className="st-product-col-img" style={{ background: "#1e3a5f", color: "white" }}>T</div><div className="st-product-col-name">Tru Niagen</div></div></th>
                    <th><div className="st-product-col-header"><div className="st-product-col-img" style={{ background: "#22c55e", color: "white" }}>A</div><div className="st-product-col-name">Alive By Science</div></div></th>
                    <th><div className="st-product-col-header"><div className="st-product-col-img" style={{ background: "#6366f1", color: "white" }}>R</div><div className="st-product-col-name">Renue By Science</div></div></th>
                  </tr>
                </thead>
                <tbody>
                  {compNad.map((row, i) => (
                    <tr key={i}>
                      <td><div className="st-feature-info">{row.feature}</div></td>
                      <td style={{ background: "var(--card-bg, #fff)" }}><CompCell val={row.anera} gold /></td>
                      <td><CompCell val={row.tru} /></td>
                      <td><CompCell val={row.alive} /></td>
                      <td><CompCell val={row.renue} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* ── Benefits Tabs ─────────────────────────────────────── */}
      <section className="st-benefits" id="science">
        <div className="st-benefits__inner">
          <div className="st-benefits-header st-reveal">
            <h2>Clinically Proven Benefits</h2>
          </div>
          <nav className="st-benefits-nav">
            {benefitTabs.map((tab) => (
              <button key={tab.id} className={`st-benefit-tab-btn${activeTab === tab.id ? " active" : ""}`} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>
            ))}
          </nav>
          {benefitTabs.map((tab) => (
            <div key={tab.id} className={`st-benefit-panel${activeTab === tab.id ? " active" : ""}`}>
              <div className="st-benefit-panel__stat">
                <div className="st-benefit-panel__number">{tab.number}<span>{tab.unit}</span></div>
                <div className="st-benefit-panel__stat-label">{tab.statLabel}</div>
              </div>
              <div className="st-benefit-panel__text">
                <h3>{tab.title}</h3>
                <p>{tab.text}</p>
                <div className="st-benefit-panel__source">{tab.source}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────── */}
      <section className="st-timeline">
        <div className="st-timeline__inner">
          <div className="st-timeline-header st-reveal">
            <h2>Your Transformation Timeline</h2>
            <p>What to expect when you start your NMN journey</p>
          </div>
          <nav className="st-timeline-nav">
            {timelinePanels.map((p) => (
              <button key={p.id} className={`st-timeline-btn${activeTimeline === p.id ? " active" : ""}`} onClick={() => setActiveTimeline(p.id)}>{p.label}</button>
            ))}
          </nav>
          {timelinePanels.map((p) => (
            <div key={p.id} className={`st-timeline-panel${activeTimeline === p.id ? " active" : ""}`}>
              <div className="st-timeline-panel__visual">
                <div className="st-timeline-panel__time">{p.time}</div>
                <div className="st-timeline-panel__unit">{p.unit}</div>
                <div className="st-timeline-progress"><div className="st-timeline-progress__fill" style={{ width: `${p.pct}%` }} /></div>
                <div className="st-timeline-panel__desc">{p.desc}</div>
              </div>
              <div className="st-timeline-panel__text">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Reviews ───────────────────────────────────────────── */}
      <section className="st-reviews" id="reviews">
        <div className="st-reviews__inner">
          <div className="st-reviews-header st-reveal">
            <div className="st-reviews-summary">
              <div className="st-reviews-score">5.<span>0</span></div>
              <div className="st-reviews-meta">
                <div className="st-reviews-stars">{"\u2605\u2605\u2605\u2605\u2605"}</div>
                <div className="st-reviews-count">Google Reviews</div>
                <div className="st-reviews-recommend">100% recommend</div>
              </div>
            </div>
            <div className="st-reviews-bars">
              {[{ label: "5 star", pct: 100 }, { label: "4 star", pct: 0 }, { label: "3 star", pct: 0 }, { label: "2 star", pct: 0 }, { label: "1 star", pct: 0 }].map((bar) => (
                <div key={bar.label} className="st-review-bar-row">
                  <span className="st-review-bar-label">{bar.label}</span>
                  <div className="st-review-bar-track"><div className="st-review-bar-fill" style={{ width: `${bar.pct}%` }} /></div>
                  <span className="st-review-bar-pct">{bar.pct}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="st-reviews-grid">
            {reviews.map((r, i) => (
              <div key={i} className="st-review-card st-reveal">
                <div className="st-review-card__header">
                  <span className="st-review-card__author">{r.author}</span>
                  {r.verified && <span className="st-review-card__verified">Google Review</span>}
                </div>
                <div className="st-review-card__stars">{Array.from({ length: r.stars }, (_, j) => <span key={j}>{"\u2605"}</span>)}</div>
                <div className="st-review-card__title">{r.title}</div>
                <div className="st-review-card__text">{r.text}</div>
                <div className="st-review-card__date">{r.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="st-faq" id="faq">
        <div className="st-faq__inner">
          <div className="st-faq-header st-reveal">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="st-accordion">
            {faqs.map((item, i) => (
              <AccordionItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="st-accordion-item">
      <button className={`st-accordion-btn${open ? " open" : ""}`} onClick={() => setOpen(!open)}>
        {q}
      </button>
      <div className={`st-accordion-body${open ? " open" : ""}`}>{a}</div>
    </div>
  );
}
