window.addEventListener('DOMContentLoaded', () => {

    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    //Добавляем функцию которая будет добавлять класс hide и удалять класс show для каждой найденной вкладки:
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    } //i = 0 это дефолтное значение, то есть начинаем с 0 элемента
    
    hideTabContent();
    showTabContent(); 

    //Создаем обработчик событий который будет по клику на вкладки запускать наши функиции:
    tabsParent.addEventListener('click', (event) => {
        const target = event.target; //для простоты испльзования

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);               
                } //проверка на то, что пользователь кликнул именно на тот таб который перебирается в данный момент

            });
        }
    });

    //Timer

    const deadline = '2022-02-01';

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

    setClock('.timer', deadline);

    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show');
        document.body.style.overflow = 'hidden'; //Для того чтобы при открытии модалки невозможно было взаимодействовать с другими элементами
        clearInterval(modalTimerId); //Если юзер уже открыл модалку, таймер сброситься
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow = '';
    }
    

    //Для того чтобы модалка закрывалась при клике на подложку и на элемент с дата атрибутом data-close:
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    //Для того чтобы модалка закрывалась при нажатии на Ecsape:
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    //Для того чтобы модалка открывалась через определенное время:
    const modalTimerId = setTimeout(openModal, 50000);

    //Для того чтобы модалка открывалась Однократно когда юзер заскролил страницу до конца вниз (-1 пиксель в конце для того чтобы скрипт срабатывал без ошибок):
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal();
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

    //Создаем объекты(карточки товара) и вызываем метод render(отрисовка HTML структуры):
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        "Меню 'Фитнес'",
        "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        9, //так как в базе данных у нас стоит 9 долларов
        ".menu .container", //создаваемы элемент будет находиться в таком родителе
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        12, //так как в базе данных у нас стоит 9 долларов
        ".menu .container", //создаваемы элемент будет находиться в таком родителе
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        10, //так как в базе данных у нас стоит 9 долларов
        ".menu .container", //создаваемы элемент будет находиться в таком родителе
        'menu__item'
    ).render();

    //Forms

    const forms = document.querySelectorAll('form');

    //Создаем объект - хранилище сообщений которое мы хотим показать пользователю
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    //Подвязываем функию postData ко всем формам на сайте:
    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
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
        
            //Создаем запрос на сервер:
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            //Используем Http заголовок для отправки JSON:
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            const formData = new FormData(form);//очень важно чтобы в верстке в input'ах был атрибут name= FormData не сможет найти этот input

            //Прием для преобразования FormData в JSON:
            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });

            //Конвертация объекта в JSON который превращает обычный объект в объект JSON:
            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    
                    //Если у нас данные на серв загрузились и ответ вернулся с кодом 200 (Ок) создаем успешное сообщение:
                    showThanksModal (message.success);
                    
                    //очистка value в input'ах формы:
                    form.reset();
                    
                    //Удаляем спиннер который есть на странице:
                    statusMessage.remove();
                } else {
                    //Если ошибка то показываем сообщение об ошибке:
                    showThanksModal (message.failure);
                }
            });
        });
    }

    //Создаем функцию показа сообщения при успешной отправки формы на сервер:
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        //Скрываем в модальном окне прошлый контент с инпутами и кнопкой:
        prevModalDialog.classList.add('hide');
        openModal();

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

        //Чтобы модальное окно вернулась в исходный вид спустя 4 сек:
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 2000);
    }
});

