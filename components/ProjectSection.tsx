"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import projectsData from "../data/projects.json";
import styles from "./ProjectSection.module.css";
import Link from "next/link";
interface ProjectSectionProps {
  isWhite?: boolean;
}

export default function ProjectSection({
  isWhite = false,
}: ProjectSectionProps) {
  const sectionClass = `${styles.section} ${isWhite ? styles.whiteBackground : ""}`;
  const t = useTranslations("projects");
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={containerRef} className={sectionClass}>
      <div className={styles.container}>
        <div className={styles.topGrid}>
          <motion.div
            style={{ y: textY, opacity }}
            className={styles.titleArea}
          >
            <div className={styles.headingWrap}>
              <h2
                className={styles.heading}
                style={{ color: isWhite ? "#000" : "var(--white)" }}
              >
                <span className={styles.dot}></span>
                <span className={styles.titleText}>
                  {t("titlePart1")}
                  <br />
                  <span className={styles.highlight}>{t("titlePart2")}</span>
                </span>
              </h2>
            </div>
          </motion.div>
          <div className={styles.year}>{t("currentYear")}</div>
        </div>

        <div className={styles.projectList}>
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              t={t}
            />
          ))}
        </div>
        <div className={styles.buttonWrapper}>
          <motion.button
            className={styles.allProjectsBtn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link className={styles.link} href={"/contact"}>
              Contact Us
            </Link>
            <div className={styles.btnIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, t }: any) {
  const rowIndex = Math.floor(index / 2);
  const stickyTop = 80 + rowIndex * 30;
  return (
    <div
      className={styles.cardWrapper}
      style={{
        position: "sticky",
        top: `${stickyTop}px`,
        zIndex: index,
      }}
    >
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <div className={styles.info}>
            <span className={styles.name}>{t(`items.${project.id}.name`)}</span>
            <span className={styles.sep}>—</span>
            <span className={styles.cat}>
              {t(`items.${project.id}.category`)}
            </span>
          </div>
          <a href={project.link} className={styles.arrow}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
        <motion.div
          className={styles.cardContent}
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          <div className={styles.imgBox}>
            <Image
              src={project.image}
              className={styles.img}
              alt="project"
              width={600}
              height={500}
            />
            <motion.div
              className={styles.overlay}
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 0.35 },
              }}
              transition={{ duration: 0.3 }}
            />
            <div className={styles.logoContainer}>
              <motion.div
                className={styles.logoItem}
                variants={{
                  rest: { y: 0, opacity: 1, rotateX: 0 },
                  hover: { y: -40, opacity: 0, rotateX: -90 },
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Image
                  src={project.logo}
                  className={styles.logo}
                  alt="logo"
                  width={50}
                  height={50}
                />
              </motion.div>

              <motion.div
                className={styles.logoItem}
                style={{ position: "absolute", top: 0 }}
                variants={{
                  rest: { y: 40, opacity: 0, rotateX: 90 },
                  hover: { y: 0, opacity: 1, rotateX: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <img src={project.logo} className={styles.logo} alt="logo" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
