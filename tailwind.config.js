
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            code: null,
            'code::before': null,
            'code::after': null,
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
