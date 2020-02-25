import * as fs from 'fs';
import * as path from 'path';
import * as md5 from 'md5';
import { userDataPath } from './Utils';
import { defaultConfig } from '../config/defaultConfig';
import { ISettings, ITheme} from './Settings';

/**
 * Load a theme with it's name
 * @param name
 * @return The loaded theme, or the default theme
 */
export function loadTheme(name: string): ITheme {

    const themePath = path.join(userDataPath, name + '.theme.json');

    try {

        return JSON.parse(fs.readFileSync(themePath).toString());

    } catch (error) {

        return defaultConfig.theme;
    }
}

/**
 * Watch for changes on settings file
 * @param onChange
 */
export function watchForChanges(onChange: (newFile: ISettings) => any) {

    let previousMD5 = null;
    let fsWait = false;
    const settingsPath = path.join(userDataPath, 'settings.squid.json');

    fs.watch(settingsPath, (event: string, file: string) => {

         if(file) {

             if(fsWait)
                 return;

             setTimeout(() => fsWait = false, 100);

             const file = fs.readFileSync(settingsPath);
             const currentMD5 = md5(file);

             if(currentMD5 === previousMD5)
                 return;

             previousMD5 = currentMD5;

             try {

                 onChange(JSON.parse(file.toString()));

             } catch (error) {

                 console.log('error in file');
             }
         }
    });
}
