import { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";
import Navigation from "./Navigation";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isActive, setActive] = useState(false);
  const [tracker, setTracker] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);

  const navClass = "ml-auto h-[75%] w-auto z-[999] active";

  const toggleNav = () => {
    console.log("toggleNav");

    if (isActive && tracker) {
      setActive(false);
      setTracker(false);
    } else {
      setTracker(true);
      setActive(true);
    }
  };

  useEffect(() => {
    // the navigation component renders weirdly the first time, so this logic ensures that it will render just when
    // the whole navbar renders!
    if (!showNavigation) {
      setTimeout(() => {
        setShowNavigation(true);
      }, 500);
    }
  }, [isActive]);

  // this hook is used to check if the user is on mobile or not and set the state accordingly so we change the dom for elements that cannot be fully responsive with css
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // execute the function to check if the user is on mobile or not
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // rendering the reader in production alert till Rithual reader is ready
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
    <nav
      className={`fixed top-0 w-full h-16 z-50 bg-customPink opacity-90 flex items-center px-[3vw] transform transition-transform duration-300`}
    >
      <img
        src="/Icons/Logo.png"
        alt="rithual logo"
        className="h-[70%] lg:ml-28 lg:h-[75%] w-auto rounded-lg border-rose-100 border-2"
      />

      <div className="w-[94vw] -z-10 h-full absolute flex items-center justify-center">
        <h1 className="absolute text-3xl font-bold lg:text-4xl">(૨¡Ƭષαℓ</h1>
      </div>

      {showNavigation && (
        <Navigation tracker={tracker} position={isActive ? "left" : "right"} />
      )}

      {isMobile &&
        (tracker ? (
          <RiEyeCloseLine className={navClass} onClick={toggleNav} />
        ) : (
          <FaEye className={navClass} onClick={toggleNav} />
        ))}

      {!isMobile && (
        <div className="ml-auto text-2xl">
          <ul className="flex gap-8">
            <li className="relative transition-transform hover:scale-110 group">
              <a href="#home" className="block py-2">
                Home
              </a>
              <div className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-300 ease-in-out bg-white rounded-full opacity-70 group-hover:w-full"></div>
            </li>

            <li className="relative transition-transform hover:scale-110 group">
              <a href="#characterSection" className="block py-2">
                Personagens
              </a>
              <div className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-300 ease-in-out bg-white rounded-full opacity-70 group-hover:w-full"></div>
            </li>

            <li className="relative transition-transform hover:scale-110 group">
              <a href="#chapterSection" className="block py-2">
                Capítulos
              </a>
              <div className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-300 ease-in-out bg-white rounded-full opacity-70 group-hover:w-full"></div>
            </li>

            <li className="relative transition-transform hover:scale-110 group">
              <a
                href="#"
                className="block py-2"
                onClick={() => readerInProduction()}
              >
                Ler agora
              </a>
              <div className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-300 ease-in-out bg-white rounded-full opacity-70 group-hover:w-full"></div>
            </li>
          </ul>
        </div>
      )}

      <div className="absolute bottom-[-1.48rem] left-0 right-0 h-[1.5rem] bg-gradient-to-b from-[#622c47] to-transparent"></div>
    </nav>
  );
};

export default Navbar;
