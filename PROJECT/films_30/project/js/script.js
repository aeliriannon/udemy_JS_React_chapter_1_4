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
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};


//--- МОЕ РЕШЕНИЕ ---


const promo = document.querySelector('.promo__adv'),
      adv = document.querySelectorAll('.promo__adv img'),
      genreFilm = document.querySelector('.promo__genre'),
      genreNew = document.createElement('div'),
      bgPromo = document.querySelector('.promo__bg'),
      arrFilm = movieDB.movies,
      itemFilm = document.querySelectorAll('.promo__interactive-item');

//--- 1.1 ---

    // promo.remove(promo); // НЕ верно, так как удаляет полностью весь блок с заголовком и стилями
    adv.forEach(item => { // берем псевдомассив, который содержит картинки с рекламой и перебираем его элементы
        item.remove(); //каждый элемент удаляем
    });

//--- 1.2 ---
    // genreNew.classList.add('promo__genre');
    // genreNew.innerHTML = 'Драма';
    // genreFilm.replaceWith(genreNew);   // Мое решение длинное очень и сложное

    genreFilm.textContent = 'драма'; //Просто новый текст записываем

//--- 1.3 ---

    bgPromo.style.backgroundImage = 'url("img/bg.jpg")';

//--- 1.4, 1.5 ---

    arrFilm.sort(function (a, b){
        return a.localeCompare(b);
    });
    
    for(let i = 0; i < arrFilm.length; i++) {
        const num = i + 1;
        const genreNew = document.createElement('li');
        genreNew.classList.add('promo__interactive-item');
        genreNew.innerHTML = `${num}. ${arrFilm[i]}`;
        itemFilm[i].replaceWith(genreNew);
    }


//---- РЕШЕНИЕ ПРЕПОДАВАТЕЛЯ ---



// const adv = document.querySelectorAll('.promo__adv img'),
//       poster = document.querySelector('.promo__bg'),
//       genre = poster.querySelector('.promo__genre'),
//       movieList = document.querySelector('.promo__interactive-list');

// adv.forEach(item => {
//     item.remove();
// });

// genre.textContent = 'драма';

// poster.style.backgroundImage = 'url("img/bg.jpg")';

// movieList.innerHTML = ""; //почистили содержание пунктов списка

// movieDB.movies.sort();  // сортируем элементы массива

// movieDB.movies.forEach((film, i) => { //перебираем массив и берем индек и значение элемента
//     movieList.innerHTML += ` //к тому что есть уже прибавляем еще доп конструкцию
//         <li class="promo__interactive-item">${i + 1} ${film} //пункт списка с классом в котором нумерация строки  + фильм
//             <div class="delete"></div> // 
//         </li>
//     `;
// });


// --- 2.1 ---

const btn = document.querySelector('button');

btn.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('input').value;
});