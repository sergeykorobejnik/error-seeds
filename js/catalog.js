"use strict";

function selector(className) {
    return document.querySelector(className);
}
function selectorAll(className) {
    return document.querySelectorAll(className);
}

let elemList = {
    bodyOverlay: selector('.body-overlay'),
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
    footerAccordion: {
        itemArr: selectorAll('.footer__list, .contacts_footer'),
        className: 'footer__active-class'
    },
    faqAccordion: {
        itemArr: selectorAll('.faq .faq__dropdown'),
        className: 'faq__accordion_active',
        disableLeave: true
    },
    seoSlider: {
        sliderEl: selector('.seolink_first'),
        nextEl: function () { return this.sliderEl.lastElementChild },
        prevEl: function () { return this.nextEl().previousElementSibling },
    },
    seoSliderSecond: {
        sliderEl: selector('.seolink_second'),
        nextEl: function () { return this.sliderEl.lastElementChild },
        prevEl: function () { return this.nextEl().previousElementSibling },
    },
    navCatalog: {
        navEl: selector('.nav'),
        className: 'header_active'
    }
};
import Accordion from './modules/accordion.js';
import Nav from './modules/nav.js';
import Swiper from './swiper-bundle.esm.browser.min.js';



if (window.matchMedia("(max-width: 1279px)").matches) {
    let nav = new Nav(
        elemList.bodyOverlay,
        elemList.nav.navEl,
        elemList.nav.burgerEl,
        elemList.nav.className,
        elemList.nav.itemArr
    );
}


if (window.matchMedia("(min-width: 1280px)").matches) {
    let headerAccordion = new Accordion(
        elemList.headerAccordion.itemArr,
        elemList.headerAccordion.className
    );
    navCatalog( 
        elemList.navCatalog.navEl,
        elemList.navCatalog.className
    );
}


let faqAccordion = new Accordion(
    elemList.faqAccordion.itemArr,
    elemList.faqAccordion.className,
    elemList.faqAccordion.disableLeave

);

let footerAccordion = new Accordion(
    elemList.footerAccordion.itemArr,
    elemList.footerAccordion.className
);

let seoSlider = new Swiper(elemList.seoSlider.sliderEl, {
    loop: false,
    autoplay: 700,
    slidesPerView: "auto",
    navigation: {
        nextEl: elemList.seoSlider.nextEl(),
        prevEl: elemList.seoSlider.prevEl(),
    },
});


let seoSliderSecond = new Swiper(elemList.seoSliderSecond.sliderEl, {
    loop: false,
    autoplay: 700,
    slidesPerView: "auto",
    navigation: {
        nextEl: elemList.seoSliderSecond.nextEl(),
        prevEl: elemList.seoSliderSecond.prevEl(),
    },
});


function navCatalog(navEl, className) {
    navEl.addEventListener('click', function() {
        this.classList.toggle(className);
    });
    navEl.lastElementChild.addEventListener('mouseleave', function(event) {
        this.parentElement.classList.remove(className); 
    });
}