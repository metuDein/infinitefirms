"use client";
// context/LanguageContext.js
import { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, setCurrentLanguage, isTranslating, setIsTranslating }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}