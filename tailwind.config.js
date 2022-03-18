module.exports = {
  content: [
    './html-css-onboarding/**/*.html',
    './node_modules/tw-elements/dist/js/**/*.js',
    './react-onboarding/src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tw-elements/dist/plugin')],
};
