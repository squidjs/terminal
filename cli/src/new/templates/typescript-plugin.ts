export const typescriptPluginTemplate = (name: string): string => {

    const constName = name.charAt(0).toUpperCase() + name.slice(1) + 'Plugin';

    return `import SquidPlugin from 'squid-plugins';

const ${constName}: SquidPlugin = {

    onLoad: () => {

        console.log('${name} has loaded!');
    },
}

export default ${constName};`;
}
