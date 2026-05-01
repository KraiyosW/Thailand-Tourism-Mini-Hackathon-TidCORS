"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type BuddyProfile = {
  name: string;
  handle: string;
  age: number;
  from: string;
  language: string;
  bio: string;
  image: string;
  coverImage: string;
  joinedDate: string;
  costSharing: boolean;
  interests: string[];
  travelStyle: string;
  stats: { placesVisited: number; routesGenerated: number; buddiesConnected: number; reviews: number };
  nextTrip: { destination: string; date: string; image: string };
  visitedPlaces: { name: string; region: string; image: string; rating: number }[];
  savedRoutes: { name: string; days: number; stops: number; style: string; createdAt: string }[];
  connectedBuddies: { name: string; from: string; image: string }[];
};

const buddyProfiles: Record<string, BuddyProfile> = {
  "Alex K.": {
    name: "Alex K.",
    handle: "@alex.krauss",
    age: 28,
    from: "Berlin, Germany",
    language: "German, English",
    bio: "Avid hiker and street food hunter. Travelled 40+ countries — Thailand keeps pulling me back every year.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=1200&auto=format&fit=crop",
    joinedDate: "January 2024",
    costSharing: true,
    interests: ["Hiking", "Photography", "Street Food"],
    travelStyle: "Adventure Seeker",
    stats: { placesVisited: 52, routesGenerated: 18, buddiesConnected: 14, reviews: 37 },
    nextTrip: { destination: "Doi Inthanon", date: "10–15 May 2026", image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop" },
    visitedPlaces: [
      { name: "Khao Sok National Park", region: "Surat Thani", image: "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/236/2024/06/17031656/Khao-Sok-National-Park-1.jpg", rating: 5 },
      { name: "Doi Inthanon", region: "Chiang Mai", image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop", rating: 5 },
      { name: "Erawan Waterfall", region: "Kanchanaburi", image: "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=800&auto=format&fit=crop", rating: 4 },
      { name: "Phu Chi Fa", region: "Chiang Rai", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=800&auto=format&fit=crop", rating: 5 },
    ],
    savedRoutes: [
      { name: "7-Day Northern Trek", days: 7, stops: 10, style: "Adventure & Nature", createdAt: "Mar 2026" },
      { name: "Kanchanaburi Escape", days: 4, stops: 6, style: "History & Nature", createdAt: "Jan 2026" },
    ],
    connectedBuddies: [
      { name: "Kenji T.", from: "Japan", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
      { name: "Sarah M.", from: "UK", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop" },
    ],
  },
  "Sarah M.": {
    name: "Sarah M.",
    handle: "@sarah.miles",
    age: 25,
    from: "London, UK",
    language: "English",
    bio: "Yoga teacher turned slow traveler. I chase sunsets, temples, and the perfect bowl of tom kha.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1741273229178-8f482aebca4f?q=80&w=1200&auto=format&fit=crop",
    joinedDate: "February 2024",
    costSharing: false,
    interests: ["Beaches", "Yoga", "Culture"],
    travelStyle: "Slow Traveler",
    stats: { placesVisited: 29, routesGenerated: 7, buddiesConnected: 11, reviews: 15 },
    nextTrip: { destination: "Koh Lanta", date: "20–28 May 2026", image: "https://images.unsplash.com/photo-1741273229178-8f482aebca4f?q=80&w=800&auto=format&fit=crop" },
    visitedPlaces: [
      { name: "Koh Kood", region: "Trat", image: "https://images.unsplash.com/photo-1741273229178-8f482aebca4f?q=80&w=800&auto=format&fit=crop", rating: 5 },
      { name: "Wat Rong Khun", region: "Chiang Rai", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=800&auto=format&fit=crop", rating: 5 },
      { name: "Pai", region: "Mae Hong Son", image: "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=800&auto=format&fit=crop", rating: 4 },
    ],
    savedRoutes: [
      { name: "Southern Islands Hop", days: 10, stops: 7, style: "Beach & Relaxation", createdAt: "Apr 2026" },
    ],
    connectedBuddies: [
      { name: "Alex K.", from: "Germany", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop" },
      { name: "Nadia P.", from: "USA", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=400&auto=format&fit=crop" },
    ],
  },
  "Kenji T.": {
    name: "Kenji T.",
    handle: "@kenji.travels",
    age: 31,
    from: "Tokyo, Japan",
    language: "Japanese, English",
    bio: "Architecture photographer with a love for coffee shops, ancient temples, and golden-hour light.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=1200&auto=format&fit=crop",
    joinedDate: "December 2023",
    costSharing: true,
    interests: ["Photography", "Cafes", "History"],
    travelStyle: "Culture Curator",
    stats: { placesVisited: 41, routesGenerated: 22, buddiesConnected: 9, reviews: 44 },
    nextTrip: { destination: "Sukhothai", date: "5–9 May 2026", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=800&auto=format&fit=crop" },
    visitedPlaces: [
      { name: "Sukhothai Historical Park", region: "Sukhothai", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=800&auto=format&fit=crop", rating: 5 },
      { name: "Chiang Khan", region: "Loei", image: "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=800&auto=format&fit=crop", rating: 4 },
      { name: "Ban Rak Thai", region: "Mae Hong Son", image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop", rating: 5 },
      { name: "Phu Chi Fa", region: "Chiang Rai", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=800&auto=format&fit=crop", rating: 5 },
    ],
    savedRoutes: [
      { name: "Lanna Culture Trail", days: 6, stops: 9, style: "Culture & History", createdAt: "Mar 2026" },
      { name: "Central Plains Heritage", days: 4, stops: 7, style: "History & Photography", createdAt: "Feb 2026" },
    ],
    connectedBuddies: [
      { name: "Alex K.", from: "Germany", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop" },
    ],
  },
  "Nadia P.": {
    name: "Nadia P.",
    handle: "@nadia.wanders",
    age: 27,
    from: "New York, USA",
    language: "English",
    bio: "Food writer documenting every market stall and temple entrance across Southeast Asia.",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=400&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop",
    joinedDate: "March 2024",
    costSharing: true,
    interests: ["Temples", "Street Food", "Markets"],
    travelStyle: "Food Explorer",
    stats: { placesVisited: 38, routesGenerated: 14, buddiesConnected: 16, reviews: 52 },
    nextTrip: { destination: "Chiang Mai Night Bazaar", date: "18–22 May 2026", image: "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=800&auto=format&fit=crop" },
    visitedPlaces: [
      { name: "Or Tor Kor Market", region: "Bangkok", image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop", rating: 5 },
      { name: "Chatuchak Weekend Market", region: "Bangkok", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=800&auto=format&fit=crop", rating: 4 },
      { name: "Wat Pho", region: "Bangkok", image: "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=800&auto=format&fit=crop", rating: 5 },
    ],
    savedRoutes: [
      { name: "Bangkok Street Food Circuit", days: 3, stops: 12, style: "Food & Markets", createdAt: "Apr 2026" },
      { name: "Chiang Mai Temple & Taste", days: 5, stops: 9, style: "Culture & Food", createdAt: "Mar 2026" },
    ],
    connectedBuddies: [
      { name: "Sarah M.", from: "UK", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop" },
    ],
  },
  "Arjun S.": {
    name: "Arjun S.",
    handle: "@arjun.backpacks",
    age: 30,
    from: "Mumbai, India",
    language: "English, Hindi",
    bio: "Budget backpacker and amateur chef. If it costs under $10 and tastes amazing, I'm in.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=1200&auto=format&fit=crop",
    joinedDate: "April 2024",
    costSharing: true,
    interests: ["Backpacking", "Budget Travel", "Cooking"],
    travelStyle: "Budget Backpacker",
    stats: { placesVisited: 23, routesGenerated: 9, buddiesConnected: 6, reviews: 18 },
    nextTrip: { destination: "Kanchanaburi", date: "12–16 May 2026", image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop" },
    visitedPlaces: [
      { name: "Erawan Waterfall", region: "Kanchanaburi", image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop", rating: 4 },
      { name: "Ayutthaya", region: "Ayutthaya", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=800&auto=format&fit=crop", rating: 5 },
    ],
    savedRoutes: [
      { name: "Budget Central Thailand", days: 5, stops: 8, style: "Budget & History", createdAt: "Mar 2026" },
    ],
    connectedBuddies: [],
  },
  "Ploy C.": {
    name: "Ploy C.",
    handle: "@ploy.chiangmai",
    age: 24,
    from: "Chiang Mai, Thailand",
    language: "Thai, English",
    bio: "Local guide who loves showing hidden corners of Chiang Mai that tourists miss. Night market is my second home.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=1200&auto=format&fit=crop",
    joinedDate: "May 2024",
    costSharing: false,
    interests: ["Nightlife", "Shopping", "Food Tours"],
    travelStyle: "Local Expert",
    stats: { placesVisited: 19, routesGenerated: 5, buddiesConnected: 20, reviews: 31 },
    nextTrip: { destination: "Pai", date: "25–28 May 2026", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=800&auto=format&fit=crop" },
    visitedPlaces: [
      { name: "Chiang Mai Night Bazaar", region: "Chiang Mai", image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop", rating: 5 },
      { name: "Doi Suthep", region: "Chiang Mai", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=800&auto=format&fit=crop", rating: 5 },
    ],
    savedRoutes: [
      { name: "Chiang Mai Local Loop", days: 3, stops: 10, style: "Local & Food", createdAt: "Apr 2026" },
    ],
    connectedBuddies: [],
  },
  "Lucas B.": {
    name: "Lucas B.",
    handle: "@lucas.dives",
    age: 33,
    from: "São Paulo, Brazil",
    language: "Portuguese, English",
    bio: "Scuba instructor and beach bum. Rated every dive site from Similan to the Gulf. Thailand's underwater world is unmatched.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1741273229178-8f482aebca4f?q=80&w=1200&auto=format&fit=crop",
    joinedDate: "November 2023",
    costSharing: true,
    interests: ["Diving", "Beaches", "Adventure"],
    travelStyle: "Ocean Adventurer",
    stats: { placesVisited: 47, routesGenerated: 11, buddiesConnected: 19, reviews: 28 },
    nextTrip: { destination: "Similan Islands", date: "8–13 May 2026", image: "https://images.unsplash.com/photo-1741273229178-8f482aebca4f?q=80&w=800&auto=format&fit=crop" },
    visitedPlaces: [
      { name: "Similan Islands", region: "Phang Nga", image: "https://images.unsplash.com/photo-1741273229178-8f482aebca4f?q=80&w=800&auto=format&fit=crop", rating: 5 },
      { name: "Koh Tao", region: "Surat Thani", image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop", rating: 5 },
      { name: "Koh Lipe", region: "Satun", image: "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=800&auto=format&fit=crop", rating: 5 },
    ],
    savedRoutes: [
      { name: "Andaman Dive Circuit", days: 8, stops: 5, style: "Diving & Beach", createdAt: "Feb 2026" },
    ],
    connectedBuddies: [],
  },
  "Mia L.": {
    name: "Mia L.",
    handle: "@mia.eco",
    age: 26,
    from: "Melbourne, Australia",
    language: "English",
    bio: "Environmental scientist and eco-traveler. I leave only footprints and always offset my flights.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=1200&auto=format&fit=crop",
    joinedDate: "February 2024",
    costSharing: false,
    interests: ["Wildlife", "Eco-Tourism", "Trekking"],
    travelStyle: "Eco Traveler",
    stats: { placesVisited: 26, routesGenerated: 8, buddiesConnected: 7, reviews: 22 },
    nextTrip: { destination: "Khao Yai National Park", date: "22–26 May 2026", image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop" },
    visitedPlaces: [
      { name: "Khao Yai National Park", region: "Nakhon Ratchasima", image: "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/236/2024/06/17031656/Khao-Sok-National-Park-1.jpg", rating: 5 },
      { name: "Doi Inthanon", region: "Chiang Mai", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=800&auto=format&fit=crop", rating: 5 },
    ],
    savedRoutes: [
      { name: "National Parks of Thailand", days: 10, stops: 6, style: "Wildlife & Trekking", createdAt: "Mar 2026" },
    ],
    connectedBuddies: [],
  },
  "Som N.": {
    name: "Som N.",
    handle: "@som.cyclist",
    age: 29,
    from: "Khon Kaen, Thailand",
    language: "Thai, English",
    bio: "Muay Thai fighter by morning, bicycle tourist by afternoon. Exploring Isaan one pedal at a time.",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=400&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=1200&auto=format&fit=crop",
    joinedDate: "June 2024",
    costSharing: true,
    interests: ["Muay Thai", "Local Markets", "Cycling"],
    travelStyle: "Active Local",
    stats: { placesVisited: 17, routesGenerated: 4, buddiesConnected: 5, reviews: 9 },
    nextTrip: { destination: "Nong Khai", date: "3–7 May 2026", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=800&auto=format&fit=crop" },
    visitedPlaces: [
      { name: "Chiang Khan Walking Street", region: "Loei", image: "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=800&auto=format&fit=crop", rating: 4 },
      { name: "Phu Kradueng", region: "Loei", image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop", rating: 5 },
    ],
    savedRoutes: [
      { name: "Isaan Cycling Route", days: 6, stops: 8, style: "Active & Local", createdAt: "Apr 2026" },
    ],
    connectedBuddies: [],
  },
};

type Tab = "places" | "routes" | "buddies";

export default function BuddyProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("places");

  const buddyName = decodeURIComponent(params.buddyName as string);
  const buddy = buddyProfiles[buddyName];

  if (!buddy) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-muted-foreground text-lg">Buddy profile not found.</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Cover */}
      <div className="relative h-56 md:h-72 w-full">
        <img src={buddy.coverImage} alt="cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 hover:bg-black/60 text-white text-sm font-medium px-4 py-2 rounded-full backdrop-blur-md border border-white/20 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
          </svg>
          Back
        </button>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 md:px-8">
        {/* Avatar + name */}
        <div className="relative -mt-16 flex flex-col sm:flex-row items-start sm:items-end gap-4 mb-6">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-background overflow-hidden shadow-xl shrink-0">
            <img src={buddy.image} alt={buddy.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 pb-1">
            <h1 className="text-2xl md:text-3xl font-extrabold font-heading">{buddy.name}</h1>
            <p className="text-muted-foreground text-sm">{buddy.handle} · {buddy.from}</p>
          </div>
          <div className="flex gap-2 pb-1 mt-2 sm:mt-0">
            <Button variant="outline" size="sm" onClick={() => router.push(`/buddies/message/${encodeURIComponent(buddy.name)}`)}>
              Message
            </Button>
            <Button size="sm" onClick={() => router.push(`/buddies/trip_plan/${encodeURIComponent(buddy.name)}`)}>
              View Trip Plan
            </Button>
          </div>
        </div>

        {/* Bio & Meta */}
        <div className="glass p-5 rounded-2xl border border-border mb-6">
          <p className="text-sm text-foreground mb-3">{buddy.bio}</p>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {buddy.from}
            </span>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
              Joined {buddy.joinedDate}
            </span>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              {buddy.language}
            </span>
            <span className={`px-2 py-0.5 rounded-full border text-xs font-medium ${buddy.costSharing ? "bg-green-500/10 text-green-600 border-green-500/30" : "bg-muted text-muted-foreground border-border"}`}>
              {buddy.costSharing ? "Open to cost sharing" : "Not sharing costs"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {buddy.interests.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-muted border border-border rounded-full text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Places Visited", value: buddy.stats.placesVisited, color: "text-primary" },
            { label: "Routes Generated", value: buddy.stats.routesGenerated, color: "text-secondary" },
            { label: "Buddies", value: buddy.stats.buddiesConnected, color: "text-accent" },
            { label: "Reviews", value: buddy.stats.reviews, color: "text-purple-500" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl border border-border p-4 text-center">
              <p className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Next Trip */}
        <div className="relative rounded-2xl overflow-hidden border border-border mb-8 h-36 group">
          <img src={buddy.nextTrip.image} alt={buddy.nextTrip.destination} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-6">
            <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Next Trip</p>
            <h2 className="text-white text-2xl font-extrabold font-heading">{buddy.nextTrip.destination}</h2>
            <p className="text-white/80 text-sm mt-1">{buddy.nextTrip.date}</p>
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
              {tab === "places" && `Places (${buddy.visitedPlaces.length})`}
              {tab === "routes" && `Routes (${buddy.savedRoutes.length})`}
              {tab === "buddies" && `Buddies (${buddy.connectedBuddies.length})`}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "places" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
            {buddy.visitedPlaces.map((place, i) => (
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
            {buddy.savedRoutes.map((route, i) => (
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
                <Button variant="outline" size="sm">View</Button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "buddies" && (
          <div className="mb-12">
            {buddy.connectedBuddies.length === 0 ? (
              <p className="text-muted-foreground text-center py-12 text-sm">No buddies connected yet.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {buddy.connectedBuddies.map((b, i) => (
                  <div key={i} className="glass p-4 rounded-2xl border border-border flex flex-col items-center gap-3 text-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30">
                      <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{b.name}</p>
                      <p className="text-xs text-muted-foreground">From {b.from}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => router.push(`/buddies/profile/${encodeURIComponent(b.name)}`)}
                    >
                      View Profile
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
