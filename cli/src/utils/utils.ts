import { resolve } from 'path';
import { Arguments } from 'yargs';

export const resolveArgPath = (args: Arguments) => {

    const openPath = args.path || args.p || process.cwd();
    return resolve(openPath as string);
}

export const isMac = process.platform === 'darwin';
export const isWin = process.platform === 'win32';

export const YARN_PATH = isMac ?
    '/Applications/Squid.app/Contents/Resources/bin/yarn' : isWin ?
    '' :
    '';
