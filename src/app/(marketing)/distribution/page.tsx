"use client";

import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

/* ── Data ────────────────────────────────────────────────────── */
const benefits = [
  { icon: "\u2705", title: "Authenticity Guaranteed", desc: "100% genuine Anera products, directly from our labs to you. Every batch is traceable and verified through our QR authentication system." },
  { icon: "\ud83d\udd2c", title: "Premium Quality", desc: "Backed by scientific research, GMP-certified, and third-party tested. Our partners maintain strict cold-chain storage and handling protocols." },
  { icon: "\ud83d\udee1\ufe0f", title: "Secure & Reliable", desc: "Verified partners ensure safe transactions, proper storage, and real customer support. You\u2019re protected from start to finish." },
  { icon: "\ud83d\udcf1", title: "QR Verification", desc: "Every official Anera product has a unique QR code. Simply scan with your phone to instantly confirm authenticity on aneralife.com." },
];

/* ── Globe Partners ──────────────────────────────────────────── */
type GlobePartner = {
  id: number; name: string; country: string; region: string;
  primary: boolean; lon: number; lat: number;
};

const GLOBE_PARTNERS: GlobePartner[] = [
  { id:1,  name:"Anera USA",       country:"United States",        region:"north-america", primary:true,  lon:-98,   lat:39   },
  { id:2,  name:"Anera Canada",    country:"Canada",               region:"north-america", primary:false, lon:-96,   lat:56   },
  { id:3,  name:"Anera México",    country:"Mexico",               region:"latin-america", primary:false, lon:-102,  lat:23   },
  { id:4,  name:"Anera Brasil",    country:"Brazil",               region:"latin-america", primary:true,  lon:-51,   lat:-14  },
  { id:5,  name:"Anera UK",        country:"United Kingdom",       region:"europe",        primary:false, lon:-2,    lat:54   },
  { id:6,  name:"Anera GmbH",      country:"Germany",              region:"europe",        primary:true,  lon:10,    lat:51   },
  { id:7,  name:"Anera UAE",       country:"United Arab Emirates", region:"middle-east",   primary:true,  lon:54,    lat:24   },
  { id:8,  name:"Anera KSA",       country:"Saudi Arabia",         region:"middle-east",   primary:false, lon:45,    lat:24   },
  { id:9,  name:"Anera India",     country:"India",                region:"asia",          primary:false, lon:79,    lat:22   },
  { id:10, name:"Anera Singapore", country:"Singapore",            region:"asia",          primary:true,  lon:103.8, lat:1.3  },
  { id:11, name:"Anera Australia", country:"Australia",            region:"asia",          primary:false, lon:134,   lat:-25  },
];

const REGION_CENTRES: Record<string, { lon: number; lat: number }> = {
  "north-america": { lon: -100, lat: 40 },
  "latin-america": { lon: -60, lat: -15 },
  "europe":        { lon: 15, lat: 50 },
  "middle-east":   { lon: 48, lat: 26 },
  "asia":          { lon: 100, lat: 20 },
};

const DESERT_IDS = new Set([12,818,504,434,729,706,686,710,566,24,516,270,788]);
const ARCTIC_IDS = new Set([304,352,578,643]);
const HIGH_IDS   = new Set([524,356,586,364,4,51,398,417,762,795]);
const TROPICAL_IDS = new Set([76,484,320,340,332,192,214,84,858,600,604,218,170,616]);

function landColor(id: string) {
  const n = parseInt(id);
  if (ARCTIC_IDS.has(n))   return "#e8e8f0";
  if (DESERT_IDS.has(n))   return "#c8a96e";
  if (HIGH_IDS.has(n))     return "#8b7355";
  if (TROPICAL_IDS.has(n)) return "#3d8b3d";
  return "#2d6a2d";
}

function DistMapSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [globeRegion] = useState("all");
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const worldRef = useRef<any>(null);
  const projRef = useRef<d3.GeoProjection | null>(null);
  const autoRotRef = useRef(true);
  const rotTimerRef = useRef<d3.Timer | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const svg = svgRef.current;
    if (!canvas || !svg) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 600;
    const RADIUS = 285;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * DPR;
    canvas.height = SIZE * DPR;
    canvas.style.width = SIZE + "px";
    canvas.style.height = SIZE + "px";
    ctx.scale(DPR, DPR);

    const cx = SIZE / 2, cy = SIZE / 2;

    const projection = d3.geoOrthographic()
      .scale(RADIUS)
      .translate([cx, cy])
      .clipAngle(90)
      .rotate([0, -20]);
    projRef.current = projection;

    const pathGen = d3.geoPath().projection(projection).context(ctx);

    function drawGlobe() {
      const world = worldRef.current;
      if (!world || !ctx) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const countries = topojson.feature(world, world.objects.countries) as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const borders = topojson.mesh(world, world.objects.countries, (a: any, b: any) => a !== b);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const land = topojson.feature(world, world.objects.land) as any;

      ctx.clearRect(0, 0, SIZE, SIZE);

      /* Shadow behind sphere */
      ctx.save();
      const shadow = ctx.createRadialGradient(cx + 30, cy + 30, RADIUS * 0.6, cx, cy, RADIUS * 1.35);
      shadow.addColorStop(0, "rgba(0,0,0,0)");
      shadow.addColorStop(1, "rgba(0,0,0,0.65)");
      ctx.beginPath(); ctx.arc(cx, cy, RADIUS * 1.35, 0, Math.PI * 2);
      ctx.fillStyle = shadow; ctx.fill();
      ctx.restore();

      /* Clip to sphere */
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, RADIUS, 0, Math.PI * 2); ctx.clip();

      /* Ocean gradient */
      const oceanGrad = ctx.createRadialGradient(cx - 80, cy - 80, RADIUS * 0.1, cx, cy, RADIUS);
      oceanGrad.addColorStop(0, "#1a5a9e");
      oceanGrad.addColorStop(0.3, "#0e3d74");
      oceanGrad.addColorStop(0.7, "#082852");
      oceanGrad.addColorStop(1, "#030f22");
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, SIZE, SIZE);

      /* Graticule */
      const grat = d3.geoGraticule().step([15, 15])();
      ctx.beginPath(); pathGen(grat);
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.lineWidth = 0.5; ctx.stroke();

      /* Country fills */
      countries.features.forEach((f: GeoJSON.Feature & { id?: string }) => {
        ctx.beginPath(); pathGen(f);
        ctx.fillStyle = landColor(f.id || "0");
        ctx.fill();
      });

      /* Land edge shading */
      ctx.beginPath(); pathGen(land as unknown as d3.GeoPermissibleObjects);
      ctx.strokeStyle = "rgba(0,0,0,0.35)";
      ctx.lineWidth = 0.6; ctx.stroke();

      /* Country borders */
      ctx.beginPath(); pathGen(borders);
      ctx.strokeStyle = "rgba(0,0,0,0.45)";
      ctx.lineWidth = 0.4; ctx.stroke();

      ctx.restore();

      /* Atmosphere rim */
      const atmo = ctx.createRadialGradient(cx, cy, RADIUS * 0.92, cx, cy, RADIUS * 1.08);
      atmo.addColorStop(0, "rgba(100,180,255,0)");
      atmo.addColorStop(0.5, "rgba(80,150,255,0.09)");
      atmo.addColorStop(1, "rgba(60,120,220,0)");
      ctx.beginPath(); ctx.arc(cx, cy, RADIUS * 1.08, 0, Math.PI * 2);
      ctx.fillStyle = atmo; ctx.fill();

      /* Sphere border */
      ctx.beginPath(); ctx.arc(cx, cy, RADIUS, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(120,180,255,0.2)";
      ctx.lineWidth = 1; ctx.stroke();

      /* Specular highlight */
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, RADIUS, 0, Math.PI * 2); ctx.clip();
      const spec = ctx.createRadialGradient(cx - 110, cy - 100, 0, cx - 60, cy - 60, RADIUS * 0.7);
      spec.addColorStop(0, "rgba(255,255,255,0.18)");
      spec.addColorStop(0.3, "rgba(255,255,255,0.06)");
      spec.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = spec; ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.restore();

      /* Dark limb */
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, RADIUS, 0, Math.PI * 2); ctx.clip();
      const limb = ctx.createRadialGradient(cx - 60, cy - 60, RADIUS * 0.55, cx, cy, RADIUS);
      limb.addColorStop(0, "rgba(0,0,0,0)");
      limb.addColorStop(0.7, "rgba(0,0,0,0)");
      limb.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = limb; ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.restore();

      /* Update SVG pin positions */
      updatePins();
    }

    function updatePins() {
      const svgEl = d3.select(svg);
      svgEl.selectAll<SVGGElement, GlobePartner>(".pin-g").each(function (p) {
        const g = d3.select(this);
        const rot = projection.rotate();
        const visible = d3.geoDistance([p.lon, p.lat], [-rot[0], -rot[1]]) < Math.PI / 2;
        g.style("display", visible ? "" : "none");
        if (visible) {
          const pos = projection([p.lon, p.lat]);
          if (pos) {
            g.selectAll("circle").attr("cx", pos[0]).attr("cy", pos[1]);
          }
        }
      });
    }

    function renderPins() {
      const svgEl = d3.select(svg);
      svgEl.selectAll("*").remove();

      const defs = svgEl.append("defs");
      const gf = defs.append("filter").attr("id", "pglow")
        .attr("x", "-80%").attr("y", "-80%").attr("width", "260%").attr("height", "260%");
      gf.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "b");
      const gfm = gf.append("feMerge");
      gfm.append("feMergeNode").attr("in", "b");
      gfm.append("feMergeNode").attr("in", "SourceGraphic");

      const fp = globeRegion === "all"
        ? GLOBE_PARTNERS
        : GLOBE_PARTNERS.filter(p => p.region === globeRegion);

      fp.forEach((p, i) => {
        const col = p.primary ? "#34c759" : "#c9a96e";
        const haloCol = p.primary ? "rgba(52,199,89,.3)" : "rgba(201,169,110,.3)";

        const g = svgEl.append("g").attr("class", "pin-g").datum(p).style("cursor", "pointer");

        g.append("circle").attr("class", "globe-pin-pulse").attr("r", 5)
          .attr("fill", col).style("animation-delay", `${i * 0.3}s`);

        const halo = g.append("circle").attr("r", 10).attr("fill", haloCol)
          .attr("filter", "url(#pglow)");

        g.append("circle").attr("r", 6).attr("fill", "none")
          .attr("stroke", col).attr("stroke-width", "0.8").attr("opacity", "0.5");

        g.append("circle").attr("r", 4).attr("fill", col)
          .attr("stroke", "#030a14").attr("stroke-width", "1.2");

        const tt = tooltipRef.current;
        g.on("mouseenter", function () {
          halo.attr("r", 16);
          if (tt) {
            tt.querySelector(".globe-tt-name")!.textContent = p.name;
            tt.querySelector(".globe-tt-ctry")!.textContent = p.country;
            tt.style.opacity = "1";
          }
        })
        .on("mousemove", function (ev) {
          if (tt) {
            const me = ev as unknown as MouseEvent;
            let x = me.clientX + 14;
            const y = me.clientY - 46;
            if (x + 210 > window.innerWidth) x = me.clientX - 220;
            tt.style.left = x + "px"; tt.style.top = y + "px";
          }
        })
        .on("mouseleave", function () {
          halo.attr("r", 10);
          if (tt) tt.style.opacity = "0";
        })
        .on("click", () => flyTo(p));
      });

      updatePins();
    }

    function flyTo(p: { lon: number; lat: number }) {
      autoRotRef.current = false;
      const from = projection.rotate();
      const to: [number, number, number] = [-p.lon, -p.lat + 12, from[2] || 0];
      const interp = d3.interpolate(from, to);
      d3.transition().duration(950).ease(d3.easeCubicInOut)
        .tween("r", () => (t: number) => { projection.rotate(interp(t)); drawGlobe(); })
        .on("end", () => { setTimeout(() => { autoRotRef.current = true; }, 4000); });
    }

    /* Start rotation */
    if (rotTimerRef.current) rotTimerRef.current.stop();
    rotTimerRef.current = d3.timer(() => {
      if (!autoRotRef.current) return;
      const r = projection.rotate();
      projection.rotate([r[0] + 0.15, r[1]]);
      drawGlobe();
    });

    /* Drag */
    let startRot: [number, number, number] = [0, 0, 0];
    let startPos: [number, number] = [0, 0];
    let resumeTimeout: ReturnType<typeof setTimeout>;
    const drag = d3.drag<HTMLCanvasElement, unknown>()
      .on("start", (e) => {
        autoRotRef.current = false;
        startRot = projection.rotate() as [number, number, number];
        startPos = [e.x, e.y];
      })
      .on("drag", (e) => {
        const dx = e.x - startPos[0];
        const dy = e.y - startPos[1];
        projection.rotate([startRot[0] + dx * 0.28, startRot[1] - dy * 0.28, startRot[2]]);
        drawGlobe();
      })
      .on("end", () => {
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => { autoRotRef.current = true; }, 3000);
      });
    d3.select(canvas).call(drag);

    /* Load world data */
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then(r => r.json())
      .then(world => {
        worldRef.current = world;
        setLoading(false);
        renderPins();
        drawGlobe();
      })
      .catch(err => {
        console.error("Globe data load failed:", err);
        setLoading(false);
      });

    return () => {
      if (rotTimerRef.current) rotTimerRef.current.stop();
      clearTimeout(resumeTimeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Re-render pins when region changes */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !worldRef.current || !projRef.current) return;

    const svgEl = d3.select(svg);
    svgEl.selectAll("*").remove();

    const defs = svgEl.append("defs");
    const gf = defs.append("filter").attr("id", "pglow")
      .attr("x", "-80%").attr("y", "-80%").attr("width", "260%").attr("height", "260%");
    gf.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "b");
    const gfm = gf.append("feMerge");
    gfm.append("feMergeNode").attr("in", "b");
    gfm.append("feMergeNode").attr("in", "SourceGraphic");

    const fp = globeRegion === "all"
      ? GLOBE_PARTNERS
      : GLOBE_PARTNERS.filter(p => p.region === globeRegion);

    const projection = projRef.current;

    fp.forEach((p, i) => {
      const col = p.primary ? "#34c759" : "#c9a96e";
      const haloCol = p.primary ? "rgba(52,199,89,.3)" : "rgba(201,169,110,.3)";

      const g = svgEl.append("g").attr("class", "pin-g").datum(p).style("cursor", "pointer");

      g.append("circle").attr("class", "globe-pin-pulse").attr("r", 5)
        .attr("fill", col).style("animation-delay", `${i * 0.3}s`);

      const halo = g.append("circle").attr("r", 10).attr("fill", haloCol)
        .attr("filter", "url(#pglow)");

      g.append("circle").attr("r", 6).attr("fill", "none")
        .attr("stroke", col).attr("stroke-width", "0.8").attr("opacity", "0.5");

      g.append("circle").attr("r", 4).attr("fill", col)
        .attr("stroke", "#030a14").attr("stroke-width", "1.2");

      const tt = tooltipRef.current;
      g.on("mouseenter", function () {
        halo.attr("r", 16);
        if (tt) {
          tt.querySelector(".globe-tt-name")!.textContent = p.name;
          tt.querySelector(".globe-tt-ctry")!.textContent = p.country;
          tt.style.opacity = "1";
        }
      })
      .on("mousemove", function (ev) {
        if (tt) {
          const me = ev as unknown as MouseEvent;
          let x = me.clientX + 14;
          const y = me.clientY - 46;
          if (x + 210 > window.innerWidth) x = me.clientX - 220;
          tt.style.left = x + "px"; tt.style.top = y + "px";
        }
      })
      .on("mouseleave", function () {
        halo.attr("r", 10);
        if (tt) tt.style.opacity = "0";
      })
      .on("click", () => {
        autoRotRef.current = false;
        const from = projection.rotate();
        const to: [number, number, number] = [-p.lon, -p.lat + 12, from[2] || 0];
        const interp = d3.interpolate(from, to);
        d3.transition().duration(950).ease(d3.easeCubicInOut)
          .tween("r", () => (t: number) => { projection.rotate(interp(t)); })
          .on("end", () => { setTimeout(() => { autoRotRef.current = true; }, 4000); });
      });
    });

    /* Fly to region centre */
    if (globeRegion !== "all" && REGION_CENTRES[globeRegion]) {
      const c = REGION_CENTRES[globeRegion];
      autoRotRef.current = false;
      const from = projection.rotate();
      const to: [number, number, number] = [-c.lon, -c.lat + 12, from[2] || 0];
      const interp = d3.interpolate(from, to);
      d3.transition().duration(950).ease(d3.easeCubicInOut)
        .tween("r", () => (t: number) => { projection.rotate(interp(t)); })
        .on("end", () => { setTimeout(() => { autoRotRef.current = true; }, 4000); });
    }
  }, [globeRegion]);

  return (
    <>
      {/* Tooltip */}
      <div ref={tooltipRef} className="globe-tooltip">
        <div className="globe-tt-name" />
        <div className="globe-tt-ctry" />
      </div>

      <section className="dist-globe-section" id="dist-map-section">
        <p className="dist-globe-eyebrow">Global Reach &mdash; Verified Partners</p>
        <h2 className="dist-globe-headline">Official Anera Partners<br />Worldwide</h2>

        <div className="dist-globe-wrap">
          <div className="dist-globe-stage">
            {loading && (
              <div className="dist-globe-loading">
                <span>Rendering globe</span>
                <div className="dist-globe-lbar"><div className="dist-globe-lbar-fill" /></div>
              </div>
            )}
            <canvas ref={canvasRef} id="globe-canvas" />
            <svg ref={svgRef} className="dist-globe-pin-svg" viewBox="0 0 600 600" />
          </div>

          <div className="dist-globe-hint">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" opacity=".5" />
              <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".6" />
            </svg>
            Drag to rotate &nbsp;&middot;&nbsp; Auto-spinning
          </div>

          
        </div>

        <div className="dist-globe-stats">
          <div className="dist-globe-stat"><div className="dist-globe-stat__num">11<sup>+</sup></div><div className="dist-globe-stat__lbl">Countries</div></div>
          <div className="dist-globe-stat"><div className="dist-globe-stat__num">5</div><div className="dist-globe-stat__lbl">Regions</div></div>
          <div className="dist-globe-stat"><div className="dist-globe-stat__num">3</div><div className="dist-globe-stat__lbl">Primary Markets</div></div>
          <div className="dist-globe-stat"><div className="dist-globe-stat__num">100<sup>%</sup></div><div className="dist-globe-stat__lbl">QR Authenticated</div></div>
        </div>
      </section>
    </>
  );
}

