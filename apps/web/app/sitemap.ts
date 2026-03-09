import { MetadataRoute } from "next";
import { getSupabase } from "@/lib/supabase";
import { getActiveTemplates } from "@wedding-invitation/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL ?? "https://example.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/dat-hang`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  try {
    const supabase = getSupabase();
    const templates = await getActiveTemplates(supabase);
    const templatePages: MetadataRoute.Sitemap = templates.map((t) => ({
      url: `${baseUrl}/dat-hang?template=${t.slug}`,
      lastModified: new Date(t.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
    return [...staticPages, ...templatePages];
  } catch {
    return staticPages;
  }
}
