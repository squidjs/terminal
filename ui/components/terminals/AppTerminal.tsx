import React, { Component } from 'react';
import Terminal from '../../../app/Terminal';
import { IConfig } from '../../../common/config/Config';
import { UndefinedObject } from '../../../common/types/types';
import DragDrop from './DragDrop';
import { resolveToWSLPath } from '../../../common/utils/utils';
import '../../styles/xterm.scss';

interface Props {

	config: IConfig;
	id: number;
	selected: boolean;
	deleteTerminal: (id: number) => void;
	updateTitle: (id: number, title: string) => void;
}

interface State {

	terminal: UndefinedObject<Terminal>;
}

export default class AppTerminal extends Component<Props, State> {

	constructor(props: Props) {

		super(props);

		this.state = {

			terminal: undefined,
		};
	}

	/**
	 * Try summoning a new terminal if possible.
	 */
	componentDidMount() {

		this.trySummonTerminal();
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

		const className = this.props.selected ? '' : 'hidden';

		return (
			<DragDrop handleDrop={(files) => this.handleDrop(files)}>
				<div className={className} id={`terminal-${this.props.id}`} />
			</DragDrop>
		)
	}

	/**
	 * Summon a terminal, if selected. We also handle the closing of this
	 * terminal.
	 */
	private trySummonTerminal() {

		if(this.props.selected) {

			const { config, id } = this.props;

			const terminal = new Terminal(config, id, () => {

				this.props.deleteTerminal(id);

			}, (title: string) => {

				this.props.updateTitle(id, title);
			});

			this.setState({ terminal });
		}
	}

	/**
	 * Handle files dropping to write the path in the terminal.
	 *
	 * @param files - The dropped file list
	 */
	private handleDrop(files: FileList) {

		if(!this.props.selected)
			return;

		const filesPath = [];

		for(let i = 0; i < files.length; i++)
			filesPath.push(resolveToWSLPath(this.props.config, files[i].path));

		this.state.terminal?.write(filesPath.join(' '));
	}
}
