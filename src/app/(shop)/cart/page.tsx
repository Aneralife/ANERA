import type { Metadata } from "next";
import { Container, Section } from "@/components/ui";
import { CartContents } from "@/components/cart/cart-contents";

export const metadata: Metadata = {
  title: "Bag",
};

export default function CartPage() {
  return (
    <Section theme="light" spacing="lg">
      <Container size="md">
        <h1 className="text-display-sm text-[#1d1d1f]">Your Bag</h1>
        <div className="mt-10">
          <CartContents />
        </div>
      </Container>
    </Section>
  );
}
