import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gunmetal: {
          900: '#0a0f14',
          800: '#1a202c',
          700: '#2d3748',
        },
        teal: {
          900: '#0f766e',
          800: '#1e4d4a',
          500: '#14b8a6',
        },
        biolum: {
          cyan: '#00f5ff',
          orange: '#ff9500',
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        exo: ['"Exo 2"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
