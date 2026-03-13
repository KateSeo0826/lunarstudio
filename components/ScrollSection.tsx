"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./ScrollSection.module.css";
import Link from "next/link";

export default function ScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1]);

  const yUp = useTransform(scrollYProgress, [0.2, 0.5], ["100%", "0%"]);

  const yDown = useTransform(scrollYProgress, [0.2, 0.5], ["-100%", "0%"]);

  return (
    <section ref={containerRef} className={styles.container}>
      <div className={styles.content}>
        <div className={styles.titleWrap}>
          <div style={{ display: "flex", gap: "0.5em", overflow: "hidden" }}>
            <motion.h2 style={{ y: yUp, opacity }} className={styles.title}>
              LET'S
            </motion.h2>
            <motion.h2
              style={{ y: yUp, opacity }}
              className={`${styles.title} ${styles.secondary}`}
            >
              BUILD
            </motion.h2>
          </div>
        </div>

        <div className={styles.titleWrap}>
          <div style={{ display: "flex", gap: "0.5em", overflow: "hidden" }}>
            <motion.h2
              style={{ y: yDown, opacity }}
              className={`${styles.title} ${styles.secondary}`}
            >
              YOUR
            </motion.h2>
            <motion.h2 style={{ y: yUp, opacity }} className={styles.title}>
              BRAND
            </motion.h2>
          </div>
        </div>

        <motion.div
          style={{ opacity }}
          className={styles.buttonWrap}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/contact" className={styles.mainButton}>
            Get in Touch →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
