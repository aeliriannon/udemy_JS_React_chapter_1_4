function cards() {
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

    // class MenuCard { //создаем новый класс, название класса с большой буквы
    //     constructor(src, alt, title, descr, price, parentSelector, ...classes) { //вызываем конструктор с аргументами, последним аргументом передаем классы для элемента, который добавляем
    //         this.src = src;
    //         this.alt = alt;
    //         this.title = title;
    //         this.descr = descr;
    //         this.price = price;
    //         this.classes = classes; //переадваться будет массив классов из оператора rest
    //         this.parent = document.querySelector(parentSelector);
    //         this.transfer = 27; //создаем свойство с курсом валют, для перевода в гривны
    //         this.changeToUAH(); //методы можно вызывать прямо внутри конструктора, чтобы он вывел нам итоговую сумму в гривнах
    //     }

    //     changeToUAH() { //создаем метод для конвертации валют в гривны
    //         this.price = this.price * this.transfer;

    //     }

    //     render() { //метод для создания верстки
    //         const element = document.createElement('div'); //создаем элемент, пока он существуект только в скриптах

    //         if (this.classes.length === 0) { //так как мы для rest оператора не можем назначить значения по дефолту, и он будет в любом случае true, так как даже если не будет введен класс, то он создаст пустой массив, а пустой массив это тру
    //             //то проверяем на длину массива, если он равен нулю, то назначаем значение по умолчанию
    //             this.element = 'menu__item'; //создваем новое свойство для данного элемента значение элемнета
    //             element.classList.add(this.element); //и голворим, что значение нового свойства добавим как новый класс в наш элемент

    //         } else {
    //             this.classes.forEach(className => element.classList.add(className)); //берем массив классов, перебираем его и каждый класс добавляем нашему новосозданному элементу

    //         }
    //         // вставляем в наш див нашу html структуру
    //         element.innerHTML = `
    //             <img src="${this.src}" alt="${this.alt}">
    //             <h3 class="menu__item-subtitle">${this.title}</h3>
    //             <div class="menu__item-descr">
    //                 ${this.descr}
    //             </div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
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

    //---!! способ создания карточек с данными получеными из базы данных !!---

    // const getResource = async (url) => { //создаем функцию запроса данных для карточек товаров из json файла
    //     let res = await fetch(url); //вызываем fetch с адресом ресурса

    //     if (!res.ok) { //пишем запрос на статус объекта, если НЕ ок
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }
    //     return await res.json(); //возвращаем промис в виде js
    // };

    // // getResource('http://localhost:3000/menu') //вызываем функцию getResources с адресом на нашу базу данных
    // //     .then(data => { //берем полученные данные, которые у нас уже в виде объекта(в нашем случае массива)
    //         // data.forEach(({
    //         //     img,
    //         //     altimg,
    //         //     title,
    //         //     descr,
    //         //     price
    //         // }) => { //используем диструкторизацию объекта, в фиг.скобках, укаазываем свойства объекта, значения которых нам необходимо применить
    //         //     new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); //вызываем наш конструктор MenuCard столько раз, сколько объектов придет с сервера


    //         // });
    // //     });

    // // getResource('http://localhost:3000/menu') //вызываем функцию getResources с адресом на нашу базу данных
    // //     .then(data => createCard(data));

    // axios.get('http://localhost:3000/menu')
    // .then(data => {
    //     data.data.forEach(({
    //         img,
    //         altimg,
    //         title,
    //         descr,
    //         price
    //     }) => { //используем диструкторизацию объекта, в фиг.скобках, укаазываем свойства объекта, значения которых нам необходимо применить
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); //вызываем наш конструктор MenuCard столько раз, сколько объектов придет с сервера


    //     });
    // });

    // function createCard(data) { //создаем функцию, которая будет формировать карточки на странице, как атрибут будут данные пришедшие с сервера
    //     data.forEach(({ //перебираем массив объектов полученых с сервера, как аргументы вносим деструктуризацию объекта
    //         img,
    //         altimg,
    //         title,
    //         descr,
    //         price
    //     }) => {
    //         const element = document.createElement('div'); //создаем новый див
    //         element.classList.add('menu__item'); //задем этому элементу класс
    //         // вставляем в наш див нашу html структуру
    //         element.innerHTML = ` 
    //             <img src="${img}" alt="${altimg}">
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">
    //                 ${descr}
    //             </div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .container').append(element); //вставляем наш новый элемент в меню контейнер
    //     });
    // }

}

// module.exports = cards;
export default cards;