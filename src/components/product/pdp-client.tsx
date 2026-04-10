"use client";

import { useState, useEffect, useRef } from "react";
import type { Product } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/utils";

/* ── Tabs Section ─────────────────────────────────────────── */

type PdpTabsProps = {
  product: Product;
};

export function PdpTabs({ product }: PdpTabsProps) {
  const [active, setActive] = useState(0);
  const tabs = ["Details", "Science", "Reviews"];

  return (
    <section className="pdp-tabs">
      <div className="pdp-tabs__inner">
        <div className="pdp-tabs__bar">
          {tabs.map((t, i) => (
            <button
              key={t}
              className={`pdp-tabs__btn${i === active ? " pdp-tabs__btn--active" : ""}`}
              onClick={() => setActive(i)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="pdp-tabs__panel">
          {active === 0 && (
            <div
              className="pdp-tabs__content pdp-desc__body"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          )}
          {active === 1 && (
            <div className="pdp-tabs__content">
              <h3 className="pdp-tabs__panel-title">The Science</h3>
              <p className="pdp-tabs__panel-text">
                Our formulations are developed based on peer-reviewed clinical
                research. Each ingredient is selected for its bioavailability
                and synergistic potential, backed by published studies.
              </p>
            </div>
          )}
          {active === 2 && (
            <div className="pdp-tabs__content">
              <h3 className="pdp-tabs__panel-title">Customer Reviews</h3>
              <p className="pdp-tabs__panel-text">
                Reviews are coming soon. Be the first to share your experience.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ Section ─────────────────────────────────────────── */

type FaqItem = { q: string; a: string };

function PdpAccordionItem({ q, a }: FaqItem) {
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

export function PdpFaq({ faqs, title }: { faqs: FaqItem[]; title?: string }) {
  return (
    <section className="st-faq">
      <div className="st-faq__inner">
        <div className="st-faq-header">
          <h2>{title || "Frequently Asked Questions"}</h2>
        </div>
        <div className="st-accordion">
          {faqs.map((f, i) => (
            <PdpAccordionItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Sticky Bottom Bar ────────────────────────────────────── */

type PdpStickyBarProps = {
  product: Product;
};

export function PdpStickyBar({ product }: PdpStickyBarProps) {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const price = formatPrice(product.priceRange.minVariantPrice);

  return (
    <>
      <div ref={sentinelRef} />
      <div className={`pdp-sticky-bar${visible ? " pdp-sticky-bar--visible" : ""}`}>
        <div className="pdp-sticky-bar__inner">
          <div className="pdp-sticky-bar__info">
            <span className="pdp-sticky-bar__title">{product.title}</span>
            <span className="pdp-sticky-bar__price">{price}</span>
          </div>
          <a href="#pdp-cta" className="pdp-sticky-bar__btn">Add to Cart</a>
        </div>
      </div>
    </>
  );
}
