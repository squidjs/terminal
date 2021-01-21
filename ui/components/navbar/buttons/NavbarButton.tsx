import React, { FC, CSSProperties, ReactElement, useContext } from 'react';
import { ConfigContext } from '@ui/contexts/ConfigContext';

interface Props {

    onClick: () => void;
    icon: string;
}

const NavbarButton: FC<Props> = ({ onClick, icon }: Props): ReactElement => {

    const { theme } = useContext(ConfigContext);

    return (
        <button onClick={onClick} className="auth" type="button" style={{ '--color': theme.text, '--hover': theme.textHover } as CSSProperties}>
            <i className={`nf nf-${icon}`} style={{ '--color': theme.text, '--hover': theme.textHover } as CSSProperties} />
        </button>
    );
}

export default NavbarButton;

