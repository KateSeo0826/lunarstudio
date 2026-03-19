"use client";

import { useState, use } from "react";
import styles from "./ProjectDetail.module.css";
import { useTranslations } from "next-intl";

interface ProjectDetailProps {
  params: Promise<{ id: string }>;
}
export default function ProjectDetail({ params }: ProjectDetailProps) {
  const { id } = use(params);
  const t = useTranslations("projects");
  const [device, setDevice] = useState("pc");

  const projectUrl = t(`items.${id}.url`);
  const services = t.raw(`items.${id}.services`) || [];
  const stacks = t.raw(`items.${id}.stack`) || [];
  const approach = t.raw(`items.${id}.details.approach`) || [];

  return (
    <section className={styles.projectShowcase}>
      <div className={styles.container}>
        <div className={styles.projectLeft}>
          <h1 className={styles.title}>{t(`items.${id}.name`)}</h1>

          <div className={styles.caseStudy}>
            <div className={styles.detailItem}>
              <h4 className={styles.label}>Problem</h4>
              <p className={styles.text}>{t(`items.${id}.details.problem`)}</p>
            </div>

            <div className={styles.detailItem}>
              <h4 className={styles.label}>Approach</h4>
              <ul className={styles.list}>
                {approach.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.detailItem}>
              <h4 className={styles.label}>Solution & Outcome</h4>
              <p className={styles.text}>{t(`items.${id}.details.solution`)}</p>
            </div>
          </div>

          <div className={styles.infoDivider}></div>
          <div className={styles.metaSection}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Client:</span>
              <div className={styles.metaValue}>
                <span className={styles.metaDot}></span>
                {t(`items.${id}.client`)}
              </div>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Services:</span>
              <div className={styles.metaValueWrap}>
                {services.map((service: string, index: number) => (
                  <div key={index} className={styles.metaValue}>
                    <span className={styles.metaDot}></span>
                    {service}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Stack:</span>
              <div className={styles.metaValueWrap}>
                {stacks.map((stack: string, index: number) => (
                  <div key={index} className={styles.metaValue}>
                    <span className={styles.metaDot}></span>
                    {stack}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <a
            href={projectUrl}
            className={styles.viewBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            VIEW PROJECT ↗
          </a>
        </div>

        <div className={styles.projectRight}>
          <div className={styles.deviceToggle}>
            <button
              onClick={() => setDevice("pc")}
              className={device === "pc" ? styles.active : ""}
            >
              PC
            </button>
            <button
              onClick={() => setDevice("mobile")}
              className={device === "mobile" ? styles.active : ""}
            >
              MOBILE
            </button>
          </div>
          <div className={`${styles.mockup} ${styles[device]}`}>
            <iframe
              src={projectUrl}
              title="Project Preview"
              key={projectUrl}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
