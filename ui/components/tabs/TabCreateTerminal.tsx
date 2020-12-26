import React, { Component, CSSProperties } from 'react';
import { IConfig } from '../../../common/config/Config';
import { Dispatch } from 'redux';
import { AppState, TerminalsAction } from '../../../app/store/types';
import { createTerminal } from '../../../app/store/terminals/actions';
import { connect } from 'react-redux';
import { ITerminal } from '../../../app/Terminal';

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

	render() {

		return <button
					type="button"
					className="tab-create"
					onClick={() => this.props.dispatch(createTerminal({ name: 'Terminal', id: this.nextId, shell: this.props.config.defaultShell }))}
					style={{ '--color': this.props.config.theme.text, '--hover': this.props.config.theme.textHover } as CSSProperties}>+</button>;
	}

	private get nextId(): number {

		let id = 0;

		while(this.props.terminals.find((current) => current.id === id))
			id++;

		return id;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TabCreateTerminal);
