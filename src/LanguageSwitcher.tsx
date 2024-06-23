import React, { useContext, useRef, useEffect } from "react";
import { LanguageContext } from "./context/LanguageContext";
import gsap from "gsap";

const LanguageSwitcher: React.FC = () => {
  const { language, changeLanguage } = useContext(LanguageContext);
  const usRef = useRef<HTMLButtonElement>(null);
  const brRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    if (isMobile) {
      console.log("Mobile screen detected, not running GSAP animations.");
      return;
    }

    const activeButton = language === "en" ? usRef.current : brRef.current;
    const inactiveButton = language === "en" ? brRef.current : usRef.current;

    if (activeButton && inactiveButton) {
      gsap.to(activeButton, { backgroundColor: "#de70a1", duration: 0.5 });
    }
  }, [language]);

  const handleLanguageChange = (lng: string) => {
    console.log("Changing language to:", lng);
    changeLanguage(lng);
  };

  return (
    <div className="flex items-center justify-center h-full gap-2 px-1 py-1 bg-pink-800 rounded-full lg:px-5 lg:gap-5 bg-opacity-80">
      <button
        ref={usRef}
        onClick={() => handleLanguageChange("en")}
        className="p-1 rounded-full"
        style={{ backgroundColor: language === "en" ? "#de70a1" : undefined }}
      >
        <img
          src="/Icons/flagIcons/usIcon.png"
          alt="English"
          className="w-7 h-7"
        />
      </button>
      <button
        ref={brRef}
        onClick={() => handleLanguageChange("pt")}
        className="p-1 rounded-full"
        style={{ backgroundColor: language === "pt" ? "#de70a1" : undefined }}
      >
        <img
          src="/Icons/flagIcons/brazilIcon.png"
          alt="Portuguese"
          className="w-7 h-7"
        />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
