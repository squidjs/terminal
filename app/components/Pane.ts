import Settings, { ISettings } from '../settings/Settings';

export default class Pane {

    protected settings: Settings;
    protected id: number;

    constructor(settings: Settings, id: number) {

        this.settings = settings;
        this.id = id;
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
