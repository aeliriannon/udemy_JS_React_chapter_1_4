"use strict"; // используется для обозначения того, что код пишем в новом формате, пишев в верху главного документа

//--- СОБЫТИЯ ---

// --- touchstart - при касании к элементу --- 
// --- touchmove - когда коснулся и двигаешь пальцем, каждое движение будет обрабатываться ---
// --- touchend - как только палец оторвался от элемента ---
// --- touchenter - срабатывает когда мы ведем по экрану и наскальзываекм на элемент с этим событием ---
// --- touchleave - срабатывает, когда мы скользим по нужному элементу и соскальзываем за его край ---
// --- touchcancel -  срабатывает когда мы вышли за зону видимости браузера ---

window.addEventListener('DOMContentLoaded', () => {
    const box = document.querySelector('.box');

    box.addEventListener('touchstart', (e) => {
        e.preventDefault(); //рекомендуется для мобильных устройств всегда отменять стандартное поведение элементов сразу

        console.log('start');
    });
});


//---СВОЙСТВА ОБЪЕКТА СОБЫТИЙ EVENT ---

//--- touches - отслеживает сколько пальцев касается экрана ---
//--- targetTouches - отслеживает сколько пальцев касается конкретного элемента ---
//--- changedTouches - список пальцев, которые учавствуют в данном событии ---

window.addEventListener('DOMContentLoaded', () => {
    const box = document.querySelector('.box');

    box.addEventListener('touchstart', (e) => {
        e.preventDefault(); //рекомендуется для мобильных устройств всегда отменять стандартное поведение элементов сразу

        console.log('start');
        console.log(e.touches );
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const box = document.querySelector('.box');

    box.addEventListener('touchmove', (e) => {
        e.preventDefault(); //рекомендуется для мобильных устройств всегда отменять стандартное поведение элементов сразу

        console.log(e.targetTouch[0].pageX); //покажет координаты первого пальца
    });
});