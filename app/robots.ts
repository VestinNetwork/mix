import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!configuredUrl) {
    // Avoid indexing against a placeholder canonical domain before deployment.
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  const baseUrl = configuredUrl.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
