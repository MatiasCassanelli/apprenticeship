/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      lineClamp: {
        8: '8',
      },
    },
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require('@tailwindcss/line-clamp'),
  ],
};
