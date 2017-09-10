const electron = require('electron');
const Promise = require('bluebird');

const actions = require('../shared/actions');

let mainWindow = null;
module.exports.setMainWindow = (newWindow) => {
    mainWindow = newWindow;
};

runAndReturn(actions.getFiles, require('./getFiles'));
runAndReturn(actions.playVideo, require('./playVideo'));
runAndReturn(actions.loadSettings, require('./settings/settings').load);
runAndReturn(actions.saveSettings, require('./settings/settings').save);

function runAndReturn(action, func) {
    electron.ipcMain.on(action, (event, data) => {
        Promise.resolve(func(event, data)).then((response) => {
            mainWindow.webContents.send(action, response);
        }).catch((error) => {
            console.error('============= oops =============');
            console.error(error);
            console.error('================================');
            mainWindow.webContents.send(actions.error, error);
        });
    });
}
