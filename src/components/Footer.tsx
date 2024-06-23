import React from "react";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="fixed bottom-0 z-50 flex items-center justify-center w-full h-8 pb-3 text-lg lg:text-2xl text-shadow-darker bg-gradient-to-b from-transparent to-gray-950">
      <p>
        <strong className="text-pink-300 text-glow-pink">(૨¡Ƭષαℓ</strong>,{" "}
        {t("footerText")}
        <a href="https://www.instagram.com/eduardo_barbosa_pyke/"> EduBox</a>.
      </p>
    </footer>
  );
};

export default Footer;
