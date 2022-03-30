'use strict';
import tabs from './modules/tabs';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import openModal from './modules/modal';

window.addEventListener('DOMContentLoaded', () => { //отслеживаем загрузку контента на странице

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000); //создаем таймер отработки функции по открытию можального окна, говорим чтобы сработала она через 3 секунды


    // const tabs = require('./modules/tabs'),
    //     calc = require('./modules/calc'),
    //     cards = require('./modules/cards'),
    //     forms = require('./modules/forms'),
    //     modal = require('./modules/modal'),
    //     slider = require('./modules/slider'),
    //     timer = require('./modules/timer');



    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    calc();
    cards();
    forms('form', modalTimerId);
    modal('[data-modal]', '.modal', modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });


    timer('.timer', '2022-06-11');

});