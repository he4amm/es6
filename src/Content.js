'use strict';

class AppContent extends HTMLElement {

    createdCallback() {
        this.classList.add(...AppContent.CLASSES);
        this.innerHTML = AppContent.TEMPLATE;
    }

    attributeChangedCallback(attributeName) {
    }
}

AppContent.TEMPLATE = `
    content
`;

AppContent.CLASSES = ['content', 'demo-card-wide', 'mdl-card', 'mdl-shadow--2dp'];

document.registerElement('app-content', AppContent);