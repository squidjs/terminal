const electron = require('electron');

// The user data path
export const userDataPath = (electron.app || electron.remote.app).getPath('userData');
