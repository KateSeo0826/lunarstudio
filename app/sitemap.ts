
import type { MetadataRoute } from "next";

const baseUrl = "https://lunar-studio.ca";

const routes = ["", "about", "projects", "service", "contact"];

export default function sitemap(): MetadataRoute.Sitemap {
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

    return urls;
}