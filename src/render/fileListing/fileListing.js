const electron = require('electron');
const _ = require('lodash');

const actions = require('../../shared/actions');

customElements.define('v-file-listing', class extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `<style>${require('./fileListing.css')}</style>${require('./fileListing.html')}`;

        this.root = shadowRoot.querySelector('.fileListing');

        electron.ipcRenderer.on(actions.getFiles, (event, files) => {
            this.showFiles(files);
        });
    }

    showFiles(files) {
        console.log('files', files);
    }
});
