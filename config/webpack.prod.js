const path = require('./paths.js');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.build,
        publicPath: '/',
        filename: 'js/[name].[contenthash].js',
    },
});