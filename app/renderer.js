const TabGroup = require('electron-tabs');
const dragula = require('dragula');

const { ipcRenderer, remote } = require('electron');

let tabGroup = new TabGroup({

    newTab: {
        title: 'Terminal',
        src: '../views/terminal.html',
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

    title: 'Welcome',
    src: '../views/welcome.html',
    visible: true,
    active: true
});

tabGroup.on('tab-removed', (tab, tabGroup) => {

    if(tabGroup.getActiveTab() == null)
        remote.getCurrentWindow().close();
});

ipcRenderer.on('keypress', (event, message) => {

    switch (message) {

        case 'closeTab':

            if(tabGroup.getActiveTab().getTitle() == "Welcome" && tabGroup.getNextTab() == null && tabGroup.getPreviousTab() == null)
                remote.getCurrentWindow().close();
            else
                tabGroup.getActiveTab().close(true);
            break;

        case 'openTab':

            tabGroup.addTab({

                title: 'Terminal',
                src: '../views/terminal.html',
                visible: true,
                active: true
            });
          break;

        case 'switchTab':

            let tab = tabGroup.getNextTab();

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
            src: '../views/settings.html',
            visible: true,
            active: true
        });
    }
}