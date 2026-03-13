"use client";

import { motion } from "framer-motion";
import styles from "./CoreValueSection.module.css";

// 미디어팔레트와 동일한 애니메이션 세팅
const moveDown = {
  initial: { y: -60, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true },
  transition: { duration: 2.0, ease: [0.22, 1, 0.36, 1] },
};

const lineDraw = {
  initial: { width: 0 },
  whileInView: { width: "100%" },
  viewport: { once: true },
  transition: { duration: 4.0, delay: 0.5, ease: "easeInOut" },
};

const textGradientReveal = {
  initial: { backgroundPosition: "100% 0%" },
  whileInView: { backgroundPosition: "0% 0%" },
  viewport: { once: true },
  transition: { duration: 2.5, delay: 3.0, ease: "easeInOut" },
};

export default function CoreValueSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* 상단 헤더 영역 */}
        <div className={styles.header}>
          <motion.span {...moveDown} className={styles.subTag}>
            Lunar Studio Core Value
          </motion.span>
          <motion.div {...lineDraw} className={styles.line} />
        </div>

        {/* 메인 슬로건: 4줄 레이아웃 */}
        <div className={styles.sloganArea}>
          <motion.div
            {...moveDown}
            transition={{ delay: 1.5 }}
            className={styles.sloganText}
          >
            {/* 1줄 */}
            <p className={styles.fullRow}>한 번 봄으로</p>

            {/* 2줄 */}
            <p className={styles.fullRow}>
              그 브랜드의 특별한 경험을 간직하기 때문입니다.
            </p>

            {/* 3줄: 핵심 가치 (보라색 물듦) */}
            <div className={styles.inlineRow}>
              <motion.span
                variants={textGradientReveal}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className={styles.colorChangeText}
              >
                이어지고,
              </motion.span>
              <motion.span
                variants={textGradientReveal}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className={styles.colorChangeText}
                transition={{ ...textGradientReveal.transition, delay: 3.8 }}
              >
                남겨지며,
              </motion.span>
              <motion.span
                variants={textGradientReveal}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className={styles.colorChangeText}
                transition={{ ...textGradientReveal.transition, delay: 4.6 }}
              >
                잊지 않도록
              </motion.span>
            </div>

            {/* 4줄 */}
            <p className={styles.fullRow}>
              사람들에게 당신의 순간을 기억나게 만들겠습니다.
            </p>
          </motion.div>
        </div>

        {/* 하단 상세 그리드: 오른쪽 아래 설명 배치 */}
        <div className={styles.bottomGrid}>
          <motion.div
            {...moveDown}
            transition={{ delay: 2.0 }}
            className={styles.symbolWrapper}
          >
            {/* 루나르 스튜디오 상징 (별/달 아이콘) */}
            <div className={styles.starSymbol}>✦</div>
          </motion.div>

          <motion.div
            {...moveDown}
            transition={{ delay: 2.2 }}
            className={styles.descriptionWrapper}
          >
            <p className={styles.descContent}>
              소비자들의 경험이 이어지고 남겨지며 잊지 않도록
              <br />
              핵심 가치를 설정하고 이를 바탕으로 브랜드 이미지를 설계합니다.
            </p>
            <p className={styles.descFooter}>
              당신의 모든 순간에 함께하는{" "}
              <span className={styles.purpleHighlight}>Lunar Studio</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
