import { Arguments, CommandModule } from 'yargs';
import chalk from 'chalk';
import { getConfig, PACKAGES_PATH, saveConfig } from '../utils/config';
import { spawn } from 'child_process';
import path from 'path';
import { getPackages } from './list';

export const uninstall: CommandModule = {

    command: 'uninstall <name>',
    aliases: ['u', 'remove'],
    describe: 'Uninstall a package',
    handler: (args: Arguments) => {

        const packageName = args.name as string;
        const packages = getPackages();

        if(packages.every(({ name }) => name !== packageName)) {

            console.log(chalk.red(`${packageName} is not installed.`));
            return;
        }

        console.log(' ');
        console.log(`Uninstalling ${packageName} in ${chalk.green(PACKAGES_PATH)}...`);
        console.log(' ');

        const install = spawn('rm', ['-rf', path.join(PACKAGES_PATH, packageName)], { stdio: 'inherit' });

        install.on('exit', () => {

            const config = getConfig();
            saveConfig({
                ...config,
                packages: [...config.packages].filter((current) => current !== packageName),
            });

            console.log('Success!');

            process.exit(0);
        });
    },
};
