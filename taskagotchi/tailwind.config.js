/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: {
        pet: "12px 11px 0px 2px #31332C",
        custom: "8px 8px 0px -1px #31332C",
        light: "8px 8px 0px -1px #FAF4E6",
      },
    },
  },
  plugins: [],
};
