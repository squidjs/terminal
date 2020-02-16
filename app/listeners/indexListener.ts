const { remote } = require('electron');

const options = document.getElementById('options-btn');
const min = document.getElementById('min-btn');
const max = document.getElementById('max-btn');
const close = document.getElementById('close-btn');

options.addEventListener('click', (e) => {

    e.preventDefault();

    remote.getCurrentWindow().webContents.send('open');
});

min.addEventListener('click', (e) => {

    e.preventDefault();

    remote.getCurrentWindow().minimize();
});

max.addEventListener('click', (e) => {

    e.preventDefault();

    if(!remote.getCurrentWindow().isMaximized())
        remote.getCurrentWindow().unmaximize();
    else
        remote.getCurrentWindow().maximize();
});

close.addEventListener('click', (e) => {

    e.preventDefault();

    remote.getCurrentWindow().close();
});
