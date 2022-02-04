'use strict';

//--- timeOut с 2мя аргументами

// const timerId = setTimeout(function() { // задаем переменную для отложенной функции
//     // вызываем метод таймаут(отложенное действие), где 1й аргумент - вызов функции по имени или сама функция, как в данном случае
//     //2й аргумент - время через которое эта функция должна сработать (в милисекундах 1сек = 1мсек)
//     console.log('Hello!');
// }, 2000);


//--- timeOut с 3мя аргументами

// const timerId = setTimeout(function(text) { // задаем переменную для отложенной функции
//     // вызываем метод таймаут(отложенное действие), где 1й аргумент - вызов функции по имени или сама функция, как в данном случае
//     //2й аргумент - время через которое эта функция должна сработать (в милисекундах 1сек = 1мсек)
//     //3й аргумент - данные которые будут передаваться в функцию
//     console.log(text);
// }, 2000, 'Hello!');


//--- timeOut с вызовом функции по имени

// function logger() {
//     console.log('Hello!');
// }

// const timerId = setTimeout(logger, 2000, 'Hello!');


// clearInterval(timerId); //останавливает наш таймер, как атрибут передается переменная содержащая метод setTimeout

// const btn = document.querySelector('.btn'); //берем кнопку с классом btn
// let   timerId, //создаем глобальную переменную для того чтобы использовать потом в функции
//       i = 0; //создаем счетчик, сколько раз высветился текст hello

// btn.addEventListener('click', () => { //на кнопку отслежиываем клик
//     timerId = setInterval(logger, 500, 'Hello!'); //после клика на кнопку каждые 2 секунды будет появляться надпись 
// });


// function logger() {
//     if (i === 3) { //если текст появился уже три раза
//         clearInterval(timerId); //то останавливаем вызов функции по таймеру
//     } 
//     console.log('Hello!'); //иначе выводим текст
//     i ++;//и увеличиваем наш счетчик на 1
    
// }

// --- Рекурсивный вызов setTimeout - лучше, чем setInterval

// let id = setTimeout(function log() {
//     console.log('yyyamy!');
//     id = setTimeout(log, 500); //в функции вызываем эту же функцию(рекурсия)
// }, 500); //такая функция работает так же как setInterval, но с учетом времени загрузки и отработки даже самого тяжелого скрипта

//--- ПРАКТИКА ---

const btn = document.querySelector('.btn'); //берем кнопку нашу


function myAnimation() { //создаем функцию для анимации квадрата
    const element = document.querySelector('.box'); //берем наш синий квадрат
    let pos = 0; //создаем щетчик
    const id = setInterval(frame, 20); //создаем переменную в которой лежит наш счетчиу таймаутов интервальный, каждые 10 минут запускаем frame

    function frame() { //создаем функцию фрейм с таймером
        if(pos == 300) { //если счетчик равен 300
            clearInterval(id); //то останавливаем наш таймаут
        } else {
            pos++; //иначе увеличиваем счетчик
            element.style.top = pos + 'px'; //говорим чтобы нашему квадрату прописали стиль топ равный нашему счетчику(сдвинули на pos пикселей)
            element.style.left = pos + 'px'; //говорим чтобы нашему квадрату прописали стиль left равный нашему счетчику(сдвинули на pos пикселей)
        }
    }
}

    btn.addEventListener('click', myAnimation); // говорим , что при клике на кнопку, вызывается функция myAnimation
