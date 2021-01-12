import React, { CSSProperties, FC, ReactElement, useContext, useEffect } from 'react';
import { ISSHHost } from '@common/config/Config';
import { Dispatch } from 'redux';
import { AppState, WindowsAction } from '@app/store/types';
import { connect } from 'react-redux';
import { IWindow, TerminalType } from '@app/Terminal';
import { remote } from 'electron';
import { UndefinedObject } from '@common/types/types';
import { createWindow } from '@app/store/windows/actions';
import { nextWindowId } from '@common/utils/utils';
import electron from 'electron';
import { ConfigContext } from '@ui/contexts/ConfigContext';
const { Menu, MenuItem } = remote;

interface Props {

    windows: IWindow[];
    hosts: ISSHHost[];
    dispatch: (action: WindowsAction) => void;
}

const mapStateToProps = (state: AppState) => ({

    windows: state.windows,
    hosts: state.hosts,
});

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: WindowsAction) => { dispatch(action) } }
}

let menu: UndefinedObject<Electron.Menu>;

const TabCreateTerminal: FC<Props> = ({ windows, hosts: cloudSSHHosts, dispatch }: Props): ReactElement => {

    const config = useContext(ConfigContext);

    /**
     * Update the shells menu if the config or
     * the cloud hosts changed.
     */
    useEffect(() => updateShells(), [config, windows, cloudSSHHosts]);

    /**
     * Update the shells by settings them in a Menu.
     */
    const updateShells = () => {

        menu = new Menu();
        config.shells.forEach((shell) => {

            menu?.append(new MenuItem({

                label: shell.name,
                click: () => createTerminal(shell),
            }));
        });

        const { localSSHHosts } = config;

        if(localSSHHosts && localSSHHosts.length >= 1 || cloudSSHHosts && cloudSSHHosts.length >= 1)
            menu?.append(new MenuItem({ type: 'separator' }));

        buildSubmenu(menu, 'Local SSH Hosts', localSSHHosts);
        buildSubmenu(menu, 'Cloud SSH Hosts', cloudSSHHosts);
    }

    /**
     * Build a submenu for the ssh hosts in the base menu.
     *
     * @param baseMenu - The base menu to append the submenu to
     * @param label - The label of the sybmenu
     * @param hosts - The hosts to use
     */
    const buildSubmenu = (baseMenu: electron.Menu, label: string, hosts: ISSHHost[]) => {

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

        dispatch(createWindow({
            id: nextWindowId(windows),
            name: 'Terminal',
            terminalType,
        }));
    }

    /**
     * Open the shells menu.
     */
    const openShells = () => menu?.popup({ window: remote.getCurrentWindow() });

    return (
        <>
            <button
                type="button"
                className="tab-create"
                onClick={() => createTerminal(config.defaultShell)}
                style={{ '--color': config.theme.text, '--hover': config.theme.textHover } as CSSProperties}>+</button>
            <button
                type="button"
                className="tab-create"
                onClick={() => openShells()}
                style={{ '--color': config.theme.text, '--hover': config.theme.textHover } as CSSProperties}>...</button>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(TabCreateTerminal);
