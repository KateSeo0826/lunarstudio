"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./WhyChooseUs.module.css";

function RollingNumber({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const digits = value.split("");

  return (
    <div ref={ref} className={styles.rollNumberComponent}>
      {digits.map((digit, i) => {
        const isNumber = !isNaN(parseInt(digit));
        return (
          <div key={i} className={styles.digitColumn}>
            {isNumber ? (
              <motion.div
                initial={{ y: "0%" }}
                animate={
                  isInView ? { y: `-${parseInt(digit) * 10}%` } : { y: "0%" }
                }
                transition={{
                  duration: 2,
                  ease: [0.45, 0.05, 0.55, 0.95],
                  delay: i * 0.1,
                }}
                className={styles.rollNumberWrap}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <div key={n} className={styles.statsNumber}>
                    {n}
                  </div>
                ))}
              </motion.div>
            ) : (
              <div className={styles.statsNumberAlternate}>{digit}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");

  return (
    <section className={styles.whyUsSection}>
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
            <button className={styles.mainButton}>
              <span>{t("cta")}</span>
              <div className={styles.btnIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        <div className={styles.spacer} />

        <div className={styles.mainGrid}>
          <div className={styles.visualWrap}>
            <Image
              src="/images/why2.png"
              className={styles.backgroundVideo}
              width={500}
              height={600}
              alt="why"
            />
            <div className={styles.videoOverlay} />
            <div className={styles.visualContent}>
              <div className={styles.yearText}>(2025-26©)</div>
            </div>
          </div>

          <div className={styles.statsWrap}>
            {[
              { id: "stat1", val: "+15" },
              { id: "stat2", val: "99%" },
            ].map((stat) => (
              <div key={stat.id} className={styles.cardBlock}>
                <div className={styles.statHeader}>
                  <RollingNumber value={stat.val} />
                  <h3 className={styles.statSubtitle}>
                    {t(`${stat.id}Title`)}
                  </h3>
                </div>
                <div className={styles.cardLine}></div>
                <div className={styles.statTextArea}>
                  <p className={styles.statDescription}>
                    {t(`${stat.id}Desc`)}{" "}
                    <span className={styles.textSecondary}>
                      {t(`${stat.id}DescHighlight`)}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
