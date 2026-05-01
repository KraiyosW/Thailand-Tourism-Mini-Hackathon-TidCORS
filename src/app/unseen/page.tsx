"use client";

import { Button } from "@/components/ui/button";
import { useDictionary } from "@/i18n/DictionaryContext";

export default function UnseenPlaces() {
  const { dict } = useDictionary();
  const places = [
    {
      title: "Khao Sok Lake",
      category: "Nature",
      image:
        "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/236/2024/06/17031656/Khao-Sok-National-Park-1.jpg",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      title: "Wat Rong Khun",
      category: "Culture",
      image:
        "https://images.unsplash.com/photo-1665068551186-1010e3867f99?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      title: "Koh Lipe",
      category: "Beach",
      image:
        "https://images.unsplash.com/photo-1688625548814-d7bb114d344e?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      title: "Phimai Historical Park",
      category: "History",
      image:
        "https://homeiswhereyourbagis.b-cdn.net/wp-content/uploads/2023/03/Phimai-Historical-Park-Haupttempel-1024x576.jpg",
      span: "md:col-span-2 md:row-span-1",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pt-32 pb-20 px-4 md:px-6 container mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-heading">
            {dict.pages.unseen.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {dict.pages.unseen.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <Button variant="default" className="rounded-full">
              All
            </Button>
            <Button variant="outline" className="rounded-full">
              Nature & Adventure
            </Button>
            <Button variant="outline" className="rounded-full">
              Cultural
            </Button>
            <Button variant="outline" className="rounded-full">
              Hidden Beaches
            </Button>
            <Button variant="outline" className="rounded-full">
              Local Food
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 h-[800px] md:h-[600px]">
          {places.map((place, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${place.span}`}
            >
              <img
                src={place.image}
                alt={place.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-primary text-sm font-bold uppercase tracking-wider mb-2">
                  {place.category}
                </span>
                <h3 className="text-white text-2xl font-bold font-heading">
                  {place.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
