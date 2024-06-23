import React, { useState, useEffect, useRef } from "react";
import Flickity from "react-flickity-component";
import gsap from "gsap";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

interface Chapter {
  id: number;
  title: string;
  shortTitle: string;
  cover: string;
  aditionalCover: string;
  description: string;
  url: string;
}

const ChapterSection: React.FC = () => {
  const { t, i18n } = useTranslation();

  // Language code mapping
  const languageCodeMapping: { [key: string]: string } = {
    "pt-BR": "pt",
    "en-US": "en",
  };

  // Get the mapped language code
  const getMappedLanguageCode = (language: string): string => {
    return languageCodeMapping[language] || language;
  };

  const getChapters = (): Chapter[] => {
    try {
      const mappedLanguage = getMappedLanguageCode(i18n.language);
      const key = `chapters_${mappedLanguage}`;
      const chapters = t(key, { returnObjects: true });

      if (Array.isArray(chapters)) {
        return chapters as Chapter[];
      } else {
        console.error("Chapters data is not an array:", chapters);
        return [];
      }
    } catch (error) {
      console.error("Error fetching chapters:", error);
      return [];
    }
  };

  const chapters: Chapter[] = getChapters();

  const preloadImages = (imageUrls: string[]): void => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  };

  useEffect(() => {
    preloadImages(chapters.map((chapter) => chapter.aditionalCover));
    preloadImages(chapters.map((chapter) => chapter.cover));
  }, [chapters]);

  const [selectedImage, setSelectedImage] = useState<undefined | number>(
    undefined
  );

  const [indexClicked, setIndexClicked] = useState<number>(0);

  useEffect(() => {
    setSelectedImage(undefined);
    setIndexClicked(0);
  }, [i18n.language]);

  const flickityOptions = {
    dragThreshold: 5,
    friction: 0.15,
    selectedAttraction: 0.01,
    initialIndex: indexClicked,
    pageDots: true,
    wrapAround: false,
    prevNextButtons: false,
  };

  const informationContainerRef = useRef<HTMLDivElement>(null);

  const handleImageClick = (index: number) => {
    if (selectedImage === undefined) {
      gsap.to(informationContainerRef.current, {
        opacity: 0,
        y: -50,
        ease: "power3.out",
        duration: 0.2,
        onComplete: () => {
          setSelectedImage(index);
          setIndexClicked(index);
          gsap.to(informationContainerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power3.out",
          });
        },
      });
    } else if (selectedImage !== undefined && selectedImage !== index) {
      gsap.to(informationContainerRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power3.out",
        onComplete: () => {
          setSelectedImage(index);
          setIndexClicked(index);
          gsap.to(informationContainerRef.current, {
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          });
        },
      });
    }
  };

  const handleCloseButton = () => {
    gsap.to(informationContainerRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power3.out",
      onComplete: () => {
        setSelectedImage(undefined);
      },
    });
  };

  const isDesktop = window.innerWidth > 1024;

  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (isDesktop) {
        carouselRef.current?.scrollBy(48, 0);
      }
    }, 1000);
  }, [isDesktop]);

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "rgba(0, 0, 0, 0.95)",
      maxWidth: 5000,
      border: "1px solid black",
      borderRadius: 10,
    },
  }));

  const titleRef = useRef<HTMLHeadingElement>(null);
  const backgroundTitleRef = useRef<HTMLHeadingElement>(null);

  return (
    <section
      key={i18n.language} // Use language as the key to force re-render
      className="flex flex-col items-center w-full"
      id="chapterSection"
    >
      {isDesktop ? (
        <>
          <div className="relative w-full py-10 mt-28 pl-28">
            {typeof selectedImage === "undefined" ? (
              <>
                <h1
                  ref={titleRef}
                  className="w-full font-bold text-pink-200 text-8xl"
                >
                  {t("chapterSectionTitle")}
                </h1>
                <strong
                  ref={backgroundTitleRef}
                  className="text-customBlack opacity-15 text-shadow-pinkGlowDekstop text-[9vw] absolute -top-7 left-12 -z-10"
                >
                  {t("chapterSectionTitle")}
                </strong>
              </>
            ) : (
              <>
                <h1 className="w-full font-bold text-pink-200 text-8xl">
                  {chapters[selectedImage]?.title}
                </h1>
                <strong className="text-customBlack opacity-15 text-shadow-pinkGlowDekstop text-[9vw] absolute -top-7 left-12 -z-10">
                  {chapters[selectedImage]?.shortTitle}
                </strong>
              </>
            )}
          </div>

          <div
            ref={carouselRef}
            className="relative flex py-5 pr-10 mr-auto overflow-x-auto -space-x-28"
          >
            {chapters.map((chapter) => (
              <a key={chapter.id} href={chapter.url} className="pl-40 shrink-0">
                <HtmlTooltip
                  enterDelay={500}
                  followCursor={true}
                  placement="right"
                  title={
                    <div className="flex p-3 rounded-md h-72">
                      <div>
                        <img
                          className="w-auto h-full rounded-lg"
                          src={chapter.aditionalCover}
                          alt={`Capa do capítulo ${chapter.title}`}
                        />
                      </div>
                      <div className="flex flex-col pt-3 items-center ml-5 text-center w-[340px]">
                        <h1 className="mb-3 text-2xl font-bold text-pink-200 whitespace-nowrap">
                          {chapter.title}
                        </h1>
                        <hr className="w-2/3 mb-3 opacity-50" />
                        <div className="flex items-center justify-center h-full px-6 pb-5">
                          <p className="text-[1.15rem] leading-6 description">
                            {chapter.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  }
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, 50],
                          },
                        },
                      ],
                    },
                  }}
                >
                  <img
                    className="w-auto h-[65vh] rounded-lg hover:-translate-y-5 transition duration-300"
                    src={chapter.cover}
                    alt={`Capa do capítulo ${chapter.title}`}
                    onMouseEnter={() => {
                      if (titleRef.current && backgroundTitleRef.current) {
                        titleRef.current.textContent = chapter.title;
                        backgroundTitleRef.current.textContent =
                          chapter.shortTitle;
                      }
                    }}
                    onMouseOut={() => {
                      if (titleRef.current && backgroundTitleRef.current) {
                        titleRef.current.textContent = t("chapterSectionTitle");
                        backgroundTitleRef.current.textContent = t(
                          "chapterSectionTitle"
                        );
                      }
                    }}
                  />
                </HtmlTooltip>
              </a>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="relative flex justify-center w-full mt-32">
            {typeof selectedImage === "undefined" ? (
              <>
                <h1 className="text-3xl font-bold text-pink-200">
                  {t("chapterSectionTitle")}
                </h1>{" "}
                <strong className="absolute text-6xl -bottom-3 text-shadow-pinkGlow text-customBlack opacity-15 -z-10">
                  {t("chapterSectionTitle")}
                </strong>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-pink-200">
                  {chapters[selectedImage]?.title}
                </h1>
                <strong className="absolute text-6xl -bottom-3 text-shadow-pinkGlow text-customBlack opacity-15 -z-10">
                  {chapters[selectedImage]?.shortTitle}
                </strong>
              </>
            )}
          </div>

          <div className="w-screen mt-10">
            <Flickity
              className={"flex flex-col gap-5 outline-none"}
              elementType={"div"}
              options={flickityOptions}
              disableImagesLoaded={false}
              reloadOnUpdate
              static
            >
              {chapters.map((chapter) => {
                return (
                  <div
                    className={`h-[50vh] w-fit`}
                    key={chapter.id}
                    onClick={() => handleImageClick(chapter.id)}
                  >
                    <img
                      className={`relative h-full ml-3 mr-3 transition duration-100 rounded-md ${
                        selectedImage === chapter.id ? "-translate-y-5" : ""
                      }`}
                      src={chapter.cover}
                      alt={`Capa do capítulo ${chapter.title}`}
                    />
                  </div>
                );
              })}
            </Flickity>
          </div>

          <div
            className={`flex flex-col items-center w-full mt-5 min-h-52 ${
              selectedImage == undefined ? "hidden" : ""
            }`}
            ref={informationContainerRef}
          >
            <div className="w-full ">
              <h1
                onClick={() => handleCloseButton()}
                className="relative text-2xl font-bold left-[90%] text-white/50"
              >
                X
              </h1>
            </div>
            <div className="flex w-full h-full pt-3 pb-3 pl-3">
              <div className="flex items-center justify-center w-1/3 h-full ">
                <img
                  className="rounded h-5/6"
                  src={
                    selectedImage !== undefined
                      ? chapters[selectedImage]?.aditionalCover
                      : ""
                  }
                  alt={`Imagem do capítulo ${
                    selectedImage !== undefined
                      ? chapters[selectedImage]?.title
                      : ""
                  }`}
                />
              </div>
              <div className="flex flex-col items-center justify-center w-2/3 h-full px-3 min-h-44">
                <h1 className="relative mb-3 text-xl font-bold text-pink-200 border-b">
                  {selectedImage !== undefined
                    ? chapters[selectedImage]?.title
                    : ""}
                </h1>
                <p className="text-sm text-center">
                  {selectedImage !== undefined
                    ? chapters[selectedImage]?.description
                    : ""}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center w-full h-12 mb-2">
              <a
                href={
                  selectedImage !== undefined
                    ? chapters[selectedImage]?.url
                    : "#"
                }
              >
                <button
                  className="px-4 py-2 text-white bg-pink-600 rounded shadow-2xl text-shadow-md"
                  style={{
                    boxShadow: "inset 0 0 0 0 #ff009d",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "inset 400px 0 0 0 #ff009d";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "inset 0 0 0 0 #ff009d";
                  }}
                >
                  {t("readNow")}
                </button>
              </a>
            </div>

            <hr className="w-5/6 bg-gray-700" />
          </div>
        </>
      )}
    </section>
  );
};

export default ChapterSection;
