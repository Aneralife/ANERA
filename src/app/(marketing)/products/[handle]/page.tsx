import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductByHandle } from "@/lib/shopify";
import { formatPrice } from "@/lib/utils";
import { ProductActions } from "@/components/product/product-detail-client";


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

  const defaultVariant =
    product.variants.find((v) => v.availableForSale) || product.variants[0];

  const price = formatPrice(product.priceRange.minVariantPrice);
  const hasImage = product.images.length > 0;

  /* Compute per-capsule price (assuming 60 capsules per bottle) */
  const priceNum = parseFloat(product.priceRange.minVariantPrice.amount);
  const perCapsule = (priceNum / 60).toFixed(2);

  return (
    <>
      {/* ── Breadcrumb ── */}
      <nav className="pdp-breadcrumb">
        <div className="pdp-breadcrumb__inner">
          <Link href="/">Home</Link>
          <span className="pdp-breadcrumb__sep">/</span>
          <Link href="/products">Products</Link>
          <span className="pdp-breadcrumb__sep">/</span>
          <span className="pdp-breadcrumb__current">{product.title}</span>
        </div>
      </nav>

      {/* ── Two-Column Hero ── */}
      <section className="pdp-hero" id="pdp-cta">
        <div className="pdp-hero__inner">
          {/* Left: Image Column */}
          <div className="pdp-image-col">
            <div className="pdp-image-col__main">
              <span className="pdp-image-col__badge">Made in Canada</span>
              {hasImage ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={product.images[0].url}
                  alt={product.images[0].altText || product.title}
                  className="pdp-image-col__img"
                />
              ) : (
                <div className="pdp-image-col__placeholder">
                  <span>{product.title}</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="pdp-thumbs">
                {product.images.map((img, i) => (
                  <div
                    key={img.url}
                    className={`pdp-thumbs__item${i === 0 ? " pdp-thumbs__item--active" : ""}`}
                  >
                    <Image
                      src={img.url}
                      alt={img.altText || `${product.title} ${i + 1}`}
                      width={80}
                      height={80}
                      className="pdp-thumbs__img"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info Column */}
          <div className="pdp-info-col">
            <p className="pdp-info-col__eyebrow">ANERA LIFE</p>
            <h1 className="pdp-info-col__title">{product.title}</h1>
            <p className="pdp-info-col__subtitle">
              {product.productType || "Advanced Cellular Support"}
            </p>


            {/* Price row */}
            <div className="pdp-price-row">
              <span className="pdp-price-row__amount">{price}</span>
              <span className="pdp-price-row__per">${perCapsule}/capsule</span>
            </div>

            {/* Cart actions */}
            <ProductActions
              availableForSale={product.availableForSale}
              defaultVariantId={defaultVariant?.id}
            />

            {/* Trust row */}
            <div className="pdp-trust-row">
              <div className="pdp-trust-row__item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L4.5 6.5v6c0 5.25 7.5 9.5 7.5 9.5s7.5-4.25 7.5-9.5v-6z" strokeLinejoin="round" />
                </svg>
                <span>GMP Certified</span>
              </div>
              <div className="pdp-trust-row__item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>3rd Party Tested</span>
              </div>
              <div className="pdp-trust-row__item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                </svg>
                <span>Clinical Grade</span>
              </div>
              <div className="pdp-trust-row__item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4M4 7l8 4M4 7v10l8 4m0-10v10" strokeLinejoin="round" />
                </svg>
                <span>Made in Canada</span>
              </div>
            </div>

            {/* Highlights */}
            <ul className="pdp-highlights">
              <li className="pdp-highlights__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 10 8 14 16 6" />
                </svg>
                Pharmaceutical-grade purity (&gt;99%)
              </li>
              <li className="pdp-highlights__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 10 8 14 16 6" />
                </svg>
                60 vegetarian capsules per bottle
              </li>
              <li className="pdp-highlights__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 10 8 14 16 6" />
                </svg>
                Free shipping across Canada
              </li>
              <li className="pdp-highlights__item">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 10 8 14 16 6" />
                </svg>
                30-day satisfaction guarantee
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Tabs ── */}
      {/* ── Product Details ── */}
      <section className="pdp-tabs">
        <div className="pdp-tabs__inner">
          <div className="pdp-tabs__panel">
            <div
              className="pdp-tabs__content pdp-desc__body"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
        </div>
      </section>

    </>
  );
}
