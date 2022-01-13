let generalCityList = ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];
let historyCityList = [];
let onePerson = {
	cityList: []
};
let twoPerson = {
	cityList: []
};
let lastLetter;
let currentWord = 'Aberdeen'; 
let firstStepUser = ['onePerson', 'twoPerson'];

function oneCityList() { //функция составляет массив городо для первого игрока
	for (let i = 0; i < generalCityList.length; i++) { // перебираем общий массив городов
		let currentCity = generalCityList[i]; // переменной задаем значение текщего города в цикле
		if (currentCity.length <= 6) { // сравниваем количество букв в названии данного города с 6, если меньше или равно
			onePerson.cityList.push(currentCity); // то записываем этот город в массив городов первого игрока
		}
	}
}

function twoCityList() { //функция составляет массив городо для второго игрока
	for (let i = 0; i < generalCityList.length; i++) { // перебираем общий массив городов
		let currentCity = generalCityList[i]; // переменной задаем значение текщего города в цикле
		let number = 0 // переменная для подсчета количества глассных букв в данном городе
		for (let char of currentCity) { //перебираем буквы в названии города
			if (char === 'a' || char === 'A' || char === 'i' || char === 'I' || char === 'E' || char === 'e' || char === 'O' || char === 'o' || char === 'U' || char === 'u' || char === 'Y' || char === 'y') {
				number += 1 // если буква совпадает с согласными то добавляем 1
			} else {
				number += 0 // если буква не совпадает с гласными, то прибавляем 0
			}
		}
		if (number >= 3) { // сравниваем количество глассных с цифрой 3
			twoPerson.cityList.push(currentCity); // если number больше или равен 3, то записываем текущее название города в массив городов второго игрока
		}
	}
}

function currentLastLetter() { //функция, которая запоминает последнюю букву названного игроком слова
	lastLetter = currentWord[currentWord.length - 1] //задаем переменную в которую записываем последнюю букву слова
}

function currentCityList() { //функция, которая удаляет из общего массива уже названные слова
	for (let i = 0; i < generalCityList.length; i++) { // перебираем общий массив городов
		if (currentWord == generalCityList[i]) { //если текущее слово равно одному из слов общего списка
			delete generalCityList[i]; //то мы удаляем его из массива общего слов
			return generalCityList // возвращаем обновленный массив
		}
	}
}

function randomGenerator(item) { // функция рандомного выбора игроков и городов из их массивов
	let randomItem = item[Math.floor(Math.random() * item.length)]; //назначаем в переменную рандомное значение выбранное из массива нужного и возвращаем его
	return randomItem // Math.floor - округляет до ближайшего меньшего целого числа.
}


oneCityList();
twoCityList();
currentLastLetter();
currentCityList();
randomGenerator(generalCityList);
console.log(generalCityList);
console.log(randomGenerator(twoPerson.cityList));
console.log(randomGenerator(firstStepUser));



console.log(4 * 'five');