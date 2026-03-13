"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./contact.module.css";
import QuickHelp from "../../../components/QuickHelp";

// 1. 반드시 'export default'가 붙어야 합니다.
export default function ContactPage() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      setStatus("SUCCESS");
      form.reset();
    } catch (error) {
      setStatus("ERROR");
    }
  };

  const up = { initial: { y: "100%" }, animate: { y: 0 } };
  const down = { initial: { y: "-100%" }, animate: { y: 0 } };

  return (
    <>
      <main className={styles.container}>
        <div className={styles.bgTextContainer}>
          <div style={{ display: "flex", overflow: "hidden" }}>
            <motion.span
              variants={up}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.8 }}
              className={styles.bgText}
            >
              GET&nbsp;
            </motion.span>
            <motion.span
              variants={down}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.8 }}
              className={`${styles.bgText} ${styles.gray}`}
            >
              IN&nbsp;TOUCH
            </motion.span>
          </div>
        </div>

        <motion.div
          className={styles.formCard}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className={styles.star}>✻</span>
          <p className={styles.formDescription}>
            Let’s bring your brand vision to life.
          </p>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />

            <div className={styles.inputGroup}>
              <label className={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address</label>
              <input
                type="email"
                name="email"
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Message</label>
              <textarea
                name="message"
                className={styles.textarea}
                rows={4}
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              {status === "SUCCESS" ? "SENT! ✓" : "SEND MESSAGE"}
            </button>
          </form>
        </motion.div>
      </main>
      <QuickHelp />
    </>
  );
}
