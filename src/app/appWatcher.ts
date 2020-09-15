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
        this.watchDrop();
    }

    /**
     * Watch the option files.
     */
    private watchOptions() {

        watchForChanges(Options.get().getPath(), (options: IOptions) => {

            Options.get().setOptions(options);

            const opacity: string = String(options.opacity);
            const backgroundColor: string = String(options.theme.background);
            const borderColor: string = String(options.theme.border);

            const currentTerminal: HTMLElement = document.getElementById(`terminal-${this.appTerminal.getId()}`) as HTMLElement;
            currentTerminal.style.opacity = opacity;

            const nav: HTMLElement = document.querySelector('.nav') as HTMLElement;
            nav.style.backgroundColor = backgroundColor;
            nav.style.opacity = opacity;

            const tabs: HTMLElement = document.querySelector('.tabs') as HTMLElement;
            tabs.style.backgroundColor = backgroundColor;
            tabs.style.borderColor = borderColor;
            tabs.style.opacity = opacity;

            const border: HTMLElement = document.querySelector('.border') as HTMLElement;
            border.style.borderColor = borderColor;

            this.appTerminal.applyTheme(options);
            this.appTerminal.setOption('bellSound', options.bell.sound);
            this.appTerminal.setOption('bellStyle', options.bell.style);
            this.appTerminal.setOption('cursorBlink', options.cursor.blink);
            this.appTerminal.setOption('cursorStyle', options.cursor.style);
            this.appTerminal.setOption('fontSize', options.font.size);
            this.appTerminal.setOption('fontFamily', options.font.family);
            this.appTerminal.setOption('fastScrollModifier', options.fastScrollModifier);
            this.appTerminal.setOption('fastScrollSensitivity', options.fastScrollSensitivity);
            this.appTerminal.setOption('scrollSensitivity', options.scrollSensitivity);

            if(options.vibrancyEnabled)
                // @ts-ignore
                remote.getCurrentWindow().setVibrancy(options.vibrancy);
            else
                // @ts-ignore
                remote.getCurrentWindow().setVibrancy();
        });
    }

    /**
     * Watch the context menu actions.
     */
    private watchContextMenu() {

        // Shortcuts
        ipcRenderer.on('shortcuts', (event, message) => {

            switch (message) {

                case 'pane:zoomIn':
                    this.zoomIn();
                    break;

                case 'pane:zoomOut':
                    this.zoomOut();
                    break;

                case 'paste':
                    this.appTerminal.onData(clipboard.readText());
                    break;

                case 'devtools':
                    remote.getCurrentWindow().webContents.openDevTools({ mode: 'detach' });
                    break;
            }
        });
    }

    /**
     * Zoom in the current terminal.
     */
    private zoomIn() {

        const currentZoom: number = this.appTerminal.getOption('fontSize');
        const newZoom: number = currentZoom + 1;

        // Set back the font size
        this.appTerminal.setOption('fontSize', newZoom);
        this.appTerminal.fit();
    }

    /**
     * Zoom out the current terminal.
     */
    private zoomOut() {

        const currentZoom: number = this.appTerminal.getOption('fontSize');
        let newZoom: number = currentZoom - 1;

        if(newZoom <= 0)
            newZoom = 1;

        // Set back the font size
        this.appTerminal.setOption('fontSize', newZoom);
        this.appTerminal.fit();
    }

    /**
     * Watch files/folders dropping.
     */
    private watchDrop() {

        document.addEventListener('drop', (event: DragEvent) => {

            event.preventDefault();
            event.stopPropagation();

            if(event.dataTransfer == null || event.dataTransfer.files.length < 0)
                return;

            let filesPath: string = '';

            // Build the files path separated by a space
            for(let i = 0; i < event.dataTransfer.files.length; i++)
                filesPath += event.dataTransfer.files[i].path + ' ';

            // Write the path to the pty instance
            if(this.appTerminal.isFocused())
                this.appTerminal.onData(filesPath);
        });

        document.addEventListener('dragover', (event: DragEvent) => {

            event.preventDefault();
            event.stopPropagation();
        });
    }
}
