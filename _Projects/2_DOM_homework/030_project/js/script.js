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

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Хохлан",
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против...",
            "Хохлан против",
            "Хохлы справедливости"
        ]
    };

    const filmList = document.querySelector('.promo__interactive-list'),
        promo = document.querySelector('.promo__bg'),
        adv = document.querySelectorAll('.promo__adv img'),
        form_btn = document.querySelector('.promo__interactive .add button'),
        element = document.querySelector('input[type=checkbox]');

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    const makeChanges = () => {
        promo.querySelector('.promo__genre').textContent = "Драма";

        promo.style.background = "url(img/bg.jpg) top center/cover no-repeat";
    };

    const sortArr = (arr) => {
        arr.sort();
    }

    function refreshMovies(films, parent) {
        parent.innerHTML = "";
        sortArr(films);

        films.sort().forEach((film, i) => {        
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1}. ${film}
                    <div class="delete"></div>
                </li>
            `;    
        });

        document.querySelectorAll('.delete').forEach((del, i) => {
            del.addEventListener('click', () => {
                del.parentElement.remove();
                movieDB.movies.splice(i, 1);

                refreshMovies(films, parent);;
            });
        });
    };

    form_btn.addEventListener('click', (event) => {
        event.preventDefault();

        let newMovie = document.querySelector('.adding__input').value;

        if (newMovie) { //if нужен для того чтобы при пустой строке у нас ничего не добавлялось

            if (newMovie.length > 21) {
                newMovie = `${newMovie.substring(0, 22)}...`;
            }

            movieDB.movies.push(newMovie);

            filmList.innerHTML = "";
            refreshMovies(movieDB.movies, filmList);;        

            if (element.checked) {
                alert('Добавляем любимый фильм');
            };        
        };

        document.querySelector('.adding__input').value = "";

    });

    makeChanges();
    deleteAdv(adv);
    refreshMovies(movieDB.movies, filmList);

});