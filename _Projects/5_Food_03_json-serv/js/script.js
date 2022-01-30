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

    //Создаем функцию GET запроса с сервера:
    const getResource = async (url) => {
        //Посылаем запрос на сервер по url который передаем как аргумент функции (у нас асинхронный код, который сперва делает запрос, ждет ответа от сервера и пока он ждет ответа у нас в переменную res ничего не записывается, поэтому чтобы не было ошибки перед функцией ставим async которая говорит что у нас будет асинхронный код, и перед асинхронным кодом ставим await(js будет ждать окончания запроса и потом только подставит в переменную и пойдет выполняться дальше)):
        const res = await fetch(url);

        //Обрабатываем поведение fetch чтобы отлавливать ошибки(fetch если столкнется с какой то ошибкой в http запросе он не выдаст catch(reject) а выдаст только при отстутсвии инета или других критических ошибок в самом запросе):

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`); //создаем объект ошибки куда помещаем текст ошибки c помошью метода throw(выкидывает из функции)
        }

        return await res.json(); //трансформируем полученный ответ в json, по перед этим прописываем так же await так как мы не знаем сколько времени займет эта трансформация
    };

    // //Создаем объекты(карточки товара) и вызываем метод render(отрисовка HTML структуры) путем вызова функии getResource:
    // getResource('http://localhost:3000/menu')
    //     //берем массив data который вернулся с сервера и перебираем его
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         }); //массив состоит из объектов. Сперва деструктуризируем объект. Создаем столько карточек товаров, сколько объектов есть в базе данных. В конце конструктора прописываем родителя куда будем пушить эти карточки товаров
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

    //Если нам нужно построить карточки с помощью библиотеки axios: 
    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

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
        bindpostData(item);
    });

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
            postData('http://localhost:3000/requests', json)
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

        //Чтобы модальное окно вернулась в исходный вид спустя 2 сек:
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 2000);
    }

    //Получаем menu с json-server по GET запросу:
    fetch('http://localhost:3000/menu')
        .then(data => data.json())//превращаем данные от сервера в JSON формат
        .then(res => console.log(res));//результат выведем в консоль
});

