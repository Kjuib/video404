const path = require('path');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const _ = require('lodash');

module.exports = (event, data) => {
    return fs.readdirAsync(data.path).then((fsItems) => {
        return Promise.map(fsItems, (fsItem) => {
            const itemPath = path.join(data.path, fsItem);
            return fs.lstatAsync(itemPath).then((itemDetails) => {
                let displayName = fsItem.split('.');
                if (!itemDetails.isDirectory()) {
                    displayName = _.initial(displayName);
                }
                displayName = displayName.join(' ');

                let year = 0;
                if (displayName.match(/\s-\s\d{4}$/)) {
                    const info = displayName.split(' - ');
                    displayName = _.initial(info).join(' - ');
                    year = _.parseInt(_.last(info));
                }

                if (displayName.match(/^[a-z]/)) {
                    displayName = _(displayName)
                        .split(' ')
                        .map(_.capitalize)
                        .join(' ')
                    ;
                }

                console.log('displayName', displayName);

                return {
                    path: itemPath,
                    display: displayName,
                    isDirectory: itemDetails.isDirectory(),
                    year: year
                }
            });
        });
    }).then((fileList) => {
        return {
            top: data.top,
            filePath: data.path,
            displayPath: _.replace(data.path, data.top.path, data.top.name),
            isTop: data.top.path === data.path,
            files: fileList
        }
    });
};
