import { IConfig, IShell, ISSHHost } from '@common/config/Config';
import { isMac, isWin } from '@common/utils/utils';
import { IShortcut } from '@common/config/shortcuts';

const bashShell: IShell = {

    name: 'Bash',
    path: 'bash',
}

const cmdShell: IShell = {

    name: 'CMD',
    path: 'cmd.exe',
}

const powerShell: IShell = {

    name: 'PowerShell',
    path: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe',
}

const gitBashShell: IShell = {

    name: 'Git Bash',
    path: 'C:\\Program Files\\Git\\bin\\bash.exe',
}

const wslShell: IShell = {

    name: 'WSL',
    path: 'C:\\Windows\\System32\\wsl.exe',
}

const defaultShell: IShell = {

    name: 'Default',
    path: isWin ? cmdShell.path : bashShell.path,
}

const shells: IShell[] = [];

if(isWin) {

    shells.push(cmdShell);
    shells.push(powerShell);
    shells.push(gitBashShell);
    shells.push(wslShell);

} else
    shells.push(bashShell);

const leader = isMac ? 'Cmd' : 'Ctrl';
const shortcuts: IShortcut[] = [
    {
        keybinds: `${leader}+Shift+T`,
        action: 'terminal:create',
    },
    {
        keybinds: `${leader}+Shift+W`,
        action: 'terminal:close',
    },
    {
        keybinds: `${leader}+Shift+O`,
        action: 'terminal:zoomin',
    },
    {
        keybinds: `${leader}+Shift+P`,
        action: 'terminal:zoomout',
    },
    {
        keybinds: `${leader}+Shift+L`,
        action: 'terminal:left',
    },
    {
        keybinds: `${leader}+Shift+M`,
        action: 'terminal:right',
    },
];

const localSSHHosts: ISSHHost[] = [
    {
        name: 'Default host',
        host: 'hostname',
        port: 22,
        username: 'root',
        password: 'removeIfNotNeeded',
        privateKey: 'removeIfNotNeeded',
    }
];

export const defaultConfig: IConfig = {
    theme: {
        background: '#0F0F0F',
        border: '#575656',
        text: '#575656',
        textHover: '#ffffff',
        foreground: '#22da6e',
        cursor: '#22da6e',
        cursorAccent: '#22da6e',
        selection: '#22da6e',
        black: '#011627',
        red: '#EF5350',
        green: '#22da6e',
        yellow: '#addb67',
        blue: '#82aaff',
        magenta: '#c792ea',
        cyan: '#21c7a8',
        white: '#ffffff',
        brightBlack: '#575656',
        brightRed: '#ef5350',
        brightGreen: '#22da6e',
        brightYellow: '#ffeb95',
        brightBlue: '#82aaff',
        brightMagenta: '#c792ea',
        brightCyan: '#7fdbca',
        brightWhite: '#ffffff',
    },
    defaultShell,
    shells,
    webGlRendering: true,
    copyOnSelected: true,
    restoreWindowPosition: true,
    tabsIcons: true,
    bell: {
        enabled: false,
        sound: '',
    },
    cursor: {
        style: 'block',
        blink: true,
        width: 1,
    },
    font: {
        size: 14,
        family:  'monospace',
        weight: 'normal',
        weightBold: 'bold',
        letterSpacing: 0,
        lineHeight: 1.0,
    },
    scroll: {
        sensitivity: 1,
        fastScrollSensitivity: 5,
        fastScrollModifier: 'shift',
    },
    backgroundImage: {
        enabled: false,
        opacity: 0.5,
        image: '',
    },
    vibrancy: {
        enabled: true,
        theme: 'appearance-based',
        effect: 'acrylic',
        useCustomWindowRefreshMethod: false,
        maximumRefreshRate: 60,
        disableOnBlur: false,
    },
    shortcuts,
    localSSHHosts,
    // TODO
    cloudUrl: '',
}
