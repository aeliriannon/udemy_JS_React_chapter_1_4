'use strict';

window.addEventListener('DOMContentLoaded', () => {  //отслеживаем загрузку контента на странице

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


});