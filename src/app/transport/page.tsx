"use client";

import { Button } from "@/components/ui/button";
import { useDictionary } from "@/i18n/DictionaryContext";

export default function TransportPage() {
  const { dict } = useDictionary();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pt-32 pb-20 px-4 md:px-6 container mx-auto max-w-6xl">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-heading">{dict.pages.transport.title}</h1>
          <p className="text-xl text-muted-foreground">{dict.pages.transport.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-border">
              <h2 className="text-2xl font-bold mb-6">Book a Ride</h2>
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute left-4 top-3 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
                  </div>
                  <input type="text" placeholder="Pickup Location" className="w-full bg-background border border-border rounded-lg pl-12 pr-4 py-3" defaultValue="Suvarnabhumi Airport (BKK)" />
                </div>
                <div className="w-0.5 h-6 bg-border ml-6"></div>
                <div className="relative">
                  <div className="absolute left-4 top-3 text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <input type="text" placeholder="Drop-off Location" className="w-full bg-background border border-border rounded-lg pl-12 pr-4 py-3" defaultValue="Sukhumvit 11" />
                </div>
                
                <div className="bg-muted p-4 rounded-lg mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-lg">Estimated Fare</span>
                    <span className="text-2xl font-bold text-primary">฿450</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Fixed price. No hidden fees or negotiations needed.</p>
                </div>

                <Button className="w-full py-6 text-lg">Request Vehicle</Button>
              </div>
            </div>
          </div>

          <div>
            <div className="glass p-6 rounded-2xl border border-border h-full">
              <h2 className="text-2xl font-bold mb-6">Safety & Verification</h2>
              <p className="text-muted-foreground mb-6">Your safety is our priority. Every driver on our platform passes a strict 4-step verification process.</p>
              
              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-xl bg-background border border-border items-start">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Official ID / Passport</h3>
                    <p className="text-sm text-muted-foreground">Government-issued identification verified against national databases.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-background border border-border items-start">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Face Recognition</h3>
                    <p className="text-sm text-muted-foreground">Drivers must complete a live selfie check before accepting rides.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-background border border-border items-start">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">2FA OTP Verification</h3>
                    <p className="text-sm text-muted-foreground">Phone numbers linked to registered devices to ensure accountability.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
