import { ipcRenderer, clipboard } from 'electron';
import { watchForChanges } from './settings/handler';
import { ISettings } from './settings/Settings';
import Panes from './components/Panes';
import Settings from './settings/Settings';

const settings = new Settings();
const panes = new Panes(settings);
// Open a new tab by default
panes.openPane();

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

ipcRenderer.on('update:ready', () => {

    const node = document.getElementById('panel-container');
    const updateElement = document.createElement('div');
    updateElement.innerText = 'Restart to apply update';
    updateElement.className = 'apply-update';
    node.appendChild(updateElement);

    updateElement.addEventListener('click', () => ipcRenderer.send('update:apply'));
});

document.addEventListener('contextmenu', (event) => {

    event.preventDefault();
    ipcRenderer.send('contextmenu');
});
