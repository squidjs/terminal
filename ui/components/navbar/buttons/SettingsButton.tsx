import React, { CSSProperties, FC, ReactElement, useContext } from 'react';
import { connect } from 'react-redux';
import { AppState, WindowsAction } from '@app/store/types';
import { Dispatch } from 'redux';
import { createWindow } from '@app/store/windows/actions';
import { nextWindowId } from '@common/utils/utils';
import { IWindow } from '@app/Terminal';
import { ConfigContext } from '@ui/contexts/ConfigContext';
import { AuthContext } from '@ui/contexts/AuthContext';

interface Props {

    windows: IWindow[];
    dispatch: (action: WindowsAction) => void;
}

const mapStateToProps = (state: AppState) => ({

    windows: state.windows,
});

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: WindowsAction) => { dispatch(action) } }
}

const SettingsButton: FC<Props> = ({ windows, dispatch }: Props): ReactElement | null => {

    const { theme } = useContext(ConfigContext);
    const { auth } = useContext(AuthContext);

    // Open the settings windows on click
    const onClick = () => dispatch(createWindow({

        id: nextWindowId(windows),
        name: 'Settings',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        terminalType: null,
    }));

    return (
        auth ?
            <button onClick={onClick} className="auth" type="button" style={{ '--color': theme.text, '--hover': theme.textHover } as CSSProperties}>
                <i className="nf nf-fa-user" style={{ '--color': theme.text, '--hover': theme.textHover } as CSSProperties} />
            </button>
            :
            <button onClick={onClick} className="auth" type="button">
                <i className="nf nf-fa-user_times" style={{ '--color': theme.text, '--hover': theme.textHover } as CSSProperties} />
            </button>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsButton);
