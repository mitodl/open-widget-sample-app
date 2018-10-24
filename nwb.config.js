var path = require('path')
var BundleTracker = require('webpack-bundle-tracker')


/**
 * Entry point configuration.
 *
 * This is where you should configure your webpack entry points, for example, a different entry point per page.
 */
const ENTRIES = {
  index: './src/index.js',
}
const SHARED_ENTRIES = [
  './node_modules/nwb/polyfills.js',
]


/**
 * nwb config
 */
module.exports = function({command}) {
  const isDevelopment = command.startsWith('serve')

  /* Set config */
  let config = {
    type: 'react-app',
  }
  config.webpack = {
    config(webpackConfig) {
      /* Convert webpackConfig.entry from array to object format */
      let sharedEntries = SHARED_ENTRIES

      if (isDevelopment) {
        // React Hot Loader's patch module needs to run before your app
        sharedEntries = [
          'react-hot-loader/patch',
          ...SHARED_ENTRIES,
          './node_modules/webpack-dev-server/client/index.js?http://localhost:3000/',
          './node_modules/webpack/hot/only-dev-server.js',
        ]
      }

      // Set new entry configuration
      webpackConfig.entry = {}
      Object.keys(ENTRIES).forEach((entryKey) => {
        webpackConfig.entry[entryKey] = [...sharedEntries, ENTRIES[entryKey]]
      })
      return webpackConfig
    },
    extra: {
      output: {
        path: path.resolve('./dist/webpack_bundles/'),
      },
      plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
      ],
    },
    publicPath: isDevelopment ? 'http://localhost:3000/' : '/static/webpack_bundles/',
  }

  if (isDevelopment) {
    // Only include react-hot-loader into babel and set publicPath if development
    config.babel = {plugins: 'react-hot-loader/babel'}
  }

  return config
}
