const electron = require('electron');

const fs = require('fs');
const fsString = (module, filename) => {
    module.exports = fs.readFileSync(filename, 'utf8');
};
require.extensions['.txt'] = fsString;
require.extensions['.html'] = fsString;
require.extensions['.css'] = fsString;

const actions = require('../shared/actions');

require('./clock/clock');
require('./mainMenu/mainMenu');
require('./popup/popup');
require('./settings/settings');
require('./settings/directory/directory');

electron.ipcRenderer.on(actions.error, (event, message) => {
    console.error(message);
});
electron.ipcRenderer.on(actions.getFiles, (event, message) => {
    console.log(message);
});

// electron.ipcRenderer.send(actions.getFiles, {
//     directory: 'C:\\Users\\hbillings\\Downloads'
// });

