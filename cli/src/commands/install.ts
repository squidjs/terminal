import { Arguments, CommandModule } from 'yargs';

export const install: CommandModule = {

    command: 'install <name>',
    aliases: ['i', 'add'],
    describe: 'Install a theme or plugin',
    handler: (args: Arguments) => {

        console.log('Install', args);
    },
};
