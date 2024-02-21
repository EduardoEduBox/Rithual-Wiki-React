import React, { useEffect, useState, useRef } from "react";
import { LuEye } from "react-icons/lu";
import Typewriter from "typewriter-effect";
import gsap from "gsap";

type LoadingProps = {
  loading: boolean;
};

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  const texts = ["Carregando.....", "Renderizando o universo.....", "Pronto!"];
  const [percentage, setPercentage] = useState(0);
  const [transitionStart, setTransitionStart] = useState(false);
  const welcomeRef = useRef(null);

  useEffect(() => {
    if (loading) {
      let currentPercentage = 0;
      const interval = setInterval(() => {
        currentPercentage += 1;
        setPercentage(currentPercentage);
        if (currentPercentage >= 100) {
          clearInterval(interval);
          setTimeout(() => setTransitionStart(true), 1000);
        }
      }, 45);

      return () => clearInterval(interval);
    }
  }, [loading]);

  useEffect(() => {
    if (transitionStart) {
      // Animação para cada letra
      gsap.to(".letter", {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        ease: "back.out(1.7)",
      });
    }
  }, [transitionStart]);

  const splitText = (text: string) => {
    return text.split("").map((letter, index) => {
      // Checa se o caractere é um espaço
      if (letter === " ") {
        return (
          <span key={index} style={{ display: "inline-block", width: "0.5em" }}>
            &nbsp;
          </span>
        );
      }
      return (
        <span
          key={index}
          className="letter"
          style={{
            display: "inline-block",
            opacity: 0,
            transform: "translateY(-100%)",
          }}
        >
          {letter}
        </span>
      );
    });
  };

  const container = useRef(null);
  const [stateOfContainer, setStateOfContainer] = useState(false);

  useEffect(() => {
    if (transitionStart) {
      setTimeout(() => {
        gsap.to(container.current, {
          duration: 2,
          opacity: 0,
          ease: "back.out(1.7)",
          onComplete: () => {
            setStateOfContainer(true);
          },
        });
      }, 2500);
    }
  }, [transitionStart]);

  return (
    <div
      className={`h-screen fixed w-screen z-[9999] ${
        stateOfContainer ? "hidden" : ""
      }`}
      ref={container}
    >
      <div
        className={`flex items-center justify-center bg-gray-950 w-full h-full transition-opacity duration-1000 ${
          transitionStart ? "opacity-0" : "opacity-100"
        }`}
      >
        {!transitionStart && (
          <div className="flex flex-col items-center justify-center">
            <LuEye className="text-white text-8xl lg:text-8xl animate-spin" />
            <div className="mt-8 text-2xl font-semibold">
              {loading && (
                <Typewriter
                  options={{
                    autoStart: true,
                    loop: false,
                    cursor: "",
                    delay: 20,
                    deleteSpeed: 0,
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(texts[0])
                      .pauseFor(300)
                      .deleteAll()
                      .typeString(texts[1])
                      .pauseFor(300)
                      .deleteAll()
                      .typeString(texts[2])
                      .start();
                  }}
                />
              )}
            </div>
            <h1 className="mt-5 text-3xl opacity-50">{percentage}%</h1>
          </div>
        )}
      </div>
      {transitionStart && (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full backdrop-filter backdrop-blur-sm">
          <h1
            className="px-5 text-4xl font-semibold text-center text-shadow-darker lg:text-5xl"
            ref={welcomeRef}
          >
            {splitText("Seja bem vindo ao ")}
            <br />
            <span className="text-pink-200 text-glow-pink">
              {splitText("(૨¡Ƭષαℓ ")}
            </span>
            {splitText("Wiki!")}
          </h1>
        </div>
      )}
    </div>
  );
};

export default Loading;
