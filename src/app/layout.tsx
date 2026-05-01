import type { Metadata } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { DictionaryProvider } from "@/i18n/DictionaryContext";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Thai Unseen Agent | Premium Travel Platform",
  description: "Discover the unseen Thailand with AI-curated routes, local guides, and seamless travel companions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSansThai.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
        <DictionaryProvider>
          <Navbar />
          {children}
        </DictionaryProvider>
      </body>
    </html>
  );
}
