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
  const [buying, setBuying] = useState(false);
  const { addItem, isPending } = useCart();

  function handleAddToCart() {
    if (!defaultVariantId || !availableForSale) return;
    for (let i = 0; i < qty; i++) {
      addItem(defaultVariantId);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
  }

  async function handleBuyNow() {
    if (!defaultVariantId || !availableForSale || buying) return;
    setBuying(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "buyNow", variantId: defaultVariantId, quantity: qty }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch {
      setBuying(false);
    }
  }

  return (
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
        {!availableForSale ? "Sold Out" : added ? "Added ✓" : "Add to Cart"}
      </button>
      <button
        className="pdp-btn-buy"
        onClick={handleBuyNow}
        disabled={!availableForSale || buying}
      >
        {buying ? "Redirecting…" : "Buy Now"}
      </button>
    </div>
  );
}
