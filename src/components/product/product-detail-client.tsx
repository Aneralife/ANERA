"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/cart-context";

type Props = {
  availableForSale: boolean;
  defaultVariantId?: string;
};

export function ProductActions({ availableForSale, defaultVariantId }: Props) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);
  const { addItem, isPending } = useCart();

  function handleAddToCart() {
    if (!defaultVariantId || !availableForSale) return;
    for (let i = 0; i < qty; i++) {
      addItem(defaultVariantId);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
  }

  return (
    <>
      <div className="pdp-actions">
        <div className="pdp-stepper">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
          <span className="pdp-stepper__val">{qty}</span>
          <button onClick={() => setQty((q) => Math.min(10, q + 1))}>+</button>
        </div>
        <button
          className={`pdp-btn-cart${added ? " done" : ""}`}
          onClick={handleAddToCart}
          disabled={!availableForSale || isPending}
        >
          {!availableForSale ? "Sold Out" : added ? "Added \u2713" : "Add to Cart"}
        </button>
        <button
          className={`pdp-btn-save${saved ? " on" : ""}`}
          onClick={() => setSaved((s) => !s)}
          aria-label="Save"
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
            <path d="M10 17S3 12.5 3 7.5A4 4 0 0110 4.8 4 4 0 0117 7.5c0 5-7 9.5-7 9.5z" />
          </svg>
        </button>
      </div>
    </>
  );
}
