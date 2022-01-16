/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

const movieDB = {
    movies: [
        "Хохлан",
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд Пилигрим против всех ололололо",
        "Одержимость",
        "Скотт Пилигрим против всех ололололо",
        "Хохлан против против всех ололололо",
        "Хохлы справедливости"
    ]
},
    filmList = document.querySelector('.promo__interactive-list'),
    filmItem = document.querySelectorAll('.promo__interactive-item'),
    promo = document.querySelector('.promo__bg'),
    adv = document.querySelectorAll('.promo__adv img'),
    form_btn = document.querySelector('.promo__interactive .add button'),
    element = document.querySelector('input[type=checkbox]');

    
adv.forEach(item => {
    item.remove();
});

promo.querySelector('.promo__genre').textContent = "Драма";

promo.style.background = "url(img/bg.jpg) top center/cover no-repeat";

refreshMovies()

function refreshMovies(){
    filmList.innerHTML = "";
    movieDB.movies.sort().forEach((film, i) => {
        filmList.innerHTML += `
            <li class="promo__interactive-item">${i + 1}. ${film}
                <div class="delete"></div>
            </li>
        `;
    });
};

form_btn.addEventListener('click', (e) => {
    e.preventDefault();
    let newMovie = document.querySelector('.adding__input').value;
    if (newMovie != "") {
        movieDB.movies.push(newMovie);
        filmList.innerHTML = "";
        refreshMovies();
        document.querySelector('.adding__input').value = "";
        if (element.checked) {
            alert('Добавляем любимый фильм');
        };        
    };
});




function stringTruncate(str, length){
    let dots = str.length > length ? '...' : '';
    return str.substring(0, length)+dots;
  };

  console.log(stringTruncate('Скотт Пилигрим против всех ололололо', 21));
