"use strict"; // используется для обозначения того, что код пишем в новом формате, пишев в верху главного документа

const btn = document.querySelector('button'); // выбираем первый селектор с классом баттон


// //--- не лучший способ использования обработчика событий
// btn.onclick = function() { //вешаем на наш элемент обработчик онклик, при клике на этот элемент будет выполнятся дальнейшая функция
//     alert('Hello'); //вызываем сообщение
// };

// //--- 2й вызов затрет первый!!
// btn.onclick = function() { //вешаем на наш элемент обработчик онклик, при клике на этот элемент будет выполнятся дальнейшая функция
//     alert('Second hello'); //вызываем сообщение
// };


//--- Остлеживание событий ---

// btn.addEventListener('click', () => { //применяем метод, который отслеживает события на странице и назначаем 1й аргумент, какое событие отслеживаем. в данном случае клик
//     //2й аргумент колбек-функция(обычная или стрелочная)
//     alert('click'); // вызываем сообщение
// }); //если продублировать такую конструкцию, то второе событие станет в очерекдь и выполнится после первого события

// btn.addEventListener('mouseenter', (/*сюда как аргумент передается объект,в котором хранятся все события и состояния, этот аргумент обязательно первый, а дальше через ьзапятую можно добавлять аргументы на свое усмотрение*/) => { //отслеживаем наведение мыши на этот элемент
//     console.log('Hover');
// }); 

// btn.addEventListener('mouseenter', (event) => { //отслеживаем наведение мыши на этот элемент
//     console.log(event); // выводим все свойства объекта событий
//     console.log(event.target); //выводим значение свойства таргет объекта событий
//     event.target.remove(); //удаляем эт от элемент со страницы
//     //получаем элемент на который навели(его html структуру)
// }); 

// let i = 0;
// const deleteElement = (event) => { //выносим функцию как переменную, чтобы иметь возможность ее удалить
//     console.log(event.target);
//     i++;
//     if (i == 1) {
//         btn.removeEventListener('click', deleteElement); //удаляет отслеживание событий
//     }
// };

// btn.addEventListener('click', deleteElement); //добавляет отслеживание события клик пока i не станет ровна 1


// --- Всплытие событий - это когда обработчик событий срабатывает сначала на самом вложенном элементе, затем поднимется выше и выше по иерархии вложенности---

// const overlay = document.querySelector('.overlay'); 

// const deleteElement = (event) => { 
//     console.log(event.target);
//     console.log(event.type);
// };

// btn.addEventListener('click', deleteElement); //сначала событие произойдет на вложенном элементе
// overlay.addEventListener('click', deleteElement); // затем событие произойдет на родительском элементе  --> вспылтие событий


// --- Последовательность событий ---

// const overlay = document.querySelector('.overlay'); 

// const deleteElement = (event) => { 
//     console.log(event.currentTarget); // покажет клик на тот элемент который указан, а не на вложенный
//     console.log(event.type);
// };

// btn.addEventListener('click', deleteElement); 
// overlay.addEventListener('click', deleteElement);

//--- Отмена стандартных событий браузера ---

const link = document.querySelector('a'); 

link.addEventListener('click', function(event) {
    event.preventDefault(); // метод, который отменяет стандартное поведение элемента, в данном случае отменяет переход по ссылке по клику
    //помещается в самомо начале, а вот дальше пишем уже, что делать с элементом
    console.log(event.target);
});


// --- чтобы навесить обработчик нанесколько элемнетов ---

// const btnArr = document.querySelectorAll('button');

// btnArr.forEach(item => {
//     item.addEventListener('click', function(event) {
//         console.log(event.target);
//     });
// }); 

// --- Опции события (третий аргумент addEventListener ---

const btnArr = document.querySelectorAll('button');
const targetElement = function(event) {
    console.log(event.target);
};

btnArr.forEach(item => {
    item.addEventListener('click', targetElement, {once: true});
    // третий аргумент = объект со свойство once, мы пекредаем ему значение true, что значит повторить только один раз это событие
}); 




