'use strict';

//AJAX - устаревшая версия передачи данных

const inputRub = document.querySelector('#rub'),
      inputUsd = document.querySelector('#usd');

    inputRub.addEventListener('input', () => { //отслеживаем событие инпут - любой ввод в инпуте
    const request = new XMLHttpRequest(); //создаем запрос на смервер (создаем новый объект)

    // request.open(method, url, async, login, pass); //метод, который собирает настройки, которые в будущем помогут отправить запрос на сервер
    //принимает несколько аргументов
    // 1й - метод (get(получить), post(отправить) и так далее)
    // 2й - путь по которому мы будем делать запрос(относительно html файла)
    //3й - отвечает за асинхронность(в каком порядке будет загружаться код - синхронный, по порядку, асинхронный-  кто быстрее загрузился тот и молодец)
    //4й/5й - логин и пароль

    request.open('GET', 'js/current.json');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); //http- заголовки, говорим серверу, что мы отправляем, тип файла, кодировки и так далее
    //мы говорим что у нас есть тип контента - application/json с кодировкой utf-8
    request.send(); //и наконец отправляем запрос на сервер
    //(если используем пост-запрос, отправляем данный, то в send, как аргумент принимает body, то что мы хотим отправить)

    //--- Свойства ---

    //status - статус запроса код (например 404)
    //statusText  - текст, который принадлежит статусу запроса (коду запроса - например 404 - не найдено)
    //response -  ответ на наш запрос от бэкенда, то что мы уже должны использовать на клиенте
    //readyState -  текущее состояние нашего запроса (будет обозначаться циферкой)
    //0 - unsent - объект создан, но метод open() еще не вызывался
    //1 - opened - метод open() был вызван
    //2 - headers-received - метод send() был вызван, достьупны заголовки и статус
    //3 - loading - Загрузка. responseText содержит частичные данные
    //4 - done - операция полностью завершена

    //Основные методы

    // request.addEventListener('readystatechange', () => { //readystatechange - отслеживает текущее состояние нашего запроса, следит за readyState
    //     if (request.readyState === 4 && request.status === 200) { //если готовность запроса 4(выполнен полностью) и статус запроса 200(успешно завершен)
    //         console.log(request.response); //посмотрим на ответ на наш запрос
    //         const data = JSON.parse(request.response); //создаем переменную data, в котором мы берем json и говорим что будем его парсить(то есть трансформировать в обычный объект), 
    //         //как аргумент вставляем какой именно json будем парсить, в данном случае ответ на наш запрос
    //         inputUsd.value = (+inputRub.value /  data.current.usd).toFixed(2); //записываем как значение инпута usd - числовое значение из инпута rub деленное на число полученое из свойства usd объекта current объекта data(json ответ с сервера)
    //     } else {
    //         inputUsd.value = 'loaded...'; //иначе, пишем для пользоввателя что что то пошла не так
    //     }
    // });

    request.addEventListener('load', () => { //load - когда запрос полностью отработал, следит за readyState
        if (request.status === 200) { //статус запроса 200(успешно завершен)            
            const data = JSON.parse(request.response); //создаем переменную data, в котором мы берем json и говорим что будем его парсить(то есть трансформировать в обычный объект), 
            //как аргумент вставляем какой именно json будем парсить, в данном случае ответ на наш запрос
            inputUsd.value = (+inputRub.value /  data.current.usd).toFixed(2); //записываем как значение инпута usd - числовое значение из инпута rub деленное на число полученое из свойства usd объекта current объекта data(json ответ с сервера)
        } else {
            inputUsd.value = 'loaded...'; //иначе, пишем для пользоввателя что что то пошла не так
        }
    });
    


});
