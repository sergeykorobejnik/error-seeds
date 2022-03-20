"use strict"

class Accordion {
    constructor(itemArr, className, disableLeave) {
        this.listOfElements = {
            itemArr: itemArr,
            className: className,
            disableLeave: disableLeave ? false : true
        };

        this.main();
        console.log(this);
    }

    main (listOfEls) {
        listOfEls = this.listOfElements;
        listOfEls.itemArr.forEach(element => {
            element.parentElement.addEventListener('click', function() {
                listOfEls.itemArr.forEach(element => {
                    element = element.parentElement;
                    if(element != this) {
                        element.classList.remove(listOfEls.className);
                    }
                });

                if(!this.classList.contains(listOfEls.className)) {
                    this.classList.add(listOfEls.className);
                } else {
                    this.classList.remove(listOfEls.className);
                }
            });
            if(listOfEls.disableLeave) {
                element.addEventListener('mouseleave', function() {
                    this.parentElement.classList.remove(listOfEls.className);
                });
            }
        });
    }
}

export default Accordion;