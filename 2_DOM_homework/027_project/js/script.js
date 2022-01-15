/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Хохлан",
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против...",
        "Хохлан против...",
        "Хохлы справедливости"
    ]
},
    filmList = document.querySelector('.promo__interactive-list'),
    promo = document.querySelector('.promo__bg'),
    adv = document.querySelectorAll('.promo__adv img');

    
adv.forEach(item => {
    item.remove();
});

promo.querySelector('.promo__genre').textContent = "Драма";

promo.style.background = "url(img/bg.jpg) top center/cover no-repeat";

filmList.innerHTML = "";   //Нам нужно убедиться, что внутри родителя ничего нет: обратимся к свойству переменной innerHTML и пропишем пустые кавычки. Таким образом мы очистили список перед началом работы

movieDB.movies.sort().forEach((film, i) => {
    filmList.innerHTML += `
        <li class="promo__interactive-item">${i + 1}. ${film}
            <div class="delete"></div>
        </li>
    `;
});