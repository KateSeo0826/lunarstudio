"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import styles from "./OurServices.module.css";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function OurServices() {
  const t = useTranslations("ourServices");
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // 마우스 좌표 로직
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  const servicesData = t.raw("services") || {};
  const serviceKeys = Object.keys(servicesData);

  return (
    <main className={styles.container}>
      <motion.div
        className={styles.cursor}
        style={{ x: springX, y: springY }}
        animate={{ scale: hoveredKey ? 3.5 : 1 }}
      />

      <div className={styles.inner}>
        <div className={styles.headerArea}>
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

        {/* 리스트 영역 */}
        <div className={styles.serviceList}>
          {serviceKeys.map((key, index) => {
            const item = servicesData[key];
            if (!item) return null;

            return (
              <div
                key={key}
                className={styles.serviceItem}
                onMouseEnter={() => setHoveredKey(key)}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <div className={styles.itemContent}>
                  <div className={styles.titleWrap}>
                    <span className={styles.itemNumber}>
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <h3 className={styles.title}>{item.title}</h3>
                  </div>

                  <div className={styles.tagContainer}>
                    {Array.isArray(item.tags) &&
                      item.tags.map((tag: string) => (
                        <span key={`${key}-${tag}`} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>

                <AnimatePresence>
                  {hoveredKey === key && (
                    <motion.div
                      className={styles.imageFollower}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        x: springX,
                        y: springY,
                        translateX: "30px",
                        translateY: "30px",
                        pointerEvents: "none",
                        zIndex: 100,
                      }}
                    >
                      <Image
                        src={item.image}
                        className={styles.previewImage}
                        width={150}
                        height={200}
                        alt="preview"
                        unoptimized
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
