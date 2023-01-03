const path = require("path")
const webpack = require('webpack');
const HTMLWebpackPlugin = require("html-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
    //指定入口文件
    entry: "./src/index.ts",
    //指定输出文件
    output: {
        path: path.resolve(__dirname,"Install/build"),
        filename: "bundle.js",
        environment: {
            arrowFunction: false,
        }
    },
    mode: "development",
    //mode: "production",
    //devtool: 'eval-source-map',
    //指定webpack打包时要使用的模块
    module: {
        //指定要加载的规则
        rules: [
            //ts 配置
            {
                test: /\.tsx?$/,
                use: [
                    {
                        //指定加载器
                        loader: "babel-loader",
                        options: {
                            //设置预定义环境
                            "presets": [
                                [
                                    "@babel/preset-env", 
                                    {
                                        "targets": {
                                            "chrome": "58",
                                            "ie": "11"
                                        },
                                        "useBuiltIns": "usage",
                                        "corejs": "3"
                                    }
                                ]
                            ]
                        }
                    },
                    "ts-loader"
                ],
                exclude: /node_modules/,
            },
            //设置less文件处理
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: "last 2 versions"
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader",
                ]
            }
        ]
    },
    plugins: [
        //设置网页模版
        new HTMLWebpackPlugin({
            template: "./src/index.html"
        }),
        //报错
        new webpack.IgnorePlugin({
            resourceRegExp: /^electron$/
        }),
    ],
    //设置哪些文件可以作为模块引用
    resolve: {
        extensions: ['.js', '.json', '.ts'],
    },
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
    performance : {
        hints : false
    }
}