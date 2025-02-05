const path = require('path')
const Handlebars = require('handlebars');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { getTemplates, getPathByFolder} = require('./scripts/helpers')
console.log(getPathByFolder('./src/js/entry'))
console.log(getTemplates(getPathByFolder('./src/templates/pages')))
module.exports = (env, option) => {
    console.log(env, option)
    return {
        entry: getPathByFolder('./src/js/entry'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js'
        },
        devServer: {
            open: true
        },
        devtool: option.mode === 'development' ? 'eval-source-map' : false,
        module: {
            rules: [
              {
                test: /\.hbs$/i,
                loader: 'html-loader',
                options: {
                  preprocessor: (content, loaderContext) => {
                    let result;
        
                    try {
                      result = Handlebars.compile(content)();
                    } catch (error) {
                      loaderContext.emitError(error);
        
                      return content;
                    }
        
                    return result;
                  },
                },
              },
              {
                test: /\.s[ac]ss$/i,
                use: [
                  // fallback to style-loader in development
                  option.mode !== "production"
                    ? "style-loader"
                    : MiniCssExtractPlugin.loader,
                  "css-loader",
                  "sass-loader",
                ],
              },
              {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  }
                ],
              }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].css",
            }),
            ...getTemplates(getPathByFolder('./src/templates/pages'))
        ]
    }
}
