"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import "./about.css";

const ADVISORS = [
  {
    name: "Manuel Riegner",
    role: "Integrative & Longevity Medicine",
    photo: "https://aneralife.com/wp-content/uploads/2026/03/manuel.jpeg",
    bio: "A leading practitioner in integrative and longevity medicine, Manuel Riegner brings a systems-based approach to patient care that bridges conventional diagnostics with advanced regenerative protocols focused on optimizing biological age and extending healthspan.",
  },
  {
    name: "Dr. Dean Raffelock",
    role: "Clinical Nutrition & Formulation",
    photo: "https://aneralife.com/wp-content/uploads/2026/03/dean.jpeg",
    bio: "A recognized authority in clinical nutrition and nutraceutical formulation, with decades of experience developing evidence-based supplementation protocols. His expertise in micronutrient science and metabolic optimization directly informs Anera's product formulation strategy.",
  },
  {
    name: "Dr. Keith Moeller",
    role: "Nano-Metallic Silver Technology",
    photo: "https://aneralife.com/wp-content/uploads/2026/03/Keith.jpeg",
    bio: "A globally recognized pioneer in nano-metallic silver technology, with an extensive publication and patent record in the field. His foundational research into the antimicrobial and regenerative properties of silver nanoparticles forms a cornerstone of Anera's proprietary therapeutic platform.",
  },
  {
    name: "Dr. Scott Chandler",
    role: "Biological Dentistry",
    photo: "https://aneralife.com/wp-content/uploads/2026/03/scott.jpeg",
    bio: "A leading voice in biological dentistry, championing the critical connection between oral health and systemic wellness. His clinical practice and research focus on biocompatible dental materials, detoxification protocols, and the role of oral microbiome health in overall longevity.",
  },
  {
    name: "Dr. Brad Labrecque",
    role: "Nanotechnology Innovation",
    photo: "https://aneralife.com/wp-content/uploads/2026/03/brad.jpeg",
    bio: "An innovator in applied nanotechnology with a focus on translating laboratory breakthroughs into clinically viable therapeutics. His work in nanoparticle delivery systems and bioavailability enhancement plays a key role in advancing Anera's next-generation product pipeline.",
  },
  {
    name: "Dr. Craig Young",
    role: "Oral-Systemic Health",
    photo: "https://aneralife.com/wp-content/uploads/2026/03/craig.jpeg",
    bio: "A specialist in the emerging field of oral-systemic health, exploring the bidirectional relationship between the oral cavity and the body's broader physiological systems. His research highlights how oral inflammation and microbial imbalance can drive systemic disease.",
  },
  {
    name: "Dr. Paul Sidhu",
    role: "Longevity Medicine",
    photo: "https://aneralife.com/wp-content/uploads/2026/03/Paul.jpeg",
    bio: "A clinician and researcher dedicated to the science of longevity medicine, with a particular focus on hormonal optimization, cellular senescence, and the integration of wearable health data into personalized longevity protocols.",
  },
  {
    name: "Dr. Kevin Mudrow",
    role: "Biomimetic Dentistry",
    photo: "https://aneralife.com/wp-content/uploads/2026/03/kevin.jpeg",
    bio: "A specialist in biomimetic dentistry — a discipline focused on restoring teeth to their natural form, function, and aesthetics using materials and techniques that mimic natural tooth structure. His work informs Anera's oral health innovation strategy.",
  },
  {
    name: "Dr. Gregory Eckel",
    role: "Integrative Medicine",
    photo: "https://aneralife.com/wp-content/uploads/2026/03/gregory.jpeg",
    bio: "A practitioner and thought leader in integrative medicine, combining the best of conventional and complementary approaches to support whole-person health. His clinical philosophy — that the body has an innate capacity for healing when given the right conditions — aligns closely with Anera's core mission.",
  },
  {
    name: "Dr. Gabriel Alizaidy",
    role: "Scientific Advisory Board",
    photo: "https://aneralife.com/wp-content/uploads/2026/03/Gabriel.jpeg",
    bio: "Anera continues to expand its Scientific Advisory Board with world-class experts advancing the frontiers of longevity science, regenerative medicine, and clinical innovation. An announcement is forthcoming.",
  },
];

