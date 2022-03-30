'use strict';

// //Функция-генератор - генерирует нам какой-то результат , последовательно
// //когда вызываем первый раз - получаем один результат, вызываем второй раз - получаем другой результат
// function* generator() { //функция генератор записывается как обычная, только со звездочкой
//     yield 'S'; //пишем клюдчевое слово yield и за ним то, что будет выводиться
//     yield 'c';
//     yield 'r';
//     yield 'i';
//     yield 'p';
//     yield 't';
// }

// const str = generator(); //помещаем нашу функцию в переменную

// //функция  с методом next возвращает объект с двумя свойствами 1- значение, 2 - выполнилась ли функция до конца
// console.log(str.next());

// console.log(str.next().value); //так получим только значение



function* count(n) {
    for (let i = 0; i < n; i++) {
        yield i;
    }
}

for (let k of count(7)) {
    console.log(k);
}

// const counter = count(7);
// console.log(counter.next().value);
// console.log(counter.next().value);
// console.log(counter.next().value);
// console.log(counter.next().value);