import { useContext } from 'react';
import { WindowsContext } from '@ui/contexts/WindowsContext';
import { nextWindowId } from '@common/utils/utils';

const useSettingsButton = () => {

    const { windows, dispatch } = useContext(WindowsContext);

    return () => dispatch({
        type: 'CREATE',
        window: {
            id: nextWindowId(windows),
            name: 'Settings',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            terminalType: null,
            selected: false,
        },
    });
}

export default useSettingsButton;
