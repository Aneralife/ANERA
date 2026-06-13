import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import { getProductByHandle } from "@/lib/shopify";
import { PurchaseWidget } from "@/components/product/purchase-widget";
import { PdpFaq, PdpGallery } from "@/components/product/pdp-client";

const NMN24000_FAQS = [
  { q: "What is NMN + Trans-Resveratrol 24000?", a: "NMN + Trans-Resveratrol 24000 combines 250mg of pharmaceutical-grade NMN with 150mg of Trans-Resveratrol per capsule. NMN directly boosts NAD+ levels for cellular energy, while Trans-Resveratrol provides potent antioxidant protection — together delivering dual-action support for healthy aging." },
  { q: "What makes Anera different from other NMN supplements?", a: "Anera is the only NMN supplement in the world clinically tested in human trials. Our endotoxin levels are consistently below 20 Eu/g — far below the industry average of 50–1000 Eu/g. We manufacture to pharmaceutical-grade standards, include Trans-Resveratrol for dual-action benefits, and provide full transparency with third-party testing documentation." },
  { q: "When will I start seeing results?", a: "Most users report initial improvements in energy and mental clarity within 1-2 weeks. More significant benefits like improved sleep quality, better exercise recovery, and enhanced biomarkers typically develop over 1-3 months of consistent use. Long-term benefits continue to compound over 6+ months." },
  { q: "How should I take NMN + Trans-Resveratrol 24000?", a: "Take 1 capsule daily with a meal, preferably in the morning. The Trans-Resveratrol component is fat-soluble, so taking it with food enhances absorption. Consistency is key — daily supplementation maintains optimal NAD+ levels for maximum benefit." },
  { q: "Is NMN safe? Are there any side effects?", a: "NMN has been extensively studied in both animal and human clinical trials with an excellent safety profile. Our pharmaceutical-grade NMN is manufactured under strict GMP conditions and undergoes rigorous third-party testing. No significant adverse effects have been reported in clinical studies at recommended dosages." },
  { q: "Can I take NMN with other supplements or medications?", a: "NMN is generally well-tolerated alongside other supplements. However, if you are taking prescription medications, particularly blood thinners or diabetes medications, we recommend consulting your healthcare provider before starting any new supplement regimen." },
];

const NMN15000_FAQS = [
  { q: "What is NMN 15000?", a: "NMN 15000 delivers 250mg of pharmaceutical-grade NMN per capsule — one of the highest-potency formulas available. It helps restore NAD+ levels that naturally decline with age, supporting cellular energy, DNA repair, and healthy aging." },
  { q: "How is NMN 15000 different from NMN + TR 24000?", a: "NMN 15000 is a pure NMN formula focused solely on NAD+ support, while NMN + TR 24000 combines NMN with Trans-Resveratrol for additional antioxidant protection. NMN 15000 is ideal if you want high-potency NMN without additional compounds." },
  { q: "When will I start seeing results?", a: "Most users report initial improvements in energy and mental clarity within 1-2 weeks. More significant benefits like improved sleep quality, better exercise recovery, and enhanced biomarkers typically develop over 1-3 months of consistent use." },
  { q: "How should I take NMN 15000?", a: "Take 1 capsule daily, preferably in the morning with water. Some individuals may take 2 capsules per day depending on their wellness goals and professional guidance. Consistency is key for supporting long-term cellular health." },
  { q: "Is NMN 15000 safe?", a: "Yes. NMN has been extensively studied in clinical trials with an excellent safety profile. NMN 15000 is NPN Certified (License No. 80135670), GMP-certified, and third-party tested for purity and potency. No significant adverse effects have been reported at recommended dosages." },
  { q: "Can I take NMN 15000 with other supplements?", a: "NMN is generally well-tolerated alongside other supplements. However, if you are taking prescription medications, we recommend consulting your healthcare provider before starting any new supplement regimen." },
];

// Maps clean URL handles → Shopify product handles
const SHOPIFY_HANDLE: Record<string, string> = {
  "nad-booster-nmn-15000": "nmn-tr-24000",
  "nmn-trans-resveratrol-24000": "nmn-trans-resveratrol-24000-dual-cellular-support",
};

const PRODUCT_SEO: Record<string, { title: string; description: string }> = {
  "nmn-trans-resveratrol-24000": {
    title: "NMN + Trans-Resveratrol 24000 | 400mg (60 Caps) – 10% Off | Anera Life",
    description:
      "Buy NMN + Trans-Resveratrol 24000 today! 250mg NMN + 150mg TR, third-party tested. Get 10% off + free shipping in Canada/USA on orders $120+",
  },
  "nad-booster-nmn-15000": {
    title: "NMN 15000 (250mg – 60 Capsules) – 10% Off | Anera Life",
    description:
      "Buy NMN 15000 today! High-quality 250 mg capsules, lab-tested, GMP-certified, with free shipping in Canada & USA over $120 CAD. Support your health daily.",
  },
};

