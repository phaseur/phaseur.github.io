const path = require('./paths.js');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {

    mode: 'development',

    // help debugging the build prod
    devtool: 'inline-source-map',
    // webpack-dev-server on lui indique ou regarder les fichiers (par défaut les servier sur localhost:8080)
    devServer: {
        contentBase: path.build,
    },
});