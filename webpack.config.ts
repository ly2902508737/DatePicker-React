// const path = require("path");
// const webpack = require("webpack");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// const ROOT = path.resolve(__dirname); // nodejs 内置的全局变量，代表当前执行的根目录
// const ENTRY = path.resolve(ROOT, "src"); // 打包的入口
// const OUTPUT = path.resolve(ROOT, "dist"); // 打包的出口
// const PORT = 8080;

// module.exports = {
//   // 打包模式，可选值有production、development和none
//   mode: "development",
//   // 入口点，Webpack将从这里开始打包
//   // entry: "./src/index.tsx",
//   entry: [
//     // "react-hot-loader/patch",
//     // `webpack-dev-server/client?http://localhost:${PORT}`,
//     // `webpack/hot/only-dev-server`,
//     path.join("./src/index.tsx"),
//   ],
//   // 出口，编译后的静态文件将被输出到这个目录
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "bundle.js",
//   },
//   // 模块规则
//   module: {
//     rules: [
//       {
//         test: /\.(j|t)sx?$/,
//         use: [
//           {
//             loader: "babel-loader",
//           },
//         ],
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.(le|c)ss$/, // 处理.css文件
//         use: ["style-loader", "css-loader", "postcss-loader"],
//       },
//     ],
//   },
//   // 解析路径别名
//   resolve: {
//     // enforceExtensions: false, // 强制使用扩展名
//     extensions: [".js", ".jsx", ".json"],
//     alias: {
//       // Components: path.resolve(__dirname, "src/components/"),
//       // Utils: path.resolve(__dirname, "src/utils/"),
//       "@": path.resolve(__dirname, "src"),
//     },
//   },
//   // 插件列表
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./index.html", // 生成的入口HTML文件
//     }),
//   ],
//   // 开发服务器配置
//   devServer: {
//     compress: true,
//     port: 3000,
//     open: true,
//   },
// };

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ROOT = __dirname; // nodejs 内置的全局变量,代表当前执行的根目录
const ENTRY = path.resolve(ROOT, "src"); // 打包的入口 (这里我们打包 src 目录下面的文件)
const OUTPUT = path.resolve(ROOT, "dist"); // 打包的出口
const PORT = 8080; // 本地开发服务器 (devServer) 的端口

module.exports = {
  // 打包模式 development | production | none , webpack 会自动根据是生产还是开发环境做出一些优化
  mode: "development",
  // 入口及热跟新相关配置, 更新代码会自动刷新页面或无刷新更新代码
  entry: [
    // "react-hot-loader/patch",
    `webpack-dev-server/client?http://localhost:${PORT}`,
    "webpack/hot/only-dev-server",
    path.join(ENTRY, "index.tsx"),
  ],
  output: {
    path: path.join(OUTPUT),
    filename: "index.js",
  },
  // 本地开发服务器
  devServer: {
    compress: true,
    port: PORT,
    host: "0.0.0.0",
    hot: true,
    // inline: true,
    historyApiFallback: true,
    open: true,
    // disableHostCheck: true,
  },
  // loader 相关配置
  module: {
    rules: [
      {
        // 遇到 .js .jsx .ts .tsx 的文件 使用 babel-loader 进行处理
        // 下面会详细讲到
        test: /\.(j|t)sx?$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        // 遇到 .less 的文件 使用 less-loader
        test: /\.less$/,
        use: [
          "style-loader", // 解析行内样式
          "css-loader", // 解析 .css 文件
          "postcss-loader", // css 届的 babel, 对 css 进行兼容处理
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              javascriptEnabled: true,
              minimize: true,
              sourceMap: false,
            },
          },
          {
            loader: "postcss-loader",
            options: { javascriptEnabled: true, sourceMap: false },
          },
        ],
      },
    ],
  },
  resolve: {
    enforceExtension: false,
    // 可以省略后缀不写
    extensions: [".js", ".jsx", ".js", ".json", ".ts", ".tsx"],
    alias: {
      // react hooks 热更新
      // 当 import ReactDOM from 'react-dom' 时
      // 会替换成 mport ReactDOM from '@hot-loader/react-dom'
      // "react-dom": "@hot-loader/react-dom",
    },
  },
  plugins: [
    // 开启 热跟新
    new webpack.HotModuleReplacementPlugin(),
    // 打包完成后 会自动将处理好的静态资源引入到 index.html
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT, "index.html"),
      title: "基于 typescript 和 react hook 的组件化开发实战",
      filename: "index.html",
    }),
  ],
};
