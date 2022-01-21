"use strict";  // используется для обозначения того, что код пишем в новом формате, пишев в верху главного документа

function hello() {
    console.log('hello World!');
}

hello();

function hi() {
    console.log('say hi!');
}

hi();

const arr = [1, 14, 4, 30, 54],
      sorted = arr.sort(compareNum);

function compareNum(a, b) {
    return a - b;
}