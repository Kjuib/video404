const path = require('path');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const _ = require('lodash');

module.exports = (event, data) => {
    let currentPath = path.normalize(data.path);

    return fs.readdirAsync(currentPath).then((fsItems) => {
        return Promise.map(fsItems, (fsItem) => {
            const itemPath = path.join(currentPath, fsItem);
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

                return {
                    top: data.top,
                    path: itemPath,
                    display: displayName,
                    isDirectory: itemDetails.isDirectory(),
                    year: year
                }
            });
        });
    }).then((fileList) => {
        let parentPath = null;
        if (data.top.path !== currentPath) {
            parentPath = path.normalize(path.join(currentPath, '..'));
        }

        const sortedFileList = _.orderBy(fileList, ['isDirectory', 'display'], ['desc', 'asc']);

        return {
            top: data.top,
            filePath: currentPath,
            displayPath: _.replace(currentPath, data.top.path, data.top.name),
            parentPath: parentPath,
            files: sortedFileList
        }
    });
};
