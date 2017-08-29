const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const _ = require('lodash');

module.exports = (event, data) => {
    return fs.readdirAsync(data.directory).then((items) => {
        _.forEach(items, (value) => {
            console.log('value', value);
        });
        return items;
    });
};