/* ── Component ───────────────────────────────────────────────── */
export default function DistributionPage() {
  const [activeRegion] = useState("north-america");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const els = document.querySelectorAll(".dist-reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* re-trigger reveal when switching tabs */
  useEffect(() => {
    const panel = document.getElementById(`panel-${activeRegion}`);
    if (!panel) return;
    const els = panel.querySelectorAll(".dist-reveal");
    els.forEach((el) => {
      el.classList.remove("visible");
      requestAnimationFrame(() => el.classList.add("visible"));
    });
  }, [activeRegion]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="dist-hero">
        <video className="dist-hero__bg" autoPlay muted loop playsInline>
          <source src="/assets/media-2.webm" type="video/webm" />
        </video>
        <div className="dist-hero__content">
          <p className="dist-hero__eyebrow dist-reveal">Anera Global Distribution &mdash; Official Partners</p>
          <h1 className="dist-hero__title dist-reveal">Fueled by Science.<br />Verified for Trust.</h1>
          <p className="dist-hero__subtitle dist-reveal">Our products are trusted by thousands worldwide &mdash; but only official Anera Global Distribution Partners are verified to bring our science-backed supplements to your region.</p>
          <div className="dist-hero__actions dist-reveal">
            <a href="#regions" className="dist-btn dist-btn--primary">Find a Partner &rarr;</a>
            <a href="#become-partner" className="dist-btn dist-btn--secondary">Become a Partner</a>
          </div>
        </div>
        <button onClick={toggleAudio} className={`dist-hero__audio-btn ${isPlaying ? 'playing' : ''}`}>
          {isPlaying ? "Pause" : "Listen"}
        </button>
      </section>

      {/* ── Trust Strip ───────────────────────────────────────── */}
      <div className="dist-trust-strip">
        {[
          { icon: "\u2705", title: "Authenticity Guaranteed", sub: "100% genuine Anera products" },
          { icon: "\ud83d\udd2c", title: "Premium Quality", sub: "GMP-certified & third-party tested" },
          { icon: "\ud83d\udd12", title: "Secure & Reliable", sub: "Verified safe transactions" },
          { icon: "\ud83d\udeab", title: "No Counterfeits", sub: "Avoid fakes & unauthorized resellers" },
        ].map((item, i) => (
          <div key={i} className={`dist-trust-item dist-reveal${i > 0 ? ` dist-reveal-delay-${i}` : ""}`}>
            <div className="dist-trust-item__icon">{item.icon}</div>
            <div className="dist-trust-item__text">
              <strong>{item.title}</strong>
              <span>{item.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── World Map v2 ──────────────────────────────────────── */}
      <DistMapSection />

      {/* ── Region Tabs ───────────────────────────────────────── */}
      

      {/* ── Benefits ──────────────────────────────────────────── */}
      <section className="dist-benefits">
        <div className="dist-benefits__inner">
          <div className="dist-benefits__header">
            <p className="dist-benefits__eyebrow dist-reveal">Why Buy from an Official Partner</p>
            <h2 className="dist-benefits__title dist-reveal">The Anera<br />Authenticity Promise</h2>
            <p className="dist-benefits__subtitle dist-reveal">Every official Anera partner is rigorously vetted to ensure you receive only the highest quality, genuine products.</p>
          </div>
          <div className="dist-benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className={`dist-benefit-item dist-reveal${i > 0 ? ` dist-reveal-delay-${i}` : ""}`}>
                <div className="dist-benefit-item__icon">{b.icon}</div>
                <div className="dist-benefit-item__text">
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Become Partner ────────────────────────────────────── */}
      <section className="dist-become-partner" id="become-partner">
        <div className="dist-become-partner__bg" />
        <div className="dist-become-partner__content dist-reveal">
          <p className="dist-become-partner__eyebrow">Expand With Us</p>
          <h2>Want to Distribute Anera<br />in Your Country?</h2>
          <p>We&apos;re expanding! If you&apos;re a passionate health and longevity advocate, apply to become an Anera Global Distribution Partner today. Join the movement. Build the future of longevity.</p>
          <div className="dist-become-partner__actions">
            <a href="mailto:info@aneralife.com?subject=Distribution Partner Application" className="dist-btn dist-btn--accent">Apply Now &rarr;</a>
            <a href="mailto:info@aneralife.com" className="dist-btn dist-btn--secondary">Contact Us</a>
          </div>
          <p className="dist-become-partner__footer-text">info@aneralife.com &middot; Anera Life Inc. &middot; Richmond, BC, Canada</p>
        </div>
      </section>

      <audio ref={audioRef} loop>
        <source src="/assets/distribution.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}
