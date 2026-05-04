import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Terms & Conditions – Anera Life" },
  description:
    "Read the Global Terms and Conditions governing your use of the Anera Life website and purchase of our longevity health supplements. By using our services you agree to these terms.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="legal-page">
      <div className="legal-page__inner">
        <h1>Anera Life Inc. Global Terms and Conditions</h1>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Anera Life Inc. (&ldquo;Anera,&rdquo; &ldquo;we,&rdquo;
            &ldquo;our,&rdquo; or &ldquo;us&rdquo;). These Global Terms and Conditions
            (&ldquo;Terms&rdquo;) govern your use of our website, products, and services
            (&ldquo;Services&rdquo;). Anera Life Inc. specializes in longevity health
            supplements. By accessing or using our Services, you agree to these Terms. Please
            read them carefully before using our site or purchasing our products.
          </p>
        </section>

        <section>
          <h2>2. Eligibility</h2>
          <p>
            You must be at least 18 years old or the age of majority in your jurisdiction to use
            our Services. By using our Services, you represent and warrant that you meet this age
            requirement.
          </p>
        </section>

        <section>
          <h2>3. Global Application</h2>
          <p>
            These Terms apply globally, regardless of the country from which you access our
            Services. Local laws may apply, and you are responsible for complying with the laws
            of your jurisdiction.
          </p>
        </section>

        <section>
          <h2>4. Product Information and Availability</h2>
          <p>
            We strive to provide accurate and up-to-date information on our products, including
            descriptions, pricing, and availability. However, we do not guarantee that all
            information is complete, current, or error-free. All product images and descriptions
            are for illustrative purposes only and may differ slightly from the actual product.
            Product availability may vary by region.
          </p>
        </section>

        <section>
          <h2>5. Orders and Payment</h2>
          <p>
            All orders placed through our website are subject to acceptance. We reserve the
            right to refuse or cancel any order at any time. Prices are subject to change without
            notice. Payment must be made at the time of order using the available payment methods.
            We are not responsible for any errors in pricing or other information on our site.
          </p>
        </section>

        <section>
          <h2>6. Shipping and Delivery</h2>
          <p>
            We strive to process and ship orders promptly. Shipping times may vary depending on
            your location and the availability of products. Anera Life Inc. is not responsible
            for delays or damages caused by shipping carriers. International customers are
            responsible for any customs duties, taxes, or fees associated with their orders.
          </p>
        </section>

        <section>
          <h2>7. Return Policy</h2>
          <p>
            Due to the nature of our products, once a supplement product has been opened, it
            cannot be returned or refunded. Unopened products may be returned within 30 days of
            delivery for a refund, provided they are in their original packaging and condition.
            Return shipping costs are the responsibility of the customer. Please contact our
            customer service for return instructions.
          </p>
        </section>

        <section>
          <h2>8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Anera Life Inc. shall not be liable for any
            direct, indirect, incidental, special, or consequential damages arising from the use
            or inability to use our Services or products. This includes, but is not limited to,
            damages for loss of profits, data, or other intangible losses.
          </p>
        </section>

        <section>
          <h2>9. Warranties and Disclaimers</h2>
          <p>
            Our products and Services are provided &ldquo;as is&rdquo; without warranties of
            any kind, either express or implied, including but not limited to implied warranties
            of merchantability, fitness for a particular purpose, or non-infringement. We do not
            warrant that our Services will be uninterrupted, error-free, or free from harmful
            components.
          </p>
        </section>

        <section>
          <h2>10. Intellectual Property</h2>
          <p>
            All content on our website, including text, graphics, logos, images, and software,
            is the property of Anera Life Inc. or its content suppliers and is protected by
            international intellectual property laws. You may not use, reproduce, or distribute
            any content without our express written permission.
          </p>
        </section>

        <section>
          <h2>11. Privacy and Data Protection</h2>
          <p>
            Your privacy is important to us. We collect, use, and protect your personal
            information in accordance with our{" "}
            <a href="/privacy-policy">Privacy Policy</a>. By using our Services, you consent to
            the collection and use of your information as described in our Privacy Policy.
          </p>
        </section>

        <section>
          <h2>12. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the
            Province of British Columbia, Canada, without regard to its conflict of law
            principles. Any disputes arising out of or related to these Terms or our Services
            shall be resolved in the courts of that jurisdiction.
          </p>
        </section>

        <section>
          <h2>13. International Compliance</h2>
          <p>
            You are responsible for complying with all applicable laws and regulations in your
            country of residence, including but not limited to export and import regulations.
            By using our Services, you agree not to engage in any activity that would violate
            such laws.
          </p>
        </section>

        <section>
          <h2>14. Changes to Terms</h2>
          <p>
            Anera Life Inc. reserves the right to update or modify these Terms at any time.
            Any changes will be effective immediately upon posting on our website. Your continued
            use of our Services following the posting of revised Terms constitutes your
            acceptance of those changes.
          </p>
        </section>

        <section>
          <h2>15. Contact Information</h2>
          <p>
            For any questions or concerns regarding these Terms, or for assistance with our
            products, please contact us at:
          </p>
          <address>
            Anera Life Inc.<br />
            2220 – 8788 McKim Way, Richmond, BC V6X 4E2, Canada<br />
            <a href="mailto:info@aneralife.com">info@aneralife.com</a>
          </address>
        </section>

        <section>
          <h2>16. Entire Agreement</h2>
          <p>
            These Terms constitute the entire agreement between you and Anera Life Inc.
            regarding your use of our Services and supersede any prior agreements or
            understandings, whether written or oral.
          </p>
          <p style={{ marginTop: 24 }}>
            By using our Services, you acknowledge that you have read, understood, and agree to
            be bound by these Global Terms and Conditions.
          </p>
        </section>
      </div>
    </div>
  );
}
