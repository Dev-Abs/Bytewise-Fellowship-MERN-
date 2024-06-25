/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '976px',
      'xl': '1440px'
    },
    extend: {
      colors: {
        brightRed: 'hsl(12, 88%, 59%)',
        brightRedLight: 'hsl(12, 88%, 69%)',
        darkBlue: 'hsl(228, 39%, 23%)',
        darkGrayishBlue: 'hsl(227, 12%, 61%)',
        veryDarkBlue: 'hsl(233, 12%, 13%)',
        brightRedSupLight: 'hsl(12, 88%, 96%)',
        veryPaleRed: 'hsl(12, 100%, 95%)',
        veryLightGray: 'hsl(0, 0%, 98%)',
      },
      // fontFamily: {
      //   body: ['Nunito']
      // },
      // borderWidth: {
      //   '14': '14px'
      // },
      // borderRadius: {
      //   '4xl': '2rem'
      // }
    },
  },
  plugins: [],
}

