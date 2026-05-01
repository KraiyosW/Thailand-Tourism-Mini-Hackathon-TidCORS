"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/i18n/DictionaryContext";

type Interest =
  | "culture"
  | "food"
  | "nature"
  | "activity"
  | "cafe"
  | "unseen"
  | "shopping";
type Pace = "easy" | "balanced" | "packed";
type Budget = "low" | "medium" | "premium";
type Crowd = "quiet" | "moderate" | "popular";

type StartingArea = {
  id: string;
  name: string;
  province: string;
  region: string;
  baseFare: number;
};

type Place = {
  id: string;
  title: string;
  area: string;
  province: string;
  time: string;
  duration: number;
  image: string;
  tags: Interest[];
  cost: Budget;
  crowd: Crowd;
  distanceKm: number;
  routeOrder: number;
  startAreaIds: string[];
  description: string;
  localTip: string;
};

type PlaceDetail = {
  address: string;
  hours: string;
  price: string;
  bestTime: string;
  accessibility: string;
  transportNote: string;
  highlights: string[];
  nearby: string[];
};

type Guide = {
  name: string;
  province: string;
  tags: Interest[];
  languages: string[];
  verification: string;
  rate: number;
};

type Buddy = {
  name: string;
  nationality: string;
  language: string;
  tags: Interest[];
  budget: Budget;
};

const startingAreas: StartingArea[] = [
  {
    id: "chiang-mai-old-city",
    name: "Chiang Mai Old City",
    province: "Chiang Mai",
    region: "North",
    baseFare: 900,
  },
  {
    id: "nimman",
    name: "Nimman",
    province: "Chiang Mai",
    region: "North",
    baseFare: 850,
  },
  {
    id: "mae-rim",
    name: "Mae Rim",
    province: "Chiang Mai",
    region: "North",
    baseFare: 1050,
  },
  {
    id: "mae-on",
    name: "Mae On",
    province: "Chiang Mai",
    region: "North",
    baseFare: 1150,
  },
  {
    id: "chiang-rai-clock",
    name: "Chiang Rai Clock Tower",
    province: "Chiang Rai",
    region: "North",
    baseFare: 950,
  },
  {
    id: "bangkok-riverside",
    name: "Bangkok Riverside",
    province: "Bangkok",
    region: "Central",
    baseFare: 750,
  },
  {
    id: "ari",
    name: "Ari",
    province: "Bangkok",
    region: "Central",
    baseFare: 700,
  },
  {
    id: "ayutthaya-park",
    name: "Ayutthaya Historical Park",
    province: "Ayutthaya",
    region: "Central",
    baseFare: 850,
  },
  {
    id: "phuket-old-town",
    name: "Phuket Old Town",
    province: "Phuket",
    region: "South",
    baseFare: 900,
  },
  {
    id: "ao-nang",
    name: "Ao Nang",
    province: "Krabi",
    region: "South",
    baseFare: 1000,
  },
];

const interestOptions: { value: Interest; label: string }[] = [
  { value: "culture", label: "Culture" },
  { value: "food", label: "Food" },
  { value: "nature", label: "Nature" },
  { value: "activity", label: "Activities" },
  { value: "cafe", label: "Cafe" },
  { value: "unseen", label: "Unseen" },
  { value: "shopping", label: "Shopping" },
];

