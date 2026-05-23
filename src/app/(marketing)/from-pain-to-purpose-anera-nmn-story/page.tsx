"use client";

import Link from "next/link";
import "./article.css";

const FAQS = [
  {
    q: "What is NMN and how did it help Anera's founder?",
    a: "NMN (Nicotinamide Mononucleotide) is a naturally occurring compound that supports NAD⁺ production in the body. For Truc Tran, Anera's founder, NMN dramatically reduced chronic foot pain and swelling after years of failed treatments — restoring his ability to walk, exercise, and be fully present for his family.",
  },
  {
    q: "How quickly did NMN work for Truc Tran?",
    a: "Within three days of starting NMN, Truc noticed a meaningful reduction in pain. By the end of the first week the improvement was undeniable, and after one month his pain was approximately 95% gone — with all swelling resolved.",
  },
  {
    q: "Why did Truc Tran found ANERA?",
    a: "After experiencing such a profound personal transformation with NMN, Truc felt a responsibility to share that benefit with others who might be suffering. He founded ANERA with the mission to Help Heal Humanity — sourcing the highest-quality NMN available and bringing it to the Canadian market.",
  },
  {
    q: "What makes ANERA NMN different from other supplements in Canada?",
    a: "ANERA NMN is pharmaceutical-grade (99%+ purity), manufactured in GMP-certified facilities in Canada, and independently third-party tested for purity, heavy metals, microbial safety, and endotoxins. Every decision — from ingredient sourcing to formulation — is rooted in the founder's lived experience, not marketing hype.",
  },
  {
    q: "Where can I buy ANERA NMN in Canada?",
    a: "ANERA NMN supplements are available directly through the Anera Life website. The product range includes NMN 15000 (pure, single-ingredient NAD⁺ support) and NMN + Trans-Resveratrol 24000 (an advanced dual-action longevity formula).",
  },
];

