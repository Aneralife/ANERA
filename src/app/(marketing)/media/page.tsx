"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

// Keep newest articles first. Article ids are used as array indexes by this page.
const ARTICLES = [
  {
    id: 0, slug: "nmn-supplement-for-dogs-and-cats",
    title: "NMN Supplement for Dogs and Cats: How It Can Help Your Pet Live Longer?",
    date: "June 26, 2026", tag: "NMN Supplement", filter: "nmn", icon: "🐾", bannerClass: "", readTime: "11 min read",
    lead: "Can NMN help support healthy aging in pets? Learn the potential benefits, safety considerations, and science behind NMN supplements for dogs and cats.",
    takeaways: ["NMN supports NAD+ production, a pathway tied to cellular energy and healthy aging", "Pet-specific NMN research is still limited, so veterinary guidance matters", "Quality, purity, third-party testing, and transparent manufacturing are key when evaluating NMN"],
    content: "",
    externalHref: "/nmn-supplement-for-dogs-and-cats",
  },
  {
    id: 1, slug: "buy-best-nmn-supplement-canada",
    title: "Best NMN Supplement in Canada (2026)",
    date: "June 20, 2026", tag: "Canada", filter: "canada", icon: "🇨🇦", bannerClass: "", readTime: "14 min read",
    lead: "Looking for the best NMN supplement in Canada? Learn how to compare purity, testing, dosage, and value before you buy.",
    takeaways: ["Compare NMN supplements by purity, testing, dosage, and value", "Look for 99%+ purity, GMP standards, and third-party testing", "Anera Life NMN is positioned around transparent quality standards for Canadian consumers"],
    content: "",
    externalHref: "/buy-best-nmn-supplement-canada",
  },
  {
    id: 2, slug: "how-to-choose-the-best-nmn-supplement-the-ultimate-buyers-guide",
    title: "How to Choose the Best NMN Supplement: The Ultimate Buyer's Guide (2026)",
    date: "June 7, 2026", tag: "Supplement Guide", filter: "guide", icon: "📘", bannerClass: "", readTime: "20 min read",
    lead: "Discover how to choose the best NMN supplement. Learn about purity, third-party testing, COAs, and GMP standards with Anera Life's complete NMN buyer's guide.",
    takeaways: ["Prioritize verified 99%+ purity and COAs", "Use third-party testing and GMP standards as core quality signals", "Compare packaging, transparency, reputation, and cost per gram before buying"],
    content: "",
    externalHref: "/how-to-choose-the-best-nmn-supplement-the-ultimate-buyers-guide",
  },
  {
    id: 3, slug: "where-to-buy-nmn-canada",
    title: "Where to Buy NMN Supplements in Canada (2026 Guide)",
    date: "May 28, 2026", tag: "Canada", filter: "canada", icon: "🛍️", bannerClass: "", readTime: "10 min read",
    lead: "Searching for the best place to buy NMN in Canada? This guide covers the top trusted brands, online vs retail options, and how to identify 99% pure, lab-tested supplements.",
    takeaways: ["Online brands offer higher purity and COA transparency than retail", "Anera Life is the best overall NMN brand in Canada", "Always verify 99%+ purity and third-party testing before buying"],
    content: "",
    externalHref: "/where-to-buy-nmn-canada",
  },
  {
    id: 4, slug: "from-pain-to-purpose-anera-nmn-story",
    title: "My Personal Journey with ANERA NMN: From Pain to Purpose",
    date: "May 23, 2026", tag: "Anera Story", filter: "announcement", icon: "❤️", bannerClass: "", readTime: "8 min read",
    lead: "After 20 years of fitness and a devastating onset of chronic foot pain, I tried everything — specialists, orthotics, painkillers. Nothing worked. Then a friend introduced me to NMN. Within three days, my life began to change.",
    takeaways: ["NMN reduced chronic foot pain by 95% within one month", "Years of failed treatments ended with a single supplement", "This personal experience became the foundation of ANERA's mission: Help Heal Humanity"],
    content: "",
    externalHref: "/from-pain-to-purpose-anera-nmn-story",
  },
  {
    id: 5, slug: "how-long-does-nmn-take-to-work",
    title: "How Long Does NMN Take to Work? Realistic Timeline From Day 1 to 6 Months",
    date: "May 19, 2026", tag: "Timing & Dosage", filter: "timing", icon: "⏱️", bannerClass: "alt3", readTime: "12 min read",
    lead: "Most people notice subtle energy improvements within 1–2 weeks. Deeper benefits like better sleep, endurance, and metabolic improvements appear after 1–3 months.",
    takeaways: ["Week 1–2: Steadier energy, fewer crashes", "Month 1–3: Better sleep, recovery, and focus", "Month 3–6: Sustained vitality and cellular resilience", "Consistency matters more than dosage"],
    content: "",
    externalHref: "/how-long-does-nmn-take-to-work-day-1-to-6-months",
  },
  {
    id: 6, slug: "when-nmn-works-best-for-your-body-clock",
    title: "Morning vs Night: When NMN Works Best for Your Body Clock",
    date: "May 15, 2026", tag: "Timing & Dosage", filter: "timing", icon: "🕐", bannerClass: "", readTime: "12 min read",
    lead: "NAD⁺ levels follow a daily rhythm — taking NMN at the right time can align with your body's natural cycles, improving absorption, energy output, and overall effectiveness.",
    takeaways: ["Morning NMN aligns with natural NAD⁺ peaks", "Night use may disrupt sleep for most users", "Consistency with timing is key for long-term results"],
    content: "",
    externalHref: "/when-nmn-works-best-for-your-body-clock",
  },
  {
    id: 7, slug: "top-nmn-brands-canada",
    title: "Top 10 NMN Brands in Canada for 2026",
    date: "May 12, 2026", tag: "Canada", filter: "canada", icon: "🇨🇦", bannerClass: "", readTime: "10 min read",
    lead: "NMN has surged in popularity across Canada — but low-quality imports and vague purity claims make choosing the right brand harder than ever. Here's how to identify the best.",
    takeaways: ["Anera Life ranks #1 for purity and Canadian manufacturing", "GMP certification and third-party testing are non-negotiable", "Most brands lack endotoxin testing and dosage transparency"],
    content: "",
    externalHref: "/top-nmn-brands-canada",
  },
  {
    id: 8, slug: "how-nmn-15000-supports-nad-levels",
    title: "How NMN 15000 Supports NAD⁺ Levels — Why It Matters for Energy & Aging",
    date: "March 25, 2026", tag: "NMN Supplement", filter: "nmn", icon: "🧬", bannerClass: "", readTime: "8 min read",
    lead: "Aging doesn't just show up in the mirror. It begins deep inside your cells.",
    takeaways: ["NAD⁺ levels drop up to 50% by middle age", "NMN is the most direct dietary precursor to NAD⁺", "NMN 15000 delivers a therapeutic-range dose", "Benefits compound over 1–6 months", "Pharmaceutical-grade purity (99%+) is critical"],
    content: "<h2>The NAD⁺ Crisis Inside Your Cells</h2><p>By the time most people reach their 40s, their cellular NAD⁺ levels have already fallen significantly. Research suggests this decline reaches 40–50% by middle age.</p><h2>What Is NMN and Why Does It Matter?</h2><p>NMN (Nicotinamide Mononucleotide) is a naturally occurring nucleotide and the most direct precursor to NAD⁺ in the human body.</p><h2>Why NMN 15000?</h2><p>NMN 15000 provides 250mg of pharmaceutical-grade NMN per capsule — a dose within the range studied in human clinical trials.</p>"
  },
  {
    id: 9, slug: "dr-gabriel-alizaidy-joins-advisory-board",
    title: "Dr. Gabriel Alizaidy Joins the Anera Scientific Advisory Board",
    date: "March 9, 2026", tag: "Anera Announcement", filter: "announcement", icon: "🧬", bannerClass: "alt1", readTime: "5 min read",
    lead: "A new chapter in Anera's commitment to clinical-grade supplements.",
    takeaways: ["World-class physician joins Anera's advisory board", "Focus on clinical validation and safety", "Strengthens Anera's pharmaceutical-grade standards"],
    content: "<h2>A New Era of Scientific Leadership</h2><p>Anera Life is proud to announce that Dr. Gabriel Alizaidy has joined the Anera Scientific Advisory Board, bringing decades of clinical expertise.</p>"
  },
  {
    id: 10, slug: "vo2-max-mitochondria-nmn",
    title: "VO₂ Max, Mitochondria, and NMN: How Oxygen Power Drives Longevity",
    date: "March 5, 2026", tag: "NMN Supplement", filter: "nmn", icon: "🫁", bannerClass: "alt2", readTime: "10 min read",
    lead: "Your body's ability to use oxygen is one of the strongest predictors of how long you'll live.",
    takeaways: ["VO₂ max is a top predictor of all-cause mortality", "Mitochondrial efficiency directly impacts VO₂ max", "NAD⁺ is essential for mitochondrial function", "NMN supplementation may support cardiovascular fitness"],
    content: "<h2>VO₂ Max: The Longevity Biomarker</h2><p>VO₂ max measures the maximum rate at which your body can consume oxygen during intense exercise. It is strongly correlated with longevity.</p>"
  },
  {
    id: 11, slug: "best-nmn-supplement-canada-2026",
    title: "Best NMN Supplement in Canada 2026 — Quality, Purity & Trust",
    date: "February 15, 2026", tag: "Canada", filter: "canada", icon: "🇨🇦", bannerClass: "alt4", readTime: "9 min read",
    lead: "How to identify the best NMN supplement in Canada — and why purity matters more than you think.",
    takeaways: ["Canada's NMN market lacks consistent regulation", "Endotoxin testing separates pharmaceutical-grade from generic", "Anera is the only NMN clinically tested in human trials"],
    content: "<h2>The Canadian NMN Landscape</h2><p>As NMN gains popularity in Canada, the market has been flooded with products of varying quality.</p>"
  },
  {
    id: 12, slug: "nmn-trans-resveratrol-24000-explained",
    title: "NMN + Trans-Resveratrol 24000 Explained — The Science Behind the Stack",
    date: "February 8, 2026", tag: "NMN Supplement", filter: "nmn", icon: "🔬", bannerClass: "alt5", readTime: "11 min read",
    lead: "Why combining NMN with Trans-Resveratrol creates a synergistic longevity formula.",
    takeaways: ["NMN boosts NAD⁺, Trans-Resveratrol activates sirtuins", "The combination is more effective than either alone", "24000 delivers optimal doses of both compounds"],
    content: "<h2>The Dual-Action Approach</h2><p>NMN and Trans-Resveratrol target different but complementary pathways in the longevity cascade.</p>"
  },
  {
    id: 13, slug: "when-to-take-nmn-morning-or-night",
    title: "When to Take NMN — Morning or Night? The Definitive Timing Guide",
    date: "January 28, 2026", tag: "Timing & Dosage", filter: "timing", icon: "🌅", bannerClass: "alt1", readTime: "6 min read",
    lead: "The timing of NMN supplementation can influence its effectiveness.",
    takeaways: ["Morning dosing aligns with circadian NAD⁺ peaks", "Take with food for better absorption", "Consistency matters more than exact timing"],
    content: "<h2>Circadian Biology and NAD⁺</h2><p>Your body's NAD⁺ levels naturally fluctuate throughout the day, peaking in the morning.</p>"
  },
  {
    id: 14, slug: "nmn-vs-nr-which-is-better",
    title: "NMN vs NR (Nicotinamide Riboside) — Which NAD⁺ Booster Is Better?",
    date: "January 20, 2026", tag: "Supplement Guide", filter: "guide", icon: "⚖️", bannerClass: "alt2", readTime: "9 min read",
    lead: "A comprehensive comparison of the two leading NAD⁺ precursors.",
    takeaways: ["NMN is one step closer to NAD⁺ than NR", "NMN has stronger human clinical trial data", "NR requires an extra conversion step"],
    content: "<h2>Understanding the NAD⁺ Pathway</h2><p>Both NMN and NR are precursors to NAD⁺, but they enter the biosynthesis pathway at different points.</p>"
  },
  {
    id: 15, slug: "5-signs-nad-levels-are-low",
    title: "5 Signs Your NAD⁺ Levels Are Low — And What to Do About It",
    date: "January 12, 2026", tag: "NMN Supplement", filter: "nmn", icon: "⚡", bannerClass: "alt3", readTime: "6 min read",
    lead: "Your body may be signaling that NAD⁺ levels are declining.",
    takeaways: ["Chronic fatigue is the most common sign", "Brain fog and poor focus indicate NAD⁺ decline", "Slow recovery from exercise", "Poor sleep quality", "Visible aging acceleration"],
    content: "<h2>Recognizing the Signs</h2><p>NAD⁺ decline doesn't happen overnight. The symptoms are gradual and often attributed to 'just getting older.'</p>"
  },
  {
    id: 16, slug: "nmn-and-exercise-performance",
    title: "NMN and Exercise Performance — How NAD⁺ Fuels Athletic Recovery",
    date: "January 5, 2026", tag: "NMN Supplement", filter: "nmn", icon: "🏃", bannerClass: "alt4", readTime: "8 min read",
    lead: "How NMN supplementation supports athletic performance and recovery.",
    takeaways: ["NAD⁺ is critical for mitochondrial energy production", "NMN may improve exercise endurance", "Faster recovery through enhanced cellular repair"],
    content: "<h2>The Athlete's Energy Crisis</h2><p>Exercise demands enormous amounts of cellular energy, and NAD⁺ is at the center of that process.</p>"
  },
  {
    id: 17, slug: "nmn-dosage-guide-250mg-vs-500mg",
    title: "NMN Dosage Guide: 250mg vs 500mg — Finding Your Optimal Dose",
    date: "December 28, 2025", tag: "Timing & Dosage", filter: "timing", icon: "💊", bannerClass: "alt5", readTime: "7 min read",
    lead: "Understanding NMN dosing — how much is enough, and when is more too much?",
    takeaways: ["250mg is the most studied dose in human trials", "500mg may benefit those with higher metabolic demands", "Start low and adjust based on response"],
    content: "<h2>Dose-Response in NMN Research</h2><p>Clinical trials have studied NMN at doses ranging from 250mg to 1200mg per day.</p>"
  },
  {
    id: 18, slug: "what-is-nad-and-why-does-it-decline",
    title: "What Is NAD⁺ and Why Does It Decline With Age?",
    date: "December 20, 2025", tag: "NMN Supplement", filter: "nmn", icon: "🔋", bannerClass: "alt1", readTime: "8 min read",
    lead: "NAD⁺ is essential for life. Understanding why it declines is the first step to addressing it.",
    takeaways: ["NAD⁺ is involved in 500+ enzymatic reactions", "Levels decline 40-50% by middle age", "CD38 enzyme activity increases with age, consuming NAD⁺"],
    content: "<h2>NAD⁺: The Master Molecule</h2><p>NAD⁺ was first discovered in 1906, but its role in aging has only recently been understood.</p>"
  },
  {
    id: 19, slug: "nmn-and-brain-health-cognitive-benefits",
    title: "NMN and Brain Health — Can NAD⁺ Support Cognitive Function?",
    date: "December 12, 2025", tag: "NMN Supplement", filter: "nmn", icon: "🧠", bannerClass: "alt2", readTime: "9 min read",
    lead: "The brain is the most energy-demanding organ. NAD⁺ may hold the key to maintaining cognitive function.",
    takeaways: ["The brain uses 20% of total body energy", "NAD⁺ supports neuronal mitochondrial function", "NMN may protect against age-related cognitive decline"],
    content: "<h2>The Brain's Energy Demands</h2><p>Your brain accounts for only 2% of body weight but consumes 20% of your energy.</p>"
  },
  {
    id: 20, slug: "nmn-supplement-safety-side-effects",
    title: "Is NMN Safe? Side Effects, Clinical Data & What the Research Shows",
    date: "December 5, 2025", tag: "Supplement Guide", filter: "guide", icon: "🛡️", bannerClass: "alt3", readTime: "7 min read",
    lead: "A comprehensive review of NMN safety data from human clinical trials.",
    takeaways: ["NMN has an excellent safety profile in clinical studies", "No significant adverse effects at recommended doses", "Pharmaceutical-grade purity minimizes contamination risk"],
    content: "<h2>Clinical Safety Evidence</h2><p>Multiple human clinical trials have evaluated NMN safety at doses ranging from 250mg to 1200mg daily.</p>"
  },
  {
    id: 21, slug: "trans-resveratrol-benefits-longevity",
    title: "Trans-Resveratrol: Benefits, Science & Why It Pairs With NMN",
    date: "November 28, 2025", tag: "Supplement Guide", filter: "guide", icon: "🍇", bannerClass: "alt4", readTime: "8 min read",
    lead: "Trans-Resveratrol is more than a red wine compound — it's a powerful sirtuin activator.",
    takeaways: ["Trans-Resveratrol activates SIRT1 longevity genes", "It provides powerful antioxidant protection", "Synergistic with NMN for dual-pathway activation"],
    content: "<h2>Beyond Red Wine</h2><p>While resveratrol gained fame as the 'red wine molecule,' its bioactive trans form is far more potent.</p>"
  },
  {
    id: 22, slug: "nmn-and-skin-health-anti-aging",
    title: "NMN and Skin Health — How NAD⁺ Supports Anti-Aging From Within",
    date: "November 20, 2025", tag: "NMN Supplement", filter: "nmn", icon: "✨", bannerClass: "alt5", readTime: "7 min read",
    lead: "Skin aging is driven by the same cellular decline that affects every organ.",
    takeaways: ["NAD⁺ supports DNA repair in skin cells", "Improved collagen production through sirtuin activation", "Users report visible skin improvements within months"],
    content: "<h2>Skin Aging at the Cellular Level</h2><p>Your skin is your largest organ and one of the first to show signs of NAD⁺ decline.</p>"
  },
  {
    id: 23, slug: "nmn-for-women-hormones-and-aging",
    title: "NMN for Women — Hormones, Metabolism & Healthy Aging",
    date: "November 12, 2025", tag: "NMN Supplement", filter: "nmn", icon: "♀️", bannerClass: "alt1", readTime: "8 min read",
    lead: "Women face unique challenges as NAD⁺ declines — from hormonal shifts to metabolic changes.",
    takeaways: ["NAD⁺ decline accelerates during perimenopause", "NMN may support hormonal balance", "Metabolic benefits are particularly relevant for women"],
    content: "<h2>Women and NAD⁺ Decline</h2><p>Women experience NAD⁺ decline differently than men, particularly around perimenopause and menopause.</p>"
  },
  {
    id: 24, slug: "how-to-stack-nmn-with-other-supplements",
    title: "How to Stack NMN With Other Supplements — A Science-Based Guide",
    date: "November 5, 2025", tag: "Stacking", filter: "stack", icon: "📚", bannerClass: "alt2", readTime: "10 min read",
    lead: "Maximize your longevity protocol with evidence-based supplement stacking.",
    takeaways: ["NMN + Trans-Resveratrol is the foundational stack", "TMG supports methylation when taking NMN", "Timing and dosing matter for each combination"],
    content: "<h2>Building Your Longevity Stack</h2><p>NMN works best as part of a comprehensive supplement strategy.</p>"
  },
  {
    id: 25, slug: "nmn-and-sleep-quality",
    title: "NMN and Sleep Quality — How NAD⁺ Regulates Your Circadian Rhythm",
    date: "October 28, 2025", tag: "NMN Supplement", filter: "nmn", icon: "😴", bannerClass: "alt3", readTime: "7 min read",
    lead: "Poor sleep accelerates aging. NAD⁺ plays a critical role in your body's internal clock.",
    takeaways: ["NAD⁺ directly regulates circadian clock genes", "NMN users report improved sleep quality", "Better sleep enhances every other NMN benefit"],
    content: "<h2>The Sleep-Aging Connection</h2><p>Sleep is when your body does its most critical repair work, and NAD⁺ is essential to that process.</p>"
  },
  {
    id: 26, slug: "endotoxin-testing-why-it-matters",
    title: "Endotoxin Testing: Why <20 Eu/g Matters for NMN Quality",
    date: "October 20, 2025", tag: "Supplement Guide", filter: "guide", icon: "🔬", bannerClass: "alt4", readTime: "8 min read",
    lead: "Most NMN brands don't test for endotoxins. Here's why Anera does.",
    takeaways: ["Endotoxins are bacterial contaminants in many supplements", "Most NMN products contain 50-1000 Eu/g", "Anera maintains <20 Eu/g — pharmaceutical-grade standard"],
    content: "<h2>The Hidden Contamination Problem</h2><p>In 2022, researchers revealed that many NMN supplements were contaminated with endotoxins.</p>"
  },
  {
    id: 27, slug: "nmn-and-heart-health",
    title: "NMN and Heart Health — Cardiovascular Benefits of NAD⁺ Restoration",
    date: "October 12, 2025", tag: "NMN Supplement", filter: "nmn", icon: "❤️", bannerClass: "alt5", readTime: "8 min read",
    lead: "Heart disease remains the leading cause of death. NAD⁺ may offer a new approach to cardiovascular health.",
    takeaways: ["NAD⁺ supports endothelial function", "NMN may improve vascular elasticity", "Combined with Trans-Resveratrol for comprehensive heart support"],
    content: "<h2>NAD⁺ and the Cardiovascular System</h2><p>Your heart is one of the most metabolically active organs, making it especially sensitive to NAD⁺ decline.</p>"
  },
  {
    id: 28, slug: "nmn-canada-legal-status-2026",
    title: "NMN in Canada: Legal Status, Regulations & What You Need to Know (2026)",
    date: "October 5, 2025", tag: "Canada", filter: "canada", icon: "⚖️", bannerClass: "alt1", readTime: "6 min read",
    lead: "Understanding the regulatory landscape for NMN supplements in Canada.",
    takeaways: ["NMN is legal to sell and purchase in Canada", "Health Canada has not assigned an NPN to NMN", "Quality varies dramatically between brands"],
    content: "<h2>NMN's Regulatory Status in Canada</h2><p>Unlike the US where NMN faced an FDA challenge, Canada's regulatory environment is different.</p>"
  },
  {
    id: 29, slug: "nmn-and-weight-management",
    title: "NMN and Weight Management — How NAD⁺ Influences Metabolism",
    date: "September 28, 2025", tag: "NMN Supplement", filter: "nmn", icon: "⚖️", bannerClass: "alt2", readTime: "7 min read",
    lead: "Metabolism slows with age — not because of laziness, but because of NAD⁺ decline.",
    takeaways: ["NAD⁺ is essential for metabolic enzyme function", "NMN may improve insulin sensitivity", "Enhanced fat oxidation through mitochondrial support"],
    content: "<h2>The Metabolic Slowdown</h2><p>Most people notice their metabolism slowing in their 30s and 40s. This isn't coincidence — it correlates with NAD⁺ decline.</p>"
  },
  {
    id: 30, slug: "nmn-for-immune-system-support",
    title: "NMN and Immune Function — How NAD⁺ Supports Your Body's Defense System",
    date: "September 20, 2025", tag: "NMN Supplement", filter: "nmn", icon: "🛡️", bannerClass: "alt3", readTime: "7 min read",
    lead: "Your immune system depends on NAD⁺ for optimal function.",
    takeaways: ["NAD⁺ is critical for immune cell energy production", "Declining NAD⁺ contributes to immunosenescence", "NMN may help maintain immune function with age"],
    content: "<h2>Immunity and Aging</h2><p>As we age, our immune system becomes less effective — a process known as immunosenescence.</p>"
  },
  {
    id: 31, slug: "buying-nmn-online-canada-what-to-look-for",
    title: "Buying NMN Online in Canada — What to Look For (And What to Avoid)",
    date: "September 12, 2025", tag: "Canada", filter: "canada", icon: "🛒", bannerClass: "alt4", readTime: "6 min read",
    lead: "A practical guide to purchasing NMN supplements safely in Canada.",
    takeaways: ["Look for third-party testing certificates", "Verify endotoxin levels are disclosed", "Avoid products without clear manufacturing standards"],
    content: "<h2>Navigating the Online Market</h2><p>Buying NMN online in Canada can be overwhelming. Here's how to separate quality from noise.</p>"
  }
];

