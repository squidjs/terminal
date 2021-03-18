export const javascriptPluginTemplate = (name: string): string => {

    return `module.exports = {

    onLoad: () => {

        console.log('${name} has loaded!');
    },
}`;
}
