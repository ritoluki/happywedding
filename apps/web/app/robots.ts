import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL ?? "https://example.com";
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/dat-hang/thanh-toan/return"] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
