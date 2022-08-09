/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    //Calculator

    const result = document.querySelector('.calculating__result span');

    //Создаем переменные где в качестве дефолтных выбираем пол и активность
    let sex, height, weight, age, ratio;

    //Делаем проверку и в качестве дефолтных выбираем пол и активность из localStorage
    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    //Создаем функцию которая выводит результат в калькулятор
    function calcTotal() {

        //Проверяем что все инпуты заполнены и все настройки калькулятора выставлены:
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '_____'; // Выводим какое либо сообщение о том что не все заполнено
            return;
        }

        //Расчет формулы для мужчины и для женщины:
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }    
    }

    calcTotal();

    //Создаем функцию которая собирает информацию со статических объектах в калькуляторе
    function getStaticInformation (selector, activeClass) {
        //Создаем переменную которая получает все div у родителя parentSelector
        const elements = document.querySelectorAll(selector);

        //Отслеживаем все клики по элементам 
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                //Проверяем если юзер кликнул на элемент содержайщий дата атрибут data-ratio мы его вытаскиваем и переключаем. Иначе если у нас элемент содержит id тогда мы вытаскиваем и переключаем его уже
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
        
                //После того как получили элемент на который кликаем, мы сперва убираем класс активности у всех элементов и добавляем класс активности только к тому элементу на который мы кликнули
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
        
                e.target.classList.add(activeClass);
        
                //Постоянно вызываем нашу функцию расчета каждый раз когда у нас меняется что либо
                calcTotal();
            });
        });
    }

    //Вызываем функцию у которой берем все те блоки (добавляем div) где у нас выбор пола и где выбор активности:
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    //Создаем функцию которая собирает информацию с инпутов в калькуляторе
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '2px solid red';
            } else {
                input.style.border = 'none';
            }

            //С помощью switch case проверяем соответствие строки тому id инпута который мы в данный момент заполняем и преобразуем в числовой формат данных
            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            //Постоянно вызываем нашу функцию расчета каждый раз когда у нас меняется что либо
            calcTotal();
        });


    }

    //Вызываем функцию у которой берем те блоки где у нас стоят определенные id инпутов:
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    //Menu item

    //Создаем класс конструктор для наших карточек товара, последний аргумент будет rest как дефолтное значение:
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector); //То, куда мы будем помещать наш созданный div
            this.transfer = 27;
            this.changeToUAH(); //После создания новой карточки у нас выполнится эта функция и в this.price запишется уже сконвертированная валюта
        }
        //Метод для конвертации доллары в гривны:
        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        //Метод для формирования верстки:
        render() {
            const element = document.createElement('div');

            //Для создания дефолтного значения для rest аргумента ...classes используем условие:
            if (this.classes.length == 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            //Создаем структуру HTML и помещаем ее в element:
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                `;
            this.parent.append(element); //Помещаем новосозданный элемент в родительский DOM-элемент
        }
    }


   //Создаем объекты(карточки товара) и вызываем метод render(отрисовка HTML структуры) путем вызова функии getResource:
   (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
   //берем массив data который вернулся с сервера и перебираем его
   .then(data => {
       data.forEach(({img, altimg, title, descr, price}) => {
           new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
       }); //массив состоит из объектов. Сперва деструктуризируем объект. Создаем столько карточек товаров, сколько объектов есть в базе данных. В конце конструктора прописываем родителя куда будем пушить эти карточки товаров
   });






    // //Если нам нужно построить карточки с помощью библиотеки axios: 
    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });
   

 

    // //Если нам нужно построить карточки товаров БЕЗ шаблонизатора:    
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .container').append(element);
    //     });
    // }



}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
    //Forms

    const forms = document.querySelectorAll(formSelector);

    //Создаем объект - хранилище сообщений которое мы хотим показать пользователю
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    //Подвязываем функию postData ко всем формам на сайте:
    forms.forEach(item => {
        bindpostData(item);
    });

    function bindpostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            //Создаем картинку спиннер которая будет показываться при загрузке отправки формы на серв:
            let statusMessage = document.createElement('img');
            //Устанавливаем атрибут src для нашего img и ссылаемся на свойство объекта message:
            statusMessage.src = message.loading;
            //Применяем inline стили для нашего спиннера:
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.appendChild(statusMessage); // отправляем на нашу html страницу в форму cообщение

            //Для того чтобы спиннер добавлялся после ниже формы используем метод insertAdjacentElement и в аргументах используем (куда вставляем, что вставялем):
            form.insertAdjacentElement('afterend', statusMessage);
        
            //создаем переменную куда заносим все данные с формы
            const formData = new FormData(form);//очень важно чтобы в верстке в input'ах был атрибут name= иначе FormData не сможет найти этот input

            //Прием для преобразования FormData в JSON формат:
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            //Создаем запрос на сервер с помощью fetch и отправляем данные на сервер:
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);                
                //Если у нас данные на серв загрузились и ответ вернулся с кодом 200 (Ок) создаем успешное сообщение:
                showThanksModal (message.success);                                
                //Удаляем спиннер который есть на странице:
                statusMessage.remove();
            }).catch(() => {
                // Если ошибка то показываем сообщение об ошибке:
                showThanksModal (message.failure);
            }).finally(() => {
                //очистка value в input'ах формы:
                form.reset();
            });

        });
    }

    //Создаем функцию показа сообщения при успешной отправки формы на сервер:
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        //Скрываем в модальном окне прошлый контент с инпутами и кнопкой:
        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
            `;

        //Добавляем наш созданный элемент в html в родителя .modal:
        document.querySelector('.modal').append(thanksModal);

        //Чтобы модальное окно вернулась в исходный вид спустя 2 сек:
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 2000);
    }

    //Получаем menu с json-server по GET запросу:
    fetch('http://localhost:3000/menu')
        .then(data => data.json())//превращаем данные от сервера в JSON формат
        .then(res => console.log(res));//результат выведем в консоль
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    // modal.classList.toggle('show');
    document.body.style.overflow = 'hidden'; //Для того чтобы при открытии модалки невозможно было взаимодействовать с другими элементами

    //
    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId); //Если юзер уже открыл модалку, таймер сброситься
    }

}
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    // modal.classList.toggle('show');
    document.body.style.overflow = '';
}


