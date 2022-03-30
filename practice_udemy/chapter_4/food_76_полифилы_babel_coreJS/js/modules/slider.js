function slider({
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
}) {


    //---SLIDER V1 ---

    //--- Мой код, НЕ зарабюотал ---

    // const prevArrow = document.querySelector('.offer__slider-prev'),
    //       nextArrow = document.querySelector('.offer__slider-next'),
    //       parentArrows = document.querySelector('offer__slider-counter'),
    //       currentCounter = document.querySelector('#current'),
    //       totalCounter = document.querySelector('#total'),
    //       sliderItems = document.querySelectorAll('.offer__slide');

    //     console.log(sliderItems);

    //     function startSliderItem() {
    //         sliderItems.forEach((item, i) => {
    //             if(i === 0) {
    //                 item.classList.add('show');
    //                 item.classList.remove('hide');
    //                 if(i+1 < 10) {
    //                     currentCounter.innerHTML = `0${i+1}`;
    //                 } else {
    //                     currentCounter.innerHTML = `${i+1}`;
    //                 }  
    //             } else {
    //                 item.classList.add('hide');
    //             }        
    //         });
    //     }



    // function checkNumberItems(arrow, box) {
    //     const arrowItems = sliderItems.length;
    //     if(arrowItems < 10) {
    //         box.innerHTML = `0${arrowItems}`;
    //     } else {
    //         box.innerHTML = `${arrowItems}`;
    //     }        
    // }    

    // function nextSlide() {
    //     nextArrow.addEventListener('click', (event) => {
    //         const target = event.target; 

    //         if(target && target.classList.contains('offer__slider-next')) {
    //             const num = + currentCounter.innerHTML;
    //             const index = num -1;

    //             console.log(num);
    //             console.log(index);
    //             console.log(sliderItems.length);
    //             if(num > sliderItems.length - 1) {
    //                 startSliderItem();
    //             }  else {

    //                 sliderItems[index].classList.add('hide');
    //                 sliderItems[index].classList.remove('show');
    //                 sliderItems[num].classList.add('show');
    //                 sliderItems[num].classList.remove('hide');
    //                 if(num + 1 < 10) {
    //                     currentCounter.innerHTML = `0${num + 1}`;
    //                 } else {
    //                     currentCounter.innerHTML = `${num + 1}`;
    //                 }

    //             }


    //         }


    //     });
    // }

    // function prevSlide() {
    //     prevArrow.addEventListener('click', (event) => {
    //         const target = event.target; 

    //         if(target && target.classList.contains('offer__slider-prev')) {
    //             let num = + currentCounter.innerHTML;
    //             let index = num - 1;

    //             if(num < 2) {
    //                 num = + sliderItems.length -1;
    //                 index = num - 1;
    //             }  
    //             console.log(num);
    //             console.log(index);
    //             console.log('prev');

    //             sliderItems[index].classList.add('hide');
    //             sliderItems[index].classList.remove('show');
    //             sliderItems[index - 1].classList.add('show');
    //             sliderItems[index - 1].classList.remove('hide');
    //             if(num - 1 < 10) {
    //                 currentCounter.innerHTML = `0${num - 1}`;
    //             } else {
    //                 currentCounter.innerHTML = `${num - 1}`;
    //             }


    //         } 

    //     });
    // }


    // function showSliderItem() {
    //     startSliderItem();
    //     nextSlide();
    //     prevSlide();

    // }
    // showSliderItem();

    // checkNumberItems(sliderItems, totalCounter);


    //--- Вариант преподавателя ---

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width; //обращаемся к окнцу браузера и просим данные о стилях, которые были применены уже к определенным блокам
    //(в данном случае обертке слайдера и получаем ширину)
    let slideIndex = 1,
        offset = 0; //переменная показывающая сколько мы уже отступили



    //--- slider 2 ---

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%'; //задаем для контейнера всех слайдеров ширину равную количество слайдов * 100%
    //так как каждый слайд будет занимать 100% видимого родителя
    slidesField.style.display = 'flex'; //меняем для контейнера слайдов дисплей на флекс, чтобы слайды выстроились в ряд
    slidesField.style.transition = '0.5s all'; //и говорим, что слайды заменяться должны плавно

    slidesWrapper.style.overflow = 'hidden'; //для видимого родителя назначаем overflow:hidden, чтобы обрезать лишние файлы

    slides.forEach(slide => { //перебираем каждый слайд
        slide.style.width = width; //каждому слайду назначаем ширину равную ширине видимого родителя
    });

    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
        dots = [];


    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        //добавляем к li data-фттрибут со значением равным i+1((индекс в массиве + 1))
        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => { //сдвиг слайдера на следующий слайд
        //делаем проверку не дошел ли слайдер до последнего слайда
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { //если наш отступ равен ширине всех наших слайдов(то есть дошли до конца слайдов)
            //+width - превращаем строку в числовойтип данных
            //затем вырезаем из строки ширины все символы начиная с нулевого заканчивая 3им с конца
            //то есть два крайних, которые в строке (px) выкидываем
            offset = 0; //то устанавливаем ему значение 0(то есть говорим отсчитывать слайды сначала)
        } else { //если отступ не дошел до конца
            offset += deleteNotDigits(width); //мы к нему прибавляем ширину одного слайда, то есть сдвигаем на шаг
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        //обращаемся к контейнеру слайдеров и говорим, что он должен сдвинуться влево на определенное количесатво пикселей

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;

    });

    prev.addEventListener('click', () => { //сдвиг слайдера на следующий слайд
        //делаем проверку не дошел ли слайдер до последнего слайда
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            //получаем значение аттрибута того элемента по которому кликнули

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;


            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;


        });
    });
}

// module.exports = slider;
export default slider;