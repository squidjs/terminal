import React, { FC, CSSProperties, ReactElement } from 'react';
import { IConfig } from '@common/config/Config';

interface Props {

    config: IConfig;
    onClick: () => void;
    path: string;
}

const NavbarButton: FC<Props> = ({ config, onClick, path }: Props): ReactElement => {

    return (
        <button onClick={onClick} type="button" style={{ '--color': config.theme.text, '--hover': config.theme.textHover } as CSSProperties}>
            <svg height="10" width="10">
                <path d={path} />
            </svg>
        </button>
    );
}

export default NavbarButton;

