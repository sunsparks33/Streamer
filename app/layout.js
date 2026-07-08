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

export const metadata = {
  title: "1_bp - Official Stream Hub",
  description: "Watch 1_bp live on Kick.com, join the chat room, and view recent stream highlight VODs directly.",
  openGraph: {
    title: "1_bp - Official Stream Hub",
    description: "Watch 1_bp live on Kick.com, join the chat room, and view recent stream highlight VODs directly.",
    url: "https://1-bp-streamer-web.vercel.app",
    siteName: "1_bp Streamer Hub",
    images: [
      {
        url: "https://1-bp-streamer-web.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "1_bp Streamer Hub Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3221059016709636"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
