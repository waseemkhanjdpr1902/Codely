import type { Config } from "tailwindcss";

const config: Config = {
  // We strictly tell Tailwind to ONLY look at the app folder
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
