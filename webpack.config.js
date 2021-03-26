const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    externals: ['node-pty'],
    devtool: isProd ? false : 'eval',
    mode: isProd ? 'production' : 'development',
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, 'app'),
            '@common': path.resolve(__dirname, 'common'),
            '@src': path.resolve(__dirname, 'src'),
            '@ui': path.resolve(__dirname, 'ui'),
        }
    }
};
