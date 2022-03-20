function scrollEvents (headerEl, navEl) {
    
    window.addEventListener('scroll', function () {
        let height;
        height = navEl.offsetHeight + headerEl.firstElementChild.offsetHeight + headerEl.firstElementChild.nextElementSibling.offsetHeight - this.scrollY.toFixed(0);
        if(this.scrollY > navEl.offsetHeight + headerEl.firstElementChild.offsetHeight + headerEl.firstElementChild.nextElementSibling.offsetHeight + 2) {
            navEl.style.cssText= `clip: rect(auto, 100vw, 0px, auto); transition: all .5s ease;`;
            navEl.setAttribute('data-opened', '');
        } else {
            height = height <= 0 ? 0 : height;
            navEl.style.cssText = `clip: rect(auto, 100vw, ${height}px, auto);`;
        }
        let headerHeight;
        headerHeight = headerEl.firstElementChild.offsetHeight + headerEl.firstElementChild.nextElementSibling.offsetHeight;
        headerHeight = this.scrollY < headerHeight ? -this.scrollY.toFixed(0) : -headerHeight;
        headerEl.style.cssText = `transform: translateY(${headerHeight}px);`;
        scrollEvents.scrollY = this.scrollY;
        scrollEvents.scrollHeight = height;
    });
}


function navCatalog(navEl, className) {
    navEl.parentElement.addEventListener('click', function() {
        console.log(this)

        
        if(scrollEvents.scrollY > navEl.offsetHeight) {
            if(!navEl.getAttribute('data-opened')) {
                navEl.style.cssText= `clip: rect(auto, 100vw, 2000px, auto); transition: all .5s ease;`;
                navEl.setAttribute('data-opened', 'true');
                console.log(Boolean(navEl.getAttribute('data-opened')));
            } else {
                navEl.style.cssText= `clip: rect(auto, 100vw, 0px, auto); transition: all .5s ease;`;
                navEl.setAttribute('data-opened', '');
            }
        }
    });
    navEl.addEventListener('mouseleave', function(event) {
        if(scrollEvents.scrollY > this.offsetHeight) {
            this.style.cssText = `clip: rect(auto, 100vw, 0px, auto); transition: all .5s ease;`;
            navEl.setAttribute('data-opened', '');
        }
    });
}
function searchDrop(searchEl, mobileEventEl, bodyOverlay, className) {
    if (window.matchMedia("(min-width: 1280px)").matches) {
        searchEl.firstElementChild.addEventListener('click', function() {
            searchEl.classList.toggle(className);
        });
        searchEl.addEventListener('mouseleave', function () {
            searchEl.classList.remove(className);
        });
    } else {
        mobileEventEl.addEventListener('click', function() {
            searchEl.classList.toggle(className);
            bodyOverlay.classList.add('body-overlay-active');
            document.body.classList.add('scroll-disabled');    
        });    
    }
    bodyOverlay.addEventListener('click', function () {
        this.classList.remove('body-overlay-active');
        document.body.classList.remove('scroll-disabled');
        searchEl.classList.remove(className);
    });
}


export {scrollEvents, navCatalog, searchDrop};