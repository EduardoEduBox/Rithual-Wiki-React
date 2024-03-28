import React from "react";
import Navbar from "./components/NavBar";
import Header from "./components/Header";
import CharacterSection from "./components/CharacterSection";
import Footer from "./components/Footer";
import ChapterSection from "./components/ChapterSection";
import Loading from "./Loading";

const App: React.FC = () => {
  return (
    <>
      {/* <Loading /> */}

      <Navbar />
      <Header />
      <CharacterSection />
      <ChapterSection />
      <Footer />
      <div className="flex items-end justify-center h-screen pb-16 opacity-20">
        Nada aqui ainda, amigo...
      </div>
    </>
  );
};

export default App;
