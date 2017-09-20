const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const _ = require('lodash');

module.exports = (event, data) => {
    return fs.readdirAsync(data.path).then((fsItems) => {
        return Promise.map(fsItems, (fsItem) => {
            const itemPath = data.path + '/' + fsItem;
            return fs.lstatAsync(itemPath).then((itemDetails) => {
                return {
                    path: itemPath,
                    isDirectory: itemDetails.isDirectory()
                }
            });
        });
    });
};
