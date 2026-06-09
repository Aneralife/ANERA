"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/components/auth-provider";
import { ChatWidget } from "@/components/chat-widget";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { PopupModal } from "@/components/popup-modal";
import "./marketing.css";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { user, loading: authLoading, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Observe reveal elements — uses MutationObserver so new DOM nodes are caught instantly
  const observeReveals = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              observerRef.current?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
    }
    const io = observerRef.current;
    document
      .querySelectorAll(
        ".reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)"
      )
      .forEach((el) => io.observe(el));
  }, []);

  useEffect(() => {
    // Initial scan after route change
    requestAnimationFrame(observeReveals);

    // Watch for dynamically added elements
    const mo = new MutationObserver(() => {
      requestAnimationFrame(observeReveals);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => mo.disconnect();
  }, [pathname, observeReveals]);

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      {/* Nav */}
      <nav className="nav">
        <Link href="/" className="nav__logo">
          ANERA
        </Link>
        <ul className="nav__links">
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="/science">Science</Link>
          </li>
          <li>
            <Link href="/distribution">Distribution</Link>
          </li>
          <li>
            <Link href="/media">Media</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
        <div className="nav__right">
          <ThemeToggle className="theme-toggle" />
          {!authLoading && user?.role === "admin" && (
            <>
              <Link href="/admin" className="nav__admin-link">
                Admin
              </Link>
              <button onClick={signOut} className="nav__cta">
                Sign Out
              </button>
            </>
          )}
          <button
            className="nav__hamburger"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className={`nav__hamburger-line ${mobileMenuOpen ? "open" : ""}`} />
            <span className={`nav__hamburger-line ${mobileMenuOpen ? "open" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div className={`nav-mobile ${mobileMenuOpen ? "nav-mobile--open" : ""}`}>
        <ul className="nav-mobile__links">
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/science">Science</Link></li>
          <li><Link href="/distribution">Distribution</Link></li>
          <li><Link href="/media">Media</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        {!authLoading && user?.role === "admin" && (
          <div className="nav-mobile__actions">
            <Link href="/admin" className="nav-mobile__link">Admin</Link>
            <button onClick={signOut} className="nav__cta nav-mobile__cta">
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Page Content */}
      <main>{children}</main>



      {/* Cart Drawer */}
      <CartDrawer />
      <PopupModal />

      {/* AI Chat Widget */}
      <ChatWidget />

      {/* Footer */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__top">
            <div className="footer-brand">
              <div className="footer-brand__logo">ANERA</div>
              <p className="footer-brand__tagline">
                Pharmaceutical-grade NMN supplements. Pure. Proven.
                Life-changing. Canada &amp; USA.
              </p>
            </div>
            <div className="footer-col">
              <p className="footer-col__title">Products</p>
              <ul>
                <li>
                  <Link href="/products">NMN 15000</Link>
                </li>
                <li>
                  <Link href="/products">NMN 24000</Link>
                </li>
                <li>
                  <Link href="/products">All Products</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-col__title">Company</p>
              <ul>
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/science">Our Mission</Link>
                </li>
                <li>
                  <Link href="/science">Scientific Board</Link>
                </li>
                <li>
                  <a href="#">Affiliate Program</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-col__title">Support</p>
              <ul>
                <li>
                  <Link href="/contact">Customer Support</Link>
                </li>
                <li>
                  <a href="/distribution">Distribution</a>
                </li>
                <li>
                  <Link href="/media">Press</Link>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-col__title">Contact</p>
              <ul>
                <li>
                  <a href="mailto:Info@aneralife.com">Info@aneralife.com</a>
                </li>
                <li>
                  <a href="#">2220 – 8788 McKim Way</a>
                </li>
                <li>
                  <a href="#">Richmond, BC V6X 4E2</a>
                </li>
                <li>
                  <a href="#">Canada</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-col__title">Follow Us</p>
              <ul>
                <li>
                  <a href="https://www.instagram.com/aneralife/" target="_blank" rel="noopener noreferrer">Instagram</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/anera" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </li>
                <li>
                  <a href="https://www.facebook.com/aneralife/" target="_blank" rel="noopener noreferrer">Facebook</a>
                </li>
                <li>
                  <a href="https://x.com/Aneralife" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
                </li>
                <li>
                  <a href="https://www.tiktok.com/@aneralife" target="_blank" rel="noopener noreferrer">TikTok</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="footer__copy">
              © 2026 Anera Life Inc. All rights reserved. These statements have
              not been evaluated by Health Canada. Not intended to diagnose,
              treat, cure, or prevent any disease.
            </p>
            <ul className="footer__legal">
              <li>
                <Link href="/privacy-policy">Privacy</Link>
              </li>
              <li>
                <Link href="/terms">Terms</Link>
              </li>
              <li>
                <Link href="/returns">Returns</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
