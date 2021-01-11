import React, { FC, ReactElement } from 'react';
import { IWindow } from '@app/Terminal';
import Tab from '@ui/components/tabs/tab/Tab';
import TabCreateTerminal from '@ui/components/tabs/TabCreateTerminal';
import { connect } from 'react-redux';
import { AppState } from '@app/store/types';
import '@ui/styles/tabs.scss';
import '@ui/styles/nerdfonts.min.css';
import { ConfigContext } from '@ui/contexts/ConfigContext';

interface Props {

    windows: IWindow[];
}

const mapStateToProps = (state: AppState) => ({

    windows: state.windows,
});

const Tabs: FC<Props> = ({ windows }: Props): ReactElement => {

    return (
        <ConfigContext.Consumer>
            { config => (
                <div className="tabs">
                    {
                        windows.map((window) =>
                            <Tab
                                key={window.id}
                                window={window} />
                        )
                    }
                    <TabCreateTerminal config={config} />
                </div>
            )}
        </ConfigContext.Consumer>
    );
}

export default connect(mapStateToProps)(Tabs);
