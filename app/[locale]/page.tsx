import styles from "./page.module.css";
import HeroSection from "../../components/HeroSection";
import HeroBottom from "../../components/HeroBottom";
import IntroSection from "../../components/IntroSection";
import ProjectSection from "../../components/ProjectSection";
import WhyChooseUs from "../../components/WhyChooseUs";
import OurServices from "../../components/OurServices";
import Testimonials from "../../components/Testimonials";
import QuickHelp from "../../components/QuickHelp";
import ScrollSection from "../../components/ScrollSection";
export default function Home() {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.heroSectionWrapper}>
        <HeroSection />
        <HeroBottom />
      </div>

      <IntroSection />

      <ProjectSection />
      <WhyChooseUs />
      <OurServices />
      <Testimonials />
      <QuickHelp />
      <ScrollSection />
    </main>
  );
}
