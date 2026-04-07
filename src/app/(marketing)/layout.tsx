"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/components/auth-provider";
import { ChatWidget } from "@/components/chat-widget";
import "./marketing.css";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navRef = useRef<HTMLElement>(null);
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

  // Hide nav on scroll down, show on scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const nav = navRef.current;
        if (!nav) { ticking = false; return; }
        const y = window.scrollY;

        // Toggle scrolled background
        if (y > 10) nav.classList.add("scrolled");
        else nav.classList.remove("scrolled");

        // Hide/show based on direction (only after scrolling past nav height)
        // Don't hide when mobile menu is open
        const isProductPage = window.location.pathname.startsWith("/products/");
        if (!isProductPage && !mobileMenuOpen && y > 64 && y > lastY) {
          nav.classList.add("nav--hidden");
        } else {
          nav.classList.remove("nav--hidden");
        }

        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileMenuOpen]);

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
      <nav className={`nav${pathname === "/about" || pathname === "/contact" ? " nav--light-hero" : pathname === "/distribution" ? " nav--distribution" : ""}`} ref={navRef}>
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
          {!authLoading && (
            user ? (
              <>
                {user.role === "admin" && (
                  <Link href="/admin" className="nav__links" style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase" as const, color: "var(--fg-secondary)" }}>
                    Admin
                  </Link>
                )}
                <button onClick={signOut} className="nav__cta" style={{ background: "none", cursor: "pointer", border: "1px solid var(--cta-border)", fontFamily: "inherit" }}>
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/signin" className="nav__cta">
                Sign In
              </Link>
            )
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
        {!authLoading && (
          <div className="nav-mobile__actions">
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link href="/admin" className="nav-mobile__link">Admin</Link>
                )}
                <button onClick={signOut} className="nav__cta nav-mobile__cta">
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/signin" className="nav__cta nav-mobile__cta">
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Page Content */}
      <main>{children}</main>



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
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">Returns</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
