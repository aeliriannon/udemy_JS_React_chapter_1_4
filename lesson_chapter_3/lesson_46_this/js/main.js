'use strict';

//this - контекст вызова функции

//--- 1) Обычная функция ---

//---!! в таком обычном вызове this равен значению: !!---
//---!! без использования строго режима 'use strict' --> window !!---
//---!! с использованием 'use strict' --> underfined !!---

// function showThis() {
//     console.log(this);
// }
// showThis(); 



//--- Пример задачи на контекст вызова с собесов на обычную функцию ---

// function showThis() {
//     console.log(this); // выведет underfined так как контекст вызова не менялся и мы используем use strict
//     function sum(a, b) {
//         console.log(this); // выведет underfined так как контекст вызова не менялся и мы используем use strict
//         // return this.a + this.b; // выведет ошибку, так как this = underfined
//         return a + b; //вот так будект решать, так как используется функция замыкания, в себе значения олна не найдет и обратится к функции родительской, где эти переменные и найдет
//     }
// }
// showThis(4, 5); 

//--- 2) Объект ---

//---!! Контекст вызова у методов(функций) внутри объекта --> сам этот объект

//---!! Если в методе объекта будет функция и мы вызовем там this то получим опять underfined(если есть use strict), так как это уже будет обычной функцией, а не метод объекта

// const obj = {
//     a: 20,
//     b: 15,
//     sum: function() {
//         console.log(this);
//     }
// };

// obj.sum(); //выведет {a: 20, b: 15, sum: f} - тот объект в котором находится этот метод

//--- 3) Функции-конструкторы и классы через оепратор new ---

//---!! this в конструкторах и классах - это новый экземпляр объекта !!---


// function User(name, id) {
//     this.name = name; //при создании объекта вместо this будет подставляться наш новый объект user ==> User.name
//     this.id = id;
//     this.human = true;
// }

// let ivan = new User('Ivan', 23); //this будет ссылаться на этот экземпляр объекто, который создан с помощью new

//--- 4) Ручное присвоене контекста call, apply, bind ---

// function sayName(surname) {
//     console.log(this);
//     console.log(this.name + surname);
// }

// const user = {
//     name: 'John'
// };

// sayName.call(user, 'Smith'); //вызываем нашу функцию с методом call в котором указываем тот объект в контексте которого мы хотим работать
// //аргументы в call прописываются просто через запятую
// sayName.apply(user, ['Smith']); //вызываем нашу функцию с методом apply в котором указываем тот объект в контексте которого мы хотим работать
// //аргументы в apply прописываются в массив


// function count(num) {
//     return this*num;
// }

// const double = count.bind(2); //создает новую функцию на основе существующей(аргумент в bind и будет контекстом, подставляться вместо this)

// console.log(double(3)); //3 идет как аргумент num


//---!! Практика !!---

// const btn = document.querySelector('button');

// btn.addEventListener('click', function() { //отслеживаем клик по кнопке
//     console.log(this); //контекстом выведется наша кнопка
//     this.style.background = 'red';
// });

//---!! Стрелочная функция в обработчиках событий не может взять контекст у родителя, поэтому принимает window или underfind(use strict)

//---!! Если у нас отслеживание событий и в качестве колбэк функции у нас синтаксис обычной функции(НЕ стрелочной) !!--
//---!! то контекстом вызова будет сам элемент на котором это событие произошло !!--


//---!! У стрелочной функции нет своего контекста вызова, Она всегда берет его у своего родителя !!---

const obj = {
    num: 5,
    sayNumber: function() {
        const say = () => {
            console.log(this); //cвоего контекста нет, так как стрелочная функция, родитель метод объекта, соответственно this ссылается на свой объект
        };

        say();
    }
};

obj.sayNumber();

//--- Сокращение записи стрелочной функции ---

// const double = (a) => {
//     return a*2;
// };

//---!! если в стрелочной функции только один аргумент, то можно не ставить круглые скобки !!---
//---!! если в стрелочной функции только одна стрка кода, то можно убрать и фигурные скобки !!---
//---!! а так же слово return оно подставится автоматически при отработке функции !!---

const double = a => a*2; // тоже самое, что функция выше



