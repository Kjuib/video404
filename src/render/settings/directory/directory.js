customElements.define('v-directory', class extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `<style>${require('./directory.css')}</style>${require('./directory.html')}`;
    }
});
