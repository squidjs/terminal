export const typescriptThemeTemplate = (name: string): string => {

    const constName = name.charAt(0).toUpperCase() + name.slice(1) + 'Plugin';

    return `import SquidPlugin from 'squid-packages';

const ${constName}: SquidPlugin = {

    hookConfig: (options) => {

        return {
            ...options,
            param: {
                ...options.param,
                theme: {
                    ...options.param.theme,
                    background: '#',
                    border: '#',
                    text: '#',
                    textHover: '#',
                    foreground: '#',
                    cursor: '#',
                    cursorAccent: '#',
                    selection: '#',
                    black: '#',
                    red: '#',
                    green: '#',
                    yellow: '#',
                    blue: '#',
                    magenta: '#',
                    cyan: '#',
                    white: '#',
                    brightBlack: '#',
                    brightRed: '#',
                    brightGreen: '#',
                    brightYellow: '#',
                    brightBlue: '#',
                    brightMagenta: '#',
                    brightCyan: '#',
                    brightWhite: '#',
                },
            },
        };
    },
}

export default ${constName};`;
}
