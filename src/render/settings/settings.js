const electron = require('electron');
const _ = require('lodash');
const Promise = require('bluebird');

const actions = require('../../shared/actions');
const popup = require('../popup/popup');

module.exports.loadSettings = loadSettings;

customElements.define('v-settings', class extends HTMLElement {
    constructor() {
        super();
        this.settings = null;

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `<style>${require('./settings.css')}</style>${require('./settings.html')}`;

        this.btnCancel = shadowRoot.querySelector('.btnCancel');
        this.btnCancel.addEventListener('click', () => {
            popup.hide();
        });

        this.btnSave = shadowRoot.querySelector('.btnSave');
        this.btnSave.addEventListener('click', () => {
            this.saveSettings();
            popup.hide();
        });

        this.btnAddDirectory = shadowRoot.querySelector('.setDirectories .btnAddDirectory');
        this.btnAddDirectory.tabIndex = 0;
        this.btnAddDirectory.addEventListener('click', () => {
            const newDirectory = document.createElement('v-directory');
            this.directories.appendChild(newDirectory);
        });

        this.directories = shadowRoot.querySelector('.setDirectories .directories');

        this.loadSettings();
    }

    saveSettings() {
        this.settings.directories = _.map(this.directories.children, (directory) => {
            return directory.getValues();
        });

        return new Promise((resolve) => {
            const tempSettings = (event, message) => {
                electron.ipcRenderer.removeListener(actions.saveSettings, tempSettings);
                resolve(message);
            };

            electron.ipcRenderer.on(actions.saveSettings, tempSettings);
            electron.ipcRenderer.send(actions.saveSettings, this.settings);
        });
    }

    loadSettings() {
        return loadSettings().then((newSettings) => {
            this.settings = newSettings;
            return this.settings;
        }).then((settings) => {
            _.forEach(settings.directories, (directoryData) => {
                const newDirectory = document.createElement('v-directory');
                newDirectory.setValues(directoryData);
                this.directories.appendChild(newDirectory);
            });
        });
    }
});

function loadSettings() {
    return new Promise((resolve) => {
        const tempSettings = (event, message) => {
            electron.ipcRenderer.removeListener(actions.loadSettings, tempSettings);
            resolve(message);
        };

        electron.ipcRenderer.on(actions.loadSettings, tempSettings);
        electron.ipcRenderer.send(actions.loadSettings);
    });
}
