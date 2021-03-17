import SquidPlugin from 'squid-plugins';

const MaterialTheme: SquidPlugin = {

    hookTabIcon: ({ window, icon }) => {

        // nf-fa-terminal is the icon for bash / zsh
        if(icon[0] !== 'nf-fa-terminal')
            return { window, icon };

        // Return our custom icon if we are using bash / zsh
        return {
            window,
            icon: ['nf-mdi-ghost', '#FFFFFF'],
        };
    },
}

export default MaterialTheme;
