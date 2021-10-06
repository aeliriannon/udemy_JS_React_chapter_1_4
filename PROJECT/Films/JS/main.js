"use strict"

const numberOfFilms = +prompt('Сколько фильмов Вы уже посмотрели', '');

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};


for(let i = 0; i < 2; i++) {
    let a = prompt('Один из последних просмотренных фильмов?', ''),
        b = prompt('На сколько оцените его?', '');

    if(a != null && b != null && a !== '' && b !== '' && a.length < 50) {
        personalMovieDB.movies[a] = b; // записываем в объект, в свойство-объект movies его значение
        console.log("done");
    } else {
        i--;   //так как ответ неверный возвращаемся на одну итерацию цикла назад
    }
}

if (personalMovieDB.count < 10) {
    console.log('Просмотрено довольно мало фильмов');
} else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30 ) {
    console.log('Вы классический зритель!');
} else if(personalMovieDB.count >= 30) {
    console.log('Вы киноман!');
} else {
    console.log('Error');
}