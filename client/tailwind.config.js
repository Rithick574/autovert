/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
   "./index.html", "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "syncworks-blue": "#4787FA",
        "dark-bg": "#171717",
        "dark-text": "#FFFFFF",
        "dark-links": "#6495ED",
        "dark-scroll-thumb": "#4A5568",
        "dark-scroll-track": "#2D3748",
      },
      scrollbar: {
        DEFAULT: {
          thumb: 'rgb(245, 245, 245)',
          track: 'transparent',
        },
        dark: {
          thumb: 'rgba(74, 85, 104, 0.3)', 
          track: 'transparent',
        }
      }
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      const newComponents = {
        '.scrollbar-custom': {
          position: 'relative',
          overflowY: 'auto', 
          scrollbarWidth: '5px',  
          '-ms-overflow-style': '10x', 

          '&::-webkit-scrollbar': {
            width: '5px', 
            height: '5px', 
          },
          
          '&:hover::-webkit-scrollbar': {
            width: '5px', 
            height: '5px',
          },
          
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme('scrollbar.DEFAULT.thumb'),
            borderRadius: '9999px', 
          },

          '&::-webkit-scrollbar-track': {
            backgroundColor: theme('scrollbar.DEFAULT.track'),
          },

          /* Dark mode scrollbars */
          '.dark &::-webkit-scrollbar-thumb': {
            backgroundColor: theme('scrollbar.dark.thumb'),
          },

          '.dark &::-webkit-scrollbar-track': {
            backgroundColor: theme('scrollbar.dark.track'),
          },
          
          '.dark &:hover::-webkit-scrollbar': {
            width: '5px',
            height: '5px', 
          },
          
        },
      };

      addComponents(newComponents);
    },
  ],
};