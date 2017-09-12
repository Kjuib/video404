customElements.define('v-directory', class extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `<style>${require('./directory.css')}</style>${require('./directory.html')}`;

        shadowRoot.querySelector('.btnRemove').addEventListener('click', () => {
            this.parentNode.removeChild(this);
        });

        this.name = shadowRoot.querySelector('#name');
        this.path = shadowRoot.querySelector('#path');
    }

    getValues() {
        return {
            name: this.name.value,
            path: this.path.value
        };
    }

    setValues(newValues) {
        this.name.value = newValues.name;
        this.path.value = newValues.path;
    }
});
