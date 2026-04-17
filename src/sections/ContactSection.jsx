import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EMAIL = 'hello@chkstepan.com';

const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
];

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useGSAP(() => {
    gsap.from('.ct-title-line', {
      scrollTrigger: { trigger: '.ct-intro', start: 'top 82%' },
      y: '110%',
      opacity: 0,
      duration: 1.05,
      stagger: 0.1,
      ease: 'power4.out',
    });

    gsap.from('.ct-intro-aside', {
      scrollTrigger: { trigger: '.ct-intro', start: 'top 78%' },
      opacity: 0,
      y: 28,
      duration: 0.9,
      ease: 'power3.out',
    });

    gsap.from('.ct-form-card', {
      scrollTrigger: { trigger: '.ct-form-wrap', start: 'top 85%' },
      opacity: 0,
      y: 36,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.from('.ct-mail-link', {
      scrollTrigger: { trigger: '.ct-side', start: 'top 88%' },
      opacity: 0,
      x: -20,
      duration: 0.75,
      ease: 'power3.out',
    });

    gsap.from('.ct-social-link', {
      scrollTrigger: { trigger: '.ct-social', start: 'top 92%' },
      opacity: 0,
      y: 12,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
    });

    gsap.from('.ct-meta-bar > *', {
      scrollTrigger: { trigger: '.ct-meta-bar', start: 'top 95%' },
      opacity: 0,
      y: 16,
      duration: 0.6,
      stagger: 0.06,
      ease: 'power2.out',
    });
  }, { scope: sectionRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent('Portfolio inquiry');
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="ct-section" ref={sectionRef} id="contact">
      <div className="ct-inner">
        <div className="ct-intro">
          <div className="ct-intro-main">
            <div className="ct-label">Get in touch</div>
            <h2 className="ct-title">
              <span className="ct-title-wrap">
                <span className="ct-title-line">Say</span>
              </span>
              <span className="ct-title-wrap">
                <span className="ct-title-line ct-title-outline">hello.</span>
              </span>
            </h2>
          </div>
          <p className="ct-intro-aside">
            Tell me about your product, timeline, and goals. I reply within{' '}
            <strong>one business day</strong> — no generic forms, just a direct line.
          </p>
        </div>

        <div className="ct-split">
          <div className="ct-side">
            <a className="ct-mail-link" href={`mailto:${EMAIL}`}>
              <span className="ct-mail-label">Email</span>
              <span className="ct-mail-addr">{EMAIL}</span>
              <span className="ct-mail-arrow" aria-hidden>→</span>
            </a>

            <div className="ct-social">
              <span className="ct-social-label">Elsewhere</span>
              <ul className="ct-social-list">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      className="ct-social-link"
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ct-side-note">
              <span className="ct-dot" />
              Open for freelance &amp; collaborations · 2026
            </div>
          </div>

          <div className="ct-form-wrap">
            <form className="ct-form-card" onSubmit={handleSubmit} noValidate>
              <div className="ct-form-head">
                <span className="ct-form-num">01</span>
                <span className="ct-form-title">Project message</span>
              </div>

              <div className="ct-field">
                <label htmlFor="ct-name">Name</label>
                <input
                  id="ct-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="ct-field">
                <label htmlFor="ct-email">Email</label>
                <input
                  id="ct-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="ct-field ct-field--grow">
                <label htmlFor="ct-message">Message</label>
                <textarea
                  id="ct-message"
                  name="message"
                  rows={5}
                  placeholder="Project scope, budget range, links…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <div className="ct-form-actions">
                <button type="submit" className="ct-submit">
                  Send message
                  <span className="ct-submit-icon" aria-hidden>→</span>
                </button>
                <p className="ct-form-hint">
                  Opens your mail app with this message prefilled.
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="ct-meta-bar">
          <span>Based anywhere · GMT+5</span>
          <span className="ct-meta-accent">{'Response < 24h'}</span>
          <span>© {new Date().getFullYear()} M. Taimoor</span>
        </div>
      </div>
    </section>
  );
}
