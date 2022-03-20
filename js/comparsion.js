"use strict"
function selector(className) {
    return document.querySelector(className);
}
function selectorAll(className) {
    return document.querySelectorAll(className);
}
let elemList = {
    order: {
        wrapperEl: selector('.order__col'),
        formList: selectorAll('form'),
        circlesList: selectorAll('.order__progress-circle'),
        buttonsList: selectorAll('.order__completed-button'),
        productWrapper: selector('.order-products')
    },
    nav: {
        burgerEl: selector('.nav__burger-mobile'),
        navEl: selector('.nav__list'),
        className: 'transform_active',
        itemArr: selectorAll('.nav__item, .nav__dropdown-item, .nav__subdropdown-item')
    },
    headerAccordion: {
        itemArr: selectorAll('.header__lang-dropdown, .header__cooperation-dropdown, .header__community-contacts'),
        className: 'active-dropdown',
    },
    navDesc: {
        navEl: selectorAll('.nav__list'),
        className: 'nav_active'

    }
};
import Accordion from './modules/accordion.js';
import Nav from './modules/nav.js';


if (window.matchMedia("(max-width: 1279px)").matches) {
    let nav = new Nav(
        elemList.bodyOverlay,
        elemList.nav.navEl,
        elemList.nav.burgerEl,
        elemList.nav.className,
        elemList.nav.itemArr
    );

}

let headerMenu = new Accordion(
    elemList.navDesc.navEl,
    elemList.navDesc.className
)

let headerAccordion = new Accordion(
    elemList.headerAccordion.itemArr,
    elemList.headerAccordion.className
);    
