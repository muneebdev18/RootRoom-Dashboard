/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'authPickle': "url('/src/assets/images/authPickle.png')",
        'logo': "url('/src/assets/images/logo.png')",
        'success': "url('/src/assets/images/success.png')"
      }),
      screens: {
        'xsm': '280px',
        // => @media (min-width: 280px) { ... }

        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1025px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }

        '3xl': '1800px',
        // => @media (min-width: 1536px) { ... }
      },
      colors: {
        'authHeading': '#344054',
        'pageHeading': '#4C4C66',
        'content': '#6F6C99'
      },
      backgroundColor: {
        'bgLogo': '#3B5998',
        'bgBtn': '#04A7EA',
        'btnConfirm': '#D9001B',
        'btnContinue': '#0000FF',
        'noti': 'rgba(32, 32, 32, 0.72)'
      }
    },
  },
  plugins: [],
}