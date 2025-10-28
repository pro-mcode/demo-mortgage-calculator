/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    screens: {
      xs: "310px",
      sm: "480px",
      md: "768px",
      lg: "1040px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primary: "#E3F4FC",
        secondary: "#D6E21F",
        custom: "#102D3D",
        error: "hsl(4, 69%, 50%)",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  safelist: [
    "bg-error",
    "border-error",
    "focus-within:border-error",
    "group-focus-within:bg-error",
  ],
  plugins: [],
};
