"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const [index, setIndex] = useState(0);
  const items = ["1", "2", "3", "4", "5"];

  const nextStep = () => setIndex((prev) => (prev + 1) % items.length);
  const prevStep = () =>
    setIndex((prev) => (prev - 1 + items.length) % items.length);

  // 터치 스와이프 로직
  const onDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) nextStep();
    else if (info.offset.x > swipeThreshold) prevStep();
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* 상단 레이아웃 (기존 유지) */}
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

        <div className={styles.sliderWrapper}>
          <motion.div
            className={styles.track}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            animate={{
              x:
                typeof window !== "undefined" && window.innerWidth < 768
                  ? `calc(-${index} * (85% + 90px))`
                  : `calc(-${index} * (30% + 20px))`,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            {items.map((id) => (
              <div key={id} className={styles.card}>
                <div className={styles.cardInner}>
                  <div className={styles.cardTop}>
                    <Image
                      width={44}
                      height={44}
                      src="/images/quotes.svg"
                      className={styles.quoteIcon}
                      alt=""
                    />
                    <h3 className={styles.cardTitle}>
                      {t(`items.${id}.title`)}
                    </h3>
                  </div>
                  <p className={styles.cardText}>{t(`items.${id}.desc`)}</p>
                  <div className={styles.clientInfo}>
                    {/* <div className={styles.avatarWrap}>
                      <Image
                        width={52}
                        height={52}
                        src={t(`items.${id}.img`)}
                        alt=""
                        className={styles.avatar}
                      />
                    </div> */}
                    <div className={styles.clientDetails}>
                      <div className={styles.clientName}>
                        {t(`items.${id}.author`)}
                      </div>
                      <div className={styles.ratingRow}>
                        <span className={styles.ratingScore}>
                          {t(`items.${id}.rate`)}
                        </span>
                        <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 컨트롤러 (기존 유지) */}
        <div className={styles.controls}>
          <button onClick={prevStep} className={styles.arrowBtn}>
            ←
          </button>
          <button onClick={nextStep} className={styles.arrowBtn}>
            →
          </button>
        </div>
      </div>
    </section>
  );
}
