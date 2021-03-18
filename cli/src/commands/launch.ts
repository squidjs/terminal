import { Arguments, CommandModule } from 'yargs';
import { resolveArgPath } from '../utils/utils';

export const launch: CommandModule = {

    command: '$0 [path]',
    describe: 'Launch Squid',
    handler: (args: Arguments) => {

        const path = resolveArgPath(args);

        console.log('open', path);
    },
};
