import { AppHeader } from "./Header";
import { AppContent } from "./Content";

class MyApp {
    constructor() {
        this.xDown = null;
        this.yDown = null;  

        this.tabContents = document.querySelectorAll('.content > .tab-content');
        for (let tab of this.tabContents) {
            tab.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
            tab.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
        }

        this.tabButtons = document.querySelectorAll('.header__menus--buttons > a');
        for (let button of this.tabButtons){
            button.addEventListener('click', this.activeTabContent.bind(this));
        }
    }

    activeTabContent(evt) {
        let tabID = evt.target.href.split('#')[1];

        this.showTab(tabID);

        evt.preventDefault();
    }

    showTab(id) {
        let targetedBtn;

        this.tabContents.forEach((tab) => {
            tab.classList.remove('active');
        });
        document.getElementById(id).classList.add('active');

        this.tabButtons.forEach((button) => {
            if (button.href.split('#')[1] === id) targetedBtn = button;
            button.classList.remove('active');
        });
        targetedBtn.classList.add('active');
        targetedBtn.focus();
    }

    handleSwipAction(evt, direction) {
        let tabContent = evt.target.closest('.tab-content');
        let tabID = tabContent.id;

        if (direction === 'right') {
            if (tabID === this.tabContents[0].id)
                this.showTab(this.tabContents[this.tabContents.length - 1].id);
            else
                this.showTab(tabContent.previousElementSibling.id);
        } else if (direction === 'left') {
            if (tabID === this.tabContents[this.tabContents.length - 1].id)
                this.showTab(this.tabContents[0].id);
            else
                this.showTab(tabContent.nextElementSibling.id);
        }
    }

    handleTouchStart(evt) {
        this.xDown = evt.touches[0].clientX;
        this.yDown = evt.touches[0].clientY;
    }

    handleTouchMove(evt) {
        if (!this.xDown || !this.yDown) {
            return;
        }

        let xUp = evt.touches[0].clientX;
        let yUp = evt.touches[0].clientY;

        let xDiff = this.xDown - xUp;
        let yDiff = this.yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
            if (xDiff > 0) {
                /* left swipe */
                this.handleSwipAction(evt, 'left');
            } else {
                /* right swipe */
                this.handleSwipAction(evt, 'right');
            }
        }

        /* reset values */
        this.xDown = null;
        this.yDown = null;
    }
}

window.addEventListener('load', () => new MyApp());