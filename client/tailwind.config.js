// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
           fontFamily: {
                  "gilroy-bold": ["gilroy-bold", "sans-serif"],
                  "gilroy-semibold": ["gilroy-semibold", "sans-serif"],
                  "gilroy-medium": ["gilroy-medium", "sans-serif"],
                  "gilroy-normal": ["gilroy-normal", "sans-serif"],
                  "gilroy-light": ["gilroy-light", "sans-serif"],
                  "gilroy-extralight": ["gilroy-extralight", "sans-serif"],
                  "gilroy-thin": ["gilroy-thin", "sans-serif"]
           }
   }
},
  plugins: [
    require('tailwind-scrollbar'),
  ],
};

