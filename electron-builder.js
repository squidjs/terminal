const isCanary = require('./package.json').version.includes('canary');

const productName = `Squid${isCanary ? ' Canary' : ''}`;
const iconName = `icon${isCanary ? '-canary' : ''}`;
const year = new Date().getFullYear();

module.exports = {
    publish: [
        'github',
    ],
    appId: `com.squidjs.${productName.toLowerCase()}`,
    copyright: `Copyright © 2020-${year} Squid`,
    productName,
    nsis: {
        oneClick: false,
        installerIcon:`./build/${iconName}.ico`,
        allowToChangeInstallationDirectory: true,
    },
    win: {
        icon: `./build/${iconName}.ico`,
    },
    linux: {
        icon: `./build/${iconName}.png`,
        category: 'TerminalEmulator',
        target: [
            {
                target: 'deb',
                arch: ['x64'],
            },
            {
                target: 'AppImage',
                arch: ['x64'],
            },
        ],
    },
    mac: {
        icon: `./build/${iconName}.icns`,
        category: 'public.app-category.developer-tools',
        target: [
            {
                target: 'default',
                arch: ['arm64', 'x64'],
            },
        ],
    },
    snap: {
        publish: {
            provider: 'generic',
            url: 'https://anydummyurl.com',
        },
    },
};
