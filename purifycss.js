const purify = require('purify-css');

const content = ['src/**/*.html', 'src/**/*.ts'];
const css = ['src/**/*.css'];

const options = {
  output: 'dist/styles.css',
  minify: true,
  info: true
};

purify(content, css, options, function (purifiedAndMinifiedResult) {
  console.log(purifiedAndMinifiedResult);
});