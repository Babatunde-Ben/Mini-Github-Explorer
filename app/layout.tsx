import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/app/_contexts/AuthProvider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini Github Explorer",
  description:
    "A modern, responsive web application built with Next.js that allows users to explore GitHub profiles and repositories. Search for any GitHub username to view their profile information, statistics, and latest repositories in a beautiful, dark-themed interface.",
  keywords: ["github", "explorer", "user", "profile", "repository", "stats"],
  authors: [{ name: "Babatunde Adeniyi", url: "https://babatundeadeniyi.com" }],
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${nunito.variable} antialiased font-nunito`}>
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
