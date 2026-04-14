import React from "react";
import styles from "./ServiceFeature.module.css";
import { Heart, MessageCircle, Zap } from "lucide-react";

export default function ServiceFeature() {
  const features = [
    {
      icon: <Heart size={20} className={styles.highlight} />,
      title: "브랜드의 가치를\n먼저 생각합니다.",
      desc: "단순히 기능만 작동하는 웹사이트가 아닙니다. 어떤 타겟을 만나고 싶은지, 브랜드가 전달하려는 핵심 가치부터 깊이 고민합니다.",
      tag: "브랜드 중심 설계",
    },
    {
      icon: <MessageCircle size={20} className={styles.highlight} />,
      title: "언제든 편하게\n소통하고 제안하세요.",
      desc: "복잡한 절차 없이 제작자와 실시간으로 직접 대화하세요. 유연한 소통을 통해 의도하신 바를 정확하게 결과물에 녹여냅니다.",
      tag: "1:1 다이렉트 소통",
    },
    {
      icon: <Zap size={20} className={styles.highlight} />,
      title: "지체 없는 피드백,\n완성도 높은 마감.",
      desc: "빠른 피드백 반영은 기본입니다. 마음이 바뀌셔도 괜찮습니다. 대표님이 만족하실 때까지 세밀하게 다듬어 최상의 퀄리티를 보장합니다.",
      tag: "신속한 피드백",
    },
  ];

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          대표님들의 이야기,
          <br />
          제가 먼저 <span className={styles.highlight}>헤아릴게요.</span>
        </h2>
        <p className={styles.subtitle}>
          홈페이지 제작은 단순한 작업이 아니에요.
          <br />
          브랜드의 첫인상을 함께 만드는 과정이라 생각해요.
        </p>
      </header>

      <div className={styles.grid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.iconWrapper}>{feature.icon}</div>
            <h3 className={styles.cardTitle}>{feature.title}</h3>
            <p className={styles.cardDesc}>{feature.desc}</p>
            <div>
              <span className={styles.tag}>
                <span className={styles.tagDot}>●</span> {feature.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
