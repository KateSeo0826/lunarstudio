"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./contact.module.css";
import QuickHelp from "../../../components/QuickHelp";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // JSON 데이터로 변환
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("SUCCESS");
        form.reset();
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      console.error(error);
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
  
  {status === "SUCCESS" ? (
    /* ✅ 성공 시 보여줄 뷰 */
    <motion.div 
      className={styles.successView}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <h2 className={styles.successTitle}>Thank You!</h2>
      <p className={styles.successText}>
        Your message has been sent successfully.<br />
        We'll get back to you as soon as possible.
      </p>
      <button 
        onClick={() => setStatus("IDLE")} 
        className={styles.resetBtn}
      >
        Send another message
      </button>
    </motion.div>
  ) : (
    /* 📝 기존 폼 뷰 */
    <>
      <p className={styles.formDescription}>
        Let’s bring your brand vision to life.
      </p>

      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Name</label>
          <input type="text" name="name" className={styles.input} required />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email Address</label>
          <input type="email" name="email" className={styles.input} required />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Message</label>
          <textarea name="message" className={styles.textarea} rows={4} required />
        </div>

        <button 
          type="submit" 
          className={styles.submitBtn}
          disabled={status === "SENDING"}
        >
          {status === "SENDING" ? "SENDING..." : "SEND MESSAGE"}
        </button>
        
        {status === "ERROR" && (
          <p className={styles.errorMsg}>Something went wrong. Please try again.</p>
        )}
      </form>
    </>
  )}
</motion.div>
      </main>
      <QuickHelp />
    </>
  );
}
