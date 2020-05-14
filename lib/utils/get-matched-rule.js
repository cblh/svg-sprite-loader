const getWebpackVersion = require('./get-webpack-version');

if (getWebpackVersion() > 4) {
  // eslint-disable-next-line global-require
  module.exports = require('./get-matched-rule-webpack5');
} else {
  // eslint-disable-next-line global-require
  module.exports = require('./get-matched-rule-webpack4');
}
