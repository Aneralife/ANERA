"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ── Data ────────────────────────────────────────────────────── */
type Partner = {
  flag: string;
  country: string;
  name: string;
  desc: string;
  emails: string[];
  website?: string;
  verified?: boolean;
};

const regions: { id: string; label: string; emoji: string; partners: Partner[] }[] = [
  {
    id: "north-america",
    label: "North America",
    emoji: "\ud83c\udf0e",
    partners: [
      { flag: "https://flagcdn.com/w40/ca.png", country: "Canada", name: "Anera Life Inc.", desc: "Official headquarters and primary distribution for Canada. Pharmaceutical-grade NMN direct from our Richmond, BC facility.", emails: ["info@aneralife.com"], website: "aneralife.com", verified: true },
      { flag: "https://flagcdn.com/w40/us.png", country: "United States", name: "Anera USA Distribution", desc: "Official US distribution partner. Serving customers across all 50 states with fast domestic shipping and full product range.", emails: ["usa@aneralife.com"], website: "aneralife.com/usa", verified: true },
    ],
  },
  {
    id: "latin-america",
    label: "Mexico / Latin America",
    emoji: "\ud83c\udf0e",
    partners: [
      { flag: "https://flagcdn.com/w40/mx.png", country: "Mexico", name: "Anera M\u00e9xico", desc: "Official distribution partner for Mexico and surrounding Latin American markets. Authorized to distribute all Anera NMN products.", emails: ["mexico@aneralife.com"], verified: true },
      { flag: "https://flagcdn.com/w40/br.png", country: "Brazil", name: "Anera Brasil", desc: "Serving the Brazilian longevity market with authentic Anera products. Compliant with ANVISA regulations.", emails: ["brasil@aneralife.com"], verified: true },
      { flag: "https://flagcdn.com/w40/br.png", country: "Rest of Latin America", name: "Expanding Soon", desc: "We are actively expanding our distribution network across Latin America. Contact us to inquire about distribution opportunities in your country.", emails: ["info@aneralife.com"] },
    ],
  },
  {
    id: "europe",
    label: "Europe",
    emoji: "\ud83c\udf0d",
    partners: [
      { flag: "https://flagcdn.com/w40/gb.png", country: "United Kingdom", name: "Anera UK", desc: "Official UK distribution. Post-Brexit compliant, with fast domestic delivery across England, Scotland, Wales, and Northern Ireland.", emails: ["uk@aneralife.com"], verified: true },
      { flag: "https://flagcdn.com/w40/de.png", country: "Germany", name: "Anera Deutschland", desc: "Serving the DACH region (Germany, Austria, Switzerland). EU-compliant distribution with full product certification.", emails: ["de@aneralife.com"], verified: true },
      { flag: "https://flagcdn.com/w40/fr.png", country: "France", name: "Anera France", desc: "Official French distribution partner. Serving France and Francophone European markets with authentic Anera products.", emails: ["fr@aneralife.com"], verified: true },
    ],
  },
  {
    id: "dubai",
    label: "Dubai / UAE",
    emoji: "\ud83c\udf0f",
    partners: [
      { flag: "https://flagcdn.com/w40/ae.png", country: "United Arab Emirates", name: "Anera Middle East", desc: "Official distribution hub for the UAE, Saudi Arabia, and the broader GCC region. Dubai-based operations with regional reach.", emails: ["uae@aneralife.com"], verified: true },
      { flag: "https://flagcdn.com/w40/sa.png", country: "Saudi Arabia", name: "Anera KSA", desc: "Serving the Saudi Arabian market with SFDA-compliant distribution. Authentic Anera products for the Kingdom\u2019s longevity community.", emails: ["ksa@aneralife.com"], verified: true },
    ],
  },
  {
    id: "asia",
    label: "Asia",
    emoji: "\ud83c\udf0f",
    partners: [
      { flag: "https://flagcdn.com/w40/sg.png", country: "Singapore", name: "Anera Singapore", desc: "Distribution hub for Southeast Asia. Serving Singapore, Malaysia, Thailand, and surrounding markets with HSA-compliant products.", emails: ["sg@aneralife.com"], verified: true },
      { flag: "https://flagcdn.com/w40/au.png", country: "Australia", name: "Anera Australia", desc: "Official Australian distribution. TGA-compliant products serving Australia and New Zealand\u2019s growing longevity community.", emails: ["au@aneralife.com"], verified: true },
    ],
  },
];

