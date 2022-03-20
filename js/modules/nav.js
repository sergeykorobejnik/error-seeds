"use strict";

class Nav {
    constructor(bodyOverlay, navEl, burgerEl, className, itemArr) {
        this.elemList = {
            bodyOverlay: bodyOverlay,
            navEl: navEl,
            burgerEl: burgerEl,
            className: className,
            itemArr: itemArr
        };
        this.main();
        this.subdropdown();
    }
    main(listOfEls) {
        listOfEls = this.elemList;
        listOfEls.burgerEl.addEventListener('click', function () {
            document.body.classList.add('scroll-disabled');
            listOfEls.navEl.classList.add(listOfEls.className);
            listOfEls.bodyOverlay.classList.add('body-overlay-active');
        });
        listOfEls.bodyOverlay.addEventListener('click', function () {
            this.classList.remove('body-overlay-active');
            document.body.classList.remove('scroll-disabled');
            listOfEls.navEl.classList.remove(listOfEls.className);
            listOfEls.itemArr.forEach(element => {
                if(element.classList.contains(listOfEls.className)) {
                    element.classList.remove(listOfEls.className);
                }
            });

        });
    };
    subdropdown(listOfEls) {
        listOfEls = this.elemList;
        listOfEls.itemArr.forEach(element => {
            element.addEventListener('click', function(event) {
                event.stopPropagation();
                if(this.lastElementChild.classList.contains('nav__dropdown') || this.lastElementChild.classList.contains('nav__subdropdown') || this.lastElementChild.classList.contains('nav__subdropdown-second')) {
                    this.lastElementChild.classList.add(listOfEls.className);
                }
                if(event.target.closest('.dropdown-head__backward')) {
                    event.target.closest('.' + listOfEls.className).classList.remove(listOfEls.className);
                }
                if(event.target.closest('.dropdown-head__close')) {
                    document.body.classList.remove('scroll-disabled');
                    listOfEls.bodyOverlay.classList.remove('body-overlay-active');
                    while(event.target.closest('.' + listOfEls.className)) {
                        event.target.closest('.' + listOfEls.className).classList.remove(listOfEls.className);
                    }
                }
            });            
        });
    };
}



export default Nav;