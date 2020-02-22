import { app, globalShortcut } from 'electron';
import Settings, { IShortcut, save } from './settings/Settings';
import Window  from './components/Window';
import Updater from './update/Updater';

const settings = new Settings();
let window: Window;

app.on('ready', () => {

    window = new Window();

    const shortcuts: IShortcut[] = settings.get('shortcuts');
    shortcuts.forEach(current => globalShortcut.register(current.keys, () => window.getWindow().webContents.send('shortcuts', current.action)));

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
