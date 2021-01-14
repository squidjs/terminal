import { IWindow } from '@app/Terminal';
import { Resolver } from '@common/resolvers/Resolver';
import { UndefinedObject } from '@common/types/types';
import { IconResolverType, SSH_ICON } from '@app/resolvers/icon/IconResolverProvider';
import { isSettingsWindow, isTerminalSSH } from '@common/utils/utils';

export default class SSHIconResolver implements Resolver<IWindow, IconResolverType> {

    private readonly SSH_REGEX = /^[a-z]+@([a-z]|[A-Z]|[0-9])+:/;
    
    /**
     * Resolve the icon if no other resolver could resolve the icon. This
     * resolver will always return the SSH icon.
     *
     * @param object - The object to resolve
     * @returns The resolved object
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public resolve(object: IWindow): UndefinedObject<IconResolverType> {

        return SSH_ICON;
    }

    /**
     * Check if we can resolve the IWindow. We can only use this resolver
     * if the IWindow object is a ssh terminal, not a shell terminal.
     *
     * @param object - The object to resolve
     * @returns True if this resolver can resolve
     */
    public canResolve(object: IWindow): boolean {

        return !isSettingsWindow(object) && (isTerminalSSH(object.terminalType) || this.SSH_REGEX.test(object.name));
    }
}
