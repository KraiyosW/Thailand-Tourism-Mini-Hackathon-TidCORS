"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const images = [
  "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2000&auto=format&fit=crop", // Islands
  "https://images.unsplash.com/photo-1540304655519-e31ed196cd63?q=80&w=2000&auto=format&fit=crop", // Mountains
  "https://images.unsplash.com/photo-1579737119280-5fb628205f01?q=80&w=2000&auto=format&fit=crop", // Temples
  "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2000&auto=format&fit=crop", // Food / Night Market
];

export function HeroSlideshow({ children }: { children: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        {images.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt="Thailand Background"
            className={cn(
              "absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-in-out scale-105",
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
            loading={idx === 0 ? "eager" : "lazy"}
            onError={(e) => {
              // Fallback if even wikipedia fails
              e.currentTarget.src = "https://picsum.photos/1920/1080?random=" + idx;
            }}
          />
        ))}
        {/* Dark gradient overlay so text remains readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-20" />
      </div>
      
      {/* Content wrapper */}
      <div className="relative z-30 flex flex-col items-center text-center px-4 max-w-5xl w-full mt-10">
        {children}
      </div>
    </section>
  );
}
