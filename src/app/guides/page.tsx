"use client";

import { Button } from "@/components/ui/button";
import { useDictionary } from "@/i18n/DictionaryContext";

export default function GuidesPage() {
  const { dict } = useDictionary();
  const guides = [
    { name: "Sompong T.", rating: 4.9, reviews: 124, specialty: "Street Food & Temples", languages: ["Thai", "English"], image: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop" },
    { name: "Nidnoi S.", rating: 5.0, reviews: 89, specialty: "Unseen Nature Trails", languages: ["Thai", "English", "Mandarin"], image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" },
    { name: "Krit P.", rating: 4.8, reviews: 210, specialty: "Photography & Culture", languages: ["Thai", "English", "Japanese"], image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pt-32 pb-20 px-4 md:px-6 container mx-auto max-w-6xl">
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-heading">{dict.pages.guides.title}</h1>
            <p className="text-xl text-muted-foreground">{dict.pages.guides.subtitle}</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input type="text" placeholder="Search locations..." className="bg-background border border-border rounded-lg px-4 py-2 w-full md:w-64" />
            <Button>Search</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden border border-border group">
              <div className="h-48 w-full overflow-hidden relative">
                <img src={guide.image} alt={guide.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md text-sm font-bold flex items-center gap-1">
                  <span className="text-secondary">★</span> {guide.rating}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold">{guide.name}</h2>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full border border-border flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
                    Verified
                  </div>
                </div>
                <p className="text-primary font-medium mb-4">{guide.specialty}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {guide.languages.map(lang => (
                    <span key={lang} className="text-xs px-2 py-1 border border-border rounded-md text-muted-foreground">{lang}</span>
                  ))}
                </div>
                <Button className="w-full" variant="outline">Book Guide</Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
