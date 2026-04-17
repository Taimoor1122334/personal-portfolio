import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    // Start offscreen
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -200, y: -200 });
    gsap.set(label, { xPercent: -50, yPercent: -50, x: -200, y: -200, opacity: 0 });

    // ── Track mouse ─────────────────────────────────────────
    const onMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      gsap.to(dot, { x, y, duration: 0.06, ease: 'none' });
      gsap.to(ring, { x, y, duration: 0.38, ease: 'power3.out' });
      gsap.to(label, { x, y, duration: 0.38, ease: 'power3.out' });
    };

    // ── State: Default ───────────────────────────────────────
    const resetCursor = () => {
      gsap.to(dot, { scale: 1, opacity: 1, background: 'var(--accent)', duration: 0.25, ease: 'power2.out' });
      gsap.to(ring, {
        scale: 1,
        opacity: 1,
        borderColor: 'rgba(245,244,240,0.5)',
        width: '36px',
        height: '36px',
        mixBlendMode: 'difference',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2 });
    };

    // ── State: Hover on links/buttons/inputs (ring: normal blend — avoids “broken” look on forms)
    const onEnterInteractive = () => {
      gsap.to(dot, { scale: 1.5, background: 'var(--white)', duration: 0.25, ease: 'power2.out' });
      gsap.to(ring, {
        scale: 1.6,
        borderColor: 'var(--accent)',
        mixBlendMode: 'normal',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(label, { opacity: 0, duration: 0.15 });
    };

    const onLeaveInteractive = resetCursor;

    // ── State: Hover on project rows ─────────────────────────
    const onEnterProject = () => {
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.out' });
      gsap.to(ring, { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.out' });
      gsap.to(label, { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' });
    };

    const onLeaveProject = () => {
      resetCursor();
    };

    // ── Click ────────────────────────────────────────────────
    const onClick = () => {
      gsap.fromTo(ring,
        { scale: 1 },
        { scale: 2, opacity: 0, duration: 0.4, ease: 'power2.out',
          onComplete: () => gsap.set(ring, { scale: 1, opacity: 1 }) }
      );
    };

    // ── Page enter/leave ──────────────────────────────────────
    const onDocLeave = () => gsap.to([dot, ring, label], { opacity: 0, duration: 0.2 });
    const onDocEnter = () => gsap.to([dot, ring], { opacity: 1, duration: 0.2 });

    // ── Attach listeners ──────────────────────────────────────
    const attach = () => {
      // Interactive — includes textarea; skip children of project rows (those use VIEW cursor)
      document.querySelectorAll('a, button, input, textarea, label, select, [role="button"]').forEach((el) => {
        if (!el.closest('.ws-row')) {
          el.removeEventListener('mouseenter', onEnterInteractive);
          el.removeEventListener('mouseleave', onLeaveInteractive);
          el.addEventListener('mouseenter', onEnterInteractive);
          el.addEventListener('mouseleave', onLeaveInteractive);
        }
      });

      // Project rows get the "VIEW" label cursor
      document.querySelectorAll('.ws-row').forEach(el => {
        el.removeEventListener('mouseenter', onEnterProject);
        el.removeEventListener('mouseleave', onLeaveProject);
        el.addEventListener('mouseenter', onEnterProject);
        el.addEventListener('mouseleave', onLeaveProject);
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    document.documentElement.addEventListener('mouseleave', onDocLeave);
    document.documentElement.addEventListener('mouseenter', onDocEnter);

    attach();

    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      document.documentElement.removeEventListener('mouseleave', onDocLeave);
      document.documentElement.removeEventListener('mouseenter', onDocEnter);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} className="cursor-dot" />

      {/* Ring */}
      <div ref={ringRef} className="cursor-ring" />

      {/* Project row label */}
      <div ref={labelRef} className="cursor-label">
        <span>VIEW</span>
      </div>
    </>
  );
}
