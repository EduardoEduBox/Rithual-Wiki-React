import React, { useState, useEffect } from "react";

const Header: React.FC = () => {
  class allImages {
    bgImage: string;
    ballColor: string;
    bgCharacter: string;
    constructor(bgImage: string, ballColor: string, bgCharacter: string) {
      this.bgImage = bgImage;
      this.ballColor = ballColor;
      this.bgCharacter = bgCharacter;
    }
  }

  const bgImages: allImages[] = [
    new allImages(
      "/Header/backgroundPics/backgroundHeader.png",
      "bg-[#ff0000]",
      "/Header/characters/demonio_cap_0_site_prototipo.png"
    ),
    new allImages(
      "/Header/backgroundPics/backgroundHeader3.png",
      "bg-[#5aceff]",
      "/Header/characters/singer_cap_3_site_prototipo.png"
    ),
    new allImages(
      "/Header/backgroundPics/backgroundHeader2.png",
      "bg-[#9400d3]",
      "/Header/characters/málanus_cap_2_site_prototipo.png"
    ),
  ];

  const parasite: allImages = new allImages(
    "/Header/backgroundPics/tortura.png",
    "bg-[#ff0000]",
    "/Header/characters/iseeyou.png"
  );

  // Use a single state to control the current image index

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isParasiteActive, setIsParasiteActive] = useState(false);
  const [checker, setChecker] = useState(false);

  // Preload images (consider doing this outside of the component or in useEffect if images are static)
  useEffect(() => {
    const preloadImages = () => {
      bgImages.forEach((img) => {
        const image = new Image();
        image.src = img.bgImage;
      });
      const parasiteImage = new Image();
      parasiteImage.src = parasite.bgImage;
    };

    preloadImages();
  }, []);

  useEffect(() => {
    // Change image every 9700ms
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 9700);

    // Activate parasite after 30 seconds
    setTimeout(() => {
      setChecker(true);
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (checker) {
      // Random chance to activate parasite
      const shouldActivateParasite = Math.random() < 0.1; // Adjust probability as needed
      if (shouldActivateParasite) {
        setIsParasiteActive(true);

        // Deactivate parasite after a short time
        setTimeout(() => {
          setIsParasiteActive(false);
        }, 250); // Adjust timing as needed
      }
    }
  }, [currentImageIndex, checker]);

  // function that returns text HAHAHA but it grows with time, so it looks like it's laughing
  const [hahaText, setHahaText] = useState("HAHAHA");

  useEffect(() => {
    if (isParasiteActive) {
      let currentText = "HAHAHA";
      const intervalTime = window.innerWidth > 1024 ? 10 : 50;
      const intervalId = setInterval(() => {
        currentText += "HA";
        setHahaText(currentText);
      }, intervalTime);

      // Stop growing the text after a certain condition or time
      setTimeout(() => {
        clearInterval(intervalId);
      }, 250); // Example: stop growing after 1 second

      // Clean up the interval when the component is unmounted or the parasite is deactivated
      return () => clearInterval(intervalId);
    }
  }, [isParasiteActive]);

  return (
    <section
      className="relative flex items-center w-screen h-[100svh] overflow-hidden lg:pb-0"
      id="home"
    >
      <div
        className="absolute w-full h-full -z-10"
        style={{
          backgroundImage: `url(${
            isParasiteActive
              ? parasite.bgImage
              : bgImages[currentImageIndex].bgImage
          })`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          transition: "background-image 1s ease-in-out, opacity 1s ease-in-out",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-75"></div>
      </div>

      <div className="flex flex-col items-center justify-center h-full lg:w-3/5 lg:pr-52 lg:pl-16 lg:pb-5">
        <h1
          className={`text-4xl font-bold leading-[3rem] text-center mt-28 text-shadow-darker lg:text-6xl lg:leading-[5rem] lg:mt-36 ${
            isParasiteActive ? "text-red-600" : "text-pink-200"
          }`}
        >
          {isParasiteActive ? (
            "Eu vejo você"
          ) : (
            <>
              Bem vindos ao <br /> (૨¡Ƭષαℓ
            </>
          )}
        </h1>

        <div className="flex items-center justify-center h-full px-5">
          <p
            className={`p-5 text-lg leading-6 text-center bg-black bg-opacity-50 rounded-2xl lg:text-2xl
            ${isParasiteActive && "font-ancestral"}
          `}
          >
            {isParasiteActive ? (
              <>
                "e todos eles ergueram suas cabeças ao céu com um olhar
                explícito de terror, temendo o que encontrariam em seus futuros.
                Repentinamente, a escuridão da morte os consumiu em seu abraço
                cruel."
              </>
            ) : (
              <>
                <span className="mr-1 font-bold">(૨¡Ƭષαℓ</span>é um mangá
                brasileiro sobre um mundo que presencia conflitos sangrentos
                entre humanos e demônios que disputam influência sobre a
                sociedade. Nesta história, você irá acompanhar a vida de
                <strong className="ml-1 text-blue-300 text-glow-blue">
                  Singer
                </strong>
                , um garoto tímido e bastante sorridente que está descobrindo o
                mundo pela primeira vez ao lado de seus amigos{" "}
                <strong className="ml-1 text-pink-300 text-glow-pink">
                  Aika
                </strong>
                ,
                <strong className="ml-1 text-orange-300 text-glow-orange">
                  San
                </strong>{" "}
                e
                <strong className="ml-1 text-green-300 text-glow-green">
                  Madger
                </strong>
                .
              </>
            )}
          </p>
        </div>
        <h1
          className={`text-2xl font-bold text-center ${
            isParasiteActive ? "text-red-600" : "text-pink-200"
          } text-shadow-darker`}
        >
          {isParasiteActive ? hahaText : " Conheça mais esse universo!"}
        </h1>
        <a href="#chapterSection">
          <button
            className="mb-16 px-16 py-6 hover:text-2xl mt-5 text-xl relative font-medium transition-all duration-300 ease-in-out bg-black bg-opacity-50 rounded-md hover:bg-pink-600 hover:drop-shadow-[0_0_15px_#ff009d]"
            style={{
              boxShadow: "inset 0 0 0 0 #ff009d",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "inset 400px 0 0 0 #ff009d";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "inset 0 0 0 0 #ff009d";
            }}
          >
            <span
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${
                isParasiteActive ? "text-red-600" : ""
              }`}
            >
              {isParasiteActive ? "SOFRA" : "Capítulos"}
            </span>
          </button>
        </a>
      </div>

      <div className="relative hidden w-2/5 lg:h-full lg:block">
        <div
          className={`border absolute w-[500vw] 
          ${
            isParasiteActive
              ? parasite.ballColor
              : bgImages[currentImageIndex].ballColor
          } 
          
           h-screen rounded-[100vh_0%_0%] blur-[1.5vh] opacity-65 overflow-x-hidden z-30 top-[30vh] bottom-0 left-[-20vh] transition-all duration-500`}
        ></div>
        <img
          src={
            isParasiteActive
              ? parasite.bgCharacter
              : bgImages[currentImageIndex].bgCharacter
          }
          alt="character image"
          className="absolute h-[128vh] w-auto z-40 top-0 right-0 transition-opacity duration-400 max-w-fit"
          style={{
            transition: "src 1s ease-in-out, opacity 1s ease-in-out",
          }}
        />
      </div>
    </section>
  );
};

export default Header;
