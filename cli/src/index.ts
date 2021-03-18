import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
    .command('curl <url>', 'fetch the contents of the URL', () => null, (argv) => {
        console.info(argv)
    })
    .demandCommand(1)
    .argv;
