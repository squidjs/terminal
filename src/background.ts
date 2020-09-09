//import 'v8-compile-cache';
import { app } from 'electron';
import AppWindow from '@/app/appWindow';
import Options from '@/options/options';
import ContextMenu from "@/menus/ContextMenu";

// If the app is running in dev mode
const isDevelopment = process.env.NODE_ENV !== 'production';
let appWindow: AppWindow;

// Load the options
const options: Options = new Options();

app.on('ready', async () => {

    // Load the app window
    appWindow = new AppWindow(options.getOptions());

    // Create the context menu
    new ContextMenu(options.getOptions().shortcuts, appWindow.getWindow());
});

app.on('window-all-closed', () => {

    const options = Options.get();

    if(!options.exist())
        options.save();

    if(process.platform !== 'darwin')
        app.quit();
});

app.on('activate', () => {

    if(appWindow.getWindow() === null)
        appWindow = new AppWindow(options.getOptions());
});

if(isDevelopment) {

    if(process.platform === 'win32') {

        process.on('message', data => {

            if(data === 'graceful-exit')
                app.quit()
        });

    } else
        process.on('SIGTERM', () => app.quit());
}
