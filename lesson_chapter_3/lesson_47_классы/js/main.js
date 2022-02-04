'use strict';

//Классы - это те же функции, просто красивее, используются для создания объектов функции-конструкторы

class Rectangle { //создаем класс с названием Rectangle(имя всегда с большой буквы пишем)
    constructor(height, width) { //конструируем наш объект/ ключевое слово constructor и в скобках передаваемые аргументы, как в стандартной функции
        this.height = height; //записываем свойства, которые будут применяться к объекту, который мы будем создавать
        this.width = width;
    }

    calcArea() { //методы в классах записываются без ключевого свойства function, просто название метода и фигурные скобки
        return this.height * this.width;
    }

}

const square = new Rectangle(10, 10); //создаем новый объект на основе класса ректангл с двумя аргументами
//теперь у нас есть объект square в котором есть два свойства width и height. а также метод calcErea


console.log(square.calcArea());


class ColoredRectangleWithText extends Rectangle { //создаем новый класс, который наследует (extends) структуру класса Rectangle
    constructor(height, width, text, bgColor) { //вызываем конструктор для создания свойств нашего объекта, передаем аргументы и те, что в наследуемом классе + новые
        super(height, width); //вызываем супер конструктор, который переносит свойства, которые были у наследуемогол класса
        //указываем только те свойства, которые нам нужны, не обязательно переносить все
        //super - конструктор этот должен быть всегда на первом месте, остальные свойства идут только после него
        this.text = text;
        this.bgColor = bgColor;

    }

    showMyProps() { //метод с наследуемого класса переносится в этот автоматически
        console.log(`Текст: ${this.text}, цвет: ${this.bgColor}`);
    }

}

const div = new ColoredRectangleWithText(10, 50, 'я всё вижу', 'red');

div.showMyProps();
console.log(div.calcArea());