function modal(triggerSelector, modalSelector, modalTimerId) {
    //Modal

    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);


    //Оборачиваем функцию openModal в другую колбэк функцию потому что нельзя чтобы эта функцию сразу вызывалась иначе у нас этот элемент будет отрисован еще до клика
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });
 
    //Для того чтобы модалка закрывалась при клике на подложку и на элемент с дата атрибутом data-close:
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    //Для того чтобы модалка закрывалась при нажатии на Ecsape:
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    //Для того чтобы модалка открывалась Однократно когда юзер заскролил страницу до конца вниз (-1 пиксель в конце для того чтобы скрипт срабатывал без ошибок):
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // const compstyle = window.getComputedStyle(modal);
    // function showModal() {
    //     modalTrigger.forEach((button) => {
    //         button.addEventListener('click', () => {
    //             if (compstyle.display == 'none') {
    //                 modal.style.display = 'block';
    //             };
    //         })
    //     })

    // };

    // function closeModal() {        
    //     close_btn.addEventListener('click', () => {
    //         modal.style.display = 'none';
    //     })

    // } 

    // showModal();
    // closeModal();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCuinter, currentCounter, wrapper, field}) {
    //Slider

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCuinter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width; 
    
    //Создаем и устанавливаем индекс для слайдера:
    let slideIndex = 1;  
    //Чтобы знать на соклько мы отсутпили вправо или влево с помощью transorm
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    //Установим ширину блоку (чтобы все слайды разместились в один ряд по ширине) как 400% (так как 4 слайда) от своего родителя (offer__slider-wrapper):
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    //Огриничим показ в блоке offer__slider-wrapper чтобы был виден только один слайд
    slidesWrapper.style.overflow = 'hidden';

    //Так как слайды могут быть разной ширины, мы перебираем все слайды и устанавливаем им ту ширину которая есть в computed style у блока который показывает нам текущий слайд:
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    slider.append(indicators);

    //Создаем функцию которая изменяет прозрачность точек переключения сладов
    function showActiveDots() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1; 
    }

    //Создаем функцию которая для чисел показывающих текущее и общее кол-во слайдов добавляет 0 если это число до 10
    function addZero() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    } 

    next.addEventListener('click', () => {
        //Вычисялем ширину offset на которую нам надо будет потом переместиться вправо(так как у нас из width приходит '650px' мы с помощью регулярных выражений находим все не числа и заменяем их на пустую строку, то есть отбрасываем)
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        //Перемещаем вправо на вычисленное значение offset
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        addZero();

        showActiveDots();
    });

    prev.addEventListener('click', () => {
        //Делаем наоборот сперва проверяем если  
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        //Перемещаем вправо или влево на вычисленное значение offset
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        addZero();

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1); 

            slidesField.style.transform = `translateX(-${offset}px)`;

            addZero();

            showActiveDots();
        });
    });


    //Варинат более простого слайдера:

    // //Вызываем функцию чтобы показать изначайный слайд и скрыть все остальные слайды 
    // showSlides(slideIndex);

    // //Показываем общее кол-во слайдов (в числах до 10 прописываем вначале 0) (если прописать это условие в самой функции то у нас при переключении слайдов цифра с общим кол-вом слайдов будет обновляться и мигать):
    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }
 
    // //Создаем функцию в котрой как аргумент будет приходить наш slideIndex с текущим номером
    // function showSlides(n) {
    //     //Проверяем если индекс слайда будет больше чем кол-во слайдов которые есть у нас в верстке то мы перемещаеся в самое начало:
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     //Проверяем, если мы из начального слайда перемаемся в предыдущий, т.е. в самый конец то мы устанавливаем ему последнее значение
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     //Скрываем все слайды которые есть и показываем текущий:
    //     slides.forEach(item => item.style.display = 'none');

    //     //Обращаеся к найденному псевдомассиву и для (Номер элемента - 1) так как  у нас slideIndex начинается с 1 а не с 0 как в массиве
    //     slides[slideIndex - 1].style.display = 'block';
        
    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // //Создаем функцию для переключения слайдера котороая принимает как аргумент наш slideIndex и вызывавет функцию showSlides. К нам приходит n = -1 если мы нажимаем на срелку prev и приходит n = 1 если нажимаем на next
    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // //Добавляем обработчики событий для кнопок слайдера:
    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabParentSelector, activeClass) {
    //Tabs

    const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabParentSelector);

    //Добавляем функцию которая будет добавлять класс hide и удалять класс show для каждой найденной вкладки:
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    } //i = 0 это дефолтное значение, то есть начинаем с 0 элемента
    
    hideTabContent();
    showTabContent(); 

    //Создаем обработчик событий который будет по клику на вкладки запускать наши функиции:
    tabsParent.addEventListener('click', (event) => {
        const target = event.target; //для простоты испльзования

        //Так как в tabsSelector нам приходит строка с точкой вначале '.tabheader__item' мы с помощью метода slice отрезаем первый символ:
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);               
                } //проверка на то, что пользователь кликнул именно на тот таб который перебирается в данный момент

            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
    //Timer

    //Создаем функцию для расчета таймера:
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60 ) % 24)),
                minutes = Math.floor((t / 1000 / 60) % 60),
                seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    //Добавление нуля для чисел до 10
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    //Находим на странице наши элементы таймера:
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

            updateClock(); //Используем чтобы наш таймер запускался сразу как пользователь зашел на страницу

        //Добавляем функцию для обновления нашего таймера
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            //Когда таймер дойдет до 0 (кол-во мс заданной даты минус кол-во мс настоящей даты будет равно 0) отключаем таймер:
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
    //Создаем функцию POST запроса на серв:
    const postData = async (url, data) => {
        //Посылаем запрос на сервер по url который передаем как аргумент функции (у нас асинхронный код, который сперва делает запрос, ждет ответа от сервера и пока он ждет ответа у нас в переменную res ничего не записывается, поэтому чтобы не было ошибки перед функцией ставим async которая говорит что у нас будет асинхронный код, и перед асинхронным кодом ставим await(js будет ждать окончания запроса и потом только подставит в переменную и пойдет выполняться дальше)):
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            body: data //сюда прописываем то, что мы передаем на сервер(у нас это FormData в формате JSON)
        });

        return await res.json(); //трансформируем полученный ответ в json, по перед этим прописываем так же await так как мы не знаем сколько времени займет эта трансформация
    };

    //Создаем функцию GET запроса с сервера:
    async function getResource(url) {
        //Посылаем запрос на сервер по url который передаем как аргумент функции (у нас асинхронный код, который сперва делает запрос, ждет ответа от сервера и пока он ждет ответа у нас в переменную res ничего не записывается, поэтому чтобы не было ошибки перед функцией ставим async которая говорит что у нас будет асинхронный код, и перед асинхронным кодом ставим await(js будет ждать окончания запроса и потом только подставит в переменную и пойдет выполняться дальше)):
        let res = await fetch(url);

        //Обрабатываем поведение fetch чтобы отлавливать ошибки(fetch если столкнется с какой то ошибкой в http запросе он не выдаст catch(reject) а выдаст только при отстутсвии инета или других критических ошибок в самом запросе):

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`); //создаем объект ошибки куда помещаем текст ошибки c помошью метода throw(выкидывает из функции)
        }

        return await res.json(); //трансформируем полученный ответ в json, по перед этим прописываем так же await так как мы не знаем сколько времени займет эта трансформация
    }


    
    

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









window.addEventListener('DOMContentLoaded', () => {

    //Для того чтобы модалка открывалась через определенное время:
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 50000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-02-01');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCuinter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
});



})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map