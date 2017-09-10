const settings = require('./settings');
const popup = require('../popup/popup');

customElements.define('v-settings', class extends HTMLElement {
    constructor() {
        super();
        this.settings = null;

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `<style>${require('./settings.css')}</style>${require('./settings.html')}`;

        this.btnCancel = shadowRoot.querySelector('.btnCancel');
        this.btnCancel.addEventListener('click', () => {
            this.loadSettings();
            popup.hide();
        });

        this.btnSave = shadowRoot.querySelector('.btnSave');
        this.btnSave.addEventListener('click', () => {
            console.log('this.settings', this.settings);
            settings.saveSettings(this.settings).then((newSettings) => {
                console.log('saveSettings', newSettings);
            });
            popup.hide();
        });

        this.loadSettings();
    }

    loadSettings() {
        settings.loadSettings().then((newSettings) => {
            console.log('loadSettings', newSettings);
            this.settings = newSettings;
        });
        // TODO do something with the settings
    }
});
