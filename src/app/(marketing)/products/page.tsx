"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  tag: string;
  tagColor: "gold" | "blue" | "green" | "purple";
  dosage: string;
  capsules: string;
  image: string | null;
  imageAlt: string;
};

const VISUAL_STYLES: Record<number, { card: React.CSSProperties; bottle: React.CSSProperties }> = {
  0: { card: {}, bottle: {} },
  1: {
    card: {
      background: "linear-gradient(135deg,#060d1a 0%,#0d1a30 50%,#060d1a 100%)",
    },
    bottle: {
      background: "linear-gradient(160deg,#1e3a5f 0%,#0a1628 100%)",
    },
  },
};

const TAG_CLASS: Record<string, string> = {
  gold: "tag-gold",
  blue: "tag-blue",
  green: "tag-gold",
  purple: "tag-blue",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => setProducts(d.products || []))
      .catch(() => {});
  }, []);

  function toggleFaq(btn: HTMLButtonElement) {
    const item = btn.closest(".faq-item");
    if (!item) return;
    const isOpen = item.classList.contains("open");
    document
      .querySelectorAll(".faq-item.open")
      .forEach((el) => el.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  }

  return (
    <>
      {/* Products */}
      <section className="products-section" style={{ paddingTop: 180 }}>
        <div className="products-section__inner">
          <p className="label reveal">Our Formulas</p>
          <h2 className="h2 reveal" style={{ marginBottom: 60 }}>
            Welcome to the New You.
          </h2>
          <div className="products-grid">
            {products.map((product, i) => {
              const style = VISUAL_STYLES[i % 2] || VISUAL_STYLES[0];
              const revealClass = i % 2 === 0 ? "reveal-left" : "reveal-right";
              // Extract short name for the bottle label
              const parts = product.title.split(" ");
              const brandName = parts[0] || "NMN";
              const dose = parts[1] || "";

              return (
                <div key={product.id} className={`product-card ${revealClass}`}>
                  <div className="product-card__visual" style={style.card}>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    ) : (
                      <div className="bottle-3d" style={style.bottle}>
                        <div className="bottle-label">
                          <span className="bottle-label-brand">Anera</span>
                          <span className="bottle-label-name">{brandName}</span>
                          <span className="bottle-label-dose">{dose}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="product-card__body">
                    {product.tag && (
                      <span
                        className={`product-card__tag ${TAG_CLASS[product.tagColor] || "tag-gold"}`}
                      >
                        {product.tag}
                      </span>
                    )}
                    <h3 className="product-card__name">{product.title}</h3>
                    <p className="product-card__desc">{product.description}</p>
                    <div className="product-card__price">
                      ${product.price} {product.currency}{" "}
                      <small>/ {product.capsules} capsules</small>
                    </div>
                    <div className="product-card__actions">
                      <Link href={`/products/${product.handle}`} className="btn-dark">
                        Buy Now
                      </Link>
                      <Link href={`/products/${product.handle}`} className="btn-outline-dark">
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="compare-section">
        <div className="compare-section__inner">
          <p className="label reveal" style={{ textAlign: "center" }}>
            Why Anera
          </p>
          <h2
            className="h2 reveal"
            style={{ textAlign: "center", marginBottom: 60 }}
          >
            The Ultimate
            <br />
            Longevity Powerhouse.
          </h2>
          <table className="compare-table reveal">
            <thead>
              <tr>
                <th>Feature</th>
                <th>ANERA NMN</th>
                <th>Generic NMN</th>
                <th>CoQ10</th>
                <th>Creatine</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Pharmaceutical-grade purity", "✓", "✗", "✗", "✗"],
                ["Endotoxin <20 Eu/g", "✓", "✗", "✗", "✗"],
                [
                  "Clinically tested in human trials",
                  "✓",
                  "✗",
                  "Limited",
                  "Limited",
                ],
                ["Directly boosts NAD+ levels", "✓", "✓", "✗", "✗"],
                [
                  "No Lipopolysaccharide contamination",
                  "✓",
                  "✗",
                  "—",
                  "—",
                ],
              ].map((row, i) => (
                <tr key={i}>
                  <td>{row[0]}</td>
                  {row.slice(1).map((cell, j) => (
                    <td key={j}>
                      <span className={cell === "✓" ? "check" : "cross"}>
                        {cell}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Superfood */}
      <section className="superfood-section">
        <div className="superfood-section__inner">
          <div className="reveal-left">
            <p className="label">Why NMN?</p>
            <h2 className="h2" style={{ marginBottom: 24 }}>
              Nature&apos;s Most
              <br />
              Potent Molecule.
            </h2>
            <p className="body-lg" style={{ marginBottom: 40 }}>
              To get the equivalent of 250 mg of NMN from whole foods,
              you&apos;d need to eat an extraordinary amount. Supplementation is
              the only practical path.
            </p>
            <table className="sf-table">
              <thead>
                <tr>
                  <th>Superfood</th>
                  <th>Equivalent to 250 mg NMN</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Broccoli</td>
                  <td>22 – 100 kg</td>
                </tr>
                <tr>
                  <td>Tomato</td>
                  <td>84 – 96 kg</td>
                </tr>
                <tr>
                  <td>Avocado</td>
                  <td>16 – 70 kg</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="sf-visual reveal-right">
            <div className="sf-circle">
              <div className="sf-circle-num">250</div>
              <div className="sf-circle-unit">mg NMN</div>
            </div>
            <p className="sf-caption">
              One capsule. Once daily.
              <br />
              All the NAD+ support your cells need.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="faq-section__inner">
          <p className="label reveal">Common Questions</p>
          <h2 className="h2 reveal" style={{ marginBottom: 60 }}>
            Everything You
            <br />
            Need to Know.
          </h2>
          {[
            {
              q: "What products does ANERA NMN replace?",
              a: "Anera doesn't replace a specific product — it offers a superior alternative. Our focus is on providing premium supplements that prioritise purity, efficacy, and transparency, setting a new standard for quality in the industry.",
            },
            {
              q: "What benefits can I expect from taking ANERA?",
              a: "Users commonly report increased energy levels, improved mental clarity and focus, better sleep quality, enhanced physical endurance, and a general sense of vitality. Results typically become noticeable within 2–4 weeks of consistent use.",
            },
            {
              q: "What makes ANERA NMN different from other supplements?",
              a: "Anera is the only NMN supplement in the world clinically tested in human trials. Our endotoxin levels are consistently below 20 Eu/g — far below the industry average of 50–1000 Eu/g. We manufacture to pharmaceutical-grade standards with full transparency.",
            },
            {
              q: "What measures does ANERA take to ensure quality?",
              a: "Every batch undergoes rigorous third-party testing for purity, potency, and safety. We test for endotoxins, heavy metals, microbial contamination, and verify NMN concentration. Our manufacturing facilities meet pharmaceutical-grade GMP standards.",
            },
          ].map((item, i) => (
            <div key={i} className="faq-item">
              <button
                className="faq-q"
                onClick={(e) => toggleFaq(e.currentTarget)}
              >
                {item.q}
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-a">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
