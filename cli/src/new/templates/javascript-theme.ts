// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const javascriptThemeTemplate = (name: string): string => {

    return `module.exports = {

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
}`;
}