const places: Place[] = [
  {
    id: "doi-suthep",
    title: "Wat Phra That Doi Suthep",
    area: "Doi Suthep",
    province: "Chiang Mai",
    time: "08:30",
    duration: 90,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c1/Wat_Phra_That_Doi_Suthep_%28I%29.jpg",
    tags: ["culture", "unseen"],
    cost: "low",
    crowd: "popular",
    distanceKm: 16,
    routeOrder: 1,
    startAreaIds: ["chiang-mai-old-city", "nimman", "mae-rim"],
    description:
      "A sunrise temple stop with a strong cultural anchor and wide city views.",
    localTip:
      "Go before 9 AM, then continue down the mountain before traffic builds.",
  },
  {
    id: "baan-kang-wat",
    title: "Baan Kang Wat",
    area: "Suthep",
    province: "Chiang Mai",
    time: "10:45",
    duration: 75,
    image: "https://salahmade.com/wp-content/uploads/bankhangwat18.jpg",
    tags: ["cafe", "activity", "unseen", "shopping"],
    cost: "medium",
    crowd: "moderate",
    distanceKm: 7,
    routeOrder: 2,
    startAreaIds: ["chiang-mai-old-city", "nimman"],
    description:
      "A creative village with craft studios, local design shops, and slow cafes.",
    localTip:
      "Ask a local maker for the small ceramics studio behind the main courtyard.",
  },
  {
    id: "khao-soi-khun-yai",
    title: "Khao Soi Khun Yai",
    area: "Old City",
    province: "Chiang Mai",
    time: "12:20",
    duration: 55,
    image:
      "https://www.eatingthaifood.com/wp-content/uploads/2014/03/khao-soi-khun-yai-%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%8B%E0%B8%AD%E0%B8%A2%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%A2%E0%B8%B2%E0%B8%A2.jpg",
    tags: ["food", "unseen"],
    cost: "low",
    crowd: "popular",
    distanceKm: 2,
    routeOrder: 3,
    startAreaIds: ["chiang-mai-old-city", "nimman"],
    description:
      "A compact lunch stop for Northern curry noodles near the city wall.",
    localTip:
      "The agent schedules lunch early because the signature bowls often sell out.",
  },
  {
    id: "wat-umong",
    title: "Wat Umong Forest Tunnel",
    area: "Suthep",
    province: "Chiang Mai",
    time: "14:00",
    duration: 75,
    image:
      "https://mychiangmaitour.com/wp-content/images/temple/umong_temple001.jpg",
    tags: ["culture", "nature", "unseen"],
    cost: "low",
    crowd: "quiet",
    distanceKm: 9,
    routeOrder: 4,
    startAreaIds: ["chiang-mai-old-city", "nimman"],
    description:
      "A forest temple with ancient brick tunnels and a calm walking loop.",
    localTip:
      "Pair it with Doi Suthep or Baan Kang Wat to reduce backtracking.",
  },
  {
    id: "mae-kampong",
    title: "Mae Kampong Village",
    area: "Mae On",
    province: "Chiang Mai",
    time: "09:30",
    duration: 180,
    image:
      "https://www.samuiislandexplorer.com/wp-content/uploads/2024/11/Mae-Kampong-Village-06.jpg",
    tags: ["nature", "cafe", "unseen"],
    cost: "medium",
    crowd: "moderate",
    distanceKm: 47,
    routeOrder: 1,
    startAreaIds: ["mae-on", "chiang-mai-old-city"],
    description:
      "A mountain village route for forest air, streams, cafes, and homestay culture.",
    localTip:
      "Use a verified driver for the climb; fixed fare protects tourists from surge quotes.",
  },
  {
    id: "sticky-waterfall",
    title: "Sticky Waterfall",
    area: "Mae Taeng",
    province: "Chiang Mai",
    time: "13:30",
    duration: 120,
    image:
      "https://images.unsplash.com/photo-1601662528567-526cd06f6582?q=80&w=1000&auto=format&fit=crop",
    tags: ["nature", "activity"],
    cost: "low",
    crowd: "moderate",
    distanceKm: 55,
    routeOrder: 2,
    startAreaIds: ["mae-rim", "mae-on"],
    description:
      "A light adventure stop where limestone grip makes the waterfall climbable.",
    localTip:
      "The agent groups this with northbound stops so transport remains fair and efficient.",
  },
  {
    id: "mon-jam",
    title: "Mon Jam Viewpoint",
    area: "Mae Rim",
    province: "Chiang Mai",
    time: "09:00",
    duration: 110,
    image:
      "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?q=80&w=1000&auto=format&fit=crop",
    tags: ["nature", "cafe", "activity"],
    cost: "medium",
    crowd: "popular",
    distanceKm: 34,
    routeOrder: 1,
    startAreaIds: ["mae-rim", "nimman"],
    description:
      "Mountain viewpoints, flower gardens, and cafes clustered into one scenic route.",
    localTip: "Weekday mornings are calmer and give the best fog views.",
  },
  {
    id: "jing-jai-market",
    title: "Jing Jai Market",
    area: "Chang Phueak",
    province: "Chiang Mai",
    time: "08:00",
    duration: 80,
    image:
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1000&auto=format&fit=crop",
    tags: ["food", "shopping", "cafe"],
    cost: "medium",
    crowd: "moderate",
    distanceKm: 4,
    routeOrder: 1,
    startAreaIds: ["chiang-mai-old-city", "nimman", "mae-rim"],
    description:
      "A local market for breakfast, craft products, coffee, and Thai design goods.",
    localTip: "Best on weekend mornings; bring cash for small makers.",
  },
  {
    id: "queen-sirikit-botanic",
    title: "Queen Sirikit Botanic Garden",
    area: "Mae Rim",
    province: "Chiang Mai",
    time: "09:20",
    duration: 120,
    image:
      "https://mychiangmaitour.com/wp-content/images/attractions/botanic_garden01.jpg",
    tags: ["nature", "activity", "cafe"],
    cost: "medium",
    crowd: "moderate",
    distanceKm: 14,
    routeOrder: 1,
    startAreaIds: ["mae-rim"],
    description:
      "A garden route with canopy walk, glasshouses, mountain air, and easy nature stops.",
    localTip: "Start with the canopy walk before the sun gets strong.",
  },
  {
    id: "mae-sa-waterfall",
    title: "Mae Sa Waterfall",
    area: "Mae Rim",
    province: "Chiang Mai",
    time: "12:40",
    duration: 110,
    image: "https://changpuakmagazine.com/images/article/163053wtf_may2022.jpg",
    tags: ["nature", "activity", "unseen"],
    cost: "low",
    crowd: "moderate",
    distanceKm: 9,
    routeOrder: 2,
    startAreaIds: ["mae-rim"],
    description:
      "A tiered waterfall stop close to Mae Rim with shaded trails and picnic corners.",
    localTip:
      "Wear shoes with grip; some lower tiers can be slippery after rain.",
  },
  {
    id: "san-kamphaeng-hot-springs",
    title: "San Kamphaeng Hot Springs",
    area: "Mae On",
    province: "Chiang Mai",
    time: "11:00",
    duration: 120,
    image:
      "https://www.mychiangmaitravel.com/wp-content/uploads/2017/07/San-Kamphaeng-Hot-Springs03.jpg",
    tags: ["nature", "activity"],
    cost: "medium",
    crowd: "moderate",
    distanceKm: 16,
    routeOrder: 2,
    startAreaIds: ["mae-on"],
    description:
      "A relaxed hot spring stop with mineral baths, gardens, and easy family activities.",
    localTip:
      "Buy eggs at the entrance if you want the classic hot-spring snack.",
  },
  {
    id: "teen-tok-project",
    title: "Teen Tok Royal Project",
    area: "Mae On",
    province: "Chiang Mai",
    time: "14:00",
    duration: 90,
    image: "https://www.dutchfarm2u.com/upload/3117/4pJLdASgAn.jpg",
    tags: ["nature", "cafe", "unseen"],
    cost: "low",
    crowd: "quiet",
    distanceKm: 9,
    routeOrder: 3,
    startAreaIds: ["mae-on"],
    description:
      "A quiet project stop near Mae Kampong with forest paths, coffee, and local produce.",
    localTip: "Good fallback when Mae Kampong gets crowded.",
  },
  {
    id: "white-temple",
    title: "Wat Rong Khun",
    area: "Pa O Don Chai",
    province: "Chiang Rai",
    time: "09:00",
    duration: 95,
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/94/06/af/photo0jpg.jpg?w=900&h=500&s=1",
    tags: ["culture", "activity"],
    cost: "medium",
    crowd: "popular",
    distanceKm: 13,
    routeOrder: 1,
    startAreaIds: ["chiang-rai-clock"],
    description:
      "A contemporary temple landmark with strong visual storytelling.",
    localTip:
      "Visit early, then route toward Singha Park before the tour buses peak.",
  },
  {
    id: "blue-temple",
    title: "Wat Rong Suea Ten",
    area: "Rim Kok",
    province: "Chiang Rai",
    time: "11:00",
    duration: 60,
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1000&auto=format&fit=crop",
    tags: ["culture", "unseen"],
    cost: "low",
    crowd: "moderate",
    distanceKm: 4,
    routeOrder: 2,
    startAreaIds: ["chiang-rai-clock"],
    description:
      "A vivid blue temple stop that fits neatly into a short Chiang Rai cultural loop.",
    localTip:
      "The coconut ice cream nearby is a good quick break before lunch.",
  },
  {
    id: "singha-park",
    title: "Singha Park",
    area: "Mae Kon",
    province: "Chiang Rai",
    time: "13:20",
    duration: 140,
    image:
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1000&auto=format&fit=crop",
    tags: ["nature", "activity", "cafe"],
    cost: "medium",
    crowd: "moderate",
    distanceKm: 16,
    routeOrder: 3,
    startAreaIds: ["chiang-rai-clock"],
    description:
      "A relaxed park route with cycling, tea fields, viewpoints, and food stops.",
    localTip:
      "Reserve bikes on busy days; it turns the stop into an easy activity match.",
  },
  {
    id: "talat-noi",
    title: "Talat Noi Street Art",
    area: "Riverside",
    province: "Bangkok",
    time: "09:00",
    duration: 100,
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=1000&auto=format&fit=crop",
    tags: ["culture", "cafe", "unseen"],
    cost: "low",
    crowd: "moderate",
    distanceKm: 3,
    routeOrder: 1,
    startAreaIds: ["bangkok-riverside", "ari"],
    description:
      "A walkable neighborhood for street art, old shophouses, coffee, and river alleys.",
    localTip: "Start at the old car parts lane and finish near the river pier.",
  },
  {
    id: "wang-lang",
    title: "Wang Lang Market",
    area: "Thonburi",
    province: "Bangkok",
    time: "12:00",
    duration: 80,
    image:
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=1000&auto=format&fit=crop",
    tags: ["food", "shopping", "unseen"],
    cost: "low",
    crowd: "popular",
    distanceKm: 5,
    routeOrder: 2,
    startAreaIds: ["bangkok-riverside"],
    description:
      "A dense local food market across the river from the Grand Palace area.",
    localTip:
      "The agent keeps it at lunch because most snack stalls are fully open.",
  },
  {
    id: "moca",
    title: "MOCA Bangkok",
    area: "Chatuchak",
    province: "Bangkok",
    time: "14:30",
    duration: 120,
    image:
      "https://res.klook.com/image/upload/w_500,h_313,c_fill,q_85/activities/vya2ywf2bbnciwvw7vr1.jpg",
    tags: ["culture", "activity"],
    cost: "medium",
    crowd: "quiet",
    distanceKm: 12,
    routeOrder: 3,
    startAreaIds: ["ari"],
    description:
      "A quieter modern art stop that works well after cafe or market routes.",
    localTip:
      "Use a fixed ride from Ari; public transport plus walk is slower in heat.",
  },
  {
    id: "chatuchak",
    title: "Chatuchak Weekend Market",
    area: "Chatuchak",
    province: "Bangkok",
    time: "10:00",
    duration: 150,
    image:
      "https://res.cloudinary.com/pillarshotels/image/upload/f_auto/web/cms/resources/attractions/chatuchak-w1800h1360.jpg",
    tags: ["shopping", "food", "activity"],
    cost: "medium",
    crowd: "popular",
    distanceKm: 5,
    routeOrder: 1,
    startAreaIds: ["ari"],
    description:
      "A huge market for Thai fashion, snacks, souvenirs, and home goods.",
    localTip:
      "The agent limits nearby stops after this because the market can drain energy fast.",
  },
  {
    id: "wat-mahathat",
    title: "Wat Mahathat",
    area: "Historical Park",
    province: "Ayutthaya",
    time: "08:30",
    duration: 80,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Z3UJHDR73tVWmhPx7RcX9Csf6Kr5hvlH5w&s",
    tags: ["culture", "unseen"],
    cost: "low",
    crowd: "popular",
    distanceKm: 1,
    routeOrder: 1,
    startAreaIds: ["ayutthaya-park"],
    description:
      "A core historical stop with temple ruins and the famous Buddha head in tree roots.",
    localTip:
      "Start here before heat and group tours fill the narrow photo spots.",
  },
  {
    id: "ayutthaya-boat",
    title: "Island Boat Loop",
    area: "Chao Phraya River",
    province: "Ayutthaya",
    time: "16:30",
    duration: 120,
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1000&auto=format&fit=crop",
    tags: ["culture", "activity", "unseen"],
    cost: "medium",
    crowd: "moderate",
    distanceKm: 4,
    routeOrder: 3,
    startAreaIds: ["ayutthaya-park"],
    description:
      "A late afternoon river loop that connects temples from a cooler, scenic angle.",
    localTip:
      "Book fixed-price boats through the platform to avoid pier quote surprises.",
  },
  {
    id: "ban-mai-rim-nam",
    title: "Ban Mai Rim Nam",
    area: "Old Market",
    province: "Ayutthaya",
    time: "12:10",
    duration: 70,
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/19/52/78/photo1jpg.jpg?w=900&h=500&s=1",
    tags: ["food", "cafe", "unseen"],
    cost: "medium",
    crowd: "quiet",
    distanceKm: 3,
    routeOrder: 2,
    startAreaIds: ["ayutthaya-park"],
    description:
      "A riverside lunch stop with old-house atmosphere and local dishes.",
    localTip: "Ask for the shaded river table when booking through a guide.",
  },
  {
    id: "wat-chaiwatthanaram",
    title: "Wat Chaiwatthanaram",
    area: "Ayutthaya Riverside",
    province: "Ayutthaya",
    time: "15:40",
    duration: 80,
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1000&auto=format&fit=crop",
    tags: ["culture", "unseen"],
    cost: "low",
    crowd: "popular",
    distanceKm: 5,
    routeOrder: 3,
    startAreaIds: ["ayutthaya-park"],
    description:
      "A riverside temple ruin that works beautifully before a sunset boat loop.",
    localTip: "Late afternoon light is the most photogenic.",
  },
  {
    id: "phuket-old-town-walk",
    title: "Phuket Old Town Walk",
    area: "Old Town",
    province: "Phuket",
    time: "09:00",
    duration: 120,
    image:
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1000&auto=format&fit=crop",
    tags: ["culture", "cafe", "shopping"],
    cost: "low",
    crowd: "moderate",
    distanceKm: 1,
    routeOrder: 1,
    startAreaIds: ["phuket-old-town"],
    description:
      "A colorful Sino-Portuguese walking route with cafes, murals, and local snacks.",
    localTip:
      "Start on Thalang Road, then cut into side streets before the heat.",
  },
  {
    id: "chillva-market",
    title: "Chillva Market",
    area: "Ratsada",
    province: "Phuket",
    time: "18:00",
    duration: 120,
    image:
      "https://media1.thrillophilia.com/filestore/ab3ptiuzg2058vcz4v0j4dqaeny6_download%20(30).jpg?w=400&dpr=2",
    tags: ["food", "shopping", "activity"],
    cost: "medium",
    crowd: "popular",
    distanceKm: 5,
    routeOrder: 3,
    startAreaIds: ["phuket-old-town"],
    description:
      "A night market stop for food, fashion, music, and low-pressure social energy.",
    localTip:
      "This is a good buddy-match stop because groups can split snacks and rides.",
  },
  {
    id: "laem-krating",
    title: "Laem Krating Viewpoint",
    area: "Rawai",
    province: "Phuket",
    time: "15:30",
    duration: 150,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
    tags: ["nature", "activity", "unseen"],
    cost: "medium",
    crowd: "quiet",
    distanceKm: 22,
    routeOrder: 2,
    startAreaIds: ["phuket-old-town"],
    description:
      "A coastal viewpoint hike with a wilder feel than the standard beach route.",
    localTip:
      "Use a guide if sunset hiking; the return path gets dark quickly.",
  },
  {
    id: "rang-hill",
    title: "Khao Rang Viewpoint",
    area: "Mueang Phuket",
    province: "Phuket",
    time: "14:30",
    duration: 75,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
    tags: ["nature", "cafe", "unseen"],
    cost: "low",
    crowd: "moderate",
    distanceKm: 4,
    routeOrder: 2,
    startAreaIds: ["phuket-old-town"],
    description:
      "A nearby hill viewpoint with city views, breezy cafes, and a short scenic ride.",
    localTip: "Use it as an easy sunset alternative if beach traffic is heavy.",
  },
  {
    id: "phuket-sunday-market",
    title: "Phuket Sunday Walking Street",
    area: "Old Town",
    province: "Phuket",
    time: "18:00",
    duration: 120,
    image:
      "https://daniaexperiences.com/wp-content/uploads/2024/12/img_4825-800x600-1.jpg",
    tags: ["food", "shopping", "culture"],
    cost: "low",
    crowd: "popular",
    distanceKm: 1,
    routeOrder: 3,
    startAreaIds: ["phuket-old-town"],
    description:
      "A lively Old Town market for local snacks, crafts, music, and evening walking.",
    localTip: "Arrive before 18:30 if you want easier photos on Thalang Road.",
  },
  {
    id: "railay",
    title: "Railay Beach",
    area: "Railay",
    province: "Krabi",
    time: "09:00",
    duration: 180,
    image:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1000&auto=format&fit=crop",
    tags: ["nature", "activity"],
    cost: "medium",
    crowd: "popular",
    distanceKm: 12,
    routeOrder: 1,
    startAreaIds: ["ao-nang"],
    description:
      "A boat-access beach route for limestone cliffs, caves, swimming, and climbing.",
    localTip:
      "The agent checks tide windows before pairing Railay with other stops.",
  },
  {
    id: "dragon-crest",
    title: "Dragon Crest Trail",
    area: "Nong Thale",
    province: "Krabi",
    time: "07:30",
    duration: 240,
    image:
      "https://letsfly.co.uk/wp-content/uploads/2025/02/krabi-dragon-crest-mountain.webp",
    tags: ["nature", "activity", "unseen"],
    cost: "low",
    crowd: "quiet",
    distanceKm: 18,
    routeOrder: 1,
    startAreaIds: ["ao-nang"],
    description:
      "A serious morning hike with one of Krabi's strongest viewpoints.",
    localTip:
      "Packed routes should skip extra hikes after this; it is a real workout.",
  },
  {
    id: "krabi-night-market",
    title: "Krabi Walking Street",
    area: "Krabi Town",
    province: "Krabi",
    time: "18:00",
    duration: 120,
    image:
      "https://files.thailandtourismdirectory.go.th/assets/upload/2017/12/25/201712250c00ce7ed6b7c85ffab3819ec2f5b899160317.jpg",
    tags: ["food", "shopping", "activity"],
    cost: "low",
    crowd: "moderate",
    distanceKm: 18,
    routeOrder: 3,
    startAreaIds: ["ao-nang"],
    description:
      "An evening market route for street food, crafts, and local performances.",
    localTip:
      "Pair it with a fair-fare return ride because late taxis can overquote tourists.",
  },
];

