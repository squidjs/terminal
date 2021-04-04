import React, { FC, ReactElement, useContext } from 'react';
import { ConfigContext } from '@ui/contexts/ConfigContext';

const ButtonSeparator: FC = (): ReactElement => {

    const { theme } = useContext(ConfigContext);

    return <div
        className='button-separator'
        style={{ backgroundColor: theme.border }} />;
}

export default ButtonSeparator;
