import type { Config } from "tailwindcss";

const config: Config = {
  // STRICTLY only look at the app folder. This ignores your root /css and /js folders.
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
