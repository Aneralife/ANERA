import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Return & Refund Policy – Anera Life" },
  description:
    "At Anera Life Inc., we are committed to the highest quality longevity health supplements. Read our global return policy to understand eligibility, the return process, and refunds.",
  alternates: { canonical: "/returns" },
};

export default function ReturnsPage() {
  return (
    <div className="legal-page">
      <div className="legal-page__inner">
        <h1>ANERA Global Return Policy</h1>
        <p className="legal-page__lead">
          At Anera Life Inc, we are committed to providing the highest quality longevity health
          supplements to our customers worldwide. Your satisfaction is our priority, and we want
          you to have a positive experience with our products. Below is our global return policy
          to ensure that any concerns you have are addressed efficiently and effectively.
        </p>

        <section>
          <h2>Eligibility for Returns</h2>
          <ul>
            <li>
              <strong>Unopened Products:</strong> We accept returns of unopened products within
              30 days of the delivery date. To be eligible, the product must be in its original
              packaging, unopened, and unused.
            </li>
            <li>
              <strong>Opened Products:</strong> Due to the nature of health supplements, we
              cannot accept returns of opened products. This policy is in place to ensure the
              safety and integrity of our products.
            </li>
            <li>
              <strong>Damaged or Defective Products:</strong> If you receive a product that is
              damaged or defective, please contact us within 7 days of receipt. We will arrange
              for a replacement or a full refund after the return of the defective item.
            </li>
          </ul>
        </section>

        <section>
          <h2>Return Process</h2>
          <ol>
            <li>
              <strong>Initiate a Return:</strong> To start a return, please contact our customer
              service team at{" "}
              <a href="mailto:info@aneralife.com">info@aneralife.com</a> with your order number,
              the product(s) you wish to return, and the reason for the return.
            </li>
            <li>
              <strong>Approval:</strong> Once your return request is approved, we will provide
              you with instructions on how to return the product(s). Please do not return any
              products without prior authorization.
            </li>
            <li>
              <strong>Return Shipping:</strong> Customers are responsible for the cost of return
              shipping unless the product is defective or the wrong item was sent. We recommend
              using a trackable shipping service and purchasing shipping insurance, as we cannot
              guarantee receipt of your returned item.
            </li>
            <li>
              <strong>Refunds:</strong> Once your return is received and inspected, we will
              notify you of the approval or rejection of your refund. If approved, the refund
              will be processed and a credit will automatically be applied to your original
              method of payment within 7–10 business days.
            </li>
          </ol>
        </section>

        <section>
          <h2>Non-Returnable Items</h2>
          <ul>
            <li>
              <strong>Opened Health Supplements:</strong> For safety and quality control
              reasons, we cannot accept returns of any opened health supplements.
            </li>
            <li>
              <strong>Promotional Items:</strong> Items marked as final sale or purchased during
              a clearance event are non-returnable.
            </li>
          </ul>
        </section>

        <section>
          <h2>International Returns</h2>
          <p>
            For international orders, the same return policy applies. However, please note that
            Anera Life Inc. is not responsible for any customs duties, taxes, or fees incurred
            during the return process. These fees are the responsibility of the customer.
          </p>
        </section>

        <section>
          <h2>Contact Information</h2>
          <p>
            If you have any questions about our return policy or need further assistance, please
            reach out to our customer service team at{" "}
            <a href="mailto:info@aneralife.com">info@aneralife.com</a>.
          </p>
          <p>
            We appreciate your trust in Anera and are dedicated to ensuring your satisfaction
            with every purchase. Thank you for choosing us as your partner in health and
            longevity.
          </p>
          <address>
            Anera Life Inc.<br />
            2220 – 8788 McKim Way<br />
            Richmond, BC V6X 4E2<br />
            Canada<br />
            <a href="mailto:Info@aneralife.com">Info@aneralife.com</a>
          </address>
        </section>
      </div>
    </div>
  );
}
