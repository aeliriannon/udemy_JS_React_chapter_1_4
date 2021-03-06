'use strict';

//JSON - JavaScript object notation - текстовый фолрмат обмена(хранения) данных

// const persone = { //создаем объект, некую персону
//     name: 'ALex',   //у персоны есть совйство name со значением Alex
//     tel: '+74444' //и свойство tel со значением +74444
// };

// console.log(JSON.stringify(persone)); //передаем наш объект на сервер с помощью объекта JSON и метода stringify

// //получим {"name":"Alex", "tel", "+74444"} -- главное правило json, все сущности записаны в двойных кавычках

// console.log(JSON.parse(JSON.stringify(persone))); // забираем с сервера объект (получим именно объект в его стандартном виде без двойных кавыячек)

const persone = { //создаем объект, некую персону
    name: 'ALex',   //у персоны есть совйство name со значением Alex
    tel: '+74444', //и свойство tel со значением +74444
    parents: {
        mom: 'Olga',
        dad: 'Mike'
    }
};

const clone = JSON.parse(JSON.stringify(persone)); 

//stringify наш объект отправит на сервер наш объект в json формате
//а парс потом заберет с сервера json и распарсит как объект
//таким образом получим полное клонирование(самостоятельное а не ссылку на прошлый объект) многоуровневого объекта