const FOCUS_PILLARS = [
  {
    num: "01",
    title: "Epigenetics",
    body: "Understanding how environmental signals, lifestyle factors, and targeted interventions can modify gene expression — without altering the underlying DNA sequence — to slow biological aging and promote cellular resilience.",
  },
  {
    num: "02",
    title: "Mitochondrial Health",
    body: "Optimizing the function of the cell's energy-producing organelles to combat the mitochondrial dysfunction that underlies many age-related diseases, cognitive decline, and metabolic disorders — restoring cellular vitality at its source.",
  },
  {
    num: "03",
    title: "Microbiome Science",
    body: "Mapping and modulating the complex ecosystem of microorganisms that inhabit the human body — particularly the gut-brain axis — to reduce systemic inflammation, improve immune function, and support the biological conditions for longevity.",
  },
  {
    num: "04",
    title: "Nanometallic Therapies",
    body: "Leveraging the unique biological properties of nanometallic silver oxide compounds — backed by 90+ patents — to develop next-generation antimicrobial, anti-inflammatory, and regenerative therapeutics that operate at the cellular and subcellular level.",
  },
  {
    num: "05",
    title: "AI-Driven Longevity Analytics",
    body: "Deploying artificial intelligence and machine learning to analyze complex biological datasets — from genomics and proteomics to wearable sensor data — enabling personalized longevity protocols that adapt in real time to each individual's unique biological profile.",
  },
];

