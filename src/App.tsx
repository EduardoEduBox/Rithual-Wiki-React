import React from "react";
import Navbar from "./components/NavBar";
import Header from "./components/Header";
import CharacterSection from "./components/CharacterSection";
import Footer from "./components/Footer";
import ChapterSection from "./components/ChapterSection";
import Loading from "./Loading";
import { useTranslation } from "react-i18next";

const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Loading />

      <Navbar />
      <Header />
      <CharacterSection />
      <ChapterSection />
      <Footer />
      <div className="flex items-end justify-center h-screen pb-16 opacity-20">
        {t("nothingText")}
      </div>
    </>
  );
};

export default App;
