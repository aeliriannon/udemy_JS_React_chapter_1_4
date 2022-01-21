"use strict";

const personalMovieDB = { // объект, который содержит информаацию о пользователе
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: function() {
        personalMovieDB.count = +prompt('Сколько фильмов Вы уже посмотрели', '');  // Спрашиваем у поллзователя, сколько фильмов он уже посмотрел

        while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {  //цикл, повторять пока условие true, как только false остановить, будет задавать вопрос, пока пользователь не введет число
            personalMovieDB.count = +prompt('Сколько фильмов Вы уже посмотрели', '');
        }
    },
    rememberMyFilms: function() { //функция, которая запоминает фильмы введенные пользователем
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
    },
    detectPersonalLevel: function() {  //функция, уоторая определяет кино-уровень пользователя
        if (personalMovieDB.count < 10) { //если фильмов меньше 10
            console.log('Просмотрено довольно мало фильмов'); // то выводим сообщение
        } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30 ) { // если от 10 до 29 включительно
            console.log('Вы классический зритель!'); //то выводим это сообщение
        } else if(personalMovieDB.count >= 30) { // если больше 30
            console.log('Вы киноман!'); // то выводим это сообщение
        } else { //если не подошел ни один вариант
            console.log('Error'); // то выводим ошибку
        }
    },
    showMyDB: function(hidden){ //передаем аргумент в функцию, в нашем случае personalMovieDB.privat
        if(!hidden) { // если false (НЕ true)
            console.log(personalMovieDB); // выводим объект в консоль
        }
    },
    toggleVisibleMyDB: function() {
        if(personalMovieDB.privat) { //если privat = true то
            personalMovieDB.privat = false;
        } else { // иначе
            personalMovieDB.privat = true;
        }
    },
    writeYourGenres: function() {

        for(let i = 1; i <= 3; i++) { //цикл, который повторяется 3 раза
            let genre = prompt(`Ваш любимый фильм под номером ${i}`,'');//задаем вопрос пользователю с порядковым номером
            if (genre === '' || genre == null) { //если пользователь оставил пустую строку или нажал отмену, то
                console.log('Вы ввели некорректные данные'); //выводим сообщение в консоль
                i--; // и откатываем цикл на одну итерацию назад
            } else {
                personalMovieDB.genres[i-1] = genre; // записываем полученные данные в массив под необходимым индексом, начиная с 0
            }
        }

        personalMovieDB.genres.forEach((item, i) => { //с помощью foreach перебираем массив жанров, тспользуя колбек функцию, вводим аргументы, где item - каждый пункт, а i - порядковый номер
            console.log(`Любимый жанр ${i+1} - это ${item}`);
        });
    }
};