import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://mix.example";
  const root = baseUrl.replace(/\/$/, "");
  return [
    { url: root, changeFrequency: "weekly", priority: 1 },
    { url: `${root}/playground`, changeFrequency: "monthly", priority: 0.7 }
  ];
}
