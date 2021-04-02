import { callTrigger } from '@common/packages/packages';
import { TabIconParam } from '@common/packages/package';
import { IWindow } from '@app/Terminal';
import ResolverProvider from '@common/resolvers/ResolverProvider';
import IconResolverProvider, { IconResolverType } from '@app/resolvers/icon/IconResolverProvider';

const useTabIcon = (window: IWindow) => {

    const resolver: ResolverProvider<IWindow, IconResolverType> = new IconResolverProvider();

    const { icon } = callTrigger('hookTabIcon', {
        window,
        icon: resolver.resolve(window),
    } as TabIconParam);

    return icon;
}

export default useTabIcon;
