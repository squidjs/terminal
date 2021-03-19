import { IConfig, IShell, ISSHHost } from '@common/config/Config';
import { isMac, isWin } from '@common/utils/utils';
import { IShortcut } from '@common/shortcuts/shortcuts';

const bashShell: IShell = {

    name: 'Bash',
    path: 'bash',
}

const zshShell: IShell = {

    name: 'ZSH',
    path: '/bin/zsh',
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
    path: isWin ? cmdShell.path : isMac ? zshShell.path : bashShell.path,
}

const shells: IShell[] = [];

if(isMac) {
    shells.push(zshShell);
    shells.push(bashShell);
} else if(isWin) {
    shells.push(cmdShell);
    shells.push(powerShell);
    shells.push(gitBashShell);
    shells.push(wslShell);
} else
    shells.push(bashShell);

const leader = isMac ? 'Cmd' : 'Ctrl';
const shortcuts: IShortcut[] = [
    {
        keybinds: `${leader}+T`,
        action: 'terminal:create',
    },
    {
        keybinds: `${leader}+W`,
        action: 'terminal:close',
    },
    {
        keybinds: `${leader}+numadd`,
        action: 'terminal:zoomin',
    },
    {
        keybinds: `${leader}+numsub`,
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
        background: 'rgba(9, 11, 16, 0.9)',
        border: '#37474F',
        text: '#6b6b6b',
        textHover: '#d0d0d0',
        foreground: '#ECEFF1',
        cursor: '#82AAFF',
        cursorAccent: '#000000',
        selection: '#82AAFF',
        black: '#000000',
        red: '#E54B4B',
        green: '#9ECE58',
        yellow: '#FAED70',
        blue: '#396FE2',
        magenta: '#BB80B3',
        cyan: '#2DDAFD',
        white: '#d0d0d0',
        brightBlack: '#6b6b6b',
        brightRed: '#FF5370',
        brightGreen: '#C3E88D',
        brightYellow: '#FFCB6B',
        brightBlue: '#82AAFF',
        brightMagenta: '#C792EA',
        brightCyan: '#89DDFF',
        brightWhite: '#ffffff'
    },
    defaultShell,
    shells,
    webGlRendering: true,
    copyOnSelected: true,
    restoreWindowPosition: true,
    tabsIcons: true,
    altClickMoveCursor: true,
    vibrancy: true,
    css: '',
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
    shortcuts,
    localSSHHosts,
    // TODO
    cloudUrl: '',
    plugins: [],
}