type Props = {
  params: { handle: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const shopifyHandle = SHOPIFY_HANDLE[params.handle] ?? params.handle;
  const product = await getProductByHandle(shopifyHandle);
  if (!product) return { title: "Product Not Found" };

  const seo = PRODUCT_SEO[params.handle];
  if (seo) {
    const canonical = `https://www.aneralife.com/products/${params.handle}`;

    return {
      title: { absolute: seo.title },
      description: seo.description,
      openGraph: {
        title: seo.title,
        description: seo.description,
        url: canonical,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: seo.title,
        description: seo.description,
      },
      alternates: {
        canonical,
      },
    };
  }

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const shopifyHandle = SHOPIFY_HANDLE[params.handle] ?? params.handle;
  const product = await getProductByHandle(shopifyHandle);
  if (!product) notFound();

  const defaultVariant =
    product.variants.find((v) => v.availableForSale) || product.variants[0];

  const hasImage = product.images.length > 0;

  /* Base price per bottle (before subscription discounts) */
  const basePriceMap: Record<string, number> = {
    "nmn-trans-resveratrol-24000": 120,
    "nad-booster-nmn-15000": 105,
  };
  const basePrice = basePriceMap[params.handle] || parseFloat(product.priceRange.minVariantPrice.amount);
  const price = `CA$${basePrice}`;
  const perCapsule = (basePrice / 60).toFixed(2);

  return (
    <>
      

      {/* ── Two-Column Hero ── */}
      <section className="pdp-hero" id="pdp-cta">
  
        <div className="pdp-hero__overlay" />
        <div className="pdp-hero__inner">
          {/* Left: Image Column */}
          <div className="pdp-image-col">
            <div className="pdp-image-col__main">
              <span className="pdp-image-col__badge">Made in Canada</span>
              {hasImage ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={product.images[0].url}
                  alt={product.images[0].altText || product.title}
                  className="pdp-image-col__img"
                />
              ) : (
                <div className="pdp-image-col__placeholder">
                  <span>{product.title}</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="pdp-thumbs">
                {product.images.map((img, i) => (
                  <div
                    key={img.url}
                    className={`pdp-thumbs__item${i === 0 ? " pdp-thumbs__item--active" : ""}`}
                  >
                    <Image
                      src={img.url}
                      alt={img.altText || `${product.title} ${i + 1}`}
                      width={80}
                      height={80}
                      className="pdp-thumbs__img"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Product gallery */}
            {params.handle === "nmn-trans-resveratrol-24000" && (
              <PdpGallery images={["24-1.webp","24-2.webp","24-3.webp","24-4.webp","24-5.webp","24-6.webp"]} alt="NMN 24000" />
            )}
            {params.handle === "nad-booster-nmn-15000" && (
              <PdpGallery images={["15-1.webp","15-2.webp","15-3.webp","15-4.webp","15-5.webp","15-6.webp"]} alt="NMN 15000" />
            )}
          </div>

          {/* Right: Info Column */}
          <div className="pdp-info-col">
            <p className="pdp-info-col__eyebrow">ANERA LIFE</p>
            <h1 className="pdp-info-col__title">{product.title}</h1>
            <p className="pdp-info-col__subtitle">
              {product.productType || "Advanced Cellular Support"}
            </p>


            {/* Price row */}
            <div className="pdp-price-row">
              <span className="pdp-price-row__amount">{price}</span>
              <span className="pdp-price-row__per">${perCapsule}/capsule</span>
            </div>

            {/* Cart actions */}
            <PurchaseWidget
              availableForSale={product.availableForSale}
              defaultVariantId={defaultVariant?.id}
              variants={product.variants.map(v => ({
                id: v.id,
                title: v.title,
                price: v.price.amount,
                currencyCode: v.price.currencyCode,
                selectedOptions: v.selectedOptions,
              }))}
              originalPrice={basePrice}
            />

            {/* Trust row */}
            <div className="pdp-trust-row">
              <div className="pdp-trust-row__item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L4.5 6.5v6c0 5.25 7.5 9.5 7.5 9.5s7.5-4.25 7.5-9.5v-6z" strokeLinejoin="round" />
                </svg>
                <span>GMP Certified</span>
              </div>
              <a
                className="pdp-trust-row__item pdp-trust-row__item--link"
                href="/third-party-lab-tested.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>3rd Party Tested</span>
              </a>
              <div className="pdp-trust-row__item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                </svg>
                <span>Pharmaceutical Grade</span>
              </div>
              <div className="pdp-trust-row__item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4M4 7l8 4M4 7v10l8 4m0-10v10" strokeLinejoin="round" />
                </svg>
                <span>Made in Canada</span>
              </div>
            </div>

            {/* Highlights */}
            <ul className="pdp-highlights">
              <li className="pdp-highlights__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 10 8 14 16 6" />
                </svg>
                Pharmaceutical-grade purity (&gt;99%)
              </li>
              <li className="pdp-highlights__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 10 8 14 16 6" />
                </svg>
                60 vegetarian capsules per bottle
              </li>
              <li className="pdp-highlights__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 10 8 14 16 6" />
                </svg>
                Free shipping across Canada
              </li>
              <li className="pdp-highlights__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 10 8 14 16 6" />
                </svg>
                30-day satisfaction guarantee
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Product Details ── */}
      {params.handle === "nmn-trans-resveratrol-24000" ? (
        <section className="pdp-details-section">
          <div className="pdp-details-section__inner">
            <div className="pdp-details-header">
              <div className="pdp-details-header__line pdp-details-header__line--left" />
              <span className="pdp-details-header__tag">NMN + Trans-Resveratrol 24000 — Product Details</span>
              <div className="pdp-details-header__line" />
            </div>

            <div className="pdp-details-grid">
              {/* Benefits */}
              <div className="pdp-details-card">
                <video className="pdp-details-card__bg" autoPlay muted loop playsInline><source src="/assets/product-video.mp4" type="video/mp4" /></video>
                <div className="pdp-details-card__overlay" />
                <div className="pdp-details-card__eyebrow">01 — Benefits</div>
                <h2 className="pdp-details-card__title">What it does<br />for you</h2>
                <ul className="pdp-benefits-list">
                  {[
                    { name: "Boosts NAD+ Production", desc: "Supports natural NAD+ levels for better cellular energy and metabolic health." },
                    { name: "Enhances Cellular Energy", desc: "Helps fuel mitochondria, the energy centers of your cells." },
                    { name: "Supports Healthy Aging", desc: "Promotes long-term cellular resilience and longevity." },
                    { name: "Antioxidant Protection", desc: "Trans-Resveratrol helps reduce oxidative stress linked to aging." },
                    { name: "Supports Endurance & Vitality", desc: "Helps maintain daily energy, stamina, and performance." },
                    { name: "Synergistic Longevity Formula", desc: "Combines two well-researched compounds in longevity science." },
                  ].map((b, i) => (
                    <li key={i} className="pdp-benefit">
                      <span className="pdp-benefit__dot" />
                      <div>
                        <div className="pdp-benefit__name">{b.name}</div>
                        <div className="pdp-benefit__desc">{b.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right column */}
              <div className="pdp-details-right">
                {/* Ingredients */}
                <div className="pdp-details-card">
                  <div className="pdp-details-card__eyebrow">02 — Ingredients</div>
                  <h2 className="pdp-details-card__title">What&apos;s inside</h2>
                  <div className="pdp-ingredient-list">
                    <div className="pdp-ingredient">
                      
                      <div className="pdp-ingredient__name">Nicotinamide Mononucleotide</div>
                      <div className="pdp-ingredient__dose">NMN · 250 mg per capsule</div>
                      <div className="pdp-ingredient__desc">Increases NAD+ levels, supporting cellular energy production, metabolism, and DNA repair.</div>
                    </div>
                    <div className="pdp-ingredient">
                      
                      <div className="pdp-ingredient__name">Trans-Resveratrol</div>
                      <div className="pdp-ingredient__dose">150 mg per capsule</div>
                      <div className="pdp-ingredient__desc">A potent antioxidant known to activate sirtuins and protect cells from oxidative damage.</div>
                    </div>
                  </div>
                </div>

                {/* Recommended Use */}
                <div className="pdp-details-card pdp-details-card--sm">
                  <div className="pdp-details-card__eyebrow">03 — Recommended Use</div>
                  <h2 className="pdp-details-card__title" style={{ marginBottom: 28 }}>How to take it</h2>
                  <div className="pdp-use-list">
                    <div className="pdp-use-item">
                      <span className="pdp-use-num">1</span>
                      <div className="pdp-use-text">Take 1 capsule daily with or without food, or as directed by your healthcare professional.</div>
                    </div>
                    <div className="pdp-use-item">
                      <span className="pdp-use-num">2</span>
                      <div className="pdp-use-text">Consistency is key for supporting long-term cellular health.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats ribbon */}
            <div className="pdp-ribbon">
              <div className="pdp-ribbon__cell"><span className="pdp-ribbon__val">250mg</span><span className="pdp-ribbon__label">NMN per capsule</span></div>
              <div className="pdp-ribbon__cell"><span className="pdp-ribbon__val">150mg</span><span className="pdp-ribbon__label">Trans-Resveratrol</span></div>
              <div className="pdp-ribbon__cell"><span className="pdp-ribbon__val">Vegan</span><span className="pdp-ribbon__label">Capsule type</span></div>
              <div className="pdp-ribbon__cell"><span className="pdp-ribbon__val">CA</span><span className="pdp-ribbon__label">Made in Canada</span></div>
            </div>
          </div>
        </section>
      ) : (
        <section className="pdp-details-section">
          <div className="pdp-details-section__inner">
            <div className="pdp-details-header">
              <div className="pdp-details-header__line pdp-details-header__line--left" />
              <span className="pdp-details-header__tag">{product.title} — Product Details</span>
              <div className="pdp-details-header__line" />
            </div>

            <div className="pdp-details-grid">
              {/* Benefits */}
              <div className="pdp-details-card">
                <video className="pdp-details-card__bg" autoPlay muted loop playsInline><source src="/assets/product-video.mp4" type="video/mp4" /></video>
                <div className="pdp-details-card__overlay" />
                <div className="pdp-details-card__eyebrow">01 — Benefits</div>
                <h2 className="pdp-details-card__title">What it does<br />for you</h2>
                <ul className="pdp-benefits-list">
                  {[
                    { name: "Boosts NAD+ Levels", desc: "Helps increase NAD+, supporting cellular energy and mitochondrial function." },
                    { name: "Supports Energy & Endurance", desc: "Acts as a natural NAD booster for efficient cellular energy production." },
                    { name: "Enhances Focus & Mental Clarity", desc: "Supports brain energy metabolism for better concentration and productivity." },
                    { name: "Supports Healthy Aging", desc: "Promotes cellular repair pathways linked to longevity." },
                    { name: "Promotes Overall Vitality", desc: "Helps support metabolism, resilience, and overall well-being." },
                  ].map((b, i) => (
                    <li key={i} className="pdp-benefit">
                      <span className="pdp-benefit__dot" />
                      <div>
                        <div className="pdp-benefit__name">{b.name}</div>
                        <div className="pdp-benefit__desc">{b.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right column */}
              <div className="pdp-details-right">
                {/* Ingredients */}
                <div className="pdp-details-card">
                  <div className="pdp-details-card__eyebrow">02 — Ingredients</div>
                  <h2 className="pdp-details-card__title">What&apos;s inside</h2>
                  <div className="pdp-ingredient-list">
                    <div className="pdp-ingredient">
                      
                      <div className="pdp-ingredient__name">NMN (β-Nicotinamide Mononucleotide)</div>
                      <div className="pdp-ingredient__dose">250 mg per capsule</div>
                      <div className="pdp-ingredient__desc">This powerful compound supports NAD+ production, cellular repair, and energy metabolism.</div>
                    </div>
                    <div className="pdp-ingredient">
                      
                      <div className="pdp-ingredient__name">Capsule Type</div>
                      <div className="pdp-ingredient__dose">Vegan-friendly</div>
                      <div className="pdp-ingredient__desc">No fillers, additives, or unnecessary compounds.</div>
                    </div>
                  </div>
                </div>

                {/* Recommended Use */}
                <div className="pdp-details-card pdp-details-card--sm">
                  <div className="pdp-details-card__eyebrow">03 — Recommended Use</div>
                  <h2 className="pdp-details-card__title" style={{ marginBottom: 28 }}>How to take it</h2>
                  <div className="pdp-use-list">
                    <div className="pdp-use-item">
                      <span className="pdp-use-num">1</span>
                      <div className="pdp-use-text">Take 1 capsule daily, preferably in the morning with water.</div>
                    </div>
                    <div className="pdp-use-item">
                      <span className="pdp-use-num">2</span>
                      <div className="pdp-use-text">Some individuals may take 2 capsules per day depending on their wellness goals and professional guidance.</div>
                    </div>
                    <div className="pdp-use-item">
                      <span className="pdp-use-num">3</span>
                      <div className="pdp-use-text">Consistent use supports optimal NAD+ levels and long-term cellular health.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats ribbon */}
            <div className="pdp-ribbon">
              <div className="pdp-ribbon__cell"><span className="pdp-ribbon__val">250mg</span><span className="pdp-ribbon__label">NMN per capsule</span></div>
              <div className="pdp-ribbon__cell"><span className="pdp-ribbon__val">60</span><span className="pdp-ribbon__label">Capsules per bottle</span></div>
              <div className="pdp-ribbon__cell"><span className="pdp-ribbon__val">Vegan</span><span className="pdp-ribbon__label">Capsule type</span></div>
              <div className="pdp-ribbon__cell"><span className="pdp-ribbon__val">CA</span><span className="pdp-ribbon__label">Made in Canada</span></div>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <PdpFaq
        faqs={params.handle === "nmn-trans-resveratrol-24000" ? NMN24000_FAQS : NMN15000_FAQS}
      />

    </>
  );
}
