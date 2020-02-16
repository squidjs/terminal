import * as fs from 'fs';
import path from 'path';
import { ipcRenderer, remote } from 'electron';

const settings = require('electron-settings');

class Option {

    name: string;
    button: HTMLElement;
    content: HTMLElement;

    constructor(name) {

        this.name = name;
        this.button = document.getElementById(this.name + '-btn');
        this.content = document.getElementById(this.name);

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

        fill(this.name);
    }
}

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

let options = [];

options.push(new Option('general'));
options.push(new Option('ssh'));
options.push(new Option('terminal'));
options.push(new Option('shortcuts'));
options.push(new Option('apparence'));

fill('general');

function fill(categorie) {

    if(categorie == 'general') {

        (<HTMLInputElement>document.getElementById('fontSize')).value = settings.get('options.fontSize');
        (<HTMLInputElement>document.getElementById('fontFamily')).value = settings.get('options.fontFamily');
        (<HTMLOptionElement>document.getElementById(settings.get('options.cursorStyle'))).selected = true;
        (<HTMLInputElement>document.getElementById('cursorBlink')).checked = settings.get('options.cursorBlink');

        fillImage();

    } else if(categorie == 'ssh') {



    } else if(categorie == 'terminal') {

        (<HTMLInputElement>document.getElementById('bash')).value = settings.get('options.bash');

    } else if(categorie == 'shortcuts') {

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

    } else if(categorie == 'apparence') {

        fillThemeName();
        fillInputs();
        fillPreview();
    }
}

function fillImage() {

    let img = <HTMLImageElement>document.getElementById('image');
    let opacity = settings.get('options.backgroundImageOpacity');
    let deleteBtn = document.getElementById('deleteImage');

    if(!fs.existsSync(settings.get('options.backgroundImage'))) {

        img.style.display = 'none';
        deleteBtn.style.display = 'none';

    } else {

        img.src = settings.get('options.backgroundImage');
        img.style.opacity = opacity;
        img.style.display = 'block';
        deleteBtn.style.display = 'block';
    }

    (<HTMLInputElement>document.getElementById('backgroundImageOpacity')).value = opacity;
}

function fillInputs() {

    (<HTMLInputElement>document.getElementById('background')).value = settings.get('theme.background');
    (<HTMLInputElement>document.getElementById('foreground')).value = settings.get('theme.foreground');
    (<HTMLInputElement>document.getElementById('cursor')).value = settings.get('theme.cursor');

    document.getElementById('background').style.backgroundColor = settings.get('theme.background');
    document.getElementById('foreground').style.backgroundColor = settings.get('theme.foreground');
    document.getElementById('cursor').style.backgroundColor = settings.get('theme.cursor');
}

function fillPreview() {

    document.getElementById('backgroundColor').style.backgroundColor = settings.get('theme.background');
    document.getElementById('foregroundColor').style.color = settings.get('theme.foreground');
    document.getElementById('cursorColor').style.color = settings.get('theme.cursor');
}

function fillThemeName() {

    document.getElementById('themeName').innerHTML = settings.get('options.themeName');
}

window.onload = () => {

    document.getElementById('fontSize').addEventListener('change', () => settings.set('options.fontSize', (<HTMLInputElement>document.getElementById('fontSize')).value));
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
    });
};
