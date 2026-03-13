"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import styles from "./about.module.css";
import CoreValueSection from "../../../components/CoreValueSection";

export default function AboutSection() {
  const t = useTranslations("about");

  const moveDown = {
    initial: { y: -100, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 2.5, ease: [0.22, 1, 0.36, 1] as const }, // as const 추가
  };

  const lineReveal = {
    initial: { width: "0%" },
    whileInView: { width: "100%" },
    viewport: { once: true },
    transition: {
      duration: 4.0,
      ease: [0.65, 0, 0.35, 1] as const,
      delay: 0.5,
    },
  };

  const imageReveal = {
    initial: { clipPath: "inset(0% 0% 100% 100%)", opacity: 0 },
    whileInView: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 },
    viewport: { once: true },
    transition: {
      duration: 4.5,
      ease: [0.65, 0, 0.35, 1] as const,
      delay: 1.0,
    },
  };

  const textGradientReveal = {
    initial: { backgroundPosition: "100% 0%" },
    whileInView: { backgroundPosition: "0% 0%" },
    viewport: { once: true },
    transition: { duration: 3.0, delay: 3.5, ease: "easeInOut" },
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <motion.h1 {...moveDown} className={styles.mainTitle}>
              Your Story <br /> & Our Palette
            </motion.h1>
            <motion.div
              {...moveDown}
              transition={{ ...moveDown.transition, delay: 0.3 }}
              className={styles.subTag}
            >
              {t("subTag")}
            </motion.div>
          </div>
          <div className={styles.dividerWrapper}>
            <motion.div
              variants={lineReveal}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className={styles.dividerLine}
            />
          </div>
        </header>

        <motion.div
          variants={imageReveal}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className={styles.imageWrapper}
        >
          <Image
            src="/images/meeting.png"
            alt="Team"
            width={1200}
            height={600}
            className={styles.mainImage}
            priority
          />
        </motion.div>

        <div className={styles.sloganArea}>
          <motion.div
            {...moveDown}
            transition={{ delay: 1.5 }}
            className={styles.sloganText}
          >
            <div>{t("sloganLine1")}</div>
            <div className={styles.inlineRow}>
              <motion.span
                variants={textGradientReveal}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className={styles.colorChangeText}
                transition={{ ...textGradientReveal.transition, delay: 2.0 }}
              >
                {t("sloganPoint1")}
              </motion.span>
              <p>{t("sloganConnector")}</p>
            </div>
            <div className={styles.inlineRow}>
              <motion.span
                variants={textGradientReveal}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className={styles.colorChangeText}
                transition={{ ...textGradientReveal.transition, delay: 3.0 }}
              >
                {t("sloganPoint2")}
              </motion.span>
              <p>{t("sloganLine2Part1")}</p>{" "}
            </div>
            <div>{t("sloganLine2Part2")}</div>{" "}
          </motion.div>
        </div>
      </div>
      <CoreValueSection />
    </section>
  );
}
