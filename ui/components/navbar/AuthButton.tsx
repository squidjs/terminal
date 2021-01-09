import React, { CSSProperties, FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import { AppState, WindowsAction } from '@app/store/types';
import { Dispatch } from 'redux';
import { IConfig } from '@common/config/Config';
import { createWindow } from '@app/store/windows/actions';
import { nextWindowId } from '@common/utils/utils';
import { IWindow } from '@app/Terminal';

interface Props {

    config: IConfig;
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

const AuthButton: FC<Props> = ({ config, windows, logged, dispatch }: Props): ReactElement | null => {

    // Open the settings window on click
    const onClick = () => dispatch(createWindow({

        id: nextWindowId(windows),
        name: 'Settings',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        terminalType: null,
    }));

    if(!logged)
        return (
            <button onClick={onClick} className="auth" type="button">
                <i className="nf nf-fa-user_times" style={{ '--color': config.theme.text, '--hover': config.theme.textHover } as CSSProperties} />
            </button>
        );

    return (
        <button onClick={onClick} className="auth" type="button" style={{ '--color': config.theme.text, '--hover': config.theme.textHover } as CSSProperties}>
            <i className="nf nf-fa-user" style={{ '--color': config.theme.text, '--hover': config.theme.textHover } as CSSProperties} />
        </button>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
