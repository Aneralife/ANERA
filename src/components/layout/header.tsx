"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";
import { useState, useEffect, useRef } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
  { name: "Shop", href: "/products" },
  { name: "Collections", href: "/collections" },
];

export function Header() {
  const { cart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const itemCount = cart?.totalQuantity ?? 0;

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (!mobileMenuOpen && y > 48 && y > lastY.current) {
          setHidden(true);
        } else {
          setHidden(false);
        }
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileMenuOpen]);

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl backdrop-saturate-[180%] transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"}`} style={{ background: 'var(--background, rgba(251,251,253,0.8))' }}>
      <nav
        className="mx-auto flex h-12 max-w-[980px] items-center justify-between px-4 sm:px-6"
        aria-label="Main navigation"
      >
        {/* Mobile menu button */}
        <button
          type="button"
          className="p-1.5 sm:hidden"
          style={{ color: 'var(--foreground)' }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg
            className="h-[18px] w-[18px]"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="text-[21px] font-bold tracking-[-0.02em]"
          style={{ color: 'var(--foreground)' }}
        >
          Anera
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 sm:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-xs font-normal opacity-80 transition-opacity duration-400 ease-apple hover:opacity-100"
              style={{ color: 'var(--foreground)' }}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Theme toggle + Cart */}
        <div className="flex items-center gap-2">
          <ThemeToggle className="p-1.5 opacity-60 transition-opacity duration-400 ease-apple hover:opacity-100" />
          <Link
            href="/cart"
            className="relative p-1.5 opacity-80 transition-opacity duration-400 ease-apple hover:opacity-100"
            style={{ color: 'var(--foreground)' }}
            aria-label={`Shopping cart with ${itemCount} items`}
          >
            <svg
              className="h-[18px] w-[18px]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#0071e3] text-[9px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-400 ease-apple sm:hidden ${
          mobileMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-[980px] px-4 pb-4 sm:px-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-2 text-sm opacity-80 transition-opacity hover:opacity-100"
              style={{ color: 'var(--foreground)' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
