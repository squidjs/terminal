import { Arguments, Argv, CommandModule } from 'yargs';
import chalk from 'chalk';
import { getConfig, PACKAGES_PATH, saveConfig } from '../utils/config';
import { spawn } from 'child_process';
import { YARN_PATH } from '../utils/utils';
import fetch from 'node-fetch';

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
        console.log(`Fetching informations about ${packageName}...`);

        fetch(`https://api.npms.io/v2/package/${packageName}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(r => r.json()).then((data) => {

            if(data.code && data.code === 'NOT_FOUND') {

                console.log(chalk.red('Package not found.'));
                return;
            }

            if(!data.collected.metadata.keywords.includes('squid-package')) {

                console.log(chalk.red('This package is not a Squid package.'));
                return;
            }

            console.log(' ');
            console.log(`Installing ${packageName} in ${chalk.green(PACKAGES_PATH)}...`);
            console.log(` Version: ${chalk.blue(data.collected.metadata.version)}`);
            console.log(` Author: ${chalk.blue(data.collected.metadata.publisher.username)}`);
            console.log(' ');

            const install = spawn(process.execPath, [YARN_PATH, 'add', '--cwd', process.env.HOME, '--modules-folder', '.squid', packageName], { stdio: 'inherit', env: process.env });

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
