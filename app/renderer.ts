import { ipcRenderer, clipboard } from 'electron';
import { watchForChanges } from './settings/handler';
import { ISettings } from './settings/Settings';
import Panes from './components/Panes';
import Settings from './settings/Settings';

const settings = new Settings();
const panes = new Panes(settings);
// Open a new tab by default
panes.openPane();

const updateElement = document.getElementById('update-status');

watchForChanges((newFile: ISettings) => {

    panes.setSettings(newFile);

    panes.getPanes().forEach(current => {

        current.applySettings(newFile);
    });
});

ipcRenderer.on('shortcuts', (event, message) => {

    switch (message) {

        case 'paste':
            panes.getCurrentPane().onData(clipboard.readText());
            break;

        case 'pane:open':
            panes.openPane();
            break;

        case 'pane:close':
            panes.closePane();
            break;

        case 'pane:switch':
            panes.switchPane();
            break;
    }
});

ipcRenderer.on('update:latest', () => {

    updateElement.innerText = 'You are using the latest version';
    updateElement.className = 'uptodate-update';
});

ipcRenderer.on('update:download', (event, args) => {

    updateElement.innerText = 'Downloading latest version... (' + args + ')';
    updateElement.className = 'downloading-update';
});

ipcRenderer.on('update:ready', () => {

    updateElement.innerText = 'Restart to apply update';
    updateElement.className = 'apply-update';
    updateElement.addEventListener('click', () => ipcRenderer.send('update:apply'));
});

ipcRenderer.on('resize', () => panes.getPanes().forEach(current => current.fit()));

document.addEventListener('contextmenu', (event) => {

    event.preventDefault();
    ipcRenderer.send('contextmenu');
});
