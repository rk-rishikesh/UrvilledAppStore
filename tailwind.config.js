/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('https://howardbrush.com/wp-content/uploads/2016/03/background-faded-web.jpg')",
      },
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
    screens: {
      'xl':{'max': '1200px'},
      'lg':{'max': '991px'},
      'md':{'max': '767px'},
      'sm':{'max': '550px'},
      'xsm':{'max': '375px'},
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}