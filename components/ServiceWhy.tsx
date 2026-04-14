"use client";

import { motion } from "framer-motion";
import styles from "./ServiceWhy.module.css";

export default function ServiceWhy() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: "easeOut" },
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div className={styles.topContent} {...fadeInUp}>
          <span className={styles.label}>• Why Lunar Studio</span>
          <h2 className={styles.title}>
            내 브랜드가 우선순위에서 밀릴까 고민되시나요?
            <br />
            루나르스튜디오는{" "}
            <span className={styles.blueText}>가장 가까운 파트너</span>가 되기로
            했습니다.
          </h2>
        </motion.div>
        <div className={styles.dividerWrapper}>
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 2.5, delay: 1.2, ease: [0.33, 1, 0.68, 1] }}
            className={styles.divider}
          />
        </div>
        <div className={styles.grid}>
          <motion.div
            className={styles.questionBox}
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <h3>누구나 할 수 있는 걱정이에요.</h3>
            <p className={styles.description}>
              수십 개의 프로젝트가 동시에 돌아가는 환경에서는 담당자가 바뀌거나
              소통이 늦어지는 일이 생기곤 합니다. 내 소중한 프로젝트가 뒷전이
              되지 않을까 하는 걱정은 당연합니다.
            </p>
          </motion.div>

          <div className={styles.arrowWrapper}>
            <svg
              className={styles.arrowIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </div>

          <motion.div
            className={styles.answerBox}
            {...fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <h3>불안함 대신, '확신'을 드리고 싶습니다.</h3>
            <p className={styles.description}>
              <span className={styles.highlightDesc}>
                처음부터 끝까지 책임지는 든든함.
              </span>
              <br />
              루나르스튜디오가 선택한 '집중'의 방식이 당신의 브랜드에는 흔들리지
              않는 확신이 될 것입니다. 우리는 더 많은 프로젝트보다, 더 깊은
              파트너십에 가치를 둡니다.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
