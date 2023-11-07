const path = require('path'); // 파일이나 폴더의 경로 작업을 위한 툴을 제공한다. path는 노드에서 제공하는 path모듈을 사용한다.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {

    entry: './src/login.js', // 시작파일, 여기서 시작해서 사용하는 모듈들을 모두 파악한다.
    output: {  //만들어지는 최종 파일을 내보내는 옵션이다.
        filename: 'login.js', // 파일 이름
        path: path.resolve(__dirname, 'script')// 폴더를 의미한다. 
    },
    // presets: ["@babel/preset-env", "@babel/preset-react"],
    module: {
        rules: [
            {
                test: /\.css$/, //확장자가 css 일때,
                use: ["style-loader", "css-loader"], // use는 뒤에서부터 읽는다, css-loader로 읽고 style-loader로 넣어준다
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-react",
                                [
                                    "@babel/preset-env",
                                    {
                                        useBuiltIns: "usage",
                                        corejs: "3.6.4",
                                        targets: {
                                            chrome: "87",
                                        },
                                    },
                                ],
                            ],
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        // "@babel/plugin-syntax-jsx",
        new HtmlWebpackPlugin({
            template: "login.html", // template은 만들어진 파일로 html을 만들어 준다.
        }),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, "script"),
        },
        port: 5500,
    },
}