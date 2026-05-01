"use client";

import { Button } from "@/components/ui/button";
import { useDictionary } from "@/i18n/DictionaryContext";

export default function AIRoutePlanner() {
  const { dict } = useDictionary();
  const itinerary = [
    {
      day: 1,
      title: "Cultural Immersion",
      items: [
        { time: "09:00 AM", title: "Wat Phra That Doi Suthep", desc: "Start early to avoid crowds. Take the funicular up to see the golden pagoda.", image: "https://images.unsplash.com/photo-1574360721200-d86cc841d13f?q=80&w=1000&auto=format&fit=crop" },
        { time: "12:30 PM", title: "Khao Soi Khun Yai", desc: "Lunch at this legendary unseen spot. Hidden behind a temple, famous for rich curry noodles.", image: "https://images.unsplash.com/photo-1626804475297-41609ea004eb?q=80&w=1000&auto=format&fit=crop" },
        { time: "15:00 PM", title: "Baan Kang Wat", desc: "An artisan village with craft shops and cozy cafes hidden in nature.", image: "https://images.unsplash.com/photo-1603512882194-d106603de801?q=80&w=1000&auto=format&fit=crop" },
      ]
    },
    {
      day: 2,
      title: "Nature & Adventure",
      items: [
        { time: "08:00 AM", title: "Doi Inthanon National Park", desc: "Drive up to the highest peak in Thailand. The air is crisp and the views are unmatched.", image: "https://images.unsplash.com/photo-1582239634994-5cb0f90c4fb6?q=80&w=1000&auto=format&fit=crop" },
        { time: "14:00 PM", title: "Wachirathan Waterfall", desc: "A powerful and stunning waterfall. You can feel the mist from the viewing deck.", image: "https://images.unsplash.com/photo-1601662528567-526cd06f6582?q=80&w=1000&auto=format&fit=crop" },
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pt-32 pb-20 px-4 md:px-6 container mx-auto max-w-7xl animate-fade-in-up">
        <div className="mb-8 flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 font-heading">{dict.pages.aiRoute.title}</h1>
            <p className="text-xl text-muted-foreground">{dict.pages.aiRoute.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="hover:bg-primary/10">{dict.pages.aiRoute.editBtn}</Button>
            <Button className="shadow-lg hover:scale-105 transition-transform">{dict.pages.aiRoute.saveBtn}</Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Timeline Section */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass p-6 rounded-2xl border border-border">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
                <h2 className="text-2xl font-bold">3 Days in Chiang Mai</h2>
                <div className="flex items-center gap-2 text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full animate-float">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                  98% Match to "Adventure & Foodie"
                </div>
              </div>

              <div className="space-y-10 pl-2">
                {itinerary.map((day, dayIndex) => (
                  <div key={day.day} className={`relative animate-fade-in-up opacity-0 delay-${(dayIndex + 1) * 100}`}>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm shadow-md">
                        {day.day}
                      </span>
                      Day {day.day}: {day.title}
                    </h3>
                    
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-border before:to-transparent">
                      {day.items.map((item, idx) => (
                        <div key={idx} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
                          {/* Marker */}
                          <div className="absolute left-0 md:left-1/2 -translate-x-[15px] md:-translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full border-4 border-background bg-accent shadow mt-1.5 z-10 group-hover:scale-125 transition-transform duration-300"></div>
                          
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] ml-12 md:ml-0 glass p-4 rounded-xl border border-border/50 group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/50">
                            <span className="text-primary font-bold text-sm block mb-1">{item.time}</span>
                            <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                            <div className="w-full h-40 rounded-lg overflow-hidden mb-3 relative bg-muted">
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" onError={(e) => e.currentTarget.src = "https://picsum.photos/400/300?random=" + idx} />
                              <div className="absolute top-2 right-2 bg-background/80 backdrop-blur px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                4.8
                              </div>
                            </div>
                            <p className="text-muted-foreground text-sm">{item.desc}</p>
                            
                            <div className="mt-4 flex gap-2">
                              <Button variant="outline" size="sm" className="h-8 text-xs hover:bg-primary/10">View Details</Button>
                              <Button variant="ghost" size="sm" className="h-8 text-xs text-primary hover:text-primary/80 group-hover:underline">Find Local Guide Here</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Map Section */}
          <div className="lg:col-span-5 h-[600px] lg:h-auto lg:sticky lg:top-24 animate-fade-in-up opacity-0 delay-300">
            <div className="glass p-2 rounded-2xl border border-border h-full flex flex-col relative overflow-hidden group shadow-md hover:shadow-xl transition-all duration-500">
              <div className="absolute top-6 left-6 z-10 bg-background/90 backdrop-blur shadow-lg rounded-xl p-3 border border-border transition-transform group-hover:scale-105">
                <h3 className="font-bold text-sm mb-1 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  Interactive Map
                </h3>
                <p className="text-xs text-muted-foreground">View your route visually</p>
              </div>
              
              {/* Fake Map Image simulating an API like Google Maps/Mapbox */}
              <div className="flex-1 rounded-xl overflow-hidden relative bg-muted">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" alt="Map View" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" loading="lazy" onError={(e) => e.currentTarget.src = "https://picsum.photos/1000/1000?blur=2"} />
                
                {/* Overlay lines and pins to make it look like a route map */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                     <path d="M 20,30 Q 40,10 60,40 T 80,70" fill="none" stroke="var(--primary)" strokeWidth="0.5" strokeDasharray="1 1" className="opacity-70 group-hover:stroke-secondary transition-colors" />
                  </svg>
                  
                  {/* Pin 1 */}
                  <div className="absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-full transition-transform group-hover:-translate-y-[120%] duration-300">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs shadow-lg relative z-20 border-2 border-white">1</div>
                    <div className="w-3 h-3 bg-primary rounded-full absolute -bottom-1 left-1/2 -translate-x-1/2 animate-ping opacity-75"></div>
                  </div>
                  
                  {/* Pin 2 */}
                  <div className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-full transition-transform group-hover:-translate-y-[120%] duration-300 delay-100">
                    <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold text-xs shadow-lg relative z-20 border-2 border-white">2</div>
                  </div>
                  
                  {/* Pin 3 */}
                  <div className="absolute top-[70%] left-[80%] -translate-x-1/2 -translate-y-full transition-transform group-hover:-translate-y-[120%] duration-300 delay-200">
                    <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-xs shadow-lg relative z-20 border-2 border-white">3</div>
                  </div>
                </div>

                {/* Map actions */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                  <Button size="icon" variant="secondary" className="rounded-full shadow-lg h-10 w-10 hover:bg-white text-black hover:scale-110 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full shadow-lg h-10 w-10 hover:bg-white text-black hover:scale-110 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
