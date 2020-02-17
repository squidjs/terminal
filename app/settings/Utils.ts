const electron = require('electron');

export const userDataPath = (electron.app || electron.remote.app).getPath('userData');
