import { CommandModule } from 'yargs';
import { getConfig, PLUGINS_PATH } from '../utils/config';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

interface PluginItem {

    name: string;
    version: string;
    error?: string;
}

export const list: CommandModule = {

    command: 'list',
    aliases: 'ls',
    describe: 'List installed themes and plugins',
    handler: () => {

        const { plugins } = getConfig();

        const pluginsList = plugins.map((pluginDir) => {

            const pluginPath = path.join(PLUGINS_PATH, pluginDir);
            const packagePath = path.join(pluginPath, 'package.json');
            const indexPath = path.join(pluginPath, 'dist', 'index.js');

            let name = '<name>';
            let version = '<version>';
            let error: string | undefined = undefined;

            if(!fs.existsSync(pluginPath))
                error = 'Could not locate plugin folder';
            else if(!fs.existsSync(indexPath))
                error = 'Could not find plugin sources';
            else if(!fs.existsSync(packagePath))
                error = 'Could not locate package.json';
            else {

                try {
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    const { name: pName, version: pVersion } = require(packagePath);
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
            } as PluginItem;
        });

        console.log(' ');
        console.log(`Installed plugins and themes in ${chalk.green(PLUGINS_PATH)}`);
        console.log(' ');

        pluginsList.forEach(({ name, version, error }) => {

            console.log(` - ${name} ${chalk.gray('v' + version)}`);
            error && console.log(`   \\=> ${chalk.red(error)}`);
        });

        console.log(' ');
    },
};
