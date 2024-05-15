import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "jacksons-purple": {
          "50": "#ecf2ff",
          "100": "#dce8ff",
          "200": "#c1d3ff",
          "300": "#9bb5ff",
          "400": "#738cff",
          "500": "#5263ff",
          "600": "#3337f8",
          "700": "#2728db",
          "800": "#2224b1",
          "900": "#232786",
          "950": "#151651",
        },
      },
    },
    fontFamily: {
      BMHANNAPro: ["BMHANNAPro"],
    },
  },
  plugins: [],
};
export default config;
