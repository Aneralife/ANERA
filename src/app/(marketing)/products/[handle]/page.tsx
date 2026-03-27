import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container, Section, ScrollReveal } from "@/components/ui";
import { ProductGrid } from "@/components/product/product-grid";
import { getProductByHandle, getProductRecommendations, type Product } from "@/lib/shopify";
import { formatPrice } from "@/lib/utils";
import { VariantSelector } from "@/components/product/variant-selector";
import { ProductActions } from "@/components/product/product-detail-client";
import { ProductDescription } from "@/components/product/product-description";

type Props = {
  params: { handle: string };
};

/* ── Metadata ────────────────────────────────────────────── */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductByHandle(params.handle);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
  };
}

/* ── Page ─────────────────────────────────────────────────── */

export default async function ProductPage({ params }: Props) {
  const product = await getProductByHandle(params.handle);
  if (!product) notFound();

  let recommendations: Product[] = [];
  try {
    recommendations = await getProductRecommendations(product.id);
  } catch {
    // non-critical
  }

  const defaultVariant =
    product.variants.find((v) => v.availableForSale) || product.variants[0];

  const price = formatPrice(product.priceRange.minVariantPrice);
  const hasImage = product.images.length > 0;

  return (
    <>
      <div className="pdp-page">
        {/* Header */}
        <div className="pdp-header">
          {product.vendor && (
            <p className="pdp-header__eyebrow">{product.vendor}</p>
          )}
          <h1 className="pdp-header__title">{product.title}</h1>
        </div>

        {/* Card */}
        <div className="pdp-card">
          {/* Visual */}
          <div className="pdp-visual">
            {hasImage ? (
              <div className="pdp-visual__img-wrap">
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].altText || product.title}
                  width={product.images[0].width || 500}
                  height={product.images[0].height || 500}
                  className="pdp-visual__img"
                  priority
                />
              </div>
            ) : (
              <div className="pdp-visual__placeholder">
                <span className="pdp-visual__placeholder-brand">Anera</span>
                <span className="pdp-visual__placeholder-name">{product.title}</span>
              </div>
            )}

            {product.images.length > 1 && (
              <div className="pdp-thumbs">
                {product.images.slice(0, 5).map((img, i) => (
                  <div key={img.url} className={`pdp-thumb${i === 0 ? " pdp-thumb--active" : ""}`}>
                    <Image
                      src={img.url}
                      alt={img.altText || `${product.title} ${i + 1}`}
                      width={64}
                      height={64}
                      className="pdp-thumb__img"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pdp-info">
            {product.vendor && (
              <p className="pdp-vendor">{product.vendor}</p>
            )}

            <h2 className="pdp-name">{product.title}</h2>

            <div className="pdp-price-row">
              <span className="pdp-price">{price}</span>
              {product.availableForSale && (
                <span className="pdp-in-stock">In Stock</span>
              )}
            </div>

            <hr className="pdp-divider" />

            {/* Description */}
            <ProductDescription html={product.descriptionHtml} />

            <hr className="pdp-divider" />

            {/* Variant Selector */}
            {product.variants.length > 1 && (
              <div className="pdp-variants">
                <VariantSelector
                  variants={product.variants}
                  defaultVariantId={defaultVariant?.id}
                />
              </div>
            )}

            {/* Actions */}
            <ProductActions
              availableForSale={product.availableForSale}
              defaultVariantId={defaultVariant?.id}
            />

            {/* Trust */}
            <div className="pdp-trust">
              <div className="pdp-trust__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <path d="M10 2.5L4 5v5c0 4.4 6 7.5 6 7.5s6-3.1 6-7.5V5z" strokeLinejoin="round" />
                </svg>
                <p>GMP Certified</p>
              </div>
              <div className="pdp-trust__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <circle cx="10" cy="10" r="7.5" />
                  <path d="M10 6.5v4l2.5 2.5" strokeLinecap="round" />
                </svg>
                <p>3rd Party Tested</p>
              </div>
              <div className="pdp-trust__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <rect x="2.5" y="8" width="15" height="10" rx="2" strokeLinejoin="round" />
                  <path d="M6.5 8V6a3.5 3.5 0 017 0v2" strokeLinecap="round" />
                </svg>
                <p>Secure Checkout</p>
              </div>
              <div className="pdp-trust__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <path d="M2 14l4-8 4 6 3-4 5 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p>Science Backed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Section theme="light" spacing="lg">
          <Container>
            <ScrollReveal>
              <h2 className="text-center text-display-sm text-[#1d1d1f]">
                You may also like
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="mt-12">
                <ProductGrid
                  products={recommendations.slice(0, 4)}
                  priorityCount={0}
                />
              </div>
            </ScrollReveal>
          </Container>
        </Section>
      )}
    </>
  );
}
