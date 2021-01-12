import React, { CSSProperties, FC, ReactElement, useContext, useEffect } from 'react';
import { IWindow } from '@app/Terminal';
import { AppState, SelectedAction, WindowsAction } from '@app/store/types';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setSelected } from '@app/store/selected/actions';
import { deleteWindow } from '@app/store/windows/actions';
import TabIcon from '@ui/components/tabs/tab/TabIcon';
import { ConfigContext } from '@ui/contexts/ConfigContext';

interface Props {

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

const Tab: FC<Props> = ({ window, selected, dispatch }: Props): ReactElement => {

    const config = useContext(ConfigContext)

    // Set the selected window when mounted
    useEffect(() => {

        dispatch(setSelected(window.id))

    }, []);

    const isSelected = selected === window.id;
    const tabTitleClass = `tab-title${isSelected ? ' selected' : ''}`;

    return (
        <div
            className="tab"
            onClick={() => dispatch(setSelected(window.id))}
            style={{ '--border': config.theme.border, '--color': config.theme.text, '--hover': config.theme.textHover } as CSSProperties}>
            {
                config.tabsIcons &&
                <TabIcon window={window} />
            }
            <button
                type="button"
                className={tabTitleClass}>{window.name}</button>
            <button
                type="button"
                className="tab-close"
                onClick={() => dispatch(deleteWindow(window))}>x</button>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
