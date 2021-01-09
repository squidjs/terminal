import React, { Component, CSSProperties } from 'react';
import { IWindow } from '@app/Terminal';
import { IConfig } from '@common/config/Config';
import { AppState, SelectedAction, WindowsAction } from '@app/store/types';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setSelected } from '@app/store/selected/actions';
import { deleteWindow } from '@app/store/windows/actions';
import TabIcon from '@ui/components/tabs/TabIcon';

interface Props {

    config: IConfig;
    window: IWindow;
    selected: number;
    dispatch: (action: WindowsAction | SelectedAction) => void;
}

const mapStateToProps = (state: AppState) => ({

    selected: state.selected,
});

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: WindowsAction | SelectedAction) => { dispatch(action) } }
}

class Tab extends Component<Props> {

    componentDidMount() {

        this.props.dispatch(setSelected(this.props.window.id));
    }

    render() {

        let tabTitleClass = 'tab-title';

        if(this.selected)
            tabTitleClass += ' selected';

        return (
            <div
                className="tab"
                onClick={() => this.props.dispatch(setSelected(this.props.window.id))}
                style={{ '--border': this.props.config.theme.border, '--color': this.props.config.theme.text, '--hover': this.props.config.theme.textHover } as CSSProperties}>
                {
                    this.props.config.tabsIcons &&
                        <TabIcon window={this.props.window} />
                }
                <button
                    type="button"
                    className={tabTitleClass}>{this.props.window.name}</button>
                <button
                    type="button"
                    className="tab-close"
                    onClick={() => this.props.dispatch(deleteWindow(this.props.window))}>x</button>
            </div>
        );
    }

    private get selected(): boolean {

        return this.props.selected === this.props.window.id;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
