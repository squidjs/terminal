const { remote } = require('electron');

const min = document.getElementById('min-btn');
const max = document.getElementById('max-btn');
const closeBtn = document.getElementById('close-btn');

min.addEventListener('click', (e) => {

    e.preventDefault();

    remote.getCurrentWindow().minimize();
});

max.addEventListener('click', (e) => {

    e.preventDefault();

    if(remote.getCurrentWindow().isMaximized())
        remote.getCurrentWindow().restore();
    else
        remote.getCurrentWindow().maximize();
});

closeBtn.addEventListener('click', (e) => {

    e.preventDefault();

    remote.getCurrentWindow().close();
});
