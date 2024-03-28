import React, { useState, useRef, useEffect } from "react";
import Flickity from "react-flickity-component";
import gsap from "gsap";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const ChapterSection: React.FC = () => {
  class Chapter {
    id: number;
    title: string;
    shortTitle: string;
    cover: string;
    aditionalCover: string;
    description: string;
    url: string;

    constructor(
      id: number,
      title: string,
      shortTitle: string,
      cover: string,
      aditionalCover: string,
      description: string,
      url: string
    ) {
      this.id = id;
      this.title = title;
      this.shortTitle = shortTitle;
      this.cover = cover;
      this.aditionalCover = aditionalCover;
      this.description = description;
      this.url = url;
    }
  }

  const chapters: Chapter[] = [
    new Chapter(
      0,
      "Capítulo - 0: Invasão",
      "Invasão",
      "/ChapterSection/prePages/Rithual pré pagina cap 0.png",
      "/ChapterSection/toolTipPages/random1.png",
      "A carnificina assola o vilarejo enquanto um demônio mata impiedosamente. Um garoto se confronta com o assassino e uma lança revela seu verdadeiro poder.",
      "https://tapas.io/episode/2307820"
    ),
    new Chapter(
      1,
      "Capítulo - 1: Padaria",
      "Padaria",
      "/ChapterSection/prePages/Rithual pré pagina cap 1.png",
      "/ChapterSection/toolTipPages/random2.png",
      "Singer sai de casa e vai à padaria em Belgadina. Novidades sobre sua matrícula escolar deixam-no ansioso. O que o futuro reserva para ele após essa compra significativa?",
      "https://tapas.io/episode/2478257"
    ),
    new Chapter(
      2,
      "Capítulo - 2: Pai e irmão",
      "Pai e irmão",
      "/ChapterSection/prePages/Rithual pré pagina cap 2.png",
      "/ChapterSection/toolTipPages/random3.png",
      "Singer reflete sobre a matrícula escolar e suas expectativas de liberdade. Em casa, encontra seus familiares e descansa. O que o aguarda no tão esperado primeiro dia de aula?",
      "https://tapas.io/episode/2571907"
    ),
    new Chapter(
      3,
      "Capítulo - 3: Paisagem",
      "Paisagem",
      "/ChapterSection/prePages/Rithual pré pagina cap 3.png",
      "/ChapterSection/toolTipPages/random4.png",
      "Singer está ansioso para o primeiro dia de aula. Seu irmão o acompanha e novas experiências o cercam. Chegando à escola, Singer está repleto de expectativas. O que o aguarda nesse novo ambiente?",
      "https://tapas.io/episode/2689791"
    ),
    new Chapter(
      4,
      "Capítulo - 4: Escola",
      "Escola",
      "/ChapterSection/prePages/Rithual pré pagina cap 4.png",
      "/ChapterSection/toolTipPages/random5.png",
      `Singer maravilhado com a escola, adentra seus corredores. Enquanto isso, seu irmão deixa a escola, encontra seus parceiros e seguem em frente. A pergunta paira: estão realmente prontos? Armas são preparadas.`,
      "https://tapas.io/episode/2846137"
    ),
  ];

  const preloadImages = (imageUrls: string[]): void => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  };

  // preloading images to avoid gsap delay
  useEffect(() => {
    preloadImages(chapters.map((chapter) => chapter.aditionalCover));
    preloadImages(chapters.map((chapter) => chapter.cover));
  }, []);

  const [selectedImage, setSelectedImage] = useState<undefined | number>(
    undefined
  );

  const [indexClicled, setIndexClicled] = useState<number>(0);

  // Flickity options for the carrousel
  const flickityOptions = {
    dragThreshold: 5,
    friction: 0.15,
    selectedAttraction: 0.01,
    initialIndex: indexClicled,
    pageDots: true,
    wrapAround: false,
    prevNextButtons: false,
  };

  const informationContainerRef = useRef<HTMLDivElement>(null);

  // function to handle the click on the image
  const handleImageClick = (index: number) => {
    if (selectedImage === undefined) {
      gsap.to(informationContainerRef.current, {
        opacity: 0, // Start fully transparent
        y: -50, // Start 20 pixels down from its final position
        ease: "power3.out", // Use a smooth easing function for a more natural effect
        duration: 0.2,

        onComplete: () => {
          setSelectedImage(index);
          setIndexClicled(index);

          gsap.to(informationContainerRef.current, {
            opacity: 1, // Animate to full opacity
            y: 0, // Animate to final position
            duration: 0.2,
            ease: "power3.out", // Use a smooth easing function for a more natural effect
          });
        },
      });
    } else if (selectedImage !== undefined && selectedImage !== index) {
      gsap.to(informationContainerRef.current, {
        opacity: 0, // Animate to full opacity
        duration: 0.2,
        ease: "power3.out", // Use a smooth easing function for a more natural effect

        onComplete: () => {
          setSelectedImage(index);
          setIndexClicled(index);

          gsap.to(informationContainerRef.current, {
            opacity: 1, // Animate to full opacity
            duration: 0.4,
            ease: "power3.out", // Use a smooth easing function for a more natural effect
          });
        },
      });
    }
  };

  // function to handle the close button click on the information container
  const handleCloseButton = () => {
    gsap.to(informationContainerRef.current, {
      opacity: 0, // Animate to full opacity
      duration: 0.2,
      ease: "power3.out", // Use a smooth easing function for a more natural effect
      onComplete: () => {
        setSelectedImage(undefined);
      },
    });
  };

  // variable to track if the user is on desktop or mobile
  const isDesktop = window.innerWidth > 1024;

  const carroulselRef = useRef<HTMLDivElement>(null);

  // function to scroll the carrousel 90 px to the right when the page loads
  useEffect(() => {
    setTimeout(() => {
      if (isDesktop) {
        carroulselRef.current?.scrollBy(48, 0);
      }
    }, 1000);
  }, []);

  // Tooltip customization
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

  // refs for the title and background title
  const titleRef = useRef<HTMLHeadingElement>(null);
  const backgroundTitleRef = useRef<HTMLHeadingElement>(null);

  return (
    <section className="flex flex-col items-center w-full" id="chapterSection">
      {/* i am gonna use template for the desktop and mobile version since they both change a lot */}

      {
        // desktop version
        isDesktop ? (
          <>
            <div className="relative w-full py-10 mt-28 pl-28">
              {
                // if the selected image is undefined, show the title
                typeof selectedImage === "undefined" ? (
                  <>
                    <h1
                      ref={titleRef}
                      className="w-full font-bold text-pink-200 text-8xl"
                    >
                      Capítulos
                    </h1>
                    <strong
                      ref={backgroundTitleRef}
                      className="text-customBlack opacity-15 text-shadow-pinkGlowDekstop text-[9vw] absolute -top-7 left-12 -z-10"
                    >
                      Capítulos
                    </strong>
                  </>
                ) : (
                  <>
                    <h1 className="w-full font-bold text-pink-200 text-8xl">
                      {chapters[selectedImage].title}
                    </h1>
                    <strong className="text-customBlack opacity-15 text-shadow-pinkGlowDekstop text-[9vw] absolute -top-7 left-12 -z-10">
                      {chapters[selectedImage].shortTitle}
                    </strong>
                  </>
                )
              }
            </div>

            <div
              ref={carroulselRef}
              className="relative flex py-5 pr-10 overflow-x-auto -space-x-28"
            >
              {chapters.map((chapter) => (
                <a
                  key={chapter.id}
                  href={chapter.url}
                  className="pl-40 shrink-0"
                >
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
                          titleRef.current.textContent = "Capítulos";
                          backgroundTitleRef.current.textContent = "Capítulos";
                        }
                      }}
                    />
                  </HtmlTooltip>
                </a>
              ))}
            </div>
          </>
        ) : (
          // mobile version
          <>
            <div className="relative flex justify-center w-full mt-32">
              {typeof selectedImage === "undefined" ? (
                <>
                  <h1 className="text-3xl font-bold text-pink-200">
                    Capítulos
                  </h1>
                  <strong className="absolute text-6xl -bottom-3 text-shadow-pinkGlow text-customBlack opacity-15 -z-10">
                    Capítulos
                  </strong>
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-pink-200">
                    {chapters[selectedImage].title}
                  </h1>
                  <strong className="absolute text-6xl -bottom-3 text-shadow-pinkGlow text-customBlack opacity-15 -z-10">
                    {chapters[selectedImage].shortTitle}
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
                      className={`h-[50vh] w-fit
                   
                `}
                      onClick={() => {
                        handleImageClick(chapter.id);
                      }}
                    >
                      <img
                        className={`relative h-full ml-3 mr-3 transition duration-100 rounded-md hover:-translate-y-5 ${
                          selectedImage === chapter.id ? "-translate-y-5" : ""
                        }`}
                        src={chapter.cover}
                        alt={`Capa do capítulo ${chapter.title}`}
                        key={chapter.id}
                      />
                    </div>
                  );
                })}
              </Flickity>
            </div>

            <div
              className={`flex flex-col items-center w-full mt-5 min-h-52 ${
                selectedImage == undefined ? "hidden" : ""
              }
        `}
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
                        ? chapters[selectedImage].aditionalCover
                        : ""
                    }
                    alt={`Imagem do capítulo ${
                      selectedImage !== undefined
                        ? chapters[selectedImage].title
                        : ""
                    }`}
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-2/3 h-full px-3 min-h-44">
                  <h1 className="relative mb-3 text-xl font-bold text-pink-200 border-b">
                    {selectedImage !== undefined
                      ? chapters[selectedImage].title
                      : ""}
                  </h1>
                  <p className="text-sm text-center">
                    {selectedImage !== undefined
                      ? chapters[selectedImage].description
                      : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center w-full h-12 mb-2">
                <a
                  href={
                    selectedImage !== undefined
                      ? chapters[selectedImage].url
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
                    Ler capítulo
                  </button>
                </a>
              </div>

              <hr className="w-5/6 bg-gray-700" />
            </div>
          </>
        )
      }
    </section>
  );
};

export default ChapterSection;
