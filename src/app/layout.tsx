import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ar Hafiz Muhammed | Computer Science Engineer & AI Specialist",
  description:
    "Portfolio of Ar Hafiz Muhammed, Computer Science and Engineering graduate from Kerala, India. Specializing in Frontend Development (React, Angular), AI/Machine Learning (YOLOv8), and Cybersecurity.",
  keywords: [
    "Ar Hafiz Muhammed",
    "Hafiz Muhammed",
    "Computer Science Engineer India",
    "Frontend Developer Kerala",
    "AI Specialist",
    "Cybersecurity Learner",
    "Saintgits College of Engineering",
    "YOLOv8 Pothole Detection",
    "Next.js Portfolio",
  ],
  authors: [{ name: "Ar Hafiz Muhammed" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#020208] text-slate-100">
        {children}
      </body>
    </html>
  );
}
