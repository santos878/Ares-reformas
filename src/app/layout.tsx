import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SoundToggle } from "@/components/SoundToggle";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ChatBot } from "@/components/ChatBot";
import { PageTransitionSound } from "@/components/PageTransitionSound";
import { BackgroundMusic } from "@/components/BackgroundMusic";

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
    default: "Ares Reformas | Reformas Integrales en País Vasco",
    template: "%s | Ares Reformas",
  },
  description:
    "Empresa de reformas integrales en País Vasco. Transformamos hogares y locales con diseño, calidad y profesionalidad. Solicita presupuesto gratuito.",
  keywords: [
    "reformas País Vasco",
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
  metadataBase: new URL("https://ares-reformas.vercel.app"),
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Ares Reformas",
    title: "Ares Reformas | Reformas Integrales en País Vasco",
    description:
      "Transformamos hogares y locales con diseño, calidad y profesionalidad.",
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
        <link rel="canonical" href="https://ares-reformas.vercel.app" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        <ScrollProgress />
        <PageTransitionSound />
        <BackgroundMusic />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <SoundToggle />
        <WhatsAppFloat />
        <ChatBot />
      </body>
    </html>
  );
}
