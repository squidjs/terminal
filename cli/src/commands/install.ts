import { Arguments, Argv, CommandModule } from 'yargs';
import chalk from 'chalk';
import { getConfig, PACKAGES_PATH, saveConfig } from '../utils/config';
import { spawn } from 'child_process';
import { getInstalledPath } from 'get-installed-path';

export const install: CommandModule = {

    command: 'install <name>',
    aliases: ['i', 'add'],
    describe: 'Install a package',
    builder: (args: Argv) => {

        return args
            .option('npm', {

                type: 'boolean',
                describe: 'Use NPM instead of Yarn (not recommanded)',
            });
    },
    handler: (args: Arguments) => {

        const packageName = args.name as string;
        const useYarn = !args.npm;

        if(!useYarn) {

            console.log(chalk.red('NPM is not yet supported to install packages.'));
            return;
        }

        console.log(' ');
        console.log(`Installing ${packageName} in ${chalk.green(PACKAGES_PATH)}...`);
        console.log(' ');

        getInstalledPath('yarn').then((path) => {

            path += '/bin/yarn';

            const install = spawn(path, ['add', '--cwd', process.env.HOME, '--modules-folder', '.squid', '--no-lockfile', packageName], { stdio: 'inherit', env: process.env });

            install.on('message', (msg) => console.log(msg))
            install.on('exit', (code) => {

                if(code !== 0) {

                    console.log('Installation failed!')
                    return;
                }

                const config = getConfig();
                saveConfig({
                    ...config,
                    packages: [...config.packages, packageName],
                });

                console.log(' ');
                console.log('Success!');

                process.exit(0);
            });
        });
    },
};
