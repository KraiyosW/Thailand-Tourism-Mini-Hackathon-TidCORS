"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const mockUser = {
  name: "Thanawat Rung",
  handle: "@thanawat.r",
  age: 23,
  from: "Bangkok, Thailand",
  language: "Thai, English",
  bio: "Solo traveler & street food enthusiast. On a mission to visit every unseen corner of Thailand before turning 25.",
  image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=1200&auto=format&fit=crop",
  joinedDate: "March 2024",
  stats: {
    placesVisited: 34,
    routesGenerated: 12,
    buddiesConnected: 8,
    reviews: 21,
  },
  interests: ["Street Food", "Temples", "Cycling", "Photography", "Night Markets"],
  travelStyle: "Budget Explorer",
  costSharing: true,
  nextTrip: {
    destination: "Nan Province",
    date: "15–20 May 2026",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop",
  },
};

const visitedPlaces = [
  { name: "Khao Sok National Park", region: "Surat Thani", image: "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/236/2024/06/17031656/Khao-Sok-National-Park-1.jpg", rating: 5 },
  { name: "Phu Chi Fa", region: "Chiang Rai", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=800&auto=format&fit=crop", rating: 5 },
  { name: "Ban Rak Thai", region: "Mae Hong Son", image: "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=800&auto=format&fit=crop", rating: 4 },
  { name: "Erawan Waterfall", region: "Kanchanaburi", image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop", rating: 4 },
  { name: "Koh Kood", region: "Trat", image: "https://images.unsplash.com/photo-1741273229178-8f482aebca4f?q=80&w=800&auto=format&fit=crop", rating: 5 },
  { name: "Chiang Khan Walking Street", region: "Loei", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=800&auto=format&fit=crop", rating: 4 },
];

const savedRoutes = [
  { name: "5-Day Northern Loop", days: 5, stops: 8, style: "Culture & Nature", createdAt: "Apr 2026" },
  { name: "Bangkok to Hua Hin Escape", days: 3, stops: 5, style: "Food & Relaxation", createdAt: "Mar 2026" },
  { name: "Isaan Hidden Trail", days: 7, stops: 11, style: "Adventure & Local", createdAt: "Feb 2026" },
];

const connectedBuddies = [
  { name: "Sarah M.", from: "UK", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop" },
  { name: "Kenji T.", from: "Japan", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
  { name: "Nadia P.", from: "USA", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=400&auto=format&fit=crop" },
  { name: "Alex K.", from: "Germany", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop" },
];

type Tab = "places" | "routes" | "buddies";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("places");
  const [editing, setEditing] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Cover + Avatar */}
      <div className="relative h-56 md:h-72 w-full">
        <img
          src={mockUser.coverImage}
          alt="cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 md:px-8">
        {/* Avatar + name row */}
        <div className="relative -mt-16 flex flex-col sm:flex-row items-start sm:items-end gap-4 mb-6">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-background overflow-hidden shadow-xl shrink-0">
            <img src={mockUser.image} alt={mockUser.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 pb-1">
            <h1 className="text-2xl md:text-3xl font-extrabold font-heading">{mockUser.name}</h1>
            <p className="text-muted-foreground text-sm">{mockUser.handle} · {mockUser.from}</p>
          </div>

          <div className="flex gap-2 pb-1 mt-2 sm:mt-0">
            <Button variant="outline" size="sm" onClick={() => setEditing(!editing)}>
              {editing ? "Cancel" : "Edit Profile"}
            </Button>
            <Button size="sm">Share</Button>
          </div>
        </div>

        {/* Bio & Meta */}
        <div className="glass p-5 rounded-2xl border border-border mb-6">
          {editing ? (
            <textarea
              defaultValue={mockUser.bio}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm resize-none mb-3"
              rows={3}
            />
          ) : (
            <p className="text-sm text-foreground mb-3">{mockUser.bio}</p>
          )}

          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {mockUser.from}
            </span>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
              Joined {mockUser.joinedDate}
            </span>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              {mockUser.language}
            </span>
            <span className={`px-2 py-0.5 rounded-full border text-xs font-medium ${mockUser.costSharing ? "bg-green-500/10 text-green-600 border-green-500/30" : "bg-muted text-muted-foreground border-border"}`}>
              {mockUser.costSharing ? "Open to cost sharing" : "Not sharing costs"}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {mockUser.interests.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-muted border border-border rounded-full text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Places Visited", value: mockUser.stats.placesVisited, color: "text-primary" },
            { label: "Routes Generated", value: mockUser.stats.routesGenerated, color: "text-secondary" },
            { label: "Buddies", value: mockUser.stats.buddiesConnected, color: "text-accent" },
            { label: "Reviews", value: mockUser.stats.reviews, color: "text-purple-500" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl border border-border p-4 text-center">
              <p className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Next Trip Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-border mb-8 h-36 group">
          <img src={mockUser.nextTrip.image} alt={mockUser.nextTrip.destination} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-6">
            <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Next Trip</p>
            <h2 className="text-white text-2xl font-extrabold font-heading">{mockUser.nextTrip.destination}</h2>
            <p className="text-white/80 text-sm mt-1">{mockUser.nextTrip.date}</p>
          </div>
          <div className="absolute top-3 right-4">
            <span className="bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow">Upcoming</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-6 gap-6">
          {(["places", "routes", "buddies"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "places" && `Places (${visitedPlaces.length})`}
              {tab === "routes" && `Routes (${savedRoutes.length})`}
              {tab === "buddies" && `Buddies (${connectedBuddies.length})`}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "places" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
            {visitedPlaces.map((place, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow aspect-[4/3]">
                <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-3">
                  <p className="text-white text-sm font-bold leading-tight">{place.name}</p>
                  <p className="text-white/70 text-xs">{place.region}</p>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <svg key={s} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill={s < place.rating ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "routes" && (
          <div className="flex flex-col gap-4 mb-12">
            {savedRoutes.map((route, i) => (
              <div key={i} className="glass p-5 rounded-2xl border border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3h18v4H3z"/><path d="M7 7v14"/><path d="M17 7v14"/><path d="M3 11h18"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-base">{route.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{route.days} days · {route.stops} stops · {route.style}</p>
                    <p className="text-xs text-muted-foreground">Created {route.createdAt}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm">View</Button>
                  <Button size="sm">Share</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "buddies" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {connectedBuddies.map((buddy, i) => (
              <div key={i} className="glass p-4 rounded-2xl border border-border flex flex-col items-center gap-3 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30">
                  <img src={buddy.image} alt={buddy.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-sm">{buddy.name}</p>
                  <p className="text-xs text-muted-foreground">From {buddy.from}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full text-xs">Message</Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
