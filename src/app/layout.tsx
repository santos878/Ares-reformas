import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SoundToggle } from "@/components/SoundToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Ares Reformas | Reformas Integrales en Madrid",
    template: "%s | Ares Reformas",
  },
  description:
    "Empresa de reformas integrales en Madrid. Transformamos hogares y locales con diseño, calidad y profesionalidad. Solicita presupuesto gratuito.",
  keywords: [
    "reformas Madrid",
    "reformas integrales",
    "empresa de reformas",
    "cocinas",
    "baños",
    "rehabilitación",
    "diseño de interiores",
  ],
  authors: [{ name: "Ares Reformas" }],
  creator: "Ares Reformas",
  publisher: "Ares Reformas",
  metadataBase: new URL("https://aresreformas.com"),
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Ares Reformas",
    title: "Ares Reformas | Reformas Integrales en Madrid",
    description:
      "Transformamos hogares y locales con diseño, calidad y profesionalidad.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ares Reformas",
    description:
      "Transformamos hogares y locales con diseño, calidad y profesionalidad.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <link rel="canonical" href="https://aresreformas.com" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <SoundToggle />
      </body>
    </html>
  );
}
