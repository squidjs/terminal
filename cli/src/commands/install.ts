import { Arguments, Argv, CommandModule } from 'yargs';
import chalk from 'chalk';
import { getConfig, PLUGINS_PATH, saveConfig } from '../utils/config';
import { spawn } from 'child_process';
import { getInstalledPath } from 'get-installed-path';

export const install: CommandModule = {

    command: 'install <name>',
    aliases: ['i', 'add'],
    describe: 'Install a theme or plugin',
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

            console.log(chalk.red('NPM is not yet supported to install plugins and themes.'));
            return;
        }

        console.log(' ');
        console.log(`Installing ${packageName} in ${chalk.green(PLUGINS_PATH)}...`);
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
                    plugins: [...config.plugins, packageName],
                });

                console.log(' ');
                console.log('Success!');

                process.exit(0);
            });
        });
    },
};
