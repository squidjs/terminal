const path = require('path');
let compiles = 0;
module.exports = {
    externals: ['node-pty'],
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, 'app'),
            '@common': path.resolve(__dirname, 'common'),
            '@src': path.resolve(__dirname, 'src'),
            '@ui': path.resolve(__dirname, 'ui'),
        }
    },
    plugins: [{
        apply: compiler => {
            compiler.hooks.done.tap('DonePlugin', (stats) => {
                compiles++;

                if(compiles >= 2)
                    setTimeout(() => process.exit(0));
            });
        },
    }],
};
