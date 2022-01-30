import {getResource} from '../services/services';

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
   getResource('http://localhost:3000/menu')
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

export default cards;
