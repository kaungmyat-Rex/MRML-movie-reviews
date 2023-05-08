/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ["Nunito", "sans-serif"],
      },
      maxWidth: {
        128: "120px",
        170: "170px",
        700: "700px",
      },
      colors: {
        searchListBgColor: "rgba(237, 27, 242, 0.10)",

        gradientColor1: " rgba(142,86,190,0.1)",
        gradientColor2: "rgba(180,61,147,0.2)",
      },
      spacing: {
        96: "1px",
        98: "400px",
        56: "56.25%",
      },
      gradientColorStopPositions: {
        10: "-50%",
        20: "40%",
      },
    },
  },
  plugins: [],
};
