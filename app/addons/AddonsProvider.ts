/* eslint-disable no-case-declarations,@typescript-eslint/no-var-requires */
import { Addon, AddonType } from '@app/addons/Addons';
import { ITerminalAddon, Terminal as XTerminal } from 'xterm';
import { shell } from 'electron';
import { IConfig } from '@common/config/Config';

export default class AddonsProvider {

    private ADDONS: Addon[] = [
        this.buildAddon(AddonType.FIT),
        this.buildAddon(AddonType.UNICODE),
        this.buildAddon(AddonType.LIGATURES),
        this.buildAddon(AddonType.WEBGL),
        this.buildAddon(AddonType.WEBLINKS),
    ];

    /**
     * Setup all addons to the xterm instance.
     *
     * @param config - The config to use
     * @param terminal - The xterm instance
     */
    public setupAddons(config: IConfig, terminal: XTerminal) {

        this.ADDONS.forEach((addon) => this.setupAddon(config, terminal, addon));
    }

    /**
     * Setup a single addon to the terminal instance.
     *
     * @param config - The config to use
     * @param terminal - The terminal instance
     * @param addon - The addon to setup
     */
    private setupAddon(config: IConfig, terminal: XTerminal, addon: Addon) {

        if((addon.type !== AddonType.WEBGL || config.webGlRendering) &&
           (addon.type !== AddonType.LIGATURES || config.fontLigatures)) {

            addon.addon = this.resolveAddonFromType(addon.type);
            addon.loaded = true;

            terminal.loadAddon(addon.addon);

            if(addon.type === AddonType.UNICODE)
                terminal.unicode.activeVersion = '11';
        }
    }

    /**
     * Retrieve a specific addon with it type. Can be null if
     * the addon is not found.
     *
     * @see AddonType
     *
     * @param addonType - The type of the addon to retrieve
     * @returns The instance of the addon or null if not found.
     */
    public getAddon<T extends ITerminalAddon>(addonType: AddonType): T | null {

        const foundAddon = this.ADDONS.find((current) => current.type === addonType);

        if(foundAddon)
            return foundAddon.addon as T;

        return null;
    }

    /**
     * Build an Addon by default with loaded to false.
     *
     * @param addonType - The type of the addon to build
     */
    private buildAddon(addonType: AddonType): Addon {

        return {

            type: addonType,
            addon: undefined,
            loaded: false,
        };
    }

    /**
     * Resolve an addon from its type.
     *
     * @see ITerminalAddon
     * @param addonType - The type of the addon to resolve
     */
    private resolveAddonFromType(addonType: AddonType): ITerminalAddon {

        switch(addonType) {

            case AddonType.FIT:
                const { FitAddon } = require('xterm-addon-fit');
                return new FitAddon();
            case AddonType.UNICODE:
                const { Unicode11Addon } = require('xterm-addon-unicode11');
                return new Unicode11Addon();
            case AddonType.LIGATURES:
                const { LigaturesAddon } = require('./ligatures/LigaturesAddon');
                return new LigaturesAddon();
            case AddonType.WEBGL:
                const { WebglAddon } = require('xterm-addon-webgl');
                return new WebglAddon();
            case AddonType.WEBLINKS:
                const { WebLinksAddon } = require('xterm-addon-web-links');
                return new WebLinksAddon((event: MouseEvent, uri: string) => {

                    shell.openExternal(uri);
                });
        }
    }
}
