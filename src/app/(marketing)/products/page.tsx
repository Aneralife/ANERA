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

const TAG_CLASS: Record<string, string> = {
  gold: "tag-gold",
  blue: "tag-blue",
  green: "tag-gold",
  purple: "tag-blue",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => setProducts(d.products || []))
      .catch(() => {})
      .finally(() => setLoading(false));
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
      {/* Hero */}
      <section className="products-hero">
        <div className="products-hero__inner">
          <p className="label reveal">Our Formulas</p>
          <h1 className="products-hero__title reveal">
            Welcome to the New You.
          </h1>
          <p className="products-hero__subtitle reveal">
            Pharmaceutical-grade supplements backed by science. Explore our full range of longevity formulas.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="products-section">
        <div className="products-section__inner">
          <div className="products-grid">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="product-card product-card--skeleton">
                    <div className="product-card__visual" />
                    <div className="product-card__body">
                      <div className="skeleton-line skeleton-line--short" />
                      <div className="skeleton-line" />
                      <div className="skeleton-line skeleton-line--medium" />
                    </div>
                  </div>
                ))
              : products.map((product, i) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.handle}`}
                    className="product-card reveal"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="product-card__visual">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.imageAlt}
                          className="product-card__img"
                          loading={i < 6 ? "eager" : "lazy"}
                        />
                      ) : (
                        <div className="product-card__placeholder">
                          <span className="product-card__placeholder-brand">Anera</span>
                          <span className="product-card__placeholder-name">
                            {product.title}
                          </span>
                        </div>
                      )}
                      {product.tag && (
                        <span
                          className={`product-card__tag ${TAG_CLASS[product.tagColor] || "tag-gold"}`}
                        >
                          {product.tag}
                        </span>
                      )}
                    </div>
                    <div className="product-card__body">
                      <h3 className="product-card__name">{product.title}</h3>
                      <p className="product-card__desc">{product.description}</p>
                      <div className="product-card__footer">
                        <span className="product-card__price">
                          ${product.price} <small>{product.currency}</small>
                        </span>
                        <span className="product-card__cta">Shop Now &rarr;</span>
                      </div>
                    </div>
                  </Link>
                ))}
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
