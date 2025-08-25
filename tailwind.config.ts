import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6C63FF",
        accent: "#00C9A7",
        soft: "#FFE3A3",
      },
      boxShadow: {
        playful: "0 10px 25px -12px rgba(17,24,39,.15)",
      },
      borderRadius: {
        xl: "1rem",
        '2xl': "1rem",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        bounceIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '60%': { transform: 'translateY(-6px)', opacity: '1' },
          '80%': { transform: 'translateY(2px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        wiggle: 'wiggle 400ms ease-in-out',
        bounceIn: 'bounceIn 600ms ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
