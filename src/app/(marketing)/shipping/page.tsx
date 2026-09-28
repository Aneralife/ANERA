import type { Metadata } from "next";
import Link from "next/link";
import { FREE_SHIPPING_SUMMARY, FREE_SHIPPING_THRESHOLD_CAD } from "@/lib/shipping";

export const metadata: Metadata = {
  title: { absolute: "Shipping Policy | Anera Life" },
  description: `Free shipping to Canada and the USA on Anera Life orders of CA$${FREE_SHIPPING_THRESHOLD_CAD} or more. Orders under that amount show a shipping rate at checkout.`,
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  return (
    <div className="legal-page">
      <div className="legal-page__inner">
        <h1>Shipping Policy</h1>
        <p className="legal-page__lead">
          Anera Life ships to Canada and the United States. {FREE_SHIPPING_SUMMARY}
        </p>

        <section>
          <h2>Free shipping</h2>
          <p>
            {FREE_SHIPPING_SUMMARY} The threshold is the order total in Canadian
            dollars (CAD). It applies to one-time purchases and to Subscribe and
            Save when that order reaches CA${FREE_SHIPPING_THRESHOLD_CAD}.
          </p>
          <p>
            NMN 15000 is CA$105 a bottle. NMN + TR 24000 is CA$120 a bottle.
            One bottle is under CA${FREE_SHIPPING_THRESHOLD_CAD}, so shipping is
            calculated at checkout. Free shipping applies when the order total
            reaches CA${FREE_SHIPPING_THRESHOLD_CAD} or more.
          </p>
        </section>

        <section>
          <h2>Orders under CA${FREE_SHIPPING_THRESHOLD_CAD}</h2>
          <p>
            If the order total is under CA${FREE_SHIPPING_THRESHOLD_CAD}, shipping
            is calculated at checkout. The rate shown before you pay is the rate
            you are charged. This page does not list a flat fee, because the
            checkout rate can vary by destination.
          </p>
          <p>
            Checkout shipping rates are set in Shopify. If a rate at checkout
            does not match this page, email{" "}
            <a href="mailto:info@aneralife.com">info@aneralife.com</a> before you
            complete the order.
          </p>
        </section>

        <section>
          <h2>Where we ship</h2>
          <p>
            We ship to addresses in Canada and the United States. Prices on this
            site are in Canadian dollars.
          </p>
          <p>
            Orders to the United States may be subject to duties or taxes charged
            by the carrier or by customs. Those charges, when they apply, are the
            customer&apos;s responsibility.
          </p>
          <p>
            For a destination outside Canada and the United States, email{" "}
            <a href="mailto:info@aneralife.com">info@aneralife.com</a> before you
            place an order.
          </p>
        </section>

        <section>
          <h2>Returns</h2>
          <p>
            Returns are accepted within 30 days of delivery for unopened products
            only. Opened supplements are not returnable. Read the{" "}
            <Link href="/returns">return policy</Link> before you buy.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about an order or a shipment:{" "}
            <a href="mailto:info@aneralife.com">info@aneralife.com</a>.
          </p>
          <address>
            Anera Life Inc.<br />
            2220, 8788 McKim Way<br />
            Richmond, BC V6X 4E2<br />
            Canada<br />
            <a href="mailto:info@aneralife.com">info@aneralife.com</a>
          </address>
        </section>
      </div>
    </div>
  );
}
