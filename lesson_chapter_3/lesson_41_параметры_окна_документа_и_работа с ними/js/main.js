'use strict';

// --- Данные элменета ---

// console.log(document); //можем посмотреть что в себе содержит документ, теги, классы и так далее

const box = document.querySelector('.box');

// const width = box.clientWidth; //получаем ширину элемента(без марджинов и паддингов)
// const height = box.clientHeight; //получаем высоту элемента(без марджинов и паддингов)

//если задан box-sizing: border-box; то будет считаться с учетом паддингов


// const width = box.offsetWidth; //получаем ширину элемента c учетом паддингов, бордеров и скролла
// const height = box.offsettHeight; //получаем высоту элемента c учетом паддингов, бордеров и скролла

// const width = box.scrollWidth; //получаем ширину элемента c учетом части, которая не видна(за скроллом) 
// const height = box.scrolltHeight; //получаем высоту элемента c учетом части, которая не видна(за скроллом)
// //ширина или высота всего документа(страницы) даже с учетом части, которая не видна в окне браузера

// console.log(width, height); //выводим переменные высоты и ширины

// const btn = document.querySelector('button');

// btn.addEventListener('click', () => {
//     // box.style.height = box.scrollHeight + 'px'; //прописываем для бокса высоту равную высоте всего документа
//     console.log(box.scrollTop); //выводим, сколько пикселей нашего блока мы проскролили вниз(верхняя часть)
//     // scrollLeft - сколько пролисталось вправо(ширину левой части)
// });

// console.log(box.getBoundingClientRect()); //показывает все координаты элемента
// //Координаты рассчитываются от верхнего левого угла
// console.log(box.getBoundingClientRect().top); //покажет только верхнюю точку


// const style = window.getComputedStyle(box); //выведет все computed стили которые применились к элементу(все уже рассчитанные и применимые)
// console.log(style);//выведет все computed стили которые применились к элементу
// console.log(style.display); //выведет значение применное к этому элементу свойства дисплей

// --- Данные document и window ---

// document.documentElement.scrollTop = 0; //можем модифицировать положение скролла(страницы)
console.log(document.documentElement.scrollTop);
//применить скролл-топ к document мы не можем, но можем к locumentElement

window.scrollBy(0, 400); //пролистывает документ, относительно места на котором страница была 
// 1й аргумент - по горизонтали, 2й - по вертикали

window.scrollTo(0, 400); //пролистывает документ, относительно всей страницы(от верха или от лева)





