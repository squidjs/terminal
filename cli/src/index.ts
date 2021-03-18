import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { launch } from './commands/launch';
import { install } from './commands/install';
import { uninstall } from './commands/uninstall';
import { list } from './commands/list';
import { newCommand } from './commands/new';

yargs(hideBin(process.argv))
    .usage('Usage: $0 [options] [command]')
    .command(launch)
    .command(install)
    .command(uninstall)
    .command(list)
    .command(newCommand)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    .version(require('../package.json').version)
    .scriptName('squid')
    .argv
