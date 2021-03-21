import { Arguments, CommandModule } from 'yargs';
import chalk from 'chalk';
import { getConfig, PACKAGES_PATH, saveConfig } from '../utils/config';
import { spawn } from 'child_process';
import { getPackages } from './list';
import { YARN_PATH } from '../utils/utils';

export const uninstall: CommandModule = {

    command: 'uninstall <name>',
    aliases: ['u', 'remove'],
    describe: 'Uninstall a package',
    handler: (args: Arguments) => {

        const packageName = args.name as string;
        const packages = getPackages();

        if(!packages.find(({ name }) => name === packageName)) {

            console.log(chalk.red(`${packageName} is not installed.`));
            return;
        }

        console.log(' ');
        console.log(`Uninstalling ${packageName} in ${chalk.green(PACKAGES_PATH)}...`);
        console.log(' ');

        const install = spawn(process.execPath, [YARN_PATH, 'remove', '--cwd', process.env.HOME, '--modules-folder', '.squid', packageName], { stdio: 'inherit' });

        install.on('message', (msg) => console.log(msg))
        install.on('exit', (code) => {

            if(code !== 0) {

                console.log('Uninstallation failed!')
                return;
            }

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
