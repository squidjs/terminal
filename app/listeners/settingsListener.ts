import * as fs from 'fs';
import path from 'path';
import { ipcRenderer, remote } from 'electron';
import Settings from '../settings/Settings';

const settings = new Settings();

/*class Shortcut {

    constructor(type) {

        this.type = type;
        this.input = document.querySelector('.shortcuts .' + this.type);

        this.input.addEventListener('change', () => this.update());
    }

    update() {

        ipcRenderer.send('rebind', {

            type: this.type,
            oldAccelerator: settings.get('shortcuts.' + this.type),
            newAccelerator: this.input.value
        });

        settings.set('shortcuts.' + this.type, this.input.value);
    }
}*/

class Option {

    private readonly option: IOptions;
    private button: HTMLElement;
    private content: HTMLElement;

    constructor(option: IOptions) {

        this.option = option;
        this.button = document.getElementById(this.option + '-btn');
        this.content = document.getElementById(this.option);

        this.button.addEventListener('click', (event) => this.toggle(event));
    }

    toggle(event) {

        event.preventDefault();

        for(let i in options) {

            let current = options[i];

            current.button.classList.remove('selected');
            current.content.classList.remove('show');
        }

        this.button.classList.add('selected');
        this.content.classList.add('show');

        fill(this.option);
    }
}

enum IOptions {

    GENERAL = 'General',
    SSH = 'SSH',
    TERMINAL = 'Terminal',
    SHORTCUTS = 'Shortcuts',
    APPARENCE = 'Apparence',
}

const options = [
    new Option(IOptions.GENERAL),
    new Option(IOptions.SSH),
    new Option(IOptions.TERMINAL),
    new Option(IOptions.SHORTCUTS),
    new Option(IOptions.APPARENCE),
];

function fill(option: IOptions) {

    switch (option) {

        case IOptions.GENERAL:

            (<HTMLInputElement>document.getElementById('fontSize')).value = <string>settings.get('font.size');
            (<HTMLInputElement>document.getElementById('fontFamily')).value = <string>settings.get('font.family');
            (<HTMLOptionElement>document.getElementById(<string>settings.get('cursor.style'))).selected = true;
            (<HTMLInputElement>document.getElementById('cursorBlink')).checked = <boolean>settings.get('cursor.blink');

            fillImage();
            break;

        case IOptions.SSH:
            break;

        case IOptions.TERMINAL:

            (<HTMLInputElement>document.getElementById('bash')).value = <string>settings.get('bash');
            break;

        case IOptions.SHORTCUTS:

            /*let shortcuts = settings.get('shortcuts');
            let node = document.querySelector('#shortcuts .sub');

            let listeners = [];

            for(let [type, accelerator] of Object.entries(shortcuts)) {

                if(document.querySelector('.' + type) == null) {

                    let div = document.createElement('div');
                    div.className = 'shortcuts';
                    node.appendChild(div);

                    let label = document.createElement('label');
                    label.for = type;
                    label.innerHTML = type;

                    let shortcut = document.createElement('input');
                    shortcut.className = 'shortcut ' + type;
                    shortcut.value = accelerator;

                    div.appendChild(label);
                    div.appendChild(shortcut);

                    listeners.push(new Shortcut(type));
                }
            }*/
            break;

        case IOptions.APPARENCE:

            fillThemeName();
            fillInputs();
            fillPreview();
            break;
    }
}

function fillImage() {

    let img = <HTMLImageElement>document.getElementById('image');
    let opacity = settings.get('backgroundImage.opacity');
    let deleteBtn = document.getElementById('deleteImage');

    if(!fs.existsSync(<string>settings.get('backgroundImage.path'))) {

        img.style.display = 'none';
        deleteBtn.style.display = 'none';

    } else {

        img.src = <string>settings.get('backgroundImage.opacity');
        img.style.opacity = String(opacity);
        img.style.display = 'block';
        deleteBtn.style.display = 'block';
    }

    (<HTMLInputElement>document.getElementById('backgroundImageOpacity')).value = String(opacity);
}

