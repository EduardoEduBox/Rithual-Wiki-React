import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Configuring i18next with LanguageDetector and react-i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      // Options for language detection
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["cookie"],
    },
    resources: {
      en: {
        translation: {
          // Loading screen
          loadingText: "Loading...",
          renderingText: "Rendering the universe...",
          readyText: "Ready!",
          loadingWelcomeText: "Welcome to the ",

          // NavBar
          home: "Home",
          characters: "Characters",
          chapters: "Chapters",
          readNow: "Read Now",
          readerTitle: "Rithual Reader in production!",
          readerText:
            "We are developing the Rithual Reader platform so you can have the best experience reading this manga. While it's not ready, you can read it on Tapas.io.",
          readerLinkText: "https://tapas.io/series/-Rithual-manga-en/info",

          // Header
          welcomeText: "Welcome to <br/>(૨¡Ƭષαℓ",
          headerDescription:
            "(૨¡Ƭષαℓ is a Brazilian manga about a world that witnesses bloody conflicts between humans and demons who vie for influence over society. In this story, you will follow the life of <strong class='text-blue-300 text-glow-blue'>Singer</strong>, a shy and very smiling boy who is discovering the world for the first time alongside his friends <strong class='text-pink-300 text-glow-pink'>Aika</strong>, <strong class='text-orange-300 text-glow-orange'>San</strong> and <strong class='text-green-300 text-glow-green'>Madger</strong>.",
          headerButton: "Chapters",
          headerKnowMoreButton: "Know more about this universe!",
          parasiteTitle: "I see you",
          parasiteText:
            "and all of them raised their heads to the sky with an explicit look of terror, fearing what they would find in their futures. Suddenly, the darkness of death consumed them in its cruel embrace.",
          parasiteButton: "SUFFER",

          // Characters
          characterSectionTitle: "Characters",
          ageOfCharacter: "Age",
          noRegister: "Still no register...",
          singerDescription:
            "a young adventurer who was born in the Uxclavasa village and dreams of knowing the world and the wonders of the kingdoms of Belgadina and Ázuma!",
          madgerDescription:
            "Martial artist born in the Yasáshi village, after a short and bloody battle, Madger lost precious people when he was still a child, now he seeks to honor those who fought for him in his old village!",
          málanusDescription:
            "Singer's older brother, Málanus seeks to become one of the leaders of the resistance, in order to find the mysterious demon with a visor that caused him so much pain.",

          // Chapter section
          chapterSectionTitle: "Chapters",
          chapters_en: [
            {
              id: 0,
              title: "Chapter - 0: Invasion",
              shortTitle: "Invasion",
              cover: "/en/ChapterSection/prePages/Rithual pre page cap 0.png",
              aditionalCover: "/en/ChapterSection/toolTipPages/random1.png",
              description:
                "Carnage ravages the village as a demon kills merciless, a boy confronts the killer and a spear reveals its true power.",
              url: "https://tapas.io/episode/2733466",
            },
            {
              id: 1,
              title: "Chapter - 1: Bakery",
              shortTitle: "Bakery",
              cover: "/en/ChapterSection/prePages/Rithual pre page cap 1.png",
              aditionalCover: "/en/ChapterSection/toolTipPages/random2.png",
              description:
                "Singer leaves home and goes to the bakery in Belgadina. News about his school enrollment make him anxious. What does the future hold for him after this significant purchase?",
              url: "https://tapas.io/episode/3159389",
            },
          ],

          // footer
          footerText: "a manga created by",

          // app
          nothingText: "Nothing here yet, buddy...",
        },
      },
      pt: {
        translation: {
          // Loading screen
          loadingText: "Carregando...",
          renderingText: "Renderizando o universo...",
          readyText: "Pronto!",
          loadingWelcomeText: "Bem vindos ao ",

          // NavBar
          home: "Home",
          characters: "Personagens",
          chapters: "Capítulos",
          readNow: "Ler agora",
          readerTitle: "Rithual Reader em produção!",
          readerText:
            "Estamos desenvolvendo o leitor do Rithual para que você possa ter a melhor experiência lendo esse mangá. Enquanto ele não está pronto, você pode ler no Tapas.io.",
          readerLinkText: "https://tapas.io/series/Rithual_manga/info",

          // Header
          welcomeText: "Bem vindos ao <br/>(૨¡Ƭષαℓ",
          headerDescription:
            "(૨¡Ƭષαℓ é um mangá brasileiro sobre um mundo que presencia conflitos sangrentos entre humanos e demônios que disputam influência sobre a sociedade. Nesta história, você irá acompanhar a vida de <strong class='text-blue-300 text-glow-blue'>Singer</strong>, um garoto tímido e bastante sorridente que está descobrindo o mundo pela primeira vez ao lado de seus amigos <strong class='text-pink-300 text-glow-pink'>Aika</strong>, <strong class='text-orange-300 text-glow-orange'>San</strong> e <strong class='text-green-300 text-glow-green'>Madger</strong>.",
          headerButton: "Capítulos",
          headerKnowMoreButton: "Conheça mais esse universo!",
          parasiteTitle: "Eu vejo você",
          parasiteText:
            "e todos eles ergueram suas cabeças ao céu com um olhar explícito de terror, temendo o que encontrariam em seus futuros. Repentinamente, a escuridão da morte os consumiu em seu abraço cruel.",
          parasiteButton: "SOFRA",

          // Characters
          characterSectionTitle: "Personagens",
          ageOfCharacter: "Idade",
          noRegister: "Ainda sem registro...",
          singerDescription:
            "um jovem aventureiro que nasceu no vilarejo Uxclavasa e sonha em conhecer o mundo e as maravilhas do reino de Belgadina e Ázuma!",
          madgerDescription:
            "Artista marcial nascido na vila Yasáshi, após uma batalha curta e sangrenta, Madger perdeu pessoas preciosas quando ainda era criança, agora, ele busca honrar aqueles que lutaram por ele em sua antiga vila!",
          málanusDescription:
            "Irmão mais velho de Singer, Málanus busca se tornar um dos líderes da resistência, para assim, encontrar o misterioso demônio de visor que lhe causou tanta dor.",

          // Chapter section
          chapterSectionTitle: "Capítulos",
          chapters_pt: [
            {
              id: 0,
              title: "Capítulo - 0: Invasão",
              shortTitle: "Invasão",
              cover: "/pt/ChapterSection/prePages/Rithual pré pagina cap 0.png",
              aditionalCover: "/pt/ChapterSection/toolTipPages/random1.png",
              description:
                "A carnificina assola o vilarejo enquanto um demônio mata impiedosamente. Um garoto se confronta com o assassino e uma lança revela seu verdadeiro poder.",
              url: "https://tapas.io/episode/2307820",
            },
            {
              id: 1,
              title: "Capítulo - 1: Padaria",
              shortTitle: "Padaria",
              cover: "/pt/ChapterSection/prePages/Rithual pré pagina cap 1.png",
              aditionalCover: "/pt/ChapterSection/toolTipPages/random2.png",
              description:
                "Singer sai de casa e vai à padaria em Belgadina. Novidades sobre sua matrícula escolar deixam-no ansioso. O que o futuro reserva para ele após essa compra significativa?",
              url: "https://tapas.io/episode/2478257",
            },
            {
              id: 2,
              title: "Capítulo - 2: Pai e irmão",
              shortTitle: "Pai e irmão",
              cover: "/pt/ChapterSection/prePages/Rithual pré pagina cap 2.png",
              aditionalCover: "/pt/ChapterSection/toolTipPages/random3.png",
              description:
                "Singer reflete sobre a matrícula escolar e suas expectativas de liberdade. Em casa, encontra seus familiares e descansa. O que o aguarda no tão esperado primeiro dia de aula?",
              url: "https://tapas.io/episode/2571907",
            },
            {
              id: 3,
              title: "Capítulo - 3: Paisagem",
              shortTitle: "Paisagem",
              cover: "/pt/ChapterSection/prePages/Rithual pré pagina cap 3.png",
              aditionalCover: "/pt/ChapterSection/toolTipPages/random4.png",
              description:
                "Singer está ansioso para o primeiro dia de aula. Seu irmão o acompanha e novas experiências o cercam. Chegando à escola, Singer está repleto de expectativas. O que o aguarda nesse novo ambiente?",
              url: "https://tapas.io/episode/2689791",
            },
            {
              id: 4,
              title: "Capítulo - 4: Escola",
              shortTitle: "Escola",
              cover: "/pt/ChapterSection/prePages/Rithual pré pagina cap 4.png",
              aditionalCover: "/pt/ChapterSection/toolTipPages/random5.png",
              description: `Singer maravilhado com a escola, adentra seus corredores. Enquanto isso, seu irmão deixa a escola, encontra seus parceiros e seguem em frente. A pergunta paira: estão realmente prontos? Armas são preparadas.`,
              url: "https://tapas.io/episode/2846137",
            },
          ],

          // footer
          footerText: "um mangá criado por",

          // app
          nothingText: "Nada aqui ainda, amigo...",
        },
      },
    },
    fallbackLng: "pt",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
