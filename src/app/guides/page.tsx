"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/i18n/DictionaryContext";
import { cn } from "@/lib/utils";

/* ── Inline SVG icons (no external deps) ── */
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className="text-yellow-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const ArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;

/* ── Guide images ── */
const guideImages: Record<number, { avatar: string; gallery: string[] }> = {
  1: {
    avatar: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://s359.kapook.com/pagebuilder/9e28790f-58bb-40e8-9417-c1d154863245.jpg",
      "https://static.naewna.com/uploads/files2017/images/1735619478676.jpg",
    ],
  },
  2: {
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://www.aroimak.co/wp-content/uploads/2021/03/watsirintorn-1.jpg",
      "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_auto,s_webp:avif/meetmeindepartures.com/wp-content/uploads/2023/03/ayutthaya-itinerary-ayutthaya-ruins-canva.jpg",
    ],
  },
  3: {
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/236/2024/06/17031656/Khao-Sok-National-Park-1.jpg",
      "https://www.siamguides.com/wp-content/uploads/2023/01/thi-lo-su-waterfall-in-thailand.jpg",
    ],
  },
  4: {
    avatar: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://www.agoda.com/wp-content/uploads/2024/07/Grand-Palace-and-wat-phra-kaew-1244x700.jpg",
      "https://www.aroimak.co/wp-content/uploads/2021/03/watsirintorn-1.jpg",
    ],
  },
  5: {
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1688625548814-d7bb114d344e?q=80&w=800&auto=format&fit=crop",
      "https://static.ticket2attraction.com/gallery/87392c34-2b7f-47b6-8cab-991dd834cd9b/226cf2f4-eeff-46ea-9f83-51e0a00408c4-1200.webp",
    ],
  },
};

const RATINGS: Record<number, number> = { 1: 4.9, 2: 5.0, 3: 4.8, 4: 4.9, 5: 4.9 };

