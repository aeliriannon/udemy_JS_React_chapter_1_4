'use strict';

// localStorage.setItem('number', 5); // вносим данные в localstorage
// //1й аргумент - КЛЮЧ, 2й аргумент - ЗНАЧЕНИЕ (могут использоваться разные и ключи и аргументы)

// const data = localStorage.getItem('number'); //получаем данные из localstorage (аргумент) это ключ

// console.log(data);

// localStorage.removeItem('number'); //удаляем данные из localstorage (аргумент => ключ)
// localStorage.clear(); //очистить полностью localstorage (без аргументов)


//--- Практика ---

const checkbox = document.querySelector('#checkbox'),
      form = document.querySelector('.form-signin'),
      change = document.querySelector('#color');

if (localStorage.getItem('isChecked')) { //если значение есть (true)
    checkbox.checked = true; //то для чекбокса у станавливаем аттрибут checked (что он нажат)
}
if (localStorage.getItem('bg') === 'changed'){ //получаем данные из локалсторадж, если значение равно ченджет
    form.style.background = 'red'; //окрашиваем форму в белый цвет
}

checkbox.addEventListener('click', () => {
    localStorage.setItem('isChecked', true); //при клике на чекбокс добавляем в localstorage данные, что он нажат
});

change.addEventListener('click', () => {
    if (localStorage.getItem('bg') === 'changed'){ //получаем данные из локалсторадж, если значение равно ченджет
        localStorage.removeItem('bg'); //удаляем эту запись из базы
        form.style.background = 'white'; //окрашиваем форму в белый цвет
    } else {
        localStorage.setItem('bg', 'changed'); //устанавливаем новые данные bg в позиции changed
        form.style.background = 'red'; //окрашиваем форму в красный цвет
    }
});


const persone = {
    name: 'Alex',
    age: 25
};

const serializedPersone = JSON.stringify(persone); //переводим наш объект в формат json
localStorage.setItem('alex', serializedPersone);

console.log(JSON.parse(localStorage.getItem('alex')));
