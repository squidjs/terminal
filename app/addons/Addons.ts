import { ITerminalAddon } from 'xterm';

/**
 * Represent an addon with a type and the addon
 * itself which is an instance of ITerminalAddon.
 *
 * @see AddonType
 * @see ITerminalAddon
 */
export interface Addon {

    type: AddonType;
    addon: ITerminalAddon;
    loaded: boolean;
}

/**
 * Represent the type of addon.
 */
export enum AddonType {

    FIT,
    UNICODE,
    LIGATURES,
    WEBGL,
    WEBLINKS,
}
