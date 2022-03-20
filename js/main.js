"use strict";

function selector(className) {
    return document.querySelector(className);
}
function selectorAll(className) {
    return document.querySelectorAll(className);
}

let elemList = {
    bodyOverlay: selector('.body-overlay'),
    headerEl: selector('.header'),
    brandSlider: {
        sliderEl: selector('.main-slider .brand-slider'),
        btn: selectorAll('.brand-slider .swiper-button-prev, .brand-slider .swiper-button-next'),
    },
    mainSlider: {
        sliderEl: selector('.main-slider .main-swiper'),

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
    mobilelang: {
        itemArr: selectorAll('.nav__mobile-head .nav__lang-dropdown'),
        className: 'active-dropdown',
    },
    footerAccordion: {
        itemArr: selectorAll('.footer__list, .contacts_footer'),
        className: 'footer__active-class'
    },
    socials: {
        socialsEl: selectorAll('.footer__socials'),
        targerEl: selector('.footer__nav')
    },

};
import Accordion from './modules/accordion.js';
import Nav from './modules/nav.js';
import Swiper from './swiper-bundle.esm.browser.min.js';
import { scrollEvents, navCatalog} from "./modules/header.js";


console.log(elemList);
if (window.matchMedia("(max-width: 1279px)").matches) {
    let nav = new Nav(
        elemList.bodyOverlay,
        elemList.nav.navEl,
        elemList.nav.burgerEl,
        elemList.nav.className,
        elemList.nav.itemArr
    );

    let mobileCoop = new Accordion(
        selectorAll('.nav__about-dropdown'),
        'nav__about-dropdown_active'
    );
    
    let mobilelang = new Accordion(
        elemList.mobilelang.itemArr,
        elemList.mobilelang.className
    );

    socialsFix(
        elemList.socials.socialsEl[0],
        elemList.socials.targerEl
    )
}

let footerAccordion = new Accordion(
    elemList.footerAccordion.itemArr,
    elemList.footerAccordion.className
);


if (window.matchMedia("(min-width: 1280px)").matches) {
    let headerAccordion = new Accordion(
        elemList.headerAccordion.itemArr,
        elemList.headerAccordion.className
    );

    // Костыли оставленные предками
    if(document.body.classList.contains('common-home')) {
        scrollEvents(elemList.headerEl, elemList.nav.navEl);
        navCatalog(elemList.nav.navEl, elemList.headerEl);
    } else {
        let comprasionCatalog = new Accordion(
            [elemList.nav.navEl],
            'nav_active'
        )
    }


}


let mainSlider = new Swiper(elemList.mainSlider.sliderEl, {
    loop: true,
    autoplay: 700,
    slidesPerView: "auto",

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
})
let brandSlider = new Swiper(elemList.brandSlider.sliderEl, {
    loop: true,
    autoplay: 700,
    slidesPerView: "auto",
    navigation: {
        nextEl: elemList.brandSlider.btn[1],
        prevEl: elemList.brandSlider.btn[0],
    },
});

function socialsFix(socialsEl, targerEl) {
    targerEl.append(socialsEl);
}
