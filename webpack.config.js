const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html", 
  filename: "./index.html"
});

module.exports = {
    entry: ['babel-polyfill', "./src/index.js"],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "main.js"
    },
    plugins: [htmlPlugin],
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
            }
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        }
        ]
    }
};