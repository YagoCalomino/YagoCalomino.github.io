import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yago Calomino | Data Engineer & Full-Stack Developer",
  description:
    "Portfolio of Yago Calomino, Data Engineer, Data Analyst, and Full-Stack Developer. Specializing in PostgreSQL, Oracle, Python, Power BI, React, Next.js, and process automation with Lean Six Sigma.",
  keywords: [
    "Data Engineer",
    "Data Analyst",
    "Full-Stack Developer",
    "PostgreSQL",
    "Oracle",
    "Python",
    "Power BI",
    "React",
    "Next.js",
    "FastAPI",
    "Lean Six Sigma",
    "Process Automation",
  ],
  authors: [{ name: "Yago Calomino" }],
  openGraph: {
    title: "Yago Calomino | Data Engineer & Full-Stack Developer",
    description:
      "Data Engineering, Data Analysis, and Full-Stack Development. Clean data pipelines, analytical dashboards, and production web applications.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yago Calomino | Data Engineer & Full-Stack Developer",
    description:
      "Data Engineering, Data Analysis, and Full-Stack Development.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
