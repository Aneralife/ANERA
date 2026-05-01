import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy – Anera Life" },
  description:
    "Anera Life Inc. values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect the information you provide.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page">
      <div className="legal-page__inner">
        <h1>Anera Life Inc. Privacy Policy</h1>
        <p className="legal-page__lead">
          Anera Life Inc. (&ldquo;Anera,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or
          &ldquo;us&rdquo;) values your privacy and is committed to protecting your personal
          information. This Privacy Policy explains how we collect, use, and protect the
          information you provide when you visit our website, purchase our products, or use our
          services. By accessing our website or using our services, you agree to the practices
          described in this policy.
        </p>

        <section>
          <h2>1. Information We Collect</h2>
          <h3>a. Personal Information</h3>
          <p>We may collect personal information that you provide to us directly, including but not limited to:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Mailing address</li>
            <li>Phone number</li>
            <li>Payment information (credit card details, billing address)</li>
            <li>Account login credentials</li>
          </ul>
          <h3>b. Automatically Collected Information</h3>
          <p>When you interact with our website, we may automatically collect certain information, including:</p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring website or link</li>
            <li>Pages visited on our site</li>
            <li>Time and date of visit</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
          <h3>c. Information from Third Parties</h3>
          <p>
            We may also receive information about you from third-party services, such as payment
            processors or social media platforms, if you choose to link your account or interact
            with us through these channels.
          </p>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li><strong>Processing Transactions:</strong> To process your orders, manage payments, and provide customer support.</li>
            <li><strong>Communication:</strong> To send you order confirmations, shipping updates, promotional offers, newsletters, and other information related to your account or our products.</li>
            <li><strong>Improving Services:</strong> To understand how you interact with our website, improve user experience, and enhance our products and services.</li>
            <li><strong>Marketing:</strong> To send you targeted advertising and promotional content based on your preferences and browsing behavior.</li>
            <li><strong>Compliance:</strong> To comply with legal obligations, prevent fraud, and protect the security and integrity of our services.</li>
          </ul>
        </section>

        <section>
          <h2>3. Sharing Your Information</h2>
          <p>We may share your personal information with third parties under the following circumstances:</p>
          <ul>
            <li><strong>Service Providers:</strong> We may share your information with third-party service providers who assist us in operating our website, processing payments, delivering products, and performing other business-related functions.</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information if required by law, legal process, or government request, or to protect the rights, property, and safety of Anera, our customers, or others.</li>
            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or part of our business, your information may be transferred to the new owner as part of the transaction.</li>
            <li><strong>With Your Consent:</strong> We may share your information with third parties when you provide explicit consent for us to do so.</li>
          </ul>
        </section>

        <section>
          <h2>4. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience on our
            website. Cookies are small text files that are stored on your device when you visit
            our site. They help us recognize your browser, remember your preferences, and analyze
            site traffic.
          </p>
          <p>
            You can control the use of cookies through your browser settings. However, disabling
            cookies may affect the functionality of our website and limit your ability to use
            certain features.
          </p>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>
            We take the security of your personal information seriously and implement appropriate
            technical and organizational measures to protect it from unauthorized access,
            disclosure, alteration, or destruction. However, no method of transmission over the
            internet or electronic storage is completely secure, and we cannot guarantee absolute
            security.
          </p>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li><strong>Access:</strong> You may request access to the personal information we hold about you.</li>
            <li><strong>Correction:</strong> You may request that we correct any inaccuracies in your personal information.</li>
            <li><strong>Deletion:</strong> You may request that we delete your personal information, subject to legal and contractual obligations.</li>
            <li><strong>Objection:</strong> You may object to the processing of your personal information in certain circumstances.</li>
            <li><strong>Data Portability:</strong> You may request a copy of your personal information in a structured, commonly used, and machine-readable format.</li>
          </ul>
          <p>To exercise your rights, please contact us using the contact information provided below.</p>
        </section>

        <section>
          <h2>7. International Data Transfers</h2>
          <p>
            As a global company, Anera Life Inc. may transfer your personal information to
            countries outside of your country of residence. These countries may have data
            protection laws that differ from your own. By providing your information to us, you
            consent to the transfer, processing, and storage of your information in these
            countries.
          </p>
        </section>

        <section>
          <h2>8. Children&apos;s Privacy</h2>
          <p>
            Our services are not intended for children under the age of 18. We do not knowingly
            collect or solicit personal information from children under 18. If we become aware
            that we have inadvertently collected personal information from a child under 18, we
            will take steps to delete that information.
          </p>
        </section>

        <section>
          <h2>9. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our
            practices or legal requirements. Any changes will be posted on this page with an
            updated &ldquo;Effective Date.&rdquo; Your continued use of our website or services
            after such changes constitutes your acceptance of the revised policy.
          </p>
        </section>

        <section>
          <h2>10. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or our data
            practices, please contact us at:
          </p>
          <address>
            Anera Life Inc.<br />
            2220 – 8788 McKim Way, Richmond, BC V6X 4E2, Canada<br />
            <a href="mailto:info@aneralife.com">info@aneralife.com</a>
          </address>
          <p style={{ marginTop: 24 }}>
            By using our website and services, you acknowledge that you have read, understood,
            and agree to this Privacy Policy.
          </p>
        </section>
      </div>
    </div>
  );
}
