"use client";

import { Button } from "@/components/ui";
import { useCart } from "@/components/cart/cart-context";

type AddToCartButtonProps = {
  availableForSale: boolean;
  defaultVariantId?: string;
};

export function AddToCartButton({
  availableForSale,
  defaultVariantId,
}: AddToCartButtonProps) {
  const { addItem, isPending } = useCart();

  if (!availableForSale) {
    return (
      <Button size="xl" className="w-full" disabled>
        Sold Out
      </Button>
    );
  }

  return (
    <Button
      size="xl"
      className="w-full"
      isLoading={isPending}
      onClick={() => {
        if (defaultVariantId) {
          addItem(defaultVariantId);
        }
      }}
      aria-label="Add to cart"
    >
      Add to Bag
    </Button>
  );
}
