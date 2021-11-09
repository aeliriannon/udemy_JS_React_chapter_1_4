"use strict";  // используется для обозначения того, что код пишем в новом формате, пишев в верху главного документа

function first() {   //создаем функцию
    //do something...
    setTimeout(function() { // задаем задержку времени для выполнения этой функции
        console.log(1);  //выводим 1 в консоль
    }, 500); // выводим с задержкой в 500миллисекунд
}

function second() {  //создаем фукцию
    console.log(2);  // выводим 2 в консоль
}

first(); //вызываем функции
second(); // сначала выведет 2 потом 1, так как у единицы стоит задержка времени в пол секунды

function learnJS(lang, callback) { //создаем функцию. в которую передаем два аргумента, 1- язык изучения, 2 - функция(callback функция)
    console.log(`Я учу: ${lang}`); // выводим в консоль сообщение с использованием интерполяции
    callback();  // вызываем callback функцию
}

// learnJS('JavaScript', function(){  //вызываем функцию, передав значения аргуменитов - 1- название языка, 2- анонимная функция
//     console.log('Япрошел этот курс!'); // выводит в консоль сообщение
// });

function done(){  //создаем функцию, которую будем использовать как callback-функцию
    console.log('Япрошел этот курс!'); // выводит в консоль сообщение
}

learnJS('JavaScript', done); //вызываем функцию, передав значения аргуменитов - 1- название языка, 2- название функции, которую будем использовать, без круглых скобок!!