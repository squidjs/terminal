import { app, globalShortcut } from 'electron';
import Settings, {IShortcut, save} from './settings/Settings';
import Window  from './components/Window';

const settings = new Settings();
let window: Window;

app.on('ready', () => {

    window = new Window();

    const shortcuts: IShortcut[] = settings.get('shortcuts');
    shortcuts.forEach(current => globalShortcut.register(current.keys, () => window.getWindow().webContents.send('shortcuts', current.action)));
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
