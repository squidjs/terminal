import React, { FC, ReactElement } from 'react';
import { ITerminal } from '@app/Terminal';
import Tab from '@ui/components/tabs/Tab';
import TabCreateTerminal from '@ui/components/tabs/TabCreateTerminal';
import { IConfig } from '@common/config/Config';
import { connect } from 'react-redux';
import { AppState } from '@app/store/types';
import '@ui/styles/tabs.scss';
import '@ui/styles/nerdfonts.min.css';

interface Props {

    config: IConfig;
    terminals: ITerminal[];
}

const mapStateToProps = (state: AppState) => ({

    terminals: state.terminals,
});

const Tabs: FC<Props> = ({ config, terminals }: Props): ReactElement => {

    return (
        <div className="tabs">
            {
                terminals.map((terminal) =>
                    <Tab
                        config={config}
                        key={terminal.id}
                        terminal={terminal} />
                )
            }
            <TabCreateTerminal config={config} />
        </div>
    );
}

export default connect(mapStateToProps)(Tabs);
