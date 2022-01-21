"use strict"; // используется для обозначения того, что код пишем в новом формате, пишев в верху главного документа

const p = document.querySelectorAll('p');
console.log(p);



function loadedScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.async = false; //говорим, чтобы скрипт загружался по порядку, а не по мере загрузки
    document.body.append(script);
}

loadedScript('js/test.js');
loadedScript('js/some.js'); //будут загружаться строго по порядку
