import { getAllProjectIds } from "@/data/projectDetails";
import { portfolioData } from "@/data/portfolio";

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://faizanullahdevs.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...getAllProjectIds().filter((id) => !portfolioData.collapsedProjects.includes(id)).map((id) => ({
      url: `${baseUrl}/projects/${id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
