"use client";

import { Button } from "@/components/ui/button";
import { useDictionary } from "@/i18n/DictionaryContext";
import { HeroSlideshow } from "@/components/ui/HeroSlideshow";

export default function Home() {
  const { dict } = useDictionary();

  const destinations = [
    { ...dict.destinations.places[0], span: "md:col-span-2 md:row-span-2", image: "https://images.unsplash.com/photo-1523428096881-5bd79d0f1a92?q=80&w=1600&auto=format&fit=crop" },
    { ...dict.destinations.places[1], span: "md:col-span-1 md:row-span-1", image: "https://images.unsplash.com/photo-1585016491763-7e452a265691?q=80&w=800&auto=format&fit=crop" },
    { ...dict.destinations.places[2], span: "md:col-span-1 md:row-span-1", image: "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=800&auto=format&fit=crop" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      
      {/* 1. Immersive Hero Section with Automatic Slideshow */}
      <HeroSlideshow>
        <span className="animate-fade-in-up opacity-0 delay-100 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-bold tracking-wider mb-6 shadow-lg animate-float">
          {dict.hero.badge}
        </span>
        <h1 className="animate-fade-in-up opacity-0 delay-200 text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight leading-tight font-heading drop-shadow-xl">
          {dict.hero.title1} <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-yellow-200">{dict.hero.title2}</span>
        </h1>
        <p className="animate-fade-in-up opacity-0 delay-300 text-lg md:text-2xl text-white/90 mb-12 max-w-2xl font-medium drop-shadow-md">
          {dict.hero.subtitle}
        </p>

        {/* Floating Booking/Search Bar */}
        <div className="animate-fade-in-up opacity-0 delay-400 w-full max-w-4xl bg-background/95 dark:bg-card/95 backdrop-blur-xl p-2 md:p-4 rounded-3xl shadow-2xl border border-border/50 flex flex-col md:flex-row items-center gap-2 md:gap-4 transition-all hover:shadow-primary/20 hover:-translate-y-1 text-foreground">
          <div className="flex-1 w-full px-4 py-2 border-b md:border-b-0 md:border-r border-border/50 text-left">
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{dict.hero.whereTo}</label>
            <input type="text" placeholder={dict.hero.whereToPlaceholder} className="w-full bg-transparent border-none outline-none text-foreground font-medium placeholder:text-muted-foreground/70 focus:ring-0" />
          </div>
          <div className="flex-1 w-full px-4 py-2 border-b md:border-b-0 md:border-r border-border/50 text-left">
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{dict.hero.travelStyle}</label>
            <select className="w-full bg-transparent border-none outline-none text-foreground font-medium appearance-none cursor-pointer focus:ring-0">
              <option>Adventure & Nature</option>
              <option>Culture & Temples</option>
              <option>Food & City</option>
              <option>Relaxation & Beach</option>
            </select>
          </div>
          <div className="flex-1 w-full px-4 py-2 text-left mb-2 md:mb-0">
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{dict.hero.duration}</label>
            <select className="w-full bg-transparent border-none outline-none text-foreground font-medium appearance-none cursor-pointer focus:ring-0">
              <option>3-5 Days</option>
              <option>1 Week</option>
              <option>2 Weeks+</option>
            </select>
          </div>
          <a href="/ai-route" className="w-full md:w-auto">
            <Button size="lg" className="w-full md:w-auto rounded-2xl h-14 px-8 bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg shadow-primary/30 transition-transform active:scale-95 group">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:rotate-12 transition-transform"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              {dict.hero.generateBtn}
            </Button>
          </a>
        </div>
      </HeroSlideshow>

      {/* 2. Premium Bento Grid for Unseen Destinations */}
      <section className="relative py-24 px-4 w-full text-white">
        {/* Fixed Background Image for Parallax effect */}
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed bg-center">
          <div className="absolute inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto md:px-8 animate-fade-in-up opacity-0 delay-300">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 text-white">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 font-heading tracking-tight drop-shadow-md">{dict.destinations.title}</h2>
              <p className="text-xl text-white/90 max-w-2xl drop-shadow-md">{dict.destinations.subtitle}</p>
            </div>
            <a href="/unseen">
              <Button variant="outline" className="rounded-full px-6 border-white/70 text-white hover:bg-white hover:text-black transition-all">{dict.destinations.exploreBtn}</Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-[800px] md:h-[600px]">
            {destinations.map((place, i) => (
              <a href="/unseen" key={i} className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${place.span}`}>
                <img src={place.image} alt={place.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" onError={(e) => e.currentTarget.src = "https://picsum.photos/800/600?random=" + i} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-flex items-center gap-1.5 text-secondary text-sm font-bold uppercase tracking-wider mb-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full group-hover:bg-secondary group-hover:text-black transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      {place.location}
                    </span>
                    <h3 className="text-white text-3xl font-bold font-heading">{place.title}</h3>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Features Breakdown */}
      <section className="relative py-24 border-y border-border/50 text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed bg-center">
          <div className="absolute inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 animate-fade-in-up opacity-0 delay-400">
          <div className="text-center mb-20 drop-shadow-md">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 font-heading tracking-tight">{dict.ecosystem.title}</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">{dict.ecosystem.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">{dict.ecosystem.guidesTitle}</h3>
              <p className="text-white/80 leading-relaxed mb-6">{dict.ecosystem.guidesDesc}</p>
              <a href="/guides" className="text-sky-400 font-bold hover:underline inline-flex items-center hover:text-sky-300 drop-shadow-sm">{dict.ecosystem.guidesBtn} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
            </div>

            {/* Feature 2 */}
            <div className="glass bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group delay-100">
              <div className="w-16 h-16 rounded-2xl bg-secondary/20 text-secondary flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-secondary group-hover:text-white transition-all duration-300 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">{dict.ecosystem.buddyTitle}</h3>
              <p className="text-white/80 leading-relaxed mb-6">{dict.ecosystem.buddyDesc}</p>
              <a href="/buddies" className="text-amber-400 font-bold hover:underline inline-flex items-center hover:text-amber-300 drop-shadow-sm">{dict.ecosystem.buddyBtn} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
            </div>

            {/* Feature 3 */}
            <div className="glass bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group delay-200">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 text-accent flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">{dict.ecosystem.transportTitle}</h3>
              <p className="text-white/80 leading-relaxed mb-6">{dict.ecosystem.transportDesc}</p>
              <a href="/transport" className="text-emerald-400 font-bold hover:underline inline-flex items-center hover:text-emerald-300 drop-shadow-sm">{dict.ecosystem.transportBtn} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12 text-center text-muted-foreground animate-fade-in-up opacity-0 delay-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-bold text-xl tracking-tight text-foreground">
            Thai<span className="text-primary">Unseen</span>
          </div>
          <p>{dict.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}
