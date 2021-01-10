import { IWindow } from '@app/Terminal';
import { Resolver } from '@common/resolvers/Resolver';
import { UndefinedObject } from '@common/types/types';
import { IconResolverType } from '@app/resolvers/icon/IconResolverProvider';
import { isSettingsWindow } from '@common/utils/utils';

export default class SettingsIconResolver implements Resolver<IWindow, IconResolverType> {

    /**
     * We always return the same icon for the settings window.
     *
     * @param object - The object to resolve
     * @returns The resolved object
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public resolve(object: IWindow): UndefinedObject<IconResolverType> {

        return ['fa-user', '#5D0FAA'];
    }

    /**
     * Check if we can resolve the IWindow. We can only use this resolver
     * if the IWindow object is a settings window.
     *
     * @param object - The object to resolve
     * @returns True if this resolver can resolve
     */
    public canResolve(object: IWindow): boolean {

        return isSettingsWindow(object);
    }
}
