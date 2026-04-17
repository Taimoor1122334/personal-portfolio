import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: '01',
    title: 'Web Design',
    desc: 'Pixel-perfect interfaces built for impact. Every layout, color, and motion choice made with intention.',
    tags: ['UI/UX', 'Wireframing', 'Prototyping'],
  },
  {
    num: '02',
    title: 'Development',
    desc: 'Clean, performant code from frontend to deployment. React, Next.js, and modern web standards.',
    tags: ['React', 'Next.js', 'Node.js'],
  },
  {
    num: '03',
    title: 'Motion & GSAP',
    desc: 'Scroll-triggered animations, page transitions, and micro-interactions that make sites feel alive.',
    tags: ['GSAP', 'ScrollTrigger', 'WebGL'],
  },
  {
    num: '04',
    title: 'Branding',
    desc: 'Identity systems that communicate clearly and leave a lasting impression across every touchpoint.',
    tags: ['Logo', 'Typography', 'Identity'],
  },
];

const values = [
  { title: 'Obsessive Craft', desc: 'We sweat the details others skip. Every pixel, every easing curve.' },
  { title: 'Performance First', desc: 'Beautiful sites that are also blazing fast. Aesthetics and speed are not a tradeoff.' },
  { title: 'Clear Communication', desc: 'Honest timelines, transparent process, no surprises.' },
];

export default function StudioSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // ── Heading line reveal ────────────────────────────────
    gsap.from('.st-title-line', {
      scrollTrigger: { trigger: '.st-intro', start: 'top 82%' },
      y: '110%',
      opacity: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: 'power4.out',
    });

    // ── Tagline ────────────────────────────────────────────
    gsap.from('.st-tagline', {
      scrollTrigger: { trigger: '.st-intro', start: 'top 75%' },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out',
    });

    // ── Divider expand ─────────────────────────────────────
    gsap.from('.st-divider', {
      scrollTrigger: { trigger: '.st-divider', start: 'top 88%' },
      scaleX: 0,
      transformOrigin: 'left',
      duration: 1.2,
      ease: 'power4.inOut',
    });

    // ── Service cards ──────────────────────────────────────
    gsap.from('.st-service', {
      scrollTrigger: { trigger: '.st-services', start: 'top 82%' },
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });

    // ── Values ─────────────────────────────────────────────
    gsap.from('.st-value', {
      scrollTrigger: { trigger: '.st-values', start: 'top 82%' },
      opacity: 0,
      x: -30,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
    });

    // ── Marquee scroll-driven rotation ────────────────────
    gsap.to('.st-marquee-inner', {
      scrollTrigger: {
        trigger: '.st-marquee',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      x: '-20%',
      ease: 'none',
    });

    // ── Profile image parallax ─────────────────────────────
    gsap.to('.st-img-inner', {
      scrollTrigger: {
        trigger: '.st-profile',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      yPercent: -15,
      ease: 'none',
    });
  }, { scope: sectionRef });

  return (
    <section className="st-section" ref={sectionRef} id="studio">

      {/* ── Intro Block ─────────────────────────────────────── */}
      <div className="st-intro">
        <div className="st-intro-left">
          <div className="st-label">About the Studio</div>
          <h2 className="st-title">
            <span className="st-title-wrap"><span className="st-title-line">We craft</span></span>
            <span className="st-title-wrap"><span className="st-title-line st-title-outline">digital</span></span>
            <span className="st-title-wrap"><span className="st-title-line">experiences.</span></span>
          </h2>
        </div>
        <div className="st-intro-right">
          <p className="st-tagline">
            A one-person studio obsessed with the intersection of <strong>design excellence</strong> and <strong>engineering precision</strong>. Based everywhere, working with clients globally.
          </p>
          <p className="st-tagline st-tagline--secondary">
            From minimal landing pages to complex web applications — every project is treated as a unique creative challenge.
          </p>
          <div className="st-badge">
            <span className="st-badge-dot" />
            Available for Projects — 2025
          </div>
        </div>
      </div>

      {/* ── Scrolling Marquee ────────────────────────────────── */}
      <div className="st-marquee">
        <div className="st-marquee-inner">
          {['Design', '·', 'Development', '·', 'Motion', '·', 'Branding', '·', 'Strategy', '·', 'Design', '·', 'Development', '·', 'Motion', '·', 'Branding', '·'].map((word, i) => (
            <span key={i} className={word === '·' ? 'st-marquee-dot' : 'st-marquee-word'}>{word}</span>
          ))}
        </div>
      </div>

      {/* ── Services ─────────────────────────────────────────── */}
      <div className="st-services-wrap">
        <div className="st-section-label">What I do</div>
        <div className="st-divider" />
        <div className="st-services">
          {services.map((s) => (
            <div key={s.num} className="st-service">
              <div className="st-service-top">
                <span className="st-service-num">{s.num}</span>
                <h3 className="st-service-title">{s.title}</h3>
              </div>
              <p className="st-service-desc">{s.desc}</p>
              <div className="st-service-tags">
                {s.tags.map(tag => <span key={tag} className="st-service-tag">{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Profile + Values ─────────────────────────────────── */}
      <div className="st-profile">
        <div className="st-profile-img">
          <div className="st-img-inner">
            <div className="st-img-placeholder">
              <span className="st-img-initials">CS</span>
            </div>
          </div>
          <div className="st-img-caption">
            <span>chk.stepan</span>
            <span className="st-img-caption-role">Designer & Developer</span>
          </div>
        </div>

        <div className="st-values" id="st-values">
          <div className="st-section-label">My approach</div>
          <p className="st-values-intro">
            I believe the best digital work emerges from a relentless commitment to quality — where technical execution and visual thinking are inseparable.
          </p>
          <div className="st-values-list">
            {values.map((v) => (
              <div key={v.title} className="st-value">
                <div className="st-value-icon">→</div>
                <div>
                  <div className="st-value-title">{v.title}</div>
                  <div className="st-value-desc">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
