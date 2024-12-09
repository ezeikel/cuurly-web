module.exports = {
  "*.{js,jsx,ts,tsx}": ["pnpm eslint --fix"],
  "*.{js,jsx,ts,tsx,json,css,md}": ["prettier --write"],
};
