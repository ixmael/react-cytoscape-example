/**
 * Graph builder
 * @author Ismael Ramos Merlos
 */
const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanPlugin = require('clean-webpack-plugin');

const BASE_DIR = process.cwd();

let common = {
    entry: {
        graph: [
            path.resolve(BASE_DIR, 'src', 'index.jsx')
        ],
        vendors: [
            'bootstrap'
        ]
    },
    output: {
        path: path.resolve(BASE_DIR, 'dist'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
        //publicPath: '/',
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : path.join(BASE_DIR, 'src'),
                loader : 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-1'],
                    plugins: [
                        'transform-decorators-legacy',
                        'transform-object-rest-spread'
                    ],
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader'],
                    fallback: 'sass-loader'
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg|eot|woff|ttf|svg|woff2)$/,
                loader: "file-loader?name=[name].[ext]",
                query: {
                    name: 'assets/[name].[ext]',
                    publicPath: '/'
                }
            },
            {
                test: /\.json$/,
                loader: "file-loader?name=[name].[ext]",
                query: {
                    name: 'data/[name].[ext]',
                    publicPath: '/'
                }
            },
        ]
    },
    plugins: [
        //new CleanPlugin([path.resolve(BASE_DIR, "dist")]),
        new  ExtractTextPlugin("css/[name].css", {
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendors", "manifest"]
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
        modules: [
            path.resolve(BASE_DIR, 'src'),
            'node_modules'
        ]
    }
};

let develop = {
    devtool: 'cheap-module-source-map',
    plugins: [
        new HtmlWebpackPlugin({
              template: path.join(BASE_DIR, 'src', 'template.ejs'),
              inject: false
        }),
    ]
};

let release = {
    devtool: 'cheap-module-source-map',
    plugins: [
        new CleanPlugin([path.resolve(BASE_DIR, "dist")]),
        //new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
        new HtmlWebpackPlugin({
            template: path.join(BASE_DIR, 'src', 'template.ejs'),
            inject: false,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            }
        })
    ]
};

if ('production' === process.env.NODE_ENV) {
    module.exports = merge(common, release);
}
else {
    module.exports = merge(common, develop);
}

//
//

/*
'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const extractCSS = new ExtractTextPlugin('stylesheets/[name]-bundle.css')
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-custom.css')

//
const base_dir = process.cwd();
const APP_DIR = path.resolve(path.join(base_dir, 'src'))

//
var config = {
    entry: {
        //app: [
            //"webpack/hot/dev-server",
            //path.resolve(path.join(APP_DIR, 'index.jsx'))
        //]
        graph: path.resolve(path.join(base_dir, 'src', 'index.jsx'))
    },
    devtool: 'cheap-module-source-map',
    output: {
        //path: path.join(base_dir, 'dist', 'js'),
        filename: '[name].js',
        path: path.join(base_dir, 'dist', 'js'),
        publicPath: path.join(base_dir, 'dist')
        //libraryTarget: 'umd',
        // `library` determines the name of the global variable
        //library: '[name]'
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : path.join(base_dir, 'src'),
                loader : 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: [
                        'transform-object-rest-spread',
                        //['babel-plugin-root-import', [{
                        //    "rootPathPrefix": '@',
                        //    "rootPathSuffix": path.join(base_dir, 'src')
                        //}]]
                    ],
                }
            },
            {
                test: /\.css$/,
                use: extractCSS.extract(["css-loader", "style-loader"])
                //use: extractCSS.extract({
                //    fallback: "style-loader",
                //    use: "css-loader"
                //})
            },
            {
                test:  /\.less$/i,
                use: extractLESS.extract(["css-loader", "less-loader"])
            },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            { test: /\.(woff|woff2)$/, loader:"url-loader?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.join(base_dir, 'src'),
            'node_modules'
        ]
    },
    plugins: [
        extractCSS,
        extractLESS,
        new HtmlWebpackPlugin({
              template: path.resolve(path.join(base_dir, 'src', 'index.ejs')),
              title: 'App',
              inject: false,
              description: 'Description'
        }),
    ]
};

module.exports = config;
*/
