"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./HeroBottom.module.css"; // CSS Module 임포트

const services = [
  "Brand Strategy",
  "Visual Identity",
  "Website Design",
  "Brand Consulting",
];

export default function HeroBottom() {
  const ITEM_HEIGHT = 24;

  return (
    <div className={styles.headerContainer}>
      <div className={styles.innerGrid}>
        {/* Instagram */}
        <SocialIcon href="https://www.instagram.com/__lunar.studio/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </SocialIcon>

        {/* Linkedin */}
        <SocialIcon href="https://linkedin.com">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </SocialIcon>

        <div className={styles.marqueeContainer}>
          <motion.div
            animate={{
              y: services.map((_, i) => -i * ITEM_HEIGHT),
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...services, services[0]].map((service, index) => (
              <div key={index} className={styles.serviceText}>
                {service}
              </div>
            ))}
          </motion.div>
        </div>

        <SocialIcon href="https://behance.net">
          <span
            style={{
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "-0.05em",
            }}
          >
            Bē
          </span>
        </SocialIcon>

        <SocialIcon href="https://dribbble.com">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8.5 2.8c3.5 2 5.8 6 6.5 10.3" />
            <path d="M2 12c7 0 11-1.2 15-5.3" />
            <path d="M5 20c1-3.5 3-9 14.5-9" />
          </svg>
        </SocialIcon>
      </div>
    </div>
  );
}

function SocialIcon({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a href={href} target="_blank" className={styles.socialLink}>
      {children}
    </a>
  );
}
