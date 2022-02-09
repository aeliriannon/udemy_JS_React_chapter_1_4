// 'use strict';

// //--!! promise - обещание, когда асинхронный код. Мы как бы обещаем, что если произойдет какое то действие, то за ним последует обещанное действие !!--

// console.log('запрос данных...'); //синхронный код,  => выполнится сразу

// const req = new Promise(function(resolve, reject) {//с помощью конструктора new создаем новый промис, с колбэк функцией внутри
//     //функция принимает два аргумента resolve и reject - функции которые нами и созданы
//     //resolve - это успешно выполненная функция, обещание выполнилось
//     //reject - это НЕ выполненная функция. что-то пошло не так
//     //помещаем во внутрь промиса нашщ асинхронный код
//     setTimeout(() => { //отложенное действие => ассинхронный код
//         console.log('Подготовка данных...');
    
//         const product = { //создаем объект продукта
//             name: 'TV',
//             price: 2510
//         };

//         //Если первая часть выполнилась(код выше), то наша колбэк функция(код ниже) запустится, иначе нет
    
//         resolve(product); //передаем как аргумент наш объект, чтобы фальше метод then мог использовать эти данные
        
//     }, 2000); //колбэк функция выполнится, через 2 секунды
// }); 

// // req.then((product) => { //используем наш promise, then- это когда успешно завершилось начальное действие = это наш resolve
// //     setTimeout(() => { //настраиваем выполнение функции с задержкой
// //         product.status = 'order'; //добавляем нашему объекту свойство status со значением order
// //         console.log(product);
    
// //     }, 2000);
// // }); 

// // req.then((product) => { //используем наш promise, then- это когда успешно завершилось начальное действие = это наш resolve 
    
// //     const req2 = new Promise((resolve, reject) => { //создаем новое обещание, добавление нового свойства, если выполнится успешно, то 
// //         //вызываем функцию резолв, которая выведет в консоль лог наш объект
// //         setTimeout(() => { //настраиваем выполнение функции с задержкой
// //             product.status = 'order'; //добавляем нашему объекту свойство status со значением order            
// //             resolve(product);        
// //         }, 2000);
// //     });

// //     req2.then((data) => {
// //         console.log(data);
// //     });
    
// // }); 

// req.then((product) => { //используем наш promise, then- это когда успешно завершилось начальное действие = это наш resolve 
    
//     return new Promise((resolve, reject) => { //создаем новое обещание, добавление нового свойства, если выполнится успешно, то 
//         //вызываем функцию резолв, которая выведет в консоль лог наш объект
//         setTimeout(() => { //настраиваем выполнение функции с задержкой
//             product.status = 'order'; //добавляем нашему объекту свойство status со значением order            
//             resolve(product);      
//             reject();  
//         }, 2000);
//     });
// }).then((data) => {
//     data.modify = true;
//     return data;
    
// }).then((data) => {
//     console.log(data);
// }).catch(() => { //функция, которая передается как аргумент reject, когда произошла ошибка
//     console.error('Произошла ошибка');
// }).finally(() => { //функция, которая выполняется в конце обещаний, при ЛЮБОМ исходе и положительном и отрицательном
//     console.log('Finally');
// });

// //---!! Promise позволяет выполнять наш код в определенной и четкой последовательности, которая нам необходима !!---


//---!! !!---

const test = time => { //создаем переменную time с колбэк функцией
    return new Promise(resolve => { //возвращаем новый промис с одним аргументом resolve
        setTimeout(() => resolve(), time ); // создаем вызов асинхронной колбэк функции(сокращенная запись, так как в одну строку) которая будет вызывать функцию resolve через определенное время
    });
};

//---!! Когда надо вызывать одну и ту же функцию несколько раз, через определенное количество времени !!---


// test(1000).then(() => console.log('1000')); //вызываем тест, с указанием, что время 1 секунда, и выводим сообщение при положительном результате
// test(2000).then(() => console.log('2000')); //вызываем тест, с указанием, что время 1 секунда, и выводим сообщение при положительном результате


//Promise.all() - ждет сначала выполнение всех промисов, и только потом начинает их выполнять
Promise.all([test(1000), test(2000)]).then(() => {
    console.log('All');
}); //вызываем глобальный объект promise с методом all, куда передается массив промисов

//Promise.race(гонка) - ждет когда выполнится хоть один промис, самый первый и тогда выполняет колбэк функцию
Promise.race([test(1000), test(2000)]).then(() => {
    console.log('race');
}); //вызываем глобальный объект promise с методом race, куда передается массив промисов

