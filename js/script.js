'use strict';

// function ask(question, yes, no) {
//     if (confirm(question)) yes()
//     else no();
//   }
	
//   ask(
//     "Вы согласны?",
//     function() { alert("Вы согласились."); },
//     function() { alert("Вы отменили выполнение."); }
//   );

//   let ask = (question, yes1, no1) => confirm(question) ? yes1() : no1();

//   ask ("Agree?", () => alert('Yes'), () => alert('No') );

//   i = i ? 
//     i < 0 ? Math.max(0, len + i) : i 
//     : 0;

// const random = (num) => console.log(Math.floor(Math.random() * num))
	

//   random(500)




// console.log( (200%2));


const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

// let a = prompt("Один из последних просмотренных фильмов?", ""),
// 		b = prompt("На сколько оцените его?", ""),
// 		c = prompt("Один из последних просмотренных фильмов?", ""),
// 		d = prompt("На сколько оцените его?", "");

// personalMovieDB.movies[a] = b;
// personalMovieDB.movies[c] = d;


for (let i = 0; i < 2; i++) {
    const a = prompt('Один из последних просмотренных фильмов?', ''),
          b = prompt('На сколько оцените его?', '');

    if (a != null && b != null && a != '' && b != '' && a.length < 50) {
        personalMovieDB.movies[a] = b;
        console.log('done');
    } else {
        console.log('error');
        i--;
    }
}



if (personalMovieDB.count < 10) {
    console.log("Просмотрено довольно мало фильмов");
} else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
    console.log("Вы классический зритель");
} else if (personalMovieDB.count >= 30) {
    console.log("Вы киноман");
} else {
    console.log("Произошла ошибка");
}

console.log(personalMovieDB);