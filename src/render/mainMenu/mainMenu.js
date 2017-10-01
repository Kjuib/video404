const electron = require('electron');
const _ = require('lodash');

const actions = require('../../shared/actions');
const popup = require('../popup/popup');
const settings = require('../settings/settings');

customElements.define('v-main-menu', class extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `<style>${require('./mainMenu.css')}</style>${require('./mainMenu.html')}`;

        shadowRoot.querySelector('.btnExit').addEventListener('click', () => {
            electron.remote.getCurrentWindow().close();
        });

        this.btnSettings = shadowRoot.querySelector('.btnSettings');
        this.btnSettings.addEventListener('click', () => {
            popup.show('<v-settings></v-settings>');
        });

        this.menu = shadowRoot.querySelector('.mainMenu');

        electron.ipcRenderer.on(actions.loadSettings, (event, settings) => {
            this.loadDirectories(settings.directories);
        });
        electron.ipcRenderer.on(actions.saveSettings, (event, settings) => {
            this.loadDirectories(settings.directories);
        });
        settings.loadSettings();
    }

    loadDirectories(directories) {
        _.forEach(this.menu.querySelectorAll('.dir'), (dirElement) => {
            dirElement.remove();
        });

        const dirClick = function(event) {
            const directoryInfo = _.get(event, 'path[0].dataDirectory');
            if (directoryInfo) {
                electron.ipcRenderer.send(actions.getFiles, directoryInfo);
            } else {
                console.error('Unknown directory');
                console.error('event', event);
            }
        };

        _.forEach(directories, (directory) => {
            const dirElement = document.createElement('button');
            dirElement.dataDirectory = {
                top: directory,
                path: directory.path
            };
            dirElement.classList.add('dir');
            dirElement.innerHTML = directory.name;
            dirElement.addEventListener('click', dirClick);
            this.menu.insertBefore(dirElement, this.btnSettings);
        });
    }
});
