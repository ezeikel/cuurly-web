/* eslint-disable global-require */

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        "user-page-layout": "80px 1fr",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
