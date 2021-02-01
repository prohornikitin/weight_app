const path = require("path");

module.exports = {
  entry: "./src/client_and_static/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", 
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: true,
            }
          },
          "sass-loader",
        ]
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      }
    ]
  }
}