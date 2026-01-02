/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // <- this makes 'dark:' work with JS toggle
  content: ["./index.html", "./src/**/*.css"], // your HTML + CSS files
  theme: {
    extend: {},
  },
  plugins: [],
};
