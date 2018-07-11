const Path = require('path');
const Webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
    {
        // entry為入口，webpack從這裏開始編譯
        entry: ['babel-polyfill', Path.join(__dirname, './src/scripts/main.js')],
        // output為輸出 path代表路徑 filename代表文檔名稱
        output: {
            publicPath: './',
            path: Path.join(__dirname, './bundle'),
            filename: 'scripts/bundle.[hash:8].js',
            chunkFilename: 'scripts/[name].[chunkhash:8].js',
        },
        // module是配置所有模塊要經過什麼處理
        // test:處理什麼類型的文檔，use：用什麼，include：處理這裏的，exclude：不處理這裏的
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: ['babel-loader'],
                    include: Path.join(__dirname, 'src'),
                    exclude: /node_modules/,
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192, // 8k一下的轉義為base64
                                name: '[name].[ext]',
                                outputPath: 'assets/images/',
                                publicPath: '../images/',
                            },
                        },
                    ],
                },
            ],
        },
        mode: 'production',
        plugins: [
            new CleanWebpackPlugin(['bundle']),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: 'assets/styles/[name].[hash:8].min.css',
                chunkFilename: 'assets/styles/[id].[hash:8].min.css',
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html', // 打包後的文檔名
                template: Path.join(__dirname, './src/index.html'), // 要打包文檔的路徑
            }),
            new CopyWebpackPlugin([{ from: './src/assets/images/', to: './assets/images/' }]),
            new Webpack.DefinePlugin({
                CANVAS_RENDERER: JSON.stringify(true),
                WEBGL_RENDERER: JSON.stringify(true),
            }),
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'common',
                        chunks: 'all',
                    },
                },
            },
            minimizer: [new OptimizeCSSAssetsPlugin({})],
        },
    },
    {
        // entry為入口，webpack從這裏開始編譯
        entry: ['babel-polyfill', Path.join(__dirname, './src/scripts/main.js')],
        // output為輸出 path代表路徑 filename代表文檔名稱
        output: {
            publicPath: './',
            path: Path.join(__dirname, './bundle'),
            // filename: 'scripts/bundle.[hash:8].js',
            // chunkFilename: 'scripts/[name].[chunkhash:8].js',
        },
        // module是配置所有模塊要經過什麼處理
        // test:處理什麼類型的文檔，use：用什麼，include：處理這裏的，exclude：不處理這裏的
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
                },
            ],
        },
        mode: 'production',
        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: 'assets/styles/[name].[hash:8].css',
                chunkFilename: 'assets/styles/[id].[hash:8].css',
            }),
        ],
    },
];
