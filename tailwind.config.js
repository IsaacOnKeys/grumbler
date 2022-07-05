module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#bad02d",
        "secondary": "#ffcd03",
        "primary-dark": "hsl(68, 64%, 35%)",
        "primary-darker": "hsl(68, 64%, 15%)",
        "primary-black": "hsl(68, 64%, 7%)",
        "primary-dark-grey": "hsl(68, 64%, 35%, 0.6)",
      },
      screens: {
        '2xl': { 'max': '1920px' },
        // => @media (max-width: 1535px) { ... }

        'xl': { 'max': '1279px' },
        // => @media (max-width: 1279px) { ... }

        'lg': { 'max': '1023px' },
        // => @media (max-width: 1023px) { ... }

        'md': { 'max': '767px' },
        // => @media (max-width: 767px) { ... }

        'sm': { 'max': '639px' },
        // => @media (max-width: 639px) { ... }
      }
    },
  },
  plugins: [],
};
