'use strict';

class AppHeader extends HTMLElement { 

    createdCallback() {
        this.classList.add(...AppHeader.CLASSES);
        this.innerHTML = AppHeader.TEMPLATE;

        this.userName = this.querySelector('.header__info--name');
        this.userLocation = this.querySelector('.header__info--location span');
        this.userNumber = this.querySelector('.header__info--number span');
        this.reviewsCount = this.querySelector('.header__review--count');
        this.reviewsStars = this.querySelectorAll('.header__review--stars>.icon');
        this.logoutButton = this.querySelector('.header__button--logout');
        this.uploadCoverPhotoButton = this.querySelector('.header__button--cover-photo');

        // this.headerMenus = this.querySelector('.mdl-tabs__tab');
        // this.headerMenus.addEventListener('click', () => this.changeView());
        this.logoutButton.addEventListener('click', () => this.logout());
        this.uploadCoverPhotoButton.addEventListener('click', () => this.uploadCoverPhoto());

        let user = this.getUserInfo();
        this.userName.textContent = `${user.name}`;
        this.userLocation.textContent = `${user.location}`;
        this.userNumber.textContent = `${user.number}`;
        this.reviewsCount.textContent = `${user.viewsCount} Reviews`;
        this.calcStars(this.reviewsStars, user.stars);
    }

    attributeChangedCallback(attributeName) {
    }

    changeView() {
        alert('clicked');
    }

    getUserInfo() {
        return {
            name: 'Jessica Parker',
            location: 'Newport Beach, CA',
            number: '(949) 325-68594',
            stars: 4,
            viewsCount: 16
        }
    }

    calcStars(starsParent, count) {
        for (let i = 0; i < starsParent.length; i++){
            if ( i < count )
                starsParent[i].classList = ['ion-md-star'];
            else
                starsParent[i].classList = ['ion-md-star-outline'];
        }
    }

    uploadCoverPhoto() {
        alert('should upload cover photo');
    }

    logout() {
        alert('should do logout');
    }
}

// Initial content of the element.
AppHeader.TEMPLATE = `
    <div class="header__title mdl-card__title">
        <button class="header__button--cover-photo mdl-button mdl-js-button">
            <i class="icon ion-md-camera"></i> Upload cover photo
        </button>
    </div>

    <div class="header__details mdl-card__supporting-text mdl-grid">
        <div class="header__details--image-container mdl-cell mdl-cell--12-col-phone mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
            <div class="header__image--profile mdl-shadow--2dp">
                <!-- image will render here via css -->
            </div>
        </div>
        <div class="header__info mdl-cell mdl-cell--12-col-phone mdl-cell--8-col-tablet mdl-cell--9-col-desktop">
            <p class="header__info--name"></p>
            <p class="header__info--location"><i class="icon ion-md-pin"></i><span></span></p>
            <p class="header__info--number"><i class="icon ion-md-call"></i><span></span></p>
        </div>
        <div class="header__review mdl-cell mdl-cell--12-col-phone mdl-cell--8-col-tablet mdl-cell--3-col-desktop">
            <div class="header__review--stars">
                <i class="icon "></i>
                <i class="icon "></i>
                <i class="icon "></i>
                <i class="icon "></i>
                <i class="icon "></i>
            </div>
            <div class="header__review--count">
                
            </div>
        </div>
    </div>

    <div class="header__menus mdl-card__actions mdl-card--border">
        <div class="header__menus--buttons">
            <button class="mdl-button mdl-js-button mdl-button--accent active">
                About
            </button>
            <button class="mdl-button mdl-js-button mdl-button--accent">
                Settings
            </button>
            <button class="mdl-button mdl-js-button mdl-button--accent">
                Option1
            </button>
            <button class="mdl-button mdl-js-button mdl-button--accent">
                Option2
            </button>
            <button class="mdl-button mdl-js-button mdl-button--accent">
                Option3
            </button>
        </div>
        <div class="header__menus--followers">
            <button class="followers__button--add mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
                <i class="material-icons">add</i>
            </button>
            <span class="followers-count">
                <span class="followers-count__number">15</span>
                <span class="followers-count__text">followers</span>
            </span>
        </div>
    </div>
    <div class="mdl-card__menu">
        <button class="header__button--logout mdl-button mdl-js-button">
            LOG OUT
        </button>
    </div>
    `;

AppHeader.CLASSES = ['header', 'demo-card-wide', 'mdl-card', 'mdl-shadow--2dp'];

document.registerElement('app-header', AppHeader);