import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        "purple-brand": "#8b5cf6",
        "blue-brand": "#3b82f6",
      },
      fontFamily: {
        inter:      ['var(--font-inter)', 'Inter', 'sans-serif'],
        playfair:   ['var(--font-playfair)', 'Georgia', 'serif'],
        cormorant:  ['var(--font-cormorant)', 'Georgia', 'serif'],
        oswald:     ['var(--font-oswald)', 'Impact', 'sans-serif'],
        lora:       ['var(--font-lora)', 'Georgia', 'serif'],
        'dm-sans':  ['var(--font-dm-sans)', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
      },
      animation: {
        "orb-float-1": "orbFloat1 8s ease-in-out infinite",
        "orb-float-2": "orbFloat2 10s ease-in-out infinite",
        "orb-float-3": "orbFloat3 12s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
