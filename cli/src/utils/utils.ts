import { resolve } from 'path';
import { Arguments } from 'yargs';

export const resolveArgPath = (args: Arguments) => {

    const openPath = args.path || process.cwd();
    return resolve(openPath as string);
}
