const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

console.log("__dirname", __dirname)

module.exports = {
    entry: {
        main: "./src/client/js/main.js",
        videoPlayer: "./src/client/js/videoPlayer.js",
        recorder: "./src/client/js/recorder.js",
    },
    mode: "development",
    watch: true,
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "assets"), //여기서 __dirname은?
        clean: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css", // 원하는 경로로 CSS 파일 추출
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