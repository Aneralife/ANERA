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

export function ProductActions({ availableForSale, defaultVariantId, variants, originalPrice }: Props) {
  const [selectedVariant, setSelectedVariant] = useState(defaultVariantId || "");
  const [added, setAdded] = useState(false);
  const [buying, setBuying] = useState(false);
  const { addItem, isPending } = useCart();

  const hasPlans = variants && variants.length > 1;

  function handleAddToCart() {
    const vid = hasPlans ? selectedVariant : defaultVariantId;
    if (!vid || !availableForSale) return;
    addItem(vid);
    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
  }

  async function handleBuyNow() {
    const vid = hasPlans ? selectedVariant : defaultVariantId;
    if (!vid || !availableForSale || buying) return;
    setBuying(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "buyNow", variantId: vid, quantity: 1 }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch {
      setBuying(false);
    }
  }

  // Calculate savings for each variant
  function getSavePercent(variantPrice: number, months: number): number {
    if (!originalPrice || !months) return 0;
    const fullPrice = originalPrice * months;
    return Math.round((1 - variantPrice / fullPrice) * 100);
  }

  function getMonths(title: string): number {
    const match = title.match(/(\d+)/);
    return match ? parseInt(match[1]) : 1;
  }

  return (
    <div className="pdp-actions" id="pdp-cta">
      {/* Add to Cart + Buy Now */}
      <button
        className={`pdp-btn-cart${added ? " done" : ""}`}
        onClick={handleAddToCart}
        disabled={!availableForSale || isPending}
      >
        {!availableForSale ? "Sold Out" : added ? "Added ✓" : "Add to Cart"}
      </button>
      <button
        className="pdp-btn-buy"
        onClick={handleBuyNow}
        disabled={!availableForSale || buying}
      >
        {buying ? "Redirecting…" : "Buy Now"}
      </button>

      {/* Subscription Plans */}
      {hasPlans && (
        <div className="pdp-plans">
          <p className="pdp-plans__label">Subscribe &amp; Save:</p>
          <div className="pdp-plans__list">
            {variants.map((v) => {
              const price = parseFloat(v.price);
              const months = getMonths(v.title);
              const perMonth = months > 0 ? Math.round(price / months) : price;
              const save = getSavePercent(price, months);
              const isSelected = selectedVariant === v.id;

              return (
                <label
                  key={v.id}
                  className={`pdp-plan${isSelected ? " pdp-plan--selected" : ""}`}
                  onClick={() => setSelectedVariant(v.id)}
                >
                  <div className="pdp-plan__left">
                    <div className={`pdp-plan__radio${isSelected ? " pdp-plan__radio--on" : ""}`}>
                      {isSelected && <div className="pdp-plan__radio-dot" />}
                    </div>
                    <div>
                      <div className="pdp-plan__name">{v.title}</div>
                      {save > 0 && <div className="pdp-plan__save">Save {save}%</div>}
                    </div>
                  </div>
                  <div className="pdp-plan__right">
                    <div className="pdp-plan__price">${perMonth}<span>/mo</span></div>
                    {months > 1 && originalPrice && (
                      <div className="pdp-plan__total">
                        <s>${originalPrice * months}</s> ${price}
                      </div>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
