import { ISettings } from '../settings/Settings';

export const defaultConfig: ISettings = {
    theme: {
        name: 'default',
        background: '#0F0F0F',
        foreground: '#3fac42',
        cursor: '#3fac42'
    },
    cursor: {
        style: 'block',
        blink: true
    },
    font: {
        size: 13,
        family: 'Fira Code'
    },
    backgroundImage: {
        path: '',
        opacity: 1.0
    },
    bash: '',
    currentTheme: 'default',
    experimentalCharAtlas: 'dynamic',
    shortcuts: [
        {
            keys: 'CommandOrControl+T',
            action: 'openTab'
        },
        {
            keys: 'CommandOrControl+Shift+W',
            action: 'closeTab'
        },
        {
            keys: 'CommandOrControl+Tab',
            action: 'switchTab'
        }
    ]
};
