import * as fontFinder from 'font-finder';
import * as fontLigatures from 'font-ligatures';

import parse from './parse';

let fontsPromise: Promise<fontFinder.FontList> | undefined = undefined;

/**
 * Loads the font ligature wrapper for the specified font family if it could be
 * resolved, throwing if it is unable to find a suitable match.
 */
export default async function load(fontFamily: string, cacheSize: number): Promise<fontLigatures.Font | undefined> {
    if (!fontsPromise) {
        fontsPromise = fontFinder.list();
    }
    const fonts = await fontsPromise;

    for (const family of parse(fontFamily)) {
        // If we reach one of the generic font families, the font resolution
        // will end for the browser and we can't determine the specific font
        // used. Throw.
        if (genericFontFamilies.includes(family)) {
            return undefined;
        }

        // eslint-disable-next-line no-prototype-builtins
        if (fonts.hasOwnProperty(family) && fonts[family].length > 0) {
            // 1st fix:
            // We load the path with the custom file protocol
            // to allow electron finding the file, without disable web security.
            return await fontLigatures.loadFile('squid://' + fonts[family][0].path, { cacheSize });
        }
    }

    // If none of the fonts could resolve, throw an error
    return undefined;
}

// https://drafts.csswg.org/css-fonts-4/#generic-font-families
const genericFontFamilies = [
    'serif',
    'sans-serif',
    'cursive',
    'fantasy',
    'monospace',
    'system-ui',
    'emoji',
    'math',
    'fangsong'
];
