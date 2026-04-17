import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Loader({ onComplete }) {
  const container = useRef(null);
  const numberRef = useRef(null);
  const wrapperRef = useRef(null);
  const progressLineRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    // Animate percentage count
    tl.to(numberRef.current, {
      textContent: 100,
      duration: 2.2,
      ease: "power2.inOut",
      snap: { textContent: 1 },
    }, 0)
    
    // Animate progress line width
    .to(progressLineRef.current, {
      width: "100%",
      duration: 2.2,
      ease: "power2.inOut",
    }, 0)

    // Slide up curtain
    .to(wrapperRef.current, {
      y: "-100vh",
      duration: 1.2,
      ease: "power4.inOut",
    }, "+=0.3");
  }, { scope: container });

  return (
    <div ref={container} className="loader-container">
      <div ref={wrapperRef} className="loader-wrapper">
        <div className="loader-content">
          <div className="loader-num-wrap">
            <span ref={numberRef} className="loader-num">0</span>
            <span className="loader-percent">%</span>
          </div>
          
          <div className="loader-text">
            Initializing
          </div>

          <div className="loader-bar-wrap">
            <div ref={progressLineRef} className="loader-bar" />
          </div>
        </div>
      </div>
    </div>
  );
}
