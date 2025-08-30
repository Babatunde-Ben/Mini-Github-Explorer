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
  description: "Explore your favorite Github users and their repositories",
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
