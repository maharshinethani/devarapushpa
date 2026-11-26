/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '320px',
      mobile: '375px',
      sm: '640px',
      lgmobile: '481px',
      md: '768px',
      tablet: '768px',
      laptop: '1024px',
      desktop: '1440px',
      wide: '1920px',
    },
    extend: {
      colors: {
        royal: {
          deep: '#063B2F',
          emerald: '#0B4F3A',
          forest: '#082C25',
          darkest: '#041F1A',
        },
        cream: {
          DEFAULT: '#F8F1E3',
          ivory: '#FFF9ED',
        },
        gold: {
          DEFAULT: '#C6A15B',
          soft: '#D9BC85',
          deep: '#9A7A3F',
        },
        brown: '#2B2118',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        body: ['"Jost"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
    },
  },
  plugins: [],
};
