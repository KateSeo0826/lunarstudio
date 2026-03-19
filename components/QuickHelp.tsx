"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import styles from "./QuickHelp.module.css";

export default function QuickHelp() {
  const t = useTranslations("quickHelp");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqKeys = ["1", "2", "3", "4", "5"] as const;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.topGrid}>
          <div className={styles.titleArea}>
            <div className={styles.headingWrap}>
              <h2 className={styles.heading}>
                <span className={styles.dot}></span>
                <span className={styles.titleText}>
                  {t("titlePart1")}
                  <br />
                  <span className={styles.highlight}>{t("titlePart2")}</span>
                </span>
              </h2>
            </div>
          </div>

          <div className={styles.headerRight}>
            <p className={styles.ctaLabel}>{t("ctaLabel")}</p>
            <button className={styles.askBtn}>{t("askBtn")} </button>
          </div>
        </div>

        <div className={styles.content}>
          <Image
            src="/images/office.jpg"
            alt="Quick Help Visual"
            width={400}
            height={673}
            className={styles.image}
          />

          <div className={styles.accordionWrapper}>
            {faqKeys.map((key, index) => (
              <div key={key} className={styles.faqItem}>
                <button
                  className={styles.questionBtn}
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                >
                  <span className={styles.qText}>
                    <small className={styles.qNo}>(0{key})</small>{" "}
                    {t(`items.q${key}`)}
                  </span>
                  <span
                    className={`${styles.icon} ${activeIndex === index ? styles.activeIcon : ""}`}
                  >
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={styles.answerWrapper}
                    >
                      <p className={styles.answer}>{t(`items.a${key}`)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
