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
        200: '#D4EECA',
        100: '#E8F2E0',
      },
      ivory: {
        300: '#59564C',
        200: '#EBE9DF',
        100: '#FBFAF4',
      },
      white: '#ffffff',
    },
    extend: {},
  },
  plugins: [],
};
