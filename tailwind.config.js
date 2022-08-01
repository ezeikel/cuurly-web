/* eslint-disable global-require */

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        "user-page-layout": "80px 1fr",
      },
    },
  },
  plugins: [],
};
