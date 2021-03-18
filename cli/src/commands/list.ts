import { Arguments, CommandModule } from 'yargs';

export const list: CommandModule = {

    command: 'list',
    describe: 'List installed themes and plugins',
    handler: (args: Arguments) => {

        console.log('List', args);
    },
};
