"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion"; // 추가
import styles from "./Navbar.module.css";
import LocaleSwitcher from "./LocaleSwitcher";
import { useTranslations } from "next-intl";

// 애니메이션 설정
const charVariants = {
  initial: { y: 0, opacity: 1 },
  hover: (i: number) => ({
    y: [0, -8, 8, 0],
    opacity: [1, 0, 0, 1],
    transition: {
      duration: 0.5,
      delay: i * 0.03,
      ease: "easeInOut",
    },
  }),
};

// 글자 분리 컴포넌트 (반복 사용을 위해 내부 정의)
const AnimatedLabel = ({ label }: { label: string }) => (
  <motion.span
    initial="initial"
    whileHover="hover"
    style={{ display: "inline-flex", overflow: "hidden" }}
  >
    {label.split("").map((char, i) => (
      <motion.span
        key={i}
        custom={i}
        variants={charVariants}
        style={{ display: "inline-block", whiteSpace: "pre" }}
      >
        {char}
      </motion.span>
    ))}
  </motion.span>
);

export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations("navbar");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  const moreItems = useMemo(
    () => [
      { href: "/projects", label: t("projects"), no: "03" },
      { href: "/services", label: t("services"), no: "04" },
      { href: "/blog", label: t("blog"), no: "05" },
    ],
    [t],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) {
      document.addEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className={`${styles.wrap} ${scrolled ? styles.wrapScrolled : ""}`}>
        <nav className={styles.navbar}>
          <div className={styles.left}>
            <Link href="/" className={styles.brand}>
              <span className={styles.brandName}>LUNAR STUDIO</span>
              <span className={styles.brandSub}>BRANDING STUDIO</span>
            </Link>
          </div>

          <div className={styles.right}>
            <ul className={styles.pills}>
              <li>
                <Link
                  href="/"
                  className={`${styles.pill} ${isActive("/") ? styles.active : ""}`}
                >
                  <AnimatedLabel label={t("home")} />
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`${styles.pill} ${isActive("/about") ? styles.active : ""}`}
                >
                  <AnimatedLabel label={t("about")} />
                </Link>
              </li>
              <li className={styles.pillsHideSm}>
                <Link
                  href="/projects"
                  className={`${styles.pill} ${isActive("/projects") ? styles.active : ""}`}
                >
                  <AnimatedLabel label={t("projects")} />
                </Link>
              </li>
              <li className={styles.pillsHideSm}>
                <Link
                  href="/contact"
                  className={`${styles.pill} ${isActive("/contact") ? styles.active : ""}`}
                >
                  <AnimatedLabel label={t("contact")} />
                </Link>
              </li>
            </ul>
            <div className={styles.locale}>
              <LocaleSwitcher />
            </div>
            <button
              type="button"
              className={styles.circleButton}
              onClick={() => setOpen(true)}
            >
              <span className={styles.circleIcon} />
            </button>
          </div>
        </nav>
      </div>

      <div
        className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
        onClick={() => setOpen(false)}
      />

      <aside
        id="more-menu"
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
      >
        <div className={styles.panelTop}>
          <div className={styles.panelBrand}>
            <span className={styles.panelBrandName}>LUNAR STUDIO</span>
            <span className={styles.panelBrandSub}>BRANDING STUDIO</span>
          </div>
          <button
            type="button"
            className={styles.circleButton}
            onClick={() => setOpen(false)}
          >
            <span className={styles.circleIcon} />
          </button>
        </div>

        <div className={styles.card}>
          <ul className={styles.menuList}>
            <li>
              <Link
                href="/"
                className={styles.menuItem}
                onClick={() => setOpen(false)}
              >
                <span className={styles.menuLabel}>
                  <AnimatedLabel label={t("home")} />
                </span>
                <span className={styles.menuNo}>(01)</span>
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={styles.menuItem}
                onClick={() => setOpen(false)}
              >
                <span className={styles.menuLabel}>
                  <AnimatedLabel label={t("about")} />
                </span>
                <span className={styles.menuNo}>(02)</span>
              </Link>
            </li>
            {moreItems.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  className={styles.menuItem}
                  onClick={() => setOpen(false)}
                >
                  <span className={styles.menuLabel}>
                    <AnimatedLabel label={it.label} />
                  </span>
                  <span className={styles.menuNo}>({it.no})</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className={styles.menuItem}
                onClick={() => setOpen(false)}
              >
                <span className={styles.menuLabel}>
                  <AnimatedLabel label={t("contact")} />
                </span>
                <span className={styles.menuNo}>(06)</span>
              </Link>
            </li>
          </ul>

          <div className={styles.panelFooter}>
            <Link
              href="/contact"
              className={styles.cta}
              onClick={() => setOpen(false)}
            >
              <span>Get In Touch</span>
              <span className={styles.ctaStar}>✦</span>
            </Link>
            <div className={styles.panelLocale}>
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
