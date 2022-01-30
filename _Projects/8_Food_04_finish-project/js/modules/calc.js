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

export default calc;