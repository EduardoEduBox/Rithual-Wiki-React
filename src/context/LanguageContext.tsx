import React, { createContext, useState, ReactNode, useEffect } from "react";
import i18n from "../il8n";

interface LanguageContextProps {
  language: string;
  changeLanguage: (lng: string) => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
  language: "pt",
  changeLanguage: () => {},
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>(i18n.language || "pt");

  useEffect(() => {
    const initLanguage = async () => {
      if (!i18n.language) {
        await i18n.changeLanguage("pt");
      }
      setLanguage(i18n.language);
    };
    initLanguage();
  }, []);

  const changeLanguage = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
      setLanguage(lng);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
