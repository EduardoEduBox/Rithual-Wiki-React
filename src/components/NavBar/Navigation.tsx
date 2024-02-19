import { useEffect, useRef } from "react";
import Swal from "sweetalert2";

const Navigation = ({
  tracker,
  position,
}: {
  tracker: boolean;
  position: "left" | "right";
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;

    if (sectionEl) {
      if (tracker) {
        sectionEl.style.transition = "transform 0.2s ease";
        sectionEl.style.transform = "translateX(0)"; // Slide in from the left
      } else {
        sectionEl.style.transition = "transform 0.2s ease";
        sectionEl.style.transform = `translateX(${
          position === "left" ? 0 : "calc(100% + 1.5rem)"
        })`; // Initially hidden to the right or left
      }
    }
  }, [tracker, position]);

  // rendering the reader in production alert till Rithual reader is ready
  // i put this function here as well because when i passed it as a prop to the Navigation component, it was not working
  const readerInProduction = () => {
    return Swal.fire({
      title: '<strong style="color: pink">(૨¡Ƭષαℓ Reader</strong> em produção!',
      text: "Estamos desenvolvendo o leitor do Rithual para que você possa ter a melhor experiência lendo esse mangá, enquanto ele não está pronto, você pode ler no Tapas.io",
      imageUrl:
        "https://cdn.discordapp.com/attachments/421344962303623189/1146492460294475907/image.png",
      background: "rgb(31, 31, 31)",
      color: "white",
      imageWidth: "60%",
      imageHeight: "auto",
      imageAlt: "san pensativo",
      showCancelButton: true,
      cancelButtonText: "Ok",
      confirmButtonText:
        '<strong style="color: lightblue"><a href="https://tapas.io/series/Rithual_manga/info">Tapas.io</a></strong>',
      confirmButtonColor: "#ff009d",
    });
  };

  return (
    <section
      id="hello"
      className="Navigation w-fit h-screen bg-[#bb5387] top-[3.9rem] pl-10 right-0 pr-[2vw] absolute z-50 flex flex-col justify-between"
      ref={sectionRef}
    >
      <div>
        <ul className="navUl text-right mt-[5vh] text-xl flex flex-col gap-[5vh]">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#characterSection">Personagens</a>
          </li>
          <li>
            <a href="#chapterSection">Capítulos</a>
          </li>
          <li>
            <a href="#" onClick={readerInProduction}>
              Ler agora
            </a>
          </li>
          <hr className="w-full bg-white" />
        </ul>
      </div>

      <div className="absolute left-[-1.5rem] top-0 h-full right-0 w-[1.5rem] bg-gradient-to-l from-[#622c47] to-transparent" />
    </section>
  );
};

export default Navigation;
