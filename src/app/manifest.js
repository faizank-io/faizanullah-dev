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
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/faizan-ullah-photo.png",
        sizes: "400x400",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}
