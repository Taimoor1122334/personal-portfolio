import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';


export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

    if (isOpen) {
      // 1. Morph hamburger to X
      gsap.to(".h-line-1", { rotation: -45, y: 10, duration: 0.5, ease: "power3.inOut" });
      gsap.to(".h-line-2", { rotation: 45, y: -10, duration: 0.5, ease: "power3.inOut" });

      // 2. Expand overlay circle from top right
      tl.to(overlayRef.current, {
        clipPath: "circle(150% at 95% 5%)",
        duration: 1.2
      })
        // 3. Stagger reveal massive links from the bottom
        .fromTo(".menu-link",
          { y: "100%", rotation: 2, opacity: 0 },
          { y: "0%", rotation: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
          "-=0.7"
        )
        // 4. Reveal footer
        .to(".menu-footer-content", {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1
        }, "-=0.4");

    } else {
      // Morph back
      gsap.to(".h-line-1", { rotation: 0, y: 0, duration: 0.5, ease: "power3.inOut" });
      gsap.to(".h-line-2", { rotation: 0, y: 0, duration: 0.5, ease: "power3.inOut" });

      // Collapse overlay
      tl.to(".menu-link", { y: "-50%", opacity: 0, duration: 0.4, stagger: -0.05 })
        .to(".menu-footer-content", { y: 20, opacity: 0, duration: 0.3 }, 0)
        .to(overlayRef.current, {
          clipPath: "circle(0% at 95% 5%)",
          duration: 0.8
        }, "-=0.2");
    }
  }, { scope: containerRef, dependencies: [isOpen] });

  useGSAP(() => {
    // Initial state assurance
    gsap.set(overlayRef.current, { clipPath: "circle(0% at 95% 5%)" });
  }, { scope: containerRef });

  return (
    <>
      <div className="custom-nav" ref={containerRef}>

        {/* Transparent Header */}
        <header className="nav-header">
          <div className="nav-logo">M<span>.</span>Taimoor</div>

          <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            <span className="menu-toggle-text">{isOpen ? "Close" : "Menu"}</span>
            <div className="hamburger">
              <div className="h-line h-line-1"></div>
              <div className="h-line h-line-2"></div>
            </div>
          </button>
        </header>

        {/* Fullscreen Overlay */}
        <div className="menu-overlay" ref={overlayRef}>
          <ul className="menu-links">
            <li className="menu-link-item">
              <a className="menu-link"><span className="num">01</span>Home</a>
            </li>
            <li className="menu-link-item">
              <a className="menu-link"><span className="num">02</span>Work</a>
            </li>
            <li className="menu-link-item">
              <a className="menu-link"><span className="num">03</span>Studio</a>
            </li>
            <li className="menu-link-item">
              <a className="menu-link"><span className="num">04</span>Contact</a>
            </li>
          </ul>

          <div className="menu-footer">
            <div className="menu-footer-content">
              Talk to us at <span>hello@chkstepan.com</span>
            </div>
            <div className="menu-footer-content">
              <span>Instagram</span> &nbsp;•&nbsp; <span>Twitter</span> &nbsp;•&nbsp; <span>LinkedIn</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
