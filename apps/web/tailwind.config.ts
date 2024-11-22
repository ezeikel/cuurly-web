const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        "user-page-layout": "80px 1fr",
        "user-posts-layout": "repeat(3, minmax(0, 350px))",
      },
    },
  },
};

export default config;
