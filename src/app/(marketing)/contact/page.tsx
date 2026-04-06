"use client";

export default function ContactPage() {
  return (
    <div className="contact-page">
      <video
        className="contact-bg-video"
        src="/assets/contact.mov"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="contact-page__overlay" />
      <div className="contact-page__content">
        {/* Newsletter */}
        <section
          className="newsletter-section contact-newsletter"
          style={{ paddingTop: 180, borderTop: "none" }}
        >
        <div className="newsletter-section__inner reveal">
          <h2 className="newsletter-title">Stay at the Forefront.</h2>
          <p className="newsletter-sub">
            Get the latest on longevity science, Anera news, and exclusive
            offers — delivered to your inbox.
          </p>
          <form
            className="newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              className="newsletter-input"
              placeholder="Your email address"
            />
            <button type="submit" className="newsletter-submit">
              Sign Up
            </button>
          </form>
        </div>
      </section>

      {/* Contact Info */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "rgba(0,0,0,0.45)",
          padding: "80px 48px 140px",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 800,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 48,
            textAlign: "center",
          }}
        >
          <div className="reveal">
            <p
              className="label"
              style={{ marginBottom: 12 }}
            >
              Email
            </p>
            <a
              href="mailto:Info@aneralife.com"
              style={{
                fontSize: 16,
                color: "#fff",
                transition: "color .2s",
              }}
            >
              Info@aneralife.com
            </a>
          </div>
          <div className="reveal" style={{ transitionDelay: ".1s" }}>
            <p
              className="label"
              style={{ marginBottom: 12 }}
            >
              Address
            </p>
            <p style={{ fontSize: 16, color: "#fff", transition: "color .2s", lineHeight: 1.6 }}>
              2220 – 8788 McKim Way
              <br />
              Richmond, BC V6X 4E2
              <br />
              Canada
            </p>
          </div>
          <div className="reveal" style={{ transitionDelay: ".2s" }}>
            <p
              className="label"
              style={{ marginBottom: 12 }}
            >
              Social
            </p>
            <p style={{ fontSize: 16, color: "#fff", transition: "color .2s", lineHeight: 1.6 }}>
              Follow us on our
              <br />
              social channels
            </p>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
