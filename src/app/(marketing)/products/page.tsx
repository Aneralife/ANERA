"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/cart-context";

/* ── Carousel hook (Apple Store behaviour) ───────────────────── */
function getGutterPx() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--gutter").trim();
  const pct = parseFloat(raw) / 100 || 0.074;
  return window.innerWidth * pct;
}

function useCarousel(itemWidth: number, gap: number, perPage: number) {
  const slideRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  // On mobile, track by individual item index instead of page
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Expose page/maxPage for dot indicators (desktop = pages, mobile = items)
  const page = isMobile ? index : Math.floor(index / perPage);
  const maxPage = isMobile ? maxIndex : Math.max(0, Math.ceil((maxIndex + 1) / perPage) - 1);

  const measure = useCallback(() => {
    const slide = slideRef.current;
    if (!slide) return;
    const totalItems = slide.children.length;
    setMaxIndex(Math.max(0, totalItems - 1));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const goTo = useCallback(
    (i: number) => {
      const mobile = window.innerWidth < 768;
      const totalItems = slideRef.current?.children.length ?? 0;
      const step = itemWidth + gap;
      const gutterPx = getGutterPx();

      if (mobile) {
        // Move one item at a time on mobile
        const next = Math.max(0, Math.min(i, totalItems - 1));
        setIndex(next);

        const slide = slideRef.current;
        const inner = innerRef.current;
        if (!slide || !inner) return;

        if (next === 0) {
          inner.style.paddingLeft = "";
          slide.style.transform = "translateX(0)";
        } else {
          inner.style.paddingLeft = "0";
          const offset = next * step - gutterPx;
          slide.style.transform = `translateX(-${offset}px)`;
        }
      } else {
        // Desktop: move by page
        const maxP = Math.max(0, Math.ceil(totalItems / perPage) - 1);
        const nextPage = Math.max(0, Math.min(i, maxP));
        setIndex(nextPage * perPage);

        const slide = slideRef.current;
        const inner = innerRef.current;
        if (!slide || !inner) return;

        if (nextPage === 0) {
          inner.style.paddingLeft = "";
          slide.style.transform = "translateX(0)";
        } else {
          inner.style.paddingLeft = "0";
          const offset = nextPage * perPage * step - gutterPx;
          slide.style.transform = `translateX(-${offset}px)`;
        }
      }
    },
    [itemWidth, gap, perPage],
  );

  // Wrapper so dot nav and arrows use the right unit
  const go = useCallback(
    (i: number) => {
      const mobile = window.innerWidth < 768;
      if (mobile) {
        // i is an item index
        goTo(i);
      } else {
        // i is a page index
        goTo(i);
      }
    },
    [goTo],
  );

  /* Drag / swipe support */
  const dragState = useRef({ dragging: false, wasDrag: false, startX: 0, startIndex: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragState.current = { dragging: true, wasDrag: false, startX: e.clientX, startIndex: index };
    if (slideRef.current) slideRef.current.style.transition = "none";
  }, [index]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    const slide = slideRef.current;
    const inner = innerRef.current;
    if (!slide || !inner) return;

    const step = itemWidth + gap;
    const gutterPx = getGutterPx();
    const mobile = window.innerWidth < 768;
    const startIdx = dragState.current.startIndex;

    let baseOffset: number;
    if (mobile) {
      baseOffset = startIdx === 0 ? 0 : startIdx * step - gutterPx;
    } else {
      const startPage = Math.floor(startIdx / perPage);
      baseOffset = startPage === 0 ? 0 : startPage * perPage * step - gutterPx;
    }
    // 1:1 finger tracking
    slide.style.transform = `translateX(${-baseOffset + dx}px)`;
  }, [itemWidth, gap, perPage]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;
    if (slideRef.current) slideRef.current.style.transition = "";

    const dx = e.clientX - dragState.current.startX;
    const startIdx = dragState.current.startIndex;
    const mobile = window.innerWidth < 768;
    const threshold = 60;

    // If drag distance is small, treat as a click — don't snap
    if (Math.abs(dx) < 10) {
      dragState.current.wasDrag = false;
      goTo(startIdx);
      return;
    }

    dragState.current.wasDrag = true;

    if (mobile) {
      if (dx < -threshold) {
        goTo(startIdx + 1);
      } else if (dx > threshold) {
        goTo(startIdx - 1);
      } else {
        goTo(startIdx);
      }
    } else {
      const startPage = Math.floor(startIdx / perPage);
      if (dx < -threshold) {
        goTo(startPage + 1);
      } else if (dx > threshold) {
        goTo(startPage - 1);
      } else {
        goTo(startPage);
      }
    }
  }, [goTo, perPage]);

  return { slideRef, innerRef, page, maxPage, go, measure, onPointerDown, onPointerMove, onPointerUp, dragState };
}

