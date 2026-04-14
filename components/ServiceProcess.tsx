import { useState } from "react";
import styles from "./ServiceProcess.module.css";

const STEPS = [
  {
    id: "01",
    title: "Consultation",
    displayTitle: "Brand Insight & Consultation",
    desc: "브랜드의 방향성과 목표를 깊이 있게 파악합니다.\n상담을 통해 프로젝트의 전체 방향을 설정합니다.",
    checks: ["카카오톡/이메일 문의", "1:1 맞춤 상담", "브랜드 방향성 정리"],
  },
  {
    id: "02",
    title: "Quote & Contract",
    displayTitle: "Quote & Agreement",
    desc: "제작 범위에 따른 견적을 안내드립니다.\n계약서 작성 및 결제를 통해 프로젝트가 확정됩니다.",
    checks: [
      "맞춤 견적 안내",
      "계약서 작성",
      "카드/현금 결제 가능",
      "작업 일정 확정",
    ],
  },
  {
    id: "03",
    title: "Strategy",
    displayTitle: "Strategy & Planning",
    desc: "브랜드 분석을 바탕으로 사이트 구조와 전략을 설계합니다.\n사용자 흐름과 메시지를 중심으로 기획을 완성합니다.",
    checks: ["사이트맵 설계", "와이어프레임 기획", "전략 방향 수립"],
  },
  {
    id: "04",
    title: "Design",
    displayTitle: "Visual & Storytelling",
    desc: "브랜드의 메시지를 시각적으로 풀어냅니다.\n자료와 레퍼런스를 기반으로 디자인 작업을 진행합니다.",
    checks: ["레퍼런스 수집", "UI/UX 디자인", "카피라이팅 포함"],
  },
  {
    id: "05",
    title: "Draft",
    displayTitle: "First Draft Delivery",
    desc: "합의된 일정에 맞춰 1차 시안을 제작합니다.\nPC 기준으로 전체 구조와 디자인을 확인할 수 있습니다.",
    checks: ["1차 시안 제작", "PC 버전 우선 작업", "디자인 검토"],
  },
  {
    id: "06",
    title: "Refinement",
    displayTitle: "Mobile Optimization",
    desc: "피드백을 반영하여 완성도를 높입니다.\n모바일 반응형 작업을 통해 모든 환경에 최적화합니다.",
    checks: ["피드백 반영", "모바일 최적화", "디테일 보완"],
  },
  {
    id: "07",
    title: "Launch",
    displayTitle: "Final Delivery & Support",
    desc: "최종 시안을 전달하고 사이트를 배포합니다.\n운영 가이드와 유지보수를 통해 안정적으로 관리합니다.",
    checks: [
      "최종 시안 전달",
      "도메인/호스팅 연결",
      "운영 가이드 제공",
      "유지보수 지원",
    ],
  },
];

export default function ServiceProcess() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className={styles.container}>
      {/* 사이드바가 모바일에서는 상단 가로 탭이 됩니다 */}
      <div className={styles.sidebar}>
        {STEPS.map((step, index) => (
          <div
            key={step.id}
            className={`${styles.tab} ${activeStep === index ? styles.tabActive : ""}`}
            onClick={() => setActiveStep(index)}
          >
            <span className={styles.tabNumber}>{step.id}</span>
            <span className={styles.tabTitle}>{step.title}</span>
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <h2 className={styles.stepTitle}>{STEPS[activeStep].displayTitle}</h2>
        <p className={styles.description}>{STEPS[activeStep].desc}</p>
        <ul className={styles.checklist}>
          {STEPS[activeStep].checks.map((item, idx) => (
            <li key={idx} className={styles.checkItem}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