const FILTERS = [
  { label: "All", value: "all" },
  { label: "NMN Supplement", value: "nmn" },
  { label: "Anera Announcement", value: "announcement" },
  { label: "Supplement Guide", value: "guide" },
  { label: "Timing & Dosage", value: "timing" },
  { label: "Canada", value: "canada" },
  { label: "Stacking", value: "stack" },
];

const TICKER_WORDS = [
  "HELP", "HEAL", "HUMANITY",
];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function extractHeadings(html: string): { id: string; text: string }[] {
  const headings: { id: string; text: string }[] = [];
  const regex = /<h2>(.*?)<\/h2>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]*>/g, "");
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    headings.push({ id, text });
  }
  return headings;
}

function injectHeadingIds(html: string): string {
  return html.replace(/<h2>(.*?)<\/h2>/g, (_match, inner) => {
    const text = inner.replace(/<[^>]*>/g, "");
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return `<h2 id="${id}">${inner}</h2>`;
  });
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function MediaPage() {
  const [activeView, setActiveView] = useState<"hub" | "article">("hub");
  const [activeArticle, setActiveArticle] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [readingProgress, setReadingProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  /* Filtered articles */
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((a) => {
      const matchesFilter = activeFilter === "all" || a.filter === activeFilter;
      const matchesSearch =
        searchQuery === "" ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.lead.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  /* Current article data */
  const article = ARTICLES[activeArticle];
  const headings = useMemo(() => extractHeadings(article.content), [article.content]);
  const processedContent = useMemo(() => injectHeadingIds(article.content), [article.content]);

  /* Related articles (same tag, excluding current) */
  const relatedArticles = useMemo(() => {
    return ARTICLES.filter((a) => a.tag === article.tag && a.id !== article.id).slice(0, 3);
  }, [article]);

  /* Prev / Next */
  const prevArticle = activeArticle > 0 ? ARTICLES[activeArticle - 1] : null;
  const nextArticle = activeArticle < ARTICLES.length - 1 ? ARTICLES[activeArticle + 1] : null;

  /* Sync state from URL hash on mount and browser back/forward */
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.slice(1);
      const found = ARTICLES.find((a) => a.slug === hash);
      if (found) {
        setActiveArticle(found.id);
        setActiveView("article");
      } else {
        setActiveView("hub");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Sync on initial load (handles refresh on article URL)
    const hash = window.location.hash.slice(1);
    const found = ARTICLES.find((a) => a.slug === hash);
    if (found) {
      setActiveArticle(found.id);
      setActiveView("article");
    }

    // hashchange fires on browser back/forward when the hash changes
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  /* Open article */
  const openArticle = useCallback((id: number) => {
    const a = ARTICLES[id];
    if ("externalHref" in a && a.externalHref) {
      window.location.href = a.externalHref;
      return;
    }
    // pushState does NOT trigger hashchange — update state manually here
    window.history.pushState(null, "", `/media#${a.slug}`);
    setActiveArticle(id);
    setActiveView("article");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* Back to hub */
  const backToHub = useCallback(() => {
    // Go back in history — hashchange will fire and sync state
    window.history.back();
  }, []);

  /* Reading progress bar */
  useEffect(() => {
    if (activeView !== "article") {
      setReadingProgress(0);
      return;
    }
    const handleScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      const pct = Math.min(Math.max(scrolled / total, 0), 1) * 100;
      setReadingProgress(pct);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeView]);

  /* Copy link handler */
  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.origin + "/media#" + article.slug);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  }, [article.slug]);

  /* Share on Twitter */
  const shareTwitter = useCallback(() => {
    const url = encodeURIComponent(window.location.origin + "/media#" + article.slug);
    const text = encodeURIComponent(article.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
  }, [article]);

  /* Share on LinkedIn */
  const shareLinkedIn = useCallback(() => {
    const url = encodeURIComponent(window.location.origin + "/media#" + article.slug);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  }, [article]);

  /* ---------------------------------------------------------------- */
  /*  ARTICLE VIEW                                                     */
  /* ---------------------------------------------------------------- */

  if (activeView === "article") {
    return (
      <>
        {/* Reading progress bar */}
        <div className="mh-progress-bar" style={{ width: `${readingProgress}%` }} />

        <div className="mh-article-page" ref={articleRef}>
          {/* Breadcrumb */}
          <nav className="mh-breadcrumb">
            <button className="mh-breadcrumb__link" onClick={backToHub}>
              Media Hub
            </button>
            <span className="mh-breadcrumb__sep">&gt;</span>
            <span className="mh-breadcrumb__current">{article.title}</span>
          </nav>

          {/* Banner */}
          <div className={`mh-article-banner ${article.bannerClass ? `mh-article-banner--${article.bannerClass}` : ""}`}>
            <span className="mh-article-banner__icon">{article.icon}</span>
          </div>

          <div className="mh-article-layout">
            {/* Main content */}
            <main className="mh-article-main">
              {/* Header */}
              <header className="mh-article-header">
                <div className="mh-article-meta">
                  <span className="mh-article-tag">{article.tag}</span>
                  <span className="mh-article-date">{article.date}</span>
                  <span className="mh-article-readtime">{article.readTime}</span>
                </div>
                <h1 className="mh-article-title">{article.title}</h1>
                <p className="mh-article-lead">{article.lead}</p>
              </header>

              {/* Prose */}
              <div
                className="mh-article-prose"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              {/* Key Takeaways */}
              <div className="mh-takeaways">
                <h3 className="mh-takeaways__title">Key Takeaways</h3>
                <ul className="mh-takeaways__list">
                  {article.takeaways.map((t, i) => (
                    <li key={i} className="mh-takeaways__item">{t}</li>
                  ))}
                </ul>
              </div>

              {/* Share buttons */}
              <div className="mh-share">
                <span className="mh-share__label">Share this article</span>
                <div className="mh-share__buttons">
                  <button className="mh-share__btn" onClick={shareTwitter} aria-label="Share on Twitter">
                    Twitter
                  </button>
                  <button className="mh-share__btn" onClick={shareLinkedIn} aria-label="Share on LinkedIn">
                    LinkedIn
                  </button>
                  <button className="mh-share__btn" onClick={copyLink} aria-label="Copy link">
                    {copiedLink ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              </div>
            </main>

            {/* Sidebar */}
            <aside className="mh-article-sidebar">
              {/* Table of Contents */}
              {headings.length > 0 && (
                <div className="mh-toc">
                  <h4 className="mh-toc__title">Table of Contents</h4>
                  <ul className="mh-toc__list">
                    {headings.map((h, i) => (
                      <li key={i}>
                        <a className="mh-toc__link" href={`#${h.id}`}>
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="mh-related">
                  <h4 className="mh-related__title">Related Articles</h4>
                  <ul className="mh-related__list">
                    {relatedArticles.map((ra) => (
                      <li key={ra.id}>
                        <button
                          className="mh-related__link"
                          onClick={() => openArticle(ra.id)}
                        >
                          <span className="mh-related__icon">{ra.icon}</span>
                          <span className="mh-related__text">{ra.title}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Product CTA */}
              <div className="mh-product-cta">
                <p className="mh-product-cta__label">Explore Anera</p>
                <h4 className="mh-product-cta__title">NMN 15000</h4>
                <p className="mh-product-cta__text">
                  Pharmaceutical-grade NMN, clinically tested in human trials.
                </p>
                <a href="/products" className="mh-product-cta__btn">
                  View Products
                </a>
              </div>
            </aside>
          </div>

          {/* Prev / Next Navigation */}
          <nav className="mh-article-nav">
            {prevArticle ? (
              <button
                className="mh-article-nav__btn mh-article-nav__btn--prev"
                onClick={() => openArticle(prevArticle.id)}
              >
                <span className="mh-article-nav__direction">Previous Article</span>
                <span className="mh-article-nav__title">{prevArticle.title}</span>
              </button>
            ) : (
              <div />
            )}
            {nextArticle ? (
              <button
                className="mh-article-nav__btn mh-article-nav__btn--next"
                onClick={() => openArticle(nextArticle.id)}
              >
                <span className="mh-article-nav__direction">Next Article</span>
                <span className="mh-article-nav__title">{nextArticle.title}</span>
              </button>
            ) : (
              <div />
            )}
          </nav>
        </div>
      </>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  HUB VIEW                                                         */
  /* ---------------------------------------------------------------- */

  const featured = ARTICLES[0];

  return (
    <>
      {/* Video Hero — wraps hero + featured */}
      <div className="mh-video-hero">
        <video className="mh-video-hero__bg" autoPlay muted loop playsInline>
          <source src="/assets/shine-molecule.webm" type="video/webm" />
        </video>
        <div className="mh-video-hero__overlay" />

        {/* Hero Section */}
        <section className="mh-hero">
          <div className="mh-hero__inner">
            <p className="mh-hero__label">Media Hub</p>
            <h1 className="mh-hero__title">Articles &amp; Research.</h1>
            <p className="mh-hero__body">
              Science-backed insights on NMN, NAD⁺, and longevity. From research
              breakdowns to dosing guides — everything you need to make informed
              decisions about your health.
            </p>
            <div className="mh-hero__stats">
              <div className="mh-hero__stat">
                <span className="mh-hero__stat-number">31</span>
                <span className="mh-hero__stat-label">Articles</span>
              </div>
              <div className="mh-hero__stat">
                <span className="mh-hero__stat-number">6</span>
                <span className="mh-hero__stat-label">Topics</span>
              </div>
              <div className="mh-hero__stat">
                <span className="mh-hero__stat-number">2026</span>
                <span className="mh-hero__stat-label">Updated</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="mh-featured">
          <div className="mh-featured__inner">
            <button className="mh-featured__card" onClick={() => openArticle(featured.id)} aria-label={featured.title}>
              <div className="mh-featured__icon">
                <video className="mh-featured__video" autoPlay muted loop playsInline>
                  <source src="/assets/shine-molecule.webm" type="video/webm" />
                </video>
              </div>
              <div className="mh-featured__content">
                <span className="mh-featured__tag">{featured.tag}</span>
                <h2 className="mh-featured__title">{featured.title}</h2>
                <p className="mh-featured__lead">{featured.lead}</p>
                <div className="mh-featured__meta">
                  <span>{featured.date}</span>
                  <span>{featured.readTime}</span>
                </div>
                <span className="mh-featured__link">Read Article &rarr;</span>
              </div>
            </button>
          </div>
        </section>
      </div>

      {/* Ticker */}
      <div className="mh-ticker">
        <div className="mh-ticker__track" aria-hidden="true">
          {[...TICKER_WORDS, ...TICKER_WORDS].map((word, i) => (
            <span key={i} className="mh-ticker__word">{word}</span>
          ))}
        </div>
      </div>

      {/* Filters & Search */}
      <section className="mh-filters">
        <div className="mh-filters__inner">
          <div className="mh-filters__tags">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={`mh-filters__tag ${activeFilter === f.value ? "mh-filters__tag--active" : ""}`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="mh-filters__search">
            <input
              type="text"
              className="mh-filters__input"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="mh-grid-section">
        <div className="mh-grid-section__inner">
          {filteredArticles.length === 0 ? (
            <div className="mh-grid-empty">
              <p>No articles found matching your search.</p>
            </div>
          ) : (
            <div className="mh-grid">
              {filteredArticles.map((a) => (
                <button
                  key={a.id}
                  className="mh-card"
                  onClick={() => openArticle(a.id)}
                >
                  <div className="mh-card__icon">{a.icon}</div>
                  <div className="mh-card__body">
                    <div className="mh-card__meta">
                      <span className="mh-card__date">{a.date}</span>
                      <span className="mh-card__tag">{a.tag}</span>
                    </div>
                    <h3 className="mh-card__title">{a.title}</h3>
                    <p className="mh-card__excerpt">{a.lead}</p>
                    <div className="mh-card__footer">
                      <span className="mh-card__readtime">{a.readTime}</span>
                      <span className="mh-card__link">Read Article &rarr;</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mh-newsletter">
        <video className="mh-newsletter__bg" autoPlay muted loop playsInline>
          <source src="/assets/BLUE DNA.webm" type="video/webm" />
        </video>
        <div className="mh-newsletter__overlay" />
        <div className="mh-newsletter__inner">
          <h2 className="mh-newsletter__title">Stay in the loop.</h2>
          <p className="mh-newsletter__text">
            Get the latest longevity research, product updates, and exclusive
            insights delivered to your inbox.
          </p>
          <form className="mh-newsletter__form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              className="mh-newsletter__input"
              placeholder="Enter your email"
            />
            <button type="submit" className="mh-newsletter__btn">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
