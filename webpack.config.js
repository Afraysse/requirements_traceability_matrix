// Will look in our /src/ directory and package all of the scripts and their
// Dependencies undert that directory as one module.

var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
    './src/app'
    ],
    devtool: 'eval-source-map',
    output: {
        path: __dirname,
        filename: 'app.js',
        publicPath: '/js/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            include: path.join(__dirname, 'src')
        }]
    }
};