import * as TabGroup from 'electron-tabs';
import * as dragula from 'dragula';
import { ipcRenderer, remote } from 'electron';

let tabGroup = new TabGroup({

    newTab: {
        title: 'Terminal',
        src: '../ui/terminal.html',
        webviewAttributes: {
          nodeIntegration: 'true'
        },
        visible: true,
        active: true
    },
    ready: (tabGroup) => {

        dragula([tabGroup.tabContainer], {

            direction: 'horizontal'
        });
    }
});

tabGroup.addTab({

    title: 'Terminal',
    src: '../ui/terminal.html',
    webviewAttributes: {
        nodeIntegration: 'true'
    },
    visible: true,
    active: true
});

tabGroup.on('tab-removed', (tab, tabGroup) => {

    if(tabGroup.getActiveTab() == null)
        remote.getCurrentWindow().close();
});

tabGroup.on('tab-added', (tab, tabGroup) => {

    tab.webview.addEventListener("dom-ready", (event) => { tab.webview.blur(); tab.webview.focus(); });
});

ipcRenderer.on('shortcuts', (event, message) => {

    // We don't want to process shortcuts if the window is now focused
    if(!remote.getCurrentWebContents().isFocused())
        return;

    switch (message) {

        case 'closeTab':

            if(tabGroup.getActiveTab().getTitle() == "Welcome" && tabGroup.getTabByRelPosition(1) == null && tabGroup.getTabByRelPosition(-1) == null)
                remote.getCurrentWindow().close();
            else
                tabGroup.getActiveTab().close(true);
            break;

        case 'openTab':

            tabGroup.addTab({

                title: 'Terminal',
                src: '../ui/terminal.html',
                webviewAttributes: {
                    nodeIntegration: 'true'
                },
                visible: true,
                active: true
            });
          break;

        case 'switchTab':

            let tab = tabGroup.getTabByRelPosition(1);

            if(tab != null)
                tab.activate();
            else
                tab = tabGroup.getTabByPosition(1);

            tab.activate();
          break;

        case 'openSettings':

          openSettings();
          break;
    }
});

ipcRenderer.on('open', () => {

    openSettings();
});

function openSettings() {

    let open = true;

    tabGroup.eachTab((currentTab, index, tabs) => {

        if(currentTab.getTitle() == 'Settings') {

          open = false;
          currentTab.activate();
        }
    });

    if(open) {

        tabGroup.addTab({

            title: 'Settings',
            src: '../ui/settings.html',
            webviewAttributes: {
                nodeIntegration: 'true'
            },
            visible: true,
            active: true
        });
    }
}
