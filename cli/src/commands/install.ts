import { Arguments, Argv, CommandModule } from 'yargs';
import chalk from 'chalk';
import { getConfig, PACKAGES_PATH, saveConfig } from '../utils/config';
import { spawn } from 'child_process';
import { YARN_PATH } from '../utils/utils';

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
    },
};
