const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/build/')
    publicPath: '/build',
  }
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new CleanWebpackPlugin(['public/build'])
  ]
};

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

  .configureBabel(babelConfig => {
    babelConfig.presets.push('@babel/preset-react');

    babelConfig.plugins = [
      'transform-runtime',
      'transform-class-properties',
      'transform-object-rest-spread',
      // 'transform-optional-chaining',
      'transform-do-expressions',
      'wildcard',
    ];
  })
  ;

const config = Encore.getWebpackConfig();

config.resolve.modules = [path.resolve(__dirname, './assets/js'), 'node_modules'];

config.watchOptions = { poll: 300, ignored: /node_modules/ };

if (!Encore.isProduction()) {
  config.devtool = 'eval-source-map';
}

module.exports = config;