const benefits = [
  { icon: "\u2705", title: "Authenticity Guaranteed", desc: "100% genuine Anera products, directly from our labs to you. Every batch is traceable and verified through our QR authentication system." },
  { icon: "\ud83d\udd2c", title: "Premium Quality", desc: "Backed by scientific research, GMP-certified, and third-party tested. Our partners maintain strict cold-chain storage and handling protocols." },
  { icon: "\ud83d\udee1\ufe0f", title: "Secure & Reliable", desc: "Verified partners ensure safe transactions, proper storage, and real customer support. You\u2019re protected from start to finish." },
  { icon: "\ud83d\udcf1", title: "QR Verification", desc: "Every official Anera product has a unique QR code. Simply scan with your phone to instantly confirm authenticity on aneralife.com." },
];

/* ── Map Partners ────────────────────────────────────────────── */
type MapPartner = {
  id: string; flag: string; country: string; name: string; desc: string;
  region: string; primary: boolean; mx: number; my: number; contact: string[];
};

const MAP_PARTNERS: MapPartner[] = [
  { id:"canada",    flag:"https://flagcdn.com/w40/ca.png", country:"Canada",              name:"Anera Life Inc.",          desc:"Official headquarters and primary distribution for Canada. Pharmaceutical-grade NMN from our Richmond, BC facility, shipped coast to coast.",                          region:"north-america", primary:true,  mx:14.5, my:28, contact:["info@aneralife.com","aneralife.com"] },
  { id:"usa",       flag:"https://flagcdn.com/w40/us.png", country:"United States",        name:"Anera USA Distribution",   desc:"Official US distribution partner. Serving all 50 states with fast domestic shipping and the full Anera product range.",                                              region:"north-america", primary:true,  mx:16.5, my:35, contact:["usa@aneralife.com","aneralife.com/usa"] },
  { id:"mexico",    flag:"https://flagcdn.com/w40/mx.png", country:"Mexico",               name:"Anera México",             desc:"Official distribution partner for Mexico and surrounding Central American markets.",                                                                              region:"latin-america", primary:false, mx:15.2, my:43, contact:["mexico@aneralife.com"] },
  { id:"brazil",    flag:"https://flagcdn.com/w40/br.png", country:"Brazil",               name:"Anera Brasil",             desc:"Serving the Brazilian longevity market with authentic Anera products. ANVISA-compliant distribution.",                                                            region:"latin-america", primary:false, mx:24.5, my:64, contact:["brasil@aneralife.com"] },
  { id:"uk",        flag:"https://flagcdn.com/w40/gb.png", country:"United Kingdom",       name:"Anera UK",                 desc:"Official UK distribution. Fast domestic delivery across England, Scotland, Wales, and Northern Ireland.",                                                         region:"europe",        primary:false, mx:44.2, my:19, contact:["uk@aneralife.com"] },
  { id:"germany",   flag:"https://flagcdn.com/w40/de.png", country:"Germany",              name:"Anera Deutschland",        desc:"Serving the DACH region — Germany, Austria, and Switzerland — with EU-compliant distribution and full product certification.",                                    region:"europe",        primary:false, mx:47.8, my:20, contact:["de@aneralife.com"] },
  { id:"france",    flag:"https://flagcdn.com/w40/fr.png", country:"France",               name:"Anera France",             desc:"Official French distribution partner. Serving France and Francophone European markets with authentic Anera products.",                                            region:"europe",        primary:false, mx:45.5, my:23, contact:["fr@aneralife.com"] },
  { id:"uae",       flag:"https://flagcdn.com/w40/ae.png", country:"United Arab Emirates", name:"Anera Middle East",        desc:"Official distribution hub for the UAE and the broader GCC region. Dubai-based operations with regional reach across the Gulf.",                                   region:"middle-east",   primary:true,  mx:58.5, my:37, contact:["uae@aneralife.com"] },
  { id:"ksa",       flag:"https://flagcdn.com/w40/sa.png", country:"Saudi Arabia",         name:"Anera KSA",                desc:"Serving the Saudi Arabian market with SFDA-compliant distribution. Authentic Anera products for the Kingdom\u2019s longevity community.",                        region:"middle-east",   primary:false, mx:57.0, my:42, contact:["ksa@aneralife.com"] },
  { id:"singapore", flag:"https://flagcdn.com/w40/sg.png", country:"Singapore",            name:"Anera Singapore",          desc:"Distribution hub for Southeast Asia. Serving Singapore, Malaysia, Thailand, and surrounding markets with HSA-compliant products.",                              region:"asia",          primary:false, mx:74.5, my:48, contact:["sg@aneralife.com"] },
  { id:"australia", flag:"https://flagcdn.com/w40/au.png", country:"Australia",            name:"Anera Australia",          desc:"Official Australian distribution. TGA-compliant products serving Australia and New Zealand\u2019s growing longevity community.",                                   region:"asia",          primary:false, mx:81.5, my:73, contact:["au@aneralife.com"] },
];

