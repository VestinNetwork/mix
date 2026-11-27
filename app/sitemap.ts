import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!configuredUrl) return [];

  const root = configuredUrl.replace(/\/$/, "");
  return [
    { url: root, changeFrequency: "weekly", priority: 1 },
    { url: `${root}/playground`, changeFrequency: "monthly", priority: 0.7 }
  ];
}
