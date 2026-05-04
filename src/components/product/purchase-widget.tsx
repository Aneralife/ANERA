"use client";

import { useState, useEffect } from "react";
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
  recommended?: boolean;
};

const FREQUENCIES: FreqOption[] = [
  { key: "3", label: "3-month supply", months: 3, savePercent: 20 },
  { key: "6", label: "6-month supply", months: 6, savePercent: 25, recommended: true },
  { key: "12", label: "12-month supply", months: 12, savePercent: 30 },
];

export function PurchaseWidget({ availableForSale, defaultVariantId, variants, originalPrice }: Props) {
  const [selectedFreq, setSelectedFreq] = useState("6");
  const [isSubscribe, setIsSubscribe] = useState(true);
  const [clicked, setClicked] = useState<"atc" | "buy" | null>(null);
  const { addItem, isPending } = useCart();

  useEffect(() => {
    if (!isPending) setClicked(null);
  }, [isPending]);

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
  const onetimeTotal = basePrice;
  const subscribeTotal = Math.round(currentFreq.totalDiscounted);
  const subscribeOriginal = currentFreq.totalOriginal;

  function handleAddToCart() {
    const vid = isSubscribe ? getVariantForFreq(selectedFreq) : defaultVariantId;
    if (!vid || !availableForSale || isPending) return;
    setClicked("atc");
    addItem(vid, 1, true);
  }

  function handleBuyNow() {
    const vid = isSubscribe ? getVariantForFreq(selectedFreq) : defaultVariantId;
    if (!vid || !availableForSale || isPending) return;
    addItem(vid, 1, true);
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
            <div className="pw-price-original">${subscribeOriginal}.00</div>
            <div className="pw-price-current">${subscribeTotal}<sup>CAD</sup></div>
          </div>
        </div>

        <div className="pw-freq-label">Select Frequency</div>
        <div className="pw-freq-buttons">
          {FREQUENCIES.map(f => (
            <div key={f.key} className="pw-freq-btn-wrap">
              {f.recommended && <span className="pw-freq-recommended">Recommended</span>}
              <button
                className={`pw-freq-btn${selectedFreq === f.key ? " pw-freq-btn--active" : ""}`}
                onClick={(e) => { e.stopPropagation(); setSelectedFreq(f.key); setIsSubscribe(true); }}
              >
                {f.label}
              </button>
            </div>
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
        <div className="pw-onetime-price">${onetimeTotal} CAD</div>
      </div>

      {/* Add to cart */}
      <button
        className="pw-atc"
        onClick={handleAddToCart}
        disabled={!availableForSale || isPending}
      >
        {clicked === "atc" && isPending ? "Adding…" : !availableForSale ? "Sold Out" : "Add to cart"}
      </button>

      {/* Buy Now — goes directly to Shopify checkout */}
      <button
        className="pw-buy"
        onClick={handleBuyNow}
        disabled={!availableForSale || isPending}
      >
        Buy Now
      </button>
    </div>
  );
}
