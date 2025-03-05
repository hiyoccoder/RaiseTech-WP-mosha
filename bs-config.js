/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 | browser-sync start --config bs-config.js
 |
 */
module.exports = {
  files: [
    "./htdocs/*.html",
    "./htdocs/**/*.html",
    "./htdocs/**/*.js",
    "./htdocs/**/*.scss",
  ],
  server: {
    baseDir: "htdocs",
    directory: true,
  },
  proxy: false,
  port: 3000,
  xip: false,
  notify: true,
  minify: true,
};
