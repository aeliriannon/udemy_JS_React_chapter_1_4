'use strict';

// Создаем переменные

//общий список городов
let commonCitiesList = ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];
let firstPerson = { //первый игрок
    privateCitiesList: []  //персональный список городов
};
let secondPerson = {  //второй игрок
    privateCitiesList: [] //персональный список городов
};
let progressGame = {  // прогресс игры
    allPerson: ['firstPerson', 'secondPerson'],
    currentPlayer: undefined,
    currentPlayerList: undefined,  //текущий игрок
    currentCity: undefined,  //текущий город
    usedCityList: []  //использованные слова

};



//функции необходимые для игры

//1  функция рандомного выбора первого игрока и первого слова

function randomGenerator(item) { 
	let randomItem = item[Math.floor(Math.random()*item.length)]; //назначаем в переменную рандомное значение выбранное из массива нужного и возвращаем
	return randomItem;  // Math.floor - округляет до ближайшего меньшего целого числа.
    //возвращаем выбранный элемент
}

//2 функция для составления персональных списков городов

function generatorPrivateCitiesList(list) {    
    for (let value of list) {
        if(value.length >= 6) {
            firstPerson.privateCitiesList.push(value);
        }
    }
    
    for (let value of list) {
        let counter = 0;
        for (let char of value) {        
            if( char === 'a'||char ==='A'||char ==='i'||char ==='I'||char ==='E'||char ==='e'||char ==='O'||char ==='o'||char ==='U'||char ==='u'||char ==='Y'||char ==='y') {
                counter += 1;
            }        
        }
        if(counter >= 3) {
            secondPerson.privateCitiesList.push(value);
        }
    }
}

//3 Выбираем нужное слово

function definitionCurrentCity(cWord, list) {
    let lastLetter = cWord[cWord.length - 1];
    progressGame.usedCityList.push(cWord);
    for(let value of list) {
        for(let item of progressGame.usedCityList) {
            if(value != item) {
                let firstLetter = value[0].toLowerCase();
                if(lastLetter == firstLetter) {           
                    progressGame.currentCity = value;
                    return progressGame.currentCity;
                } else {
                    progressGame.currentCity = undefined;
                }
                if(progressGame.currentCity != undefined) {
                    break;
                }
            }           
        }
        if(progressGame.currentCity != undefined) {
            break;
        }
        
    }
}

//4 Удаляем сыграное слово

// function deleteCurrentCity(list, cWord) {
//     for(let i=0; i<= list.length; i++) {
//         if(list[i] == cWord) {
//             list.splice(i, 1);
//             delete list[i];
//             break;
//         }
//     }
// }

//5 Выбирает первое рандомное слово и игрока

function chooseStartCity() {
    progressGame.currentPlayer = randomGenerator(progressGame.allPerson);
    if(progressGame.currentPlayer == 'firstPerson') {
        progressGame.currentCity = randomGenerator(firstPerson.privateCitiesList);
        progressGame.currentPlayerList = firstPerson.privateCitiesList;

    } else {
        progressGame.currentCity = randomGenerator(secondPerson.privateCitiesList);  
        progressGame.currentPlayerList = secondPerson.privateCitiesList;      
    }
    return progressGame.currentPlayer;
}

//6 Смена игрока

function changePerson(person) {
    
    if(person == 'firstPerson') {
        progressGame.currentPlayer = 'secondPerson';
        progressGame.currentPlayerList = secondPerson.privateCitiesList;
    } else {
        progressGame.currentPlayer = 'firstPerson';
        progressGame.currentPlayerList = firstPerson.privateCitiesList;
    }
}




// ------- ИГРА-------




function playGame(player, city, cList) {
    while(city != undefined) {
        // console.log(`${player}: ${city}`);
        // deleteCurrentCity(commonCitiesList, city);
        // // console.log(commonCitiesList);
        // generatorPrivateCitiesList(commonCitiesList);
        changePerson(player);
        definitionCurrentCity(city, cList);
        if(city == undefined) {
            if(player == 'firstPerson') {
                console.log('Winner is secondPerson');
            } else {
                console.log('Winner is firstPerson');
            }
            break;
        }
    }
}


generatorPrivateCitiesList(commonCitiesList);
randomGenerator(progressGame.allPerson);
chooseStartCity(progressGame.currentPlayer);
playGame(progressGame.currentPlayer, progressGame.currentCity, progressGame.currentPlayerList);
