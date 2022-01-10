"use strict";  // используется для обозначения того, что код пишем в новом формате, пишев в верху главного документа

// To String

// 1 string()

console.log(typeof(String(null)));  //преобразуем null в строку и выводим в консоль тип данных
console.log(typeof(String(4)));

//2 конкатенация

console.log(typeof(5 + ' '));
console.log(typeof(null + ' '));

const num = 5;

console.log('https://vk.com/catalog/' + num);

const fontSize = 26 + 'px';

//To number

//1 Number

console.log(typeof(Number("4")));

//2 унарный +

console.log(typeof(+'5'));

//3 ParseInt

console.log(typeof(parseInt('15px', 10)));


//------Применение-----

let answ = +prompt('Hello', '');

//To boolean

// 1

// всегда false 

// 0, '', null,  undefined, NaN;  --- все остальное будет true

let switcher = null; 

if (switcher) {   // вместо switcher у нас null - который заменяется false  => программа не работает
    console.log('Working...');
}

let switcher = 1; // вместо switcher у нас 1 - которая существует а значит true => программа работает

if (switcher) {
    console.log('Working...');
}

//2  boolean()

console.log(typeof(Boolean("4")));

//3 !! два не
console.log(typeof(!!'44444'));