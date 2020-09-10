module.exports = {
    pluginOptions: {
        electronBuilder: {
            // List native deps here if they don't work
            externals: ['node-pty'],
            // If you are using Yarn Workspaces, you may have multiple node_modules folders
            // List them all here so that VCP Electron Builder can find them
            nodeModulesPath: ['./node_modules'],
            builderOptions: {
                publish: ['github'],
                appId: 'com.quiibz.squid',
                copyright: 'Copyright © 2020 Squid',
                productName: 'Squid',
                snap: {
                    publish: {
                        provider: 'generic',
                        url: 'https://anydummyurl.com',
                    },
                },
            }
        }
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
                },
            ],
        },
    }
}
