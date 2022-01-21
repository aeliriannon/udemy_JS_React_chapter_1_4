let commonCitiesList =["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];
let firstPerson = { //первый игрок
    privateCitiesList: [] //персональный список городов
};
let secondPerson = { //второй игрок
    privateCitiesList: [] //персональный список городов
};
let progressGame = { // прогресс игры
    allPerson: ['firstPerson', 'secondPerson'],
    currentPlayer: undefined, //текущий игрок
    currentCity: undefined //текущий город
};


//1  функция рандомного выбора первого игрока и первого слова

function randomGenerator(item) {
    let randomItem = item[Math.floor(Math.random() * item.length)]; //назначаем в переменную рандомное значение выбранное из массива нужного и возвращаем
    return randomItem; // Math.floor - округляет до ближайшего меньшего целого числа.
    //возвращаем выбранный элемент
}

//2 функция для составления персональных списков городов

function generatorPrivateCitiesList(list) {

    for (let value of list) { //запускаем цикл перебора основного списка городов
        if (value.length >= 6) { //если в названии города большек 6 букв, то
            firstPerson.privateCitiesList.push(value); //записываем это слово в приватный список городов первого игрока
        }
    }

    for (let value of list) { //запускаем цикл перебора основного списка городов
        let counter = 0; //счетчик глассных букв
        for (let char of value) { //запускаем цикл перебора букв в слове     
            if (char === 'a' || char === 'A' || char === 'i' || char === 'I' || char === 'E' || char === 'e' || char === 'O' || char === 'o' || char === 'U' || char === 'u' || char === 'Y' || char === 'y') {
                counter += 1;
            } // если буква совпадает с глассной, то записываем +1 в счетчик глассных
        }
        if (counter >= 3) { // если счетчик больше или равен 3, то
            secondPerson.privateCitiesList.push(value); //записываем город в массив городов второго игрока
        }
    }
}


//5 Выбирает первое рандомное слово и игрока

function chooseStartCity(all) {
    progressGame.currentPlayer = randomGenerator(all); //текущий игрок = рандомнову выбору из всех игроков
    if (progressGame.currentPlayer == 'firstPerson') { //если это первый игрок
        progressGame.currentCity = randomGenerator(firstPerson.privateCitiesList); //то выбираем слово из его словаря

    } else {
        progressGame.currentCity = randomGenerator(secondPerson.privateCitiesList); // если это второй игрок то из словаря второго игрока
    }
}

//6 Смена игрока

function changePerson(person) {

    if (person == 'firstPerson') { //если текущий игрок это первый игрок
        progressGame.currentPlayer = 'secondPerson'; //то меняем его на второго
    } else {
        progressGame.currentPlayer = 'firstPerson'; //иначе, меняем его на первого
    }
}

//7 выбираем нужное слово

function definitionCurrentCity(cWord, list, cPerson, usedCityList) { // последнее слово/список нового игрока/ новый игрок / массив использованных слов
    let lastLetter = cWord[cWord.length - 1]; // берем последнюю букву последнего слова
    if (cPerson == 'firstPerson') { //если текущий игрок - первый
        list = firstPerson.privateCitiesList; // то список слов используем из массива первого игрока
    } else {
        list = secondPerson.privateCitiesList; // иначе из массива второго
    }
    for (let value of list) { // перебираем список нового игрока
        let firstLetter = value[0].toLowerCase(); //то берем первую букву этого слова
        if (lastLetter == firstLetter) { // если первая и последняя буква равны     
            progressGame.currentCity = value; // то текущее слово равно новому слову
            return progressGame.currentCity;
        } else {
            progressGame.currentCity = undefined; //иначе назначаем андефайнд
        }
        if (progressGame.currentCity != undefined) { // если новое слово не равно андефайнд, заканчиваем цикл
            break;
        }

    }
}


function deleteCitty(cCity) {
    let indexCity = commonCitiesList.indexOf(cCity);
    commonCitiesList.splice(indexCity, 1);
    firstPerson.privateCitiesList = [];
    secondPerson.privateCitiesList = [];

}


// ---Game


function playGame() {
    for(let i = 0; ; i++) {
        console.log(`${progressGame.currentPlayer}: ${progressGame.currentCity}`);
        changePerson(progressGame.currentPlayer);
        definitionCurrentCity(progressGame.currentCity, undefined, progressGame.currentPlayer, progressGame.usedCityList);       
            
        if(progressGame.currentCity == undefined) {
            if(progressGame.currentPlayer == 'firstPerson') {
                console.log('Winner is secondPerson');
            } else {
                console.log('Winner is firstPerson');
            }
            break;
        }

        deleteCitty(progressGame.currentCity);
        generatorPrivateCitiesList(commonCitiesList);
        
    }
}

generatorPrivateCitiesList(commonCitiesList);
chooseStartCity(progressGame.allPerson);
playGame();