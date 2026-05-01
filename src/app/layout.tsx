import type { Metadata } from "next";
import "./globals.css";
import { DictionaryProvider } from "@/i18n/DictionaryContext";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Thai Unseen - Discover Thailand's Hidden Gems",
  description: "AI-powered travel platform to discover unseen places in Thailand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
        <DictionaryProvider>
          <Navbar />
          {children}
        </DictionaryProvider>
      </body>
    </html>
  );
}
