import { IWindow } from '@app/Terminal';
import { Resolver } from '@common/resolvers/Resolver';
import { UndefinedObject } from '@common/types/types';
import { IconResolverType } from '@app/resolvers/icon/IconResolverProvider';
import { isSettingsWindow, isTerminalSSH } from '@common/utils/utils';
import { IShell } from '@common/config/Config';

export default class ShellIconResolver implements Resolver<IWindow, IconResolverType> {

    /**
     * Resolve the icon based on the path of the shell instance.
     * This is useful to resolve the icon based on the current terminal
     * shell path.
     *
     * @param object - The object to resolve
     * @returns The resolved object
     */
    public resolve(object: IWindow): UndefinedObject<IconResolverType> {

        let icon: UndefinedObject<IconResolverType>;
        const path = (object.terminalType as IShell).path;

        if(path.includes('bash') || path.includes('zsh'))
            icon = ['fa-terminal', '#293036']
        else if(path.includes('wsl.exe'))
            icon = ['dev-linux', '#F7F7F7']
        else if(path.includes('cmd.exe'))
            icon = ['custom-windows', '#05A4DF']
        else if(path.includes('powershell.exe'))
            icon = ['dev-terminal', '#0273B7']
        else if(path.includes('bash.exe'))
            icon = ['dev-git', '#E84D31']
 
        return icon;
    }

    /**
     * Check if we can resolve the IWindow. We can only use this resolver
     * if the IWindow object is a shell terminal, not a ssh terminal.
     *
     * @param object - The object to resolve
     * @returns True if this resolver can resolve
     */
    public canResolve(object: IWindow): boolean {

        return !isSettingsWindow(object) && !isTerminalSSH(object.terminalType);
    }
}
