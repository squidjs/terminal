import SquidTerminal from './SquidTerminal';
import { remote } from 'electron';
import Settings, { ISettings } from '../settings/Settings';

export default class Panes {

    private settings: Settings;
    private panes: SquidTerminal[];
    private currentPane: SquidTerminal;
    private node: HTMLElement;

    constructor(settings: Settings) {

        this.settings = settings;
        this.panes = [];
        this.currentPane = null;
        this.node = document.getElementById('panel-container');
    }

    /**
     * Open a new pane
     */
    openPane() {

        const id = this.findNextID();
        const terminalElement = document.createElement('div');
        terminalElement.id = 'pane-' + id;

        // Add the element to the DOM
        this.node.appendChild(terminalElement);

        const terminal = new SquidTerminal(this.settings, id);

        this.addPane(terminal);

        // Toggle visibility
        this.panes.forEach(current => document.getElementById(current.getPrefixTermId()).classList.add('hidden'));
        terminalElement.classList.remove('hidden'); // But show the created pane

        if(this.panes.length == 2) {

            // Create the two tabs
            this.panes.forEach(current => this.createTab(current));
            document.getElementById('tab-' + terminal.getTermId()).classList.add('active');

        } else if(this.panes.length > 2) {

            this.createTab(terminal);
            document.querySelectorAll('.tab').forEach(current => current.classList.remove('active'));
            document.getElementById('tab-' + terminal.getTermId()).classList.add('active');
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
            document.getElementById(this.currentPane.getPrefixTermId()).remove();
            document.getElementById('tab-' + this.currentPane.getTermId()).remove();

            // Delete the current tab
            this.panes.splice(this.panes.indexOf(this.currentPane), 1);

            // Set the new current pane
            this.currentPane = this.getNextPane();
            document.getElementById(this.currentPane.getPrefixTermId()).classList.remove('hidden');

            if(this.panes.length > 1)
                document.getElementById('tab-' + this.currentPane.getTermId()).classList.add('active');
            else
                document.querySelectorAll('.tab').forEach(current => current.remove());

            // Focus the new pane
            this.currentPane.focus();
            this.currentPane.fit();
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

        pane.focus();
        pane.fit();
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
        tabElement.id = 'tab-' + pane.getTermId();
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
        document.getElementById(this.currentPane.getPrefixTermId()).classList.add('hidden');
        document.getElementById('tab-' + this.currentPane.getTermId()).classList.remove('active');

        // New pane
        document.getElementById(pane.getPrefixTermId()).classList.remove('hidden');
        document.getElementById('tab-' + pane.getTermId()).classList.add('active');

        // Focus the term
        pane.focus();
        pane.fit();

        this.currentPane = pane;
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