const founderStorySections = [
  {
    title: "My Personal Journey with ANERA NMN: From Pain to Purpose",
    headerExtra: (
      <>
        <p className="ab-leader-name">Truc Tran</p>
        <p className="ab-leader-role">CEO and Founder</p>
        <p style={{ fontSize: 13, color: "var(--fg-muted)", marginBottom: 24 }}>
          September 21, 2024
        </p>
      </>
    ),
    paragraphs: [
      "In 2020, fitness enthusiast Truc Tran's life was derailed by severe, unexplained foot pain that resisted all treatments and impacted his family life. After years of searching, a 2023 trial of NMN (Nicotinamide Mononucleotide) offered transformative relief, restoring his mobility and vitality. Inspired, he founded ANERA to share NMN's healing power with others. ANERA's mission is to empower individuals to reclaim health, strength, and focus, helping humanity heal, one life at a time.",
    ],
  },
  {
    title: "My Struggle with Chronic Pain and Loss of Mobility",
    paragraphs: [
      "In 2020, at the height of the pandemic, my life took an unexpected and painful turn. For over 20 years, I had been an avid fitness enthusiast — always in the gym, eating well, and staying active. But as I entered my 40s, I began experiencing severe pain in both my feet, pain so excruciating that it started to dictate my entire life. I couldn't understand what had caused it, and no one seemed to have answers.",
    ],
  },
  {
    title: "Years of Unanswered Questions and Failed Treatments",
    paragraphs: [
      "For years, I sought help. I saw doctors, specialists, did bloodwork and x-rays, but nothing came back conclusive. I was referred to a rheumatologist who ordered an MRI, but all they found were some trace fluids in my ankle joints — nothing that explained the constant pain I was living with. I even visited a podiatrist and tried specialized shoes and insoles, but instead of relief, the pain only worsened. My feet would swell to twice their size, and I found myself limping, barely able to walk most days.",
    ],
  },
  {
    title: "The Impact on My Family and Everyday Life",
    paragraphs: [
      "This pain robbed me of my routine, and more importantly, it took a toll on my life with my family. I'm a dad, and the hardest part was not being able to do the things I loved with my kids — running around, playing sports, or even enjoying a family vacation without having to cut the day short due to my pain. Mornings were a struggle just to get out of bed, and my wife had to help me, something no husband or father ever wants to ask for.",
    ],
  },
  {
    title: "Desperate for a Solution",
    paragraphs: [
      "I tried everything: acupuncture, rehabilitation, massages — anything that offered a sliver of hope. Nothing worked. I was on a cycle of painkillers just to make it through each day. My life was consumed by this pain, and I was losing hope.",
    ],
  },
  {
    title: "A Life-Changing Breakthrough",
    paragraphs: [
      "Then, in 2023, everything changed. A friend introduced me to NMN (Nicotinamide Mononucleotide), a compound I had never heard of before. His family member had brought it over from Asia, and he suggested I try it. I was skeptical, of course, after so many failed attempts, but I was willing to give anything a shot at that point.",
    ],
  },
  {
    title: "My First Experience with NMN",
    paragraphs: [
      "Within three days of taking NMN, something remarkable happened — the pain started to fade. I couldn't believe it. After years of suffering, it felt like a miracle. A week later, the improvement was undeniable. I told myself, 'Let's see how I feel after a couple more weeks.' And sure enough, the results only got better. By the end of the first month, my pain was 95% gone. The swelling in my feet had completely disappeared, and I could walk again without limping. I could wear my favorite shoes again, and I didn't dread getting out of bed each morning.",
    ],
  },
  {
    title: "How NMN Gave Me My Life Back",
    paragraphs: [
      "NMN didn't just take away my pain — it gave me my life back. I was able to return to the gym, start training again, and most importantly, I could be there for my family the way I wanted to be. I felt energized, focused, and alive in a way I hadn't in years.",
    ],
  },
  {
    title: "Founding ANERA",
    paragraphs: [
      "This experience changed everything for me. I knew I couldn't keep this to myself — I had to share it with others who might be suffering like I was. That's why I founded ANERA, a company built on the simple but profound mission to Help Heal Humanity. I made it my goal to find the best NMN available and bring it to market, so others could experience the same life-changing benefits that I did.",
    ],
  },
  {
    title: "Building ANERA to Share the Healing Power of NMN",
    paragraphs: [
      "At ANERA, we're not just selling a product. We're offering a path to reclaim your vitality, your energy, and your health. I believe that this longevity supplement is the key foundation for helping others regain a sense of strength, focus, and youthful energy that so many of us lose as we age.",
      "As a hardworking dad devoted to family and community, I feel a deep responsibility to assist others in finding healing and well-being. My mission with ANERA is to make the Best NMN Supplements in Canada accessible to as many people as possible. Together, we can embark on a journey to help heal humanity, one life at a time.",
      "Let's walk this path together.",
      "Truc Tran, CEO and Founder",
    ],
  },
];

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function AboutPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [openFounderIndex, setOpenFounderIndex] = useState(0);

  function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setAudioPlaying(true);
    } else {
      audio.pause();
      setAudioPlaying(false);
    }
  }

  return (
    <div className="about-page">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="ab-hero" id="hero">
        <div className="ab-hero__slider">
          <div className="ab-hero__slider-track">
            {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((n, i) => (
              <Image
                key={i}
                src={`/assets/ceo${n}.png`}
                alt=""
                className="ab-hero__slider-img"
                width={600}
                height={750}
              />
            ))}
          </div>
        </div>
        <div className="ab-hero__overlay" />
        <div className="ab-hero__inner">
          <div>
            <p className="ab-hero__eyebrow">Your Evolution Has Begun</p>
            <h1 className="ab-hero__headline">
              WHERE SCIENCE<br />MEETS <em>LONGEVITY</em>
            </h1>
            <p className="ab-hero__statement">
              What began as a search to restore my own health evolved into a mission to help others live longer, stronger, and better. We combine science, innovation, and clinically driven solutions to extend not just lifespan, but the quality of human life.
            </p>
            <audio ref={audioRef} src="/assets/about page.mp3" loop preload="none" />
            <button
              className={`inline-audio-btn inline-audio-btn--dark${audioPlaying ? " playing" : ""}`}
              onClick={toggleAudio}
              aria-label={audioPlaying ? "Pause music" : "Listen to music"}
            >
              {audioPlaying ? (
                <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg> Pause</>
              ) : (
                <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19" /><path d="M15.54 8.46a5 5 0 010 7.07" /></svg> Listen</>
              )}
            </button>
          </div>
          <div className="ab-hero__image">

          </div>
        </div>
      </section>

      {/* ── FOUNDER STORY ────────────────────────────────────── */}
      <section className="ab-founder" id="story">
        <div className="ab-container">
          <p className="ab-tag">OUR ORIGIN</p>
          <h2 className="ab-heading">WHY ANERA EXISTS</h2>
          <div className="ab-founder__grid">
            <div className="ab-founder__image-col">
              <Image
                src="/assets/truc.jpeg"
                alt="Anera Founder"
                className="ab-founder__portrait"
                width={320}
                height={400}
              />
              <div className="ab-founder__caption">
                <a
                  href="https://ca.linkedin.com/in/truc-tran-853062159"
                  className="ab-leader__linkedin"
                  style={{ marginTop: 16 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon /> LinkedIn Profile
                </a>
              </div>
            </div>
            <div className="ab-founder__content">
              <div className="st-accordion">
                {founderStorySections.map((section, index) => (
                  <div key={section.title} className="st-accordion-item">
                    <button
                      className={`st-accordion-btn${openFounderIndex === index ? " open" : ""}`}
                      onClick={() => setOpenFounderIndex((current) => current === index ? -1 : index)}
                      aria-expanded={openFounderIndex === index}
                    >
                      {section.title}
                    </button>
                    <div className={`st-accordion-body${openFounderIndex === index ? " open" : ""}`}>
                      {section.headerExtra}
                      {section.paragraphs.map((text, paragraphIndex) => (
                        <p key={paragraphIndex} style={{ marginBottom: 16 }}>
                          {text}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ─────────────────────────────────── */}
      <section className="ab-mv" id="mission">
        <video className="ab-mv__bg" autoPlay muted loop playsInline>
          <source src="/assets/mission.webm" type="video/webm" />
        </video>
        <div className="ab-mv__overlay" />
        <div className="ab-container">
          <p className="ab-tag">OUR PURPOSE</p>
          <h2 className="ab-heading">MISSION, VISION &amp; SCIENTIFIC APPROACH</h2>
          <div className="ab-mv__grid">
            <div className="ab-mv__card">
              <div className="ab-mv__num">01</div>
              <h3>Our Mission</h3>
              <p>
                To advance human health by delivering clinically validated, biologically intelligent
                solutions that address the root causes of aging and disease — empowering individuals
                to live longer, healthier, and more vibrant lives through the convergence of
                regenerative medicine and precision science.
              </p>
              <ul className="ab-mv__pillars">
                <li>Longevity science</li>
                <li>Regenerative medicine</li>
                <li>Biologically intelligent health systems</li>
                <li>Clinical innovation</li>
              </ul>
            </div>
            <div className="ab-mv__card">
              <div className="ab-mv__num">02</div>
              <h3>Our Vision</h3>
              <p>
                A world in which biological aging is no longer an inevitable decline, but a
                manageable, measurable process — one that every person has the tools to influence.
                Anera envisions a global standard of care where regenerative science is accessible,
                evidence-based, and integrated into every stage of life.
              </p>
            </div>
            <div className="ab-mv__card">
              <div className="ab-mv__num">03</div>
              <h3>Our Scientific Approach</h3>
              <p>
                Every Anera protocol is grounded in peer-reviewed research and guided by a
                multidisciplinary Scientific Advisory Board. Our approach integrates epigenetics,
                mitochondrial optimization, microbiome science, nanometallic therapeutics, and
                AI-driven longevity analytics into a unified clinical framework — built to deliver
                measurable biological outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ───────────────────────────────────────── */}
      <section className="ab-leadership" id="leadership">
        <div className="ab-container">
          <p className="ab-tag">LEADERSHIP</p>
          <h2 className="ab-heading">GUIDED BY PIONEERING SCIENCE</h2>
          <div className="ab-leader__card">
            <video className="ab-leader__bg" autoPlay muted loop playsInline>
              <source src="/assets/andrew.webm" type="video/webm" />
            </video>
            <div className="ab-leader__overlay" />
            <div className="ab-leader__left">
              <Image
                src="https://aneralife.com/wp-content/uploads/2026/03/212.jpeg"
                alt="Dr. Andrew Willoughby"
                className="ab-leader__photo"
                width={340}
                height={425}
              />
              <a
                href="https://www.linkedin.com/in/dr-andrew-willoughby-dmd-lvif-fagd-ficcmo-ficoi-faacfp-miccmo-65061148"
                className="ab-leader__linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon /> LinkedIn Profile
              </a>
            </div>
            <div className="ab-leader__right">
              <h3 className="ab-leader__name">Dr. Andrew Willoughby</h3>
              <p className="ab-leader__title">President &amp; Chief Science Officer</p>
              <div className="ab-badges">
                <span className="ab-badge">90+ Patents</span>
                <span className="ab-badge">PBS Medical Innovations</span>
                <span className="ab-badge">Nanometallic Research</span>
                <span className="ab-badge">Regenerative Therapeutics</span>
              </div>
              <p>
                Dr. Andrew Willoughby is one of the most decorated scientists working at the
                intersection of nanotechnology and regenerative medicine today. As President and
                Chief Science Officer of Anera, he brings over three decades of research experience
                and a portfolio of more than 90 patents that have reshaped how clinicians and
                researchers think about nanometallic silver oxide technology and its therapeutic
                applications.
              </p>
              <p>
                His pioneering work in nanometallic silver oxide research has established entirely
                new paradigms for antimicrobial and regenerative therapeutics — work that has been
                validated in clinical settings and recognized by leading scientific institutions
                worldwide. Dr. Willoughby&apos;s research has demonstrated that nanometallic compounds,
                when properly formulated and delivered, can interact with biological systems at the
                cellular level to promote healing, reduce inflammation, and support tissue
                regeneration.
              </p>
              <p>
                Beyond the laboratory, Dr. Willoughby has been featured in PBS Medical Innovations,
                bringing his research to broader audiences and advocating for the integration of
                advanced nanotechnology into mainstream clinical practice. His ability to translate
                complex science into accessible, actionable protocols has made him a trusted voice
                in both the scientific community and the public health space.
              </p>
              <p>
                At Anera, Dr. Willoughby leads the company&apos;s scientific strategy, overseeing all
                research and development initiatives, clinical trial design, and the ongoing
                expansion of Anera&apos;s proprietary technology platform. His vision is to build a
                science infrastructure that is not only innovative, but reproducible, transparent,
                and clinically meaningful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCIENTIFIC ADVISORY BOARD ────────────────────────── */}
      <section className="ab-advisory" id="advisory">
        <div className="ab-container">
          <p className="ab-tag">SCIENTIFIC ADVISORY BOARD</p>
          <h2 className="ab-heading">THE MINDS BEHIND THE SCIENCE</h2>
          <p className="ab-intro">
            Anera&apos;s Scientific Advisory Board brings together world-class clinicians, researchers,
            and innovators whose collective expertise guides the company&apos;s research direction,
            clinical strategy, and product development.
          </p>
          <div className="ab-advisors__grid">
            {ADVISORS.map((a) => (
              <div key={a.name} className="ab-advisor">
                <div className="ab-advisor__photo">
                  <Image src={a.photo} alt={a.name} width={400} height={480} />
                </div>
                <div className="ab-advisor__info">
                  <h4>{a.name}</h4>
                  <p className="ab-advisor__role">{a.role}</p>
                  <p className="ab-advisor__bio">{a.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCIENTIFIC FOCUS ─────────────────────────────────── */}
      <section className="ab-focus" id="science">
        <video className="ab-focus__bg" autoPlay muted loop playsInline>
          <source src="/assets/distribution-2.webm" type="video/webm" />
        </video>
        <div className="ab-focus__overlay" />
        <div className="ab-container">
          <p className="ab-tag">SCIENTIFIC FOCUS</p>
          <h2 className="ab-heading">THE PILLARS OF OUR RESEARCH</h2>
          <p className="ab-intro">
            Anera&apos;s research and clinical strategy is organized around five core scientific pillars,
            each representing a frontier where the science of aging intersects with the possibility
            of meaningful biological intervention.
          </p>
          <div className="ab-focus__grid">
            {FOCUS_PILLARS.map((f) => (
              <div key={f.num} className="ab-focus-block">
                <div className="ab-focus-block__num">{f.num}</div>
                <h4>{f.title}</h4>
                <div className="ab-focus-block__divider" />
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
