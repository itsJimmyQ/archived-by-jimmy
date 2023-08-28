/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      grass: {
        300: '#30994A',
      },
      ivory: {
        100: '#FBFAF4',
      },
    },
    extend: {},
  },
  plugins: [],
};
