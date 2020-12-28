import React, { Component } from 'react';
import { Dispatch } from 'redux';
import Terminal, { ITerminal } from '../../../app/Terminal';
import { IConfig } from '../../../common/config/Config';
import { UndefinedObject } from '../../../common/types/types';
import DragDrop from './DragDrop';
import { addQuotes, resolveToWSLPath } from '../../../common/utils/utils';
import '../../styles/xterm.scss';
import { AppState, TerminalsAction } from '../../../app/store/types';
import { connect } from 'react-redux';
import { deleteTerminal, updateTerminal } from '../../../app/store/terminals/actions';
import { ipcRenderer } from 'electron';
import { TerminalShortcuts } from '../../../common/config/shortcuts';

interface Props {

	config: IConfig;
	terminal: ITerminal;
	selected: number;
	dispatch: (action: TerminalsAction) => void;
}

interface State {

	terminal: UndefinedObject<Terminal>;
}

const mapStateToProps = (state: AppState) => ({

	selected: state.selected,
});

const mapDispatchToProps = (dispatch: Dispatch) => {

	return { dispatch: (action: TerminalsAction) => { dispatch(action) } }
}

class AppTerminal extends Component<Props, State> {

	constructor(props: Props) {

		super(props);

		this.state = {

			terminal: undefined,
		};
	}

	/**
	 * Try summoning a new terminal if possible, and
	 * listen for shortcuts. 
	 */
	componentDidMount() {

		this.trySummonTerminal();
		this.listenForShortcuts();
	}

	/**
	 * Remove all listeners on shortcuts channel. 
	 */
	componentWillUnmount() {

		ipcRenderer.removeAllListeners('shortcuts');
	}

	/**
	 * When the component update, we check if the props changed, and if so
	 * we update the config of the state terminal instance.
	 *
	 * @param prevProps - The previous props
	 */
	componentDidUpdate(prevProps: Readonly<Props>) {

		this.state.terminal?.focus();

		if(prevProps.config != this.props.config)
			this.state.terminal?.updateConfig(this.props.config);

		if(!this.state.terminal)
			this.trySummonTerminal();
	}

	render() {

		const className = this.props.selected === this.props.terminal.id ? '' : 'hidden';

		return (
			<DragDrop handleDrop={(files) => this.handleDrop(files)}>
				<div className={className} id={`terminal-${this.props.terminal.id}`} />
			</DragDrop>
		)
	}

	/**
	 * Summon a terminal, if selected. We also handle the closing of this
	 * terminal.
	 */
	private trySummonTerminal() {

		if(this.props.selected === this.props.terminal.id) {

			const { config } = this.props;
			const { shell, id } = this.props.terminal;

			const terminal = new Terminal(config, id, shell, () => {

				this.props.dispatch(deleteTerminal(this.props.terminal));

			}, (name: string) => {

				this.props.dispatch(updateTerminal({ ...this.props.terminal, name }));
			});

			this.setState({ terminal });
		}
	}

	/**
	 * Listen for shortcuts events to zoom in/out
	 * in the terminal instance.
	 */
	private listenForShortcuts() {

		ipcRenderer.on('shortcuts', (event, args) => {

			const shortcut: TerminalShortcuts = args;
			
			if(shortcut && this.props.selected === this.props.terminal.id) {

				switch(shortcut) {

					case 'terminal:zoomin':
						this.state.terminal?.zoom(true);
						break;

					case 'terminal:zoomout':
						this.state.terminal?.zoom(false);
						break;

					default:
						break;
				}
			}
		});

	}

	/**
	 * Handle files dropping to write the path in the terminal.
	 *
	 * @param files - The dropped file list
	 */
	private handleDrop(files: FileList) {

		if(this.props.selected !== this.props.terminal.id)
			return;

		const filesPath = [];

		for(let i = 0; i < files.length; i++) {

			const wslPath = resolveToWSLPath(this.props.terminal, files[i].path);

			filesPath.push(addQuotes(wslPath));
		}

		this.state.terminal?.write(filesPath.join(' '));
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppTerminal);
