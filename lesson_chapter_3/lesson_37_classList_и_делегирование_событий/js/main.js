'use strict';

const btns = document.querySelectorAll('button'),
    wrapper = document.querySelector('.btn-block');

// console.log(btns[0].classList.length); // узнаем сколько классов у первой кнопки

// console.log(btns[0].classList.item(0)); //узнаем какой класс у элемента под нулевым индексом

// console.log(btns[1].classList.add('red', 'new_class'));  //добавояет класс
// console.log(btns[0].classList.remove('blue')); //удаляет класс
// console.log(btns[0].classList.toggle('blue')); //проверяет, если класс есть, то удаляет, если нету то добавляет

//---!!!Устарело ---

// console.log(btns[0].className );


// btns[0].addEventListener('click', () => {  //назнгачаем на первую кнопку отслеживание клика
// if(!btns[1].classList.contains('red')) { //если у второй кнопки нет класса red то   
//     btns[1].classList.add('red'); //то добавляем этот класс 
// } else  {
//     btns[1].classList.remove('red'); //иначе удаляем этот класс
// }

//     btns[1].classList.toggle('red'); //делает то же самое, что и условный оператор выше

// });


//--- Делегирование событитий ---



// wrapper.addEventListener('click', (event) => {  //говорим, что будем отслеживать клик на родителе наших кнопок
//     //передаем во внутрь объект событития
//         // console.dir(event.target); //вызываем target в качестве объекта в консоли

//         if (event.target && event.target.classList.contains('blue')) { //проверяем, существует ли вообще свойство target у элемента(возможность клика) и есть ли у элемнта класс blue
//             console.log('Hello');

//         }

//     });

// wrapper.addEventListener('click', (event) => {  //говорим, что будем отслеживать клик на родителе наших кнопок
// //передаем во внутрь объект событития
//     // console.dir(event.target); //вызываем target в качестве объекта в консоли

//     if (event.target && event.target.tagName == 'BUTTON') { //проверяем, существует ли вообще свойство target у элемента(возможность клика) и  сравниваем имя тэга
//         console.log('Hello');

//     }

// });

//--- mathes сравнивает что-либо с чем-либо---

wrapper.addEventListener('click', (event) => { //говорим, что будем отслеживать клик на родителе наших кнопок
    //передаем во внутрь объект событития
    // console.dir(event.target); //вызываем target в качестве объекта в консоли

    if (event.target && event.target.matches('button.red')) {
        //проверяем, существует ли вообще свойство target у элемента(возможность клика) и сравниваем будет ли это элемент button  с классом .red            console.log('Hello');
        console.log('Hello');
    }

});

//--- НЕ используем деллигировоание и не видим динамическую кнопку созданную позже, чем этот скрипт

// btns.forEach(btn => { //перебираем псевдомассив из кнопок, берем каждую кнопку
//     btn.addEventListener('click', () => { //отслеживаем клик на каждую кнопку
//         console.log('Hello');
//     });
// });



const btn = document.createElement('button'); //создаем новые кнопки
btn.classList.add('red'); //добавляем динамической кнопке класс red
wrapper.append(btn); //добавляем кнопку в конец элемента враппер