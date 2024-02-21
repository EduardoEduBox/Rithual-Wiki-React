import React, { useState, useEffect } from "react";
import Navbar from "./components/NavBar";
import Header from "./components/Header";
import CharacterSection from "./components/CharacterSection";
import Footer from "./components/Footer";
import ChapterSection from "./components/ChapterSection";
import Loading from "./Loading";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 5000);
  // }, []);

  return (
    <>
      <Loading loading={loading} />

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
