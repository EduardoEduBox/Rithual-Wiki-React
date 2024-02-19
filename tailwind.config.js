import textShadowPlugin from "tailwindcss-textshadow";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customPink: "#bb5387",
        customBlack: "#121212",
      },
      textShadow: {
        darker: "0 0 12px rgb(0, 0, 0)",
        pinkGlowDekstop:
          "2px 0 rgb(255, 223, 239), -2px 0 rgb(255, 223, 239), 0 2px rgb(255, 223, 239), 0 -2px rgb(255, 223, 239), 1px 1px rgb(255, 223, 239), -1px -1px rgb(255, 223, 239), 1px -1px, -1px 1px rgb(255, 223, 239)",

        pinkGlow:
          "1px 0 rgb(255, 223, 239), 0px 0 rgb(255, 223, 239), 0 0px rgb(255, 223, 239), 0 -1px rgb(255, 223, 239), 1px 0px rgb(255, 223, 239), 0px 0px rgb(255, 223, 239), -1px -1px #fff, -1px 1px rgb(255, 223, 239)",
      },
      fontFamily: {
        ancestral: ["DialetoAncestral"],
      },
    },
  },
  plugins: [textShadowPlugin],
};
