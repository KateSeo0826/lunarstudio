import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import JournalBody from "@/components/JournalBody";
import JournalImage from "@/components/JournalImage";
import {getJournalPost} from "@/sanity/lib/queries";
import {urlForImage} from "@/sanity/lib/image";
import styles from "./post.module.css";

type Props = {params: Promise<{locale: string; slug: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  const post = await getJournalPost(locale, slug);
  if (!post) return {};
  const image = post.coverImage?.asset?._ref
    ? urlForImage(post.coverImage)?.width(1200).height(630).url()
    : undefined;
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: {languages: Object.fromEntries((post.translations || []).map((item) => [item.language, `/${item.language === "ko" ? "" : "en/"}blog/${item.slug}`]))},
    openGraph: {type: "article", title: post.seoTitle || post.title, description: post.seoDescription || post.excerpt, publishedTime: post.publishedAt, modifiedTime: post.updatedAt, images: image ? [image] : undefined},
  };
}

export default async function JournalPostPage({params}: Props) {
  const {locale, slug} = await params;
  const language = locale === "en" ? "en" : "ko";
  const post = await getJournalPost(language, slug);
  if (!post) notFound();

  const disclosure = post.affiliateDisclosure || (language === "ko" ? "이 글에는 제휴 링크가 포함되어 있으며, 구매 시 추가 비용 없이 소정의 수수료를 받을 수 있습니다." : "This article contains affiliate links. We may earn a commission at no extra cost to you.");

  return (
    <main className={styles.page}>
      <article>
        <header className={styles.header}>
          <Link href={language === "en" ? "/en/blog" : "/blog"} className={styles.back}>← Journal</Link>
          <div className={styles.meta}><span>{post.category}</span><time dateTime={post.publishedAt}>{new Intl.DateTimeFormat(language === "ko" ? "ko-KR" : "en-CA", {dateStyle: "long"}).format(new Date(post.publishedAt))}</time></div>
          <h1>{post.title}</h1>
          <p className={styles.excerpt}>{post.excerpt}</p>
        </header>
        <div className={styles.cover}><JournalImage image={post.coverImage} priority sizes="100vw" className={styles.coverImage} /></div>
        <div className={styles.content}>
          {post.hasAffiliateLinks && <aside className={styles.disclosure}>{disclosure}</aside>}
          <JournalBody value={post.body || []} />
          <p className={styles.updated}>{language === "ko" ? "최근 수정" : "Last updated"}: {new Intl.DateTimeFormat(language === "ko" ? "ko-KR" : "en-CA", {dateStyle: "medium"}).format(new Date(post.updatedAt))}</p>
        </div>
      </article>
    </main>
  );
}