export default function FromPainToPurposePage() {
  return (
    <article className="art-page">
      <div className="art-page__inner">

        {/* ── Header ── */}
        <header className="art-header">
          <span className="art-tag">Anera Story · Founder</span>
          <h1>My Personal Journey with ANERA NMN: From Pain to Purpose</h1>
          <div className="art-meta">May 23, 2026 · 8 min read</div>
        </header>

        {/* ── Hero Image ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/articles/from-pain-to-purpose-anera-nmn-story/1.jpg"
          alt="From Pain to Purpose"
          title="From Pain to Purpose — Truc Tran, Founder of ANERA"
          className="art-img"
        />

        {/* ── Intro ── */}
        <p className="art-lead">
          In 2020, at the height of the pandemic, my life took an unexpected and painful turn. For
          over 20 years I had been an avid fitness enthusiast — always in the gym, eating well,
          staying active. But as I entered my 40s, I began experiencing severe pain in both feet,
          pain so excruciating it started to dictate my entire life.
        </p>

        {/* ── Section 1 ── */}
        <h2>My Struggle with Chronic Pain and Loss of Mobility</h2>

        <p>
          The pain came without warning and without explanation. I couldn&apos;t understand what had
          caused it, and no one seemed to have answers. What began as discomfort gradually
          escalated into something that controlled every aspect of my day — from the moment I
          woke up to the moment I tried to sleep.
        </p>

        <p>
          I found myself limping, barely able to walk most days. My feet would swell to twice
          their size. The activities I had taken for granted — going to the gym, running with
          my kids, even simply getting out of bed in the morning — became enormous challenges.
        </p>

        {/* ── Section 2 ── */}
        <h2>Years of Unanswered Questions and Failed Treatments</h2>

        <p>
          For years I sought help. I saw doctors and specialists, underwent bloodwork and
          X-rays — but nothing came back conclusive. I was referred to a rheumatologist who
          ordered an MRI. All they found were some trace fluids in my ankle joints, nothing
          that explained the constant pain I was living with.
        </p>

        <p>
          I visited a podiatrist and tried specialized shoes and custom insoles. Instead of
          relief, the pain only worsened. I tried acupuncture, rehabilitation, massages —
          anything that offered a sliver of hope. Nothing worked. I was on a cycle of
          painkillers just to make it through each day.
        </p>

        <div className="art-highlight">
          <h3>What I tried over those years</h3>
          <ul>
            <li>Multiple specialists — rheumatology, podiatry, general medicine</li>
            <li>MRI imaging and extensive bloodwork</li>
            <li>Specialized orthotics and footwear</li>
            <li>Acupuncture and physiotherapy</li>
            <li>Massage therapy and rehabilitation</li>
            <li>Ongoing painkiller cycles</li>
          </ul>
        </div>

        {/* ── Image 2 ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/articles/from-pain-to-purpose-anera-nmn-story/2.png"
          alt="From Pain to Purpose"
          className="art-img"
        />

        {/* ── Image 3 ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/articles/from-pain-to-purpose-anera-nmn-story/3.png"
          alt="From Pain to Purpose"
          className="art-img"
        />

        {/* ── Section 3 ── */}
        <h2>The Impact on My Family and Everyday Life</h2>

        <p>
          This pain robbed me of my routine, and more importantly, it took a toll on my life
          with my family. I&apos;m a dad, and the hardest part was not being able to do the things
          I loved with my kids — running around, playing sports, or even enjoying a family
          vacation without having to cut the day short because of the pain.
        </p>

        <p>
          Mornings were a struggle just to get out of bed, and my wife had to help me —
          something no husband or father ever wants to ask for. My life was consumed by this
          pain, and I was losing hope.
        </p>

        {/* ── Section 4 ── */}
        <h2>A Life-Changing Breakthrough</h2>

        {/* ── Image 4 ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/articles/from-pain-to-purpose-anera-nmn-story/4.png"
          alt="From Pain to Purpose"
          className="art-img"
        />

        <p>
          Then, in 2023, everything changed. A friend introduced me to{" "}
          <a href="/products" style={{ color: "#1a6fd4", textDecoration: "underline" }}>NMN (Nicotinamide Mononucleotide)</a>
          {" "}— a compound I had never heard of before. His family member had
          brought it over from Asia, and he suggested I try it. I was skeptical, of course,
          after so many failed attempts. But I was willing to give anything a shot at that point.
        </p>

        {/* ── Section 5 ── */}
        <h2>My First Experience with NMN</h2>

        <p>
          Within three days of taking NMN, something remarkable happened — the pain started
          to fade. I couldn&apos;t believe it. After years of suffering, it felt like a miracle.
          A week later, the improvement was undeniable.
        </p>

        <p>
          I told myself: <em>&quot;Let&apos;s see how I feel after a couple more weeks.&quot;</em> And sure
          enough, the results only got better. By the end of the first month, my pain was
          95% gone. The swelling in my feet had completely disappeared. I could walk again
          without limping, wear my favorite shoes again, and stop dreading every morning.
        </p>

        <div className="art-highlight">
          <h3>My month-one results</h3>
          <ul>
            <li>Day 3: Noticeable reduction in pain</li>
            <li>Week 1: Improvement undeniable, energy returning</li>
            <li>Week 2–3: Swelling began to resolve</li>
            <li>Month 1: Pain approximately 95% gone, full mobility restored</li>
          </ul>
        </div>

        {/* ── Section 6 ── */}
        <h2>How NMN Gave Me My Life Back</h2>

        <p>
          NMN didn&apos;t just take away my pain — it gave me my life back. I was able to return
          to the gym, start training again, and most importantly, I could be there for my
          family the way I wanted to be. I felt energized, focused, and alive in a way I
          hadn&apos;t experienced in years.
        </p>

        <p>
          The things that had been stripped from me — running around with my kids, being
          physically present, waking up without dreading the first steps out of bed — were
          all restored. That shift was profound beyond words.
        </p>

        {/* ── Section 7 ── */}
        <h2>Founding ANERA</h2>

        <p>
          This experience changed everything for me. I knew I couldn&apos;t keep this to myself —
          I had to share it with others who might be suffering the way I was. That&apos;s why I
          founded ANERA, a company built on the simple but profound mission:{" "}
          <strong>Help Heal Humanity.</strong>
        </p>

        <p>
          I made it my goal to find the best NMN available and bring it to market in Canada,
          so others could experience the same life-changing benefits that I did. Not a mass-
          market product chasing trends, but a pharmaceutical-grade supplement built on
          integrity, transparency, and real science.
        </p>

        {/* ── Section 8 ── */}
        <h2>Building ANERA to Share the Healing Power of NMN</h2>

        <p>
          At ANERA, we&apos;re not just selling a product. We&apos;re offering a path to reclaim
          your vitality, your energy, and your health. I believe that this longevity
          supplement is the key foundation for helping others regain the strength, focus,
          and youthful energy that so many of us lose as we age.
        </p>

        <p>
          As a hardworking dad devoted to family and community, I feel a deep
          responsibility to assist others in finding healing and well-being. My mission
          with ANERA is to make the best NMN supplements in Canada accessible to as many
          people as possible. Together, we can embark on a journey to help heal humanity,
          one life at a time.
        </p>

        <p>
          <em>Let&apos;s walk this path together.</em>
        </p>

        <p>
          <strong>— Truc Tran, CEO and Founder, ANERA Life</strong>
        </p>

        {/* ── Products ── */}
        <h2>Experience ANERA NMN for Yourself</h2>

        <p>
          Every formulation decision at ANERA is rooted in the same standard that changed my
          life — pharmaceutical-grade purity, GMP manufacturing in Canada, and full third-party
          testing transparency.
        </p>

        <div className="art-products">
          <Link href="/products/nad-booster-nmn-15000" className="art-product">
            <div className="art-product__name">NMN 15000</div>
            <div className="art-product__desc">
              Pure, single-ingredient NMN for daily NAD⁺ support, cellular energy,
              and long-term vitality.
            </div>
            <ul className="art-product__feats">
              <li>250 mg pure NMN per capsule</li>
              <li>No fillers or additives</li>
              <li>Vegan, Non-GMO, gluten-free</li>
              <li>GMP-certified, made in Canada</li>
            </ul>
            <p className="art-product__best-choice">
              The clean, foundational choice for NAD⁺ support — exactly where my journey started.
            </p>
            <span className="art-product__cta">Shop NMN 15000 →</span>
          </Link>

          <Link href="/products/nmn-trans-resveratrol-24000" className="art-product">
            <div className="art-product__badge">Best Seller</div>
            <div className="art-product__name">NMN + Trans-Resveratrol 24000</div>
            <div className="art-product__desc">
              An advanced dual-action formula combining NAD⁺ support with sirtuin
              activation for enhanced cellular protection.
            </div>
            <ul className="art-product__feats">
              <li>Synergistic longevity support</li>
              <li>Supports energy + oxidative stress defense</li>
              <li>No fillers, pharmaceutical-grade ingredients</li>
              <li>Designed for structured longevity routines</li>
            </ul>
            <p className="art-product__best-choice">
              Best choice for those seeking enhanced cellular protection and a more complete
              longevity approach.
            </p>
            <span className="art-product__cta">Shop NMN + TR 24000 →</span>
          </Link>
        </div>

        <div className="art-decision">
          <p><strong>Quick Decision Guide</strong></p>
          <p>
            Starting your NMN journey?{" "}
            → <Link href="/products/nad-booster-nmn-15000">Choose NMN 15000</Link>
          </p>
          <p>
            Ready for advanced longevity support?{" "}
            → <Link href="/products/nmn-trans-resveratrol-24000">Choose NMN + TR 24000</Link>
          </p>
        </div>

        {/* ── FAQ ── */}
        <h2>Frequently Asked Questions</h2>

        <div className="art-faq">
          {FAQS.map((item, i) => (
            <div key={i} className="art-faq-item">
              <div className="art-faq-q">{item.q}</div>
              <p className="art-faq-a">{item.a}</p>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="art-cta-section">
          <p>
            If my story resonates with you — if you&apos;re searching for a way back to the life
            you deserve — I invite you to try ANERA NMN. Every capsule carries the same
            commitment that changed my life: purity, transparency, and a genuine mission to
            help heal humanity.
          </p>
          <div className="art-cta-buttons">
            <Link href="/products" className="art-cta-btn">Shop All Products</Link>
            <Link href="/products/nmn-trans-resveratrol-24000" className="art-cta-btn art-cta-btn--secondary">
              Shop NMN + TR 24000
            </Link>
          </div>
          <Link href="/" className="art-cta-link">← Back to Anera Life</Link>
        </div>

      </div>
    </article>
  );
}
