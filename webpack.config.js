var Encore = require('@symfony/webpack-encore');

Encore
// the project directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    // uncomment to create hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // uncomment to define the assets of the project
    .addEntry('js/index', './assets/js/index.js')

    // React preset
    .enableReactPreset()

    .configureBabel(function(babelConfig) {
      babelConfig.plugins = ['transform-object-rest-spread', 'transform-class-properties', 'wildcard'];
    })
;

const config = Encore.getWebpackConfig();

config.watchOptions = {poll: 300, ignored: /node_modules/};

if (!Encore.isProduction()) {
  config.devtool = 'eval-source-map';
}

module.exports = config;
