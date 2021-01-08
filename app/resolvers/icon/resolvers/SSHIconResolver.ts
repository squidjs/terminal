import { ITerminal } from '@app/Terminal';
import { Resolver } from '@common/resolvers/Resolver';
import { UndefinedObject } from '@common/types/types';
import { IconResolverType, SSH_ICON } from '@app/resolvers/icon/IconResolverProvider';
import { isTerminalSSH } from '@common/utils/utils';

export default class SSHIconResolver implements Resolver<ITerminal, IconResolverType> {

    /**
     * Resolve the icon if no other resolver could resolve the icon. This
     * resolver will always return the SSH icon.
     *
     * @param object - The object to resolve
     * @returns The resolved object
     */
    public resolve(object: ITerminal): UndefinedObject<IconResolverType> {

        return SSH_ICON;
    }

    /**
     * Check if we can resolve the ITerminal. We can only use this resolver
     * if the ITerminal object is a ssh terminal, not a shell terminal.
     *
     * @param object - The object to resolve
     * @returns True if this resolver can resolve
     */
    public canResolve(object: ITerminal): boolean {

        return isTerminalSSH(object.terminalType);
    }
}
