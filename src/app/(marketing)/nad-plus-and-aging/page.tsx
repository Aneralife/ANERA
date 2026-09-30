import Link from "next/link";
import { jsonLdScript, siteUrl } from "@/lib/seo";
import "../how-to-choose-the-best-nmn-supplement-the-ultimate-buyers-guide/article.css";

const CANONICAL = `${siteUrl}/nad-plus-and-aging`;
const PUBLISHED = "2026-09-30";
const LNHPD_URL = "https://health-products.canada.ca/lnhpd-bdpsnh/search-recherche";
const NMN_15000 = "/products/nad-booster-nmn-15000";
const NMN_TR = "/products/nmn-trans-resveratrol-24000";
const MEDIA = "/media";

const DESCRIPTION =
  "Learn what human studies suggest about NAD⁺ and aging, why one percentage is the wrong takeaway, how NMN fits as a precursor, and what a Canadian NPN means. Education from ANERA.";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "Does NAD⁺ always decline with age?",
    answer:
      "Not as a universal law for every tissue in every person. Human data often show lower NAD⁺-related measures in older adults in some tissues and study designs. The magnitude and consistency depend on what was measured. Treat “always” and “one percentage for everyone” with skepticism.",
  },
  {
    question: "Is lower NAD⁺ a disease?",
    answer:
      "No. Research patterns about NAD⁺ and age are not a diagnosis. Only a qualified clinician can interpret your personal health status. Do not use an article, a chart, or a supplement label as a substitute for medical care.",
  },
  {
    question: "What is NMN in relation to NAD⁺?",
    answer:
      "NMN (nicotinamide mononucleotide) is a precursor molecule in NAD⁺ biosynthetic pathways. Education about NMN should explain that relationship without promising disease treatment or guaranteed longevity outcomes. Product decisions should follow labelled conditions of use and practitioner guidance where appropriate.",
  },
  {
    question: "What does a Canadian NPN mean?",
    answer:
      "A Natural Product Number is Health Canada’s eight-digit product licence number for a natural health product assessed for sale under its recommended conditions of use. You can look up licensed products in the LNHPD. An NPN supports labelled use. It does not authorize unlimited marketing claims.",
  },
  {
    question: "Is this medical advice?",
    answer:
      "No. This article is for education. It is not medical advice, diagnosis, or treatment. Consult a qualified health practitioner for personal decisions, especially if you are pregnant, nursing, taking medications, or managing a health condition.",
  },
  {
    question: "Should I take NMN or NR?",
    answer:
      "That is a personal and, ideally, practitioner-informed decision. Both are studied NAD⁺ precursors. Compare purity, licensing, dose, your context, and the actual evidence for the outcome you care about. ANERA does not run a ranking war. We publish literacy and offer licensed products for people who choose that path.",
  },
];

function artLink(href: string, label: string) {
  return `<a href="${href}" class="art-internal-link"><strong>${label}</strong></a>`;
}

