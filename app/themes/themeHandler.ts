import * as fs from 'fs';
import * as path from 'path';
import { userDataPath } from '../settings/Utils';
import { defaultConfig } from '../config/defaultConfig';
import { ITheme } from '../settings/Settings';

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
