import React, { CSSProperties, FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import { AppState, WindowsAction } from '@app/store/types';
import { Dispatch } from 'redux';
import { createWindow } from '@app/store/windows/actions';
import { nextWindowId } from '@common/utils/utils';
import { IWindow } from '@app/Terminal';
import { ConfigContext } from '@ui/contexts/ConfigContext';

interface Props {

    windows: IWindow[];
    logged: boolean;
    dispatch: (action: WindowsAction) => void;
}

const mapStateToProps = (state: AppState) => ({

    windows: state.windows,
    logged: state.logged,
});

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: WindowsAction) => { dispatch(action) } }
}

const SettingsButton: FC<Props> = ({ windows, logged, dispatch }: Props): ReactElement | null => {

    // Open the settings windows on click
    const onClick = () => dispatch(createWindow({

        id: nextWindowId(windows),
        name: 'Settings',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        terminalType: null,
    }));

    return (
        <ConfigContext.Consumer>
            { ({ theme }) => (
                logged ?
                    <button onClick={onClick} className="auth" type="button" style={{ '--color': theme.text, '--hover': theme.textHover } as CSSProperties}>
                        <i className="nf nf-fa-user" style={{ '--color': theme.text, '--hover': theme.textHover } as CSSProperties} />
                    </button>
                    :
                    <button onClick={onClick} className="auth" type="button">
                        <i className="nf nf-fa-user_times" style={{ '--color': theme.text, '--hover': theme.textHover } as CSSProperties} />
                    </button>
            )}
        </ConfigContext.Consumer>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsButton);