const distanceOverrides: Record<string, Partial<Record<string, number>>> = {
  "doi-suthep": {
    "chiang-mai-old-city": 16,
    nimman: 13,
    "mae-rim": 28,
    "mae-on": 55,
  },
  "baan-kang-wat": {
    "chiang-mai-old-city": 6,
    nimman: 4,
    "mae-rim": 24,
    "mae-on": 44,
  },
  "khao-soi-khun-yai": {
    "chiang-mai-old-city": 1.5,
    nimman: 4.5,
    "mae-rim": 23,
    "mae-on": 42,
  },
  "wat-umong": {
    "chiang-mai-old-city": 7,
    nimman: 5,
    "mae-rim": 25,
    "mae-on": 45,
  },
  "mae-kampong": {
    "mae-on": 18,
    "chiang-mai-old-city": 52,
    nimman: 55,
    "mae-rim": 72,
  },
  "sticky-waterfall": {
    "mae-rim": 45,
    "chiang-mai-old-city": 60,
    nimman: 58,
    "mae-on": 83,
  },
  "mon-jam": {
    "mae-rim": 21,
    nimman: 38,
    "chiang-mai-old-city": 40,
    "mae-on": 78,
  },
  "jing-jai-market": {
    "chiang-mai-old-city": 4,
    nimman: 5,
    "mae-rim": 21,
    "mae-on": 41,
  },
  "queen-sirikit-botanic": {
    "mae-rim": 14,
    nimman: 31,
    "chiang-mai-old-city": 33,
  },
  "mae-sa-waterfall": { "mae-rim": 9, nimman: 27, "chiang-mai-old-city": 29 },
  "san-kamphaeng-hot-springs": { "mae-on": 16, "chiang-mai-old-city": 37 },
  "teen-tok-project": { "mae-on": 9, "chiang-mai-old-city": 48 },
  "white-temple": { "chiang-rai-clock": 13 },
  "blue-temple": { "chiang-rai-clock": 4 },
  "singha-park": { "chiang-rai-clock": 16 },
  "talat-noi": { "bangkok-riverside": 3, ari: 10 },
  "wang-lang": { "bangkok-riverside": 5, ari: 13 },
  moca: { ari: 11, "bangkok-riverside": 19 },
  chatuchak: { ari: 5, "bangkok-riverside": 17 },
  "wat-mahathat": { "ayutthaya-park": 1 },
  "ayutthaya-boat": { "ayutthaya-park": 4 },
  "ban-mai-rim-nam": { "ayutthaya-park": 3 },
  "wat-chaiwatthanaram": { "ayutthaya-park": 5 },
  "phuket-old-town-walk": { "phuket-old-town": 1 },
  "chillva-market": { "phuket-old-town": 5 },
  "laem-krating": { "phuket-old-town": 23 },
  "rang-hill": { "phuket-old-town": 4 },
  "phuket-sunday-market": { "phuket-old-town": 1 },
  railay: { "ao-nang": 12 },
  "dragon-crest": { "ao-nang": 18 },
  "krabi-night-market": { "ao-nang": 18 },
};

