"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./Footer.module.css";
import {
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaFacebookF,
} from "react-icons/fa6";
import Image from "next/image";

const navItems = [
  { name: "HOME", path: "/" },
  { name: "ABOUT", path: "/about" },
  { name: "PROJECTS", path: "/projects" },
  { name: "SERVICES", path: "/services" },
  { name: "BLOG", path: "https://blog.naver.com/violetds03" },
  { name: "CONTACT", path: "/contact" },
];

const charVariants = {
  initial: { y: 0, opacity: 1 },
  hover: (i: number) => ({
    y: [0, -10, 10, 0],
    opacity: [1, 0, 0, 1],
    transition: {
      duration: 0.5,
      delay: i * 0.03,
      ease: "easeInOut" as const,
    },
  }),
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandColumn}>
            <h2 className={styles.logo}>LunarStudio</h2>
            <div className={styles.socials}>
              <Link href="https://www.instagram.com/__lunar.studio/">
                <FaInstagram />
              </Link>
              <Link href="https://x.com/">
                <FaXTwitter />
              </Link>
              <Link href="https://www.linkedin.com/">
                <FaLinkedinIn />
              </Link>
              <Link href="https://www.facebook.com/">
                <FaFacebookF />
              </Link>
            </div>
            <address className={styles.address}>
              118 Balliol St, Suite 808,
              <br />
              Toronto, ON M4S 0A9
            </address>
            <div className={styles.contact}>
              <Link className={styles.link} href="tel:+14376085544">
                +1 (437) 608-5544 ↗
              </Link>
              <Link
                className={styles.link}
                href="mailto:studio.lunacode@gmail.com"
              >
                studio.lunacode@gmail.com ↗
              </Link>
            </div>
          </div>

          <nav className={styles.navColumn}>
            <p className={styles.navTitle}>Navigation</p>
            <ul>
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.path}>
                    {" "}
                    <motion.span
                      className={styles.navLink}
                      initial="initial"
                      whileHover="hover"
                    >
                      {item.name.split("").map((char, i) => (
                        <motion.span
                          key={i}
                          custom={i}
                          variants={charVariants}
                          style={{ display: "inline-block" }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.ctaColumn}>
            <div className={styles.subtitleMask}>
              <Image
                width={16}
                height={16}
                src="/images/star-icon.svg"
                alt="asterisk"
                className={styles.asterisk}
              />
              <motion.div
                className={styles.subtitleWrapper}
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span className={styles.subtitle}>DRIVEN BY DESIGN-</span>
                <span className={styles.subtitle}>DRIVEN BY DESIGN-</span>
                <span className={styles.subtitle}>DRIVEN BY DESIGN-</span>
                <span className={styles.subtitle}>DRIVEN BY DESIGN</span>
              </motion.div>
            </div>
            <button className={styles.buyBtn}>Get In Touch ✦</button>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <div className={styles.copyright}>
            © 2026 Lunar Studio | Created by <strong>Lunar Studio</strong>
          </div>
          {/* <div className={styles.legalLinks}>
            <Link href="#">Style Guide</Link>
            <Link href="#">Licenses</Link>
            <Link href="#">Changelog</Link>
            <Link href="#">Instructions</Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