const SHAPES: Record<string, number[][]> = {
  "north-america":[[.065,.17],[.085,.12],[.105,.09],[.135,.08],[.165,.08],[.19,.09],[.21,.11],[.225,.14],[.23,.17],[.225,.20],[.215,.23],[.205,.26],[.195,.29],[.185,.32],[.175,.35],[.165,.38],[.16,.41],[.155,.43],[.145,.41],[.135,.38],[.125,.34],[.115,.30],[.105,.26],[.09,.22],[.075,.19]],
  "greenland":[[.185,.06],[.205,.04],[.23,.045],[.245,.07],[.24,.10],[.225,.115],[.21,.11],[.195,.09],[.185,.07]],
  "alaska":[[.045,.14],[.06,.12],[.07,.14],[.065,.17],[.05,.17]],
  "latin-america":[[.155,.43],[.165,.41],[.18,.41],[.195,.43],[.205,.46],[.215,.50],[.22,.54],[.225,.58],[.225,.63],[.22,.68],[.21,.72],[.20,.76],[.19,.79],[.18,.80],[.17,.79],[.16,.76],[.155,.72],[.15,.67],[.148,.62],[.148,.57],[.15,.52],[.152,.47]],
  "europe":[[.42,.13],[.435,.10],[.455,.08],[.48,.08],[.505,.09],[.52,.12],[.525,.15],[.52,.18],[.51,.21],[.50,.23],[.49,.24],[.475,.24],[.46,.23],[.45,.21],[.44,.18],[.43,.15]],
  "scandinavia":[[.455,.07],[.47,.05],[.49,.05],[.505,.065],[.51,.09],[.505,.12],[.49,.13],[.47,.12],[.46,.09]],
  "uk-shape":[[.42,.135],[.435,.10],[.445,.115],[.44,.155],[.43,.165]],
  "iberia":[[.43,.21],[.447,.19],[.458,.21],[.452,.25],[.44,.26],[.43,.24]],
  "italy":[[.478,.22],[.488,.21],[.493,.24],[.488,.28],[.48,.29],[.474,.26]],
  "africa":[[.44,.27],[.46,.25],[.49,.25],[.52,.26],[.535,.29],[.545,.33],[.54,.38],[.53,.43],[.515,.48],[.50,.52],[.485,.55],[.47,.57],[.455,.56],[.445,.52],[.435,.47],[.428,.42],[.425,.37],[.428,.32],[.432,.29]],
  "madagascar":[[.535,.47],[.545,.45],[.55,.48],[.545,.52],[.535,.53],[.53,.50]],
  "middle-east":[[.52,.23],[.545,.21],[.57,.22],[.585,.24],[.59,.27],[.585,.31],[.575,.33],[.56,.34],[.545,.33],[.53,.31],[.52,.27]],
  "arabia":[[.545,.33],[.565,.31],[.585,.33],[.595,.37],[.59,.42],[.575,.45],[.56,.46],[.548,.44],[.542,.39]],
  "russia":[[.51,.10],[.545,.08],[.60,.065],[.66,.065],[.72,.07],[.78,.08],[.825,.10],[.845,.12],[.845,.16],[.83,.19],[.81,.21],[.785,.22],[.755,.23],[.725,.23],[.695,.23],[.665,.22],[.635,.21],[.605,.20],[.575,.20],[.55,.21],[.525,.19],[.515,.16],[.51,.13]],
  "india":[[.60,.25],[.625,.24],[.642,.26],[.648,.29],[.642,.33],[.63,.36],[.615,.37],[.604,.35],[.598,.31],[.597,.27]],
  "se-asia":[[.69,.25],[.715,.24],[.73,.255],[.735,.29],[.725,.32],[.71,.33],[.695,.32],[.686,.29]],
  "china":[[.70,.17],[.73,.16],[.77,.165],[.805,.175],[.825,.19],[.825,.22],[.81,.245],[.785,.255],[.755,.255],[.725,.25],[.705,.245],[.695,.23],[.695,.20]],
  "japan":[[.835,.175],[.848,.155],[.858,.175],[.852,.205],[.84,.215],[.832,.195]],
  "korea":[[.808,.20],[.822,.19],[.828,.21],[.822,.235],[.81,.235],[.806,.22]],
  "indonesia":[[.715,.40],[.745,.385],[.775,.385],[.80,.39],[.80,.42],[.775,.425],[.745,.425],[.715,.415]],
  "indonesia2":[[.81,.39],[.84,.385],[.86,.39],[.86,.415],[.84,.42],[.81,.415]],
  "australia-shape":[[.745,.565],[.775,.545],[.815,.545],[.848,.56],[.865,.595],[.87,.645],[.858,.695],[.838,.735],[.808,.755],[.778,.755],[.748,.73],[.732,.69],[.728,.64]],
  "new-zealand":[[.878,.685],[.892,.665],[.902,.685],[.896,.725],[.882,.735],[.876,.71]],
};

