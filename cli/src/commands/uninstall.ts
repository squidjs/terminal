import { Arguments, CommandModule } from 'yargs';

export const uninstall: CommandModule = {

    command: 'uninstall <name>',
    aliases: ['u', 'remove'],
    describe: 'Uninstall a theme or plugin',
    handler: (args: Arguments) => {

        console.log('Uninstall', args);
    },
};
