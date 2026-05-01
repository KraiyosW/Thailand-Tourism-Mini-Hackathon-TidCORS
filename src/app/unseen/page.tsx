"use client";

import { Button } from "@/components/ui/button";
import { useDictionary } from "@/i18n/DictionaryContext";

export default function UnseenPlaces() {
  const { dict } = useDictionary();
  const places = [
    { title: "Khao Sok Lake", category: "Nature", image: "https://images.unsplash.com/photo-1540304655519-e31ed196cd63?q=80&w=2070&auto=format&fit=crop", span: "md:col-span-2 md:row-span-2" },
    { title: "Wat Rong Khun", category: "Culture", image: "https://images.unsplash.com/photo-1579737119280-5fb628205f01?q=80&w=1931&auto=format&fit=crop", span: "md:col-span-1 md:row-span-1" },
    { title: "Koh Lipe", category: "Beach", image: "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=2071&auto=format&fit=crop", span: "md:col-span-1 md:row-span-1" },
    { title: "Phimai Historical Park", category: "History", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop", span: "md:col-span-2 md:row-span-1" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pt-32 pb-20 px-4 md:px-6 container mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-heading">{dict.pages.unseen.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{dict.pages.unseen.subtitle}</p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <Button variant="default" className="rounded-full">All</Button>
            <Button variant="outline" className="rounded-full">Nature & Adventure</Button>
            <Button variant="outline" className="rounded-full">Cultural</Button>
            <Button variant="outline" className="rounded-full">Hidden Beaches</Button>
            <Button variant="outline" className="rounded-full">Local Food</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 h-[800px] md:h-[600px]">
          {places.map((place, i) => (
            <div key={i} className={`relative rounded-2xl overflow-hidden group cursor-pointer ${place.span}`}>
              <img src={place.image} alt={place.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-primary text-sm font-bold uppercase tracking-wider mb-2">{place.category}</span>
                <h3 className="text-white text-2xl font-bold font-heading">{place.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
