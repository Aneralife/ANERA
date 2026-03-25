import { NextResponse } from "next/server";
import { getProducts } from "@/lib/shopify";

const TAG_COLORS = ["gold", "blue", "green", "purple"] as const;

function extractCapsules(description: string): string {
  const match = description.match(/(\d+)\s*capsules/i);
  return match ? match[1] : "60";
}

export async function GET() {
  const shopifyProducts = await getProducts({ first: 50 });

  const products = shopifyProducts.map((p, i) => ({
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: p.description,
    price: parseFloat(p.priceRange.minVariantPrice.amount).toFixed(0),
    currency: p.priceRange.minVariantPrice.currencyCode,
    tag: p.tags[0] || "",
    tagColor: TAG_COLORS[i % TAG_COLORS.length],
    dosage: p.variants[0]?.title || "",
    capsules: extractCapsules(p.description),
    image: p.featuredImage?.url || null,
    imageAlt: p.featuredImage?.altText || p.title,
  }));

  return NextResponse.json({ products });
}

export const dynamic = "force-dynamic";
