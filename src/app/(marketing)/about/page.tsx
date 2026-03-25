import Image from "next/image";
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

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function AboutPage() {
  return (
    <div className="about-page">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="ab-hero" id="hero">
        <div className="ab-hero__inner">
          <div>
            <p className="ab-hero__eyebrow">Your Evolution Has Begun</p>
            <h1 className="ab-hero__headline">
              WHERE SCIENCE<br />MEETS <em>LONGEVITY</em>
            </h1>
            <p className="ab-hero__statement">
              Anera is a clinically driven longevity company built at the intersection of
              regenerative medicine, nanotechnology, and biologically intelligent health systems —
              designed to extend both the quality and duration of human life.
            </p>
            <a href="#mission" className="ab-btn ab-btn--black">Discover Our Mission</a>
          </div>
          <div className="ab-hero__image">
            <Image
              src="https://aneralife.com/wp-content/uploads/2026/03/AM.jpeg"
              alt="Founder of Anera"
              className="ab-hero__photo"
              width={480}
              height={600}
            />
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
                src="https://aneralife.com/wp-content/uploads/2026/01/Founder-and-CEO-Truc-Tran.jpeg"
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
              <div className="ab-story-block">
                <p className="ab-leader-name">Truc Tran</p>
                <p className="ab-leader-role">Founder / CEO</p>
                <p>
                  For decades, the healthcare industry has operated on a model built around disease
                  management rather than genuine restoration. Patients were handed prescriptions
                  designed to suppress symptoms, while the underlying biological dysfunction — the
                  root cause of accelerated aging and chronic illness — was left entirely unaddressed.
                  The founder of Anera witnessed this gap firsthand: brilliant clinicians constrained
                  by systems that rewarded treatment over transformation.
                </p>
              </div>
              <div className="ab-story-block">
                <p className="ab-story-title">The Journey</p>
                <p>
                  The path to founding Anera was not a straight line. It began in clinical practice,
                  moved through years of independent research in regenerative science, and eventually
                  converged with a team of pioneering scientists whose work in nanometallic
                  therapeutics, epigenetics, and mitochondrial health pointed toward something
                  genuinely new. The question was no longer &ldquo;how do we treat disease?&rdquo; — it became
                  &ldquo;how do we build a body that resists it?&rdquo;
                </p>
              </div>
              <div className="ab-story-block">
                <p className="ab-story-title">The Mission Behind Anera</p>
                <p>
                  Anera was founded on a singular conviction: that human beings deserve a healthcare
                  system as sophisticated as the biology it serves. By uniting clinical expertise
                  with cutting-edge longevity science, Anera is building protocols, products, and
                  platforms that don&apos;t just extend lifespan — they elevate healthspan. Every
                  decision the company makes is anchored in peer-reviewed science, clinical
                  validation, and a deep respect for the complexity of human biology.
                </p>
              </div>
              <div className="ab-story-block">
                <p className="ab-story-title">What Makes It Different</p>
                <p>
                  Unlike wellness brands that borrow the language of science without its rigor,
                  Anera operates at the frontier. With 90+ patents in nanometallic silver oxide
                  technology, a Scientific Advisory Board spanning integrative medicine, biological
                  dentistry, and AI-driven analytics, and a clinical framework rooted in regenerative
                  therapeutics, Anera represents a fundamentally different category — one where
                  innovation is not a marketing claim, but a measurable outcome.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ─────────────────────────────────── */}
      <section className="ab-mv" id="mission">
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
