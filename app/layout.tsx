import type { Metadata } from "next";
import { Syne, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yuvraj Bisht — QA Automation, Backend & Applied AI Developer",
  description: "Personal Developer Portfolio of Yuvraj Bisht. B.Tech CSE Developer specializing in Playwright/Cypress QA automation, Golang & FastAPI backends, and LangChain RAG pipelines.",
  keywords: [
    "Yuvraj Bisht",
    "QA Automation Engineer",
    "Playwright",
    "Cypress",
    "Golang",
    "FastAPI",
    "React",
    "RAG AI",
    "LangChain",
    "Software Developer Vadodara",
  ],
  authors: [{ name: "Yuvraj Bisht" }],
  openGraph: {
    title: "Yuvraj Bisht — Software Developer & QA Automation Engineer",
    description: "Living portfolio with real-time GitHub & LeetCode integrations, Playwright/Cypress test automation, and Golang/FastAPI backends.",
    url: "https://yuvrajbisht.vercel.app",
    siteName: "Yuvraj Bisht Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuvraj Bisht — QA Automation & Full-Stack Developer",
    description: "Living portfolio with live GitHub commit heatmaps and LeetCode solve stats.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-forest-900 text-text-primary antialiased selection:bg-emerald-accent/30 selection:text-text-primary">
        <ScrollProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
