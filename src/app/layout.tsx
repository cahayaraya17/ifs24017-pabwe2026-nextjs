import type { Metadata } from "next";
import { Quicksand, Fraunces } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bloomy Post",
  description: "Tempat berbagi cerita manis & momen favoritmu",
  robots: { index: true, follow: true },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${quicksand.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full bg-blush-50 text-mauve-900 font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}