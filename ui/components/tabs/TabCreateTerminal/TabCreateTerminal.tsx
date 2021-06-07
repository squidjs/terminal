import React, { CSSProperties, FC, ReactElement } from 'react';
import useTabCreateTerminal from '@ui/components/tabs/TabCreateTerminal/TabCreateTerminalLogic';

const TabCreateTerminal: FC = (): ReactElement => {

    const { config, createTerminal, openShells } = useTabCreateTerminal();

    return (
        <>
            <button
                type="button"
                className="tab-create"
                onClick={() => createTerminal(config.defaultShell)}
                style={{ '--color': config.theme.text, '--hover': config.theme.textHover } as CSSProperties}>+</button>
            <button
                type="button"
                className="tab-create"
                onClick={() => openShells()}
                style={{ '--color': config.theme.text, '--hover': config.theme.textHover } as CSSProperties}>...</button>
        </>
    );
}

export default TabCreateTerminal;
