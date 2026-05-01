"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Buddy = {
  name: string;
  age: number;
  from: string;
  language: string;
  costSharing: boolean;
  match: string;
  interests: string[];
  image: string;
};

export default function ConnectFriend() {
  const router = useRouter();
  const [connectedBuddies, setConnectedBuddies] = useState<Buddy[]>([]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      const stored = localStorage.getItem("connected_buddies");
      if (stored) setConnectedBuddies(JSON.parse(stored));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const handleRemove = (name: string) => {
    const updated = connectedBuddies.filter((b) => b.name !== name);
    localStorage.setItem("connected_buddies", JSON.stringify(updated));
    setConnectedBuddies(updated);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pt-32 pb-20 px-4 md:px-6 container mx-auto max-w-4xl">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 font-heading">My Friends</h1>
            <p className="text-muted-foreground">
              {connectedBuddies.length} {connectedBuddies.length === 1 ? "buddy" : "buddies"} connected
            </p>
          </div>
          <Button variant="outline" onClick={() => router.push("/buddies")}>← Back to Matches</Button>
        </div>

        {connectedBuddies.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <p className="text-2xl font-semibold mb-2">No connections yet</p>
            <p className="mb-6">Go back and click Connect on a buddy to add them here.</p>
            <Button onClick={() => router.push("/buddies")}>Find Buddies</Button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {connectedBuddies.map((buddy, i) => (
              <div key={i} className="glass p-4 rounded-2xl border border-border flex flex-col sm:flex-row gap-6 items-center sm:items-start hover:shadow-md transition-shadow">
                <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-4 border-background shadow-inner">
                  <img src={buddy.image} alt={buddy.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-1">
                    <h3 className="text-xl font-bold">{buddy.name}, {buddy.age}</h3>
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold border border-primary/30 mt-2 sm:mt-0">
                      {buddy.match} Match
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">From {buddy.from} · {buddy.language}</p>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-4">
                    {buddy.interests.map((interest) => (
                      <span key={interest} className="text-xs px-2 py-1 bg-background border border-border rounded-md text-foreground">
                        {interest}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 justify-center sm:justify-start">
                    <Button onClick={() => router.push(`/buddies/message/${encodeURIComponent(buddy.name)}`)}>Message</Button>
                    <Button variant="outline" onClick={() => router.push(`/buddies/trip_plan/${encodeURIComponent(buddy.name)}`)}>View Trip Plan</Button>
                    <Button variant="outline" onClick={() => handleRemove(buddy.name)}>Remove</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
