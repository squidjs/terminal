import { useRef } from 'react';
import { remote } from 'electron';
import { UndefinedObject } from '@common/types/types';
import { isDev } from '@common/utils/utils';

/**
 * Get the open path provided from "Open Squid here" integrations.
 *
 * @returns The path to open if found, or undefined else
 */
const useOpenPath = (): UndefinedObject<string> => {

    const firstWindow = useRef(true);
    const openPath = useRef<string>();

    if(!isDev && firstWindow.current && remote.process.argv.length === 3) {

        firstWindow.current = false;
        openPath.current = remote.process.argv[2];

    } else
        openPath.current = undefined;

    return openPath.current;
}

export default useOpenPath;
