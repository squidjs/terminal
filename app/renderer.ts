import { ipcRenderer, clipboard } from 'electron';
import { watchForChanges } from './settings/handler';
import { ISettings } from './settings/Settings';
import Panes from './components/Panes';
import Settings from './settings/Settings';

new class Renderer {

    private readonly settings: Settings;
    private panes: Panes;
    private updateElement: HTMLElement;

    constructor() {

        this.settings = new Settings();
        this.panes = new Panes(this.settings);
        this.updateElement = document.getElementById('update-status');

        this.openPane();
        this.watchForChanges();
        this.setupListeners();
    }

    /**
     * Watch for changes on the settings file
     */
    watchForChanges() {

        if(this.settings.exists()) {

            watchForChanges((newFile: ISettings) => {

                this.panes.setSettings(newFile);
                this.panes.getPanes().forEach(current => current.applySettings(newFile));
            });
        }
    }

    /**
     * Setup the listeners
     */
    setupListeners() {

        // Shortcuts
        ipcRenderer.on('shortcuts', (event, message) => {

            switch (message) {

                case 'paste':
                    this.panes.getCurrentPane().onData(clipboard.readText());
                    break;

                case 'pane:open':
                    this.panes.openPane();
                    break;

                case 'pane:close':
                    this.panes.closePane();
                    break;

                case 'pane:switch':
                    this.panes.switchPane();
                    break;
            }
        });

        // Updates
        ipcRenderer.on('update:latest', () => {

            this.updateElement.innerText = 'You are using the latest version';
            this.updateElement.className = 'uptodate-update';
        });

        ipcRenderer.on('update:download', (event, args) => {

            this.updateElement.innerText = 'Downloading latest version... (' + args + '%)';
            this.updateElement.className = 'downloading-update';
        });

        ipcRenderer.on('update:ready', () => {

            this.updateElement.innerText = 'Restart to apply update';
            this.updateElement.className = 'apply-update';
            this.updateElement.addEventListener('click', () => ipcRenderer.send('update:apply'));
        });

        // Resize
        ipcRenderer.on('resize', () => this.panes.getPanes().forEach(current => current.fit()));

        // Right-click listener
        document.addEventListener('contextmenu', (event) => {

            event.preventDefault();
            ipcRenderer.send('contextmenu');
        });
    }

    /**
     * Open a pane by default
     */
    openPane() {

        this.panes.openPane();
    }
}
