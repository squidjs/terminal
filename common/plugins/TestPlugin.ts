import { Plugin } from '@common/plugins/Plugin';

const HelloWorld: Plugin = {

    onWindowShow: (window) => {

        console.log(window);
    }
}

export default HelloWorld;
