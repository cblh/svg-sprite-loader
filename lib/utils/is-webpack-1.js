// eslint-disable-next-line import/no-unresolved
const webpackPkg = require('webpack/package.json');

const webpackMajorVersion = parseInt(webpackPkg.version.split('.')[0], 10);

module.exports = webpackMajorVersion === 1;
