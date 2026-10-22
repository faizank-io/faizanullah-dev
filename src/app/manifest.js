export default function manifest() {
  return {
    name: "Faizan Ullah — Full Stack Engineer",
    short_name: "Faizan Ullah",
    description:
      "Official portfolio of Faizan Ullah, Full Stack Engineer specializing in React.js, Next.js, Node.js, PHP, and Laravel.",
    start_url: "/",
    display: "standalone",
    background_color: "#06080f",
    theme_color: "#06080f",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}
