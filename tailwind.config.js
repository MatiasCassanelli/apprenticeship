module.exports = {
  content: [
    './html-css-onboarding/**/*.html',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tw-elements/dist/plugin')],
};
