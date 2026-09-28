
import type { MetadataRoute } from "next";
import { getPublishedJournalSlugs } from "@/sanity/lib/queries";

const baseUrl = "https://lunar-studio.ca";

const routes = ["", "about", "projects", "service", "blog", "contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const urls: MetadataRoute.Sitemap = [];

    routes.forEach((route) => {
        const koreanUrl = `${baseUrl}${route ? "/" + route : ""}`;
        const englishUrl = `${baseUrl}/en${route ? "/" + route : ""}`;

        urls.push({
            url: koreanUrl,
            lastModified: new Date(),
            alternates: {
                languages: {
                    en: englishUrl,
                },
            },
        });
    });

    const [koPosts, enPosts] = await Promise.all([
        getPublishedJournalSlugs("ko"),
        getPublishedJournalSlugs("en"),
    ]);

    koPosts.forEach((post) => urls.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
    }));
    enPosts.forEach((post) => urls.push({
        url: `${baseUrl}/en/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
    }));

    return urls;
}
