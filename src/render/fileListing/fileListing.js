const electron = require('electron');
const _ = require('lodash');

const actions = require('../../shared/actions');

const fileClick = function (event) {
    console.log('event', event);


    const fileInfo = _.get(event, 'path[1].fileInfo') || _.get(event, 'path[0].fileInfo');
    if (fileInfo) {
        console.log('fileInfo', fileInfo);
        electron.ipcRenderer.send(actions.getFiles, fileInfo);
    } else {
        console.error('Unknown directory');
        console.error('event', event);
    }
};

customElements.define('v-file-listing', class extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `<style>${require('./fileListing.css')}</style>${require('./fileListing.html')}`;

        this.filesElement = shadowRoot.querySelector('.files');
        this.titleElement = shadowRoot.querySelector('.title');

        electron.ipcRenderer.on(actions.getFiles, (event, filesData) => {
            this.showFiles(filesData);
        });
    }

    showFiles(filesData) {
        this.titleElement.innerHTML = filesData.displayPath;

        _.forEach(this.filesElement.querySelectorAll('.file'), (fileElement) => {
            fileElement.remove();
        });

        if (filesData.parentPath) {
            this.createButton({
                top: filesData.top,
                display: '..',
                isDirectory: false,
                path: filesData.parentPath,
                isGoingUp: true
            });
        }

        _.forEach(filesData.files, (fileInfo) => {
            this.createButton(fileInfo);
        });

        console.log('files', filesData);
    }

    createButton(fileInfo) {
        let icon = 'fa-play';
        if (fileInfo.isGoingUp) {
            icon = 'fa-reply';
        } else if (fileInfo.isDirectory) {
            icon = 'fa-folder-open-o';
        }

        const goToParent = document.createElement('button');
        goToParent.fileInfo = fileInfo;
        goToParent.classList.add('file');
        goToParent.innerHTML = `<i class="fa ${icon}"></i><span>${fileInfo.display}</span>`;
        goToParent.addEventListener('click', fileClick);
        this.filesElement.appendChild(goToParent);
    }

});
