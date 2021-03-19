import { Arguments, CommandModule } from 'yargs';
import chalk from 'chalk';
import { getConfig, PLUGINS_PATH, saveConfig } from '../utils/config';
import { spawn } from 'child_process';
import path from 'path';
import { getPlugins } from './list';

export const uninstall: CommandModule = {

    command: 'uninstall <name>',
    aliases: ['u', 'remove'],
    describe: 'Uninstall a theme or plugin',
    handler: (args: Arguments) => {

        const packageName = args.name as string;
        const plugins = getPlugins();

        if(plugins.every(({ name }) => name !== packageName)) {

            console.log(chalk.red(`${packageName} is not installed.`));
            return;
        }

        console.log(' ');
        console.log(`Uninstalling ${packageName} in ${chalk.green(PLUGINS_PATH)}...`);
        console.log(' ');

        const install = spawn('rm', ['-rf', path.join(PLUGINS_PATH, packageName)], { stdio: 'inherit' });

        install.on('exit', () => {

            const config = getConfig();
            saveConfig({
                ...config,
                plugins: [...config.plugins].filter((current) => current !== packageName),
            });

            console.log('Success!');

            process.exit(0);
        });
    },
};
