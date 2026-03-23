import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Section, ScrollReveal } from "@/components/ui";
import { ProductGrid } from "@/components/product/product-grid";
import { getProductByHandle, getProductRecommendations, type Product } from "@/lib/shopify";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { VariantSelector } from "@/components/product/variant-selector";
import { ProductImageGallery } from "@/components/product/product-image-gallery";

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
    // Recommendations are non-critical
  }

  const defaultVariant =
    product.variants.find((v) => v.availableForSale) || product.variants[0];

  return (
    <>
      {/* Product Hero */}
      <Section theme="surface" spacing="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Images */}
            <ScrollReveal variant="fade-scale">
              <ProductImageGallery
                images={product.images}
                title={product.title}
              />
            </ScrollReveal>

            {/* Product Info */}
            <ScrollReveal delay={200}>
              <div className="flex flex-col lg:sticky lg:top-20 lg:self-start">
                {product.vendor && (
                  <span className="text-caption text-[#86868b]">
                    {product.vendor}
                  </span>
                )}

                <h1 className="mt-2 text-display-sm text-[#1d1d1f]">
                  {product.title}
                </h1>

                <p className="mt-4 text-headline text-[#1d1d1f]">
                  {formatPrice(product.priceRange.minVariantPrice)}
                </p>

                {/* Variant Selector */}
                {product.variants.length > 1 && (
                  <div className="mt-8">
                    <VariantSelector
                      variants={product.variants}
                      defaultVariantId={defaultVariant?.id}
                    />
                  </div>
                )}

                {/* Add to Cart */}
                <div className="mt-10">
                  <AddToCartButton
                    availableForSale={product.availableForSale}
                    defaultVariantId={defaultVariant?.id}
                  />
                </div>

                {/* Description */}
                {product.description && (
                  <div className="mt-10 border-t border-[#d2d2d7]/50 pt-8">
                    <p className="text-body text-[#86868b] leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

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
