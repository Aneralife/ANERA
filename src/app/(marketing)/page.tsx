"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const loaderBarRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const parallaxVideoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setAudioPlaying(true);
    } else {
      audio.pause();
      setAudioPlaying(false);
    }
  }

  useEffect(() => {
    const bar = loaderBarRef.current;
    const loader = loaderRef.current;
    if (bar && loader) {
      let progress = 0;
      const tick = setInterval(() => {
        progress += Math.random() * 18;
        if (progress >= 100) {
          progress = 100;
          clearInterval(tick);
        }
        bar.style.width = progress + "%";
        if (progress === 100) {
          setTimeout(() => loader.classList.add("hidden"), 300);
        }
      }, 80);
      return () => clearInterval(tick);
    }
  }, []);

  useEffect(() => {
    const pv = parallaxVideoRef.current;
    if (!pv) return;
    const onScroll = () => {
      const rect = pv.parentElement!.getBoundingClientRect();
      const offset = (rect.top / window.innerHeight) * 60;
      pv.style.transform = `translate(-50%, -50%) translateY(${offset}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <div id="loader" ref={loaderRef}>
        <div className="loader-logo">ANERA</div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" ref={loaderBarRef}></div>
        </div>
      </div>

      {/* Hero */}
      <section className="hero">
        <audio ref={audioRef} src="/assets/song.mp3" loop preload="none" />
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/hero_poster.jpg"
          preload="auto"
        >
          <source src="/assets/hero.webm" type="video/webm" />
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero__overlay"></div>
        <button
          className={`hero__audio-btn${audioPlaying ? " playing" : ""}`}
          onClick={toggleAudio}
          aria-label={audioPlaying ? "Pause music" : "Play music"}
        >
          {audioPlaying ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" /><path d="M15.54 8.46a5 5 0 010 7.07" /><path d="M19.07 4.93a10 10 0 010 14.14" />
            </svg>
          )}
        </button>
        <div className="hero__content">
          <p className="hero__eyebrow">
            Pharmaceutical-Grade NMN &middot; Canada &amp; USA
          </p>
          <h1 className="hero__title">
            Longevity Is
            <br />
            the <span>New Flex.</span>
          </h1>
          <p className="hero__sub">
            Daily NMN fuels your body and mind — giving you the energy, clarity,
            and resilience to stay ahead. Your evolution has begun.
          </p>
          <div className="hero__ctas">
            <Link href="/products" className="btn-primary">
              Shop Now →
            </Link>
            <Link href="/science" className="btn-ghost">
              Discover the Science
            </Link>
          </div>
        </div>
        <div className="hero__scroll">
          <span className="hero__scroll-text">Scroll</span>
          <div className="hero__scroll-line"></div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-strip">
        <div className="marquee-track" aria-hidden="true">
          <span>Pharmaceutical Grade</span>
          <span>Human Clinically Tested</span>
          <span>Free Shipping Over $150 CAD</span>
          <span>Endotoxin &lt;20 Eu/g</span>
          <span>Canada &amp; USA</span>
          <span>Pure. Proven. Powerful.</span>
          <span>Pharmaceutical Grade</span>
          <span>Human Clinically Tested</span>
          <span>Free Shipping Over $150 CAD</span>
          <span>Endotoxin &lt;20 Eu/g</span>
          <span>Canada &amp; USA</span>
          <span>Pure. Proven. Powerful.</span>
        </div>
      </div>

      {/* Intro Statement */}
      <section className="intro">
        <div className="intro__inner">
          <p className="label reveal">Our Philosophy</p>
          <h2 className="intro__quote reveal">
            True strength isn&apos;t built in a moment —
            <br />
            it&apos;s built <em>day by day.</em>
          </h2>
          <p className="intro__body reveal">
            Real power comes from nourishing your body and mind so they can
            carry you far into the future. With daily NMN, you&apos;re not just
            boosting your energy — you&apos;re unlocking clarity of thought,
            sharper focus, and the resilience to keep pushing forward.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-row">
        <div className="stats-row__inner">
          <div className="stat reveal">
            <div className="stat__num">
              &lt;20<sup>Eu/g</sup>
            </div>
            <div className="stat__label">
              Endotoxin level
              <br />
              Industry&apos;s lowest
            </div>
          </div>
          <div className="stat reveal" style={{ transitionDelay: ".1s" }}>
            <div className="stat__num">
              100<sup>%</sup>
            </div>
            <div className="stat__label">
              Pharmaceutical-grade
              <br />
              purity standard
            </div>
          </div>
          <div className="stat reveal" style={{ transitionDelay: ".2s" }}>
            <div className="stat__num">2</div>
            <div className="stat__label">
              Clinically tested
              <br />
              human trial formulas
            </div>
          </div>
          <div className="stat reveal" style={{ transitionDelay: ".3s" }}>
            <div className="stat__num">
              31<sup>+</sup>
            </div>
            <div className="stat__label">
              Verified Google
              <br />
              reviews
            </div>
          </div>
        </div>
      </div>

      {/* Video Parallax */}
      <div className="video-parallax">
        <video
          className="video-parallax__bg"
          ref={parallaxVideoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/hero_poster.jpg"
        >
          <source src="/assets/hero.webm" type="video/webm" />
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>
        <div className="video-parallax__overlay"></div>
        <div className="video-parallax__content reveal">
          <p className="label" style={{ color: "var(--accent)" }}>
            The Long Game
          </p>
          <h2 className="h1">
            Every dose is an
            <br />
            investment in your future.
          </h2>
          <p
            className="body-lg"
            style={{ maxWidth: 560, margin: "20px auto 36px" }}
          >
            At Anera, we believe in playing the long game. Rise each day
            stronger than the last.
          </p>
          <Link href="/products" className="btn-primary">
            Fuel My Future →
          </Link>
        </div>
      </div>

      {/* Mission */}
      <section className="mission-section">
        <div className="mission-section__inner">
          <p className="mission-eyebrow reveal">Mission · Story · Promise</p>
          <h2 className="mission-title reveal">
            Built to
            <br />
            <em>Heal Humanity.</em>
          </h2>
          <p className="mission-body reveal">
            The story of Anera is rooted in a single purpose: to help heal
            humanity by delivering the world&apos;s most advanced, pure, and
            effective longevity formulations. We believe health is the
            foundation of a life well-lived and those who seek the best
            deserve uncompromising quality.
          </p>
          <Link href="/about" className="btn-primary reveal">
            Our Story →
          </Link>
        </div>
      </section>
    </>
  );
}