export default function GuidesPage() {
  const { dict } = useDictionary();
  const g = dict.pages.guides;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuide, setSelectedGuide] = useState<any>(null);
  const [isChatting, setIsChatting] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "guide"; text: string }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const guides = useMemo(
    () => (g.list as any[]).map((item: any) => ({ ...item, ...guideImages[item.id], rating: RATINGS[item.id] ?? 4.8 })),
    [g.list],
  );

  const filtered = guides.filter((gd: any) => {
    const q = searchQuery.toLowerCase();
    return gd.name.toLowerCase().includes(q) || gd.specialty.toLowerCase().includes(q) || gd.location.toLowerCase().includes(q);
  });

  const openGuide = (gd: any) => { setSelectedGuide(gd); setIsChatting(false); setChatHistory([]); };
  const closeAll = () => { setSelectedGuide(null); setIsChatting(false); setChatHistory([]); };

  const startChat = () => {
    setIsChatting(true);
    if (chatHistory.length === 0) setChatHistory([{ role: "guide", text: `Sawadee ka! I'm ${selectedGuide.name}. How can I help you plan your trip?` }]);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMsg.trim()) return;
    setChatHistory((h) => [...h, { role: "user", text: chatMsg }]);
    setChatMsg("");
    setTimeout(() => setChatHistory((h) => [...h, { role: "guide", text: `Sounds great! I'm available for ${selectedGuide.category} tours. Want to see my itinerary?` }]), 1000);
  };

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatHistory]);

  /* ═══════════════════════════════════════════
     CHAT VIEW — full-screen, simple 3-row flex
     ═══════════════════════════════════════════ */
  if (selectedGuide && isChatting) {
    return (
      <div className="fixed inset-0 z-50 bg-neutral-100 flex flex-col">
        {/* Row 1: Header */}
        <div className="bg-white border-b border-neutral-200 px-4 md:px-6 py-3 flex items-center justify-between gap-3">
          <button onClick={() => setIsChatting(false)} className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors">
            <ArrowLeft /> {g.backBtn}
          </button>
          <div className="flex items-center gap-3">
            <img src={selectedGuide.avatar} alt="" className="w-9 h-9 rounded-full object-cover border-2 border-primary/20" />
            <div className="hidden sm:block">
              <p className="font-bold text-sm leading-tight">{selectedGuide.name}</p>
              <p className="text-[10px] text-green-500 font-bold">● Online</p>
            </div>
          </div>
          <button onClick={closeAll} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-colors">
            <XIcon /> {g.exitChat}
          </button>
        </div>

        {/* Row 2: Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-5 max-w-3xl mx-auto w-full">
          {chatHistory.map((m, i) => (
            <div key={i} className={cn("flex flex-col max-w-[85%]", m.role === "user" ? "ml-auto items-end" : "mr-auto items-start")}>
              <div className={cn("px-4 py-3 rounded-2xl text-sm shadow-sm", m.role === "user" ? "bg-primary text-white rounded-br-sm" : "bg-white text-neutral-800 rounded-bl-sm border border-neutral-200")}>{m.text}</div>
              <span className="text-[10px] text-neutral-400 mt-1.5 font-medium">{m.role === "user" ? "You" : selectedGuide.name}</span>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Row 3: Input */}
        <div className="bg-white border-t border-neutral-200 p-3 md:p-4">
          <form onSubmit={sendMessage} className="flex items-center gap-3 max-w-3xl mx-auto">
            <input type="text" value={chatMsg} onChange={(e) => setChatMsg(e.target.value)} placeholder={g.chatPlaceholder} className="flex-1 h-12 bg-neutral-100 border border-neutral-200 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
            <button type="submit" className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"><SendIcon /></button>
          </form>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════
     PROFILE VIEW — full-screen overlay scroll
     ═══════════════════════════════════════════ */
  if (selectedGuide) {
    return (
      <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
        {/* Sticky top bar */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-neutral-100 px-4 md:px-6 py-3 flex items-center justify-between">
          <button onClick={closeAll} className="flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl font-bold text-sm transition-colors">
            <ArrowLeft /> {g.backBtn}
          </button>
          <div className="flex items-center gap-1.5 text-xs font-bold text-green-600"><ShieldIcon /> {g.verified}</div>
          <button onClick={closeAll} className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-sm transition-colors">
            <XIcon /> {g.closeBtn}
          </button>
        </div>

        {/* Hero */}
        <div className="relative h-64 md:h-80 w-full bg-neutral-200">
          <img src={selectedGuide.avatar} alt={selectedGuide.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl md:text-4xl font-black">{selectedGuide.name}</h1>
            <p className="flex items-center gap-1.5 text-white/80 text-sm font-medium mt-1"><MapPinIcon /> {selectedGuide.location}</p>
          </div>
          <div className="absolute bottom-6 right-6 text-right text-white">
            <p className="text-2xl md:text-3xl font-black">฿{selectedGuide.price.toLocaleString()}</p>
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/70">{g.perDay}</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 space-y-10">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center py-6 border-y border-neutral-100">
            <div><p className="text-[10px] font-bold text-neutral-400 uppercase mb-1">Rating</p><p className="font-black text-lg flex items-center justify-center gap-1">{selectedGuide.rating} <StarIcon /></p></div>
            <div><p className="text-[10px] font-bold text-neutral-400 uppercase mb-1">{g.experience}</p><p className="font-black text-lg">{selectedGuide.experience} yrs</p></div>
            <div><p className="text-[10px] font-bold text-neutral-400 uppercase mb-1">{g.trips}</p><p className="font-black text-lg">{selectedGuide.trips}+</p></div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">{g.aboutMe}</h3>
            <p className="text-lg italic text-neutral-600 leading-relaxed">"{selectedGuide.bio}"</p>
          </div>

          {/* Languages & Expertise */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">{selectedGuide.languages.map((l: string) => <span key={l} className="text-xs px-3 py-1 bg-neutral-100 rounded-lg font-medium border border-neutral-200">{l}</span>)}</div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Expertise</h3>
              <div className="flex flex-wrap gap-2">{selectedGuide.expertise.map((e: string) => <span key={e} className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-lg font-medium border border-primary/20">{e}</span>)}</div>
            </div>
          </div>

          {/* Gallery */}
          <div>
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Gallery</h3>
            <div className="grid grid-cols-2 gap-3">
              {selectedGuide.gallery.map((img: string, i: number) => (
                <div key={i} className="aspect-video rounded-xl overflow-hidden shadow-sm border border-neutral-100">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky bottom actions */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-neutral-100 p-4">
          <div className="max-w-3xl mx-auto flex gap-3">
            <Button className="flex-[2] h-14 rounded-xl text-base font-bold shadow-lg">{g.bookBtn}</Button>
            <Button onClick={startChat} variant="outline" className="flex-1 h-14 rounded-xl text-base font-bold border-neutral-200">{g.messageBtn}</Button>
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════
     MAIN GRID — guide cards
     ═══════════════════════════════════════════ */
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pt-32 pb-20 px-4 md:px-6 container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 font-heading">{g.title}</h1>
            <p className="text-lg text-muted-foreground">{g.subtitle}</p>
          </div>
          <div className="relative w-full md:w-72">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={g.searchPlaceholder} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((gd: any) => (
            <div key={gd.id} onClick={() => openGuide(gd)} className="group glass rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl cursor-pointer">
              {/* Image */}
              <div className="h-56 w-full overflow-hidden relative">
                <img src={gd.avatar} alt={gd.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                  <div className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md"><StarIcon /> {gd.rating}</div>
                  <div className="bg-primary/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-white flex items-center gap-1 shadow-md"><ShieldIcon /> {g.verified}</div>
                </div>
              </div>
              {/* Info */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-lg font-bold group-hover:text-primary transition-colors">{gd.name}</h2>
                    <p className="flex items-center gap-1 text-muted-foreground text-xs"><MapPinIcon /> {gd.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-extrabold text-primary">฿{gd.price.toLocaleString()}</p>
                    <p className="text-[9px] text-muted-foreground uppercase font-bold">{g.perDay}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4 italic">"{gd.bio}"</p>
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase"><UsersIcon /> {gd.trips} {g.trips}</div>
                  <div className="flex gap-1">{gd.languages.map((l: string) => <span key={l} className="text-[9px] font-bold px-1.5 py-0.5 bg-muted text-muted-foreground rounded border border-border uppercase">{l.substring(0, 2)}</span>)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
