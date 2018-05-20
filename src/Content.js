'use strict';

class AppContent extends HTMLElement {

    constructor() {
        super();

        this.user = {};
    }

    createdCallback() {
        this.user = this.getUserInfo();

        this.classList.add(...AppContent.CLASSES);
        this.innerHTML = AppContent.TEMPLATE;

        this.mobileEditButton = this.querySelector('.tab-content__button--mobile-edit');
        this.mobileEditButton.addEventListener('click', this.showMoblieForm.bind(this));

        this.mobileFormCanelButton = this.querySelector('.mobile-form-actions__button--cancel');
        this.mobileFormCanelButton.addEventListener('click', this.hideMoblieForm.bind(this));

        this.mobileFormSaveButton = this.querySelector('.mobile-form-actions__button--save');
        this.mobileFormSaveButton.addEventListener('click', this.saveMobileForm.bind(this));

        this.desktopEditField = this.querySelectorAll('.details-field__value--action');
        for (var i = 0; i < this.desktopEditField.length; i++) {
            this.desktopEditField[i].addEventListener('click', this.showDesktopPopover.bind(this));
        }

        this.popoverCanelButton = this.querySelectorAll('.details-field__popover__button--cancel');
        for (var i = 0; i < this.popoverCanelButton.length; i++) {
            this.popoverCanelButton[i].addEventListener('click', this.hideDesktopPopover.bind(this));
        }

        this.popoverSaveButton = this.querySelectorAll('.details-field__popover__button--save');
        for (var i = 0; i < this.popoverSaveButton.length; i++) {
            this.popoverSaveButton[i].addEventListener('click', this.savePopoverValue.bind(this));
        }

        this.nameField = this.querySelector('.field-js-name > .details-field__value--field');
        this.webField = this.querySelector('.field-js-web > .details-field__value--field');
        this.numberField = this.querySelector('.field-js-number > .details-field__value--field');
        this.locationField = this.querySelector('.field-js-location > .details-field__value--field');

        this.nameField.textContent = `${this.user.first_name} ${this.user.last_name}`;
        this.webField.textContent = this.user.web;
        this.numberField.textContent = this.user.number;
        this.locationField.textContent = this.user.location;

    }

    attributeChangedCallback(attributeName) {
    }

    showMoblieForm(evt) {
        let fields = evt.target.closest('.tab-content').querySelectorAll('.mobile-form .mobile-form-field input');
        
        for (var i = 0; i < fields.length; i++) {
            fields[i].value = this.user[fields[i].getAttribute('name')];
            fields[i].parentNode.classList.add('is-dirty');
        }

        evt.target.closest('.details').classList.add('hide');
        evt.target.closest('.tab-content').querySelector('.mobile-form').classList.remove('hide');
    }

    hideMoblieForm(evt) {
        evt.target.closest('.mobile-form').classList.add('hide');
        evt.target.closest('.tab-content').querySelector('.details').classList.remove('hide');
    }

    saveMobileForm(evt) {
        let formFields = evt.target.closest('.tab-content').querySelectorAll('.mobile-form .mobile-form-field input');
        let viewFields = Array.from(evt.target.closest('.tab-content').querySelectorAll('.details .details-field .details-field__value--field'));
        
        for (var i = 0; i < formFields.length; i++) {
            this.user[formFields[i].getAttribute('name')] = formFields[i].value;

            if (formFields[i].getAttribute('name') === 'first_name'){
                viewFields.find(field => field.getAttribute('for') === 'name').textContent = formFields[i].value;
            } else if (formFields[i].getAttribute('name') === 'last_name'){
                viewFields.find(field => field.getAttribute('for') === 'name').textContent += ' ' + formFields[i].value;
            } else {
                viewFields.find(field => field.getAttribute('for') === formFields[i].getAttribute('name')).textContent = formFields[i].value;
            }
        }

        this.hideMoblieForm(evt);
    }

