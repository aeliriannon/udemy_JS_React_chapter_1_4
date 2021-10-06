"use strict"

let numberOfFilms;

function start() {
    numberOfFilms = +prompt('Сколько фильмов Вы уже посмотрели', '');  // Спрашиваем у поллзователя, сколько фильмов он уже посмотрел

    while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {  //цикл, повторять пока условие true, как только false остановить, будет задавать вопрос, пока пользователь не введет число
        numberOfFilms = +prompt('Сколько фильмов Вы уже посмотрели', '');
    }
}

start();

const personalMovieDB = { // объект, который содержит информаацию о пользователе
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

function rememberMyFilms(){ //функция, которая запоминает фильмы введенные пользователем
    for(let i = 0; i < 2; i++) {  //задать вопросы два раза
        let a = prompt('Один из последних просмотренных фильмов?', ''), // вопрос пользователю первый
            b = prompt('На сколько оцените его?', ''); //вопрос пользователю второй

        if(a != null && b != null && a !== '' && b !== '' && a.length < 50) { // проверяем правильность внесенных данных
            personalMovieDB.movies[a] = b; // записываем в объект, в свойство-объект movies его значение
            console.log("done"); //выводим сообщение, что шаг проделан
        } else {//если не верно внесеныа данные
            console.log('Error!'); // выводим сообщение об ошибке
            i--;   //так как ответ неверный возвращаемся на одну итерацию цикла назад
        }
    }
}

rememberMyFilms();

function detectPersonalLevel() {  //функция, уоторая определяет кино-уровень пользователя
    if (personalMovieDB.count < 10) { //если фильмов меньше 10
        console.log('Просмотрено довольно мало фильмов'); // то выводим сообщение
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30 ) { // если от 10 до 29 включительно
        console.log('Вы классический зритель!'); //то выводим это сообщение
    } else if(personalMovieDB.count >= 30) { // если больше 30
        console.log('Вы киноман!'); // то выводим это сообщение
    } else { //если не подошел ни один вариант
        console.log('Error'); // то выводим ошибку
    }
}

detectPersonalLevel();

// function showMyDB() {
//     if(personalMovieDB.privat == false) {
//         console.log(personalMovieDB);
//     }
// } //мой вариант решения

function showMyDB(hidden){ //передаем аргумент в функцию, в нашем случае personalMovieDB.privat
    if(!hidden) { // если false (НЕ true)
        console.log(personalMovieDB); // выводим объект в консоль
    }
}

showMyDB(personalMovieDB.privat); // передаем в качестве аргумента свойство приватности нашего объекта

function writeYourGenres() {
    for(let i = 1; i <= 3; i++) { //цикл, который повторяется 3 раза
        let genre = prompt(`Ваш любимый фильм под номером ${i}`,'');//задаем вопрос пользователю с порядковым номером

        personalMovieDB.genres[i-1] = genre; // записываем полученные данные в массив под необходимым индексом, начиная с 0
    }
}

writeYourGenres();