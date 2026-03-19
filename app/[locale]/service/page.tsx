"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import styles from "./service.module.css"; // 별도의 모듈 CSS 사용

export default function ServicePage() {
  const t = useTranslations("service");

  const moveDown = {
    initial: { y: -60, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 2.0, ease: [0.22, 1, 0.36, 1] as const },
  };

  const textGradientReveal = {
    initial: { backgroundPosition: "100% 0%" },
    whileInView: { backgroundPosition: "0% 0%" },
    viewport: { once: true },
    transition: { duration: 2.5, delay: 0.5, ease: "easeInOut" as const },
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <motion.div {...moveDown} className={styles.statusTag}>
            Coming Soon
          </motion.div>

          <motion.h1
            {...moveDown}
            transition={{ ...moveDown.transition, delay: 0.3 }}
            className={styles.mainTitle}
          >
            Something <br />
            <motion.span
              variants={textGradientReveal}
              initial="initial"
              whileInView="whileInView"
              className={styles.gradientText}
            >
              Extraordinary
            </motion.span>
          </motion.h1>

          <motion.p
            {...moveDown}
            transition={{ ...moveDown.transition, delay: 0.6 }}
            className={styles.description}
          >
            현재 서비스 페이지를 정교하게 다듬고 있습니다.
            <br />더 나은 브랜드 경험으로 곧 찾아뵙겠습니다.
          </motion.p>

          <motion.div
            {...moveDown}
            transition={{ ...moveDown.transition, delay: 0.9 }}
            className={styles.buttonWrapper}
          >
            <Link href="/" className={styles.homeLink}>
              <span>Back to Home</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </header>

        <div className={styles.footerLineWrapper}>
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 2.5, delay: 1.2, ease: [0.33, 1, 0.68, 1] }}
            className={styles.footerLine}
          />
        </div>
      </div>
    </section>
  );
}
