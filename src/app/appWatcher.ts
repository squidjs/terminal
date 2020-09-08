import AppTerminal from '@/app/appTerminal';
import { watchForChanges } from '@/options/watcher';
import Options, { IOptions } from '@/options/options';
import { clipboard, ipcRenderer, remote } from 'electron';

export default class AppWatcher {

    // The app terminal instance
    private appTerminal: AppTerminal;

    constructor(appTerminal: AppTerminal) {

        this.appTerminal = appTerminal;

        this.watchOptions();
        this.watchContextMenu();
    }

    /**
     * Watch the option files
     *
     * @return void
     */
    private watchOptions(): void {

        watchForChanges(Options.get().getPath(), (options: IOptions) => {

            Options.get().setOptions(options);

            // @ts-ignore
            document.getElementById(`terminal-${this.appTerminal.getId()}`).style.opacity = String(options.opacity);
            (<HTMLElement>document.querySelector('.nav')).style.backgroundColor = String(options.theme.background);
            (<HTMLElement>document.querySelector('.tabs')).style.backgroundColor = String(options.theme.background);
            (<HTMLElement>document.querySelector('.tabs')).style.borderColor = String(options.theme.border);
            (<HTMLElement>document.querySelector('.border')).style.borderColor = String(options.theme.border);
            (<HTMLElement>document.querySelector('.bottom-nav')).style.backgroundColor = String(options.theme.background);

            this.appTerminal.applyTheme(options.theme);
            this.appTerminal.setOption('cursorBlink', options.cursor.blink);
            this.appTerminal.setOption('cursorStyle', options.cursor.style);
            this.appTerminal.setOption('fontSize', options.font.size);
            this.appTerminal.setOption('fontFamily', options.font.family);
            this.appTerminal.setOption('fastScrollModifier', options.fastScrollModifier);
        });
    }

    /**
     * Watch the context menu actions
     *
     * @return void
     */
    private watchContextMenu(): void {

        // Shortcuts
        ipcRenderer.on('shortcuts', (event, message) => {

            switch (message) {

                case 'paste':
                    this.appTerminal.onData(clipboard.readText());
                    break;

                case 'devtools':
                    remote.getCurrentWindow().webContents.openDevTools({mode: 'detach'});
                    break;
            }
        });
    }
}