const ARTICLE_HTML = [
  `<p class="art-lead">NAD⁺ (nicotinamide adenine dinucleotide) is a coenzyme cells use in energy metabolism and other core chemistry. Across human studies, NAD⁺ levels often tend to be lower in older adults than in younger ones, but the size of that change depends on the tissue measured and the study design. That pattern is a useful scientific direction, not a single magic percentage that applies to “the whole body,” and it is not a diagnosis.</p>`,
  `<p>For longevity education, the honest framing matters: declining NAD⁺ is one measurable piece of cellular energy biology. Supplement conversations (including NMN, a NAD⁺ precursor pathway) should stay inside structure/function language for licensed natural health products in Canada, and should not promise disease treatment, youth restoration, or guaranteed biomarker outcomes.</p>`,
  `<p>This hub explains the biology in plain language, what human data can and cannot say yet, how to read NPN-licensed products without hype, and how ANERA approaches cellular health education with claim humility.</p>`,
  `<h2><strong>What NAD⁺ does in cells (plain English)</strong></h2>`,
  `<p>NAD⁺ is one of the cell’s workhorse molecules. In simple terms, it helps move electrons during the chemistry that turns food into usable cellular energy (ATP). It also acts as a co-substrate for enzymes involved in DNA repair signaling, gene regulation (including sirtuins), and other maintenance pathways that keep cellular systems running.</p>`,
  `<p>You do not need a biochemistry degree to hold the useful takeaway:</p>`,
  `<ol>`,
  `<li><strong>Energy chemistry:</strong> Cells continually cycle NAD⁺ and its reduced form (NADH) as part of metabolism.</li>`,
  `<li><strong>Maintenance chemistry:</strong> Some enzymes “consume” NAD⁺ while they do repair or signaling work, so the cell must keep replenishing the pool.</li>`,
  `<li><strong>Balance matters:</strong> Levels reflect both production (biosynthesis and salvage pathways) and consumption. Aging, lifestyle, and tissue context can shift that balance.</li>`,
  `</ol>`,
  `<p>The body can make NAD⁺ through several routes, including salvage pathways that recycle nicotinamide and pathways that use dietary vitamin B₃ forms. Precursor molecules such as nicotinamide mononucleotide (NMN) and nicotinamide riboside (NR) sit upstream of NAD⁺ in those pathways. That is why they appear in longevity education: they are inputs to a known biosynthetic map, not magic on their own.</p>`,
  `<p>For product literacy after you understand the biology, see ${artLink(NMN_15000, "NMN 15000")} and ${artLink(NMN_TR, "NMN + Trans-Resveratrol 24000")}. For broader reading, start at the ${artLink(MEDIA, "Science / Media hub")}.</p>`,
  `<h2><strong>What human data suggest about NAD⁺ and age (direction + limits)</strong></h2>`,
  `<p>The honest headline for human data is this: <strong>many studies report that NAD⁺ (or closely related NAD(H) measures) tend to be lower in older adults in some tissues</strong>, and <strong>the evidence is still sparse, often cross-sectional, and tissue-specific</strong>.</p>`,
  `<p>Reviews that carefully inventory the literature reach a similar caution. Claims of a universal, whole-body NAD⁺ collapse with age outrun what the human data can currently support. Some human work reports age-related declines in tissues or compartments such as skin, brain (via imaging or CSF-related measures), blood or plasma, and selected other samples. Other measurements show modest changes, mixed results, or no clear age effect depending on method and cohort. Sample sizes are often small. Longitudinal human studies that track the same people across decades remain limited.</p>`,
  `<p>What that means for a careful reader:</p>`,
  `<ul>`,
  `<li><strong>Direction:</strong> “Often lower with age in the tissues studied” is a fair scientific direction.</li>`,
  `<li><strong>Not a slogan:</strong> “NAD⁺ always drops X% by age Y for everyone” is marketing language, not a settled human fact.</li>`,
  `<li><strong>Not a diagnosis:</strong> A population pattern in research is not a personal medical finding.</li>`,
  `</ul>`,
  `<p>If you see a chart that implies one smooth curve for “the body,” treat it as illustrative education unless the source names the tissue, the assay, and the study design.</p>`,
  `<h2><strong>Why “one percentage for everyone” is the wrong takeaway</strong></h2>`,
  `<p>Viral longevity content loves a single number: “NAD⁺ falls 50% by midlife,” “halves every twenty years,” and similar lines. Those phrases travel well on social platforms. They travel poorly through peer-reviewed nuance.</p>`,
  `<p>Why a single percentage fails:</p>`,
  `<ol>`,
  `<li><strong>Tissue is not interchangeable.</strong> Muscle, liver, brain, skin, blood, and adipose tissue are different environments. A finding in one does not automatically transfer to another.</li>`,
  `<li><strong>Method matters.</strong> Total NAD⁺, free NAD⁺, NAD⁺/NADH ratio, NAMPT protein levels, and imaging-derived estimates are related but not identical readouts.</li>`,
  `<li><strong>People differ.</strong> Training status, metabolic health, inflammation, diet, and genetics can all sit underneath age as confounders. Some research even suggests exercise-trained older adults can look more like younger controls on certain NAD⁺-related measures.</li>`,
  `<li><strong>Cross-sectional ≠ destiny.</strong> Comparing a 25-year-old cohort to a 70-year-old cohort is not the same as watching one person’s NAD⁺ change over 45 years.</li>`,
  `<li><strong>Rodent data ≠ human guarantees.</strong> Preclinical aging biology is valuable. It is not a substitute for adequately powered human outcomes.</li>`,
  `</ol>`,
  `<p>ANERA’s education standard is simple: <strong>prefer direction + limits over a viral percentage.</strong> If a number appears in our content, it should be tied to a named study, tissue, and context, or it should not appear.</p>`,
  `<h2><strong>NAD⁺ precursors in context (NMN / NR): education, not a ranking war</strong></h2>`,
  `<p>NMN (nicotinamide mononucleotide) and NR (nicotinamide riboside) are NAD⁺ precursors. In plain language, they are molecules the body can use along pathways that help replenish NAD⁺. Both have human clinical literature. Both still sit in an evidence landscape that is early relative to the marketing volume around them.</p>`,
  `<p>A claim-safe way to hold the conversation:</p>`,
  `<ul>`,
  `<li><strong>Mechanism literacy:</strong> Precursors feed NAD⁺ biosynthesis. That is chemistry, not a promise of a specific clinical outcome.</li>`,
  `<li><strong>Human trials:</strong> Oral NMN and NR studies often examine safety/tolerability and whether blood or tissue NAD⁺-related markers change. Some trials explore metabolic or functional endpoints. Results vary by dose, duration, population, and endpoint. Many studies are small or short.</li>`,
  `<li><strong>No ranking war:</strong> “NMN vs NR” content that crowns a permanent winner usually oversells incomplete comparative human data. Route of use, purity, dose, and personal context matter more than tribal branding.</li>`,
  `<li><strong>Structure/function only (Canada):</strong> For licensed natural health products, stay with authorized recommended uses. For ANERA’s marketed NMN SKUs, that class of language centers on antioxidant support that helps protect cells against free radicals, not disease treatment claims.</li>`,
  `</ul>`,
  `<p>Lifestyle foundations still matter. Sleep, nutrition, movement, and medical care are not optional footnotes because a precursor exists.</p>`,
  `<p>Explore ${artLink(NMN_15000, "NMN 15000")} for a single-ingredient NMN capsule option, or ${artLink(NMN_TR, "NMN + Trans-Resveratrol 24000")} for NMN with trans-resveratrol. Pair product pages with the ${artLink(MEDIA, "Science / Media hub")} rather than treating a bottle as a syllabus.</p>`,
  `<h2><strong>How to evaluate claims (NPN, GMP, testing culture)</strong></h2>`,
  `<p>Longevity shopping is loud. A quieter checklist usually predicts quality better than a louder headline.</p>`,
  `<h3><strong>1. Look for a Canadian NPN when the product is sold as a natural health product in Canada</strong></h3>`,
  `<p>An eight-digit Natural Product Number (NPN) means Health Canada has issued a product licence after assessing the product under its recommended conditions of use. You can verify licensed products in the ${artLink(LNHPD_URL, "Licensed Natural Health Products Database (LNHPD)")}. An NPN is not a blank cheque for any claim a brand invents on social media. It is tied to labelled medicinal ingredients, dose, and authorized recommended use.</p>`,
  `<p>ANERA’s currently marketed longevity SKUs for public soft-bridges:</p>`,
  `<div class="art-table-wrap">`,
  `<table class="art-table art-table--cols-3">`,
  `<thead><tr><th><strong>Product</strong></th><th><strong>NPN</strong></th><th><strong>Role in this hub</strong></th></tr></thead>`,
  `<tbody>`,
  `<tr><td>${artLink(NMN_15000, "NMN 15000 (Uthever® NMN 250 mg)")}</td><td><strong>80135670</strong></td><td>Licensed NMN capsule</td></tr>`,
  `<tr><td>${artLink(NMN_TR, "NMN + Trans-Resveratrol 24000")}</td><td><strong>80129476</strong></td><td>Licensed NMN + TR capsule</td></tr>`,
  `</tbody>`,
  `</table>`,
  `</div>`,
  `<h3><strong>2. Ask how it is made</strong></h3>`,
  `<p>Prefer transparent manufacturing culture: Canadian GMP-oriented production where claimed, clear medicinal ingredient identity, and batch discipline. “Pharmaceutical-grade” language should map to real specs and testing, not vibes.</p>`,
  `<h3><strong>3. Ask what was tested</strong></h3>`,
  `<p>Independent testing culture typically includes identity/purity, heavy metals, residual solvents, and microbes, with Certificates of Analysis (COA) available on request or published for batches. Endotoxin literacy matters for some NMN buyers and practitioners; ask brands for the numbers rather than slogans.</p>`,
  `<h3><strong>4. Separate education from outcomes</strong></h3>`,
  `<p>Good education explains pathways. Bad marketing guarantees youth, cures, or personal biomarker results. If a claim cannot survive a practitioner reading the label beside Health Canada’s authorized use, it does not belong in ANERA’s voice.</p>`,
  `<h3><strong>5. Prefer practitioner-grade trust paths</strong></h3>`,
  `<p>Many clinicians evaluate supplements through channels that emphasize documentation, consistency, and professional accountability (including platforms such as Fullscript where catalog access applies). That trust path is slower than discount theater. It is usually healthier for long-term use decisions.</p>`,
  `<p>Product pages and the ${artLink(MEDIA, "Science / Media hub")} should carry the quality story without hype.</p>`,
  `<h2><strong>How this connects to ANERA’s licensed NMN products (soft, claim-safe)</strong></h2>`,
  `<p>ANERA is a Canadian longevity company. The mission line is Help Heal Humanity™. The content standard is education first: understand the biology, then decide whether a licensed product fits your routine with a qualified practitioner when personal guidance is needed.</p>`,
  `<p>For readers who want a product bridge after the science:</p>`,
  `<ul>`,
  `<li>${artLink(NMN_15000, "NMN 15000")} (NPN <strong>80135670</strong>): Uthever® enzymatic NMN, 250 mg per capsule, positioned for people who want a focused NMN formula inside Canadian licensing and testing culture.</li>`,
  `<li>${artLink(NMN_TR, "NMN + Trans-Resveratrol 24000")} (NPN <strong>80129476</strong>): NMN with trans-resveratrol for readers who want that combination formula under its own NPN.</li>`,
  `</ul>`,
  `<p>Authorized use language for these marketed NPNs stays in the antioxidant structure/function class: a source of antioxidant(s) that help protect cells against free radicals. That is the claim-safe lane. It is not a disease treatment claim, not a promise to restore youth, and not a guarantee that your personal NAD⁺ will move by a fixed percentage.</p>`,
  `<p>If you work with a practitioner, ask them how NMN fits (or does not fit) your broader plan. Practitioner channels and Fullscript-style catalog review exist so quality documentation can travel with the SKU, not so ads can outrun the label.</p>`,
  `<h2><strong>FAQ</strong></h2>`,
  FAQS.map(
    (faq) =>
      `<h3><strong>${faq.question}</strong></h3>\n<p>${faq.answer.replace("the LNHPD", `the ${artLink(LNHPD_URL, "LNHPD")}`)}</p>`,
  ).join("\n"),
  `<p><strong>Closing</strong></p>`,
  `<p>Cellular energy biology is interesting enough without exaggeration. NAD⁺ sits at the center of real chemistry. Aging research gives a directional signal that levels often look different later in life in some tissues. The responsible response is curiosity with humility: read the tissue, read the study design, read the label, and keep disease claims out of the shopping cart.</p>`,
  `<p>Help Heal Humanity starts with clear language.</p>`,
  `<p><strong>Next reads:</strong> ${artLink(MEDIA, "Science / Media hub")} · ${artLink(NMN_15000, "NMN 15000")} · ${artLink(NMN_TR, "NMN + Trans-Resveratrol 24000")}</p>`,
  `<p><em>Disclaimer: Educational content from Anera Life Inc. Not medical advice. Natural health products should be used according to their labels. Consult a qualified practitioner for personal guidance.</em></p>`,
].join("\n");

