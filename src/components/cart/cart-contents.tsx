"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import { useCart } from "./cart-context";
import { formatPrice } from "@/lib/utils";

export function CartContents() {
  const { cart, updateItem, removeItem, isPending } = useCart();

  if (!cart || cart.lines.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-body-lg text-[#86868b]">Your bag is empty.</p>
        <div className="mt-8">
          <Link href="/products">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-16">
      {/* Cart Items */}
      <div className="lg:col-span-8">
        <ul className="divide-y divide-[#d2d2d7]/40" role="list">
          {cart.lines.map((item) => (
            <li key={item.id} className="flex gap-5 py-8 first:pt-0">
              {/* Image */}
              <Link
                href={`/products/${item.merchandise.product.handle}`}
                className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl bg-[#f5f5f7]"
              >
                {item.merchandise.product.featuredImage && (
                  <Image
                    src={item.merchandise.product.featuredImage.url}
                    alt={
                      item.merchandise.product.featuredImage.altText ||
                      item.merchandise.product.title
                    }
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                )}
              </Link>

              {/* Details */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    href={`/products/${item.merchandise.product.handle}`}
                    className="text-body font-medium text-[#1d1d1f] hover:text-[#0066cc] transition-colors duration-400 ease-apple"
                  >
                    {item.merchandise.product.title}
                  </Link>
                  {item.merchandise.title !== "Default Title" && (
                    <p className="mt-0.5 text-caption text-[#86868b]">
                      {item.merchandise.title}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  {/* Quantity */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        item.quantity > 1
                          ? updateItem(item.id, item.quantity - 1)
                          : removeItem(item.id)
                      }
                      disabled={isPending}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-caption text-[#1d1d1f] ring-1 ring-inset ring-[#d2d2d7] transition-all duration-400 ease-apple hover:ring-[#86868b] disabled:opacity-40"
                      aria-label={`Decrease quantity of ${item.merchandise.product.title}`}
                    >
                      &minus;
                    </button>
                    <span className="w-5 text-center text-caption font-medium tabular-nums text-[#1d1d1f]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateItem(item.id, item.quantity + 1)}
                      disabled={isPending}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-caption text-[#1d1d1f] ring-1 ring-inset ring-[#d2d2d7] transition-all duration-400 ease-apple hover:ring-[#86868b] disabled:opacity-40"
                      aria-label={`Increase quantity of ${item.merchandise.product.title}`}
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <p className="text-body font-medium text-[#1d1d1f]">
                    {formatPrice(item.cost.totalAmount)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Order Summary */}
      <div className="mt-10 lg:col-span-4 lg:mt-0">
        <div className="sticky top-20 rounded-3xl bg-[#f5f5f7] p-8">
          <h2 className="text-headline text-[#1d1d1f]">Summary</h2>
          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-body">
              <span className="text-[#86868b]">Subtotal</span>
              <span className="text-[#1d1d1f]">
                {formatPrice(cart.cost.subtotalAmount)}
              </span>
            </div>
            <div className="flex justify-between text-body">
              <span className="text-[#86868b]">Shipping</span>
              <span className="text-[#86868b]">Calculated at checkout</span>
            </div>
            <div className="border-t border-[#d2d2d7]/50 pt-4">
              <div className="flex justify-between">
                <span className="text-headline text-[#1d1d1f]">Total</span>
                <span className="text-headline text-[#1d1d1f]">
                  {formatPrice(cart.cost.totalAmount)}
                </span>
              </div>
            </div>
          </div>
          <a
            href={cart.checkoutUrl}
            className="mt-8 block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="xl" className="w-full">
              Check Out
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
