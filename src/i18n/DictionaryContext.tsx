"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { en, Dictionary } from "./en";
import { th } from "./th";

type Language = "en" | "th";

interface DictionaryContextType {
  lang: Language;
  dict: Dictionary;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const DictionaryContext = createContext<DictionaryContextType | undefined>(undefined);

export function DictionaryProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("th"); // Default to Thai

  const dict = lang === "en" ? en : th;

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "th" : "en"));
  };

  return (
    <DictionaryContext.Provider value={{ lang, dict, setLang, toggleLang }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const context = useContext(DictionaryContext);
  if (context === undefined) {
    throw new Error("useDictionary must be used within a DictionaryProvider");
  }
  return context;
}
