// app/[locale]/projects/page.tsx
"use client";

import styles from "./projects.module.css";
import ProjectSection from "../../../components/ProjectSection";
import ScrollSection from "../../../components/ScrollSection";

export default function ProjectPage() {
  return (
    <>
      <main className={styles.container}>
        <ProjectSection isWhite={true} />
      </main>
      <ScrollSection />
    </>
  );
}
