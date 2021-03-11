import { IWindow } from '@app/Terminal';
import { Resolver } from '@common/resolvers/Resolver';
import ResolverProvider from '@common/resolvers/ResolverProvider';
import ShellIconResolver from '@app/resolvers/icon/resolvers/ShellIconResolver';
import TitleIconResolver from '@app/resolvers/icon/resolvers/TitleIconResolver';
import SSHIconResolver from '@app/resolvers/icon/resolvers/SSHIconResolver';
import SettingsIconResolver from '@app/resolvers/icon/resolvers/SettingsIconResolver';

// The type of what to resolve in this resolver
export type IconResolverType = [string, string, boolean?];

// Default ssh icon
export const SSH_ICON: IconResolverType = ['fa-server', '#0465B6'];

export default class IconResolverProvider extends ResolverProvider<IWindow, IconResolverType> {

    /**
     * Get all the resolvers to use in this IconResolverProvider.
     *
     * @returns An array of the resolvers to use
     */
    public getResolvers(): Resolver<IWindow, IconResolverType>[] {

        return [

            new TitleIconResolver(),
            new ShellIconResolver(),
            new SSHIconResolver(),
            new SettingsIconResolver(),
        ];
    }
}
