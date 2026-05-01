"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Message = {
  from: "me" | "buddy";
  text: string;
  time: string;
};

const buddyProfiles: Record<string, { image: string; from: string }> = {
  "Alex K.":  { image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop", from: "Germany" },
  "Sarah M.": { image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop", from: "UK" },
  "Kenji T.": { image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop", from: "Japan" },
  "Nadia P.": { image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=200&auto=format&fit=crop", from: "USA" },
  "Arjun S.": { image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop", from: "India" },
  "Ploy C.":  { image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop", from: "Thailand" },
  "Lucas B.": { image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop", from: "Brazil" },
  "Mia L.":   { image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop", from: "Australia" },
  "Som N.":   { image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=200&auto=format&fit=crop", from: "Thailand" },
};

const mockReplies = [
  "That sounds amazing! 🙌",
  "Yes, I'd love that! When are you free?",
  "Great idea! I've been wanting to explore that area too.",
  "Count me in! Should we sort accommodation together?",
  "Haha totally agree 😄 Let's plan it out!",
  "I was just thinking the same thing!",
  "Awesome, I'll check my schedule and get back to you.",
];

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function MessagePage() {
  const params = useParams<{ buddyName: string }>();
  const router = useRouter();
  const buddyName = decodeURIComponent(params.buddyName);
  const profile = buddyProfiles[buddyName] ?? { image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop", from: "Unknown" };

  const [messages, setMessages] = useState<Message[]>([
    { from: "buddy", text: `Hey! I saw we matched on TidCORS 😊 Are you also heading to Thailand soon?`, time: "10:12 AM" },
    { from: "me",    text: "Yes! I'm planning a trip next month. Would love to find a travel buddy.", time: "10:14 AM" },
    { from: "buddy", text: "Perfect timing! I've been looking for someone to explore with. What's on your list?", time: "10:15 AM" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { from: "me", text, time: now() }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const reply = mockReplies[Math.floor(Math.random() * mockReplies.length)];
      setMessages((prev) => [...prev, { from: "buddy", text: reply, time: now() }]);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pt-20 pb-0 flex flex-col container mx-auto max-w-2xl px-4 md:px-6">

        {/* Chat header */}
        <div className="sticky top-20 z-10 glass border-b border-border px-4 py-3 flex items-center gap-3">
          <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground mr-1 text-lg">←</button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border shrink-0">
            <img src={profile.image} alt={buddyName} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{buddyName}</p>
            <p className="text-xs text-muted-foreground">From {profile.from}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => router.push(`/buddies/trip_plan/${encodeURIComponent(buddyName)}`)}>
            View Trip Plan
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex items-end gap-2 ${msg.from === "me" ? "flex-row-reverse" : "flex-row"}`}>
              {msg.from === "buddy" && (
                <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mb-1">
                  <img src={profile.image} alt={buddyName} className="w-full h-full object-cover" />
                </div>
              )}
              <div className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.from === "me"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "glass border border-border rounded-bl-sm"
              }`}>
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.from === "me" ? "text-primary-foreground/60 text-right" : "text-muted-foreground"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mb-1">
                <img src={profile.image} alt={buddyName} className="w-full h-full object-cover" />
              </div>
              <div className="glass border border-border px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="sticky bottom-0 glass border-t border-border px-4 py-3 flex gap-3 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${buddyName.split(" ")[0]}…`}
            className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm outline-none focus:border-primary transition-colors"
          />
          <Button onClick={sendMessage} disabled={!input.trim()} className="rounded-full px-5">
            Send
          </Button>
        </div>

      </main>
    </div>
  );
}
