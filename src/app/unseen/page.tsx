"use client";

import { Button } from "@/components/ui/button";
import { useDictionary } from "@/i18n/DictionaryContext";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function UnseenPlaces() {
  const { dict } = useDictionary();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const places = [
    {
      id: "khaoSok",
      title: "Khao Sok Lake",
      category: "Nature",
      rating: 4.9,
      image:
        "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/236/2024/06/17031656/Khao-Sok-National-Park-1.jpg",
      gallery: [
        "https://f.tpkcdn.com/images-720/91ea1c498a3fe709ec8c4ed6e55d9ba2.jpg",
        "https://media-cdn.tripadvisor.com/media/photo-s/19/cf/db/39/panvaree-resort.jpg",
      ],
      span: "md:col-span-2 md:row-span-2",
    },
    {
      id: "glowingTemple",
      title: "Glowing Temple",
      category: "Culture",
      rating: 4.8,
      image:
        "https://www.aroimak.co/wp-content/uploads/2021/03/watsirintorn-1.jpg",
      gallery: [
        "https://images.unsplash.com/photo-1544949191-7ed1168959eb?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1598970605070-a38a6ccd3a2d?q=80&w=800&auto=format&fit=crop",
      ],
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: "kohLipe",
      title: "Koh Lipe",
      category: "Beach",
      rating: 5.0,
      image:
        "https://images.unsplash.com/photo-1688625548814-d7bb114d344e?q=80&w=1332&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544949191-7ed1168959eb?q=80&w=800&auto=format&fit=crop",
      ],
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: "samPanBok",
      title: "Sam Pan Bok",
      category: "Nature",
      rating: 4.7,
      image:
        "https://itsbetterinthailand.com/wp-content/uploads/2019/03/P1099056-cover.jpg",
      gallery: [
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1585016491763-7e452a265691?q=80&w=800&auto=format&fit=crop",
      ],
      span: "md:col-span-2 md:row-span-1",
    },
    {
      id: "banRakThai",
      title: "Ban Rak Thai",
      category: "Culture",
      rating: 4.9,
      image:
        "https://www.mychiangmaitravel.com/wp-content/uploads/2018/06/baan-rak-thai01.jpg",
      gallery: [
        "https://images.unsplash.com/photo-1583002622722-b5e19728518b?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop",
      ],
      span: "md:col-span-1 md:row-span-2",
    },
    {
      id: "phanomRung",
      title: "Phanom Rung",
      category: "History",
      rating: 4.8,
      image:
        "https://itsbetterinthailand.com/wp-content/uploads/2019/10/P1122763.jpg",
      gallery: [
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1585016491763-7e452a265691?q=80&w=800&auto=format&fit=crop",
      ],
      span: "md:col-span-2 md:row-span-1",
    },
    {
      id: "surinIslands",
      title: "Surin Islands",
      category: "Beach",
      rating: 4.9,
      image:
        "https://www.zubludiving.com/images/Thailand/Similans-Surins/Similan-Surin-Islands-Thailand-Banner.jpg",
      gallery: [
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1585016491763-7e452a265691?q=80&w=800&auto=format&fit=crop",
      ],
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: "kohKood",
      title: "Koh Kood",
      category: "Beach",
      rating: 4.9,
      image:
        "https://static.ticket2attraction.com/gallery/87392c34-2b7f-47b6-8cab-991dd834cd9b/226cf2f4-eeff-46ea-9f83-51e0a00408c4-1200.webp",
      gallery: [
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1585016491763-7e452a265691?q=80&w=800&auto=format&fit=crop",
      ],
      span: "md:col-span-2 md:row-span-1",
    },
    {
      id: "yaowarat",
      title: "Yaowarat Food",
      category: "Food",
      rating: 4.8,
      image:
        "https://s359.kapook.com/pagebuilder/9e28790f-58bb-40e8-9417-c1d154863245.jpg",
      gallery: [
        "https://images.unsplash.com/photo-1562607343-ce6593f0b2f8?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
      ],
      span: "md:col-span-1 md:row-span-2",
    },
    {
      id: "fishermanVillage",
      title: "Fisherman Table",
      category: "Food",
      rating: 5.0,
      image:
        "https://static.naewna.com/uploads/files2017/images/1735619478676.jpg",
      gallery: [
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800&auto=format&fit=crop",
      ],
      span: "md:col-span-2 md:row-span-1",
    },
    {
      id: "thiLoSu",
      title: "Thi Lo Su Falls",
      category: "Nature",
      rating: 4.9,
      image:
        "https://www.siamguides.com/wp-content/uploads/2023/01/thi-lo-su-waterfall-in-thailand.jpg",
      gallery: [
        "https://images.unsplash.com/photo-1589394815804-964ed9be2eb3?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop",
      ],
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: "watPhraKaew",
      title: "Wat Phra Kaew",
      category: "Culture",
      rating: 5.0,
      image:
        "https://www.agoda.com/wp-content/uploads/2024/07/Grand-Palace-and-wat-phra-kaew-1244x700.jpg",
      gallery: [
        "https://images.unsplash.com/photo-1504214208698-ea1919a2f9e5?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1566838318109-a8647000d07a?q=80&w=800&auto=format&fit=crop",
      ],
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: "ayutthaya",
      title: "Ayutthaya Ruins",
      category: "History",
      rating: 4.9,
      image:
        "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_auto,s_webp:avif/meetmeindepartures.com/wp-content/uploads/2023/03/ayutthaya-itinerary-ayutthaya-ruins-canva.jpg",
      gallery: [
        "https://images.unsplash.com/photo-1566838318109-a8647000d07a?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504214208698-ea1919a2f9e5?q=80&w=800&auto=format&fit=crop",
      ],
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: "sukhothai",
      title: "Sukhothai Park",
      category: "History",
      rating: 4.8,
      image:
        "https://files.thailandtourismdirectory.go.th/assets/upload/2017/12/12/20171212dc5c7986daef50c1e02ab09b442ee34f143534.jpg",
      gallery: [
        "https://images.unsplash.com/photo-1585016491763-7e452a265691?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop",
      ],
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: "riversidePrawns",
      title: "Riverside Prawns",
      category: "Food",
      rating: 4.9,
      image:
        "https://shopee.co.th/blog/wp-content/uploads/2021/03/Shopee-Blog-%E0%B9%80%E0%B8%A1%E0%B8%99%E0%B8%B9%E0%B8%81%E0%B8%B8%E0%B9%89%E0%B8%87%E0%B9%81%E0%B8%A1%E0%B9%88%E0%B8%99%E0%B9%89%E0%B8%B3.jpg",
      gallery: [
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1562607343-ce6593f0b2f8?q=80&w=800&auto=format&fit=crop",
      ],
      span: "md:col-span-1 md:row-span-1",
    },
  ];

  const filteredPlaces =
    activeCategory === "All"
      ? places
      : places.filter((p) => p.category === activeCategory);

  const categories = ["All", "Nature", "Culture", "Beach", "History", "Food"];

  // Auto-slide logic for Carousel
  useEffect(() => {
    if (activeCategory !== "All") return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredPlaces.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeCategory, filteredPlaces.length]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      <main className="flex-1 pt-32 pb-20 px-4 md:px-6 container mx-auto max-w-6xl relative">
        <div className="mb-10 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-heading tracking-tight">
            {dict.pages.unseen.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {dict.pages.unseen.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                className={cn(
                  "rounded-full px-6 transition-all duration-300",
                  activeCategory === cat ? "shadow-lg shadow-primary/30" : "",
                )}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentIndex(0);
                }}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Conditional View: Carousel for 'All', Grid for others */}
        {activeCategory === "All" ? (
          <div className="relative">
            <div className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center">
              {filteredPlaces.map((place, i) => (
                <div
                  key={place.title}
                  onClick={() => setSelectedPlace(place)}
                  className={cn(
                    "absolute w-full max-w-4xl h-full rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl transition-all duration-700 ease-in-out",
                    i === currentIndex
                      ? "opacity-100 translate-x-0 scale-100 z-10"
                      : i < currentIndex
                        ? "opacity-0 -translate-x-full scale-90 z-0"
                        : "opacity-0 translate-x-full scale-90 z-0",
                  )}
                >
                  <img
                    src={place.image}
                    alt={place.title}
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                    <div className="flex justify-between items-end">
                      <div className="animate-fade-in-up">
                        <span className="bg-primary/90 backdrop-blur-md text-white text-[12px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 inline-block">
                          {place.category}
                        </span>
                        <h3 className="text-white text-4xl md:text-6xl font-bold font-heading drop-shadow-xl mb-2">
                          {place.title}
                        </h3>
                        <p className="text-white/80 text-lg max-w-xl line-clamp-2 hidden md:block">
                          {/* @ts-ignore */}
                          {dict.pages.unseen.articles[place.id]?.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mb-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30">
                        <span className="text-yellow-400 text-xl font-bold">
                          ★
                        </span>
                        <span className="text-white text-xl font-bold">
                          {place.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-10">
              {filteredPlaces.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    "h-3 rounded-full transition-all duration-300",
                    i === currentIndex
                      ? "w-10 bg-primary shadow-lg shadow-primary/40"
                      : "w-3 bg-muted-foreground/30 hover:bg-muted-foreground/50",
                  )}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlaces.map((place, i) => (
              <div
                key={place.title}
                onClick={() => setSelectedPlace(place)}
                className="relative aspect-[4/5] rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <img
                  src={place.image}
                  alt={place.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
                        {place.category}
                      </span>
                      <h3 className="text-white text-2xl font-bold font-heading drop-shadow-md">
                        {place.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 mb-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                      <span className="text-yellow-400 text-sm font-bold">
                        ★
                      </span>
                      <span className="text-white text-sm font-bold">
                        {place.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detail Modal / Article Overlay */}
        {selectedPlace && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setSelectedPlace(null)}
            />
            <div className="relative w-full max-w-6xl h-full md:h-[750px] bg-card rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-8 right-8 z-20 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black transition-all hover:scale-110 active:scale-95 backdrop-blur-md"
              >
                ✕
              </button>

              {/* Left Side: Dynamic Gallery Section */}
              <div className="w-full md:w-5/12 h-full flex flex-col bg-muted/30 border-r border-border/50">
                <div className="p-8 flex flex-col h-full gap-6">
                  {/* Gallery Area (Scrollable if needed) */}
                  <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-6">
                    {/* Main Large Image */}
                    <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-xl group shrink-0">
                      <img
                        src={selectedPlace.image}
                        alt={selectedPlace.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* Mosaic Gallery */}
                    <div className="grid grid-cols-2 gap-4 shrink-0">
                      {selectedPlace.gallery.map((img: string, idx: number) => (
                        <div
                          key={idx}
                          className={cn(
                            "relative rounded-[1.5rem] overflow-hidden shadow-md group",
                            "h-40",
                          )}
                        >
                          <img
                            src={img}
                            alt="Gallery"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location Preview Box - Pushed to Bottom */}
                  <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-[2rem] p-6 border border-white dark:border-white/10 shadow-sm mt-auto">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">
                        📍
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Location Preview</h4>
                        <p className="text-xs text-muted-foreground">
                          {selectedPlace.category} Hidden Gem
                        </p>
                      </div>
                    </div>
                    <div className="h-32 w-full bg-muted rounded-2xl relative overflow-hidden border border-border/50 group/map">
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedPlace.title + " Thailand")}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                        allowFullScreen
                        className="grayscale-[20%] contrast-[1.1] opacity-90"
                      ></iframe>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPlace.title + " Thailand")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-2 right-2 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold shadow-lg border border-border hover:bg-primary hover:text-white transition-all"
                      >
                        📍 Open in Maps
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Article Content */}
              <div className="w-full md:w-7/12 p-8 md:p-14 flex flex-col h-full overflow-hidden">
                <div className="flex items-center gap-2 mb-4 shrink-0">
                  <span className="text-primary font-bold uppercase tracking-wider text-sm">
                    {selectedPlace.category}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 font-bold">★★★★★</span>
                    <span className="font-bold">{selectedPlace.rating}</span>
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-extrabold mb-8 font-heading leading-tight shrink-0">
                  {selectedPlace.title}
                </h2>

                {/* Article Text Content - Scrollable Part */}
                <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                      {/* @ts-ignore */}
                      {dict.pages.unseen.articles[selectedPlace.id]?.content}
                    </p>
                    <div className="bg-primary/5 p-8 rounded-3xl mb-8 border border-primary/10">
                      <h4 className="font-bold mb-3 flex items-center gap-2 text-primary">
                        <span className="text-2xl">💡</span> Useful Info
                      </h4>
                      <p className="text-muted-foreground leading-relaxed italic">
                        {/* @ts-ignore */}
                        {dict.pages.unseen.articles[selectedPlace.id]?.moreInfo}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Pushed to Bottom */}
                <div className="flex flex-col sm:flex-row gap-4 mt-10 pt-6 border-t border-border/50 shrink-0">
                  <Button
                    size="lg"
                    className="rounded-full flex-1 h-16 text-lg font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                  >
                    Book Trip Now
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full flex-1 h-16 text-lg font-bold hover:bg-muted transition-all"
                  >
                    Save to Wishlist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
