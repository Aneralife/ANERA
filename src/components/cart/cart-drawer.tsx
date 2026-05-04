"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./cart-context";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { cart, isOpen, closeCart, updateItem, removeItem, isPending } = useCart();
  const itemCount = cart?.totalQuantity ?? 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cd-overlay${isOpen ? " cd-overlay--open" : ""}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`cd-panel${isOpen ? " cd-panel--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="cd-header">
          <h2 className="cd-header__title">
            Your Cart
            {itemCount > 0 && <span className="cd-header__count">{itemCount}</span>}
          </h2>
          <button className="cd-header__close" onClick={closeCart} aria-label="Close cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="cd-body">
          {!cart || cart.lines.length === 0 ? (
            <div className="cd-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".3">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <p className="cd-empty__text">Your cart is empty.</p>
              <Link href="/products" className="cd-empty__link" onClick={closeCart}>
                Shop Now →
              </Link>
            </div>
          ) : (
            <ul className="cd-items">
              {cart.lines.map((item) => (
                <li key={item.id} className="cd-item">
                  {/* Product image */}
                  <Link
                    href={`/products/${item.merchandise.product.handle}`}
                    className="cd-item__img-wrap"
                    onClick={closeCart}
                  >
                    {item.merchandise.product.featuredImage ? (
                      <Image
                        src={item.merchandise.product.featuredImage.url}
                        alt={item.merchandise.product.featuredImage.altText || item.merchandise.product.title}
                        fill
                        sizes="80px"
                        className="cd-item__img"
                      />
                    ) : (
                      <div className="cd-item__img-placeholder" />
                    )}
                  </Link>

                  {/* Details */}
                  <div className="cd-item__details">
                    <div className="cd-item__top">
                      <Link
                        href={`/products/${item.merchandise.product.handle}`}
                        className="cd-item__name"
                        onClick={closeCart}
                      >
                        {item.merchandise.product.title}
                      </Link>
                      <button
                        className="cd-item__remove"
                        onClick={() => removeItem(item.id)}
                        disabled={isPending}
                        aria-label="Remove item"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {item.merchandise.title !== "Default Title" && (
                      <p className="cd-item__variant">{item.merchandise.title}</p>
                    )}

                    <div className="cd-item__bottom">
                      {/* Qty controls */}
                      <div className="cd-qty">
                        <button
                          className="cd-qty__btn"
                          onClick={() =>
                            item.quantity > 1
                              ? updateItem(item.id, item.quantity - 1)
                              : removeItem(item.id)
                          }
                          disabled={isPending}
                          aria-label="Decrease quantity"
                        >−</button>
                        <span className="cd-qty__num">{item.quantity}</span>
                        <button
                          className="cd-qty__btn"
                          onClick={() => updateItem(item.id, item.quantity + 1)}
                          disabled={isPending}
                          aria-label="Increase quantity"
                        >+</button>
                      </div>

                      <span className="cd-item__price">
                        {formatPrice(item.cost.totalAmount)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart && cart.lines.length > 0 && (
          <div className="cd-footer">
            <div className="cd-footer__subtotal">
              <span>Subtotal</span>
              <span>{formatPrice(cart.cost.subtotalAmount)}</span>
            </div>
            <p className="cd-footer__note">Shipping &amp; taxes calculated at checkout</p>
            <a
              href={cart.checkoutUrl}
              className="cd-footer__checkout"
            >
              Proceed to Checkout
            </a>
            <button className="cd-footer__continue" onClick={closeCart}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
