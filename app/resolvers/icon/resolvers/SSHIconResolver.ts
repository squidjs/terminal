import { IWindow } from '@app/Terminal';
import { Resolver } from '@common/resolvers/Resolver';
import { UndefinedObject } from '@common/types/types';
import { IconResolverType, SSH_ICON } from '@app/resolvers/icon/IconResolverProvider';
import { isSettingsWindow, isTerminalSSH } from '@common/utils/utils';

export default class SSHIconResolver implements Resolver<IWindow, IconResolverType> {

    /**
     * Resolve the icon if no other resolver could resolve the icon. This
     * resolver will always return the SSH icon.
     *
     * @param object - The object to resolve
     * @returns The resolved object
     */
    public resolve(object: IWindow): UndefinedObject<IconResolverType> {

        return SSH_ICON;
    }

    /**
     * Check if we can resolve the ITerminal. We can only use this resolver
     * if the ITerminal object is a ssh terminal, not a shell terminal.
     *
     * @param object - The object to resolve
     * @returns True if this resolver can resolve
     */
    public canResolve(object: IWindow): boolean {

        return !isSettingsWindow(object) && isTerminalSSH(object.terminalType);
    }
}