const provinceDistanceKm: Record<string, Record<string, number>> = {
  "Chiang Mai": {
    "Chiang Rai": 190,
    Bangkok: 695,
    Ayutthaya: 620,
    Phuket: 1510,
    Krabi: 1450,
  },
  "Chiang Rai": {
    "Chiang Mai": 190,
    Bangkok: 785,
    Ayutthaya: 710,
    Phuket: 1600,
    Krabi: 1540,
  },
  Bangkok: {
    "Chiang Mai": 695,
    "Chiang Rai": 785,
    Ayutthaya: 82,
    Phuket: 840,
    Krabi: 780,
  },
  Ayutthaya: {
    Bangkok: 82,
    "Chiang Mai": 620,
    "Chiang Rai": 710,
    Phuket: 900,
    Krabi: 830,
  },
  Phuket: {
    Krabi: 165,
    Bangkok: 840,
    Ayutthaya: 900,
    "Chiang Mai": 1510,
    "Chiang Rai": 1600,
  },
  Krabi: {
    Phuket: 165,
    Bangkok: 780,
    Ayutthaya: 830,
    "Chiang Mai": 1450,
    "Chiang Rai": 1540,
  },
};

const placeDetails: Record<string, PlaceDetail> = {
  "doi-suthep": {
    address: "9 Mueang Chiang Mai District, Chiang Mai",
    hours: "06:00-20:00",
    price: "30 THB entrance, cable car optional",
    bestTime: "Sunrise or before 09:00",
    accessibility: "Many stairs; cable car available near the entrance.",
    transportNote:
      "Mountain road. Use a fixed fare car or red truck from the city.",
    highlights: ["Golden chedi", "City viewpoint", "Monk blessing area"],
    nearby: ["Wat Pha Lat", "Baan Kang Wat", "Wat Umong"],
  },
  "baan-kang-wat": {
    address: "191-197 Soi Wat Umong, Suthep, Chiang Mai",
    hours: "10:00-18:00, many shops close Monday",
    price: "Free entry, paid workshops from 250 THB",
    bestTime: "Late morning on weekdays",
    accessibility: "Mostly flat paths, some small shop steps.",
    transportNote: "Short ride from Nimman; easy to combine with Wat Umong.",
    highlights: ["Craft studios", "Ceramic workshop", "Garden cafes"],
    nearby: ["Wat Umong", "Nimman", "Doi Suthep"],
  },
  "khao-soi-khun-yai": {
    address: "Sri Poom Road, near Wat Kuan Kama, Chiang Mai",
    hours: "10:00-14:00 or until sold out",
    price: "50-80 THB per bowl",
    bestTime: "11:00-12:00",
    accessibility: "Street-side seating; limited space at peak lunch.",
    transportNote: "Walkable from north Old City gates.",
    highlights: ["Khao soi chicken", "Local lunch rush", "Old City stop"],
    nearby: ["Chang Phueak Gate", "Wat Lok Moli", "Jing Jai Market"],
  },
  "wat-umong": {
    address: "135 Moo 10, Suthep, Chiang Mai",
    hours: "05:00-20:00",
    price: "Free, donation encouraged",
    bestTime: "14:00-16:00 for shade",
    accessibility: "Uneven forest paths and tunnel steps.",
    transportNote: "Best by car from Nimman or paired with Baan Kang Wat.",
    highlights: ["Ancient tunnels", "Forest walk", "Meditation lake"],
    nearby: ["Baan Kang Wat", "Nimman", "Doi Suthep"],
  },
  "mae-kampong": {
    address: "Mae Kampong Village, Mae On, Chiang Mai",
    hours: "Village open daily; cafes usually 09:00-17:00",
    price: "Free village entry, cafe/activities paid separately",
    bestTime: "Morning to early afternoon",
    accessibility: "Steep village lanes; not ideal for wheelchairs.",
    transportNote:
      "Use a verified driver for mountain roads and fixed pricing.",
    highlights: ["Mountain cafes", "Stream walk", "Homestay culture"],
    nearby: ["Teen Tok Royal Project", "San Kamphaeng Hot Springs", "Mae On"],
  },
  "sticky-waterfall": {
    address: "Bua Tong Waterfall, Mae Taeng, Chiang Mai",
    hours: "08:30-16:30",
    price: "Free entry",
    bestTime: "Morning or after lunch on weekdays",
    accessibility: "Wet limestone surfaces; changing area available.",
    transportNote: "Private car is easiest; public transport is limited.",
    highlights: ["Climbable limestone", "Picnic area", "Forest spring"],
    nearby: ["Mae Ngat Dam", "Mae Rim", "Mon Jam"],
  },
  "mon-jam": {
    address: "Mae Raem, Mae Rim, Chiang Mai",
    hours: "07:00-18:00",
    price: "20-100 THB depending on garden/viewpoint",
    bestTime: "07:00-10:00",
    accessibility: "Hilly terrain; some viewpoints require steps.",
    transportNote:
      "Mountain route from Mae Rim; fixed fare avoids return overpricing.",
    highlights: ["Mountain viewpoint", "Flower gardens", "Hill cafes"],
    nearby: ["Queen Sirikit Botanic Garden", "Mae Rim", "Pong Yaeng"],
  },
  "jing-jai-market": {
    address: "Atsadathon Road, Chang Phueak, Chiang Mai",
    hours: "06:30-13:00 on weekends; shops vary weekdays",
    price: "Free entry; food from 40 THB",
    bestTime: "Saturday or Sunday morning",
    accessibility: "Flat market paths, can be crowded.",
    transportNote: "Short ride from Old City or Nimman.",
    highlights: ["Organic market", "Local crafts", "Breakfast stalls"],
    nearby: ["Old City", "Khao Soi Khun Yai", "Nimman"],
  },
  "queen-sirikit-botanic": {
    address: "Mae Ram, Mae Rim District, Chiang Mai",
    hours: "08:30-16:30",
    price: "100 THB adult ticket, vehicle fee may apply",
    bestTime: "09:00-11:00",
    accessibility: "Large garden area; canopy walkway has stairs and slopes.",
    transportNote:
      "Best by private car from Mae Rim; parking available inside the garden.",
    highlights: ["Canopy walkway", "Glasshouses", "Mountain garden"],
    nearby: ["Mae Sa Waterfall", "Mon Jam", "Mae Rim"],
  },
  "mae-sa-waterfall": {
    address: "Mae Raem, Mae Rim District, Chiang Mai",
    hours: "08:30-16:30",
    price: "100 THB park entrance for foreign visitors",
    bestTime: "Late morning or early afternoon",
    accessibility: "Several waterfall tiers require steps and uneven paths.",
    transportNote:
      "Short ride from Mae Rim; combine with botanic garden in one loop.",
    highlights: ["Waterfall tiers", "Shaded trail", "Picnic stops"],
    nearby: ["Queen Sirikit Botanic Garden", "Pong Yaeng", "Mae Rim"],
  },
  "san-kamphaeng-hot-springs": {
    address: "Ban Sahakon, Mae On District, Chiang Mai",
    hours: "07:00-18:00",
    price: "100 THB entry, private baths extra",
    bestTime: "Morning or late afternoon",
    accessibility: "Flat garden areas; bath facilities vary by room type.",
    transportNote: "Easy fixed-fare car from Mae On or San Kamphaeng.",
    highlights: ["Mineral baths", "Hot spring egg boiling", "Garden walk"],
    nearby: ["Mae On", "Teen Tok Royal Project", "Mae Kampong"],
  },
  "teen-tok-project": {
    address: "Huai Kaeo, Mae On District, Chiang Mai",
    hours: "08:30-16:30",
    price: "Free entry, cafe and produce paid separately",
    bestTime: "Afternoon after Mae Kampong",
    accessibility: "Some forest paths and uneven ground.",
    transportNote: "Use a driver familiar with Mae On village roads.",
    highlights: ["Forest cafe", "Local produce", "Quiet walking"],
    nearby: ["Mae Kampong", "San Kamphaeng Hot Springs", "Mae On"],
  },
  "white-temple": {
    address: "Pa O Don Chai, Mueang Chiang Rai",
    hours: "08:00-17:00",
    price: "100 THB for foreign visitors",
    bestTime: "08:00-09:30",
    accessibility: "Mostly flat with some temple steps.",
    transportNote:
      "Fixed taxi from Clock Tower works well for a half-day loop.",
    highlights: ["White temple art", "Gallery", "Photo bridge"],
    nearby: ["Singha Park", "Blue Temple", "Chiang Rai Clock Tower"],
  },
  "blue-temple": {
    address: "Rim Kok, Mueang Chiang Rai",
    hours: "07:00-20:00",
    price: "Free entry",
    bestTime: "Late morning or golden hour",
    accessibility: "Flat entry with a few steps into the hall.",
    transportNote: "Very short ride from central Chiang Rai.",
    highlights: ["Blue ubosot", "White Buddha", "Local dessert stalls"],
    nearby: ["Clock Tower", "Wat Huay Pla Kang", "White Temple"],
  },
  "singha-park": {
    address: "Mae Kon, Chiang Rai",
    hours: "08:00-18:00",
    price: "Free entry, activities paid separately",
    bestTime: "13:00-16:00",
    accessibility: "Large park; shuttle or bike recommended.",
    transportNote: "Book a car for the loop from White Temple to the park.",
    highlights: ["Tea fields", "Cycling", "Viewpoint cafe"],
    nearby: ["White Temple", "Mae Fah Luang Art Center", "Clock Tower"],
  },
  "talat-noi": {
    address: "Talat Noi, Samphanthawong, Bangkok",
    hours: "Neighborhood open daily; cafes usually 09:00-18:00",
    price: "Free walk; cafes from 80 THB",
    bestTime: "Morning before heat",
    accessibility: "Narrow alleys and uneven pavement.",
    transportNote: "Start from MRT Hua Lamphong or riverside pier.",
    highlights: ["Street art", "Old car parts lane", "Riverside cafes"],
    nearby: ["Chinatown", "River City", "Bangkok Riverside"],
  },
  "wang-lang": {
    address: "Wang Lang Pier area, Bangkok Noi, Bangkok",
    hours: "09:00-17:00",
    price: "Free entry; food from 30 THB",
    bestTime: "Lunch",
    accessibility: "Crowded market lanes; limited wheelchair access.",
    transportNote: "Use river boat from Tha Chang or fixed ride from hotel.",
    highlights: ["Street food", "Desserts", "Local fashion"],
    nearby: ["Grand Palace", "Siriraj", "Thonburi"],
  },
  moca: {
    address: "499 Kamphaeng Phet 6 Road, Chatuchak, Bangkok",
    hours: "10:00-18:00, closed Monday",
    price: "280 THB adult ticket",
    bestTime: "Afternoon",
    accessibility: "Elevators and indoor galleries.",
    transportNote: "Taxi from Ari is faster than mixed transit in hot weather.",
    highlights: ["Modern Thai art", "Quiet galleries", "Indoor break"],
    nearby: ["Ari", "Chatuchak", "Bang Sue"],
  },
  chatuchak: {
    address: "Kamphaeng Phet 2 Road, Chatuchak, Bangkok",
    hours: "Weekend market usually 09:00-18:00",
    price: "Free entry",
    bestTime: "10:00-13:00",
    accessibility: "Flat but very crowded and hot.",
    transportNote:
      "BTS Mo Chit/MRT Chatuchak Park; fixed ride for hotel return.",
    highlights: ["Fashion lanes", "Home goods", "Snack stalls"],
    nearby: ["Ari", "MOCA", "Or Tor Kor Market"],
  },
  "wat-mahathat": {
    address: "Naresuan Road, Ayutthaya Historical Park",
    hours: "08:00-18:30",
    price: "50 THB entrance",
    bestTime: "08:00-10:00",
    accessibility: "Historic ruins with uneven brick paths.",
    transportNote: "Bike, tuk-tuk, or fixed car from the historical park area.",
    highlights: ["Buddha head in tree", "Temple ruins", "Photo route"],
    nearby: ["Wat Ratchaburana", "Ban Mai Rim Nam", "Boat loop pier"],
  },
  "ayutthaya-boat": {
    address: "Ayutthaya island pier route",
    hours: "Best booked 16:00-18:30",
    price: "Around 300-500 THB per person in shared boat",
    bestTime: "Late afternoon",
    accessibility: "Boat steps require care.",
    transportNote:
      "Book fixed price before boarding to avoid pier quote surprises.",
    highlights: ["River temples", "Sunset view", "Cooler route"],
    nearby: ["Wat Chaiwatthanaram", "Wat Phanan Choeng", "Old Market"],
  },
  "ban-mai-rim-nam": {
    address: "U Thong Road riverside, Ayutthaya",
    hours: "10:30-21:00",
    price: "150-350 THB per person",
    bestTime: "Lunch or early dinner",
    accessibility: "Old house layout; some steps.",
    transportNote: "Short ride from Historical Park or boat pier.",
    highlights: ["Riverside lunch", "Thai dishes", "Old-house atmosphere"],
    nearby: ["Wat Mahathat", "Boat pier", "Old Market"],
  },
  "wat-chaiwatthanaram": {
    address: "Ban Pom, Phra Nakhon Si Ayutthaya",
    hours: "08:00-18:30",
    price: "50 THB entrance",
    bestTime: "16:00-17:30",
    accessibility: "Uneven ruin paths and steps.",
    transportNote: "Short tuk-tuk or car ride from the historical park.",
    highlights: ["Riverside ruins", "Sunset photos", "Khmer-style prang"],
    nearby: ["Island Boat Loop", "Wat Mahathat", "Ban Mai Rim Nam"],
  },
  "phuket-old-town-walk": {
    address: "Thalang Road, Phuket Old Town",
    hours: "Street open daily; shops usually 10:00-18:00",
    price: "Free walk",
    bestTime: "Morning or Sunday evening market",
    accessibility: "Flat sidewalks, some curb gaps.",
    transportNote: "Walkable from Old Town hotels.",
    highlights: ["Sino-Portuguese houses", "Murals", "Local sweets"],
    nearby: ["Chillva Market", "Rang Hill", "Thai Hua Museum"],
  },
  "chillva-market": {
    address: "Ratsada, Mueang Phuket",
    hours: "17:00-23:00, closed some Sundays",
    price: "Free entry; food from 40 THB",
    bestTime: "18:00-20:00",
    accessibility: "Mostly flat market lanes.",
    transportNote: "Use fixed fare ride back at night.",
    highlights: ["Night food", "Live music", "Local fashion"],
    nearby: ["Phuket Old Town", "Rang Hill", "Central Phuket"],
  },
  "laem-krating": {
    address: "Rawai coastal viewpoint trail, Phuket",
    hours: "Daylight only",
    price: "Free",
    bestTime: "15:30-sunset",
    accessibility: "Rough trail; not suitable for limited mobility.",
    transportNote: "Guide recommended for sunset return.",
    highlights: ["Coastal hike", "Sunset viewpoint", "Quiet photo spot"],
    nearby: ["Nai Harn Beach", "Promthep Cape", "Rawai"],
  },
  "rang-hill": {
    address: "Khao Rang, Mueang Phuket",
    hours: "Open daily, viewpoint best before 20:00",
    price: "Free viewpoint, cafe spend optional",
    bestTime: "Late afternoon",
    accessibility: "Viewpoint area is paved; some stairs near photo spots.",
    transportNote: "Short fixed-fare ride from Phuket Old Town.",
    highlights: ["City viewpoint", "Hill cafe", "Sunset stop"],
    nearby: ["Phuket Old Town", "Thai Hua Museum", "Chillva Market"],
  },
  "phuket-sunday-market": {
    address: "Thalang Road, Phuket Old Town",
    hours: "Sunday 16:00-22:00",
    price: "Free entry; food from 40 THB",
    bestTime: "17:00-19:00",
    accessibility: "Closed walking street; can be crowded.",
    transportNote:
      "Walkable from Old Town stays; use fixed ride after market close.",
    highlights: ["Street snacks", "Craft stalls", "Old Town lights"],
    nearby: ["Phuket Old Town Walk", "Rang Hill", "Chillva Market"],
  },
  railay: {
    address: "Railay Peninsula, Krabi",
    hours: "Boat access depends on weather and tide",
    price: "Longtail boat usually 100-200 THB each way",
    bestTime: "Morning",
    accessibility: "Boat boarding and sand paths.",
    transportNote: "Depart from Ao Nang pier; check return boat time.",
    highlights: ["Limestone cliffs", "Beach caves", "Kayak/climbing"],
    nearby: ["Phra Nang Cave", "Ao Nang", "Tonsai"],
  },
  "dragon-crest": {
    address: "Khao Ngon Nak Trail, Nong Thale, Krabi",
    hours: "08:00-15:00 trail entry",
    price: "Free or small park fee depending on season",
    bestTime: "07:30 start",
    accessibility: "Steep hiking trail; good shoes required.",
    transportNote: "Use fixed car pickup because return taxis are limited.",
    highlights: ["Summit viewpoint", "Forest trail", "Adventure route"],
    nearby: ["Nong Thale", "Ao Nang", "Klong Muang"],
  },
  "krabi-night-market": {
    address: "Krabi Walking Street, Krabi Town",
    hours: "17:00-22:00, Friday-Sunday",
    price: "Free entry; food from 30 THB",
    bestTime: "18:00-20:30",
    accessibility: "Flat market streets, can be crowded.",
    transportNote: "Book return ride in advance from Krabi Town to Ao Nang.",
    highlights: ["Street food", "Craft stalls", "Local performances"],
    nearby: ["Krabi River", "Ao Nang", "Tiger Cave Temple"],
  },
};

