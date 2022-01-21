/*1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.
2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки
3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)
4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"
5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => { //добавляем отслеживание событий, загрузка ДОМ структуры, как только произойдет, тогда начнут работать скрипты
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };


    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type = "checkbox"]');

    addForm.addEventListener('submit', (event) => { //отслеживаем отправку формы(событие submit)
        event.preventDefault(); //отменяем у объекта события дефолтное поведение

        let newFilm = addInput.value; // записываем в переменную значение инпута
        const favorite = checkbox.checked; //проверяем у чекбокса стоит ли галочка

        if (newFilm) { //если название фитльмы введено - true

            if (newFilm.length > 21) { //если название фильма больше 21
                newFilm = `${newFilm.substring(0, 22)}...`;  //заменяем старую строку на новую, используя интерполяцию
                //используем метод сабстринг, который вырезает кусок строки с первого аргумента до второго аргумента
            }

            if (favorite) {
                console.log('Добавляем любимый фильм');
            }

            movieDB.movies.push(newFilm); //добавляем в массив фильм, который ввел пользователь
            sortArr(movieDB.movies); // сортируем элементы массива
            createMovieList(movieDB.movies, movieList); //переформировываем список фильмов с учетом новых данных

        }

        event.target.reset(); //обращаемся непосредственно к нашему элементу и очищаем данные
    });

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        }); //удаляем рекламные блоки
    };

    const makeChanges = () => {
        genre.textContent = 'драма'; // замена жанра фильма
        poster.style.backgroundImage = 'url("img/bg.jpg")'; // замена  картинки
    };

    const sortArr = (arr) => { //функция сортировки с аргументом который принимает массив
        arr.sort(); //сортируем массив
    };

    function createMovieList(films, parent) { //создаем функцию, которая будет составлять список фильмов и выводить их на странице

        parent.innerHTML = ""; //почистили родительский элемент
        sortArr(films);

        films.forEach((film, i) => { //перебираем массив фильмов и берем индек и значение элемента
            //к тому что есть в родительском элементе прибавляем еще доп конструкцию
            //пункт списка с классом в котором нумерация строки  + фильм
            parent.innerHTML += ` 
            <li class="promo__interactive-item">${i + 1} ${film} 
                <div class="delete"></div> 
            </li>
        `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {//выбираем все корзинки около названия фильмов и перебираем, берем каждую кнопку и ее индекс
            btn.addEventListener('click', () => { //на каждой корзинке отслеживаем клик
                btn.parentElement.remove(); //берем родительский элемент кнгопки и говорим - удали его со страницы
                movieDB.movies.splice(i, 1); //берем наш массив фильмов и с помощью сплайс удаляем элемент под номером индекса i, удаляем 1 элемент, то есть только итое
                createMovieList(films, parent); //используем рекурсию и нашу функцию вызываем в ней же, чтобы весь наш список перестроился заново
            });

        }); 
    }

    deleteAdv(adv); //вызываем функцию удаления элементов
    makeChanges();
    createMovieList(movieDB.movies, movieList); //вызываем функцию. чтобы создался список фильмов при первом входе на страницу
});