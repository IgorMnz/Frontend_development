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
    const modalTimerId = setTimeout(openModal, 5000);

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

});



function count(num) {
    return this * num;
}

const double = count.bind(2);//в контекст this передается 2

console.log(double(3)); //результат будет 2 * 3 = 6
console.log(double(13)); //результат будет 2 * 13 = 26