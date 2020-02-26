import Settings, { ISettings } from '../settings/Settings';

export default class Pane {

    protected settings: Settings;
    protected id: number;
    protected opened: boolean;

    constructor(settings: Settings, id: number) {

        this.settings = settings;
        this.id = id;
        this.opened = false;
    }

    /**
     * Return if the pane is opened or in the index
     * @return If the pane is opened
     */
    isOpened(): boolean {

        return this.opened;
    }

    /**
     * Set the pane to opened
     */
    setOpened() {

        this.opened = true;
    }

    /**
     * Apply the new settings
     * @param settings
     */
    onApplySettings(settings: ISettings) { }

    /**
     * Return the terminal id
     * @return string
     */
    getId(): number {

        return this.id;
    }

    /**
     * Return the terminal id with 'pane-'
     * @return string
     */
    getPrefixId(): string {

        return 'pane-' + this.getId();
    }
}
