export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://faizanullahdevs.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep /_next/ crawlable so Google can render the page's JS and CSS.
      disallow: ["/api/", "/private/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
