"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/i18n/DictionaryContext";

export default function TravelBuddies() {
  const { dict } = useDictionary();
  const buddies = [
    { name: "Alex K.", age: 28, from: "Germany", language: "German", costSharing: true, match: "98%", interests: ["Hiking", "Photography", "Street Food"], image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop" },
    { name: "Sarah M.", age: 25, from: "UK", language: "English", costSharing: false, match: "92%", interests: ["Beaches", "Yoga", "Culture"], image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop" },
    { name: "Kenji T.", age: 31, from: "Japan", language: "Japanese", costSharing: true, match: "85%", interests: ["Photography", "Cafes", "History"], image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop" },
    { name: "Nadia P.", age: 27, from: "USA", language: "English", costSharing: true, match: "89%", interests: ["Temples", "Street Food", "Markets"], image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1887&auto=format&fit=crop" },
    { name: "Arjun S.", age: 30, from: "India", language: "English", costSharing: true, match: "81%", interests: ["Backpacking", "Budget Travel", "Cooking"], image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop" },
    { name: "Ploy C.", age: 24, from: "Thailand", language: "Thai", costSharing: false, match: "77%", interests: ["Nightlife", "Shopping", "Food Tours"], image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop" },
    { name: "Lucas B.", age: 33, from: "Brazil", language: "Portuguese", costSharing: true, match: "74%", interests: ["Diving", "Beaches", "Adventure"], image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" },
    { name: "Mia L.", age: 26, from: "Australia", language: "English", costSharing: false, match: "70%", interests: ["Wildlife", "Eco-Tourism", "Trekking"], image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1887&auto=format&fit=crop" },
    { name: "Som N.", age: 29, from: "Thailand", language: "Thai", costSharing: true, match: "66%", interests: ["Muay Thai", "Local Markets", "Cycling"], image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1887&auto=format&fit=crop" },
  ];

  const currentUser = {
    name: "Thanawat R.",
    age: 23,
    from: "Thailand",
    language: "Thai",
    costSharing: true,
    interests: ["Street Food", "Temples", "Cycling"],
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1887&auto=format&fit=crop",
  };

  const router = useRouter();
  const [connectedNames, setConnectedNames] = useState<string[]>([]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      const stored: { name: string }[] = JSON.parse(localStorage.getItem("connected_buddies") ?? "[]");
      setConnectedNames(stored.map((b) => b.name));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleConnect = (buddy: typeof buddies[0]) => {
    const stored: typeof buddies = JSON.parse(localStorage.getItem("connected_buddies") ?? "[]");
    if (!stored.find((b) => b.name === buddy.name)) {
      const updated = [...stored, buddy];
      localStorage.setItem("connected_buddies", JSON.stringify(updated));
    }
    setConnectedNames((prev) => prev.includes(buddy.name) ? prev : [...prev, buddy.name]);
    router.push("/buddies/connect_friend");
  };

  const [nationality, setNationality] = useState("Any");
  const [costOnly, setCostOnly] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({ nationality: "Any", costOnly: false });

  if (!mounted) return null;

  const filteredBuddies = buddies.filter((b) => {
    if (appliedFilters.nationality === "English Speakers" && b.language !== "English") return false;
    if (appliedFilters.nationality === "Same as me" && b.language !== currentUser.language) return false;
    if (appliedFilters.costOnly && !b.costSharing) return false;
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pt-32 pb-20 px-4 md:px-6 container mx-auto max-w-6xl">
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-heading">{dict.pages.buddies.title}</h1>
            <p className="text-xl text-muted-foreground">{dict.pages.buddies.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/buddies/connect_friend")}>
              My Friends
              {connectedNames.length > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                  {connectedNames.length}
                </span>
              )}
            </Button>
            <Button variant="outline" onClick={() => router.push("/profile")}>{dict.pages.buddies.profileBtn}</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            {/* <div className="glass p-6 rounded-2xl border border-border flex flex-col items-center text-center gap-3">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/30 shrink-0">
                <img src={currentUser.image} alt={currentUser.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Logged in as</p>
                <h3 className="text-lg font-bold">{currentUser.name}, {currentUser.age}</h3>
                <p className="text-sm text-muted-foreground">From {currentUser.from} · {currentUser.language}</p>
              </div>
              <div className="flex flex-wrap gap-1 justify-center">
                {currentUser.interests.map(i => (
                  <span key={i} className="text-xs px-2 py-1 bg-background border border-border rounded-md">{i}</span>
                ))}
              </div>
              <span className={`text-xs px-3 py-1 rounded-full border ${currentUser.costSharing ? "bg-green-500/10 text-green-600 border-green-500/30" : "bg-muted text-muted-foreground border-border"}`}>
                {currentUser.costSharing ? "Open to cost sharing" : "Not sharing costs"}
              </span>
            </div> */}

            <div className="glass p-6 rounded-2xl border border-border">
              <h2 className="text-xl font-bold mb-4">Filter Matches</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Nationality / Language</label>
                  <select
                    className="w-full bg-background border border-border rounded-lg px-4 py-2"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                  >
                    <option>Any</option>
                    <option>Same as me</option>
                    <option>English Speakers</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Cost Sharing</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="cost"
                      className="rounded"
                      checked={costOnly}
                      onChange={(e) => setCostOnly(e.target.checked)}
                    />
                    <label htmlFor="cost" className="text-sm">Looking to share ride/accommodation costs</label>
                  </div>
                </div>
                <Button className="w-full mt-4" onClick={() => setAppliedFilters({ nationality, costOnly })}>Apply Filters</Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="flex flex-col gap-6">
              {filteredBuddies.length === 0 && (
                <p className="text-muted-foreground text-center py-12">No buddies match your filters.</p>
              )}
              {filteredBuddies.map((buddy, i) => (
                <div key={i} onClick={() => router.push(`/buddies/profile/${encodeURIComponent(buddy.name)}`)} className="glass p-4 rounded-2xl border border-border flex flex-col sm:flex-row gap-6 items-center sm:items-start group hover:shadow-md transition-shadow cursor-pointer">
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
                    <div className="flex gap-2 justify-center sm:justify-start" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant={connectedNames.includes(buddy.name) ? "outline" : "default"}
                        onClick={() => handleConnect(buddy)}
                      >
                        {connectedNames.includes(buddy.name) ? "Connected ✓" : "Connect"}
                      </Button>
                      <Button variant="outline" onClick={() => router.push(`/buddies/trip_plan/${encodeURIComponent(buddy.name)}`)}>View Trip Plan</Button>
                      <Button variant="outline" onClick={() => router.push(`/buddies/message/${encodeURIComponent(buddy.name)}`)}>Message</Button>
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
