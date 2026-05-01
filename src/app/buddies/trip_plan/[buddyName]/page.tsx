"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type TripDay = { day: string; activities: string[] };
type TripPlan = {
  destination: string;
  dates: string;
  duration: string;
  budget: string;
  image: string;
  overview: string;
  itinerary: TripDay[];
  lookingFor: string[];
};

const tripPlans: Record<string, TripPlan> = {
  "Alex K.": {
    destination: "Chiang Mai & Pai, Northern Thailand",
    dates: "Jun 15 – Jun 22, 2025",
    duration: "7 days",
    budget: "~฿12,000 / person",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070&auto=format&fit=crop",
    overview: "A week exploring northern Thailand's mountains, temples, and street food scene. Perfect for hikers and photography enthusiasts.",
    itinerary: [
      { day: "Day 1–2", activities: ["Arrive Chiang Mai", "Explore Nimman Road", "Night Bazaar street food crawl"] },
      { day: "Day 3", activities: ["Doi Inthanon National Park hike", "Twin Royal Chedis", "Waterfall photography"] },
      { day: "Day 4–5", activities: ["Bus to Pai", "Pai Canyon sunset hike", "Hot springs soak", "Pai Walking Street"] },
      { day: "Day 6–7", activities: ["Elephant sanctuary half-day", "Wat Phra Singh & old city temples", "Fly home from CNX"] },
    ],
    lookingFor: ["Fellow hiker or photographer", "OK with budget guesthouses", "Early riser for sunrise shots"],
  },
  "Sarah M.": {
    destination: "Koh Samui & Koh Tao, Gulf of Thailand",
    dates: "Jul 1 – Jul 8, 2025",
    duration: "7 days",
    budget: "~฿15,000 / person",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop",
    overview: "Island-hopping through the Gulf of Thailand — beach yoga, snorkeling, and local temple visits.",
    itinerary: [
      { day: "Day 1–2", activities: ["Arrive Koh Samui", "Chaweng Beach", "Morning yoga session at resort"] },
      { day: "Day 3", activities: ["Wat Plai Laem temple", "Big Buddha", "Fisherman's Village night market"] },
      { day: "Day 4–5", activities: ["Ferry to Koh Tao", "Snorkeling at Shark Bay", "PADI intro dive option"] },
      { day: "Day 6–7", activities: ["Sunset viewpoint hike", "Return to Samui", "Spa day & departure"] },
    ],
    lookingFor: ["Yoga practitioner or beach lover", "Comfortable with water activities", "Values cultural sightseeing too"],
  },
  "Kenji T.": {
    destination: "Bangkok & Ayutthaya, Central Thailand",
    dates: "May 20 – May 26, 2025",
    duration: "6 days",
    budget: "~฿10,000 / person",
    image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=1974&auto=format&fit=crop",
    overview: "A deep dive into Thai history — ancient temples, café culture in Bangkok, and the UNESCO ruins of Ayutthaya.",
    itinerary: [
      { day: "Day 1–2", activities: ["Arrive Bangkok", "Specialty coffee trail in Silom", "Wat Arun golden hour shoot"] },
      { day: "Day 3", activities: ["Grand Palace & Wat Phra Kaew", "Chatuchak Weekend Market", "Rooftop bar sunset"] },
      { day: "Day 4–5", activities: ["Day trip to Ayutthaya by train", "Wat Mahathat", "Bicycle tour of ruins", "Return to Bangkok"] },
      { day: "Day 6", activities: ["Chinatown street photography", "Jim Thompson House", "Departure from BKK"] },
    ],
    lookingFor: ["History buff or architecture lover", "Patient enough for long photo sessions", "Enjoys quiet cafés over loud bars"],
  },
  "Nadia P.": {
    destination: "Bangkok City Deep Dive",
    dates: "Jun 5 – Jun 10, 2025",
    duration: "5 days",
    budget: "~฿8,000 / person",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=2050&auto=format&fit=crop",
    overview: "An immersive Bangkok food and temple tour — from floating markets to Michelin-starred street stalls.",
    itinerary: [
      { day: "Day 1", activities: ["Arrive BKK", "Yaowarat (Chinatown) dinner", "Pak Khlong Talat flower market at midnight"] },
      { day: "Day 2", activities: ["Damnoen Saduak Floating Market", "Or Tor Kor fresh market", "Cooking class"] },
      { day: "Day 3", activities: ["Wat Pho", "Wat Arun", "Thonburi canal boat tour"] },
      { day: "Day 4–5", activities: ["Chatuchak weekend market", "JJ Green night market", "Asiatique riverside farewell dinner"] },
    ],
    lookingFor: ["Adventurous eater, no food restrictions", "Loves bargain hunting at markets", "Flexible itinerary OK"],
  },
  "Arjun S.": {
    destination: "Thailand Budget Backpacker Route",
    dates: "Aug 1 – Aug 14, 2025",
    duration: "14 days",
    budget: "~฿6,000 / person",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1974&auto=format&fit=crop",
    overview: "The classic backpacker loop on a shoestring — Bangkok, Chiang Mai, and the islands by overnight bus and boat.",
    itinerary: [
      { day: "Day 1–3", activities: ["Bangkok: Khao San Road base", "Street food budget meals", "Temple hopping"] },
      { day: "Day 4–6", activities: ["Overnight train to Chiang Mai", "Doi Suthep hike", "Night Bazaar eats"] },
      { day: "Day 7–10", activities: ["Overnight bus to Surat Thani", "Ferry to Koh Phangan", "Haad Rin Beach"] },
      { day: "Day 11–14", activities: ["Koh Phangan cooking class", "Ferry to Koh Samui", "Fly back from USM"] },
    ],
    lookingFor: ["Fellow backpacker on a budget", "Happy to share dorm rooms", "Can cook or split grocery costs"],
  },
  "Ploy C.": {
    destination: "Bangkok Nights & Shopping",
    dates: "May 30 – Jun 3, 2025",
    duration: "4 days",
    budget: "~฿14,000 / person",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    overview: "Bangkok's best nightlife strips, rooftop bars, and world-class shopping malls — all in 4 nights.",
    itinerary: [
      { day: "Day 1", activities: ["Arrive, check into trendy Silom hotel", "ICONSIAM mall opening tour", "Asiatique riverside dinner"] },
      { day: "Day 2", activities: ["Siam Paragon & MBK shopping", "Sukhumvit street food lunch", "Levels Club at night"] },
      { day: "Day 3", activities: ["Chatuchak Weekend Market", "Platinum Fashion Mall", "Octave rooftop bar sunset"] },
      { day: "Day 4", activities: ["Brunch at local café", "Last-minute shopping at Terminal 21", "Depart from Suvarnabhumi"] },
    ],
    lookingFor: ["Night owl, likes to stay out late", "Into fashion and shopping", "Doesn't mind spending on good nightlife"],
  },
  "Lucas B.": {
    destination: "Koh Tao Dive Trip",
    dates: "Jul 15 – Jul 21, 2025",
    duration: "6 days",
    budget: "~฿16,000 / person",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
    overview: "World-class scuba diving on Koh Tao — from beginner open-water courses to advanced reef dives.",
    itinerary: [
      { day: "Day 1", activities: ["Fly to Koh Samui, ferry to Koh Tao", "Check in dive resort", "Night dive orientation"] },
      { day: "Day 2–3", activities: ["PADI Open Water or Advanced course", "Chumphon Pinnacle dive", "Shark Bay snorkel"] },
      { day: "Day 4", activities: ["Sail Rock dive (whale shark season)", "Underwater photography session"] },
      { day: "Day 5–6", activities: ["Freedom Beach kayak", "Sairee Village sunset drinks", "Ferry & fly home"] },
    ],
    lookingFor: ["Certified diver or willing to get certified", "Loves ocean & marine life", "Adventurous & physically active"],
  },
  "Mia L.": {
    destination: "Khao Yai & Kanchanaburi, Western Thailand",
    dates: "Sep 5 – Sep 11, 2025",
    duration: "6 days",
    budget: "~฿9,500 / person",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop",
    overview: "Wildlife spotting and jungle trekking in UNESCO-listed Khao Yai, then the historic River Kwai in Kanchanaburi.",
    itinerary: [
      { day: "Day 1–2", activities: ["Drive to Khao Yai NP", "Night wildlife safari", "Elephant & hornbill spotting trek"] },
      { day: "Day 3", activities: ["Haew Narok waterfall hike", "Bat cave sunset watch (3M bats)", "Farm stay overnight"] },
      { day: "Day 4–5", activities: ["Drive to Kanchanaburi", "Bridge over River Kwai", "Erawan National Park waterfall swim"] },
      { day: "Day 6", activities: ["JEATH War Museum", "Train ride along Death Railway", "Return to Bangkok"] },
    ],
    lookingFor: ["Nature lover, OK with long hikes", "Early riser for wildlife spotting", "Eco-conscious traveller"],
  },
  "Som N.": {
    destination: "Hidden Bangkok — Local's Guide",
    dates: "Jun 20 – Jun 23, 2025",
    duration: "3 days",
    budget: "~฿4,500 / person",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop",
    overview: "Skip the tourist traps — cycling through local neighbourhoods, watching Muay Thai at actual stadiums, and eating where locals eat.",
    itinerary: [
      { day: "Day 1", activities: ["Morning cycling tour: Phra Khanong local markets", "Authentic boat noodles for lunch", "Lumpini Park evening ride"] },
      { day: "Day 2", activities: ["Rajadamnern Boxing Stadium live Muay Thai", "Bang Rak vintage shophouse district", "Local wet market breakfast"] },
      { day: "Day 3", activities: ["Bang Krachao 'green lung' cycling loop", "Organic market brunch", "Taling Chan Floating Market"] },
    ],
    lookingFor: ["Cyclist or willing to rent a bike", "Interested in real local life, not tourist spots", "Muay Thai fan is a bonus"],
  },
};

