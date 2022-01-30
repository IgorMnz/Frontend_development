import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

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
        openModal('.modal', modalTimerId);

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
            closeModal('.modal');
        }, 2000);
    }

    //Получаем menu с json-server по GET запросу:
    fetch('http://localhost:3000/menu')
        .then(data => data.json())//превращаем данные от сервера в JSON формат
        .then(res => console.log(res));//результат выведем в консоль
}

export default forms;