/* ── Data ────────────────────────────────────────────────────── */
const catItems = [
  { label: "NMN + TR 24000", img: "/assets/24000 NMN.png", available: true, href: "/products/nmn-trans-resveratrol-24000-dual-cellular-support" },
  { label: "NMN 15000", img: "/assets/15000 NMN.png", available: true, href: "/products/nmn-tr-24000" },
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

type PlanOption = {
  label: string;
  months: number;
  save: number;
  pricePerMonth: number;
  totalOriginal: number;
  totalDiscounted: number;
  variantId: string;
  recommended?: boolean;
  bestValue?: boolean;
};

type PCard = {
  name: string;
  cat: string;
  desc: string;
  price: string;
  img: string;
  imgHover?: string;
  available: boolean;
  bestSeller?: boolean;
  handle?: string;
  variantId?: string;
  originalPrice?: number;
  plans?: PlanOption[];
  highlights?: string[];
};

const productCards: PCard[] = [
  {
    name: "NMN + Trans-Resveratrol 24000", cat: "NAD+ Booster",
    desc: "250mg NMN + 150mg Trans-Resveratrol \u00b7 60 capsules. Boosts NAD+, fights oxidative stress, and supports cellular repair.",
    price: "$120 CAD", img: "/assets/24000 NMN.png", imgHover: "/assets/NMN 24000-1.jpeg",
    available: true, bestSeller: true,
    handle: "nmn-trans-resveratrol-24000-dual-cellular-support",
    variantId: "gid://shopify/ProductVariant/45075095519311",
    originalPrice: 120,
    highlights: ["Boosts NAD+ production & cellular energy", "Fights oxidative stress with Trans-Resveratrol", "Pharmaceutical-grade, third-party tested"],
    plans: [
      { label: "1-month supply", months: 1, save: 15, pricePerMonth: 102, totalOriginal: 120, totalDiscounted: 102, variantId: "gid://shopify/ProductVariant/45075095519311" },
      { label: "3-month supply", months: 3, save: 20, pricePerMonth: 96, totalOriginal: 360, totalDiscounted: 288, variantId: "gid://shopify/ProductVariant/45075095552079" },
      { label: "6-month supply", months: 6, save: 25, pricePerMonth: 90, totalOriginal: 720, totalDiscounted: 540, variantId: "gid://shopify/ProductVariant/45075095584847", recommended: true },
      { label: "12-month supply", months: 12, save: 30, pricePerMonth: 84, totalOriginal: 1440, totalDiscounted: 1008, variantId: "gid://shopify/ProductVariant/45075095617615", bestValue: true },
    ],
  },
  { name: "NMN 15000", cat: "NAD+ Booster", desc: "250mg per capsule \u00b7 60 capsules. Higher-potency NAD+ support for stronger energy and cellular repair.", price: "$105 CAD", img: "/assets/15000 NMN.png", imgHover: "/assets/NMN 15000-1.png", available: true, handle: "nmn-tr-24000", variantId: "gid://shopify/ProductVariant/44918841737295" },
  { name: "NMN 7500", cat: "NAD+ Booster", desc: "125mg per capsule \u00b7 60 capsules. Supports NAD+, energy, and cellular health. Ideal entry-level daily dose.", price: "Price TBD", img: "/assets/7500 NMN.png", imgHover: "/assets/second-all.jpeg", available: false },
  { name: "NMN 100000", cat: "NAD+ Booster", desc: "Pure NMN powder \u00b7 100g. Maximum NAD+ support with flexible dosing and rapid sublingual absorption.", price: "Price TBD", img: "/assets/NMN Powder.png", imgHover: "/assets/second-all.jpeg", available: false },
  { name: "Trans-Resveratrol 45000", cat: "Antioxidant", desc: "500mg per capsule \u00b7 90 capsules. Fights free radicals, supports heart health, and promotes healthy aging.", price: "Price TBD", img: "/assets/TR.png", imgHover: "/assets/second-all.jpeg", available: false },
  { name: "Fisetin 6000", cat: "Longevity / Senolytic", desc: "100mg per capsule \u00b7 60 capsules. Supports cellular cleanup, brain health, and anti-inflammatory effects.", price: "Price TBD", img: "/assets/Fisetin.png", imgHover: "/assets/second-all.jpeg", available: false },
  { name: "Quercetin 45000", cat: "Antioxidant / Immune", desc: "500mg per capsule \u00b7 90 capsules. Strong antioxidant that supports immunity and reduces inflammation.", price: "Price TBD", img: "/assets/Quercentin.png", imgHover: "/assets/second-all.jpeg", available: false },
  { name: "Berberine 45000", cat: "Metabolic", desc: "500mg per capsule \u00b7 90 capsules. Supports glucose balance, improves metabolism, and promotes heart health.", price: "Price TBD", img: "/assets/Berberin.png", imgHover: "/assets/second-all.jpeg", available: false },
  { name: "TMG 45000", cat: "Methylation Support", desc: "500mg per capsule \u00b7 90 capsules. Supports homocysteine balance, promotes heart health, and aids cellular methylation.", price: "Price TBD", img: "/assets/TMG.png", imgHover: "/assets/second-all.jpeg", available: false },
  { name: "Selenium 24000", cat: "Mineral", desc: "200mcg per capsule \u00b7 90 capsules. Supports immune system, promotes thyroid function, and provides antioxidant protection.", price: "Price TBD", img: "/assets/Selenium.png", imgHover: "/assets/second-all.jpeg", available: false },
  { name: "Magnesium L-Threonate 4500", cat: "Mineral / Brain Health", desc: "50mg per capsule \u00b7 90 capsules. Improves memory, enhances focus, and supports overall brain health.", price: "Price TBD", img: "/assets/Magnesium.png", imgHover: "/assets/second-all.jpeg", available: false },
  { name: "Micronized Creatine 300000", cat: "Performance", desc: "Powder \u00b7 300g. Increases power output, supports muscle recovery, and enhances athletic performance.", price: "Price TBD", img: "/assets/Creatine.png", imgHover: "/assets/second-all.jpeg", available: false },
  { name: "Taurine 300000", cat: "Mineral / Performance", desc: "Powder \u00b7 300g. Improves endurance, supports cardiovascular health, and aids post-exercise recovery.", price: "Price TBD", img: "/assets/Taurine.png", imgHover: "/assets/second-all.jpeg", available: false },
];

const compSupplements = [
  { feature: "Directly boosts NAD+ levels", info: "Measured by blood NAD+ levels", anera: "check", coq10: "check", creatine: "x", resveratrol: "Partial", generic: "Partial" },
  { feature: "Targets root cause of age-related energy decline", info: "Addresses mitochondrial dysfunction", anera: "check", coq10: "Partial", creatine: "x", resveratrol: "Partial", generic: "Partial" },
  { feature: "Pharmaceutical-grade purity", info: "", anera: "check", coq10: "x", creatine: "x", resveratrol: "x", generic: "x" },
  { feature: "Human clinically tested", info: "", anera: "check", coq10: "Limited", creatine: "check", resveratrol: "Limited", generic: "x" },
  { feature: "Endotoxin <20 Eu/g", info: "", anera: "check", coq10: "x", creatine: "x", resveratrol: "x", generic: "x" },
  { feature: "Dual-action (NAD+ + antioxidant)", info: "", anera: "check", coq10: "x", creatine: "x", resveratrol: "Partial", generic: "x" },
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

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/Anera+Life+Inc./@49.1834636,-123.1369498,17z/data=!4m8!3m7!1s0x54860b5d5666db17:0x34bb5aa7e0297d92!8m2!3d49.1834636!4d-123.1369498!9m1!1b1!16s%2Fg%2F11t_0t1n_y";

const reviews = [
  { author: "Nofella Auliya", verified: true, stars: 5, title: "Game-changer for my skin", text: "I\u2019ve been using Anera for a few months now, and I can honestly say it\u2019s been a game-changer for my skin, especially when it comes to managing acne and eczema. This supplement works from the inside out, and I\u2019ve seen noticeable improvements since I started. If you\u2019re struggling with skin issues, I really recommend giving Anera a shot!", date: "1 year ago", hoverImg: "/assets/11.png", url: GOOGLE_REVIEWS_URL },
  { author: "Janet L", verified: true, stars: 5, title: "No more midday fatigue", text: "After consistent daily use for 6 months, I can say I am extremely pleased with the benefits of taking NMN. No more feeling fatigue mid day, my hair looks fuller and my skin feels more plump. Definitely recommend for those who need a boost in their daily lifestyle.", date: "1 year ago", hoverImg: "/assets/12.png", url: "https://share.google/WKD3rUsih7M8cSxqd" },
  { author: "Abraham Aguirre Castro", verified: true, stars: 5, title: "Boosted my energy throughout the day", text: "It has boost my energy throughout the day.", date: "1 year ago", hoverImg: "/assets/13.png", url: "https://share.google/iiNzTBa9CvNexL0FG" },
  { author: "Daniel De La Cruz", verified: true, stars: 5, title: "Replaced my daily vitamins with Anera", text: "Being a competitive bodybuilder, I tried NMN for 1 month and stopped taking preworkout. I was able to push through intense training, focus and clarity improved, and my wrist pain was gone after 3 weeks! My cardio performance was better than expected. I\u2019ve replaced my daily vitamins with ANERA 24000 NMN + TR. #HEALTHISWEALTH", date: "1 year ago", hoverImg: "/assets/14.png", url: "https://share.google/CMzYmvEzFnn8HDNpz" },
  { author: "Tammy Watson", verified: true, stars: 5, title: "Better sleep, more energy, weight loss", text: "I started taking Anera NMN as I was transitioning off anxiety and depression medication. I found that I was able to sleep well and wake up feeling refreshed. My skin started to brighten up and my metabolism is kicking back in. Now I find I have energy to work out in the morning, and the scale is moving again.", date: "1 year ago", hoverImg: "/assets/15.png", url: "https://share.google/jUfPbnonmhtTPXerD" },
  { author: "Qui Tran", verified: true, stars: 5, title: "Best product I have tried", text: "Hands down best product I have tried. Lots of energy when using compared to other brands.", date: "1 year ago", hoverImg: "/assets/16.png", url: "https://share.google/0z9Djsuz3tx1pixsW" },
  { author: "Jose Ram\u00edrez", verified: true, stars: 5, title: "Energy, joint pain relief, mental clarity", text: "I\u2019ve been taking Anera for two weeks now, and from the very first days, I noticed an increase in my energy levels. I\u2019ve dealt with joint pain my entire life from playing football, but in just two weeks, that pain has almost completely disappeared. My mental clarity improved and I\u2019m getting much more done in a single day.", date: "1 year ago", hoverImg: "/assets/11.png", url: "https://share.google/xlv2PF3Je7U1WjedG" },
  { author: "Damien Henderson", verified: true, stars: 5, title: "So much energy throughout the day", text: "Anera product is definitely a supplement you should purchase! I\u2019ve tried the NMN 60 capsule bottle first, and the product is legit \u2014 I have so much energy throughout the day! Now I just reloaded on 2 bottles of the NMN Trans. Highly recommend!", date: "1 year ago", hoverImg: "/assets/12.png", url: "https://share.google/hGxrp92DHzSanWwRV" },
];

const faqs = [
  { q: "What is NMN and how does it work?", a: "NMN (Nicotinamide Mononucleotide) is a naturally occurring molecule that your body converts directly into NAD+, a critical coenzyme involved in over 500 enzymatic reactions. As we age, NAD+ levels decline by up to 50% every 20 years. NMN supplementation directly replenishes NAD+, supporting energy metabolism, DNA repair, and cellular health." },
  { q: "What makes Anera different from other NMN supplements?", a: "Anera is the only NMN supplement in the world clinically tested in human trials. Our endotoxin levels are consistently below 20 Eu/g — far below the industry average of 50–1000 Eu/g. We manufacture to pharmaceutical-grade standards, include Trans-Resveratrol for dual-action benefits, and provide full transparency with third-party testing documentation." },
  { q: "When will I start seeing results?", a: "Most users report initial improvements in energy and mental clarity within 1-2 weeks. More significant benefits like improved sleep quality, better exercise recovery, and enhanced biomarkers typically develop over 1-3 months of consistent use. Long-term benefits continue to compound over 6+ months." },
  { q: "Is NMN safe? Are there any side effects?", a: "NMN has been extensively studied in both animal and human clinical trials with an excellent safety profile. Our pharmaceutical-grade NMN is manufactured under strict GMP conditions and undergoes rigorous third-party testing. No significant adverse effects have been reported in clinical studies at recommended dosages." },
  { q: "How should I take NMN + Trans-Resveratrol 24000?", a: "Take 1 capsule daily with a meal, preferably in the morning. The Trans-Resveratrol component is fat-soluble, so taking it with food enhances absorption. Consistency is key — daily supplementation maintains optimal NAD+ levels for maximum benefit." },
  { q: "Can I take NMN with other supplements or medications?", a: "NMN is generally well-tolerated alongside other supplements. However, if you are taking prescription medications, particularly blood thinners or diabetes medications, we recommend consulting your healthcare provider before starting any new supplement regimen." },
];

/* ── Product Modal ──────────────────────────────────────────── */
function ProductModal({ card, onClose, onAddToCart }: { card: PCard; onClose: () => void; onAddToCart: (variantId: string) => void }) {
  const [selectedPlan, setSelectedPlan] = useState(card.plans?.[2]?.variantId || card.plans?.[0]?.variantId || "");
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    if (!selectedPlan || adding) return;
    setAdding(true);
    onAddToCart(selectedPlan);
    setTimeout(() => { setAdding(false); onClose(); }, 600);
  };

  const handleBuyNow = async () => {
    if (!selectedPlan) return;
    setAdding(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "buyNow", variantId: selectedPlan, quantity: 1 }),
      });
      const data = await res.json();
      if (data.checkoutUrl) window.location.href = data.checkoutUrl;
    } catch { setAdding(false); }
  };

  if (!card.plans) return null;

  return (
    <div className="st-modal-overlay" onClick={onClose}>
      <div className="st-modal" onClick={e => e.stopPropagation()}>
        <button className="st-modal__close" onClick={onClose}>&times;</button>

        <div className="st-modal__header">
          <div className="st-modal__badges">
            <span className="st-modal__badge st-modal__badge--dark">PHARMACEUTICAL GRADE</span>
            {card.bestSeller && <span className="st-modal__badge st-modal__badge--red">BEST SELLER</span>}
          </div>
          <h2 className="st-modal__title">{card.name}</h2>
          <p className="st-modal__subtitle">{card.cat}</p>
          <div className="st-modal__guarantee">30 DAY MONEY-BACK GUARANTEE</div>
          <p className="st-modal__desc">{card.desc}</p>
          {card.highlights && (
            <div className="st-modal__highlights">
              {card.highlights.map((h, i) => (
                <div key={i} className="st-modal__highlight">
                  <span className="st-modal__highlight-bar">&#9612;</span>{h}
                </div>
              ))}
            </div>
          )}
          <p className="st-modal__plan-label">Subscribe &amp; Save:</p>
        </div>

        <div className="st-modal__plans">
          {card.plans.map((plan) => (
            <label
              key={plan.variantId}
              className={`st-modal__plan${selectedPlan === plan.variantId ? " st-modal__plan--selected" : ""}${plan.recommended ? " st-modal__plan--recommended" : ""}`}
              onClick={() => setSelectedPlan(plan.variantId)}
            >
              {plan.recommended && <span className="st-modal__plan-tag st-modal__plan-tag--dark">CLINICALLY RECOMMENDED</span>}
              {plan.bestValue && <span className="st-modal__plan-tag st-modal__plan-tag--light">BEST VALUE</span>}
              <div className="st-modal__plan-inner">
                <div className="st-modal__plan-left">
                  <div className={`st-modal__radio${selectedPlan === plan.variantId ? " st-modal__radio--on" : ""}`}>
                    {selectedPlan === plan.variantId && <div className="st-modal__radio-dot" />}
                  </div>
                  <div>
                    <div className="st-modal__plan-name">{plan.label}</div>
                    <div className="st-modal__plan-save">Save {plan.save}%</div>
                  </div>
                </div>
                <div className="st-modal__plan-right">
                  <div className="st-modal__plan-price">${plan.pricePerMonth}<span>/mo</span></div>
                  <div className="st-modal__plan-total"><s>${plan.totalOriginal}</s> ${plan.totalDiscounted}</div>
                </div>
              </div>
            </label>
          ))}
        </div>

        <div className="st-modal__footer">
          <button className="st-modal__btn-primary" onClick={handleAdd} disabled={adding}>
            {adding ? "ADDING..." : "ADD TO CART"}
          </button>
          <button className="st-modal__btn-buy" onClick={handleBuyNow} disabled={adding}>
            BUY NOW
          </button>
          <div className="st-modal__onetime">
            <span className="st-modal__onetime-link">ONE-TIME PURCHASE</span> &middot; ${card.originalPrice} CAD
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const router = useRouter();
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState("energy");
  const [activeTimeline, setActiveTimeline] = useState("week1");
  const topCarousel = useCarousel(120, 0, 8);   // 8 icons per page
  const botCarousel = useCarousel(400, 20, 3);  // 3 cards per page
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [modalCard, setModalCard] = useState<PCard | null>(null);

  function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) { audio.play(); setAudioPlaying(true); }
    else { audio.pause(); setAudioPlaying(false); }
  }



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

  function addToCart(variantId?: string) {
    if (!variantId) return;
    addItem(variantId);
  }

  return (
    <>
      {/* ── Video background for hero + carousels ────────────── */}
      <div className="st-carousel-video">
        <video className="st-carousel-video__bg" autoPlay muted loop playsInline>
          <source src="/assets/DNA.webm" type="video/webm" />
        </video>
        <div className="st-carousel-video__overlay" />

      {/* ── Store Hero ────────────────────────────────────────── */}
      <div className="st-hero">
        <div className="st-hero__inner st-reveal">
          <h1 className="st-hero__title">Longevity Is The New Flex</h1>
          <div className="st-hero__right">
            <p className="st-hero__tagline">Welcome to your new you. For Life.</p>
            <audio ref={audioRef} src="/assets/Deep.mp3" loop preload="none" />
            <button className={`inline-audio-btn${audioPlaying ? " playing" : ""}`} onClick={toggleAudio} aria-label={audioPlaying ? "Pause music" : "Play music"}>
              {audioPlaying ? (
                <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg> Pause</>
              ) : (
                <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19" /><path d="M15.54 8.46a5 5 0 010 7.07" /></svg> Listen</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Top Carousel — icon shelf ─────────────────────────── */}
      <div className="st-shelf st-shelf--gray">
        <button className={`st-arrow st-arrow--prev${topCarousel.page <= 0 ? " hidden" : ""}`} onClick={() => topCarousel.go(topCarousel.page - 1)} aria-label="Previous"><ArrowSvg dir="prev" /></button>
        <button className={`st-arrow st-arrow--next${topCarousel.page >= topCarousel.maxPage ? " hidden" : ""}`} onClick={() => topCarousel.go(topCarousel.page + 1)} aria-label="Next"><ArrowSvg dir="next" /></button>
        <div className="st-shelf__inner" ref={topCarousel.innerRef}>
          <div className="st-shelf__track" onPointerDown={topCarousel.onPointerDown} onPointerMove={topCarousel.onPointerMove} onPointerUp={topCarousel.onPointerUp} style={{ touchAction: "pan-y" }}>
            <div className="st-shelf__slide" ref={topCarousel.slideRef}>
              {catItems.map((item, i) => (
                <a
                  key={i}
                  href={item.available ? item.href : "#"}
                  className={`st-cat-item${item.available ? " available" : " unavailable"}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (topCarousel.dragState.current.wasDrag) return;
                    if (item.available && item.href !== "#") {
                      router.push(item.href);
                    }
                  }}
                >
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
      <div>
        <div className="st-latest-header st-reveal">
          <h2 className="st-latest-header__title">The latest.&nbsp;<span className="st-latest-header__sub">Take a look at what&#39;s new, right now.</span></h2>
        </div>
        <div className="st-shelf st-shelf--transparent st-latest-pad" style={{ borderBottom: "1px solid var(--border, #e8e8ed)" }}>
          <button className={`st-arrow st-arrow--prev${botCarousel.page <= 0 ? " hidden" : ""}`} onClick={() => botCarousel.go(botCarousel.page - 1)} aria-label="Previous"><ArrowSvg dir="prev" /></button>
          <button className={`st-arrow st-arrow--next${botCarousel.page >= botCarousel.maxPage ? " hidden" : ""}`} onClick={() => botCarousel.go(botCarousel.page + 1)} aria-label="Next"><ArrowSvg dir="next" /></button>
          <div className="st-shelf__inner" ref={botCarousel.innerRef}>
            <div className="st-shelf__track" onPointerDown={botCarousel.onPointerDown} onPointerMove={botCarousel.onPointerMove} onPointerUp={botCarousel.onPointerUp} style={{ touchAction: "pan-y" }}>
              <div className="st-shelf__slide" ref={botCarousel.slideRef}>
                {productCards.map((card, i) => (
                  <a
                    key={i}
                    href={card.handle ? `/products/${card.handle}` : "#"}
                    className={`st-pcard${card.available ? " available" : " unavailable"}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (botCarousel.dragState.current.wasDrag) return;
                      if (card.available && card.plans) {
                        setModalCard(card);
                      } else if (card.handle) {
                        router.push(`/products/${card.handle}`);
                      }
                    }}
                  >
                    <div className="st-pcard__inner">
                      <div className="st-pcard__img-wrap">
                        <div className="st-pcard__badges">
                          <span className="st-pcard__badges-left">
                            {card.available && <span className="st-pcard__badge st-badge--available">Available</span>}
                          </span>
                          {card.bestSeller && <span className="st-pcard__badge st-badge--bestseller">Best Seller</span>}
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={card.img} alt={card.name} className="st-pcard__img" />
                      </div>
                      {card.imgHover && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={card.imgHover} alt={card.name} className="st-pcard__img-hover" />
                      )}
                      <div className="st-pcard__info">
                        <div className="st-pcard__cat">{card.cat}</div>
                        <div className="st-pcard__name">{card.name}</div>
                        <div className="st-pcard__desc">{card.desc}</div>
                        <div className="st-pcard__footer">
                          <span className="st-pcard__price" style={!card.available ? { color: "var(--fg-muted, #86868b)" } : undefined}>{card.price}</span>
                          {card.available ? (
                            <button className="st-pcard__add" onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(card.variantId); }}>Add</button>
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
      </div>{/* end st-carousel-video */}

      {/* ── NMN 24000 Product Section Intro ───────────────────── */}
      <div className="st-product-intro" id="nmn24000">
        <div className="st-product-intro__left st-reveal">
          <h2>NMN + Trans-Resveratrol 24000<br />The Ultimate Longevity Powerhouse.</h2>
          <p>250mg NMN + 150mg Trans-Resveratrol per capsule. Clinically studied, pharmaceutical-grade NMN with ultra-low endotoxin levels (&lt;20 Eu/g) for superior quality, safety, and consistency.</p>
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
          <button className="st-btn-buy" onClick={() => addToCart("gid://shopify/ProductVariant/45032073297999")}>Add to Cart</button>
        </div>
      </div>

      {/* ── Comparison ────────────────────────────────────────── */}
      <section className="st-comparison" id="compare">
        <div className="st-comparison__inner">
          <div className="st-comparison-header st-reveal">
            <div style={{ marginBottom: 24 }}>
            </div>
            <h2 className="st-comparison-title">POWER FOR LIFE</h2>
          </div>

          {/* Supplements table */}
            <div className="st-comparison-table-wrap st-reveal">
              <table className="st-comparison-table">
                <thead>
                  <tr>
                    <th style={{ width: "30%" }}></th>
                    <th>
                      <div className="st-product-col-header st-product-col-header--anera" style={{ background: "var(--card-bg, #fff)", borderRadius: "20px 20px 0 0" }}>
                        <div className="st-product-col-img st-product-col-img--video st-product-col-img--large"><video autoPlay muted loop playsInline><source src="/assets/cold-blue.webm" type="video/webm" /></video></div>
                        <div className="st-product-col-brand-text">Anera</div>
                        <div className="st-product-col-name">NMN + TR 24000</div>
                      </div>
                    </th>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <th><div className="st-product-col-header"><div className="st-product-col-img"><img src="/assets/2.png" alt="CoQ10" className="st-product-col-avatar" /></div><div className="st-product-col-name">CoQ10</div></div></th>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <th><div className="st-product-col-header"><div className="st-product-col-img"><img src="/assets/3.png" alt="Creatine" className="st-product-col-avatar" /></div><div className="st-product-col-name">Creatine</div></div></th>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <th><div className="st-product-col-header"><div className="st-product-col-img"><img src="/assets/4.png" alt="Resveratrol" className="st-product-col-avatar" /></div><div className="st-product-col-name">Resveratrol</div></div></th>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <th><div className="st-product-col-header"><div className="st-product-col-img"><img src="/assets/5.png" alt="Generic NMN" className="st-product-col-avatar" /></div><div className="st-product-col-name">Generic NMN</div></div></th>
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
        <video className="st-timeline__bg" autoPlay muted loop playsInline>
          <source src="/assets/sunshine.webm" type="video/webm" />
        </video>
        <div className="st-timeline__overlay" />
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
          <ReviewsCarousel reviews={reviews} />
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
      {/* ── Product Modal ── */}
      {modalCard && (
        <ProductModal
          card={modalCard}
          onClose={() => setModalCard(null)}
          onAddToCart={(variantId) => addItem(variantId)}
        />
      )}
    </>
  );
}

function ReviewsCarousel({ reviews }: { reviews: { author: string; verified: boolean; stars: number; title: string; text: string; date: string; hoverImg?: string; url: string }[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ dragging: false, startX: 0, scrollLeft: 0, moved: false });

  const scroll = (dir: "left" | "right") => {
    const amount = window.innerWidth < 768 ? 200 : 360;
    trackRef.current?.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    dragState.current = { dragging: true, startX: e.clientX, scrollLeft: el.scrollLeft, moved: false };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragState.current.dragging || !trackRef.current) return;
    e.preventDefault();
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 5) dragState.current.moved = true;
    trackRef.current.scrollLeft = dragState.current.scrollLeft - dx;
  };
  const onMouseUp = () => { dragState.current.dragging = false; };
  const onMouseLeave = () => { dragState.current.dragging = false; };
  const onClick = (e: React.MouseEvent) => { if (dragState.current.moved) { e.preventDefault(); dragState.current.moved = false; } };

  return (
    <div className="st-reviews-carousel-wrap">
      <button className="st-reviews-arrow st-reviews-arrow--prev" onClick={() => scroll("left")} aria-label="Previous reviews">
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none"><path d="M8 2L2 8L8 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button className="st-reviews-arrow st-reviews-arrow--next" onClick={() => scroll("right")} aria-label="Next reviews">
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none"><path d="M2 2L8 8L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div
        className="st-reviews-carousel"
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <div className="st-reviews-carousel__track">
          {reviews.map((r, i) => (
            <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="st-review-card" onClick={onClick}>
              {r.hoverImg && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={r.hoverImg} alt="" className="st-review-card__hover-img" />
              )}
              <div className="st-review-card__content">
                <div className="st-review-card__header">
                  <span className="st-review-card__author">{r.author}</span>
                  <span className="st-review-card__verified">Google Review</span>
                </div>
                <div className="st-review-card__stars">{Array.from({ length: r.stars }, (_, j) => <span key={j}>{"\u2605"}</span>)}</div>
                <div className="st-review-card__title">{r.title}</div>
                <div className="st-review-card__text">{r.text}</div>
                <div className="st-review-card__date">{r.date}</div>
                <span className="st-review-card__link">Read on Google &rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
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
