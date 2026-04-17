import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    title: 'Neural Lnk',
    category: 'AI Platform',
    year: '2024',
    tags: ['WebGL', 'GSAP', 'React'],
    image: '/images/project1.png',
  },
  {
    id: '02',
    title: 'Archon Studio',
    category: 'Architecture',
    year: '2024',
    tags: ['Branding', 'E-Commerce', 'Dev'],
    image: '/images/project2.png',
  },
  {
    id: '03',
    title: 'Flux Finance',
    category: 'Fintech',
    year: '2023',
    tags: ['UI/UX', 'Motion', 'Next.js'],
    image: '/images/project3.png',
  },
  {
    id: '04',
    title: 'Orion Labs',
    category: 'Research & Dev',
    year: '2023',
    tags: ['3D', 'Three.js', 'Design'],
    image: '/images/project1.png',
  },
];

export default function WorkSection() {
  const sectionRef = useRef(null);
  const cursorImgRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Mouse follower global tracker
  const mouse = useRef({ x: 0, y: 0 });

  // ── Scroll entrance animations ──────────────────────────────────────────────
  useGSAP(() => {
    // Section heading words
    gsap.from('.ws-heading-word', {
      scrollTrigger: { trigger: '.ws-heading', start: 'top 82%' },
      y: '110%',
      opacity: 0,
      duration: 1,
      stagger: 0.08,
      ease: 'power4.out',
    });

    // Divider line expands in
    gsap.from('.ws-divider-top', {
      scrollTrigger: { trigger: '.ws-heading', start: 'top 80%' },
      scaleX: 0,
      transformOrigin: 'left',
      duration: 1.2,
      ease: 'power4.inOut',
    });

    // Each project row slides in
    gsap.utils.toArray('.ws-row').forEach((row, i) => {
      gsap.from(row, {
        scrollTrigger: { trigger: row, start: 'top 88%' },
        opacity: 0,
        y: 24,
        duration: 0.7,
        delay: i * 0.05,
        ease: 'power3.out',
      });
    });
  }, { scope: sectionRef });

  // ── Cursor-tracked floating image ────────────────────────────────────────────
  const handleMouseMove = (e) => {
    mouse.current = { x: e.clientX, y: e.clientY };
    gsap.to(cursorImgRef.current, {
      x: e.clientX - 120,
      y: e.clientY - 90,
      duration: 0.45,
      ease: 'power2.out',
    });
  };

  const handleRowEnter = (idx) => {
    setHoveredIdx(idx);
    gsap.to(cursorImgRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const handleRowLeave = () => {
    setHoveredIdx(null);
    gsap.to(cursorImgRef.current, {
      opacity: 0,
      scale: 0.85,
      duration: 0.3,
      ease: 'power3.in',
    });
  };

  const handleRowClick = (e, idx) => {
    // Ripple expand then collapse on click
    gsap.fromTo(cursorImgRef.current,
      { scale: 1 },
      { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.inOut' }
    );
  };

  return (
    <section className="ws-section" ref={sectionRef} onMouseMove={handleMouseMove}>

      {/* Floating cursor image — follows mouse */}
      <div className="ws-cursor-img" ref={cursorImgRef}>
        <img
          src={hoveredIdx !== null ? projects[hoveredIdx].image : projects[0].image}
          alt="project preview"
        />
      </div>

      <div className="ws-inner">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="ws-heading">
          <div className="ws-heading-meta">
            <span className="ws-heading-label">Selected Work</span>
            <span className="ws-heading-count">({projects.length.toString().padStart(2, '0')})</span>
          </div>
          <div className="ws-heading-title-wrap">
            {'Projects.'.split(' ').map((word, i) => (
              <span className="ws-heading-word" key={i}>{word}&nbsp;</span>
            ))}
          </div>
        </div>

        <div className="ws-divider ws-divider-top" />

        {/* ── Project List ────────────────────────────────────────── */}
        <ul className="ws-list">
          {projects.map((p, idx) => (
            <li
              key={p.id}
              className={`ws-row ${hoveredIdx === idx ? 'ws-row--active' : ''} ${hoveredIdx !== null && hoveredIdx !== idx ? 'ws-row--dim' : ''}`}
              onMouseEnter={() => handleRowEnter(idx)}
              onMouseLeave={handleRowLeave}
              onClick={(e) => handleRowClick(e, idx)}
            >
              <div className="ws-row-left">
                <span className="ws-row-num">{p.id}</span>
                <h3 className="ws-row-title">{p.title}</h3>
              </div>

              <div className="ws-row-center">
                <div className="ws-row-tags">
                  {p.tags.map(tag => (
                    <span key={tag} className="ws-tag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="ws-row-right">
                <span className="ws-row-cat">{p.category}</span>
                <span className="ws-row-year">{p.year}</span>
                <span className="ws-row-cta">View →</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="ws-divider ws-divider-bottom" />

        {/* ── Footer CTA ──────────────────────────────────────────── */}
        <div className="ws-footer">
          <p className="ws-footer-text">Have a project in mind?</p>
          <button className="ws-footer-btn">Start a conversation →</button>
        </div>

      </div>
    </section>
  );
}