const REGION_SHAPES: Record<string, string[]> = {
  "north-america":["north-america","greenland","alaska"],
  "latin-america":["latin-america"],
  "europe":["europe","scandinavia","uk-shape","iberia","italy"],
  "middle-east":["middle-east","arabia"],
  "africa":["africa","madagascar"],
  "asia":["russia","india","se-asia","china","japan","korea","indonesia","indonesia2","australia-shape","new-zealand"],
};

function DistMapSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mapRegion, setMapRegion] = useState("all");
  const [selectedPartner, setSelectedPartner] = useState<MapPartner | null>(null);
  const hoveredRef = useRef<MapPartner | null>(null);
  const tickRef = useRef(0);
  const animRef = useRef(0);
  const sizeRef = useRef({ W: 0, H: 0 });

  const filteredPartners = mapRegion === "all"
    ? MAP_PARTNERS
    : MAP_PARTNERS.filter(p => p.region === mapRegion);

  const showDetail = useCallback((p: MapPartner) => {
    hoveredRef.current = p;
    setSelectedPartner(p);
  }, []);

  const showList = useCallback(() => {
    hoveredRef.current = null;
    setSelectedPartner(null);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function isDark() {
      return document.documentElement.getAttribute("data-theme") === "dark";
    }

    /* theme-aware color palettes */
    function colors() {
      const dark = isDark();
      return {
        bg:           dark ? "#0a0a0f"  : "#f5f5f7",
        gridDot:      dark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.055)",
        shapeActive:  dark ? "#1c1c26"  : "#dddde0",
        shapeInactive:dark ? "#111118"  : "#e8e8eb",
        strokeActive: dark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.08)",
        strokeInactive:dark? "rgba(255,255,255,0.018)" : "rgba(0,0,0,0.03)",
        arc:    (a: number) => dark ? `rgba(255,255,255,${a})` : `rgba(0,0,0,${a})`,
        pulseStroke:  (a: number) => dark ? `rgba(255,255,255,${a})` : `rgba(0,0,0,${a})`,
        haloPrimLit:  dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
        haloSecLit:   dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
        haloDim:      dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
        dotPrimLit:   dark ? "#ffffff"                 : "#1d1d1f",
        dotSecLit:    dark ? "rgba(255,255,255,0.52)"  : "rgba(0,0,0,0.45)",
        dotDim:       dark ? "rgba(255,255,255,0.18)"  : "rgba(0,0,0,0.15)",
        labelPrim:    dark ? "rgba(255,255,255,0.80)"  : "rgba(0,0,0,0.70)",
        labelSec:     dark ? "rgba(255,255,255,0.42)"  : "rgba(0,0,0,0.35)",
      };
    }

    function resize() {
      const wrap = canvas!.parentElement!;
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = r.width;
      const H = r.height || 480;
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { W, H };
    }

    function px(nx: number) { return nx * sizeRef.current.W; }
    function py(ny: number) { return ny * sizeRef.current.H; }

    function drawShape(pts: number[][], fill: string, stroke: string, sw: number) {
      if (!pts || pts.length < 3) return;
      ctx!.beginPath();
      ctx!.moveTo(px(pts[0][0]), py(pts[0][1]));
      for (let i = 1; i < pts.length; i++) ctx!.lineTo(px(pts[i][0]), py(pts[i][1]));
      ctx!.closePath();
      if (fill) { ctx!.fillStyle = fill; ctx!.fill(); }
      if (stroke) { ctx!.strokeStyle = stroke; ctx!.lineWidth = sw || 0.6; ctx!.stroke(); }
    }

    function drawGrid(c: ReturnType<typeof colors>) {
      const { W, H } = sizeRef.current;
      const sp = Math.max(7, W / 95);
      const r = sp * 0.15;
      ctx!.fillStyle = c.gridDot;
      for (let x = 0; x < W; x += sp)
        for (let y = 0; y < H; y += sp) {
          ctx!.beginPath(); ctx!.arc(x, y, r, 0, Math.PI * 2); ctx!.fill();
        }
    }

    function arcBetween(p1: MapPartner, p2: MapPartner) {
      const x1 = px(p1.mx / 100), y1 = py(p1.my / 100);
      const x2 = px(p2.mx / 100), y2 = py(p2.my / 100);
      const d = Math.hypot(x2 - x1, y2 - y1);
      const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2 - d * 0.30;
      return { x1, y1, x2, y2, cx, cy };
    }

    function drawArc(a: { x1: number; y1: number; x2: number; y2: number; cx: number; cy: number }, alpha: number, c: ReturnType<typeof colors>) {
      ctx!.beginPath();
      ctx!.moveTo(a.x1, a.y1);
      ctx!.quadraticCurveTo(a.cx, a.cy, a.x2, a.y2);
      ctx!.strokeStyle = c.arc(alpha);
      ctx!.lineWidth = 0.7;
      ctx!.setLineDash([2, 7]);
      ctx!.stroke();
      ctx!.setLineDash([]);
    }

    function evalQuad(a: { x1: number; y1: number; x2: number; y2: number; cx: number; cy: number }, t: number) {
      const mt = 1 - t;
      return { x: mt * mt * a.x1 + 2 * mt * t * a.cx + t * t * a.x2, y: mt * mt * a.y1 + 2 * mt * t * a.cy + t * t * a.y2 };
    }

    function drawTraveller(a: { x1: number; y1: number; x2: number; y2: number; cx: number; cy: number }, t: number, alpha: number, c: ReturnType<typeof colors>) {
      const { x, y } = evalQuad(a, t % 1);
      ctx!.beginPath(); ctx!.arc(x, y, 2.2, 0, Math.PI * 2);
      ctx!.fillStyle = c.arc(alpha); ctx!.fill();
      const { x: tx, y: ty } = evalQuad(a, Math.max(0, (t % 1) - .04));
      ctx!.beginPath(); ctx!.arc(tx, ty, 1.2, 0, Math.PI * 2);
      ctx!.fillStyle = c.arc(alpha * 0.4); ctx!.fill();
    }

    function drawPin(p: MapPartner, lit: boolean, c: ReturnType<typeof colors>) {
      const x = px(p.mx / 100), y = py(p.my / 100);
      const hov = hoveredRef.current && hoveredRef.current.id === p.id;
      const tick = tickRef.current;
      if (p.primary && lit) {
        const pulse = (Math.sin(tick * 0.04 + p.mx * 0.3) * 0.5 + 0.5);
        ctx!.beginPath(); ctx!.arc(x, y, 9 + pulse * 13, 0, Math.PI * 2);
        ctx!.strokeStyle = c.pulseStroke(0.14 * (1 - pulse * 0.8));
        ctx!.lineWidth = 1; ctx!.stroke();
      }
      const hr = hov ? 11 : (p.primary ? 8 : 6);
      ctx!.beginPath(); ctx!.arc(x, y, hr, 0, Math.PI * 2);
      ctx!.fillStyle = lit ? (p.primary ? c.haloPrimLit : c.haloSecLit) : c.haloDim;
      ctx!.fill();
      const dr = hov ? 5.5 : (p.primary ? 4.5 : 3.5);
      ctx!.beginPath(); ctx!.arc(x, y, dr, 0, Math.PI * 2);
      ctx!.fillStyle = lit ? (p.primary ? c.dotPrimLit : c.dotSecLit) : c.dotDim;
      ctx!.fill();
      if (lit) {
        const { W } = sizeRef.current;
        const showLabel = W > 600 ? true : (hov ? true : false);
        if (showLabel) {
          const fs = Math.max(8, W * 0.008);
          ctx!.font = `600 ${fs}px 'Inter',sans-serif`;
          ctx!.fillStyle = hov ? c.labelPrim : (p.primary ? c.labelPrim : c.labelSec);
          ctx!.textAlign = "center";
          ctx!.fillText(p.country.split(" ")[0].toUpperCase(), x, y - hr - 4);
        }
      }
    }

    function render() {
      const { W, H } = sizeRef.current;
      const c = colors();
      ctx!.clearRect(0, 0, W, H);
      ctx!.fillStyle = c.bg;
      ctx!.fillRect(0, 0, W, H);
      drawGrid(c);

      const activeShapes = mapRegion === "all" ? null : new Set(REGION_SHAPES[mapRegion] || []);
      Object.entries(SHAPES).forEach(([name, pts]) => {
        const isActive = !activeShapes || activeShapes.has(name);
        drawShape(pts, isActive ? c.shapeActive : c.shapeInactive, isActive ? c.strokeActive : c.strokeInactive, 0.7);
      });

      const prims = MAP_PARTNERS.filter(p => p.primary);
      prims.forEach((p1, i) => {
        prims.slice(i + 1).forEach((p2, j) => {
          const bothLit = mapRegion === "all" || p1.region === mapRegion || p2.region === mapRegion;
          if (!bothLit) return;
          const a = arcBetween(p1, p2);
          drawArc(a, 0.07, c);
          const offset = (i * 0.33 + j * 0.17);
          drawTraveller(a, tickRef.current * 0.004 + offset, 0.75, c);
          drawTraveller(a, tickRef.current * 0.004 + offset + 0.5, 0.38, c);
        });
      });

      MAP_PARTNERS.forEach(p => {
        const lit = mapRegion === "all" || p.region === mapRegion;
        drawPin(p, lit, c);
      });

      tickRef.current++;
      animRef.current = requestAnimationFrame(render);
    }

    resize();
    render();

    const onResize = () => { cancelAnimationFrame(animRef.current); resize(); render(); };
    window.addEventListener("resize", onResize);

    /* canvas interaction */
    function pinAt(ex: number, ey: number) {
      const r = canvas!.getBoundingClientRect();
      const mx = ex - r.left, my = ey - r.top;
      return MAP_PARTNERS.find(p => {
        const px2 = px(p.mx / 100), py2 = py(p.my / 100);
        return Math.hypot(mx - px2, my - py2) < 16;
      }) || null;
    }

    const onMouseMove = (e: MouseEvent) => {
      const p = pinAt(e.clientX, e.clientY);
      canvas!.style.cursor = p ? "pointer" : "default";
    };
    const onClick = (e: MouseEvent) => {
      const p = pinAt(e.clientX, e.clientY);
      if (p) { hoveredRef.current = p; setSelectedPartner(p); }
    };
    const onTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      const t = e.changedTouches[0];
      const p = pinAt(t.clientX, t.clientY);
      if (p) { hoveredRef.current = p; setSelectedPartner(p); }
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("click", onClick);
    canvas.addEventListener("touchend", onTouchEnd, { passive: false });

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [mapRegion]);

  return (
    <section className="dist-map-section" id="dist-map-section">
      <div className="dist-map-inner">
        {/* LEFT: Map */}
        <div className="dist-map-canvas-col">
          <p className="dist-map-eyebrow">Global Reach &mdash; Verified Partners</p>
          <div className="dist-map-canvas-wrap">
            <canvas ref={canvasRef} />
          </div>
          <div className="dist-map-tabs">
            {[
              { id: "all", label: "All Regions" },
              { id: "north-america", label: "North America" },
              { id: "latin-america", label: "Latin America" },
              { id: "europe", label: "Europe" },
              { id: "middle-east", label: "Middle East" },
              { id: "asia", label: "Asia Pacific" },
            ].map(r => (
              <button
                key={r.id}
                className={`dist-map-tab${mapRegion === r.id ? " active" : ""}`}
                onClick={() => { setMapRegion(r.id); showList(); }}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Panel */}
        <div className="dist-map-panel">
          <h2 className="dist-panel-title">Official Verified<br />Anera Partners</h2>
          <p className="dist-panel-sub">Hover a pin on the map or select a region to explore our global distribution network.</p>
          <div className="dist-panel-divider" />

          {!selectedPartner ? (
            <div className="dist-panel-list">
              {filteredPartners.map(p => (
                <div key={p.id} className="dist-panel-row" onClick={() => showDetail(p)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="dist-panel-row__flag" src={p.flag} alt={p.country} />
                  <div className="dist-panel-row__info">
                    <div className="dist-panel-row__name">{p.name}</div>
                    <div className="dist-panel-row__country">{p.country}</div>
                  </div>
                  {p.primary && <span className="dist-panel-row__badge">Primary</span>}
                </div>
              ))}
            </div>
          ) : (
            <div className="dist-detail-card visible">
              <button className="dist-detail-back" onClick={showList}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M7.5 2L4 6l3.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                All Partners
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="dist-detail-flag" src={selectedPartner.flag} alt={selectedPartner.country} />
              <div className="dist-detail-country">{selectedPartner.country}</div>
              <div className="dist-detail-name">{selectedPartner.name}</div>
              <p className="dist-detail-desc">{selectedPartner.desc}</p>
              <div className="dist-detail-verified">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <circle cx="5" cy="5" r="5" fill="#34c759" opacity=".18" />
                  <path d="M3 5l1.5 1.5L7 3.5" stroke="#34c759" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Official Partner
              </div>
              <div className="dist-detail-contacts">
                {selectedPartner.contact.map(c =>
                  c.includes("@")
                    ? <a key={c} href={`mailto:${c}`}>{c}</a>
                    : <a key={c} href={`https://${c}`} target="_blank" rel="noopener noreferrer">{c}</a>
                )}
              </div>
              <div className="dist-detail-qr">
                <span>Scan product QR code to verify authenticity at aneralife.com</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats strip */}
      <div className="dist-map-stats">
        <div className="dist-stat">
          <div className="dist-stat__num">11<sup>+</sup></div>
          <div className="dist-stat__label">Countries</div>
        </div>
        <div className="dist-stat">
          <div className="dist-stat__num">5</div>
          <div className="dist-stat__label">Regions</div>
        </div>
        <div className="dist-stat">
          <div className="dist-stat__num">3</div>
          <div className="dist-stat__label">Primary Markets</div>
        </div>
        <div className="dist-stat">
          <div className="dist-stat__num">100<sup>%</sup></div>
          <div className="dist-stat__label">QR Authenticated</div>
        </div>
      </div>
    </section>
  );
}

/* ── Component ───────────────────────────────────────────────── */
export default function DistributionPage() {
  const [activeRegion, setActiveRegion] = useState("north-america");
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
      <section id="regions" className="dist-regions">
        <div className="dist-regions__inner">
          <p className="dist-regions__eyebrow dist-reveal">Find an Authorized Partner Near You</p>
          <h2 className="dist-regions__title dist-reveal">Official Verified<br />Anera Partners</h2>

          <nav className="dist-region-tabs__nav">
            {regions.map((r) => (
              <button
                key={r.id}
                className={`dist-region-tab-btn${activeRegion === r.id ? " active" : ""}`}
                onClick={() => setActiveRegion(r.id)}
              >
                {r.emoji} {r.label}
              </button>
            ))}
          </nav>

          {regions.map((r) => (
            <div key={r.id} id={`panel-${r.id}`} className={`dist-region-panel${activeRegion === r.id ? " active" : ""}`}>
              
              <div className="dist-partner-grid">
                {r.partners.map((p, i) => (
                  <div key={i} className={`dist-partner-card dist-reveal${i > 0 ? ` dist-reveal-delay-${i}` : ""}`}>
                    {p.verified && <div className="dist-partner-card__verified">{"\u2713"} Verified</div>}
                    <div className="dist-partner-card__flag">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.flag} alt={p.country} />
                    </div>
                    <div className="dist-partner-card__body">
                      <div className="dist-partner-card__country">{p.country}</div>
                      <div className="dist-partner-card__name">{p.name}</div>
                      <p className="dist-partner-card__desc">{p.desc}</p>
                      <div className="dist-partner-card__contact">
                        {p.emails.map((email) => (
                          <a key={email} href={`mailto:${email}`}>{email}</a>
                        ))}
                        {p.website && <a href="#">{p.website}</a>}
                      </div>
                      {p.verified && (
                        <div className="dist-partner-card__qr">
                          <span>{"\ud83d\udcf1"}</span> Scan QR to verify
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

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
