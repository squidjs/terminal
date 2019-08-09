const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;
const path = require('path');

getInstallerConfig()
    .then(createWindowsInstaller)
    .catch((error) => {

        console.error(error.message || error);
        process.exit(1);
    });

function getInstallerConfig () {

    console.log('Creating Windows installer...');
    const rootPath = path.join('./');
    const outPath = path.join(rootPath, 'release-builds');

    return Promise.resolve({

        appDirectory: path.join(outPath, 'squid-win32-x64/'),
        authors: 'QuiiBz',
        noMsi: true,
        outputDirectory: path.join(outPath, 'windows-installer'),
        exe: 'squid.exe',
        setupExe: 'SquidInstaller.exe'
        //setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'icon.ico')
    });
}