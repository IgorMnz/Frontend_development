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


let numberOfFilms = +prompt("Сколько фильмов вы уже посмотрели?", "");

let personalMovieDB = {
  count: numberOfFilms,
  movies: {},
  actors: {},
  genres: [],
  privat: false
};

let a = prompt("Один из последних просмотренных фильмов?", ""),
    b = prompt("На сколько оцените его?", ""),
    c = prompt("Один из последних просмотренных фильмов?", ""),
    d = prompt("На сколько оцените его?", "");

personalMovieDB.movies[a] = b;
personalMovieDB.movies[c] = d;

console.log(personalMovieDB);