function fillInputs() {

    (<HTMLInputElement>document.getElementById('background')).value = <string>settings.get('theme.background');
    (<HTMLInputElement>document.getElementById('foreground')).value = <string>settings.get('theme.foreground');
    (<HTMLInputElement>document.getElementById('cursor')).value = <string>settings.get('theme.cursor');

    document.getElementById('background').style.backgroundColor = <string>settings.get('theme.background');
    document.getElementById('foreground').style.backgroundColor = <string>settings.get('theme.foreground');
    document.getElementById('cursor').style.backgroundColor = <string>settings.get('theme.cursor');
}

function fillPreview() {

    document.getElementById('backgroundColor').style.backgroundColor = <string>settings.get('theme.background');
    document.getElementById('foregroundColor').style.color = <string>settings.get('theme.foreground');
    document.getElementById('cursorColor').style.color = <string>settings.get('theme.cursor');
}

function fillThemeName() {

    document.getElementById('themeName').innerHTML = <string>settings.get('theme.name');
}

fill(IOptions.GENERAL);

window.onload = () => {

    /*document.getElementById('fontSize').addEventListener('change', () => settings.set('options.fontSize', (<HTMLInputElement>document.getElementById('fontSize')).value));
    document.getElementById('fontFamily').addEventListener('change', () => settings.set('options.fontFamily', (<HTMLInputElement>document.getElementById('fontFamily')).value));
    let cursorStyle = <HTMLSelectElement>document.getElementById('cursorStyle');
    document.getElementById('cursorStyle').addEventListener('change', () => settings.set('options.cursorStyle', (cursorStyle.options[cursorStyle.selectedIndex]).value));
    document.getElementById('cursorBlink').addEventListener('click', () => settings.set('options.cursorBlink', (<HTMLInputElement>document.getElementById('cursorBlink')).checked));

    document.getElementById('backgroundImage').addEventListener('click', () => {

        remote.dialog.showOpenDialog({

            title: 'Choose a background image',
            filters: [{

               name: 'Images',
               extensions: ['png', 'jpg']
            }],
            properties: ['openFile']
        }, (file) => {

            settings.set('options.backgroundImage', file[0]);

            fillImage();
        });
    });

    document.getElementById('deleteImage').addEventListener('click', () => {

        settings.set('options.backgroundImage', '');

        fillImage();
    });

    document.getElementById('backgroundImageOpacity').addEventListener('change', () => {

        settings.set('options.backgroundImageOpacity', (<HTMLInputElement>document.getElementById('backgroundImageOpacity')).value);

        fillImage();
    });

    document.getElementById('bash').addEventListener('change', () => settings.set('options.bash', (<HTMLInputElement>document.getElementById('bash')).value));
    document.getElementById('devTools').addEventListener('click', () => remote.getCurrentWindow().webContents.openDevTools());

    document.getElementById('theme').addEventListener('click', () => {

        remote.dialog.showOpenDialog({

            title: 'Choose a theme image',
            filters: [{

                name: 'JSON',
                extensions: ['json']
            }],
            properties: ['openFile']
        }, (file) => {

            let theme = JSON.parse(fs.readFileSync(file[0]).toString());

            settings.set('theme', theme);
            settings.set('options.themeName', path.basename(file[0], '.json'));

            fillInputs();
            fillPreview();
            fillThemeName();
        });
    });

    document.getElementById('removeTheme').addEventListener('click', () => {

        settings.set('theme', ipcRenderer.sendSync('removeTheme'));
        settings.set('options.themeName', 'Default');

        fillInputs();
        fillPreview();
        fillThemeName();
    });

    document.getElementById('background').addEventListener('change', () => {

        settings.set('theme.background', (<HTMLInputElement>document.getElementById('background')).value);

        fillPreview();
    });

    document.getElementById('foreground').addEventListener('change', () => {

        settings.set('theme.foreground', (<HTMLInputElement>document.getElementById('foreground')).value);

        fillPreview();
    });

    document.getElementById('cursor').addEventListener('change', () => {

        settings.set('theme.cursor', (<HTMLInputElement>document.getElementById('cursor')).value);

        fillPreview();
    });*/
};