    showDesktopPopover(evt) {
        let fieldType = evt.target.closest('.details-field__value').querySelector('.details-field__value--field').getAttribute('for');
        let popover = evt.target.closest('.details-field').querySelector('.details-field__popover');
        let popoverInput = evt.target.closest('.details-field').querySelector('.details-field__popover .mdl-textfield__input');

        if ( fieldType !== 'name'){
            popoverInput.value = this.user[fieldType];
        } else {
            popoverInput.value = `${this.user['first_name']} ${this.user['last_name']}`;
        }

        popoverInput.parentNode.classList.add('is-dirty');
        popover.classList.add('show');
    }

    hideDesktopPopover(evt) {
        evt.target.closest('.details-field__popover').classList.remove('show');
    }

    savePopoverValue(evt) {
        let popoverInput = evt.target.closest('.details-field__popover').querySelector('.mdl-textfield__input');
        let viewField = evt.target.closest('.details-field').querySelector('.details-field__value--field');

        viewField.textContent = popoverInput.value;
        if (popoverInput.getAttribute('name') !== 'name') {
            this.user[popoverInput.getAttribute('name')] = popoverInput.value;
        }else {
            this.user['first_name'] = popoverInput.value.split(' ')[0];
            this.user['last_name'] = popoverInput.value.split(' ')[1];
        }

        this.hideDesktopPopover(evt);
    }

    getUserInfo() {
        return {
            first_name: 'Joan',
            last_name: 'Doe',
            location: 'Newport Beach, CA',
            web: 'www.seller.com',
            number: '(949) 325-68594'
        }
    }
}

AppContent.TEMPLATE = `
    <div class="tab-content">
        <h6 class="tab-content__header">About</h6>

        <div class="details">
            <button class="tab-content__button--mobile-edit mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
                <i class="icon ion-md-create"></i>
            </button>

            <div class="details-field">
                <div class="details-field__value field-js-name">
                    <span class="details-field__value--field" for="name"></span>
                    <span class="details-field__value--action">
                        <i class="icon ion-md-create"></i>
                    </span>
                </div>
                
                <div class="details-field__popover">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input class="mdl-textfield__input" type="text" name="name">
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
                    <span class="details-field__value--field" for="web"></span>
                    <span class="details-field__value--action">
                        <i class="icon ion-md-create"></i>
                    </span>
                </div>
                
                <div class="details-field__popover">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input class="mdl-textfield__input" type="text" name="web">
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
                    <span class="details-field__value--field" for="number"></span>
                    <span class="details-field__value--action">
                        <i class="icon ion-md-create"></i>
                    </span>
                </div>
                
                <div class="details-field__popover">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input class="mdl-textfield__input" type="text" name="number">
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
                    <span class="details-field__value--field" for="location"></span>
                    <span class="details-field__value--action">
                        <i class="icon ion-md-create"></i>
                    </span>
                </div>
                
                <div class="details-field__popover">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input class="mdl-textfield__input" type="text" name="location">
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

        <div class="mobile-form hide">
            <div class="mobile-form-actions">
                <button class="mobile-form-actions__button--cancel mdl-button mdl-js-button mdl-js-ripple-effect">
                    cancel
                </button>
                <button class="mobile-form-actions__button--save mdl-button mdl-js-button mdl-js-ripple-effect">
                    save
                </button>
            </div>

            <div class="mobile-form-field mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" name="first_name">
                <label class="mdl-textfield__label" for="sample3">First name</label>
            </div>

            <div class="mobile-form-field mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" name="last_name">
                <label class="mdl-textfield__label" for="sample3">Last name</label>
            </div>

            <div class="mobile-form-field mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" name="web">
                <label class="mdl-textfield__label" for="sample3">Website</label>
            </div>

            <div class="mobile-form-field mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" name="number">
                <label class="mdl-textfield__label" for="sample3">Phone number</label>
            </div>

            <div class="mobile-form-field mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" name="location">
                <label class="mdl-textfield__label" for="sample3">City, state & zip</label>
            </div>
        </div>
    </div>
`;

AppContent.CLASSES = ['content', 'demo-card-wide', 'mdl-card', 'mdl-shadow--2dp'];

document.registerElement('app-content', AppContent);