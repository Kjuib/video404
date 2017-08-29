const electron = require('electron');
const popup = require('../popup/popup');

customElements.define('v-main-menu', class extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `<style>${require('./mainMenu.css')}</style>${require('./mainMenu.html')}`;

        shadowRoot.querySelector('.btnExit').addEventListener('click', () => {
            electron.remote.getCurrentWindow().close();
        });
        shadowRoot.querySelector('.btnSettings').addEventListener('click', () => {
            popup.show('<v-settings></v-settings>');
        });
    }
});
