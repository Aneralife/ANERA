"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/cart-context";

type VariantOption = {
  id: string;
  title: string;
  price: string;
  currencyCode: string;
};

type Props = {
  availableForSale: boolean;
  defaultVariantId?: string;
  variants?: VariantOption[];
  originalPrice?: number;
};

type FreqOption = {
  key: string;
  label: string;
  months: number;
  savePercent: number;
};

const FREQUENCIES: FreqOption[] = [
  { key: "1", label: "1-month supply", months: 1, savePercent: 15 },
  { key: "3", label: "3-month supply", months: 3, savePercent: 20 },
  { key: "6", label: "6-month supply", months: 6, savePercent: 25 },
];

export function PurchaseWidget({ availableForSale, defaultVariantId, variants, originalPrice }: Props) {
  const [selectedFreq, setSelectedFreq] = useState("6");
  const [isSubscribe, setIsSubscribe] = useState(true);
  const [added, setAdded] = useState(false);
  const [buying, setBuying] = useState(false);
  const { addItem } = useCart();

  const basePrice = originalPrice || 105;
  const hasVariants = variants && variants.length > 1;

  function getFreqData(key: string) {
    const freq = FREQUENCIES.find(f => f.key === key) || FREQUENCIES[2];
    const months = freq.months;
    const totalOriginal = basePrice * months;
    const totalDiscounted = Math.round(totalOriginal * (1 - freq.savePercent / 100));
    return {
      ...freq,
      totalOriginal,
      totalDiscounted,
      paidLabel: `Paid every ${months === 1 ? "month" : months + " months"}`,
    };
  }

  function getVariantForFreq(key: string): string {
    if (!hasVariants) return defaultVariantId || "";
    const monthsMap: Record<string, string> = {};
    for (const v of variants!) {
      const match = v.title.match(/(\d+)/);
      if (match) monthsMap[match[1]] = v.id;
    }
    return monthsMap[key] || defaultVariantId || "";
  }

  const currentFreq = getFreqData(selectedFreq);

  function handleAddToCart() {
    const vid = isSubscribe ? getVariantForFreq(selectedFreq) : defaultVariantId;
    if (!vid || !availableForSale) return;
    addItem(vid);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  async function handleBuyNow() {
    const vid = isSubscribe ? getVariantForFreq(selectedFreq) : defaultVariantId;
    if (!vid || !availableForSale || buying) return;
    setBuying(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "buyNow", variantId: vid, quantity: 1 }),
      });
      const data = await res.json();
      if (data.checkoutUrl) window.location.href = data.checkoutUrl;
    } catch {
      setBuying(false);
    }
  }

  return (
    <div className="pw-wrap">
      {/* Subscribe & Save card */}
      <div
        className={`pw-subscribe${isSubscribe ? " pw-subscribe--active" : ""}`}
        onClick={() => setIsSubscribe(true)}
      >
        <div className="pw-save-badge">Save {currentFreq.savePercent}%</div>

        <div className="pw-card-header">
          <div>
            <div className="pw-card-title">Subscribe &amp; Save</div>
            <div className="pw-card-sub">{currentFreq.paidLabel}</div>
          </div>
          <div className="pw-card-price">
            <div className="pw-price-original">${currentFreq.totalOriginal}.00</div>
            <div className="pw-price-current">${currentFreq.totalDiscounted}<sup>CAD</sup></div>
          </div>
        </div>

        <div className="pw-freq-label">Select Frequency</div>
        <div className="pw-freq-buttons">
          {FREQUENCIES.map(f => (
            <button
              key={f.key}
              className={`pw-freq-btn${selectedFreq === f.key ? " pw-freq-btn--active" : ""}`}
              onClick={(e) => { e.stopPropagation(); setSelectedFreq(f.key); setIsSubscribe(true); }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="pw-perks">
          <div className="pw-perk">
            <span className="pw-perk-icon">&#8635;</span>
            <span>Sent every {selectedFreq === "1" ? "month" : selectedFreq + " months"}</span>
          </div>
          <div className="pw-perk">
            <span className="pw-perk-icon">&#128230;</span>
            <span>Free shipping every time</span>
          </div>
          <div className="pw-perk">
            <span className="pw-perk-icon">&#9208;</span>
            <span>Pause or cancel anytime</span>
          </div>
        </div>
      </div>

      {/* One-time purchase */}
      <div
        className={`pw-onetime${!isSubscribe ? " pw-onetime--active" : ""}`}
        onClick={() => setIsSubscribe(false)}
      >
        <div className="pw-onetime-title">One-time purchase</div>
        <div className="pw-onetime-price">${basePrice} CAD</div>
      </div>

      {/* Add to cart */}
      <button
        className={`pw-atc${added ? " pw-atc--done" : ""}`}
        onClick={handleAddToCart}
        disabled={!availableForSale}
      >
        {!availableForSale ? "Sold Out" : added ? "✓ Added!" : "Add to cart"}
      </button>

      {/* Buy Now */}
      <button
        className="pw-buy"
        onClick={handleBuyNow}
        disabled={!availableForSale || buying}
      >
        {buying ? "Redirecting…" : "Buy Now"}
      </button>
    </div>
  );
}
