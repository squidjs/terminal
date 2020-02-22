import { app } from 'electron';
import Settings, { save } from './settings/Settings';
import Window  from './components/Window';
import Updater from './update/Updater';
import ContextMenu from './menus/ContextMenu';

const settings = new Settings();
let window: Window;
let contextMenu: ContextMenu;

app.on('ready', () => {

    window = new Window();
    contextMenu = new ContextMenu(settings.get('shortcuts'), window);

    // Check for updates
    window.getWindow().on('ready-to-show', () => new Updater(window));
});

app.on('window-all-closed', () => {

    // Save settings by default
    save(settings.getPath(), settings.getSettings());

    if(process.platform !== 'darwin')
        app.quit();
});

app.on('activate', () => {

    if(window === null)
        window = new Window();
});
