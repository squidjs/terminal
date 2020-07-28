const electron = require('electron');

// The user data path
export const userDataPath = (electron.app || electron.remote.app).getPath('userData');

export const formatUptime = (sec: number) => {

    const pad = (sec: number) => (sec < 10 ? '0' : '') + sec;

    const hours = Math.floor(sec / (60*60));
    const minutes = Math.floor(sec % (60*60) / 60);
    const seconds = Math.floor(sec % 60);

    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
};