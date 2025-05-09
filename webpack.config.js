const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

console.log("__dirname", __dirname)

module.exports = {
    entry: "./src/client/js/main.js",
    mode: "development",
    watch: true,
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "assets", "js"), //여기서 __dirname은?
        clean: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "../css/[name].css", // 원하는 경로로 CSS 파일 추출
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", { targets: "defaults" }]],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // style-loader 대신
                    "css-loader",
                    "sass-loader"
                ]
            }
        ],
    },
    devtool: "source-map",
};