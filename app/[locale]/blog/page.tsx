import type {Metadata} from "next";
import Link from "next/link";
import JournalImage from "@/components/JournalImage";
import {getJournalPosts} from "@/sanity/lib/queries";
import styles from "./journal.module.css";

const copy = {
  ko: {eyebrow: "LUNAR STUDIO JOURNAL", title: "일과 삶, 그리고 만드는 과정의 기록", intro: "프리랜서의 일상과 Lunar Studio를 만들어가는 과정, 캐나다 생활과 직접 경험한 도구를 기록합니다.", empty: "아직 발행된 글이 없습니다.", read: "글 읽기"},
  en: {eyebrow: "LUNAR STUDIO JOURNAL", title: "Notes on work, life, and building", intro: "Stories about freelance life, building Lunar Studio, life in Canada, and tools tested first-hand.", empty: "No stories have been published yet.", read: "Read story"},
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return {title: "Journal | Lunar Studio", description: copy[locale === "en" ? "en" : "ko"].intro};
}

export default async function JournalPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const language = locale === "en" ? "en" : "ko";
  const posts = await getJournalPosts(language);
  const text = copy[language];
  const blogPath = language === "en" ? "/en/blog" : "/blog";

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>{text.eyebrow}</p>
        <h1>{text.title}</h1>
        <p className={styles.intro}>{text.intro}</p>
      </header>
      {posts.length ? (
        <section className={styles.grid} aria-label="Journal posts">
          {posts.map((post, index) => (
            <article className={styles.card} key={post._id}>
              <Link href={`${blogPath}/${post.slug}`} className={styles.imageLink}>
                <JournalImage image={post.coverImage} className={styles.cardImage} priority={index === 0} sizes="(max-width: 760px) 100vw, 50vw" />
              </Link>
              <div className={styles.meta}>
                <span>{post.category}</span>
                <time dateTime={post.publishedAt}>{new Intl.DateTimeFormat(language === "ko" ? "ko-KR" : "en-CA", {dateStyle: "medium"}).format(new Date(post.publishedAt))}</time>
              </div>
              <h2><Link href={`${blogPath}/${post.slug}`}>{post.title}</Link></h2>
              <p>{post.excerpt}</p>
              <Link href={`${blogPath}/${post.slug}`} className={styles.readLink}>{text.read} →</Link>
            </article>
          ))}
        </section>
      ) : <p className={styles.empty}>{text.empty}</p>}
    </main>
  );
}
