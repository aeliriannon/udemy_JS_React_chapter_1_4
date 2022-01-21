"use strict";  // используется для обозначения того, что код пишем в новом формате, пишев в верху главного документа

const box = document.getElementById('box');

// console.dir(box);  // выведет элемент, как объект со всеми его свойствами и методами если есть

// box.style.backgroundColor = 'blue';  //обращаемся к элементу бокс, к его объекту стайл и назначаем цвет фона
// box.style.width = '500px'; //обращаемся к элементу бокс, к его объекту стайл и переназначаем ширину

const btns = document.getElementsByTagName('button');

// btns.style.borderRadius = '100%'; //не заработает, так как обращаемся не к элементу, а к псевдомассиву
btns[1].style.borderRadius = '100%'; //обращаемся ко второму элементу псевдомассива кнопок, к его объекту стайл и назначаем свойство бордер радиус

let num = 300;

box.style.cssText = `background-color: green; width: ${num}px; border-radius:50px`; //с бэктиками можно вставлять переменные

const circles = document.getElementsByClassName('circle');

circles[0].style.backgroundColor = 'red';

const hearts = document.querySelectorAll(".heart");

//чтобы назначить свойства нескольким элементам используем циклы

// for(let i = 0; i < hearts.length; i++) {
//     hearts[i].style.backgroundColor = 'yellow';  //обращаемся к итому элементу псевдомасива и назначаем ему новый цвет фона
// }

hearts.forEach(item => {  //берем значчение каждого айтема псевдомассива hearts
    item.style.backgroundColor = 'yellow'; // и назначаем стили
});

//===Создаем новый html элемент

const div = document.createElement('div'); //элемент останется тьолько внутри js на страницек он никак не отобразится
//   //==Создание стилей

div.classList.add('black'); //добавляем класс для нашего элемента

// document.body.append(div); //обращаемся к документу к элементу боди и используем метод, который добавит нужный элемент в конец страницы\

document.querySelector('.wrapper').append(div);  // обращаеимся к нашему документу, к элементу враппер и просим с помощью метода аппенд добавить див в конец элемента
// document.querySelector('.wrapper').appendChild(div); //то же что и выше, только устаревший метод

const wrapper = document.querySelector('.wrapper');

// wrapper.prepend(div); // то же что и аппенд, только вставляет не в конец кода, а в начало

// hearts[1].before(div); //before- перед каким элементом вставить after - после какого
// //в данном случае указано, что вставляем перед вторым сердечком
// hearts[1].after(div);

// // wrapper.insertBefore(div, hearts[0]); //вставляет  элемент в указанный родитель - первый аргумент - что вставляем, второй перед кем вставляем(устаревший метод)

// circles[1].remove(); //удаляет указанный элемент
// // wrapper.removeChild(hearts[1]); //удаляет в  указаном родителе, указанный в аргументе элемиент(устаревший метод)


// hearts[0].replaceWith(circles[0]); // заменяет элемент к которому мы обращаемся, на указанный в методе реплэйс
// wrapper.replaceChild(circles[0], hearts[0]); // указываем родителя в котором с помощью метода будем менять 1й аргумент - на что меняем, 2й - который меняем
// //устаревший метод

// div.innerHTML = 'Hello world'; //добавляет в указанный элемент html текст либо структуру
// div.textContent = 'HEllo'; // работает, добавляет только текст в элемент
div.innerHTML = '<h1> Hello world</h1>';
div.insertAdjacentHTML('afterend', '<h2>Hello</h2>');  
//метод, который добавляет штмл структуру в код, где div - это родитель в котором изменения
//а аргументы - 1й - условие куда вствляем 
//beforebegin - вставляет структуру перед элементом родителя
//afterbegin - вставляет структуру в самое начало нашего родителя
//beforeend - вставляет структуру в конец родителя
//afterend - вставляет структуру посчле нашего родителя
//2й - структура, которую вставляем

const heart = circles.querySelectorAll(".heart"); 
//найдет все элементы .heart, которые лежат в circle