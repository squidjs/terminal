import { CommandModule } from 'yargs';
import { getConfig, PACKAGES_PATH } from '../utils/config';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

interface PackageItem {

    name: string;
    version: string;
    error?: string;
}

export const getPackages = (): PackageItem[] => {

    if(!fs.existsSync(PACKAGES_PATH))
        fs.mkdirSync(PACKAGES_PATH);

    const { packages } = getConfig();

    return packages.map((packageDir) => {

        const packagePath = path.join(PACKAGES_PATH, packageDir);
        const packageJsonPath = path.join(packagePath, 'package.json');
        const indexPath = path.join(packagePath, 'dist', 'index.js');

        let name = '<name>';
        let version = '<version>';
        let error: string | undefined = undefined;

        if(!fs.existsSync(packagePath))
            error = 'Could not locate package folder';
        else if(!fs.existsSync(indexPath))
            error = 'Could not find package sources';
        else if(!fs.existsSync(packageJsonPath))
            error = 'Could not locate package.json';
        else {

            try {
                const { name: pName, version: pVersion } = JSON.parse(fs.readFileSync(packageJsonPath).toString());
                name = pName;
                version = pVersion;

            } catch (err) {

                error = err;
            }
        }

        return {
            name,
            version,
            error,
        } as PackageItem;
    });
}

export const list: CommandModule = {

    command: 'list',
    aliases: 'ls',
    describe: 'List installed package',
    handler: () => {

        const packages = getPackages();

        if(packages.length === 0) {

            console.log(chalk.red('No packages installed.'));
            return;
        }

        console.log(' ');
        console.log(`Installed packages in ${chalk.green(PACKAGES_PATH)}`);
        console.log(' ');

        packages.forEach(({ name, version, error }) => {

            console.log(` - ${name} ${chalk.gray('v' + version)}`);
            error && console.log(`   \\=> ${chalk.red(error)}`);
        });

        console.log(' ');
    },
};
