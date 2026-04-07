export default function ProductLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="pdp-hero">
        <div style={{ width: 60, height: 18, background: "var(--bg-alt)", borderRadius: 4, margin: "0 auto 12px" }} />
        <div style={{ width: 400, maxWidth: "80%", height: 64, background: "var(--bg-alt)", borderRadius: 8, margin: "0 auto 16px" }} />
        <div style={{ width: 120, height: 24, background: "var(--bg-alt)", borderRadius: 4, margin: "0 auto 32px" }} />
        <div style={{ width: 200, height: 48, background: "var(--bg-alt)", borderRadius: 8, margin: "0 auto" }} />
      </section>

      {/* Image skeleton */}
      <section className="pdp-image-section">
        <div className="pdp-image-section__inner">
          <div style={{ width: "100%", maxWidth: 580, aspectRatio: "1", background: "var(--bg-alt)", borderRadius: 24, margin: "0 auto" }} />
        </div>
      </section>

      {/* Features skeleton */}
      <section className="pdp-features">
        <div className="pdp-features__inner">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="pdp-feature">
              <div style={{ width: 24, height: 24, background: "var(--bg-alt)", borderRadius: 4 }} />
              <div style={{ width: 80, height: 14, background: "var(--bg-alt)", borderRadius: 4 }} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
