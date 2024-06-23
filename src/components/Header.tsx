import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { t } = useTranslation();

  const bgImages = [
    {
      bgImage: "/Header/backgroundPics/backgroundHeader.png",
      ballColor: "bg-[#ff0000]",
      bgCharacter: "/Header/characters/demonio_cap_0_site_prototipo.png",
    },
    {
      bgImage: "/Header/backgroundPics/backgroundHeader3.png",
      ballColor: "bg-[#5aceff]",
      bgCharacter: "/Header/characters/singer_cap_3_site_prototipo.png",
    },
    {
      bgImage: "/Header/backgroundPics/backgroundHeader2.png",
      ballColor: "bg-[#9400d3]",
      bgCharacter: "/Header/characters/málanus_cap_2_site_prototipo.png",
    },
  ];

  const parasite = {
    bgImage: "/Header/backgroundPics/tortura.png",
    ballColor: "bg-[#ff0000]",
    bgCharacter: "/Header/characters/iseeyou.png",
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isParasiteActive, setIsParasiteActive] = useState(false);
  const [checker, setChecker] = useState(false);
  const [hahaText, setHahaText] = useState("HAHAHA");

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
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 9700);

    setTimeout(() => {
      setChecker(true);
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (checker) {
      const shouldActivateParasite = Math.random() < 0.1;
      if (shouldActivateParasite) {
        setIsParasiteActive(true);

        setTimeout(() => {
          setIsParasiteActive(false);
        }, 250);
      }
    }
  }, [currentImageIndex, checker]);

  useEffect(() => {
    if (isParasiteActive) {
      let currentText = "HAHAHA";
      const intervalTime = window.innerWidth > 1024 ? 10 : 50;
      const intervalId = setInterval(() => {
        currentText += "HA";
        setHahaText(currentText);
      }, intervalTime);

      setTimeout(() => {
        clearInterval(intervalId);
      }, 250);

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
        {isParasiteActive ? (
          <h1 className="text-6xl font-bold text-center text-red-600 text-shadow-darker">
            {t("parasiteTitle")}
          </h1>
        ) : (
          <h1
            className={`text-4xl font-bold leading-[3rem] text-center mt-28 text-shadow-darker lg:text-6xl lg:leading-[5rem] lg:mt-36 text-pink-200`}
            dangerouslySetInnerHTML={{ __html: t("welcomeText") }}
          />
        )}

        <div className="flex items-center justify-center h-full px-5">
          <p
            className={`p-5 text-lg leading-6 text-center bg-black bg-opacity-50 rounded-2xl lg:text-2xl ${
              isParasiteActive && "font-ancestral"
            }`}
            dangerouslySetInnerHTML={{
              __html: isParasiteActive
                ? t("parasiteText")
                : t("headerDescription"),
            }}
          />
        </div>
        <h1
          className={`text-2xl font-bold text-center ${
            isParasiteActive ? "text-red-600" : "text-pink-200"
          } text-shadow-darker`}
        >
          {isParasiteActive ? hahaText : t("headerKnowMoreButton")}
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
              {isParasiteActive ? t("parasiteButton") : t("headerButton")}
            </span>
          </button>
        </a>
      </div>

      <div className="relative hidden w-2/5 lg:h-full lg:block">
        <div
          className={`border absolute w-[500vw] ${
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
