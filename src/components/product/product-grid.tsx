import { ProductCard } from "./product-card";
import type { Product } from "@/lib/shopify/types";

type ProductGridProps = {
  products: Product[];
  priorityCount?: number;
};

export function ProductGrid({
  products,
  priorityCount = 4,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-body text-[#86868b]">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 sm:gap-x-8 sm:gap-y-14">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
