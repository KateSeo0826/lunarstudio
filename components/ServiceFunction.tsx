import React from "react";
import styles from "./ServiceFunction.module.css";

export default function ServiceFunction() {
  const processes = [
    {
      number: "01",
      title: "브랜드의 본질을 먼저 꿰뚫습니다.",
      desc: (
        <>
          업종, 타겟, 시장, 경쟁 구조까지 — 표면이 아닌 본질을 분석합니다.{" "}
          <br />
          <strong>
            이 과정 없이 만들어진 홈페이지는, 아무것도 전달하지 못합니다.
          </strong>
        </>
      ),
      tag: "Brand Strategy",
    },
    {
      number: "02",
      title: "메시지가 중심이 되는 구조를 설계합니다.",
      desc: (
        <>
          디자인이 아니라, ‘전달’이 먼저입니다. <br />
          <strong>
            사용자의 시선과 흐름을 설계해, 메시지가 가장 강하게 남도록 만듭니다.
          </strong>
        </>
      ),
      tag: "Strategic Structure",
    },
    {
      number: "03",
      title: "브랜드의 언어로 스토리를 만듭니다.",
      desc: (
        <>
          단순한 카피가 아닌, 브랜드를 기억시키는 문장을 만듭니다. <br />
          <strong>
            트렌디하면서도 차별화된 스토리텔링으로, 인상을 남깁니다.
          </strong>
        </>
      ),
      tag: "Storytelling",
    },
    {
      number: "04",
      title: "강렬하게 기억되는 결과를 만듭니다.",
      desc: (
        <>
          비슷한 디자인은 의미 없습니다. <br />
          <strong>
            차별화된 메시지와 결과물로, 브랜드를 ‘다르게’ 각인시킵니다.
          </strong>
        </>
      ),
      tag: "Impact",
    },
  ];

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          템플릿을 사지 않습니다.
          <br />
          <span className={styles.titleHighlight}>처음부터</span> 설계합니다.
        </h2>
        <p className={styles.subtitle}>
          이미지만 바꾸는 방식이 아닙니다.
          <br />
          <strong>브랜드 스토리와 정체성에 맞게,</strong>
          <br />
          세상에 하나뿐인 홈페이지를 만들겠습니다.
        </p>
      </header>

      <div className={styles.list}>
        {processes.map((item, idx) => (
          <div
            key={item.number}
            className={`${styles.listItem} ${idx === 0 ? styles.firstItem : ""}`}
          >
            <div className={styles.itemNumber}>{item.number}</div>
            <div className={styles.itemContent}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDesc}>{item.desc}</p>
            </div>
            <div>
              <span className={styles.itemTag}>{item.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
