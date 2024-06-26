import React from "react";
import Flickity from "react-flickity-component";
import { useState, useRef } from "react";
import { MdClose } from "react-icons/md";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";

const CharacterSection: React.FC = () => {
  class Characters {
    id: string;
    name: string;
    age: number;
    information: string;
    profile: string;
    withoutText: string;
    withText: string;
    colorTheme: string;
    appeared: boolean;
    height: string;

    constructor(
      id: string,
      name: string,
      age: number,
      information: string,
      profile: string,
      withoutText: string,
      withText: string,
      colorTheme: string,
      appeared: boolean,
      height: string
    ) {
      this.id = id;
      this.name = name;
      this.age = age;
      this.information = information;
      this.profile = profile;
      this.withoutText = withoutText;
      this.withText = withText;
      this.colorTheme = colorTheme;
      this.appeared = appeared;
      this.height = height;
    }

    preloadImages(): void {
      const imagesToPreload: string[] = [this.profile, this.withoutText];

      imagesToPreload.forEach((src) => {
        const img: HTMLImageElement = new Image();
        img.src = src;
      });
    }
  }

  const { t } = useTranslation();

  const characters: Characters[] = [
    new Characters(
      "characterSinger",
      "Singer Faksumi",
      17,
      t("singerDescription"),
      "/CharacterSection/profile/Singer Profile.png",
      "/CharacterSection/withoutText/Singer withoutText.png",
      "/CharacterSection/withText/Singer corpo completo.png",
      "lightblue",
      true,
      "lg:h-[100%]"
    ),
    new Characters(
      "characterAika",
      "Aika'nu Zumiki",
      19,
      t("noRegister"),
      "/CharacterSection/profile/Aika Profile.png",
      "/CharacterSection/withoutText/Aika withoutText.png",
      "/CharacterSection/withText/Aika corpo completo.png",
      "rgb(255, 223, 239)",
      false,
      "lg:h-[95%]"
    ),
    new Characters(
      "characterMadger",
      "Madger Yasáshi",
      17,
      t("madgerDescription"),
      "/CharacterSection/profile/Madger Profile.png",
      "/CharacterSection/withoutText/Madger withoutText.png",
      "/CharacterSection/withText/Madger corpo completo.png",
      "rgb(186, 235, 186)",
      true,
      "lg:h-[95%]"
    ),
    new Characters(
      "characterSan",
      "San Majutsu-shi",
      19,
      t("noRegister"),
      "/CharacterSection/profile/San Profile.png",
      "/CharacterSection/withoutText/San withoutText.png",
      "/CharacterSection/withText/San corpo completo.png",
      "rgb(255, 223, 164)",
      false,
      "lg:h-[99%]"
    ),
    new Characters(
      "characterMálanus",
      "Málanus Faksumi",
      25,
      t("málanusDescription"),
      "/CharacterSection/profile/Málanus Profile.png",
      "/CharacterSection/withoutText/Málanus withoutText.png",
      "/CharacterSection/withText/Málanus corpo completo.png",
      "rgb(255, 164, 164)",
      true,
      "lg:h-[100%]"
    ),

    // Add more characters here...
  ];

  const [isCharacterActive, setIsCharacterActive] = useState(false);
  const [waitForAnimation, setWaitForAnimation] = useState(false);
  const [indexOfCharacterClicked, setIndexOfCharacterClicked] = useState(0);

  const carouselRef = useRef(null);

  const characterInformationRef = useRef(null);
  const characterInformationRef2 = useRef(null);
  const sideWaysTextRef = useRef(null);
  const characterRef = useRef(null);

  const characterInformationDesktopRef = useRef(null);
  const characterDesktopRef = useRef(null);
  const sideWaysTextDesktopRef = useRef(null);
  const ageTextDesktopRef = useRef(null);
  const informationTextDesktopRef = useRef(null);

  // variable to track if the size of the screen is dekstop or mobile
  const isDekstop = window.innerWidth > 1024;

  let flickityOptions;
  if (isDekstop) {
    flickityOptions = {
      groupCells: 4, // Enable page dots
      draggable: false,
    };
  } else {
    flickityOptions = {
      pageDots: true, // Enable page dots
      initialIndex: indexOfCharacterClicked,
      wrapAround: true,
      prevNextButtons: false,
    };
  }

  const handleCharacterClick = (index: number) => {
    if (waitForAnimation) return;

    setWaitForAnimation(true);
    setIndexOfCharacterClicked(index);

    if (isDekstop) {
      // setIsCharacterActive(true);
      gsap.to(carouselRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setIsCharacterActive(true);

          gsap.fromTo(
            characterInformationDesktopRef.current,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.5,
            }
          );

          gsap.fromTo(
            sideWaysTextDesktopRef.current,
            {
              x: -200,
            },
            {
              x: 0,
              duration: 0.5,
            }
          );

          gsap.fromTo(
            characterDesktopRef.current,
            {
              scale: 0.6,
              x: 200,
            },
            {
              x: 0,
              scale: 1,
              duration: 0.5,
            }
          );

          gsap.fromTo(
            [ageTextDesktopRef.current, informationTextDesktopRef.current],
            {
              opacity: 0,
              y: -50,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power4.out", // Animation starts fast and then slows down
            }
          );
        },
      });
    } else {
      // Start the fade-out animation
      gsap.to(carouselRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          // After the fade-out completes, update the state to show new content
          setIsCharacterActive(true);

          // Animate the character information containers
          gsap.fromTo(
            characterInformationRef.current,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.5,
              onComplete: () => {
                // Animate the character information and profile pic
                gsap.fromTo(
                  characterInformationRef2.current,
                  {
                    opacity: 0,
                  },
                  {
                    opacity: 1,
                    duration: 0.8,
                  }
                );
              },
            }
          );

          // Animate the sideways text
          gsap.fromTo(
            sideWaysTextRef.current,
            {
              x: -100,
            },
            {
              x: 0,
              duration: 0.5,
            }
          );

          // Animate the character image
          gsap.fromTo(
            characterRef.current,
            {
              scale: 0.8,
              x: 100,
            },
            {
              x: 0,
              scale: 1,
              duration: 0.5,
            }
          );
        },
      });
    }
  };

  const handleCloseButtonClick = () => {
    if (!waitForAnimation) return;

    setWaitForAnimation(false);

    gsap.to(
      [
        characterInformationRef.current,
        characterInformationRef2.current,
        characterInformationDesktopRef.current,
      ],
      {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setIsCharacterActive(false);
          gsap.to(carouselRef.current, {
            opacity: 1,
            duration: 0.5,
          });
        },
      }
    );
  };

  const calculateNumberOfCharactersToFixCarousel = () => {
    // calculate the number of items in the carousel to put invisible divs to fill the space so the carousel can work properly withouth breaking the layout

    const numberOfCharacters = characters.length;
    let numberOfInvisibleDivs = 0;

    if (numberOfCharacters % 4 === 0) {
      numberOfInvisibleDivs = 0;
    } else if (numberOfCharacters % 4 === 1) {
      numberOfInvisibleDivs = 3;
    } else if (numberOfCharacters % 4 === 2) {
      numberOfInvisibleDivs = 2;
    } else if (numberOfCharacters % 4 === 3) {
      numberOfInvisibleDivs = 1;
    }

    return numberOfInvisibleDivs;
  };

  return (
    <>
      {/* background div for desktop version */}
      {/* i know this is a bad solution, but i am sick of trying to do this work >:( */}
      <div
        className={`transition-all top-[150svh] border duration-500 absolute w-screen h-[52vh] after:h-[52vh]  bg-white opacity-15 bottom-[10%]
        -z-10 after:content-[''] after:transition-all after:duration-500 after:absolute  after:w-full after:bg-[#1c1c1c]  " ${
          !isDekstop ? "hidden" : ""
        }
        ${
          isCharacterActive
            ? "skew-y-[-3deg] h-[62vh] after:skew-y-[7deg] after:bottom-[-50%] top-[152svh]"
            : "after:skew-y-[-9deg] skew-y-6 after:bottom-[-60%]"
        }
        `}
      />

      <section className="relative" id="characterSection">
        <div className="relative flex items-center justify-center w-full mt-2 h-36 lg:h-52 lg:mb-5 lg:items-end">
          <h1 className="text-3xl font-bold text-pink-200 lg:text-8xl">
            {t("characters")}
          </h1>
          <strong className="absolute text-6xl lg:text-[9vw] text-customBlack -z-10 opacity-15 transform -translate-x-1/2 -translate-y-1/2 top-1/2 lg:bottom-14 left-1/2 text-shadow-pinkGlow lg:text-shadow-pinkGlowDekstop">
            {t("characters")}
          </strong>
        </div>

        {/* information containers for mobile version */}
        <div
          className={`relative flex flex-col items-center justify-center w-full lg:hidden ${
            !isCharacterActive ? "hidden" : ""
          }`}
          ref={characterInformationRef}
        >
          <h1
            className="absolute font-bold left-3 vertical-rl text-7xl -z-10"
            ref={sideWaysTextRef}
            style={{
              color: characters[indexOfCharacterClicked].colorTheme,
            }}
          >
            {characters[indexOfCharacterClicked].name}
          </h1>
          <img
            src={characters[indexOfCharacterClicked].withoutText}
            alt={characters[indexOfCharacterClicked].name}
            ref={characterRef}
          />
          <div className="absolute flex flex-col justify-center right-5 top-5">
            <MdClose
              className="text-black scale-y-50 text-7xl"
              onClick={() => handleCloseButtonClick()}
            />
            <strong>
              {t("ageOfCharacter")}:{" "}
              {characters[indexOfCharacterClicked].appeared ? (
                <span
                  style={{
                    color: characters[indexOfCharacterClicked].colorTheme,
                  }}
                >
                  {characters[indexOfCharacterClicked].age}
                </span>
              ) : (
                <span className="opacity-50">?</span>
              )}
            </strong>
          </div>
        </div>
        <div
          className={`flex w-full lg:hidden ${
            !isCharacterActive ? "hidden" : "opacity-0"
          }`}
          ref={characterInformationRef2}
        >
          <img
            className="w-1/3 rounded-full"
            src={characters[indexOfCharacterClicked].profile}
            alt={`${characters[indexOfCharacterClicked].name} profile picture`}
          />
          <div className="flex items-center justify-center w-2/3 pr-5">
            <p
              className={`text-sm text-center ${
                !characters[indexOfCharacterClicked].appeared
                  ? "opacity-50"
                  : ""
              }`}
            >
              {characters[indexOfCharacterClicked].information}
            </p>
          </div>
        </div>

        {/* information container for desktop version */}
        <div
          className={`h-screen w-full flex-col relative items-center justify-center ${
            !isCharacterActive ? "hidden" : "flex"
          } ${!isDekstop ? "hidden" : ""}`}
          ref={characterInformationDesktopRef}
        >
          <img
            src={characters[indexOfCharacterClicked].profile}
            alt={`${characters[indexOfCharacterClicked].name} profile picture`}
            className="absolute left-12 top-0 h-[35vh] rounded-full"
          />
          <MdClose
            onClick={() => handleCloseButtonClick()}
            className="absolute text-black scale-y-50 top-20 right-28 text-9xl"
          />
          <img
            ref={characterDesktopRef}
            className="h-[90%]"
            src={characters[indexOfCharacterClicked].withoutText}
            alt={`${characters[indexOfCharacterClicked].name} background picture`}
          />
          <div className="flex flex-col bottom-[40%] absolute -z-10">
            <h1
              ref={sideWaysTextDesktopRef}
              className="font-bold text-[9vw] whitespace-nowrap"
              style={{
                color: characters[indexOfCharacterClicked].colorTheme,
              }}
            >
              {characters[indexOfCharacterClicked].name}
            </h1>
            <div className="flex w-full">
              <h1
                ref={ageTextDesktopRef}
                className="relative text-2xl font-bold -top-8"
              >
                {t("ageOfCharacter")}:{" "}
                {characters[indexOfCharacterClicked].appeared ? (
                  <span
                    style={{
                      color: characters[indexOfCharacterClicked].colorTheme,
                    }}
                  >
                    {characters[indexOfCharacterClicked].age}
                  </span>
                ) : (
                  <span className="opacity-50">?</span>
                )}
              </h1>
              <div className="relative ml-auto w-96">
                <p
                  ref={informationTextDesktopRef}
                  className="absolute text-xl font-semibold text-center -top-8"
                >
                  {characters[indexOfCharacterClicked].appeared ? (
                    characters[indexOfCharacterClicked].information
                  ) : (
                    <span className="opacity-50">{t("noRegister")}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={carouselRef}
          className={`${
            isCharacterActive ? "hidden" : ""
          } overflow-hidden lg:pl-8 lg:pr-16`}
        >
          <Flickity
            className={"carousel outline-none"}
            elementType={"div"}
            options={flickityOptions}
            disableImagesLoaded={false}
            reloadOnUpdate
            static
          >
            {characters.map((character: Characters, index) => {
              character.preloadImages();
              return (
                <div
                  className="w-screen lg:w-1/4 lg:h-[85vh] flex items-end"
                  key={character.name}
                >
                  <img
                    className={`lg:max-w-none ${character.height}`}
                    src={character.withText}
                    key={character.id} // use unique id for key instead of index if possible
                    onClick={() => {
                      handleCharacterClick(index);
                    }}
                  />
                </div>
              );
            })}

            {/* invisible divs to fix the carousel layout */}

            {isDekstop &&
              Array.from({
                length: calculateNumberOfCharactersToFixCarousel(),
              }).map((_) => {
                return (
                  <div className="w-screen lg:w-1/4 lg:h-[85vh] flex items-end">
                    <div className="w-full h-full"></div>
                  </div>
                );
              })}
          </Flickity>
        </div>
      </section>
    </>
  );
};

export default CharacterSection;
