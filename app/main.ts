import { app } from 'electron';
import Settings, { save } from './settings/Settings';
import Window from './components/Window';

const settings = new Settings();
let window: Window;

app.on('ready', () => window = new Window());

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
