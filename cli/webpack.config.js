const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '@cli': path.resolve(__dirname, 'src'),
        },
        extensions: ['.js', '.ts'],
        mainFields: ['main'],
    },
    target: 'node',
    entry: './src',
    output: {
        path: path.join(__dirname, '..', 'resources', 'cli'),
        filename: 'cli.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
        ]
    },
}
