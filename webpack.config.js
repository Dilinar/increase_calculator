/* eslint-disable @typescript-eslint/no-var-requires, no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, './docs/'),
        filename: 'index.js'
    },
    resolve: {
        extensions: [ '.js', '.ts', '.tsx' ],
        alias: { '@material-ui/core': '@material-ui/core/es' },
    },
    mode: 'development',
    devServer: {
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: [ /node_modules/ ],
                use: [
                    { loader:'ts-loader' }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'head',
            scriptLoading: 'defer'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/style.css', to: './' }
            ]
        })
    ]
};
