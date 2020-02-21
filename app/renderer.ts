import { ipcRenderer, remote } from 'electron';

ipcRenderer.on('shortcuts', (event, message) => {

    // We don't want to process shortcuts if the window is now focused
    if(!remote.getCurrentWebContents().isFocused())
        return;

    switch (message) {

        case 'closeTab':
            break;

        case 'openTab':
          break;

        case 'switchTab':
          break;
    }
});
