'use strict';

//инкапсуляция - скрытие данных(свойств, переменных и т.д) от пользователя
//объект хранит свое состояние в приватном порядке

// function User(name, age) {
//     this.name = name;
//     this.age = age;

//     this.say = function() {
//         console.log(`Имя пользователя: ${this.name} возраст: ${this.age}`);
//     };
// }



// const ivan = new User('Ivan', 27);

// //получаем данные обобъкте
// console.log(ivan.name);
// console.log(ivan.age);

// //меняем значения свойств объекта

// ivan.age = 30;
// ivan.name = 'Alex';

// ivan.say(); //вызываем метод say

//чтобы не возможно было изменить данные используем инкапсуляцию

// 

// function User(name, age) {
//     this.name = name;
//     let userAge = age; 

//     this.say = function() {
//         console.log(`Имя пользователя: ${this.name} возраст: ${userAge}`);
//     };

//     this.getAge = function() { //пишем функцию, которая позволяет нам получить возраст юзера
//         return userAge;
//     };

//     this.setAge = function(age) { //пишем функцию, которая позволит менять возраст юзера при соответствии условию
//         if (typeof age === 'number' && age > 0 && age < 110) {
//             userAge = age;
//         } else {
//             console.log('Недопустимое значение');
//         }
//     };
// }

// const ivan = new User('Ivan', 27);

// console.log(ivan.name);
// console.log(ivan.userAge); //так данных о возрасте мы не получим
// console.log(ivan.getAge()); //а вот так получим

// ivan.setAge(30);
// console.log(ivan.getAge());

// ivan.say();

// Используем классы

// class User {
//     constructor(name, age) {
//         this.name = name;
//         this._age = age; //нижнее подчеркивание используется как отметка что свойство это надо скрыть
//     }  
//     say() {
//         console.log(`Имя пользователя: ${this.name} возраст: ${this._age}`);
//     }

//     get age() { //пишем функцию, которая позволяет нам получить возраст юзера
//         return this._age;
//     }

//     set age(age) { //пишем функцию, которая позволит менять возраст юзера при соответствии условию
//         if (typeof age === 'number' && age > 0 && age < 110) {
//             this._age = age;
//         } else {
//             console.log('Недопустимое значение');
//         }
//     }
// }

// const ivan = new User('Ivan', 27);

// console.log(ivan.name);
// console.log(ivan.age); //используем геттер
// ivan.age = 99; //используем сеттер

// console.log(ivan.age);


// ivan.say();

//синтаксис, который позволяет скрывать данные(новый не везде работает) поля классов


class User {
    constructor(name, age) {
        this.name = name;
        this._age = age; //нижнее подчеркивание используется как отметка что свойство это надо скрыть
    }  

    #surname = 'Hlaz'; //можем записать неизменные свойства вне конструктора
    //свойство перед которым стоит решетка, становится приватным

    say = () => { //можем использовать стрелочные функции
        console.log(`Имя пользователя: ${this.name} ${this.#surname} возраст: ${this._age}`);
    }

    get age() { //пишем функцию, которая позволяет нам получить возраст юзера
        return this._age;
    }

    set age(age) { //пишем функцию, которая позволит менять возраст юзера при соответствии условию
        if (typeof age === 'number' && age > 0 && age < 110) {
            this._age = age;
        } else {
            console.log('Недопустимое значение');
        }
    }
}

const ivan = new User('Ivan', 27);


console.log(ivan.surname); //получим underfined
ivan.say();
