/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        128: "120px",
      },
      colors: {
        searchListBgColor: "rgba(237, 27, 242, 0.10)",

        gradientColor1: " rgba(142,86,190,0.1)",
        gradientColor2: "rgba(180,61,147,0.2)",
      },
      spacing: {
        96: "1px",
      },
    },
  },
  plugins: [],
};
