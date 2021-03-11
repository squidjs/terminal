import { ITerminalAddon, ITerminalOptions, Terminal as XTerminal } from 'xterm';
import { Factory } from '@common/factories/Factory';
import { UndefinedObject } from '@common/types/types';
import { clipboard } from 'electron';
import { FitAddon } from 'xterm-addon-fit';
import { AddonType } from '@app/addons/Addons';
import AddonsProvider from '@app/addons/AddonsProvider';
import { IConfig } from '@common/config/Config';
import { isWin } from '@common/utils/utils';
import ProcessFactory from '@app/factories/ProcessFactory';
import { ProcessType } from '@app/Terminal';

export default class XTerminalFactory implements Factory<XTerminal> {

    public factoryObject: UndefinedObject<XTerminal>;
    private addonsProvider: AddonsProvider;
    private config: IConfig;
    private terminalElement: HTMLElement | null = null;

    constructor(config: IConfig) {

        this.addonsProvider = new AddonsProvider();
        this.config = config;
    }

    /**
     * Build a XTerminal object with params.
     *
     * @see XTerminalFactoryParams
     *
     * @param params - XTerminalFactoryParams
     * @returns The XTerminal instance
     */
    public build({ config }: XTerminalFactoryParams): XTerminal {

        const options: ITerminalOptions = {
            allowTransparency: true,
            windowsMode: isWin,
        };

        this.factoryObject = new XTerminal(options);
        this.loadConfig(config);

        return this.factoryObject;
    }

    /**
     * Set a option to the xterm instance.
     *
     * @param config - The config to load
     */
    public loadConfig(config: IConfig) {

        this.config = config;

        const terminal = this.getFactoryObject();
        terminal.setOption('bellSound', config.bell.sound);
        terminal.setOption('bellStyle', config.bell.enabled ? 'sound' : 'none');
        terminal.setOption('cursorBlink', config.cursor.blink);
        terminal.setOption('cursorStyle', config.cursor.style);
        terminal.setOption('cursorWidth', config.cursor.width);
        terminal.setOption('fontSize', config.font.size);
        terminal.setOption('fontFamily', config.font.family);
        terminal.setOption('fontWeight', config.font.weight);
        terminal.setOption('fontWeightBold', config.font.weightBold);
        terminal.setOption('letterSpacing', config.font.letterSpacing);
        terminal.setOption('lineHeight', config.font.lineHeight);
        terminal.setOption('scrollSensitivity', config.scroll.sensitivity);
        terminal.setOption('fastScrollSensitivity', config.scroll.fastScrollSensitivity);
        terminal.setOption('fastScrollModifier', config.scroll.fastScrollModifier);
        terminal.setOption('altClickMovesCursor', config.altClickMoveCursor);
        terminal.setOption('theme', {
            ...config.theme,
            background: 'transparent',
        });
    }

    /**
     * Spawn the xterm instance, listen for events and
     * setup addons.
     *
     * @param id - The id of the terminal
     * @param process - The process instance to write on
     * @param onTitle - Called when the title change
     */
    public spawn(id: number, process: ProcessFactory<ProcessType>, onTitle: (title: string) => void) {

        const terminalElement = document.getElementById(`window-${id}`);
        this.terminalElement = terminalElement;

        if(terminalElement)
            this.getFactoryObject().open(terminalElement);

        this.listen(process, onTitle);

        this.addonsProvider.setupAddons(this.config, this.getFactoryObject());
        this.fit();
    }

    /**
     * Listen for events on the xterm instance.
     *
     * @param process - The process instance to write on
     * @param onTitle - Called when the title change
     *
     */
    private listen(process: ProcessFactory<ProcessType>, onTitle: (title: string) => void) {

        this.getFactoryObject().onData((data: string) => {

            process.write(data);
        });

        this.getFactoryObject().onResize((data: {cols: number, rows: number}) => {

            process.resize(
                Math.max(data ? data.cols : this.getFactoryObject().cols, 1),
                Math.max(data ? data.rows : this.getFactoryObject().rows, 1));
        });

        this.getFactoryObject().onTitleChange((title: string) => onTitle(title));
        this.getFactoryObject().onSelectionChange(() => this.copySelected(false));

        window.addEventListener('resize', () => this.fit());
    }

    /**
     * Fit the window thanks to the fit addon. We only fit
     * the terminal if the DOM element is not hidden.
     */
    public fit() {

        if(this.terminalElement?.classList.contains('hidden'))
            return;

        const fitAddon = this.getAddon<FitAddon>(AddonType.FIT);

        fitAddon?.fit();
    }

    /**
     * Retrieve a specific addon with it type to the addon provider.
     *
     * @see AddonType
     *
     * @param addonType - The type of the addon to retrieve
     * @returns The instance of the addon or null if not found.
     */
    private getAddon<T extends ITerminalAddon>(addonType: AddonType): T | null {

        return this.addonsProvider.getAddon(addonType);
    }

    /**
     * Get the instance of the built object.
     *
     * @returns The XTerminal instance
     */
    public getFactoryObject(): XTerminal {

        return this.factoryObject as XTerminal;
    }

    /**
     * Copy the selected text if the config allow it or if we force it.
     *
     * @param force - If we should force the copy
     */
    public copySelected(force: boolean) {

        if(force || this.config.copyOnSelected)
            clipboard.writeText(this.getFactoryObject().getSelection());
    }
}

/**
 * The parameters to build the terminal instance.
 */
export type XTerminalFactoryParams = {

    config: IConfig;
}
