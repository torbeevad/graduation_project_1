const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const getPathByFolder = (folder) => {
	return fs.readdirSync(folder).reduce((config, current) => {
		config[current.split('.')[0]] = path.resolve(process.cwd(), folder, current)

		return config
	}, {})
}

const getTemplates = (paths) => {
	return Object.keys(paths).map((current) => {
        console.log(paths[current])
		return new HtmlWebpackPlugin({
			template: paths[current],
            filename: `${current}.html`,
			chunks: [current]
		})
	})
}

module.exports = {
    getPathByFolder,
    getTemplates
}