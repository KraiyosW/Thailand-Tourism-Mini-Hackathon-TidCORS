"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDictionary } from "@/i18n/DictionaryContext";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Inline SVG Icons
const Compass = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
);
const Globe = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
);
const User = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const Menu = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);
const X = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { lang, dict, toggleLang } = useDictionary();
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use scrolled style if not on home page OR if scrolled down
  const isScrolled = scrollY > 20 || !isHome;

  const navLinks = [
    { href: "/ai-route", label: dict.nav.aiRoute },
    { href: "/guides", label: dict.nav.localGuide },
    { href: "/unseen", label: dict.nav.unseenPlaces },
    { href: "/buddies", label: dict.nav.travelBuddy },
    { href: "/transport", label: dict.nav.transport },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-sm py-3 text-foreground" 
          : "bg-transparent py-5 text-white"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground group-hover:scale-105 transition-transform shadow-lg shadow-primary/30">
            <Compass className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">
            Thai<span className="text-primary">Unseen</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={cn(
          "hidden lg:flex items-center gap-1 px-2 py-1 rounded-full",
          isScrolled ? "" : "bg-black/20 backdrop-blur-sm border border-white/10"
        )}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                isScrolled 
                  ? "hover:bg-muted hover:text-primary" 
                  : "hover:bg-white/20 text-white/90 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleLang} 
            className={cn("rounded-full", !isScrolled && "hover:bg-white/20 hover:text-white text-white")} 
            title="Switch Language"
          >
            <Globe className="w-5 h-5" />
            <span className="sr-only">Switch Language ({lang})</span>
          </Button>
          
          <div className="hidden sm:block">
            <Button className="rounded-full shadow-lg">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={cn("lg:hidden rounded-full", !isScrolled && "hover:bg-white/20 hover:text-white text-white")}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border shadow-xl p-4 flex flex-col gap-2 text-foreground">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-3 text-lg font-medium rounded-lg hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button className="mt-4 w-full justify-center">
            <User className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        </div>
      )}
    </header>
  );
}
