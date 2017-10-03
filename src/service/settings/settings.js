const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

module.exports.load = load;
module.exports.save = save;

const homePath = process.env['HOME'] || process.env['USERPROFILE'];
const settingsUrl = homePath + '\\video404.config';

const defaultSettings = {
    playerCommand: '',
    directories: []
};

module.exports.currentSettings = defaultSettings;

function load() {
    return fs.readFileAsync(settingsUrl, 'utf8').then((settingsStr) => {
        return JSON.parse(settingsStr);
    }).then((loadedSettings) => {
        module.exports.currentSettings = loadedSettings;
        return loadedSettings;
    }).catch(() => {
        return defaultSettings;
    });
}

function save(event, newSettings) {
    return new Promise((resolve) => {
        return resolve(JSON.stringify(newSettings));
    }).then((settingsStr) => {
        return fs.writeFileAsync(settingsUrl, settingsStr, 'utf8');
    }).then(() => {
        module.exports.currentSettings = newSettings;
        return newSettings;
    }).catch((error) => {
        console.log('error', error);
        return load();
    });
}
