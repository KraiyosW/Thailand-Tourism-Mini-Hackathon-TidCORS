"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Icons
const TouristIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2v20"/><path d="M9.5 2v20"/><path d="M22 9.5H2"/><path d="M22 14.5H2"/></svg>
);
const GuideIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const BusinessIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
const DriverIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="2"/><path d="m12 10 3 5h-6l3-5z"/><path d="m12 14 3-5h-6l3 5z"/></svg>
);

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [role, setRole] = useState<string>("tourist");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login/register
    router.push("/");
  };

  const roles = [
    { id: "tourist", label: "Tourist", icon: <TouristIcon />, desc: "Find hidden gems" },
    { id: "guide", label: "Local Guide", icon: <GuideIcon />, desc: "Share your wisdom" },
    { id: "entrepreneur", label: "Business", icon: <BusinessIcon />, desc: "Grow your shop" },
    { id: "driver", label: "Driver", icon: <DriverIcon />, desc: "Help people travel" },
  ];

  return (
    <div className="min-h-screen w-full flex bg-background overflow-hidden">
      {/* Left Side: Stunning Visuals */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2070&auto=format&fit=crop" 
            alt="Thailand Travel" 
            className="w-full h-full object-cover animate-in fade-in duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-primary/30 to-black/80" />
        </div>
        
        <div className="relative z-10 p-16 pt-32 flex flex-col justify-between h-full text-white">
          <Link href="/" className="flex items-center gap-2 group animate-fade-in-up opacity-0">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover rounded-2xl" />
            </div>
            <span className="font-bold text-2xl tracking-tight">Thai Unseen</span>
          </Link>

          <div className="space-y-6">
            <h1 className="text-6xl font-extrabold leading-tight animate-fade-in-up opacity-0 delay-100">
              Empowering <br />
              <span className="text-secondary drop-shadow-lg">Local Communities</span>
            </h1>
            <p className="text-xl text-white/80 max-w-lg leading-relaxed animate-fade-in-up opacity-0 delay-200">
              Join our platform to discover Thailand&apos;s best-kept secrets, or share your local expertise with travelers from around the world.
            </p>
          </div>

          <div className="flex items-center gap-8 animate-fade-in-up opacity-0 delay-300">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-primary bg-muted overflow-hidden hover:translate-y-[-4px] transition-transform duration-300 cursor-pointer">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium">Joined by 10k+ travelers & locals</p>
          </div>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 pt-32 md:p-16 md:pt-40 overflow-y-auto no-scrollbar">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left animate-fade-in-up opacity-0">
            <h2 className="text-4xl font-extrabold tracking-tight mb-2">
              {mode === "login" ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-muted-foreground text-lg">
              {mode === "login" 
                ? "Sign in to continue your journey" 
                : "Join the community of local explorers"}
            </p>
          </div>

          <div className="flex p-1.5 bg-muted rounded-2xl mb-8 animate-fade-in-up opacity-0 delay-100">
            <button
              onClick={() => setMode("login")}
              className={cn(
                "flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300",
                mode === "login" ? "bg-background shadow-lg text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Login
            </button>
            <button
              onClick={() => setMode("register")}
              className={cn(
                "flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300",
                mode === "register" ? "bg-background shadow-lg text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} key={mode} className="space-y-6 animate-fade-in-up opacity-0 delay-200">
            {mode === "register" && (
              <div className="space-y-4">
                <Label className="text-base">I am a...</Label>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={cn(
                        "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 group relative overflow-hidden",
                        role === r.id 
                          ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/20" 
                          : "border-border hover:border-primary/50 text-muted-foreground hover:bg-muted/50"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-all duration-300",
                        role === r.id ? "bg-primary text-white scale-110 rotate-3" : "bg-muted group-hover:bg-primary/10 group-hover:rotate-3"
                      )}>
                        {r.icon}
                      </div>
                      <span className="font-bold text-xs tracking-wide">{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-5">
              {mode === "register" && (
                <div className="space-y-2 group">
                  <Label htmlFor="fullname" className="group-focus-within:text-primary transition-colors">Full Name</Label>
                  <Input id="fullname" placeholder="John Doe" className="h-12 rounded-xl focus:ring-primary/20 transition-all" />
                </div>
              )}
              <div className="space-y-2 group">
                <Label htmlFor="email" className="group-focus-within:text-primary transition-colors">Email address</Label>
                <Input id="email" type="email" placeholder="name@example.com" className="h-12 rounded-xl focus:ring-primary/20 transition-all" />
              </div>
              <div className="space-y-2 group">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="group-focus-within:text-primary transition-colors">Password</Label>
                  {mode === "login" && (
                    <Link href="#" className="text-xs font-bold text-primary hover:underline">
                      Forgot password?
                    </Link>
                  )}
                </div>
                <Input id="password" type="password" className="h-12 rounded-xl focus:ring-primary/20 transition-all" />
              </div>
            </div>

            <Button type="submit" className="w-full h-14 rounded-2xl text-lg font-extrabold shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300">
              {mode === "login" ? "Sign In" : "Get Started"}
            </Button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                <span className="bg-background px-4 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-12 rounded-xl flex items-center gap-2 hover:bg-muted transition-all duration-300 font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12h6"/><path d="M12 9v6"/></svg>
                Google
              </Button>
              <Button variant="outline" className="h-12 rounded-xl flex items-center gap-2 hover:bg-muted transition-all duration-300 font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 1.44S8.22 5 6 5a4.91 4.91 0 0 0-5 4.78c0 4.22 3 12.22 6 12.22 1.25 0 2.5-1.06 4-1.06Z"/><path d="M17 2c.5 1.5-1 3.5-3 3.5S12.5 4 13 2.5 14.5 2 17 2Z"/></svg>
                Apple
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground animate-fade-in-up opacity-0 delay-300">
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
