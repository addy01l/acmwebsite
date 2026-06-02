import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ACM Shivalik Chapter | SCE Dehradun",
  description: "Official ACM Student Chapter of Shivalik College of Engineering, Dehradun. Empowering students through technology, research, competitive coding, and innovation.",
  keywords: ["ACM", "ACM Shivalik", "Shivalik College of Engineering", "Dehradun", "Coding Club", "CSE", "Computer Science", "Hackathons", "Workshops"],
  openGraph: {
    title: "ACM Shivalik Student Chapter",
    description: "Where Innovation Meets Excellence. Explore coding contests, workshops, research activities, and join the tech community.",
    type: "website",
    locale: "en_IN",
    url: "https://acmshivalik.org",
    siteName: "ACM Shivalik Student Chapter",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-zinc-100 selection:bg-[#007BFF]/30 selection:text-white">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
