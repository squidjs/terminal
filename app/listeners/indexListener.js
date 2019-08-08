const { remote } = require('electron');

const options = document.getElementById('options-btn');
const min = document.getElementById('min-btn');
const max = document.getElementById('max-btn');
const close = document.getElementById('close-btn');

options.addEventListener('click', function(e) {

    e.preventDefault();

    remote.getCurrentWindow().webContents.send('open');
});

min.addEventListener('click', function(e) {

    e.preventDefault();

    remote.getCurrentWindow().minimize();
});

max.addEventListener('click', function(e) {

    e.preventDefault();

    if(!remote.getCurrentWindow().isMaximized())
        remote.getCurrentWindow().maximize();
    else
        remote.getCurrentWindow().unmaximize();
});

close.addEventListener('click', function(e) {

    e.preventDefault();

    remote.getCurrentWindow().close();
});