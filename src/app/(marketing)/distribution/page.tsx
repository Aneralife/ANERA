"use client";

import { useState, useEffect, useRef } from "react";

/* ── Data ────────────────────────────────────────────────────── */
type Partner = {
  flag: string;
  country: string;
  name: string;
  desc: string;
  emails: string[];
  website?: string;
  verified?: boolean;
};

const regions: { id: string; label: string; emoji: string; partners: Partner[] }[] = [
  {
    id: "north-america",
    label: "North America",
    emoji: "\ud83c\udf0e",
    partners: [
      { flag: "\ud83c\udde8\ud83c\udde6", country: "Canada", name: "Anera Life Inc.", desc: "Official headquarters and primary distribution for Canada. Pharmaceutical-grade NMN direct from our Richmond, BC facility.", emails: ["info@aneralife.com"], website: "aneralife.com", verified: true },
      { flag: "\ud83c\uddfa\ud83c\uddf8", country: "United States", name: "Anera USA Distribution", desc: "Official US distribution partner. Serving customers across all 50 states with fast domestic shipping and full product range.", emails: ["usa@aneralife.com"], website: "aneralife.com/usa", verified: true },
    ],
  },
  {
    id: "latin-america",
    label: "Mexico / Latin America",
    emoji: "\ud83c\udf0e",
    partners: [
      { flag: "\ud83c\uddf2\ud83c\uddfd", country: "Mexico", name: "Anera M\u00e9xico", desc: "Official distribution partner for Mexico and surrounding Latin American markets. Authorized to distribute all Anera NMN products.", emails: ["mexico@aneralife.com"], verified: true },
      { flag: "\ud83c\udde7\ud83c\uddf7", country: "Brazil", name: "Anera Brasil", desc: "Serving the Brazilian longevity market with authentic Anera products. Compliant with ANVISA regulations.", emails: ["brasil@aneralife.com"], verified: true },
      { flag: "\ud83c\udf0e", country: "Rest of Latin America", name: "Expanding Soon", desc: "We are actively expanding our distribution network across Latin America. Contact us to inquire about distribution opportunities in your country.", emails: ["info@aneralife.com"] },
    ],
  },
  {
    id: "europe",
    label: "Europe",
    emoji: "\ud83c\udf0d",
    partners: [
      { flag: "\ud83c\uddec\ud83c\udde7", country: "United Kingdom", name: "Anera UK", desc: "Official UK distribution. Post-Brexit compliant, with fast domestic delivery across England, Scotland, Wales, and Northern Ireland.", emails: ["uk@aneralife.com"], verified: true },
      { flag: "\ud83c\udde9\ud83c\uddea", country: "Germany", name: "Anera Deutschland", desc: "Serving the DACH region (Germany, Austria, Switzerland). EU-compliant distribution with full product certification.", emails: ["de@aneralife.com"], verified: true },
      { flag: "\ud83c\uddeb\ud83c\uddf7", country: "France", name: "Anera France", desc: "Official French distribution partner. Serving France and Francophone European markets with authentic Anera products.", emails: ["fr@aneralife.com"], verified: true },
    ],
  },
  {
    id: "dubai",
    label: "Dubai / UAE",
    emoji: "\ud83c\udf0f",
    partners: [
      { flag: "\ud83c\udde6\ud83c\uddea", country: "United Arab Emirates", name: "Anera Middle East", desc: "Official distribution hub for the UAE, Saudi Arabia, and the broader GCC region. Dubai-based operations with regional reach.", emails: ["uae@aneralife.com"], verified: true },
      { flag: "\ud83c\uddf8\ud83c\udde6", country: "Saudi Arabia", name: "Anera KSA", desc: "Serving the Saudi Arabian market with SFDA-compliant distribution. Authentic Anera products for the Kingdom\u2019s longevity community.", emails: ["ksa@aneralife.com"], verified: true },
    ],
  },
  {
    id: "asia",
    label: "Asia",
    emoji: "\ud83c\udf0f",
    partners: [
      { flag: "\ud83c\uddf8\ud83c\uddec", country: "Singapore", name: "Anera Singapore", desc: "Distribution hub for Southeast Asia. Serving Singapore, Malaysia, Thailand, and surrounding markets with HSA-compliant products.", emails: ["sg@aneralife.com"], verified: true },
      { flag: "\ud83c\udde6\ud83c\uddfa", country: "Australia", name: "Anera Australia", desc: "Official Australian distribution. TGA-compliant products serving Australia and New Zealand\u2019s growing longevity community.", emails: ["au@aneralife.com"], verified: true },
    ],
  },
];

