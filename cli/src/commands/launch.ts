import { Arguments, CommandModule } from 'yargs';
import { isMac, resolveArgPath } from '../utils/utils';
import { exec } from 'child_process';

const APP_PATH = isMac ? '/Applications/Squid.app/Contents/MacOS/squid' : '';

export const launch: CommandModule = {

    command: '$0 [path]',
    describe: 'Launch Squid',
    handler: (args: Arguments) => {

        const path = resolveArgPath(args);

        if(isMac)
            exec(`${APP_PATH} open ${path}`);
    },
};
