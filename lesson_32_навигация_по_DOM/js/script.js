"use strict"; // используется для обозначения того, что код пишем в новом формате, пишев в верху главного документа


//--- От родителя к дочерним ---

// console.log(document.body); //обращаемся к элементу body
// console.log(document.head); //обращаемся к head
// console.log(document.documentElement); //выводит все содержимое страницы
// console.log(document.body.childNodes); //выводит дочерние узлы(text - это перенос строки)
// console.log(document.body.firstChild); //выводит первый дочерний узел(не элемент)
// console.log(document.body.lastChild); //выводит последний дочерний узел(не элемент)
// console.log(document.body.firstElementChild); //выводит первый дочерний элемент
// console.log(document.body.lastElementChild); //выводит последний дочерний элемент

for (let node of document.body.childNodes) {  // перебираем все дочерние узлы элемента body
    if (node.nodeName == '#text') { //если нод нэйм текущей ноды равен данной строке
        continue;  //останавливаем текукщий цикл и заново начинаем цикл со следующим элементом
    }

    console.log(node);

}


//--- От дочернего к родителю  ---

// console.log(document.querySelector('#current').parentNode); //выводит ближайший родительский узел этого элемента
// console.log(document.querySelector('#current').parentNode.parentNode); //выведет родителя второго уровня
// console.log(document.querySelector('#current').parentElement);//выводит ближайший родительский элемент этого элемента


//--- data-атрибуты  ---

// console.log(document.querySelector('[data-current="3"]')); // получаем элемент с соответствующим дата-атрибутом
// console.log(document.querySelector('[data-current="3"]').nextSibling); //получаем узел следующий за тем, которому пренадлежит этот дата-атрибут
// console.log(document.querySelector('[data-current="3"]').previousSibling); // получаеми узел, который следует перед нашим

// console.log(document.querySelector('[data-current="3"]').nextElementSibling); //получаем элемент следующий за тем, которому пренадлежит этот дата-атрибут
// console.log(document.querySelector('[data-current="3"]').previousElementSibling); // получаеми элемент, который следует перед нашим