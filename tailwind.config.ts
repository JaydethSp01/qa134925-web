import type { Config } from 'tailwindcss';
const config: Config = { darkMode: "class",
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors: { brand: { DEFAULT: "#ea580c", dark: "#a83f08" }, },} },
  plugins: [],
};
export default config;
