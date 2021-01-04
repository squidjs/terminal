const path = require('path');
module.exports = {
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, 'app'),
            '@common': path.resolve(__dirname, 'common'),
            '@src': path.resolve(__dirname, 'src'),
            '@ui': path.resolve(__dirname, 'ui'),
        }
    }
};
