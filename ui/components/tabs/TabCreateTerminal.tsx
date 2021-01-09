import React, { Component, CSSProperties } from 'react';
import { IConfig, ISSHHost } from '@common/config/Config';
import { Dispatch } from 'redux';
import { AppState, TerminalsAction } from '@app/store/types';
import { connect } from 'react-redux';
import { ITerminal, TerminalType } from '@app/Terminal';
import { remote } from 'electron';
import { UndefinedObject } from '@common/types/types';
import { createTerminal } from '@app/store/terminals/actions';
import { nextTerminalId } from '@common/utils/utils';
import electron from 'electron';
const { Menu, MenuItem } = remote;

interface Props {

    config: IConfig;
    terminals: ITerminal[];
    hosts: ISSHHost[];
    dispatch: (action: TerminalsAction) => void;
}

const mapStateToProps = (state: AppState) => ({

    terminals: state.terminals,
    hosts: state.hosts,
});

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: TerminalsAction) => { dispatch(action) } }
}

class TabCreateTerminal extends Component<Props> {

    private menu: UndefinedObject<Electron.Menu>;

    constructor(props: Props) {

        super(props);
    }

    /**
     * Set the shells of the menu.
     */
    componentDidMount() {

        this.updateShells();
    }

    /**
     * Update the shells menu if the config or
     * the cloud hosts changed.
     *
     * @param prevProps - The previous props
     */
    componentDidUpdate(prevProps: Readonly<Props>) {

        if(prevProps.config != this.props.config || prevProps.hosts != this.props.hosts)
            this.updateShells();
    }

    render() {

        return (
            <>
                <button
                    type="button"
                    className="tab-create"
                    onClick={() => this.createTerminal(this.props.config.defaultShell)}
                    style={{ '--color': this.props.config.theme.text, '--hover': this.props.config.theme.textHover } as CSSProperties}>+</button>
                <button
                    type="button"
                    className="tab-create"
                    onClick={() => this.openShells()}
                    style={{ '--color': this.props.config.theme.text, '--hover': this.props.config.theme.textHover } as CSSProperties}>...</button>
            </>
        );
    }

    /**
     * Update the shells by settings them in a Menu.
     */
    private updateShells() {

        this.menu = new Menu();
        this.props.config.shells.forEach((shell) => {

            this.menu?.append(new MenuItem({

                label: shell.name,
                click: () => this.createTerminal(shell),
            }));
        });

        const { localSSHHosts } = this.props.config;
        const cloudSSHHosts = this.props.hosts;

        if(localSSHHosts && localSSHHosts.length >= 1 || cloudSSHHosts && cloudSSHHosts.length >= 1)
            this.menu?.append(new MenuItem({ type: 'separator' }));

        this.buildSubmenu(this.menu, 'Local SSH Hosts', localSSHHosts);
        this.buildSubmenu(this.menu, 'Cloud SSH Hosts', cloudSSHHosts);
    }

    /**
     * Build a submenu for the ssh hosts in the base menu.
     *
     * @param baseMenu - The base menu to append the submenu to
     * @param label - The label of the sybmenu
     * @param hosts - The hosts to use
     */
    private buildSubmenu(baseMenu: electron.Menu, label: string, hosts: ISSHHost[]) {

        if(!hosts || hosts.length < 1)
            return;

        const submenu = new Menu();

        hosts.forEach((sshHost) => {

            submenu.append(new MenuItem({

                label: sshHost.name,
                click: () => this.createTerminal(sshHost),
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
    private createTerminal(terminalType: TerminalType) {

        this.props.dispatch(createTerminal({
            id: nextTerminalId(this.props.terminals),
            name: 'Terminal',
            terminalType,
        }));
    }

    /**
     * Open the shells menu.
     */
    private openShells() {

        this.menu?.popup({ window: remote.getCurrentWindow() });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabCreateTerminal);
