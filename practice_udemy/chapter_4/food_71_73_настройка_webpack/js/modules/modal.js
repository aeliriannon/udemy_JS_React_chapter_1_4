//чтобы код не повторялся два раза. необходимо создать одну функцию с повторяющимся кодом и использовать
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) { //создаем функцию для открытия модального окна
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if (modalTimerId) {
        clearInterval(modalTimerId); //говорим, что если действия выше уже отработали(пользователь сам открыл окно), то таймер отключить
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
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

    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector, modalTimerId);
    // modalCloseBtn = document.querySelector('[data-close]'); //---не будет работать с элементами, которые создаются динамически


    modalTrigger.forEach(btn => { //перебираем все кнопки
        btn.addEventListener('click', () => //отслеживаем на каждой кнопке клик
            // modal.classList.add('show'); //при клике на кнопку, модальному окну назначаем класс show
            // modal.classList.remove('hide'); // и убираем, если есть класс hide
            // document.body.style.overflow = 'hidden'; // также обращаемся к элементу body и прописываем ему инлайн стиль overflow: hidden, чтобы не прокручивалась страница
            openModal(modalSelector)
        );
    });



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
            closeModal(modalSelector); //а здесь функцию именно вызываем, так как нам надо ее выполнить только после того как выполнится условие
        }
    });

    document.addEventListener('keydown', (e) => { //отслеживаем нажатие клавиши на клавиатуре и передаем объект события
        if (e.code === 'Escape' && modal.classList.contains('show')) { //если код клавиши по которой кликнули равна строке искейп,
            //и так же проверяем содержит ли можальное окно класс show
            closeModal(modalSelector); //если условия соблюдены, то закрываем модальное окно
        }
    });


    //--- Модификации модального окна ---
    //--- Вызываем модальное окно через определенный промежуток времени ---

    //--- задача,если пользователь долистал страницу до конца, то открываем модальное окно ---

    function showModalByScroll() { //создаем функцию, открытия окна при скроллинге страницы вниз
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            //если высоте пролистанного контента(невидимого) + высота видимого контента больше или равно высоте всего документа(видимая и невидимая часть)
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); //говорим, что для окна браузера после того как окно модальное было ужек открыто,
            // мы убираем отслеживание события скролл и отработку функции открытия окна модального
        }
    }

    window.addEventListener('scroll', showModalByScroll); //отслеживаем скроллинг страницы и после этого определяем функцию открытия можального окна


}

// module.exports = modal;
export default modal; //создаем один дефолтный модуль
export {
    closeModal
};
export {
    openModal
}; //и два именованых