"use client";

import { Button } from "@/components/ui/button";
import { useDictionary } from "@/i18n/DictionaryContext";

export default function TravelBuddies() {
  const { dict } = useDictionary();
  const buddies = [
    { name: "Alex K.", age: 28, from: "Germany", match: "98%", interests: ["Hiking", "Photography", "Street Food"], image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop" },
    { name: "Sarah M.", age: 25, from: "UK", match: "92%", interests: ["Beaches", "Yoga", "Culture"], image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop" },
    { name: "Kenji T.", age: 31, from: "Japan", match: "85%", interests: ["Photography", "Cafes", "History"], image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pt-32 pb-20 px-4 md:px-6 container mx-auto max-w-6xl">
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-heading">{dict.pages.buddies.title}</h1>
            <p className="text-xl text-muted-foreground">{dict.pages.buddies.subtitle}</p>
          </div>
          <Button variant="outline">{dict.pages.buddies.profileBtn}</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="glass p-6 rounded-2xl border border-border">
              <h2 className="text-xl font-bold mb-4">Filter Matches</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Nationality / Language</label>
                  <select className="w-full bg-background border border-border rounded-lg px-4 py-2">
                    <option>Any</option>
                    <option>Same as me</option>
                    <option>English Speakers</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Cost Sharing</label>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="cost" className="rounded" />
                    <label htmlFor="cost" className="text-sm">Looking to share ride/accommodation costs</label>
                  </div>
                </div>
                <Button className="w-full mt-4">Apply Filters</Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="flex flex-col gap-6">
              {buddies.map((buddy, i) => (
                <div key={i} className="glass p-4 rounded-2xl border border-border flex flex-col sm:flex-row gap-6 items-center sm:items-start group hover:shadow-md transition-shadow">
                  <div className="w-32 h-32 rounded-full overflow-hidden shrink-0 border-4 border-background shadow-inner">
                    <img src={buddy.image} alt={buddy.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-2">
                      <h3 className="text-2xl font-bold">{buddy.name}, {buddy.age}</h3>
                      <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold border border-primary/30 mt-2 sm:mt-0">
                        {buddy.match} Match
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-3">From {buddy.from}</p>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-4">
                      {buddy.interests.map(interest => (
                        <span key={interest} className="text-xs px-2 py-1 bg-background border border-border rounded-md text-foreground">{interest}</span>
                      ))}
                    </div>
                    <div className="flex gap-2 justify-center sm:justify-start">
                      <Button>Connect</Button>
                      <Button variant="outline">View Trip Plan</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
