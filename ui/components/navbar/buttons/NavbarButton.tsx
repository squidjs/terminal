import React, { FC, CSSProperties, ReactElement, useContext } from 'react';
import { ConfigContext } from '@ui/contexts/ConfigContext';

interface Props {

    onClick: () => void;
    path: string;
}

const NavbarButton: FC<Props> = ({ onClick, path }: Props): ReactElement => {

    const { theme } = useContext(ConfigContext);

    return (
        <button onClick={onClick} type="button" style={{ '--color': theme.text, '--hover': theme.textHover } as CSSProperties}>
            <svg height="10" width="10">
                <path d={path} />
            </svg>
        </button>
    );
}

export default NavbarButton;

