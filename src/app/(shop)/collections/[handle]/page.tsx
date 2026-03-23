import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Section, ScrollReveal } from "@/components/ui";
import { ProductGrid } from "@/components/product/product-grid";
import { getCollectionProducts } from "@/lib/shopify";

type Props = {
  params: { handle: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { collection } = await getCollectionProducts(params.handle, {
      first: 1,
    });
    return {
      title: collection.seo.title || collection.title,
      description: collection.seo.description || collection.description,
    };
  } catch {
    return { title: "Collection Not Found" };
  }
}

export default async function CollectionPage({ params }: Props) {
  let collection;
  let products = [];

  try {
    const result = await getCollectionProducts(params.handle, { first: 40 });
    collection = result.collection;
    products = result.products;
  } catch {
    notFound();
  }

  return (
    <Section theme="light" spacing="lg">
      <Container>
        <ScrollReveal>
          <div className="text-center">
            <h1 className="text-display text-[#1d1d1f]">{collection.title}</h1>
            {collection.description && (
              <p className="mt-4 text-body-lg text-[#86868b]">
                {collection.description}
              </p>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-16">
            <ProductGrid products={products} />
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
