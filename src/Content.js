'use strict';

class AppContent extends HTMLElement {

    createdCallback() {
        this.classList.add(...AppContent.CLASSES);
        this.innerHTML = AppContent.TEMPLATE;

        this.desktopEditField = this.querySelectorAll('.details-field__value--action');
        for (var i = 0; i < this.desktopEditField.length; i++) {
            this.desktopEditField[i].addEventListener('click', this.showDesktopPopover);
        }

        this.popoverCanelButton = this.querySelectorAll('.details-field__popover__button--cancel');
        for (var i = 0; i < this.popoverCanelButton.length; i++) {
            this.popoverCanelButton[i].addEventListener('click', this.hideDesktopPopover);
        }

        this.popoverSaveButton = this.querySelectorAll('.details-field__popover__button--save');
        for (var i = 0; i < this.popoverSaveButton.length; i++) {
            this.popoverSaveButton[i].addEventListener('click', this.changeValue);
        }

        this.nameField = this.querySelector('.field-js-name > .details-field__value--field');
        this.webField = this.querySelector('.field-js-web > .details-field__value--field');
        this.numberField = this.querySelector('.field-js-number > .details-field__value--field');
        this.locationField = this.querySelector('.field-js-location > .details-field__value--field');
        let user = this.getUserInfo();
        this.nameField.textContent = user.name;
        this.webField.textContent = user.web;
        this.numberField.textContent = user.number;
        this.locationField.textContent = user.location;

    }

    attributeChangedCallback(attributeName) {
    }

    showDesktopPopover() {
        let value = this.parentNode.querySelector('.details-field__value--field').textContent;
        this.parentNode.parentNode.querySelector('.details-field__popover .mdl-textfield__input').value = value;
        this.parentNode.parentNode.querySelector('.details-field__popover').classList.add('show');
    }

    hideDesktopPopover() {
        this.parentNode.classList.remove('show');
    }

    changeValue() {
        let popoverValue = this.parentNode.querySelector('.mdl-textfield__input').value;
        this.parentNode.parentNode.querySelector('.details-field__value--field').textContent = popoverValue;
        this.parentNode.classList.remove('show');
    }

    getUserInfo() {
        return {
            name: 'Joan Doe',
            location: 'Newport Beach, CA',
            web: 'www.seller.com',
            number: '(949) 325-68594'
        }
    }
}

AppContent.TEMPLATE = `
    <div class="tab-content">
        <h6 class="tab-content__header">About</h6>

        <button class="tab-content__button--mobile-edit mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
            <i class="icon ion-md-create"></i>
        </button>

        <div class="details">
            <div class="details-field">
                <div class="details-field__value field-js-name">
                    <span class="details-field__value--field"></span>
                    <span class="details-field__value--action">
                        <i class="icon ion-md-create"></i>
                    </span>
                </div>
                
                <div class="details-field__popover">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input class="mdl-textfield__input" type="text" id="sample3">
                        <label class="mdl-textfield__label" for="sample3">Name</label>
                    </div>
                    <button class="details-field__popover__button--save mdl-button mdl-js-button mdl-js-ripple-effect">
                        save
                    </button>
                    <button class="details-field__popover__button--cancel mdl-button mdl-js-button mdl-js-ripple-effect">
                        cancel
                    </button>
                </div>
            </div>

            <div class="details-field">
                <div class="details-field__value field-js-web">
                    <span class="details-field__value--icon">
                        <i class="icon ion-md-globe"></i>
                    </span>
                    <span class="details-field__value--field"></span>
                    <span class="details-field__value--action">
                        <i class="icon ion-md-create"></i>
                    </span>
                </div>
                
                <div class="details-field__popover">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input class="mdl-textfield__input" type="text" id="sample3">
                        <label class="mdl-textfield__label" for="sample3">Web</label>
                    </div>
                    <button class="details-field__popover__button--save mdl-button mdl-js-button mdl-js-ripple-effect">
                        save
                    </button>
                    <button class="details-field__popover__button--cancel mdl-button mdl-js-button mdl-js-ripple-effect">
                        cancel
                    </button>
                </div>
            </div>

            <div class="details-field">
                <div class="details-field__value field-js-number">
                    <span class="details-field__value--icon">
                        <i class="icon ion-md-call"></i>
                    </span>
                    <span class="details-field__value--field"></span>
                    <span class="details-field__value--action">
                        <i class="icon ion-md-create"></i>
                    </span>
                </div>
                
                <div class="details-field__popover">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input class="mdl-textfield__input" type="text" id="sample3">
                        <label class="mdl-textfield__label" for="sample3">Number</label>
                    </div>
                    <button class="details-field__popover__button--save mdl-button mdl-js-button mdl-js-ripple-effect">
                        save
                    </button>
                    <button class="details-field__popover__button--cancel mdl-button mdl-js-button mdl-js-ripple-effect">
                        cancel
                    </button>
                </div>
            </div>

            <div class="details-field">
                <div class="details-field__value field-js-location">
                    <span class="details-field__value--icon">
                        <i class="icon ion-md-home"></i>
                    </span>
                    <span class="details-field__value--field"></span>
                    <span class="details-field__value--action">
                        <i class="icon ion-md-create"></i>
                    </span>
                </div>
                
                <div class="details-field__popover">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input class="mdl-textfield__input" type="text" id="sample3">
                        <label class="mdl-textfield__label" for="sample3">City, State & zip</label>
                    </div>
                    <button class="details-field__popover__button--save mdl-button mdl-js-button mdl-js-ripple-effect">
                        save
                    </button>
                    <button class="details-field__popover__button--cancel mdl-button mdl-js-button mdl-js-ripple-effect">
                        cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
`;

AppContent.CLASSES = ['content', 'demo-card-wide', 'mdl-card', 'mdl-shadow--2dp'];

document.registerElement('app-content', AppContent);