const moment = require('moment');

customElements.define('v-clock', class extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `<style>${require('./clock.css')}</style>${require('./clock.html')}`;

        const divDate = shadowRoot.querySelector('.date');
        const divTime = shadowRoot.querySelector('.time');

        setInterval(() => {
            const now = moment();

            divDate.innerHTML = now.format('ll');
            divTime.innerHTML = now.format('LTS');
        }, 250);
    }
});
