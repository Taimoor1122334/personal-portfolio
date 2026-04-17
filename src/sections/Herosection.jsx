import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "../components/Nav";

gsap.registerPlugin(ScrollTrigger);

// Interactive Net/Topography Canvas Background
function WaveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    let animationId;
    let time = 0;

    // Mouse tracking for interactivity
    let mouse = { x: -1000, y: -1000, radius: 250 };
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      time += 0.002;
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      // Clean background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      ctx.lineWidth = 1;

      const spacing = 40; // Spacing of the net grid
      const rows = Math.ceil(height / spacing) + 2;
      const cols = Math.ceil(width / spacing) + 2;

      // Draw Interactive Topographical Net

      // Horizontal sweeping lines
      for (let i = -1; i < rows; i++) {
        ctx.beginPath();
        for (let j = -1; j < cols; j++) {
          let cx = j * spacing;
          let cy = i * spacing;

          // Smooth organic wave movement, removing sharp wrinkles
          let noiseX = Math.sin(cx * 0.003 + time) * 50 + Math.cos(cy * 0.002 - time * 0.8) * 40;
          let noiseY = Math.cos(cx * 0.002 - time * 0.5) * 50 + Math.sin(cy * 0.003 + time) * 40;

          let x = cx + noiseX;
          let y = cy + noiseY;

          // Mouse interaction (repel effect)
          let dx = x - mouse.x;
          let dy = y - mouse.y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            let force = (mouse.radius - dist) / mouse.radius;
            // Push away from the mouse gently
            x += dx * force * 0.5;
            y += dy * force * 0.5;
          }

          if (j === -1) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        // Faint white styling
        ctx.strokeStyle = `rgba(255, 255, 255, 0.06)`;
        ctx.stroke();
      }

      // Vertical sweeping lines
      for (let j = -1; j < cols; j++) {
        ctx.beginPath();
        for (let i = -1; i < rows; i++) {
          let cx = j * spacing;
          let cy = i * spacing;

          // Smooth organic wave movement, removing sharp wrinkles
          let noiseX = Math.sin(cx * 0.003 + time) * 50 + Math.cos(cy * 0.002 - time * 0.8) * 40;
          let noiseY = Math.cos(cx * 0.002 - time * 0.5) * 50 + Math.sin(cy * 0.003 + time) * 40;

          let x = cx + noiseX;
          let y = cy + noiseY;

          let dx = x - mouse.x;
          let dy = y - mouse.y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            let force = (mouse.radius - dist) / mouse.radius;
            x += dx * force * 0.5;
            y += dy * force * 0.5;
          }

          if (i === -1) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        // Accent color styling (var(--accent))
        ctx.strokeStyle = `rgba(200, 255, 0, 0.05)`;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none', opacity: 0.85
      }}
    />
  );
}

export default function HeroSection({ hasLoaded }) {

  const container = useRef(null);

  useGSAP(() => {
    if (!hasLoaded) return; // Wait until loader is 100% finished before playing intro

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".custom-nav", { y: -20, opacity: 0, duration: 0.8 }, 0.1)
      .from(".hero-tag", { y: 20, opacity: 0, duration: 0.8 }, 0.3)
      .from(".line-inner", { y: "100%", opacity: 0, duration: 1, stagger: 0.15 }, 0.4)
      .from(".hero-sub-row", { y: 20, opacity: 0, duration: 0.8 }, 0.85)
      .from(".hero-stats", { y: 20, opacity: 0, duration: 0.8 }, 1)
      .from(".avail-badge", { y: "-40%", opacity: 0, duration: 0.8 }, 1.1)
      .from(".scroll-hint", { y: 20, opacity: 0, duration: 0.8 }, 1.4);

    // Infinite pulse animations
    gsap.to(".hero-tag-dot, .avail-dot", {
      opacity: 0.3, duration: 1, repeat: -1, yoyo: true, ease: "power1.inOut"
    });

    gsap.fromTo(".scroll-line",
      { scaleY: 0, transformOrigin: "top" },
      { scaleY: 1, duration: 1, repeat: -1, yoyo: true, ease: "power2.inOut" }
    );

    // Counter animation on scroll
    gsap.fromTo(".stat-counter",
      { textContent: 0 },
      {
        scrollTrigger: {
          trigger: ".hero-stats",
          start: "top 90%", // Trigger when top of stats hits 90% of screen height
        },
        textContent: (i, target) => target.dataset.target,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        stagger: 0.2
      }
    );
  }, { scope: container, dependencies: [hasLoaded] });

  return (
    <>
      <div className="hero-root" ref={container}>
        <WaveBackground />

        {/* NAV */}
        <Nav />

        {/* CORNER MARKS */}
        <div className="corner tl" />
        <div className="corner tr" />
        <div className="corner bl" />
        <div className="corner br" />

        {/* AVAILABILITY BADGE */}
        <div className="avail-badge">
          <div className="avail-dot" />
          <div className="avail-label">Status</div>
          <div className="avail-value">Available</div>
          <div className="avail-label" style={{ marginTop: 4 }}>for work</div>
        </div>

        {/* MAIN HERO */}
        <div className="hero">
          <div className="hero-main">

            <div className="hero-tag">
              <div className="hero-tag-dot" />
              <span className="hero-tag-text">Web Developer & Designer</span>
            </div>

            <h1 className="hero-headline">
              <span className="line"><span className="line-inner l1">I Build</span></span>
              <span className="line"><span className="line-inner l2">Modern Websites</span></span>
              <span className="line"><span className="line-inner l3">That Work.</span></span>
            </h1>

            <div className="hero-sub-row">
              <p className="hero-desc">
                Focused on building <strong>fast, reliable</strong> digital experiences.
                Clean code, thoughtful design, and performance at every layer —
                from layout to deployment.
              </p>
              <div className="hero-actions">
                <button className="btn-primary">View Projects →</button>
                <button className="btn-secondary">About Me</button>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-num"><span className="stat-counter" data-target="48">0</span><span className="accent">+</span></div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-num"><span className="stat-counter" data-target="5">0</span><span className="accent">+</span></div>
              <div className="stat-label">Years of Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-num"><span className="stat-counter" data-target="99">0</span><span className="accent">/100</span></div>
              <div className="stat-label">Avg. Performance Score</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">∞</div>
              <div className="stat-label">Attention to Detail</div>
            </div>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="scroll-hint">
          <span className="scroll-hint-text">Scroll</span>
          <div className="scroll-line" />
        </div>

      </div>
    </>
  );
}