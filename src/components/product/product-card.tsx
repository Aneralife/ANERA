import Link from "next/link";
import Image from "next/image";
import { Card, CardImage, CardContent } from "@/components/ui";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/shopify/types";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { minVariantPrice, maxVariantPrice } = product.priceRange;
  const hasRange = minVariantPrice.amount !== maxVariantPrice.amount;

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block"
      aria-label={`View ${product.title} - ${formatPrice(minVariantPrice)}`}
    >
      <Card>
        <CardImage>
          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-600 ease-apple group-hover:scale-[1.03]"
              priority={priority}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[#d2d2d7]">
              <svg
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25c0 .828.672 1.5 1.5 1.5z"
                />
              </svg>
            </div>
          )}
          {!product.availableForSale && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
              <span className="text-caption font-medium text-[#86868b]">
                Sold Out
              </span>
            </div>
          )}
        </CardImage>
        <CardContent>
          <h3 className="text-caption font-medium text-[#1d1d1f] line-clamp-1">
            {product.title}
          </h3>
          <p className="mt-0.5 text-caption text-[#86868b]">
            {hasRange
              ? `From ${formatPrice(minVariantPrice)}`
              : formatPrice(minVariantPrice)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
