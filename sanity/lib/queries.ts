import {draftMode} from "next/headers";
import {sanityClient} from "./client";
import type {JournalPost, JournalSummary} from "./types";

const publishedFilter = `defined(publishedAt) && publishedAt <= now()`;
const summaryFields = `_id, title, "slug": slug.current, excerpt, "category": coalesce(category->title[$locale], category->title.en), language, publishedAt, "updatedAt": _updatedAt, coverImage`;

export async function getJournalPosts(locale: string): Promise<JournalSummary[]> {
  if (!sanityClient) return [];
  const {isEnabled} = await draftMode();
  const token = isEnabled ? process.env.SANITY_API_READ_TOKEN : undefined;
  return sanityClient.withConfig({useCdn: !isEnabled}).fetch(
    `*[_type == "journal" && language == $locale && ${publishedFilter}] | order(publishedAt desc) {${summaryFields}}`,
    {locale},
    {perspective: isEnabled ? "drafts" : "published", token, next: isEnabled ? {revalidate: 0} : {tags: ["journal", `journal-${locale}`]}},
  );
}

export async function getJournalPost(locale: string, slug: string): Promise<JournalPost | null> {
  if (!sanityClient) return null;
  const {isEnabled} = await draftMode();
  const token = isEnabled ? process.env.SANITY_API_READ_TOKEN : undefined;
  return sanityClient.withConfig({useCdn: !isEnabled}).fetch(
    `*[_type == "journal" && language == $locale && slug.current == $slug && ${publishedFilter}][0]{${summaryFields}, body, hasAffiliateLinks, affiliateDisclosure, seoTitle, seoDescription, "translations": *[_type == "translation.metadata" && references(^._id)][0].translations[].value->{language, "slug": slug.current}}`,
    {locale, slug},
    {perspective: isEnabled ? "drafts" : "published", token, next: isEnabled ? {revalidate: 0} : {tags: ["journal", `journal-${locale}`, `journal-${locale}-${slug}`]}},
  );
}

export async function getPublishedJournalSlugs(locale: string): Promise<Array<{slug: string; updatedAt: string}>> {
  if (!sanityClient) return [];
  return sanityClient.fetch(
    `*[_type == "journal" && language == $locale && ${publishedFilter}][]{"slug": slug.current, "updatedAt": _updatedAt}`,
    {locale},
    {perspective: "published", next: {tags: ["journal", `journal-${locale}`]}},
  );
}
