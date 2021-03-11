import { IWindow } from '@app/Terminal';
import { Resolver } from '@common/resolvers/Resolver';
import { UndefinedObject } from '@common/types/types';
import { IconResolverType } from '@app/resolvers/icon/IconResolverProvider';

export default class TitleIconResolver implements Resolver<IWindow, IconResolverType> {

    /**
     * Resolve the icon based on the name of the IWindow instance.
     * This is useful to resolve the icon based on the current window
     * title.
     *
     * @param object - The object to resolve
     * @returns The resolved object
     */
    public resolve({ name }: IWindow): UndefinedObject<IconResolverType> {

        let icon: UndefinedObject<IconResolverType>;

        // Tools and CLIs
        if(name.includes('vim'))
            icon = ['custom-vim', '#019833'];
        else if(name.includes('docker'))
            icon = ['linux-docker', '#247ECF'];
        else if(name.includes('brew'))
            icon = ['fa-beer', '#F3AB3E'];
        else if(name.includes('git'))
            icon = ['dev-git', '#E94E31'];
        else if(name.includes('heroku'))
            icon = ['dev-heroku', '#411094'];
        else if(name.includes('electron'))
            icon = ['custom-electron', '#FFFFFF'];
        else if(name.includes('vercel'))
            icon = ['▲', '#FFFFFF', true];

        // Databases
        else if(name.includes('mysql') || name.includes('mariadb'))
            icon = ['dev-mysql', '#31889C'];
        else if(name.includes('msql'))
            icon = ['dev-msql_server', '#B11C1C'];
        else if(name.includes('sqlite'))
            icon = ['dev-sqllite', '#53A6DC'];
        else if(name.includes('postgresql'))
            icon = ['dev-postgresql', '#31648D'];
        else if(name.includes('redis'))
            icon = ['dev-redis', '#D82F27'];
        else if(name.includes('mongo'))
            icon = ['dev-mongodb', '#419432'];

        // Packages manager
        else if(name.includes('yarn'))
            icon = ['dev-javascript', '#E8D44D'];
        else if(name.includes('npm'))
            icon = ['dev-npm', '#C53635'];
        else if(name.includes('cargo'))
            icon = ['dev-rust', '#F84C00'];
        else if(name.includes('composer'))
            icon = ['dev-composer', '#204599'];

        // Languages
        else if(name.includes('php'))
            icon = ['dev-php', '#7377AD'];
        else if(name.includes('node'))
            icon = ['mdi-nodejs', '#6DA55F'];
        else if(name.includes('python'))
            icon = ['dev-python', '#FFD040'];
        else if(name.includes('rust'))
            icon = ['dev-rust', '#F84C00'];
        else if(name.includes('go'))
            icon = ['mdi-language_go', '#2EA8D0'];

        return icon;
    }

    /**
     * Check if we can resolve the IWindow. We want to use this resolver
     * in first so it will always return true.
     *
     * @param object - The object to resolve
     * @returns True if this resolver can resolve
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public canResolve(object: IWindow): boolean {

        return true;
    }
}
