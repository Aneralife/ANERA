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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductByHandle(params.handle);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
  };
}

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
      {/* ── Hero: Title + Price ── */}
      <section className="pdp-hero">
        <p className="pdp-hero__eyebrow">New</p>
        <h1 className="pdp-hero__title">{product.title}</h1>
        <p className="pdp-hero__price">
          From {price}
        </p>
        <div className="pdp-hero__actions">
          <ProductActions
            availableForSale={product.availableForSale}
            defaultVariantId={defaultVariant?.id}
          />
        </div>
      </section>

      {/* ── Product Image ── */}
      <section className="pdp-image-section">
        <div className="pdp-image-section__inner">
          {hasImage ? (
            <Image
              src={product.images[0].url}
              alt={product.images[0].altText || product.title}
              width={product.images[0].width || 800}
              height={product.images[0].height || 800}
              className="pdp-hero-img"
              priority
            />
          ) : (
            <div className="pdp-hero-img-placeholder">
              <span>{product.title}</span>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {product.images.length > 1 && (
          <div className="pdp-gallery">
            {product.images.map((img, i) => (
              <div key={img.url} className={`pdp-gallery__item${i === 0 ? " pdp-gallery__item--active" : ""}`}>
                <Image
                  src={img.url}
                  alt={img.altText || `${product.title} ${i + 1}`}
                  width={80}
                  height={80}
                  className="pdp-gallery__img"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Key Features Strip ── */}
      <section className="pdp-features">
        <div className="pdp-features__inner">
          <div className="pdp-feature">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L4.5 6.5v6c0 5.25 7.5 9.5 7.5 9.5s7.5-4.25 7.5-9.5v-6z" strokeLinejoin="round" />
            </svg>
            <p className="pdp-feature__label">GMP Certified</p>
          </div>
          <div className="pdp-feature">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7.5v5l3 3" strokeLinecap="round" />
            </svg>
            <p className="pdp-feature__label">3rd Party Tested</p>
          </div>
          <div className="pdp-feature">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="9" />
            </svg>
            <p className="pdp-feature__label">Clinically Tested</p>
          </div>
          <div className="pdp-feature">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4M4 7l8 4M4 7v10l8 4m0-10v10" strokeLinejoin="round" />
            </svg>
            <p className="pdp-feature__label">Made in Canada</p>
          </div>
        </div>
      </section>

      {/* ── Product Details ── */}
      <section className="pdp-details">
        <div className="pdp-details__inner">
          <div className="pdp-details__left">
            <h2 className="pdp-details__heading">
              Get to know<br />{product.title}.
            </h2>
          </div>
          <div className="pdp-details__right">
            <ProductDescription html={product.descriptionHtml} />

            {/* Variant Selector */}
            {product.variants.length > 1 && (
              <div className="pdp-details__variants">
                <VariantSelector
                  variants={product.variants}
                  defaultVariantId={defaultVariant?.id}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Recommendations ── */}
      {recommendations.length > 0 && (
        <Section theme="light" spacing="lg">
          <Container>
            <ScrollReveal>
              <p className="pdp-reco__eyebrow">Which {product.productType || "supplement"} is right for you?</p>
              <h2 className="pdp-reco__title">
                Explore the lineup.
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
