const { exec } = require('child_process');

module.exports = (event, data) => {
    const run = `omxplayer ${data}`;
    exec('echo ' + run, (err, stdout, stderr) => {
        console.log('err', err);
        console.log('stdout', stdout);
        console.log('stderr', stderr);
    });
};
