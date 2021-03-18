import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { Arguments, Argv } from 'yargs';
import path from 'path';

yargs(hideBin(process.argv))
    .command('$0 [path]', 'Open Squid', (yargs: Argv) => {

        return yargs.positional('path', {
            describe: 'Path to open Squid here',
            type: 'string',
        });

    }, (args: Arguments) => {

        const openPath = args.path || process.cwd();
        const resolvedPath = path.resolve(openPath as string);

        console.log('Open in', resolvedPath);
    })
    .command('install <name>', 'Install a theme or plugin')
    .command('uninstall <name>', 'Uninstall a theme or plugin')
    .command('list', 'List installed themes and plugins')
    .command('new <name> [path]', 'Initialize a new plugin', () => null, (args: Arguments) => {

        console.log(args);
    })
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    .version(require('../package.json').version)
    .argv
