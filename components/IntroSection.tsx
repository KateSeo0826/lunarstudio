"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import Link from "next/link";
import styles from "./IntroSection.module.css";
import { motion } from "framer-motion";
import Image from "next/image";
export default function IntroSection() {
  const t = useTranslations("intro");
  const rootRef = useRef<HTMLDivElement>(null);
  const subtitleText = `${t("subtitle")} — `;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.title}`, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(`.${styles.description}`, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={rootRef}>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <Image
            width={16}
            height={16}
            src="/images/star-icon.svg"
            alt="asterisk"
            className={styles.asterisk}
          />

          <div className={styles.subtitleMask}>
            <motion.div
              className={styles.subtitleWrapper}
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span className={styles.subtitle}>{subtitleText}</span>
              <span className={styles.subtitle}>{subtitleText}</span>
              <span className={styles.subtitle}>{subtitleText}</span>
              <span className={styles.subtitle}>{subtitleText}</span>
            </motion.div>
          </div>
        </div>

        <div className={styles.mainContent}>
          <h2 className={styles.title}>
            {t("titleMain")}{" "}
            <span className={styles.secondaryText}>{t("titleSecondary")}</span>
          </h2>

          <p className={styles.description}>{t("description")}</p>

          <div className={styles.buttonGroup}>
            <Link href="/about" className={styles.ourStoryBtn}>
              <span>{t("ourStory")}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <Link href="/contact" className={styles.contactLink}>
              {t("contactUs")} ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
