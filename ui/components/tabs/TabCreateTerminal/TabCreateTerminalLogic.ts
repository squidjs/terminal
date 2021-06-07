import { useContext, useEffect, useRef } from 'react';
import { HostsContext } from '@ui/contexts/HostsContext';
import { WindowsContext } from '@ui/contexts/WindowsContext';
import { ConfigContext } from '@ui/contexts/ConfigContext';
import { Menu as Menutype, remote } from 'electron';
import { ISSHHost } from '@common/config/Config';
import { TerminalType } from '@app/Terminal';
import { nextWindowId } from '@common/utils/utils';
const { Menu, MenuItem } = remote;

const useTabCreateTerminal = () => {

    const { hosts } = useContext(HostsContext);
    const { windows, dispatch } = useContext(WindowsContext);
    const config = useContext(ConfigContext);
    const selected = windows.find((current) => current.selected);

    const menu = useRef<Menutype>();

    /**
     * Update the shells menu if the config , the selected
     * window or the cloud hosts changed.
     */
    useEffect(() => updateShells(), [config, hosts, selected]);

    /**
     * Update the shells by settings them in a Menu.
     */
    const updateShells = () => {

        menu.current = new Menu();
        config.shells.forEach((shell) => {

            menu.current?.append(new MenuItem({

                label: shell.name,
                click: () => createTerminal(shell),
            }));
        });

        const { localSSHHosts } = config;

        if(localSSHHosts && localSSHHosts.length >= 1 || hosts && hosts.length >= 1)
            menu.current?.append(new MenuItem({ type: 'separator' }));

        buildSubmenu(menu.current, 'Local SSH Hosts', localSSHHosts);
        buildSubmenu(menu.current, 'Cloud SSH Hosts', hosts);
    }

    /**
     * Build a submenu for the ssh hosts in the base menu.
     *
     * @param baseMenu - The base menu to append the submenu to
     * @param label - The label of the sybmenu
     * @param hosts - The hosts to use
     */
    const buildSubmenu = (baseMenu: Menutype, label: string, hosts: ISSHHost[]) => {

        if(!hosts || hosts.length < 1)
            return;

        const submenu = new Menu();

        hosts.forEach((sshHost) => {

            submenu.append(new MenuItem({

                label: sshHost.name,
                click: () => createTerminal(sshHost),
            }));
        });

        const subMenuItem = new MenuItem({ label, type: 'submenu', submenu });

        baseMenu.append(subMenuItem);
    }

    /**
     * Create a new terminal with the specified shell.
     *
     * @param terminalType - The terminal type to open
     */
    const createTerminal = (terminalType: TerminalType) => {

        dispatch({
            type: 'CREATE',
            window: {
                id: nextWindowId(windows),
                name: 'Terminal',
                terminalType,
                selected: true,
            },
        });
    }

    /**
     * Open the shells menu.
     */
    const openShells = () => menu.current?.popup({ window: remote.getCurrentWindow() });

    return {
        config,
        createTerminal,
        openShells,
    };
}

export default useTabCreateTerminal;