const guides: Guide[] = [
  {
    name: "Nicha",
    province: "Chiang Mai",
    tags: ["culture", "cafe", "unseen"],
    languages: ["Thai", "English"],
    verification: "Passport + face check",
    rate: 1200,
  },
  {
    name: "Arun",
    province: "Chiang Mai",
    tags: ["food", "culture"],
    languages: ["Thai", "Chinese"],
    verification: "Citizen ID + OTP",
    rate: 950,
  },
  {
    name: "Mali",
    province: "Chiang Rai",
    tags: ["nature", "culture"],
    languages: ["Thai", "English", "Japanese"],
    verification: "Citizen ID + face check",
    rate: 1100,
  },
  {
    name: "Beam",
    province: "Bangkok",
    tags: ["food", "shopping", "unseen"],
    languages: ["Thai", "English"],
    verification: "Passport + OTP",
    rate: 1000,
  },
  {
    name: "Fah",
    province: "Ayutthaya",
    tags: ["culture", "activity"],
    languages: ["Thai", "English", "French"],
    verification: "Citizen ID + face check",
    rate: 1050,
  },
  {
    name: "Suda",
    province: "Phuket",
    tags: ["culture", "food", "shopping"],
    languages: ["Thai", "English", "Russian"],
    verification: "Citizen ID + OTP",
    rate: 1300,
  },
  {
    name: "Ken",
    province: "Krabi",
    tags: ["nature", "activity", "unseen"],
    languages: ["Thai", "English"],
    verification: "Passport + face check",
    rate: 1400,
  },
];

