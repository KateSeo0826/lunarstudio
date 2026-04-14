"use client";

import { motion } from "framer-motion";
import styles from "./ServiceHero.module.css";

export default function ServiceHero() {
  return (
    <section className={styles.container}>
      {/* 배경 레이어 (100% 가로폭) */}
      <div className={styles.bgWrapper}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className={`${styles.blob} ${styles.purple}`}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className={`${styles.blob} ${styles.blue}`}
        />
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className={`${styles.blob} ${styles.pink}`}
        />
      </div>

      <div className={styles.inner}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className={styles.mainTitle}>
            이어지고,
            <br />
            남겨지고,
            <br />
            잊지 않도록
          </h1>
          <h1 className={styles.mainTitle}>
            당신의 브랜드의
            <br />
            <span className={styles.highlight}>순간</span>을 기억나게
            <br />
            만들겠습니다.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className={styles.description}
        >
          <p>
            99%의 <span className={styles.highlight}>전략적 설계</span>에 1%의
            <span className={styles.highlight}>감각</span>을 더해,
          </p>
          <p>
            브랜드가 오래 기억되고 사용자가 만족하는 경험을
            <br />
            <strong>루나르 스튜디오가</strong> 만들어내겠습니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
