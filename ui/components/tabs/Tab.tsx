import React, { Component, CSSProperties } from 'react';
import { ITerminal } from '@app/Terminal';
import { IConfig } from '@common/config/Config';
import { AppState, SelectedAction, TerminalsAction } from '@app/store/types';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setSelected } from '@app/store/selected/actions';
import { deleteTerminal } from '@app/store/terminals/actions';

interface Props {

	config: IConfig;
	terminal: ITerminal;
	selected: number;
	dispatch: (action: TerminalsAction | SelectedAction) => void;
}

const mapStateToProps = (state: AppState) => ({

	selected: state.selected,
});

const mapDispatchToProps = (dispatch: Dispatch) => {

	return { dispatch: (action: TerminalsAction | SelectedAction) => { dispatch(action) } }
}

class Tab extends Component<Props> {

	componentDidMount() {

		this.props.dispatch(setSelected(this.props.terminal.id));
	}

	render() {

		let tabTitleClass = 'tab-title';

		if(this.selected)
			tabTitleClass += ' selected';

		return (
			<div
				className="tab"
				onClick={() => this.props.dispatch(setSelected(this.props.terminal.id))}
				style={{ '--border': this.props.config.theme.border } as CSSProperties}>
				<button
					type="button"
					className={tabTitleClass}
					style={{ '--color': this.props.config.theme.text, '--hover': this.props.config.theme.textHover } as CSSProperties}>{this.props.terminal.name}</button>
				<button
					type="button"
					className="tab-close"
					onClick={() => this.props.dispatch(deleteTerminal(this.props.terminal))}
					style={{ '--color': this.props.config.theme.text, '--hover': this.props.config.theme.textHover } as CSSProperties}>x</button>
			</div>
		);
	}

	private get selected(): boolean {

		return this.props.selected === this.props.terminal.id;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
