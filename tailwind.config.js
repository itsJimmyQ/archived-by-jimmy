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
      purple: {
        300: '#BC36FF',
        100: '#FDF3FF',
      },
      blue: {
        300: '#2998FF',
        100: '#F2F8FF',
      },
      white: '#ffffff',
    },
    fontFamily: {
      serif: ['var(--font-serif)'],
      sans: ['var(--font-sans)'],
    },
    screens: {
      tablet: '768px',
      desktop: '1080px',
      large: '1440px',
    },
    extend: {},
  },
  plugins: [],
};