const fallbackPlan: TripPlan = {
  destination: "Thailand Adventure",
  dates: "TBD",
  duration: "7 days",
  budget: "TBD",
  image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
  overview: "An amazing trip through Thailand's highlights.",
  itinerary: [
    { day: "Day 1–3", activities: ["Arrive & explore", "Local food tour", "Temple visits"] },
    { day: "Day 4–7", activities: ["Day trips", "Markets", "Relaxation"] },
  ],
  lookingFor: ["Open-minded traveller", "Flexible schedule"],
};

type Buddy = {
  name: string; age: number; from: string; language: string;
  costSharing: boolean; match: string; interests: string[]; image: string;
};

const buddyDetails: Record<string, Buddy> = {
  "Alex K.":  { name: "Alex K.",  age: 28, from: "Germany",   language: "German",     costSharing: true,  match: "98%", interests: ["Hiking", "Photography", "Street Food"], image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop" },
  "Sarah M.": { name: "Sarah M.", age: 25, from: "UK",        language: "English",    costSharing: false, match: "92%", interests: ["Beaches", "Yoga", "Culture"],            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop" },
  "Kenji T.": { name: "Kenji T.", age: 31, from: "Japan",     language: "Japanese",   costSharing: true,  match: "85%", interests: ["Photography", "Cafes", "History"],       image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop" },
  "Nadia P.": { name: "Nadia P.", age: 27, from: "USA",       language: "English",    costSharing: true,  match: "89%", interests: ["Temples", "Street Food", "Markets"],     image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1887&auto=format&fit=crop" },
  "Arjun S.": { name: "Arjun S.", age: 30, from: "India",     language: "English",    costSharing: true,  match: "81%", interests: ["Backpacking", "Budget Travel", "Cooking"], image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop" },
  "Ploy C.":  { name: "Ploy C.",  age: 24, from: "Thailand",  language: "Thai",       costSharing: false, match: "77%", interests: ["Nightlife", "Shopping", "Food Tours"],   image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop" },
  "Lucas B.": { name: "Lucas B.", age: 33, from: "Brazil",    language: "Portuguese", costSharing: true,  match: "74%", interests: ["Diving", "Beaches", "Adventure"],        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" },
  "Mia L.":   { name: "Mia L.",   age: 26, from: "Australia", language: "English",    costSharing: false, match: "70%", interests: ["Wildlife", "Eco-Tourism", "Trekking"],   image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1887&auto=format&fit=crop" },
  "Som N.":   { name: "Som N.",   age: 29, from: "Thailand",  language: "Thai",       costSharing: true,  match: "66%", interests: ["Muay Thai", "Local Markets", "Cycling"], image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1887&auto=format&fit=crop" },
};

export default function TripPlanPage() {
  const params = useParams<{ buddyName: string }>();
  const router = useRouter();
  const buddyName = decodeURIComponent(params.buddyName);
  const plan = tripPlans[buddyName] ?? fallbackPlan;

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const stored: Buddy[] = JSON.parse(localStorage.getItem("connected_buddies") ?? "[]");
    setIsConnected(stored.some((b) => b.name === buddyName));
  }, [buddyName]);

  const handleConnect = () => {
    const buddy = buddyDetails[buddyName];
    if (!buddy) return;
    const stored: Buddy[] = JSON.parse(localStorage.getItem("connected_buddies") ?? "[]");
    if (!stored.find((b) => b.name === buddyName)) {
      localStorage.setItem("connected_buddies", JSON.stringify([...stored, buddy]));
    }
    setIsConnected(true);
    router.push("/buddies/connect_friend");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pt-32 pb-20 px-4 md:px-6 container mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{buddyName}'s Trip Plan</p>
            <h1 className="text-3xl md:text-4xl font-extrabold font-heading">{plan.destination}</h1>
          </div>
          <Button variant="outline" onClick={() => router.back()}>← Back</Button>
        </div>

        {/* Hero image */}
        <div className="w-full h-56 md:h-72 rounded-2xl overflow-hidden mb-8 border border-border">
          <img src={plan.image} alt={plan.destination} className="w-full h-full object-cover" />
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Dates", value: plan.dates },
            { label: "Duration", value: plan.duration },
            { label: "Budget", value: plan.budget },
            { label: "Traveller", value: buddyName },
          ].map(({ label, value }) => (
            <div key={label} className="glass p-4 rounded-xl border border-border text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
              <p className="font-semibold text-sm">{value}</p>
            </div>
          ))}
        </div>

        {/* Overview */}
        <div className="glass p-6 rounded-2xl border border-border mb-6">
          <h2 className="text-lg font-bold mb-2">Overview</h2>
          <p className="text-muted-foreground">{plan.overview}</p>
        </div>

        {/* Itinerary */}
        <div className="glass p-6 rounded-2xl border border-border mb-6">
          <h2 className="text-lg font-bold mb-4">Itinerary</h2>
          <div className="space-y-4">
            {plan.itinerary.map((item) => (
              <div key={item.day} className="flex gap-4">
                <div className="shrink-0 w-20 text-sm font-semibold text-primary pt-0.5">{item.day}</div>
                <ul className="flex-1 space-y-1">
                  {item.activities.map((act) => (
                    <li key={act} className="text-sm text-muted-foreground flex gap-2 items-start">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {act}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Looking for */}
        <div className="glass p-6 rounded-2xl border border-border mb-8">
          <h2 className="text-lg font-bold mb-3">Looking for a travel buddy who…</h2>
          <ul className="space-y-2">
            {plan.lookingFor.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-primary font-bold">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="flex gap-3 justify-center">
          <Button
            variant={isConnected ? "outline" : "default"}
            onClick={handleConnect}
          >
            {isConnected ? "Connected ✓" : "Connect"}
          </Button>
          <Button variant="outline" onClick={() => router.push(`/buddies/message/${encodeURIComponent(buddyName)}`)}>Message {buddyName.split(" ")[0]}</Button>
        </div>

      </main>
    </div>
  );
}
