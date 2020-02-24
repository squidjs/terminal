import { remote } from 'electron';
import Settings, { ISettings } from '../settings/Settings';
import * as dragula from 'dragula';
import { Drake } from 'dragula';
import SquidTerminal from "./SquidTerminal";
import * as os from 'os';

export default class Panes {

    private settings: Settings;
    private panes: SquidTerminal[];
    private currentPane: SquidTerminal;
    private node: HTMLElement;
    private drag: Drake;
    private index: HTMLElement;

    constructor(settings: Settings) {

        this.settings = settings;
        this.panes = [];
        this.currentPane = null;
        this.node = document.getElementById('panel-container');
        this.drag = dragula([document.getElementById('tabs-container')], {
            direction: 'horizontal'
        });
        this.index = document.getElementById('index');

        this.showIndex();

        document.getElementById('open-bash').addEventListener('click', (event) => this.open(event, this.settings.get('bash')));
        document.getElementById('open-default').addEventListener('click', (event) => this.open(event, os.platform() === 'win32' ? 'powershell.exe' : 'bash'));
    }

    /**
     * Open a pane with a bash path
     */
    open(event: MouseEvent, path: string) {

        event.preventDefault();

        this.hideIndex();
        this.currentPane.open(path);
    }

    /**
     * Open a new pane
     */
    openPane() {

        this.showIndex();

        const id = this.findNextID();
        const terminalElement = document.createElement('div');
        terminalElement.id = 'pane-' + id;

        // Add the element to the DOM
        this.node.appendChild(terminalElement);

        const pane = new SquidTerminal(this.settings, id);

        this.addPane(pane);

        // Toggle visibility
        this.panes.forEach(current => document.getElementById(current.getPrefixId()).classList.add('hidden'));
        terminalElement.classList.remove('hidden'); // But show the created pane

        if(this.panes.length == 2) {

            // Create the two tabs
            this.panes.forEach(current => this.createTab(current));
            document.getElementById('tab-' + pane.getId()).classList.add('active');

        } else if(this.panes.length > 2) {

            this.createTab(pane);
            document.querySelectorAll('.tab').forEach(current => current.classList.remove('active'));
            document.getElementById('tab-' + pane.getId()).classList.add('active');
        }
    }

    /**
     * Close the current pane
     */
    closePane() {

        if(this.panes.length == 1) {

            // Close the app if there is only one tab open
            remote.getCurrentWindow().close();

        } else {

            // Remove current pane and tab
            document.getElementById(this.currentPane.getPrefixId()).remove();
            document.getElementById('tab-' + this.currentPane.getId()).remove();

            // Delete the current tab
            this.panes.splice(this.panes.indexOf(this.currentPane), 1);

            // Set the new current pane
            this.currentPane = this.getNextPane();
            document.getElementById(this.currentPane.getPrefixId()).classList.remove('hidden');

            if(this.currentPane.isOpened())
                this.hideIndex();
            else
                this.showIndex();

            if(this.panes.length > 1)
                document.getElementById('tab-' + this.currentPane.getId()).classList.add('active');
            else
                document.querySelectorAll('.tab').forEach(current => current.remove());

            // Focus the new pane
            this.currentPane.adapt();
        }
    }

    /**
     * Switch to the next pane
     */
    switchPane() {

        this.togglePane(document.querySelector('.tab.active'), this.getNextPane());
    }

    getNextPane(): SquidTerminal {

        if(this.panes.length > 1) {

            const currentIndex = this.panes.indexOf(this.currentPane);
            const toIndex = (currentIndex == this.panes.length - 1) ? 0 : currentIndex + 1;

            return this.panes[toIndex];
        }

        return this.panes[0];
    }

    /**
     * Add a new pane and register it to default
     * @param pane
     */
    addPane(pane: SquidTerminal) {

        this.currentPane = pane;
        this.panes.push(pane);

        pane.adapt();
    }

    /**
     * Create a new tab thanks to a pane
     * @param pane
     */
    createTab(pane: SquidTerminal) {

        const node = document.getElementById('tabs-container');
        const tabElement = document.createElement('div');
        tabElement.innerText = 'Terminal';
        tabElement.className = 'tab';
        tabElement.id = 'tab-' + pane.getId();
        node.appendChild(tabElement);

        tabElement.addEventListener('click', () => this.togglePane(tabElement, pane));
    }

    /**
     * Toggle the panes and tabs
     * @param tab
     * @param pane
     */
    togglePane(tab: HTMLElement, pane: SquidTerminal) {

        tab.classList.add('active');

        // Old pane
        document.getElementById(this.currentPane.getPrefixId()).classList.add('hidden');
        document.getElementById('tab-' + this.currentPane.getId()).classList.remove('active');

        // New pane
        document.getElementById(pane.getPrefixId()).classList.remove('hidden');
        document.getElementById('tab-' + pane.getId()).classList.add('active');

        if(pane.isOpened())
            this.hideIndex();
        else
            this.showIndex();

        // Focus the pane
        pane.adapt();

        this.currentPane = pane;
    }

    /**
     * Show the index page
     */
    showIndex() {

        this.index.style.display = 'flex';
    }

    /**
     * Hide the index page
     */
    hideIndex() {

        this.index.style.display = 'none';
    }

    /**
     * Get the current opened pane
     * @return The current pane
     */
    getCurrentPane(): SquidTerminal {

        return this.currentPane;
    }

    /**
     * Get all the panes
     * @return The panes
     */
    getPanes(): SquidTerminal[] {

        return this.panes;
    }

    setSettings(settings: ISettings) {

        this.settings.setSettings(settings);
    }

    /**
     * Find the next id for the pane
     */
    findNextID(): number {

        let id = 0;

        while(document.getElementById('pane-' + id))
            id++;

        return id;
    }
}
