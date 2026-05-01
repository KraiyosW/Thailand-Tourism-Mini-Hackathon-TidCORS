"use client";

import { Button } from "@/components/ui/button";
import { useDictionary } from "@/i18n/DictionaryContext";
import { useState } from "react";

const LOCATIONS = [
  "Suvarnabhumi Airport (BKK)",
  "Don Mueang Airport (DMK)",
  "Sukhumvit 11, Bangkok",
  "Grand Palace, Bangkok",
  "Chatuchak Weekend Market",
  "Khao San Road",
  "Siam Paragon",
  "Phuket Old Town",
  "Patong Beach, Phuket",
  "Chiang Mai Old City",
  "Pattaya Walking Street"
];

const VEHICLES = [
  { id: "car", value: "Car" },
  { id: "motorcycle", value: "Motorcycle" },
  { id: "tuktuk", value: "Tuk-Tuk" },
  { id: "songthaew", value: "Songthaew (Red Truck)" }
] as const;

export default function TransportPage() {
  const { dict } = useDictionary();
  const t = dict.pages.transport;

  const LOCATIONS = Object.values(t.locations);
  const VEHICLES = [
    { id: "car", value: t.vehicles.car },
    { id: "motorcycle", value: t.vehicles.motorcycle },
    { id: "tuktuk", value: t.vehicles.tuktuk },
    { id: "songthaew", value: t.vehicles.songthaew }
  ] as const;

  const [pickup, setPickup] = useState(LOCATIONS[0]);
  const [dropoff, setDropoff] = useState(LOCATIONS[2]);
  const [vehicleType, setVehicleType] = useState<string>(VEHICLES[0].value);
  const [userPrice, setUserPrice] = useState("500");
  const [loading, setLoading] = useState(false);
  
  const [priceData, setPriceData] = useState<{
    expectedPrice: number;
    userPrice: number;
    status: "Good" | "Avg" | "High";
    scamAlert: { reports: number; message: string } | null;
  } | null>(null);

  const checkRoute = async () => {
    if (!pickup || !dropoff || !userPrice) return;
    setLoading(true);
    
    const parsedUserPrice = parseFloat(userPrice);

    // Fallback JS Mock
    setTimeout(() => {
      let base = 150;
      let modifierMultiplier = 15;
      
      if (vehicleType === t.vehicles.motorcycle) {
        base = 50;
        modifierMultiplier = 10;
      } else if (vehicleType === t.vehicles.songthaew) {
        base = 30;
        modifierMultiplier = 5;
      } else if (vehicleType === t.vehicles.tuktuk) {
        base = 100;
        modifierMultiplier = 15;
      } else if (vehicleType === t.vehicles.car) {
        base = 150;
        modifierMultiplier = 20;
      }
      
      const distanceModifier = Math.abs(pickup.length - dropoff.length) * modifierMultiplier + (Math.random() * 50);
      const expectedPrice = Math.floor(base + distanceModifier);
      const difference = parsedUserPrice - expectedPrice;
      
      let status: "Good" | "Avg" | "High" = "Avg";
      if (difference <= 20) status = "Good";
      else if (difference <= (expectedPrice * 0.5) + 50) status = "Avg";
      else status = "High";

      let scamAlert = null;
      if (difference > (expectedPrice * 0.8) + 100 || (parsedUserPrice > expectedPrice * 2 && Math.random() > 0.3)) {
         scamAlert = {
           reports: Math.floor(Math.random() * 5) + 2,
           message: ""
         };
      }

      setPriceData({ expectedPrice, userPrice: parsedUserPrice, status, scamAlert });
      setLoading(false);
    }, 1200);
  };

  const handleSOS = () => {
    alert(`🚨 SOS ACTIVATED 🚨\n\nYour live location is now being shared with local authorities and your emergency contacts.`);
  };

  const handlePolice = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(`📞 CALLING TOURIST POLICE 📞\n\nDialing 1155...`);
  };

  // Calculate pin position
  const pinPosition = priceData ? Math.min(Math.max((priceData.userPrice / 1000) * 100, 5), 95) : 50;

  let statusColor = "bg-gray-100 text-gray-800";
  let statusText = "";
  
  if (priceData) {
    if (priceData.status === "Good") {
      statusColor = "bg-green-100 text-green-800 border border-green-200";
      statusText = t.priceGood;
    } else if (priceData.status === "Avg") {
      statusColor = "bg-yellow-100 text-yellow-800 border border-yellow-200";
      statusText = t.priceAvg;
    } else if (priceData.status === "High") {
      statusColor = "bg-red-100 text-red-800 border border-red-200";
      statusText = t.priceHigh;
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <main className="flex-1 pt-32 pb-20 px-4 md:px-6 container mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-heading text-slate-900 tracking-tight">
            {t.title}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                {t.fairPriceCheck}
              </h2>
              
              <div className="space-y-5 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t.vehicleType}</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-base font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  >
                    {VEHICLES.map(v => (
                      <option key={v.id} value={v.value}>{v.value}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t.pickupLocation}</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-base font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                  >
                    {LOCATIONS.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t.dropoffLocation}</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-base font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                  >
                    {LOCATIONS.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t.driverQuote}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-slate-500 font-bold">฿</span>
                    <input 
                      type="number"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3.5 text-base font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="500"
                      value={userPrice}
                      onChange={(e) => setUserPrice(e.target.value)}
                    />
                  </div>
                </div>

                <Button onClick={checkRoute} disabled={loading} className="w-full py-6 mt-4 text-lg font-bold rounded-xl shadow-md">
                  {loading ? t.analyzingBtn : t.checkBtn}
                </Button>
              </div>

              {priceData && (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-sm font-semibold text-slate-500 mb-1">{t.estimatedFairPrice}</p>
                      <span className="text-4xl font-extrabold text-slate-900">~฿{priceData.expectedPrice}</span>
                      <p className="text-sm text-slate-600 mt-2 font-medium">
                        {t.driverAskedFor} <span className="font-bold">฿{priceData.userPrice}</span>
                      </p>
                    </div>
                    <span className={`px-4 py-1.5 text-sm font-bold rounded-full ${statusColor}`}>
                      {statusText}
                    </span>
                  </div>

                  <div className="relative h-6 bg-slate-200 rounded-full overflow-hidden flex mb-3 shadow-inner">
                    <div className="h-full bg-emerald-500 w-1/3"></div>
                    <div className="h-full bg-amber-400 w-1/3"></div>
                    <div className="h-full bg-rose-500 w-1/3"></div>
                    <div className="absolute top-0 bottom-0 w-2 bg-white rounded-full shadow-md border-2 border-slate-900 transition-all duration-1000 ease-out" style={{ left: `calc(${pinPosition}% - 4px)` }}></div>
                  </div>
                  
                  <div className="flex justify-between text-[10px] text-slate-500 font-bold px-2 uppercase tracking-wider">
                    <span>{t.priceGood}</span>
                    <span>{t.priceAvg}</span>
                    <span>{t.priceHigh}</span>
                  </div>
                </div>
              )}
            </div>

            {priceData?.scamAlert && (
              <div className="bg-red-50 p-6 rounded-3xl border-2 border-red-200 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-sm">
                <h3 className="text-xl font-bold text-red-700 flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                  </div>
                  {t.scamAlert}
                </h3>
                <p className="text-base mb-4 text-red-900 leading-relaxed">
                  <strong>{priceData.scamAlert.reports}</strong> {t.scamAlertMessage.replace("{{vehicle}}", vehicleType).replace("{{price}}", priceData.expectedPrice.toString())}
                </p>
                <div className="text-sm font-bold px-4 py-2 bg-red-100 text-red-800 rounded-xl inline-flex items-center gap-2">
                  {t.scamTip}
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-5">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 sticky top-32">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                  VP 3: {t.vp3Badge}
                </span>
                <h2 className="text-3xl font-extrabold flex items-center gap-3 text-slate-900">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  {t.safetyGuard}
                </h2>
                <p className="text-slate-600 mt-3 text-base leading-relaxed italic">
                  {t.safetyGuardDesc}
                </p>
              </div>
              
              <div className="space-y-4">
                <button onClick={handlePolice} className="w-full text-left transition-transform hover:-translate-y-1">
                  <div className="group flex items-center p-5 rounded-2xl bg-blue-50 border-2 border-blue-100 shadow-sm">
                    <div className="p-4 bg-blue-600 text-white rounded-xl shadow-md"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
                    <div className="ml-5 flex-1">
                      <h3 className="font-extrabold text-lg text-blue-950">{t.touristPolice}</h3>
                      <p className="text-sm font-bold text-blue-700 mt-1">{t.policeHotline}</p>
                    </div>
                  </div>
                </button>

                <button onClick={handleSOS} className="w-full text-left transition-transform hover:-translate-y-1">
                  <div className="group flex items-center p-5 rounded-2xl bg-rose-50 border-2 border-rose-100 shadow-sm">
                    <div className="p-4 bg-rose-600 text-white rounded-xl shadow-md"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>
                    <div className="ml-5 flex-1">
                      <h3 className="font-extrabold text-lg text-rose-950">{t.sosEmergency}</h3>
                      <p className="text-sm font-bold text-rose-700 mt-1">{t.shareLocation}</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}