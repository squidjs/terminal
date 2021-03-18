import { Arguments, Argv, CommandModule } from 'yargs';
import { resolveArgPath } from '../utils/utils';

type Template = 'theme' | 'plugin';

export const newCommand: CommandModule = {

    command: 'new <name> [path]',
    describe: 'Initialize a new theme or plugin',
    builder: (args: Argv) => {

        return args.option('template', {

            alias: 't',
            describe: 'Initialize with a template',
            default: 'theme' as Template,
            choices: ['theme', 'plugin'] as Template[],
        });
    },
    handler: (args: Arguments) => {

        const name = args.name as string;
        const template = args.template as string;
        const path = resolveArgPath(args);

        console.log('initialzing project', name, 'with template', template, 'in dir', path);
    },
};
