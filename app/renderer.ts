import { ipcRenderer, remote, clipboard } from 'electron';
import { loadTheme, watchForChanges } from './settings/handler';
import { ISettings } from './settings/Settings';
import Panes from './components/Panes';

const panes = new Panes();
// Open a new tab by default
panes.openPane();

ipcRenderer.on('shortcuts', (event, message) => {

    // We don't want to process shortcuts if the window is not focused
    if(!remote.getCurrentWebContents().isFocused())
        return;

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

watchForChanges((newFile: ISettings) => {

    panes.getPanes().forEach(current => current.applyNewTheme(loadTheme(newFile.currentTheme)));
});

document.addEventListener('contextmenu', (event) => {

    event.preventDefault();
    ipcRenderer.send('contextmenu');
});

document.addEventListener('resize', () => panes.getPanes().forEach(current => current.fit()));