const benefits = [
  { icon: "\u2705", title: "Authenticity Guaranteed", desc: "100% genuine Anera products, directly from our labs to you. Every batch is traceable and verified through our QR authentication system." },
  { icon: "\ud83d\udd2c", title: "Premium Quality", desc: "Backed by scientific research, GMP-certified, and third-party tested. Our partners maintain strict cold-chain storage and handling protocols." },
  { icon: "\ud83d\udee1\ufe0f", title: "Secure & Reliable", desc: "Verified partners ensure safe transactions, proper storage, and real customer support. You\u2019re protected from start to finish." },
  { icon: "\ud83d\udcf1", title: "QR Verification", desc: "Every official Anera product has a unique QR code. Simply scan with your phone to instantly confirm authenticity on aneralife.com." },
];

/* ── Component ───────────────────────────────────────────────── */
export default function DistributionPage() {
  const [activeRegion, setActiveRegion] = useState("north-america");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const els = document.querySelectorAll(".dist-reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* re-trigger reveal when switching tabs */
  useEffect(() => {
    const panel = document.getElementById(`panel-${activeRegion}`);
    if (!panel) return;
    const els = panel.querySelectorAll(".dist-reveal");
    els.forEach((el) => {
      el.classList.remove("visible");
      requestAnimationFrame(() => el.classList.add("visible"));
    });
  }, [activeRegion]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="dist-hero">
        <video className="dist-hero__bg" autoPlay muted loop playsInline>
          <source src="/assets/media-2.webm" type="video/webm" />
        </video>
        <div className="dist-hero__content">
          <p className="dist-hero__eyebrow dist-reveal">Anera Global Distribution &mdash; Official Partners</p>
          <h1 className="dist-hero__title dist-reveal">Fueled by Science.<br />Verified for Trust.</h1>
          <p className="dist-hero__subtitle dist-reveal">Our products are trusted by thousands worldwide &mdash; but only official Anera Global Distribution Partners are verified to bring our science-backed supplements to your region.</p>
          <div className="dist-hero__actions dist-reveal">
            <a href="#regions" className="dist-btn dist-btn--primary">Find a Partner &rarr;</a>
            <a href="#become-partner" className="dist-btn dist-btn--secondary">Become a Partner</a>
          </div>
        </div>
        <button onClick={toggleAudio} className={`dist-hero__audio-btn ${isPlaying ? 'playing' : ''}`}>
          {isPlaying ? "Pause" : "Listen"}
        </button>
      </section>

      {/* ── Trust Strip ───────────────────────────────────────── */}
      <div className="dist-trust-strip">
        {[
          { icon: "\u2705", title: "Authenticity Guaranteed", sub: "100% genuine Anera products" },
          { icon: "\ud83d\udd2c", title: "Premium Quality", sub: "GMP-certified & third-party tested" },
          { icon: "\ud83d\udd12", title: "Secure & Reliable", sub: "Verified safe transactions" },
          { icon: "\ud83d\udeab", title: "No Counterfeits", sub: "Avoid fakes & unauthorized resellers" },
        ].map((item, i) => (
          <div key={i} className={`dist-trust-item dist-reveal${i > 0 ? ` dist-reveal-delay-${i}` : ""}`}>
            <div className="dist-trust-item__icon">{item.icon}</div>
            <div className="dist-trust-item__text">
              <strong>{item.title}</strong>
              <span>{item.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── World Map ─────────────────────────────────────────── */}
      <section className="dist-map-section">
        <p className="dist-map-section__eyebrow dist-reveal">Global Reach</p>
        <h2 className="dist-map-section__title dist-reveal">Official Verified<br />Anera Partners</h2>
        <p className="dist-map-section__subtitle dist-reveal">Every official Anera product has a unique QR code &mdash; simply scan to confirm their status on aneralife.com</p>

        <div className="dist-world-map-container dist-reveal">
          <svg className="dist-world-map-svg" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
            <rect width="1000" height="500" fill="#e8f4f8" rx="12" />
            {/* Continents */}
            <path d="M 80 80 L 200 70 L 240 90 L 260 130 L 250 180 L 220 200 L 200 240 L 180 260 L 160 250 L 140 220 L 120 200 L 100 170 L 80 140 Z" fill="#d1d5db" stroke="#fff" strokeWidth="1.5" />
            <path d="M 220 40 L 270 30 L 280 60 L 260 75 L 230 70 Z" fill="#d1d5db" stroke="#fff" strokeWidth="1" />
            <path d="M 180 260 L 200 270 L 210 290 L 195 300 L 180 285 Z" fill="#d1d5db" stroke="#fff" strokeWidth="1" />
            <path d="M 195 300 L 230 290 L 260 310 L 270 360 L 260 410 L 240 440 L 210 450 L 190 430 L 180 390 L 185 350 L 190 320 Z" fill="#d1d5db" stroke="#fff" strokeWidth="1.5" />
            <path d="M 450 80 L 510 70 L 530 85 L 520 110 L 500 120 L 480 115 L 460 105 Z" fill="#d1d5db" stroke="#fff" strokeWidth="1.5" />
            <path d="M 490 50 L 510 45 L 520 65 L 505 75 L 490 65 Z" fill="#d1d5db" stroke="#fff" strokeWidth="1" />
            <path d="M 440 80 L 455 75 L 458 90 L 445 95 Z" fill="#d1d5db" stroke="#fff" strokeWidth="1" />
            <path d="M 460 130 L 530 125 L 545 160 L 540 220 L 520 280 L 500 320 L 480 330 L 460 310 L 450 270 L 448 220 L 450 170 Z" fill="#d1d5db" stroke="#fff" strokeWidth="1.5" />
            <path d="M 530 120 L 580 115 L 590 140 L 570 155 L 545 150 Z" fill="#d1d5db" stroke="#fff" strokeWidth="1.5" />
            <path d="M 510 50 L 700 40 L 720 70 L 700 90 L 650 95 L 600 90 L 560 85 L 530 80 L 510 65 Z" fill="#d1d5db" stroke="#fff" strokeWidth="1.5" />
            <path d="M 600 120 L 640 115 L 650 150 L 640 180 L 620 190 L 605 175 L 600 150 Z" fill="#d1d5db" stroke="#fff" strokeWidth="1.5" />
            <path d="M 680 130 L 730 120 L 750 140 L 740 165 L 720 170 L 695 160 L 680 145 Z" fill="#d1d5db" stroke="#fff" strokeWidth="1.5" />
            <path d="M 650 80 L 750 75 L 780 100 L 770 130 L 740 140 L 700 135 L 670 120 L 650 100 Z" fill="#d1d5db" stroke="#fff" strokeWidth="1.5" />
            <path d="M 790 90 L 810 85 L 820 100 L 808 110 L 793 105 Z" fill="#d1d5db" stroke="#fff" strokeWidth="1" />
            <path d="M 730 310 L 820 300 L 850 330 L 845 380 L 820 400 L 780 405 L 750 390 L 730 360 L 725 330 Z" fill="#d1d5db" stroke="#fff" strokeWidth="1.5" />
            {/* Dots */}
            <circle cx="155" cy="130" r="14" fill="#1d1d1f" opacity="0.2" />
            <circle cx="155" cy="130" r="8" fill="#1d1d1f" opacity="0.9" />
            <circle cx="175" cy="165" r="12" fill="#1d1d1f" opacity="0.2" />
            <circle cx="175" cy="165" r="7" fill="#1d1d1f" opacity="0.9" />
            <circle cx="175" cy="255" r="10" fill="#1d1d1f" opacity="0.2" />
            <circle cx="175" cy="255" r="6" fill="#1d1d1f" opacity="0.85" />
            <circle cx="235" cy="360" r="6" fill="#1d1d1f" opacity="0.85" />
            <circle cx="448" cy="83" r="6" fill="#1d1d1f" opacity="0.85" />
            <circle cx="490" cy="88" r="6" fill="#1d1d1f" opacity="0.85" />
            <circle cx="470" cy="98" r="5" fill="#1d1d1f" opacity="0.8" />
            <circle cx="570" cy="135" r="12" fill="#1d1d1f" opacity="0.2" />
            <circle cx="570" cy="135" r="7" fill="#1d1d1f" opacity="0.9" />
            <circle cx="800" cy="97" r="6" fill="#1d1d1f" opacity="0.85" />
            <circle cx="775" cy="100" r="5" fill="#1d1d1f" opacity="0.8" />
            <circle cx="720" cy="190" r="5" fill="#1d1d1f" opacity="0.8" />
            <circle cx="790" cy="355" r="6" fill="#1d1d1f" opacity="0.85" />
            {/* Labels */}
            <text x="155" y="112" textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="Inter, sans-serif" fontWeight="600">CANADA</text>
            <text x="175" y="148" textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="Inter, sans-serif" fontWeight="600">USA</text>
            <text x="570" y="118" textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="Inter, sans-serif" fontWeight="600">UAE</text>
          </svg>
          <div className="dist-map-legend">
            <div className="dist-map-legend__item">
              <div className="dist-map-legend__dot" />
              <span>Official Anera Distribution Partner</span>
            </div>
            <div className="dist-map-legend__item">
              <div className="dist-map-legend__dot dist-map-legend__dot--primary" />
              <span>Primary Market</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Region Tabs ───────────────────────────────────────── */}
      <section id="regions" className="dist-regions">
        <div className="dist-regions__inner">
          <p className="dist-regions__eyebrow dist-reveal">Find an Authorized Partner Near You</p>
          <h2 className="dist-regions__title dist-reveal">Official Verified<br />Anera Partners</h2>

          <nav className="dist-region-tabs__nav">
            {regions.map((r) => (
              <button
                key={r.id}
                className={`dist-region-tab-btn${activeRegion === r.id ? " active" : ""}`}
                onClick={() => setActiveRegion(r.id)}
              >
                {r.emoji} {r.label}
              </button>
            ))}
          </nav>

          {regions.map((r) => (
            <div key={r.id} id={`panel-${r.id}`} className={`dist-region-panel${activeRegion === r.id ? " active" : ""}`}>
              {r.id === "north-america" && (
                <div className="dist-qr-notice dist-reveal">
                  <div className="dist-qr-notice__icon">{"\ud83d\udcf1"}</div>
                  <div className="dist-qr-notice__text">
                    <h3>Verify Authenticity with QR Code</h3>
                    <p>Every official Anera product has a unique QR code &mdash; simply scan to confirm their status on aneralife.com. Protect yourself from counterfeits and unauthorized resellers.</p>
                  </div>
                </div>
              )}
              <div className="dist-partner-grid">
                {r.partners.map((p, i) => (
                  <div key={i} className={`dist-partner-card dist-reveal${i > 0 ? ` dist-reveal-delay-${i}` : ""}`}>
                    {p.verified && <div className="dist-partner-card__verified">{"\u2713"} Verified</div>}
                    <div className="dist-partner-card__flag">{p.flag}</div>
                    <div className="dist-partner-card__country">{p.country}</div>
                    <div className="dist-partner-card__name">{p.name}</div>
                    <p className="dist-partner-card__desc">{p.desc}</p>
                    <div className="dist-partner-card__contact">
                      {p.emails.map((email) => (
                        <a key={email} href={`mailto:${email}`}>{email}</a>
                      ))}
                      {p.website && <a href="#">{p.website}</a>}
                    </div>
                    {p.verified && (
                      <div className="dist-partner-card__qr">
                        <span>{"\ud83d\udcf1"}</span> Scan QR to verify
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Benefits ──────────────────────────────────────────── */}
      <section className="dist-benefits">
        <div className="dist-benefits__inner">
          <div className="dist-benefits__header">
            <p className="dist-benefits__eyebrow dist-reveal">Why Buy from an Official Partner</p>
            <h2 className="dist-benefits__title dist-reveal">The Anera<br />Authenticity Promise</h2>
            <p className="dist-benefits__subtitle dist-reveal">Every official Anera partner is rigorously vetted to ensure you receive only the highest quality, genuine products.</p>
          </div>
          <div className="dist-benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className={`dist-benefit-item dist-reveal${i > 0 ? ` dist-reveal-delay-${i}` : ""}`}>
                <div className="dist-benefit-item__icon">{b.icon}</div>
                <div className="dist-benefit-item__text">
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Become Partner ────────────────────────────────────── */}
      <section className="dist-become-partner" id="become-partner">
        <div className="dist-become-partner__bg" />
        <div className="dist-become-partner__content dist-reveal">
          <p className="dist-become-partner__eyebrow">Expand With Us</p>
          <h2>Want to Distribute Anera<br />in <em>Your Country?</em></h2>
          <p>We&apos;re expanding! If you&apos;re a passionate health and longevity advocate, apply to become an Anera Global Distribution Partner today. Join the movement. Build the future of longevity.</p>
          <div className="dist-become-partner__actions">
            <a href="mailto:info@aneralife.com?subject=Distribution Partner Application" className="dist-btn dist-btn--accent">Apply Now &rarr;</a>
            <a href="mailto:info@aneralife.com" className="dist-btn dist-btn--secondary">Contact Us</a>
          </div>
          <p className="dist-become-partner__footer-text">info@aneralife.com &middot; Anera Life Inc. &middot; Richmond, BC, Canada</p>
        </div>
      </section>

      <audio ref={audioRef} loop>
        <source src="/assets/distribution.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}
