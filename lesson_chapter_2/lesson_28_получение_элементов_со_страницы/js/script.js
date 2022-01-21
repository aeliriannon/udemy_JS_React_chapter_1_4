"use strict";  // используется для обозначения того, что код пишем в новом формате, пишев в верху главного документа


const box = document.getElementById('box');

console.log(box);

const btns = document.getElementsByTagName('button'); //получаем htmCollection- псевдомассив
//даже если будет только один элемент на странице - результатом будет псевдомассив состоящий только из одного элемента

// console.log(btns);
console.log(btns[1]); //получаю только кнопку с индексом 1 из псевдомассива всех кнопок


// const btns = document.getElementsByTagName('button')[1]; //получаю только кнопку с индексом 1 из псевдомассива всех кнопок

const circles = document.getElementsByClassName('circle'); //получаем htmCollection- псевдомассив

console.log(circles);

const hearts = document.querySelectorAll(".heart");  //выбирает элементы пао селектору(любому селектору css)

// console.log(hearts); //выведет псевдомассив с нужными элементами

hearts.forEach(item => {
    console.log(item);
});

const oneHeart = document.querySelector('.heart'); // позволяет выбрать всего один элемент, выберет тот, который встретиться первым

console.log(oneHeart);