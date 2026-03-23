import Link from "next/link";
import { Container, Section, Button } from "@/components/ui";

export default function ProductNotFound() {
  return (
    <Section theme="light" spacing="xl">
      <Container size="sm" className="text-center">
        <h1 className="text-display text-[#1d1d1f]">Not Found</h1>
        <p className="mt-4 text-body-lg text-[#86868b]">
          The product you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <div className="mt-10">
          <Link href="/products">
            <Button size="lg">Browse Products</Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
