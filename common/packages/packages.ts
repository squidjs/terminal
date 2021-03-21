import SquidPackage from '@common/packages/package';
import { homePath, isMainProcess } from '../utils/utils';
import { TriggerParams } from '@common/packages/hooks';
import * as path from 'path';
import * as fs from 'fs';
import Config from '@common/config/Config';

const PACKAGES_FOLDER = path.join(homePath, '.squid');

// Keep track of is the packages has been loaded in the current process
let packagesLoaded = false;
let packages: SquidPackage[] = [];

/**
 * Load a single package.
 *
 * @param packageDir - The path to the package
 * @returns The loaded package
 */
const loadPackage = (packageDir: string): SquidPackage => {

    let squidPackage: SquidPackage = {};

    if(typeof __non_webpack_require__ !== 'undefined')
        squidPackage = __non_webpack_require__(path.join(PACKAGES_FOLDER, packageDir, 'dist', 'index')).default;

    if(isMainProcess)
        callPackageTrigger(squidPackage, 'onLoad');

    return squidPackage;
}

/**
 * Load all the packages. Can be used to reload the packages.
 */
const loadPackages = () => {

    const { packages: enabledPackages } = Config.getInstance().getHooklessConfig();

    // Reset the packages list
    packages = [];

    if(!fs.existsSync(PACKAGES_FOLDER))
        fs.mkdirSync(PACKAGES_FOLDER);

    const packagesDir = fs.readdirSync(PACKAGES_FOLDER);

    packagesDir
        .filter((packageDir) => enabledPackages.includes(packageDir))
        .forEach((packageDir) => {

            packages.push(loadPackage(packageDir));
        });

    packagesLoaded = true;
}

/**
 * Call a trigger for the given package, and use optional parameter which
 * is a HookParam.
 *
 * @param squidPackage - The squidPackage to call the trigger on
 * @param trigger - The trigger to call
 * @param param - An optional parameter
 * @returns The modifier parameter or undefined if no parameter was provided
 */
const callPackageTrigger = <T extends TriggerParams>(squidPackage: SquidPackage, trigger: keyof SquidPackage, param?: T): T => {

    if(trigger in squidPackage)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return param ? squidPackage[trigger](param) : squidPackage[trigger]();

    return param as T;
}

/**
 * Call a trigger for all the packages, and and optional parameter which
 * is a HookParam. We cache the result of each package's trigger and return
 * it after trigger all the packages.
 *
 * @param trigger - The trigger to call
 * @param param - An optional parameter
 * @returns The modifier parameter or undefined if no parameter was provided
 */
export const callTrigger = <T extends TriggerParams>(trigger: keyof SquidPackage, param?: T): T => {

    if(!packagesLoaded || trigger === 'hookConfig')
        loadPackages();

    let cache: T | undefined = param;

    packages.forEach((squidPackage) => {

        cache = callPackageTrigger(squidPackage, trigger, cache ? cache : param);
    });

    return cache as T;
}
