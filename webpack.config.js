const path = require('path');

module.exports = {
  entry: './xsrc/index.js',
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'theme.js'
  }
};