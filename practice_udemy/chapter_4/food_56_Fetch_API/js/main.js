'use strict';

window.addEventListener('DOMContentLoaded', () => { //отслеживаем загрузку контента на странице


    // --- Tabs ---

    //--- Создаем переменные ---

    const tabs = document.querySelectorAll('.tabheader__item'), //получаем псевдомассив табов из меню
        tabsContent = document.querySelectorAll('.tabcontent'), //получаем псевдомассив блоков с контентом табов
        tabsParent = document.querySelector('.tabheader__items'); // получаем родителя всех табов из меню

    //--- Скрываем ненужный контент для табов и убираем класс active с самих табов ---

    function hideTabContent() {
        tabsContent.forEach(item => { //перебираем псевдомассив блоков с контентом, берем каждый отдельно
            // item.style.display = 'none'; //обращаемся к свойству style и прописываем ему в свойство display значение none(инлайновые стили)
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        });

        tabs.forEach(item => { //перебираем псевдомассив табов
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

    function getTimeRemaining(endtime) { //созда ем функцию, которая будет вычислять сколько времени между сегодняшним днем и окончанием акции
        const t = Date.parse(endtime) - Date.parse(new Date()),
            //создаем техническую переменную, в  которой передаем разницу между окончанием акции в миллисекундах и текущей даты в миллисекундах
            days = Math.floor(t / (1000 * 60 * 60 * 24)), //переводим миллисекунды в количество дней
            //создаем переменную, которая роавна -> округляем до целого деление (нашей разницы во времени на произведение ->)
            // 1000миллисекунд * 60 (секунд) * 60часов * 24часа в сутках => столько миллисекунд в сутках
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), //переводим миллисекунды в количество часов
            //миллисекунды разницы течения нашей акции деленная на произведение 1000миллисекунд * 60сек * 60мин => получим всю акцию в часах
            //поскольку нам нужен остаток часов менее суток, то %24 делим с остатком на 24 и этот остаток округляем до целого - получаем часы
            minutes = Math.floor((t / (1000 * 60) % 60)), //получаем остаток менее часа  - оставшиеся минуты акции
            seconds = Math.floor((t / 1000) % 60); //получаем секунда - остаток меньше минуты

        return { //возвращаем полученные данные в виде объекта
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) { //функция, которое будет просверять число, если оно меньше 10, то спереди будет добавлять 0
        if (num >= 0 && num < 10) { //если наше число  больше или ровно 0 И меньше 10
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

            if (t.total <= 0) { //если общее колличество миллисекунд меньше или равно 0
                clearInterval(timeInterval); //останавливаем обновление нашей функции
            }
        }

    }

    setClock('.timer', deadline);

    //--- Модальное окно ---

    //Назначаем data-атрибуты для кнопок, по клику на которые будет появляться модальное окно

    //--- Мой вариант решения ---

    // const btnModal = document.querySelectorAll('[data-modal]');
    // const btnClose = document.querySelector('[data-close]');
    // const modalWindow = document.querySelector('.modal');

    // btnModal.forEach(item => {  //перебираем псевдомассив кнопок с дата атрибутом
    //     item.addEventListener('click', () => { //отслеживаем клик по каждой кнопке       
    //         modalWindow.classList.add('show', 'fade');  // говорим, что при клике, для элемента модальное окно, добавляем класс show
    //         modalWindow.classList.remove('hide'); //убрать класс hide
    //     });
    // });
    // btnClose.addEventListener('click', () => { //отслеживаем клик по кнопке close     
    //     modalWindow.classList.add('hide');  // говорим, что при клике, для элемента модальное окно, добавляем класс hide
    //     modalWindow.classList.remove('show', 'fade'); //говорим, чтобы удалил классы show и fade
    // });

    //--- Решение с преподавателем ---

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');
        // modalCloseBtn = document.querySelector('[data-close]'); //---не будет работать с элементами, которые создаются динамически


    modalTrigger.forEach(btn => { //перебираем все кнопки
        btn.addEventListener('click', () => { //отслеживаем на каждой кнопке клик
            // modal.classList.add('show'); //при клике на кнопку, модальному окну назначаем класс show
            // modal.classList.remove('hide'); // и убираем, если есть класс hide
            // document.body.style.overflow = 'hidden'; // также обращаемся к элементу body и прописываем ему инлайн стиль overflow: hidden, чтобы не прокручивалась страница
            openModal();
        });
    });

    //чтобы код не повторялся два раза. необходимо создать одну функцию с повторяющимся кодом и использовать
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // modalCloseBtn.addEventListener('click', () => {//отслеживаем на кнопке клик
    //     modal.classList.add('hide');//при клике на кнопку, модальному окну назначаем класс hide
    //     modal.classList.remove('show');// и убираем, если есть класс show
    //     document.body.style.overflow = ''; // также обращаемся к элементу body и прописываем ему инлайн стиль overflow(оставляем пустое значение, чтобы браузер сам решил какое значение по дефолту подставить)

    // });

    // modalCloseBtn.addEventListener('click', closeModal); //не вызываем функцию, а просто передаем, она сработает только после клика на элемент

    modal.addEventListener('click', function (e) { //отслеживаем клик на модальное окно
        if (e.target === modal || e.target.getAttribute('data-close') == '') { //проверяем, если событие таргет равно непосредственно модальному окну(серая подложка), 
            // или у самого элемента, на который мы кликнули есть аттрибут data-close(равно пустой строке, потому что мы туда ничего не помещаем), то
            // modal.classList.add('hide');//модальному окну назначаем класс hide
            // modal.classList.remove('show');// и убираем, если есть класс show
            // document.body.style.overflow = ''; // также обращаемся к элементу body и прописываем ему инлайн стиль overflow(оставляем пустое значение, чтобы браузер сам решил какое значение по дефолту подставить)    
            closeModal(); //а здесь функцию именно вызываем, так как нам надо ее выполнить только после того как выполнится условие
        }
    });

    document.addEventListener('keydown', (e) => { //отслеживаем нажатие клавиши на клавиатуре и передаем объект события
        if (e.code === 'Escape' && modal.classList.contains('show')) { //если код клавиши по которой кликнули равна строке искейп,
            //и так же проверяем содержит ли можальное окно класс show
            closeModal(); //если условия соблюдены, то закрываем модальное окно
        }
    });


    //--- Модификации модального окна ---
    //--- Вызываем модальное окно через определенный промежуток времени ---

    function openModal() { //создаем функцию для открытия модального окна
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId); //говорим, что если действия выше уже отработали(пользователь сам открыл окно), то таймер отключить
    }

    const modalTimerId = setTimeout(openModal, 50000); //создаем таймер отработки функции по открытию можального окна, говорим чтобы сработала она через 3 секунды

    //--- задача,если пользователь долистал страницу до конца, то открываем модальное окно ---

    function showModalByScroll() { //создаем функцию, открытия окна при скроллинге страницы вниз
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            //если высоте пролистанного контента(невидимого) + высота видимого контента больше или равно высоте всего документа(видимая и невидимая часть)
            openModal();
            window.removeEventListener('scroll', showModalByScroll); //говорим, что для окна браузера после того как окно модальное было ужек открыто,
            // мы убираем отслеживание события скролл и отработку функции открытия окна модального
        }
    }

    window.addEventListener('scroll', showModalByScroll); //отслеживаем скроллинг страницы и после этого определяем функцию открытия можального окна


    //--- Карточки рецептов ---

    //--- мое решение -- создание класса для карточки меню ---

    // const menuItem = document.querySelector('.menu__field .container');

    // class MenuItemCard {
    //     constructor(src, title, description, cost, alt) {
    //         this.src = src;
    //         this.alt = alt;
    //         this.title = title;
    //         this.description = description;
    //         this.cost = cost;
    //     }

    //     addedImage() {
    //         menuItem.insertAdjacentHTML('beforeend', `<div class="menu__item"> <img src="${this.src}" alt="${this.src}"><h3 class="menu__item-subtitle">${this.title}</h3> <div class="menu__item-descr">${this.description}</div> <div class="menu__item-divider"></div> <div class="menu__item-price"> <div class="menu__item-cost">Цена:</div> <div class="menu__item-total"><span>${this.cost}</span> грн/день</div> </div> </div>`);
    //     }
    // }

    // const itemFirst = new MenuItemCard('img/tabs/vegy.jpg', 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', '229', 'vegy');
    // const secondFirst = new MenuItemCard('img/tabs/post.jpg', 'Меню "Фитнес 2"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', '229', 'vegy');
    // const nextFirst = new MenuItemCard('img/tabs/elite.jpg', 'Меню "Фитнес 3"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', '229', 'vegy');

    // itemFirst.addedImage();
    // secondFirst.addedImage();
    // nextFirst.addedImage();

    //--- Решение преподаваиеля ---

    // class MenuCard { //создаем новый класс, название класса с большой буквы
    //     constructor(src, alt, title, descr, price, parentSelector) { //вызываем конструктор с аргументами 
    //         this.src = src;
    //         this.alt = alt;
    //         this.title = title;
    //         this.descr = descr;
    //         this.price = price;
    //         this.parent = document.querySelector(parentSelector);
    //         this.transfer = 27; //создаем свойство с курсом валют, для перевода в гривны
    //         this.changeToUAH(); //методы можно вызывать прямо внутри конструктора, чтобы он вывел нам итоговую сумму в гривнах
    //     }

    //     changeToUAH() { //создаем метод для конвертации валют в гривны
    //         this.price = this.price * this.transfer;

    //     }

    //     render() { //метод для создания верстки
    //         const element = document.createElement('div'); //создаем элемент, пока он существуект только в скриптах
    //         // вставляем в наш див нашу html структуру
    //         element.innerHTML = `
    //             <div class="menu__item">
    //                 <img src="${this.src}" alt="${this.alt}">
    //                 <h3 class="menu__item-subtitle">${this.title}</h3>
    //                 <div class="menu__item-descr">
    //                     ${this.descr}
    //                 </div>
    //                 <div class="menu__item-divider"></div>
    //                 <div class="menu__item-price">
    //                     <div class="menu__item-cost">Цена:</div>
    //                     <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    //                 </div>
    //             </div>
    //         `;

    //         this.parent.append(element); //говорим что в нашего родителя добавили наш элемент

    //     }

    // }

    // const div1 = new MenuCard(
    //     'img/tabs/vegy.jpg', 
    //     'vegy',
    //     'Меню "Фитнес"', 
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
    //     9,
    //     '.menu .container');

    // const div2 = new MenuCard(
    //     'img/tabs/elite.jpg', 
    //     'elite',
    //     'Меню “Премиум”', 
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
    //     9,
    //     '.menu .container');

    // const div3 = new MenuCard(
    //     'img/tabs/post.jpg', 
    //     'post',
    //     'Меню "Постное"', 
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
    //     9,
    //     '.menu .container');

    // div1.render();
    // div2.render();
    // div3.render();

    //new MenuCard().render(); -- можно делать такую запись если объект используется только здесь и сейчас

    //--- REST оператор и параметры по умолчанию

    class MenuCard { //создаем новый класс, название класса с большой буквы
        constructor(src, alt, title, descr, price, parentSelector, ...classes) { //вызываем конструктор с аргументами, последним аргументом передаем классы для элемента, который добавляем
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes; //переадваться будет массив классов из оператора rest
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27; //создаем свойство с курсом валют, для перевода в гривны
            this.changeToUAH(); //методы можно вызывать прямо внутри конструктора, чтобы он вывел нам итоговую сумму в гривнах
        }

        changeToUAH() { //создаем метод для конвертации валют в гривны
            this.price = this.price * this.transfer;

        }

        render() { //метод для создания верстки
            const element = document.createElement('div'); //создаем элемент, пока он существуект только в скриптах

            if (this.classes.length === 0) { //так как мы для rest оператора не можем назначить значения по дефолту, и он будет в любом случае true, так как даже если не будет введен класс, то он создаст пустой массив, а пустой массив это тру
                //то проверяем на длину массива, если он равен нулю, то назначаем значение по умолчанию
                this.element = 'menu__item'; //создваем новое свойство для данного элемента значение элемнета
                element.classList.add(this.element); //и голворим, что значение нового свойства добавим как новый класс в наш элемент

            } else {
                this.classes.forEach(className => element.classList.add(className)); //берем массив классов, перебираем его и каждый класс добавляем нашему новосозданному элементу

            }
            // вставляем в наш див нашу html структуру
            element.innerHTML = `
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">
                    ${this.descr}
                </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            this.parent.append(element); //говорим что в нашего родителя добавили наш элемент

        }

    }

    const div1 = new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container');

    const div2 = new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        9,
        '.menu .container');

    const div3 = new MenuCard(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        9,
        '.menu .container');

    div1.render();
    div2.render();
    div3.render();


// Отпаравука данных на сервер Forms

    const form = document.querySelectorAll('form'); //берем все формы с нашего сайта
    const message = { //создаем объект с ответами на нашу олтправку формы
        loading: 'icons/spinner.svg', //пока идет заргрузка формы
        success: 'Спасибо! Скоро мы с Вами свяжемся!', //при удачной отправке формы
        failure: 'Что-то пошло не так...' //при ошибке загрузки
    };

    form.forEach(item => { //перебираем наши формы
        postData(item); //и вызываем отправку формы текущей на сервер

    });

    function postData(form) { //Функция которая будет отправлять данные на сервер, как аргумент выступает форма для отправки
        form.addEventListener('submit', (e) => { //навешиваем на форму обработчик события сабмит, оно срабатывает при попытке отправить форму
            //событие отправик срабатывает либо при нажатии клавиши Enter, либо при клике на поле у которого стоит type='submit'
            e.preventDefault(); //отменяекм стандартное поведение браузера(перезагрузку страницы при отправке формы)

            const statusMessage = document.createElement('img'); //создаем новый элекмент на страницек для показа спинера при загрузке
            statusMessage.src = message.loading; //добавляем к картинке аттрибут src в котором будет прописан путь к картинке со спинером
            //прописываем инлайн-стили для нашей картинки со спинером
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage); //добавляем этот элемент-сообщение в нашу форму

            form.insertAdjacentElement('afterend', statusMessage); //добавляем наш спинер в структуру штмл, первый аттрибут указывает куда вставляем(после формы)
            //второй аттрибут что вставляем(наш спинер)

//---!! УСТАРЕВШИЙ  способ отправки запросов на сервер

            // const request = new XMLHttpRequest(); //создаем объект запроса с помощью конструктора XMLHttpRequest
            // request.open('POST', 'server.php'); //открывавем запрос(вводим данные по запросу: тип запроса и путь на который мы будем ссылаться)
            // request.setRequestHeader('Content-type', 'application/json'); //создаем заголовки запроса, что нам будет приходить

           
           const formData = new FormData(form); //формируем новый объект, с помощью конструктора formData который возьмет все данные пользователя из формы
            //как аргумент передаем ту форму из которой нам нужно собрать данные

            const object = {}; //создаем пустой объект, в который будут записываться данные из массива FormData

            formData.forEach(function(value, key) { //перебираем массив formData и передаем в функцию аргументы - значените и ключ, для формирования объекта
                object[key] = value; //берем наш объект и говорим, что ключ(индекс элекмента) объекта равен значению
            });

            // const json = JSON.stringify(object); //конвертируем наш полученный объект в json формат

            // request.send(json); //отправляем нашу объект, который мы сформировали с помощью json, на сервер

//---!! СОВРЕМЕННЫЙ  способ отправки запросов на сервер

            fetch('server.php', { //обращаемся к объекту fetch и как адресс отправки указываем наш server.php 
                //поскольку у нас будет POST запрос, то создаем объект для отправки данных
                method: 'POST', //метод отправки POST- запрос
                headers: { //прописываем заголовки
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object) //и как тело отправки указываем наш объект formData 

            }).then(data => data.text()) //полученные данные превращаем в текст
            .then(data => { //получаем с сервера какие то данные
                console.log(data); // выводим ответ на наш запрос
                showThanksModal(message.success); //вызываем функцию показа сообщений, в котором говорим, что все прошло успешно
                statusMessage.remove(); //и удаляем спинер со странички
            })
            .catch(() => { //при ошибки отправки запроса
                // при fetch не сработает c ошибкой в пути, так как получит все равно после запроса true с той только разницей, что в статусе будет false
               //сработает только с системными ошибками(например отстутствие интернета)
                showThanksModal(message.failure); //при неудачной загрузке вызываем функцию показа сообщений, в котором говорим, что все прошло плохо
            })
            .finally(() => { //выполняем при любом исходе запроса очистку формы
                form.reset(); //чистим данные формы, которые ввели
            });

            // request.addEventListener('load', () => { //на нашу отправку вешаем обработчик события и отслеживаем полную загрузку формы
            //     if (request.status === 200) { //проверяем что статус отправки положительный, все хорошо
            //         console.log(request.response); // выводим ответ на наш запрос
            //         showThanksModal(message.success); //вызываем функцию показа сообщений, в котором говорим, что все прошло успешно
            //         form.reset(); //чистим данные формы, которые ввели
            //         statusMessage.remove(); //и удаляем спинер со странички
            //     } else {
            //         showThanksModal(message.failure); //при неудачной загрузке вызываем функцию показа сообщений, в котором говорим, что все прошло плохо
            //     }
            // });
        });
    }

//---Наводим красоту ---

    function showThanksModal(message){ //создаем функцию, которая выводит(заменяет) модальное окно с сообщением для пользователя
        const prevModalDialog = document.querySelector('.modal__dialog'); //получаем наше модальное окно с сайта

        prevModalDialog.classList.add('hide'); // добавляем rjyntyne мод. окнf c формой класс hide, который скроет его от пользователя до того как его откроют
        openModal(); //далее открываем модальное окно 

        const thanksModal = document.createElement('div'); //Zсоздаем новый элемент для модального окна с сообщениями для клиента
        thanksModal.classList.add('modal__dialog');//добавляем новому элементу класс modal-dialog чтобы подтянулись стили для обертки контентной части модального окна
        //далее в наш блок кладем html-структуру
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>

        `;

        document.querySelector('.modal').append(thanksModal); //берем элемент модал и добавляем в него наш новый элемент modal-dialog
        setTimeout(() => { //устанавливаем таймер, который будет убирать сообщение и опять показывать форму
            thanksModal.remove();//убираем сообщение
            prevModalDialog.classList.add('show');//добавляем класс showи показываем обратно окно с формой
            prevModalDialog.classList.remove('hide'); //убираем класс hide
            closeModal(); //и закрываем модальное окно полностью
        }, 4000 );//через 4 секунды
    }

// //---!! API - интерфейс какого-то программного обеспечения, либо приложения !!---
// //---!! набор каких то инструментов и возможностей, которое нам дает какое то уже готовое решение !!---
// //---!! DOM API - это различные методы, которые дают нам возможность работать с элементами на странице !!---
// //---!! FECH API - встроеные в браузер инструмент, который позволяет общаться с сервером с помощью promise !!---


// //--- GET запрос

// fetch('https://jsonplaceholder.typicode.com/todos/1') //как аргумент передается тот url на который мы будем посылать запрос
// //в данном случаем мы просто получаем get запрос с этого url
// //вернется именно promise
//     .then(response => response.json()) //обрабатываем полученный промис с помощью then(при удачном выполнении запроса)
//     //вернется тоже promise и если удачно прошло то
//     //в данном случае мы берем ответ и добавляем к нему метод json() который полученный json превратит в обычный объект js
//     .then(json => console.log(json));//при удачной обработке файла мы выводим наш объект в консоль

// //--- POST запрос
// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST', //ОБЯЗАТЕЛЬНОЕ СВОЙСТВО
//     body: JSON.stringify({name: 'Alex'}), //ОБЯЗАТЕЛЬНОЕ СВОЙСТВО
//     headers: { //Желательное свойство, добавляем заголовки, какого типа данные мы отправляем
//         'Content-type': 'application/json'
//     }
// }) //как второй аргумент добавляется объект, с двумя обязательными свойствами - метод (POST), body(тело, данные, которые отправляем)
// //в данном случае оборачиваем новый объект в метод stringify, чтобы он этот объект сконвертировал и добавил в json
// .then(response => response.json()) 
// .then(json => console.log(json));

//---!! Современный способ работы с сервером !!---





});

