window.addEventListener('DOMContentLoaded', () => {

    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    };

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    } //i = 0 это дефолтное значение, то есть начинаем с 0 элемента
    
    hideTabContent();
    showTabContent(); 

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

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

            updateClock(); //Используем чтобы наш таймер запускался сразу как пользователь зашел на страницу

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show');
        document.body.style.overflow = 'hidden'; //Для того чтобы при открытии модалки невозможно было взаимодействовать с другими элементами
        clearInterval(modalTimerId); //Если юзер уже открыл модалку, таймер сброситься
    };

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow = '';
    };
    
    modalCloseBtn.addEventListener('click', closeModal)

    //Для того чтобы модалка закрывалась при клике на подложку:
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
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
    // const modalTimerId = setTimeout(openModal, 5000);

    //Для того чтобы модалка открывалась Однократно когда юзер заскролил страницу до конца вниз (-1 пиксель в конце для того чтобы скрипт срабатывал без ошибок):
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

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
            this.changeToUAH();
        }
        //Метод для конвертации доллары в гривны
        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        //Метод для формирования верстки
        render() {
            const element = document.createElement('div');

            //Для создания дефолтного значения для rest аргумента ...classes используем условие:
            if (this.classes.length == 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

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

    //Создаем объект(карточку товара) и вызываем метод render(отрисовка HTML структуры)
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
        9, //так как в базе данных у нас стоит 9 долларов
        ".menu .container", //создаваемы элемент будет находиться в таком родителе
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        9, //так как в базе данных у нас стоит 9 долларов
        ".menu .container", //создаваемы элемент будет находиться в таком родителе
        'menu__item'
    ).render();
});