const buddies: Buddy[] = [
  {
    name: "Mina",
    nationality: "Japan",
    language: "Japanese",
    tags: ["culture", "cafe"],
    budget: "medium",
  },
  {
    name: "Lucas",
    nationality: "France",
    language: "English",
    tags: ["nature", "activity"],
    budget: "medium",
  },
  {
    name: "May",
    nationality: "Thailand",
    language: "Thai",
    tags: ["food", "shopping"],
    budget: "low",
  },
  {
    name: "Chen",
    nationality: "China",
    language: "Chinese",
    tags: ["culture", "food"],
    budget: "medium",
  },
  {
    name: "Sofia",
    nationality: "Spain",
    language: "English",
    tags: ["unseen", "nature"],
    budget: "premium",
  },
  {
    name: "Noah",
    nationality: "United States",
    language: "English",
    tags: ["activity", "food"],
    budget: "medium",
  },
  {
    name: "Anna",
    nationality: "Germany",
    language: "English",
    tags: ["culture", "unseen"],
    budget: "low",
  },
  {
    name: "Ploy",
    nationality: "Thailand",
    language: "Thai",
    tags: ["cafe", "shopping"],
    budget: "low",
  },
  {
    name: "Camille",
    nationality: "France",
    language: "French",
    tags: ["culture", "food"],
    budget: "medium",
  },
  {
    name: "Irina",
    nationality: "Russia",
    language: "Russian",
    tags: ["nature", "shopping"],
    budget: "premium",
  },
];

const budgetRank: Record<Budget, number> = { low: 1, medium: 2, premium: 3 };
const paceStopLimit: Record<Pace, number> = { easy: 3, balanced: 4, packed: 5 };
const maxRouteDistanceKm = 20;

function normalizeSearch(value: string) {
  return value.trim().toLowerCase();
}

