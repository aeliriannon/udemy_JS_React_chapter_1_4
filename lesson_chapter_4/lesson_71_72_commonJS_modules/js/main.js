function myModule() { //создаем модуль
    this.hello = function () {
        console.log('hello');
    };

    this.goodbye = function () {
        console.log('bye!');
    };
}

module.exports = myModule; //говорим что хотим экспортировать модуль и указываем какой

//в стандарте ES6 облегчена функция экспорта

export let one = 1; //экспортируем пременную

//===========

let two = 2;

export {
    two
}; //чтобы экспортировать именную уже переменную, надо фигурные скобки ее заключить

//============

export function sayHi() {
    console.log('Hello!');
} //экспортируем функцию

// Главное, чтобы у каждой такой функции было свое ИМЯ, чтобы мы могли ее экспортировать

export default function sayHi() {
    console.log('Hello!');
} //экспортируем функцию по дефолту (НЕ именная)

// экспорт по умолчанию должен быть только один!