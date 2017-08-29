customElements.define('v-settings', class extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `<style>${require('./settings.css')}</style>${require('./settings.html')}`;
    }
});
