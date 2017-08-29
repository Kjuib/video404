const _ = require('lodash');

const classShow = 'show';

let popup;

module.exports.hide = hide;
module.exports.show = show;

customElements.define('v-popup', class extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `<style>${require('./popup.css')}</style>${require('./popup.html')}`;
        popup = shadowRoot.querySelector('.popup');

        shadowRoot.querySelector('.background').addEventListener('click', () => {
            hide();
        });
    }
});

function show(element) {
    popup.classList.add(classShow);

    const content = popup.querySelector('.content');
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
    if (_.isElement(element)) {
        content.appendChild(element)
    } else {
        content.innerHTML = element;
    }
}

function hide() {
    popup.classList.remove(classShow);
}

