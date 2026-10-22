import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingContact from "@/components/FloatingContact";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://faizanullahdevs.com";

const siteTitle = "Faizan Ullah — Full Stack Engineer | React.js, Node.js, PHP & Laravel";
const siteDescription =
  "Faizan Ullah is a Full Stack Engineer from Karachi, Pakistan, building fast, scalable web apps with React.js, Next.js, Node.js, PHP, and Laravel — from pixel-perfect frontends to secure REST APIs, SaaS platforms, and optimized databases.";

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#06080f" },
  ],
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Faizan Ullah — Full Stack Engineer",
  },
  description: siteDescription,
  applicationName: "Faizan Ullah Portfolio",
  authors: [{ name: "Faizan Ullah", url: siteUrl }],
  generator: "Next.js",
  keywords: [
    "Faizan Ullah",
    "Faizan Ullah Developer",
    "Faizan Ullah Full Stack Engineer",
    "Faizan Ullah Full Stack Developer",
    "Faizan Ullah Laravel",
    "Faizan Ullah React",
    "Faizan Ullah Pakistan",
    "faizanullahdevs",
    "faizanullahdevs.com",
    "Full Stack Engineer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "React.js Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Express.js Developer",
    "Laravel Developer",
    "PHP Developer",
    "Laravel React Developer",
    "REST API Developer",
    "SaaS Developer",
    "Web Application Developer",
    "Database Optimization",
    "MySQL",
    "PostgreSQL",
    "Full Stack Developer Karachi",
    "Full Stack Developer Pakistan",
    "Hire Full Stack Developer Pakistan",
    "Hire Laravel Developer Pakistan",
    "Hire React Developer Pakistan",
    "Remote Full Stack Engineer",
    "Freelance Full Stack Developer",
    "CRMLogy",
    "Leja Book",
    "Digistore Direct",
    "IDAA Assessment",
    "Devop360 Developer",
  ],
  creator: "Faizan Ullah",
  publisher: "Faizan Ullah",
  category: "technology",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Faizan Ullah Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Faizan Ullah — Full Stack Engineer",
      },
    ],
    locale: "en_US",
    type: "profile",
    firstName: "Faizan",
    lastName: "Ullah",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description:
      "Full Stack Engineer building scalable web apps with React.js, Next.js, Node.js, PHP, and Laravel.",
    creator: "@faizanullahdev",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google4d5f2ca214f86f50",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Faizan Ullah",
      alternateName: ["Faizan Ullah Dev", "faizanullahdevs", "Faizan Full Stack Developer"],
      jobTitle: "Full Stack Engineer",
      image: `${siteUrl}/faizan-ullah-photo.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Karachi",
        addressCountry: "PK",
      },
      worksFor: {
        "@type": "Organization",
        name: "Devop360 Technology",
      },
      url: siteUrl,
      sameAs: [
        "https://www.linkedin.com/in/faizan-fullstack-engineer",
        "https://github.com/faizanullah-dev",
      ],
      email: "faizanullah.dev5@gmail.com",
      telephone: "+923130056857",
      knowsAbout: [
        "Full Stack Development",
        "React.js",
        "Next.js",
        "JavaScript",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "PHP",
        "Laravel",
        "Python Flask",
        "RESTful APIs",
        "Database Optimization",
        "MySQL",
        "PostgreSQL",
        "Docker",
        "SaaS Architecture",
        "Microservices",
        "System Design",
      ],
      description: siteDescription,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Faizan Ullah Portfolio",
      description:
        "Official portfolio of Faizan Ullah, Full Stack Engineer (React.js, Node.js, PHP & Laravel)",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: siteTitle,
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ScrollProgress />
          <Header />
          <FloatingContact />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
