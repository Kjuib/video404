const electron = require('electron');
const Promise = require('bluebird');

const actions = require('../../shared/actions');

module.exports.getSettings = getSettings;
module.exports.loadSettings = loadSettings;
module.exports.saveSettings = saveSettings;

let settings = null;

function getSettings() {
    if (!settings) {
        return loadSettings();
    } else {
        Promise.resolve(settings);
    }
}

function loadSettings() {
    return new Promise((resolve) => {
        const tempSettings = (event, message) => {
            electron.ipcRenderer.removeListener(actions.loadSettings, tempSettings);
            resolve(message);
        };

        electron.ipcRenderer.on(actions.loadSettings, tempSettings);
        electron.ipcRenderer.send(actions.loadSettings);
    }).then((_settings) => {
        settings = _settings;
        return settings;
    });
}

function saveSettings(newSettings) {
    return new Promise((resolve) => {
        const tempSettings = (event, message) => {
            electron.ipcRenderer.removeListener(actions.saveSettings, tempSettings);
            resolve(message);
        };

        electron.ipcRenderer.on(actions.saveSettings, tempSettings);
        electron.ipcRenderer.send(actions.saveSettings, newSettings);
    }).then((_settings) => {
        settings = _settings;
        return settings;
    });
}
