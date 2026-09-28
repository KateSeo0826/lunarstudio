import type {PortableTextBlock} from "@portabletext/types";

export type SanityImage = {
  asset?: {_ref?: string};
  alt?: string;
  caption?: string;
  hotspot?: {x: number; y: number; height: number; width: number};
  crop?: {top: number; bottom: number; left: number; right: number};
};

export type JournalSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  language: "ko" | "en";
  publishedAt: string;
  updatedAt: string;
  coverImage: SanityImage;
};

export type JournalPost = JournalSummary & {
  body: PortableTextBlock[];
  hasAffiliateLinks: boolean;
  affiliateDisclosure?: string;
  seoTitle?: string;
  seoDescription?: string;
  translations: Array<{language: "ko" | "en"; slug: string}>;
};
