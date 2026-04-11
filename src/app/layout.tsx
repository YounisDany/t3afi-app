import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "تعافي | T3afi - تحرر من إدمان المقاطع القصيرة",
  description: "تطبيق تعافي يساعدك على التخلص من إدمان المقاطع القصيرة (TikTok, Reels, Shorts) من خلال نظام تحفيزي تفاعلي ومهام يومية ومتابعة التقدم",
  keywords: ["تعافي", "T3afi", "إدمان", "TikTok", "Reels", "Shorts", "إنتاجية", "تركيز", "تطبيق عربي"],
  authors: [{ name: "T3afi Team" }],
  icons: {
    icon: "/t3afi-logo.png",
  },
  openGraph: {
    title: "تعافي | T3afi - تحرر من إدمان المقاطع القصيرة",
    description: "رحلتك نحو حياة أكثر إنتاجية وتركيزاً تبدأ هنا",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "تعافي | T3afi",
    description: "تحرر من إدمان المقاطع القصيرة",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
