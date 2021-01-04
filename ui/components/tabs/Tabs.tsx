import React, { Component } from 'react';
import { ITerminal } from '@app/Terminal';
import Tab from '@ui/components/tabs/Tab';
import TabCreateTerminal from '@ui/components/tabs/TabCreateTerminal';
import { IConfig } from '@common/config/Config';
import '@ui/styles/tabs.scss';
import { connect } from 'react-redux';
import { AppState } from '@app/store/types';

interface Props {

	config: IConfig;
	terminals: ITerminal[];
}

const mapStateToProps = (state: AppState) => ({

	terminals: state.terminals,
});

class Tabs extends Component<Props> {

	render() {

		return (
			<div className="tabs">
				{
					this.props.terminals.map((terminal) =>
						<Tab
							config={this.props.config}
							key={terminal.id}
							terminal={terminal} />
					)
				}
				<TabCreateTerminal config={this.props.config} />
			</div>
		)
	}
}

export default connect(mapStateToProps)(Tabs);
