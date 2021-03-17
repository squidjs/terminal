import SquidPlugin from 'squid-plugins';

const MaterialTheme: SquidPlugin = {

    hookTabIcon: (options) => {

        return {
            ...options,
            icon: ['nf-mdi-ghost', '#FFFFFF'],
        };
    },

    hookConfig: (options) => {

        return {
            ...options,
            param: {
                ...options.param,
                theme: {
                    ...options.param.theme,
                    background: '#263238',
                    border: '#2E3C43',
                    text: '#425B67',
                    textHover: '#B0BEC5',
                    foreground: '#B0BEC5',
                    cursor: '#009688',
                    cursorAccent: '#1E272C',
                    selection: '#546E7A',
                    black: '#1E272C',
                    red: '#f78c6c',
                    green: '#c3e88d',
                    yellow: '#ffcb6b',
                    blue: '#82aaff',
                    magenta: '#c792ea',
                    cyan: '#89ddff',
                    white: '#eeffff',
                    brightBlack: '#1E272C',
                    brightRed: '#f78c6c',
                    brightGreen: '#c3e88d',
                    brightYellow: '#ffcb6b',
                    brightBlue: '#82aaff',
                    brightMagenta: '#c792ea',
                    brightCyan: '#89ddff',
                    brightWhite: '#eeffff',
                },
            },
        };
    },
}

export default MaterialTheme;