const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "What happens to NAD⁺ as we age — and what that actually means",
      description: DESCRIPTION,
      author: {
        "@type": "Organization",
        name: "Anera Life Inc.",
        alternateName: "ANERA",
        url: siteUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "Anera Life Inc.",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/og-image.jpg`,
        },
      },
      datePublished: PUBLISHED,
      dateModified: PUBLISHED,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": CANONICAL,
      },
      keywords:
        "NAD+, NAD plus, aging, NMN, nicotinamide mononucleotide, cellular energy, Health Canada NPN, longevity education",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function NadPlusAndAgingPage() {
  return (
    <article className="art-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd) }}
      />
      <div className="art-page__inner">
        <header className="art-header">
          <span className="art-tag">NAD⁺ Education · Cellular Health</span>
          <h1>What happens to NAD⁺ as we age — and what that actually means</h1>
          <div className="art-meta">September 30, 2026 · ANERA · Anera Life Inc. · 10 min read</div>
        </header>

        <div dangerouslySetInnerHTML={{ __html: ARTICLE_HTML }} />

        <div className="art-cta-section">
          <div className="art-cta-buttons">
            <Link href="/products" className="art-cta-btn">Shop All Products</Link>
            <Link href="/products/nmn-trans-resveratrol-24000" className="art-cta-btn art-cta-btn--secondary">
              Shop NMN + TR 24000
            </Link>
          </div>
          <Link href="/" className="art-cta-link">← Back to Anera Life</Link>
        </div>
      </div>
    </article>
  );
}
