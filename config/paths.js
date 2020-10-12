const path = require('path');

module.exports = {
  docs: path.resolve(__dirname, '../docs'), // source files
  assets: path.resolve(__dirname, '../docs/assets'), // assets files
  build: path.resolve(__dirname, '../dist'), // production build files
  static: path.resolve(__dirname, '../public'), // static files to copy to build folder
};