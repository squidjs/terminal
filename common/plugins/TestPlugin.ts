import { Plugin } from '@common/plugins/plugin';

const HelloWorld: Plugin = {

    onWindowShow: (window) => {

        console.log(window);
    }
}

export default HelloWorld;
