import { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import LanguageSwitcher from "../../LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Navigation = ({
  tracker,
  position,
  toggleNav,
}: {
  tracker: boolean;
  position: "left" | "right";
  toggleNav: () => void;
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const sectionEl = sectionRef.current;

    if (sectionEl) {
      if (tracker) {
        sectionEl.style.transition = "transform 0.2s ease";
        sectionEl.style.transform = "translateX(0)";
      } else {
        sectionEl.style.transition = "transform 0.2s ease";
        sectionEl.style.transform = `translateX(${
          position === "left" ? 0 : "calc(100% + 1.5rem)"
        })`;
      }
    }
  }, [tracker, position]);

  const profilePictures = [
    "/CharacterSection/profile/Aika Profile.png",
    "/CharacterSection/profile/Madger Profile.png",
    "/CharacterSection/profile/Málanus Profile.png",
    "/CharacterSection/profile/San Profile.png",
    "/CharacterSection/profile/Singer Profile.png",
  ];

  const returnRandomCharacterPicture = () => {
    const result =
      profilePictures[Math.floor(Math.random() * profilePictures.length)];

    console.log(result);

    return result;
  };

  const readerInProduction = () => {
    toggleNav();

    return Swal.fire({
      title: `<strong style="color: pink">${t("readerTitle")}</strong>`,
      text: t("readerText"),
      imageUrl: returnRandomCharacterPicture(),
      background: "rgb(31, 31, 31)",
      color: "white",
      imageWidth: "60%",
      imageHeight: "auto",
      imageAlt: "san pensativo",
      showCancelButton: true,
      cancelButtonText: "Ok",
      confirmButtonText: `<strong style="color: lightblue"><a href="${t(
        "readerLinkText"
      )}">Tapas.io</a></strong>`,
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
          <li key="home">
            <a href="#home" onClick={toggleNav}>
              {t("home")}
            </a>
          </li>
          <li key="characterSection">
            <a href="#characterSection" onClick={toggleNav}>
              {t("characters")}
            </a>
          </li>
          <li key="chapterSection">
            <a href="#chapterSection" onClick={toggleNav}>
              {t("chapters")}
            </a>
          </li>
          <li key="reader">
            <a href="#" onClick={readerInProduction}>
              {t("readNow")}
            </a>
          </li>
          <hr className="w-full bg-white" />

          <LanguageSwitcher />
        </ul>
      </div>

      <div className="absolute left-[-1.5rem] top-0 h-full right-0 w-[1.5rem] bg-gradient-to-l from-[#622c47] to-transparent" />
    </section>
  );
};

export default Navigation;
