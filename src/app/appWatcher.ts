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
     * @returns void
     */
    private watchOptions(): void {

        watchForChanges(Options.get().getPath(), (options: IOptions) => {

            Options.get().setOptions(options);

            const opacity: string = String(options.opacity);
            const backgroundColor: string = String(options.theme.background);
            const borderColor: string = String(options.theme.border);

            const currentTerminal: HTMLElement = document.getElementById(`terminal-${this.appTerminal.getId()}`) as HTMLElement;
            currentTerminal.style.opacity = opacity;

            const nav: HTMLElement = document.querySelector('.nav') as HTMLElement;
            nav.style.backgroundColor = backgroundColor;

            const tabs: HTMLElement = document.querySelector('.tabs') as HTMLElement;
            tabs.style.backgroundColor = backgroundColor;
            tabs.style.borderColor = borderColor;

            const border: HTMLElement = document.querySelector('.border') as HTMLElement;
            border.style.borderColor = borderColor;

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
     * @returns void
     */
    private watchContextMenu(): void {

        // Shortcuts
        ipcRenderer.on('shortcuts', (event, message) => {

            switch (message) {

                case 'paste':
                    this.appTerminal.onData(clipboard.readText());
                    break;

                case 'devtools':
                    remote.getCurrentWindow().webContents.openDevTools({ mode: 'detach' });
                    break;
            }
        });
    }
}
