const path = require('path')
const Handlebars = require('handlebars');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {getTemplates, getPathByFolder} = require('./scripts/helpers')
console.log(getPathByFolder('./dev/js/entry'))
console.log(getTemplates(getPathByFolder('./dev/templates/pages')))
module.exports = (env, option) => {
    // noinspection JSUnusedGlobalSymbols
    return {
        entry: getPathByFolder('./dev/js/entry'),
        output: {
            path: path.resolve(__dirname, 'prod'),
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
                        "sass-loader"
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        }
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new SVGSpritemapPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].css",
            }),
            ...getTemplates(getPathByFolder('./dev/templates/pages'))
        ]
    }
}
