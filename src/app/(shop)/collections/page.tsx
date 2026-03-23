import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container, Section, ScrollReveal, Body } from "@/components/ui";
import { getCollections, type Collection } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse our curated collections.",
};

export default async function CollectionsPage() {
  let collections: Collection[] = [];
  let error = false;

  try {
    collections = await getCollections(20);
  } catch {
    error = true;
  }

  return (
    <Section theme="light" spacing="lg">
      <Container>
        <ScrollReveal>
          <div className="text-center">
            <h1 className="text-display text-[#1d1d1f]">Collections</h1>
            <p className="mt-4 text-body-lg text-[#86868b]">
              Curated edits for every occasion.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-16">
            {error ? (
              <div className="py-20 text-center">
                <Body>Unable to load collections. Please try again later.</Body>
              </div>
            ) : collections.length === 0 ? (
              <div className="py-20 text-center">
                <Body>No collections available.</Body>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                {collections.map((collection) => (
                  <Link
                    key={collection.id}
                    href={`/collections/${collection.handle}`}
                    className="group relative block aspect-[16/10] overflow-hidden rounded-3xl bg-[#f5f5f7]"
                  >
                    {collection.image && (
                      <Image
                        src={collection.image.url}
                        alt={collection.image.altText || collection.title}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-600 ease-apple group-hover:scale-[1.03]"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8">
                      <h2 className="text-headline text-white">
                        {collection.title}
                      </h2>
                      {collection.description && (
                        <p className="mt-1 text-caption text-white/70 line-clamp-2">
                          {collection.description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