function scoreSearchText(place: Place, query: string) {
  const normalizedQuery = normalizeSearch(query);
  if (!normalizedQuery) return 0;

  const searchableText = [
    place.title,
    place.area,
    place.province,
    place.description,
    place.localTip,
    place.tags.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return normalizedQuery
    .split(/\s+/)
    .filter(Boolean)
    .reduce(
      (score, word) => score + (searchableText.includes(word) ? 22 : 0),
      0,
    );
}

function getDistanceKm(place: Place, startArea: StartingArea) {
  const exactDistance = distanceOverrides[place.id]?.[startArea.id];
  if (exactDistance !== undefined) return exactDistance;
  if (place.province === startArea.province) return place.distanceKm;
  return provinceDistanceKm[startArea.province]?.[place.province] ?? 999;
}

function getPlaceDetail(place: Place) {
  return placeDetails[place.id];
}

function scorePlace(
  place: Place,
  startArea: StartingArea,
  interests: Interest[],
  budget: Budget,
  query: string,
  distanceKm: number,
) {
  const interestScore =
    place.tags.filter((tag) => interests.includes(tag)).length * 26;
  const directStartScore = place.startAreaIds.includes(startArea.id) ? 34 : 0;
  const provinceScore = place.province === startArea.province ? 18 : 0;
  const budgetScore = budgetRank[place.cost] <= budgetRank[budget] ? 14 : -22;
  const searchScore = scoreSearchText(place, query);
  const unseenScore = place.tags.includes("unseen") ? 9 : 0;
  const quietScore =
    place.crowd === "quiet" ? 8 : place.crowd === "moderate" ? 4 : -2;
  const routeScore = 9 - place.routeOrder;
  const distancePenalty = Math.min(distanceKm / 8, 70);

  return Math.round(
    interestScore +
      directStartScore +
      provinceScore +
      budgetScore +
      searchScore +
      unseenScore +
      quietScore +
      routeScore -
      distancePenalty,
  );
}

function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} hr ${rest} min` : `${hours} hr`;
}

function getSharedTags(tags: Interest[], interests: Interest[]) {
  const shared = tags.filter((tag) => interests.includes(tag));
  return shared.length ? shared.join(", ") : "route efficiency";
}

export default function AIRoutePlanner() {
  const { dict } = useDictionary();
  const preferencesRef = useRef<HTMLElement | null>(null);
  const [startAreaId, setStartAreaId] = useState(startingAreas[0].id);
  const [interests, setInterests] = useState<Interest[]>([
    "culture",
    "food",
    "unseen",
  ]);
  const [pace, setPace] = useState<Pace>("balanced");
  const [budget, setBudget] = useState<Budget>("medium");
  const [language, setLanguage] = useState("English");
  const [sameLanguage, setSameLanguage] = useState(true);
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [searchInput, setSearchInput] = useState("temple food unseen");
  const [searchQuery, setSearchQuery] = useState("temple food unseen");
  const [selectedStopId, setSelectedStopId] = useState<string | null>(null);
  const [savedTrips, setSavedTrips] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    "Showing route matches for temple food unseen.",
  );

  const startArea =
    startingAreas.find((area) => area.id === startAreaId) ?? startingAreas[0];

  const recommendedStops = useMemo(
    () =>
      [...places]
        .map((place) => {
          const distanceKm = getDistanceKm(place, startArea);
          return {
            ...place,
            distanceKm,
            match: scorePlace(
              place,
              startArea,
              interests,
              budget,
              searchQuery,
              distanceKm,
            ),
          };
        })
        .filter((place) => place.distanceKm <= maxRouteDistanceKm)
        .filter((place) => place.match > 20)
        .sort((a, b) => b.match - a.match || a.routeOrder - b.routeOrder)
        .slice(0, paceStopLimit[pace])
        .sort(
          (a, b) => a.routeOrder - b.routeOrder || a.distanceKm - b.distanceKm,
        ),
    [budget, interests, pace, searchQuery, startArea],
  );

  const selectedStop =
    recommendedStops.find((stop) => stop.id === selectedStopId) ?? null;
  const selectedPlaceDetail = selectedStop
    ? getPlaceDetail(selectedStop)
    : null;
  const topInterests = interestOptions
    .filter((option) => interests.includes(option.value))
    .map((option) => option.label)
    .join(", ");

  const totalMinutes = recommendedStops.reduce(
    (sum, stop) => sum + stop.duration,
    0,
  );
  const totalKm = recommendedStops.reduce(
    (sum, stop) => sum + stop.distanceKm,
    0,
  );
  const fairFare = Math.round(
    startArea.baseFare + totalKm * 18 + recommendedStops.length * 70,
  );

  const matchedGuides = useMemo(
    () =>
      guides
        .map((guide) => ({
          ...guide,
          score:
            (guide.province === startArea.province ? 36 : 0) +
            guide.tags.filter((tag) => interests.includes(tag)).length * 22 +
            (guide.languages.includes(language) ? 18 : 0),
        }))
        .filter((guide) => guide.score > 25)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3),
    [interests, language, startArea.province],
  );

  const matchedBuddies = useMemo(
    () =>
      buddies
        .filter((buddy) => (sameLanguage ? buddy.language === language : true))
        .map((buddy) => ({
          ...buddy,
          score:
            buddy.tags.filter((tag) => interests.includes(tag)).length * 24 +
            (sameLanguage ? 24 : 8) +
            (budgetRank[buddy.budget] <= budgetRank[budget] ? 10 : 0),
        }))
        .filter((buddy) => buddy.score > 20)
        .sort((a, b) => b.score - a.score)
        .slice(0, 4),
    [budget, interests, language, sameLanguage],
  );

  const toggleInterest = (interest: Interest) => {
    setInterests((current) =>
      current.includes(interest)
        ? current.length === 1
          ? current
          : current.filter((item) => item !== interest)
        : [...current, interest],
    );
  };

  const searchRoute = () => {
    const nextQuery = normalizeSearch(searchInput);
    setIsSearching(true);
    setSelectedStopId(null);
    setStatusMessage("Searching nearby places within 20 km...");
    window.setTimeout(() => {
      setSearchQuery(nextQuery);
      setStatusMessage(
        nextQuery
          ? `Showing nearby route matches for ${nextQuery}.`
          : "Showing nearby route matches from selected filters.",
      );
      setIsSearching(false);
    }, 550);
  };

  const saveTrip = () => {
    const tripName = `${startArea.name} - ${searchQuery || topInterests} - ${recommendedStops.length} stops`;
    setSavedTrips((current) =>
      current.includes(tripName) ? current : [tripName, ...current].slice(0, 4),
    );
    setStatusMessage("Trip saved to this demo session.");
  };

  const focusPreferences = () => {
    preferencesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setStatusMessage("Search and filters are ready to edit.");
  };

  const requestGuide = (guideName: string) => {
    setStatusMessage(
      `Guide request sent to ${guideName}. Waiting for confirmation.`,
    );
  };

  const joinBuddy = (buddyName: string) => {
    setStatusMessage(
      `Buddy invite sent to ${buddyName}. Shared activity created.`,
    );
  };

  const bookDriver = () => {
    setStatusMessage(
      `Fair ride reserved at ${fairFare.toLocaleString()} THB with OTP pickup.`,
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto max-w-7xl px-4 pb-20 pt-28 md:px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
              Rule-based search
            </span>
            <h1 className="font-heading text-4xl font-extrabold md:text-5xl">
              {dict.pages.aiRoute.title}
            </h1>
            <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
              Search what you want to do. The app scores places by your words,
              starting area, interests, budget, and route fit.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={focusPreferences}>
              {dict.pages.aiRoute.editBtn}
            </Button>
            <Button onClick={saveTrip}>{dict.pages.aiRoute.saveBtn}</Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside
            ref={preferencesRef}
            className="space-y-4 lg:sticky lg:top-24 lg:self-start"
          >
            <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h2 className="text-lg font-bold">Search route</h2>
              <div className="mt-5 space-y-4">
                <form
                  className="space-y-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    searchRoute();
                  }}
                >
                  <label className="block">
                    <span className="text-sm font-semibold text-muted-foreground">
                      What are you looking for?
                    </span>
                    <input
                      value={searchInput}
                      onChange={(event) => setSearchInput(event.target.value)}
                      placeholder="temple, cafe, beach, market, waterfall"
                      className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 font-medium outline-none focus:ring-2 focus:ring-ring"
                    />
                  </label>
                  <Button className="w-full" type="submit">
                    {isSearching ? "Searching..." : "Search"}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    {statusMessage} Nearby radius: up to {maxRouteDistanceKm}{" "}
                    km.
                  </p>
                </form>

                <label className="block">
                  <span className="text-sm font-semibold text-muted-foreground">
                    Starting area
                  </span>
                  <select
                    value={startAreaId}
                    onChange={(event) => {
                      setStartAreaId(event.target.value);
                      setSelectedStopId(null);
                      setStatusMessage(
                        "Starting area updated. Route recalculated automatically.",
                      );
                    }}
                    className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 font-medium outline-none focus:ring-2 focus:ring-ring"
                  >
                    {startingAreas.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.name} - {area.province}
                      </option>
                    ))}
                  </select>
                </label>

                <div>
                  <span className="text-sm font-semibold text-muted-foreground">
                    Travel interests
                  </span>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {interestOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          toggleInterest(option.value);
                          setSelectedStopId(null);
                          setStatusMessage(
                            `${option.label} preference updated.`,
                          );
                        }}
                        className={`h-10 rounded-md border px-3 text-sm font-semibold transition ${
                          interests.includes(option.value)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background hover:border-primary/60"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="block">
                  <span className="text-sm font-semibold text-muted-foreground">
                    Route pace
                  </span>
                  <select
                    value={pace}
                    onChange={(event) => {
                      setPace(event.target.value as Pace);
                      setSelectedStopId(null);
                      setStatusMessage("Route pace updated.");
                    }}
                    className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 font-medium outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="easy">Easy: 3 stops</option>
                    <option value="balanced">Balanced: 4 stops</option>
                    <option value="packed">Packed: 5 stops</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-muted-foreground">
                    Budget comfort
                  </span>
                  <select
                    value={budget}
                    onChange={(event) => {
                      setBudget(event.target.value as Budget);
                      setStatusMessage(
                        "Budget updated. Place and buddy scores changed.",
                      );
                    }}
                    className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 font-medium outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="low">Local saver</option>
                    <option value="medium">Balanced spend</option>
                    <option value="premium">Premium comfort</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-muted-foreground">
                    Preferred language
                  </span>
                  <select
                    value={language}
                    onChange={(event) => {
                      setLanguage(event.target.value);
                      setStatusMessage(
                        "Guide and buddy language matching updated.",
                      );
                    }}
                    className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 font-medium outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option>English</option>
                    <option>Thai</option>
                    <option>Chinese</option>
                    <option>Japanese</option>
                    <option>French</option>
                    <option>Russian</option>
                  </select>
                </label>
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h2 className="text-lg font-bold">Safety and matching</h2>
              <div className="mt-4 space-y-3">
                <label className="flex items-center justify-between gap-4 rounded-lg bg-muted/60 p-3">
                  <span>
                    <span className="block text-sm font-bold">
                      Verified providers only
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ID, passport, face check, and OTP
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(event) => {
                      setVerifiedOnly(event.target.checked);
                      setStatusMessage(
                        event.target.checked
                          ? "Verification filter enabled."
                          : "Verification filter relaxed for demo.",
                      );
                    }}
                    className="h-5 w-5 accent-primary"
                  />
                </label>
                <label className="flex items-center justify-between gap-4 rounded-lg bg-muted/60 p-3">
                  <span>
                    <span className="block text-sm font-bold">
                      Same language buddies
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Match by language and activities
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={sameLanguage}
                    onChange={(event) => {
                      setSameLanguage(event.target.checked);
                      setStatusMessage("Buddy pool recalculated.");
                    }}
                    className="h-5 w-5 accent-primary"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h2 className="text-lg font-bold">Saved trips</h2>
              {savedTrips.length ? (
                <div className="mt-3 space-y-2">
                  {savedTrips.map((trip) => (
                    <button
                      key={trip}
                      type="button"
                      onClick={() =>
                        setStatusMessage(`Loaded saved trip preview: ${trip}`)
                      }
                      className="w-full rounded-md border border-border bg-background p-3 text-left text-sm font-semibold hover:border-primary"
                    >
                      {trip}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  Save a generated trip to see it here.
                </p>
              )}
            </section>
          </aside>

          <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-4">
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <p className="text-sm font-semibold text-muted-foreground">
                  Best match
                </p>
                <p className="mt-2 text-3xl font-extrabold text-primary">
                  {Math.min(99, Math.max(72, recommendedStops[0]?.match ?? 72))}
                  %
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {searchQuery || topInterests}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <p className="text-sm font-semibold text-muted-foreground">
                  Route distance
                </p>
                <p className="mt-2 text-3xl font-extrabold text-accent">
                  {Math.round(totalKm)} km
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatDuration(totalMinutes)} of activities
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <p className="text-sm font-semibold text-muted-foreground">
                  Fair transport
                </p>
                <p className="mt-2 text-3xl font-extrabold text-secondary">
                  {fairFare.toLocaleString()}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  THB fixed estimate
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <p className="text-sm font-semibold text-muted-foreground">
                  Buddy pool
                </p>
                <p className="mt-2 text-3xl font-extrabold text-primary">
                  {matchedBuddies.length}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {sameLanguage ? language : "Mixed language"} matches
                </p>
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-col gap-3 border-b border-border pb-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold">
                    Recommended route from {startArea.name}
                  </h2>
                  <p className="text-muted-foreground">
                    Showing places within {maxRouteDistanceKm} km, ranked by
                    search words, interests, budget, crowd level, and distance.
                  </p>
                </div>
                <Button variant="secondary" onClick={focusPreferences}>
                  Edit search
                </Button>
              </div>

              {isSearching ? (
                <div className="mt-6 space-y-4">
                  {[0, 1, 2].map((item) => (
                    <div
                      key={item}
                      className="grid gap-4 rounded-lg border border-border bg-background p-3 md:grid-cols-[180px_1fr]"
                    >
                      <div className="h-40 animate-pulse rounded-md bg-muted" />
                      <div className="space-y-3 p-1">
                        <div className="h-4 w-40 animate-pulse rounded bg-muted" />
                        <div className="h-7 w-2/3 animate-pulse rounded bg-muted" />
                        <div className="h-16 animate-pulse rounded bg-muted" />
                        <div className="h-10 animate-pulse rounded bg-muted" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-6 space-y-5">
                  {recommendedStops.map((stop, index) => (
                    <article
                      key={stop.id}
                      className={`grid gap-4 rounded-lg border bg-background p-3 transition md:grid-cols-[180px_1fr] ${
                        selectedStop?.id === stop.id
                          ? "border-primary shadow-md"
                          : "border-border"
                      }`}
                    >
                      <div className="relative min-h-40 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={stop.image}
                          alt={stop.title}
                          fill
                          sizes="(min-width: 768px) 180px, 100vw"
                          unoptimized
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-bold shadow">
                          Stop {index + 1}
                        </span>
                      </div>

                      <div className="flex flex-col justify-between gap-4 p-1">
                        <div>
                          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                            <div>
                              <p className="text-sm font-bold text-primary">
                                {stop.time} - {formatDuration(stop.duration)} -{" "}
                                {stop.area}, {stop.province}
                              </p>
                              <h3 className="mt-1 text-2xl font-extrabold">
                                {stop.title}
                              </h3>
                            </div>
                            <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                              {Math.min(stop.match, 99)}% match
                            </span>
                          </div>
                          <p className="mt-3 text-muted-foreground">
                            {stop.description}
                          </p>
                          <p className="mt-3 rounded-lg bg-muted p-3 text-sm">
                            <span className="font-bold">Agent reason:</span>{" "}
                            matches {getSharedTags(stop.tags, interests)}, fits{" "}
                            {budget} budget, and is {stop.distanceKm} km from
                            the selected route base.
                          </p>
                          <p className="mt-2 rounded-lg border border-border p-3 text-sm">
                            <span className="font-bold">Local guide tip:</span>{" "}
                            {stop.localTip}
                          </p>
                          <div className="mt-2 grid gap-2 text-sm md:grid-cols-3">
                            <div className="rounded-md border border-border p-3">
                              <span className="block text-xs font-bold uppercase text-muted-foreground">
                                Open
                              </span>
                              {getPlaceDetail(stop).hours}
                            </div>
                            <div className="rounded-md border border-border p-3">
                              <span className="block text-xs font-bold uppercase text-muted-foreground">
                                Cost
                              </span>
                              {getPlaceDetail(stop).price}
                            </div>
                            <div className="rounded-md border border-border p-3">
                              <span className="block text-xs font-bold uppercase text-muted-foreground">
                                Best time
                              </span>
                              {getPlaceDetail(stop).bestTime}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {stop.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-border px-3 py-1 text-xs font-semibold capitalize"
                            >
                              {tag}
                            </span>
                          ))}
                          <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold capitalize">
                            {stop.crowd} crowd
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedStopId(stop.id);
                              setStatusMessage(
                                `Showing details for ${stop.title}.`,
                              );
                            }}
                            className="ml-auto rounded-md bg-primary px-3 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                          >
                            View details
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className="grid gap-6 xl:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <h2 className="text-xl font-extrabold">Matched local guides</h2>
                <div className="mt-4 space-y-3">
                  {matchedGuides.map((guide) => (
                    <div
                      key={guide.name}
                      className="rounded-lg bg-muted/60 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-bold">{guide.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {guide.province} - {guide.tags.join(", ")}
                          </p>
                        </div>
                        <span className="rounded-full bg-accent/10 px-2 py-1 text-xs font-bold text-accent">
                          {verifiedOnly ? "Verified" : "Available"}
                        </span>
                      </div>
                      <p className="mt-2 text-sm">
                        Languages: {guide.languages.join(", ")}
                      </p>
                      <p className="text-sm">
                        Rate: {guide.rate.toLocaleString()} THB/day
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Identity: {guide.verification}
                      </p>
                      <button
                        type="button"
                        onClick={() => requestGuide(guide.name)}
                        className="mt-3 rounded-md bg-primary px-3 py-2 text-sm font-bold text-primary-foreground"
                      >
                        Request guide
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <h2 className="text-xl font-extrabold">Route support</h2>
                <div className="mt-4 space-y-3">
                  <div className="rounded-lg bg-muted/60 p-4">
                    <h3 className="font-bold">Fair taxi bundle</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Upfront fare, verified driver identity, OTP pickup, and
                      route-aware stops.
                    </p>
                    <button
                      type="button"
                      onClick={bookDriver}
                      className="mt-3 rounded-md bg-primary px-3 py-2 text-sm font-bold text-primary-foreground"
                    >
                      Reserve fair ride
                    </button>
                  </div>
                  <div className="rounded-lg bg-muted/60 p-4">
                    <h3 className="font-bold">Travel buddy matches</h3>
                    <div className="mt-3 space-y-2">
                      {matchedBuddies.map((buddy) => (
                        <button
                          key={buddy.name}
                          type="button"
                          onClick={() => joinBuddy(buddy.name)}
                          className="w-full rounded-md border border-border bg-background p-3 text-left hover:border-primary"
                        >
                          <span className="block font-bold">
                            {buddy.name} - {buddy.nationality}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {buddy.language} - {buddy.tags.join(", ")} -{" "}
                            {buddy.budget} budget
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted/60 p-4">
                    <h3 className="font-bold">Unseen platform listing</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Places with local tips and high hidden-gem scores can be
                      promoted into the destination platform after guide
                      verification.
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setStatusMessage(
                          "Unseen listing draft created for the highest scoring hidden place.",
                        )
                      }
                      className="mt-3 rounded-md bg-primary px-3 py-2 text-sm font-bold text-primary-foreground"
                    >
                      Create listing draft
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {selectedStop && selectedPlaceDetail && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-4 backdrop-blur-sm md:items-center">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-background shadow-2xl">
            <div className="relative h-56 overflow-hidden rounded-t-xl bg-muted">
              <Image
                src={selectedStop.image}
                alt={selectedStop.title}
                fill
                sizes="(min-width: 768px) 896px, 100vw"
                unoptimized
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedStopId(null)}
                className="absolute right-4 top-4 rounded-full bg-background/90 px-3 py-2 text-sm font-bold shadow hover:bg-background"
              >
                Close
              </button>
            </div>

            <div className="p-5 md:p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-bold text-primary">
                    {selectedStop.area}, {selectedStop.province} -{" "}
                    {selectedStop.distanceKm} km from {startArea.name}
                  </p>
                  <h2 className="mt-1 text-3xl font-extrabold">
                    {selectedStop.title}
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    {selectedPlaceDetail.address}
                  </p>
                </div>
                <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                  {Math.min(selectedStop.match, 99)}% match
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <p className="rounded-lg bg-muted/70 p-3 text-sm">
                  <span className="block font-bold">Open</span>
                  {selectedPlaceDetail.hours}
                </p>
                <p className="rounded-lg bg-muted/70 p-3 text-sm">
                  <span className="block font-bold">Price</span>
                  {selectedPlaceDetail.price}
                </p>
                <p className="rounded-lg bg-muted/70 p-3 text-sm">
                  <span className="block font-bold">Best time</span>
                  {selectedPlaceDetail.bestTime}
                </p>
                <p className="rounded-lg bg-muted/70 p-3 text-sm">
                  <span className="block font-bold">Duration</span>
                  {formatDuration(selectedStop.duration)}
                </p>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
                <div className="rounded-lg border border-border p-4">
                  <h3 className="font-bold">Visit planning</h3>
                  <p className="mt-3 text-sm">
                    <span className="font-bold">Accessibility:</span>{" "}
                    {selectedPlaceDetail.accessibility}
                  </p>
                  <p className="mt-2 text-sm">
                    <span className="font-bold">Transport:</span>{" "}
                    {selectedPlaceDetail.transportNote}
                  </p>
                  <p className="mt-2 text-sm">
                    <span className="font-bold">Local tip:</span>{" "}
                    {selectedStop.localTip}
                  </p>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <h3 className="font-bold">Why this matched</h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    The rule-based search matched{" "}
                    {getSharedTags(selectedStop.tags, interests)}, kept the stop
                    within the {maxRouteDistanceKm} km radius, and checked it
                    against your {budget} budget preference.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedStop.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 text-xs font-semibold capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="font-bold">Highlights</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedPlaceDetail.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-lg bg-muted/70 p-4">
                <h3 className="font-bold">Nearby places</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedPlaceDetail.nearby.join(", ")}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setStatusMessage(
                      `${selectedStop.title} added to a custom route draft.`,
                    )
                  }
                  className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
                >
                  Add to route
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setStatusMessage(
                      `Mock booking note saved for ${selectedStop.title}.`,
                    )
                  }
                  className="rounded-md border border-border px-4 py-2 text-sm font-bold hover:border-primary"
                >
                  Save note
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setStatusMessage(
                      `Fair ride preview opened for ${selectedStop.title}.`,
                    )
                  }
                  className="rounded-md border border-border px-4 py-2 text-sm font-bold hover:border-primary"
                >
                  Preview ride
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
