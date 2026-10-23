"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const stats = [
  { value: "58%", label: "increase in pick-up point use" },
  { value: "23%", label: "decrease in customer calls" },
  { value: "27%", label: "more repeat customers" },
  { value: "40%", label: "faster delivery decisions" }
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const visual = visualRef.current;
    const glow = glowRef.current;
    if (!hero || !visual || !glow) return;

    const intro = gsap.context(() => {
      gsap.fromTo(
        ".eyebrow, .hero-title-line, .hero-copy, .stat-item, .hero-footer",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.075,
          ease: "power3.out",
          delay: 0.15
        }
      );
      gsap.fromTo(
        visual,
        { opacity: 0, scale: 0.86, rotate: -7 },
        { opacity: 1, scale: 1, rotate: 0, duration: 1.4, ease: "expo.out", delay: 0.2 }
      );
    }, hero);

    let targetProgress = 0;
    let currentProgress = 0;
    let frameId = 0;

    const updateTarget = () => {
      const rect = hero.getBoundingClientRect();
      targetProgress = Math.min(1, Math.max(0, -rect.top / (hero.offsetHeight - window.innerHeight)));
    };

    const render = () => {
      currentProgress += (targetProgress - currentProgress) * 0.085;
      const x = currentProgress * 190 - 80;
      const y = currentProgress * 185 - 18;
      const rotate = currentProgress * 9 - 3;
      const scale = 1 + currentProgress * 0.12;
      const glowX = currentProgress * -80;
      visual.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
      glow.style.transform = `translate3d(${glowX}px, ${currentProgress * 60}px, 0)`;
      frameId = requestAnimationFrame(render);
    };

    updateTarget();
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget);
    frameId = requestAnimationFrame(render);

    return () => {
      intro.revert();
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <main>
      <section ref={heroRef} className="hero-section">
        <div className="hero-noise" />
        <nav className="top-nav" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="Itzfizz home">
            ITZFIZZ<span className="brand-dot">.</span>
          </a>
          <div className="nav-links">
            <a href="#work">Selected work</a>
            <a href="#about">About us</a>
          </div>
          <a className="menu-button" href="#contact">
            <span>Let&apos;s talk</span>
            <span className="arrow">↗</span>
          </a>
        </nav>

        <div className="hero-grid" id="top">
          <div className="hero-content">
            <p className="eyebrow">Independent digital studio <span>— 2025</span></p>
            <h1 className="hero-title" aria-label="Welcome Itzfizz">
              <span className="hero-title-line">WELCOME</span>
              <span className="hero-title-line title-offset">ITZFIZZ</span>
            </h1>
            <p className="hero-copy">
              We turn ambitious ideas into <em>clear, curious</em> and memorable digital experiences.
            </p>
          </div>

          <div className="visual-wrap" aria-hidden="true">
            <div ref={glowRef} className="visual-glow" />
            <div ref={visualRef} className="hero-visual">
              <div className="visual-label">Scroll to<br />move forward <span>↓</span></div>
              <div className="visual-frame">
                <img
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85"
                  alt=""
                />
              </div>
              <div className="visual-sticker">IDEAS<br /><strong>IN MOTION</strong></div>
            </div>
          </div>
        </div>

        <div className="stats-row">
          {stats.map((stat) => (
            <div className="stat-item" key={stat.value}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="hero-footer">
          <span>Based in Amsterdam · Working everywhere</span>
          <span className="scroll-hint"><i /> Keep scrolling</span>
        </div>
      </section>

      <section className="after-section" id="work">
        <p className="eyebrow">What we believe</p>
        <h2>Good work should feel <em>obvious</em> in hindsight.</h2>
        <p className="after-copy" id="about">
          Strategy, design and technology brought together to make the complex feel simple—and the ordinary feel impossible to ignore.
        </p>
        <a className="text-link" href="mailto:hello@itzfizz.com" id="contact">Start a conversation <span>↗</span></a>
      </section>
    </main>
  );
}
