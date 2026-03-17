"use client"; // Next.js App Router 사용 시 필수

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const noteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", opacity: 0 },
      });

      tl.fromTo(
        `.${styles.title}`,
        { y: 42 },
        { y: 0, opacity: 1, duration: 1.0 },
      )
        .fromTo(
          `.${styles.subtitle}`,
          { y: 18 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.55",
        )
        .fromTo(
          `.${styles.bottomNote}`,
          { y: 14 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.35",
        );

        const colorTl = gsap.timeline({
        repeat: -1, 
        delay: 1.0 
       });

    colorTl
      .to(`.${styles.title}`, {
        color: "#fff8e1",
        textShadow: "0 0 15px rgba(255, 248, 225, 0.4)",
        duration: 4,
        ease: "sine.inOut",
      })
      .to(`.${styles.title}`, {
        color: "#ffecb3", 
        textShadow: "0 0 20px rgba(255, 236, 179, 0.5)",
        duration: 4,
        ease: "sine.inOut",
      })
      .to(`.${styles.title}`, {
        color: "#f5f5f5", 
        textShadow: "0 0 10px rgba(245, 245, 245, 0.2)",
        duration: 4,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} ref={rootRef}>
      <div className={styles.center}>
        <h1 className={styles.title}>LUNAR STUDIO</h1>
        <p className={styles.subtitle}>Designing Your Digital World</p>
      </div>
    </section>
  );
}
