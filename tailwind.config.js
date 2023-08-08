module.exports = {
  content: [
    'index.html',
    './src/**/*.{js,jsx,ts,tsx,vue,html}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'familink-black': '#1D232A',
        '"journal-bg"': '#C6C1B7',
      },
      fontFamily: {
        journal: ['"Newsreader"', 'serif'],
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};