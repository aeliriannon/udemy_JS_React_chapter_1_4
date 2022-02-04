'use strict';

window.addEventListener('DOMContentLoaded', () => {  //отслеживаем загрузку контента на странице


// --- Tabs ---

//--- Создаем переменные ---

    const tabs = document.querySelectorAll('.tabheader__item'), //получаем псевдомассив табов из меню
        tabsContent = document.querySelectorAll('.tabcontent'), //получаем псевдомассив блоков с контентом табов
        tabsParent = document.querySelector('.tabheader__items'); // получаем родителя всех табов из меню

        console.log(tabs);
        console.log(tabsContent);
//--- Скрываем ненужный контент для табов и убираем класс active с самих табов ---
    
    function hideTabContent() {
        tabsContent.forEach(item => {  //перебираем псевдомассив блоков с контентом, берем каждый отдельно
            // item.style.display = 'none'; //обращаемся к свойству style и прописываем ему в свойство display значение none(инлайновые стили)
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        });        

        tabs.forEach(item => {  //перебираем псевдомассив табов
            item.classList.remove('tabheader__item_active'); //берем каждый таб, обращаемся к объекту класслист и задаем метод ремув - удаляем указанный класс
        });
    }

//--- Показываем нужный контент для табов и добавляем класс active на нужный нам тьаб ---

    function showTabContent(i = 0) { //стандарт es6, если не передается аргумент, то подставится 0
        // tabsContent[i].style.display = 'block'; //прописываем для конкретного блока с контентом инлайновый стиль дисплей блок
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add('tabheader__item_active'); //для конкретнгого таба добавляем класс активности
    }

//--- вызываем функции ---

    hideTabContent();
    showTabContent();

//--- используем делегирование, отслеживаем клик на один из табов, задаем ему классактивности  и открываем нужный таб ---

    tabsParent.addEventListener('click', (event) => { //отслеживаем клик в родителе табов
        const target = event.target; //создаем переменную с объектом таргет

        if (target && target.classList.contains('tabheader__item')) { //проверяем есть ли вообще объект таргет у события и проверяем соответствие класса, по тому ли элементу мы кликнули
            tabs.forEach((item, i) => { //перебираем псевдомассив всех табов, берем таб и его индекс
                if (target == item) { //если объект таргет равен нашему данному элементу
                    hideTabContent();
                    showTabContent(i); //переключаем табы
                }

            });

        }

    });

//--- Timer ---

    const deadline = '2022-02-24'; //дата окончания акции

    function getTimeRemaining(endtime) {  //созда ем функцию, которая будет вычислять сколько времени между сегодняшним днем и окончанием акции
        const t = Date.parse(endtime) - Date.parse(new Date()),
         //создаем техническую переменную, в  которой передаем разницу между окончанием акции в миллисекундах и текущей даты в миллисекундах
              days = Math.floor(t / (1000 * 60 *60 *24)), //переводим миллисекунды в количество дней
              //создаем переменную, которая роавна -> округляем до целого деление (нашей разницы во времени на произведение ->)
              // 1000миллисекунд * 60 (секунд) * 60часов * 24часа в сутках => столько миллисекунд в сутках
              hours = Math.floor((t / (1000 * 60 * 60) % 24)), //переводим миллисекунды в количество часов
              //миллисекунды разницы течения нашей акции деленная на произведение 1000миллисекунд * 60сек * 60мин => получим всю акцию в часах
              //поскольку нам нужен остаток часов менее суток, то %24 делим с остатком на 24 и этот остаток округляем до целого - получаем часы
              minutes = Math.floor((t / (1000 * 60) % 60)), //получаем остаток менее часа  - оставшиеся минуты акции
              seconds = Math.floor((t / 1000 ) % 60); //получаем секунда - остаток меньше минуты

              return { //возвращаем полученные данные в виде объекта
                'total': t,
                'days' : days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
              };       
    }

    function getZero(num) { //функция, которое будет просверять число, если оно меньше 10, то спереди будет добавлять 0
        if(num >= 0 && num < 10) { //если наше число  больше или ровно 0 И меньше 10
            return `0${num}`; //то возвращаем вместо числа строку с 0 впереди
        } else {
            return num; //иначе ничего не модифицируем, а просто возвращаем число
        }
    }

    function setClock(selector, endtime) { //устанавливаем наши часы на сайте
        const timer = document.querySelector(selector), //берем элемент с таймером со страницы
              days = timer.querySelector('#days'), //элемент для записи дней
              hours = timer.querySelector('#hours'), //элемент для записи часов
              minutes = timer.querySelector('#minutes'), //элемент для записи минут
              seconds = timer.querySelector('#seconds'), //элемент для записи секунд
              timeInterval = setInterval(updateClock, 1000); //говорим что функцию обновления счетчика надо обновлять каждую секунду

        updateClock(); //вызываем функцию первый раз, чтобы не ждать обновления таймера 1000миллисекунд

        function updateClock() { //создаем функцию, которая будет обновлять наш счетчик каждую секунду
            const t = getTimeRemaining(endtime); //получаем наш объект с оставшимися днями минутами часами

            days.innerHTML = getZero(t.days); // в элемент с индетификатором days записываем данные из рассчитанного выше объекта свойство days
            hours.innerHTML = getZero(t.hours); //записываем оставшиеся часы
            minutes.innerHTML = getZero(t.minutes); //записываем оставшиеся минуты
            seconds.innerHTML = getZero(t.seconds); //записываем оставшиеся секунды

            if(t.total <= 0) { //если общее колличество миллисекунд меньше или равно 0
                clearInterval(timeInterval); //останавливаем обновление нашей функции
            }
        }

    }

    setClock('.timer', deadline);


});