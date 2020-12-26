import React, { Component, CSSProperties } from 'react';
import { IConfig, IShell } from '../../../common/config/Config';
import { Dispatch } from 'redux';
import { AppState, TerminalsAction } from '../../../app/store/types';
import { createTerminal } from '../../../app/store/terminals/actions';
import { connect } from 'react-redux';
import { ITerminal } from '../../../app/Terminal';
import { remote } from 'electron';
import { UndefinedObject } from '../../../common/types/types';
const { Menu, MenuItem } = remote;

interface Props {

	config: IConfig;
	terminals: ITerminal[];
	dispatch: (action: TerminalsAction) => void;
}

const mapStateToProps = (state: AppState) => ({

	terminals: state.terminals,
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
	 * Update the shells menu if the config changed.
	 *
	 * @param prevProps - The previous props
	 */
	componentDidUpdate(prevProps: Readonly<Props>) {

		if(prevProps.config != this.props.config)
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

	private updateShells() {

		this.menu = new Menu();
		this.props.config.shells.forEach((shell) => {

			this.menu?.append(new MenuItem({

				label: shell.name,
				click: () => this.createTerminal(shell),
			}));
		});
	}

	private createTerminal(shell: IShell) {

		this.props.dispatch(createTerminal({

			name: 'Terminal',
			id: this.nextId,
			shell,
		}));
	}

	private openShells() {

		this.menu?.popup({ window: remote.getCurrentWindow() });
	}

	private get nextId(): number {

		let id = 0;

		while(this.props.terminals.find((current) => current.id === id))
			id++;

		return id;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TabCreateTerminal);
