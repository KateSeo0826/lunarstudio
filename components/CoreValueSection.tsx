"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./CoreValueSection.module.css";

const moveDown = {
  initial: { y: -60, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true },
  transition: {
    duration: 2.0,
    ease: [0.22, 1, 0.36, 1] as const,
  },
};

const lineDraw = {
  initial: { width: 0 },
  whileInView: { width: "100%" },
  viewport: { once: true },
  transition: {
    duration: 4.0,
    delay: 0.5,
    ease: "easeInOut" as const,
  },
};

const textGradientReveal = {
  initial: { backgroundPosition: "100% 0%" },
  whileInView: { backgroundPosition: "0% 0%" },
  viewport: { once: true },
  transition: {
    duration: 2.5,
    delay: 3.0,
    ease: "easeInOut" as const,
  },
};

export default function CoreValueSection() {
  const t = useTranslations("coreValue");

  const renderHighlightText = (text: string) => {
    const parts = text.split(/(\[\[.*?\]\])/g);
    return parts.map((part, index) => {
      if (part.startsWith("[[") && part.endsWith("]]")) {
        const content = part.replace(/[\[\]]/g, "");
        return (
          <span key={index} className={styles.purpleHighlight}>
            {content}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.span {...moveDown} className={styles.subTag}>
            {t("subTag")}
          </motion.span>
          <motion.div {...lineDraw} className={styles.line} />
        </div>

        <div className={styles.sloganArea}>
          <motion.div
            {...moveDown}
            transition={{ delay: 1.5 }}
            className={styles.sloganText}
          >
            <p className={styles.fullRow}>{t("slogan.row1")}</p>
            <p className={styles.fullRow}>{t("slogan.row2")}</p>

            <div className={styles.inlineRow}>
              <motion.span
                variants={textGradientReveal}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className={styles.colorChangeText}
              >
                {t("slogan.gradient.text1")}
              </motion.span>
              <motion.span
                variants={textGradientReveal}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className={styles.colorChangeText}
                transition={{ ...textGradientReveal.transition, delay: 3.8 }}
              >
                {t("slogan.gradient.text2")}
              </motion.span>
              <motion.span
                variants={textGradientReveal}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className={styles.colorChangeText}
                transition={{ ...textGradientReveal.transition, delay: 4.6 }}
              >
                {t("slogan.gradient.text3")}
              </motion.span>
            </div>

            <p className={styles.fullRow}>{t("slogan.row4")}</p>
          </motion.div>
        </div>

        <div className={styles.bottomGrid}>
          <motion.div
            {...moveDown}
            transition={{ delay: 2.0 }}
            className={styles.symbolWrapper}
          >
            <div className={styles.starSymbol}>
              <Image
                src="/images/star.svg"
                width={150}
                height={150}
                alt="star"
                className={styles.starIcon}
              />
            </div>
          </motion.div>

          <motion.div
            {...moveDown}
            transition={{ delay: 2.2 }}
            className={styles.descriptionWrapper}
          >
            <p
              className={styles.descContent}
              style={{ whiteSpace: "pre-line" }}
            >
              {renderHighlightText(t("description.p1"))}
            </p>
            <p
              className={styles.descContent}
              style={{ whiteSpace: "pre-line" }}
            >
              {renderHighlightText(t("description.p2"))}
            </p>
            <p
              className={styles.descContent}
              style={{ whiteSpace: "pre-line" }}
            >
              {renderHighlightText(t("description.p3"))}
            </p>
            <p className={styles.descFooter}>
              {t("description.footer")}{" "}
              <span className={styles.purpleHighlight}>Lunar Studio</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
