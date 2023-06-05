const HtmlWebpackPlugin = require('html-webpack-plugin');

//  Vue.
const { VueLoaderPlugin } = require('vue-loader');


module.exports = {

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new VueLoaderPlugin(),
    ],

    module: {

        rules: [{

                test: /\.m?js$/,

                exclude: /node_modules/,

                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                }]
            },
            //  reglas para Vue.
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            //  loaders para CSS.
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },
};