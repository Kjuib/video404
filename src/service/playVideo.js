const { exec } = require('child_process');
const Promise = require('bluebird');
const _ = require('lodash');

const settings = require('./settings/settings');

module.exports = (event, fileInfo) => {
    console.log('fileInfo', fileInfo);

    let playerCommand = settings.currentSettings.playerCommand || '';
    if (!_.includes(playerCommand, '{{videoPath}}')) {
        playerCommand += ' "{{videoPath}}"';
    }
    const run = _.replace(playerCommand, '{{videoPath}}', fileInfo.path);

    return new Promise((resolve, reject) => {
        exec(run, (err, stdout, stderr) => {
            console.log('err', err);
            console.log('stdout', stdout);
            console.log('stderr', stderr);

            if (err) {
                reject(stderr);
            }

            resolve(stdout);
        });
    });
};
