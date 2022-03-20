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
    }
}

console.log(elemList.order)
let setHeight = function (height)  {
    height = height ? height : this.firstElementChild.offsetHeight + this.firstElementChild.lastElementChild.offsetHeight
    this.style.maxHeight = height + 'px'
}


function makeObj (inputObj =  {formList: [], circleList: [], btnList:  []}) {
    let formObj = {}

    for(let i = 0; i < inputObj.formList.length; i++) {
        formObj[i] = {
            element: inputObj.formList[i],
            descrEl: inputObj.formList[i].firstElementChild.lastElementChild,
            button: inputObj.formList[i].lastElementChild,
            elementHeight: inputObj.formList[i].offsetHeight,
            circle: inputObj.circleList[i],
            changeBtn: inputObj.btnList[i],
            isActive: i == 0 ? true : false
        }
    }
    Object.defineProperty(formObj, 'length', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: inputObj.formList.length
    })
    Object.defineProperty(formObj, 'lastPassed', {
        enumerable: false,
        configurable: false,
        writable: true,
        value: 0
    })

    return formObj
}

console.log(makeObj({
        formList: elemList.order.formList,
        circleList:elemList.order.circlesList,
        btnList: elemList.order.buttonsList
    })
)



//Disable unsused forms :/
window.addEventListener('DOMContentLoaded', function () {
    elemList.order.circlesList[0].classList.add('order__progress-circle_active')
})



function catchEvents (productWrapper) {
    let formObj = makeObj({
        formList: elemList.order.formList,
        circleList:elemList.order.circlesList,
        btnList: elemList.order.buttonsList
    })


    function catchChanges () {
        for (const key in formObj) {
            formObj[key].changeBtn.addEventListener('click', function () {
                if(!formObj[key].isActive) {
                    formObj[key].descrEl.classList.remove('order__completed_active')
                    setHeight.call(formObj[key].element, 1000)
                    formObj[key].circle.classList.add('order__progress-circle_active')
                }
            })
            formObj[key].circle.addEventListener('click', function () {
                if(+key < formObj.lastPassed) {
                    formObj[key].descrEl.classList.remove('order__completed_active')
                    setHeight.call(formObj[key].element, 1000)
                    formObj[key].circle.classList.add('order__progress-circle_active')
                }
            })
        }
    }

    function catchSubmit () {
        for (const key in formObj) {
            formObj[key].button.addEventListener('click', function () {
                formObj.lastPassed = +key + 1
                console.log(formObj)
                //checking for range of events
                if(+key < formObj.length - 1) {
                    setHeight.call(formObj[key].element)
                    formObj[key].descrEl.classList.add('order__completed_active')
                    formObj[key].circle.classList.remove('order__progress-circle_active')
                    formObj[key].isActive = false
                    setHeight.call(formObj[+key + 1].element, 1000)
                    formObj[+key + 1].circle.classList.add('order__progress-circle_active')
                    formObj[+key + 1].isActive = true
                }
            })
        }
    }


        function removeItem (element, duration) {
        element.style.opacity = `0`
        setTimeout(() => element.remove(), duration)
    }


    function productInteractivity () {
    productWrapper.addEventListener('click', function (e) {
        e = e.target

        if(e.classList.contains('order-products__remove-item') || e.closest('.order-products__remove-item')) {
            removeItem(e.closest('.order-products__item'), 500)
        }

        if(e.classList.contains('order-products_btn_plus')) {
            e.previousElementSibling.value = +e.previousElementSibling.value + 1
        }
        if(e.classList.contains('order-products_btn_minus')) {
            console.log(e.nextElementSibling.value);
            e.nextElementSibling.value = e.nextElementSibling.value !== '0' ?  +e.nextElementSibling.value - 1 : 0;
        }
    })
}

    catchSubmit()
    catchChanges()
    productInteractivity()
}
catchEvents(elemList.order.productWrapper)