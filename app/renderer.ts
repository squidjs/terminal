import { ipcRenderer, remote, clipboard } from 'electron';
import SquidTerminal from './components/SquidTerminal';

const panes: SquidTerminal[] = [];
let currentTerminal: SquidTerminal = null;

function openPane() {

    const terminalId = 'pane-' + panes.length;

    const node = document.getElementById('panel-container');
    const terminalElement = document.createElement('div');
    terminalElement.id = terminalId;
    node.appendChild(terminalElement);

    const terminal: SquidTerminal = new SquidTerminal(terminalId);

    // Set the current pane
    currentTerminal = terminal;
    panes.push(terminal);

    // Toggle visibility
    panes.forEach(current => document.getElementById(current.getTermId()).classList.add('hidden'));
    terminalElement.classList.remove('hidden'); // But show the created pane

    // Spawn all the tabs
    if(panes.length == 2) {

        panes.forEach(current => spawnTab(current));
        document.getElementById('tab-' + currentTerminal.getTermId()).classList.add('active');

    } else if (panes.length > 2) {

        spawnTab(currentTerminal);
        document.querySelectorAll('.tab').forEach(current => current.classList.remove('active'));
        document.getElementById('tab-' + currentTerminal.getTermId()).classList.add('active');
    }

    // Focus the terminal
    currentTerminal.focus();
}

function spawnTab(terminal: SquidTerminal) {

    const node = document.getElementById('tabs-container');
    const tabElement = document.createElement('div');
    tabElement.innerText = 'Terminal';
    tabElement.className = 'tab';
    tabElement.id = 'tab-' + terminal.getTermId();
    node.appendChild(tabElement);

    tabElement.addEventListener('click', () => togglePane(tabElement, terminal));
}

function togglePane(tabElement: HTMLElement, terminal: SquidTerminal) {

    tabElement.classList.add('active');

    // Old pane
    document.getElementById(currentTerminal.getTermId()).classList.add('hidden');
    document.getElementById('tab-' + currentTerminal.getTermId()).classList.remove('active');

    // New pane
    document.getElementById(terminal.getTermId()).classList.remove('hidden');
    document.getElementById('tab-' + terminal.getTermId()).classList.add('active');

    // Focus the term
    terminal.focus();

    currentTerminal = terminal;
}

function closePane() {

    if(panes.length == 1) {

        // Close the app if there is only one tab open
        remote.getCurrentWindow().close();

    } else {

        const termId = currentTerminal.getTermId();

        // Remove pane
        document.getElementById(termId).remove();

        // Remove tab
        document.getElementById('tab-' + termId).remove();

        // Delete the current tab
        panes.splice(panes.indexOf(currentTerminal), 1);

        currentTerminal = panes[0];
        document.getElementById(currentTerminal.getTermId()).classList.remove('hidden');

        if(panes.length > 1)
            document.getElementById('tab-' + currentTerminal.getTermId()).classList.add('active');
        else
            document.querySelectorAll('.tab').forEach(current => current.remove());

        // Focus the terminal
        currentTerminal.focus();
        currentTerminal.fit();
    }
}

function switchPane() {

    if(panes.length > 1) {

        const currentIndex = panes.indexOf(currentTerminal);
        let toIndex;

        if(currentIndex == panes.length - 1)
            toIndex = 0;
        else
            toIndex = currentIndex + 1;

        const terminal: SquidTerminal = panes[toIndex];

        togglePane(document.querySelector('.tab.active'), terminal);
    }
}

ipcRenderer.on('shortcuts', (event, message) => {

    // We don't want to process shortcuts if the window is not focused
    if(!remote.getCurrentWebContents().isFocused())
        return;

    switch (message) {

        case 'paste':
            currentTerminal.onData(clipboard.readText());
            break;

        case 'pane:open':
            openPane();
            break;

        case 'pane:close':
            closePane();
            break;

        case 'pane:switch':
            switchPane();
            break;
    }
});

ipcRenderer.on('update:ready', () => {

    const node = document.getElementById('panel-container');
    const updateElement = document.createElement('div');
    updateElement.innerText = 'Restart to apply update';
    updateElement.className = 'apply-update';
    node.appendChild(updateElement);

    updateElement.addEventListener('click', () => {

        ipcRenderer.send('update:apply');
    });
});

// Open a default pane by default
openPane();

document.addEventListener('contextmenu', (event) => {

    event.preventDefault();
    ipcRenderer.send('contextmenu');
});
