const baseAztroURL = "https://sameer-kumar-aztro-v1.p.rapidapi.com",
    baseDevbrewerShortURL = "https://devbrewer-horoscope.p.rapidapi.com/today/short",
    baseDevbrewerLongURL = "https://devbrewer-horoscope.p.rapidapi.com/today/long",
    baseLoveCalculatorURL = "https://love-calculator.p.rapidapi.com/getPercentage",
    baseOpenWeatherURL = "https://api.openweathermap.org/data/2.5",
    baseQuotesURL = "https://quotejoy.p.rapidapi.com/list-quotes",
    baseJokesURL = "https://jokeapi-v2.p.rapidapi.com/joke",
    searchForm = document.querySelector("#search-form"),
    displayResultDiv = document.querySelector(".displayResultDiv"),
    descList = document.querySelector("#descList"),
    calculateForm = document.querySelector("#calculateForm");
let selectedDay;
let luckyTime;

searchForm.addEventListener("submit", e => {
    e.preventDefault();
    showResult();
    visibilityOn();
});

calculateForm.addEventListener("submit", e => {
    e.preventDefault();
    checkResult();
})

function showResult(){
    const inputDay = document.getElementById("day-input").value;
    const inputMonth = document.getElementById("month-input").value;
    const searchZodiacSign = new Zodiac();
    searchZodiacSign.setDate(inputDay, inputMonth);
    const zodiacSign = searchZodiacSign.getZodiacSigns();
    selectedDay = document.querySelector("#dayDropdown").value;
    const location = document.querySelector("#location").value;
   
    dayDetector(selectedDay, location)
    fetchAztroHoro(zodiacSign, selectedDay);
    fetchDevbrewerShort(zodiacSign);
    fetchDevbrewerLong(zodiacSign);
    fetchCurrentWeather(location);
}

function dayDetector(selectedDay, location){
    if(selectedDay === "selectTab"){
        return alert("Select Horoscope day")
    }
    if(location === ""){
        return alert("Current Location cannot be empty");
    }
}


//Main Horoscope result
function fetchAztroHoro(zodiacSign, dayDropdown){
    fetch(`${baseAztroURL}/?sign=${zodiacSign}&day=${dayDropdown}`, {
        "method": "POST",
	    "headers": {
		"x-rapidapi-key": "b7a882fa24msh824e4db22062f83p1d21a1jsn6da2b4c75e08",
		"x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com"
	    }
    })
    .then(resp => resp.json())
    .then(horoObj => renderHoroScope(horoObj, zodiacSign))
    .catch(err => console.error(err));
}

function renderHoroScope(horoObj, zodiacSign){
    const desc = document.createElement("li");

    const mainZodiacImg = new Zodiac();
    mainZodiacImg.setMainImg(zodiacSign);
    const mainZodiacURL = mainZodiacImg.getMainImg();

    document.querySelector("#resultZodiacImg").src = mainZodiacURL;
    document.querySelector("#yourZodiac").innerText = zodiacSign;
    document.querySelector("#compatibility").innerText = horoObj.compatibility;
    document.querySelector("#lucky_color").innerText = horoObj.color;
    document.querySelector("#lucky_number").innerText = horoObj.lucky_number;
    document.querySelector("#lucky_time").innerText = horoObj.lucky_time;
    document.querySelector("#mood").innerText = horoObj.mood;
    desc.innerText = horoObj.description;
    descList.appendChild(desc);
    luckyTime = horoObj.lucky_time;
    fetchQuotes(horoObj.lucky_number);
    fetchJokes(horoObj.lucky_number);
}

//Match Horoscope results
function fetchDevbrewerShort(zodiacSign){
    fetch(`${baseDevbrewerShortURL}/${zodiacSign}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "b7a882fa24msh824e4db22062f83p1d21a1jsn6da2b4c75e08",
		"x-rapidapi-host": "devbrewer-horoscope.p.rapidapi.com"
	}
    })
    .then(resp => resp.json())
    .then(horoObj => renderShort(horoObj, zodiacSign))
    .catch(err => console.error(err));
}

function renderShort(horoObj, zodiacSign){
    const desc = document.createElement("li");
    desc.innerText = horoObj[`${zodiacSign}`].Today;
    descList.appendChild(desc);
    const loveDesc = horoObj["Matchs"].Love,
        friendDesc = horoObj["Matchs"].Friendship,
        careerDesc = horoObj["Matchs"].Career;

    const matchZodiacImg = new Zodiac();

    document.querySelector("#matchTitle").innerText = "Matches";
    document.querySelector("#love").innerText = "LOVE";
    document.querySelector("#friendship").innerText = "FRIENDSHIP";
    document.querySelector("#career").innerText = "CAREER";
    document.querySelector("#loveImg").src = matchZodiacImg.getMatchImg(loveDesc);
    document.querySelector("#friendImg").src = matchZodiacImg.getMatchImg(friendDesc);
    document.querySelector("#careerImg").src = matchZodiacImg.getMatchImg(careerDesc);
    document.querySelector("#loveZodiac").innerText = loveDesc;
    document.querySelector("#friendZodiac").innerText = friendDesc;
    document.querySelector("#careerZodiac").innerText = careerDesc;
}

//Long Horoscope Descriptions by categories
function fetchDevbrewerLong(zodiacSign){
    fetch(`${baseDevbrewerLongURL}/${zodiacSign}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "b7a882fa24msh824e4db22062f83p1d21a1jsn6da2b4c75e08",
		"x-rapidapi-host": "devbrewer-horoscope.p.rapidapi.com"
	    }
    })
    .then(resp => resp.json())
    .then(horoObj => renderLong(horoObj, zodiacSign))
    .catch(err => console.log(err));
}

function renderLong(horoObj, zodiacSign){
    document.querySelector("#dailyDesc").innerText = horoObj[`${zodiacSign}`].Daily;
    document.querySelector("#healthDesc").innerText = horoObj[`${zodiacSign}`].Health;
    document.querySelector("#careerDesc").innerText = horoObj[`${zodiacSign}`].Career;
    document.querySelector("#loveDesc").innerText = horoObj[`${zodiacSign}`].Love;
}

/*
    Render weather detail based on lucky time and location
    step1: Get location data (get latitude & longitude by input location)
    step2: Get hourly weather data in the location (in next 3 days data)
    step3: prepare parameters value to find exact weather time object
    preparation: timestamp converter + getLuckyTime to get lucky time
    step4: Find the lucky time weather if selected day is past weather then use a historical weather data.
*/
function fetchCurrentWeather(location){
    fetch(`${baseOpenWeatherURL}/weather?q=${location}&appid=974057dc1632b35f6f14e11fe1ca1394`)
    .then(resp => resp.json())
    .then(latlonObj => getLatLonData(latlonObj))
    .catch(err => console.error(err));
}

function getLatLonData(latlonObj){
    let latitude = latlonObj["coord"].lat;
    let longitude = latlonObj["coord"].lon;
    fetchOneCall(latitude, longitude);
}

function fetchOneCall(latitude, longitude){
    fetch(`${baseOpenWeatherURL}/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely&appid=974057dc1632b35f6f14e11fe1ca1394`)
    .then(resp => resp.json())
    .then(resultObj => getHourlyWeather(resultObj, latitude, longitude))
    .catch(err => console.log(err));
}

//Wait untill lucky time has value returned
function luckyTimeInterval(){
    return new Promise(resolve => {
        let setIntervalId = setInterval(findLuckyTimeValue, 500);
        const maxRetryCount = 10;
        let retryCount = 0;
        function findLuckyTimeValue(){
            retryCount++;
            if(retryCount > maxRetryCount){
                clearInterval(setIntervalId);
                console.error("Cound not get lucky time");
            }
            if(luckyTime !== undefined){
                clearInterval(setIntervalId);
                resolve(luckyTime);
            }
        }
    })
}

async function getLuckyTime(){
    const result = await luckyTimeInterval();
    return result;
}

//Convert Date to unix_timestamp
function convertToTimestamp(luckyTime, selectedDay){
    //Today
    let now = new Date(),
        nYear = now.getFullYear(),
        nMonth = now.getMonth() + 1,
        nDate = now.getDate();
        today = `${nYear}-${nMonth}-${nDate}`;
    //Yesterday
    let dayBefore = new Date(nYear, nMonth, (nDate - 1)),
        yYear = dayBefore.getFullYear(),
        yMonth = dayBefore.getMonth(),
        yDate = dayBefore.getDate();
        yesterday = `${yYear}-${yMonth}-${yDate}`;
    //Tomorrow
    let dayAfter = new Date(nYear, nMonth, (nDate + 1)),
        tYear = dayAfter.getFullYear(),
        tMonth = dayAfter.getMonth(),
        tDate = dayAfter.getDate();
        tomorrow = `${tYear}-${tMonth}-${tDate}`;
    //Split time and am/pm
    let digit = parseInt(luckyTime.match(/^\d{1,2}/));
    let ampm = luckyTime.match(/am$|pm$/gi);
    let formatTime;
    
    function timeConverter(day){
        if(ampm[0] === "pm"){
            const time = `${digit + 12}:00:00`;
            formatTime = day + " " + time;
        } else {
            if(digit < 10){
                const time = `0${digit}:00:00`;
                formatTime = day + " " + time;
            } else {
                const time = `${digit}:00:00`;
                formatTime = day + " " + time;
            }
        }
    }

    switch(selectedDay){
        case "today": 
            timeConverter(today);
            break;
        case "yesterday":
            timeConverter(yesterday);
            break;
        case "tomorrow":
            timeConverter(tomorrow);
            break;
    }
    let timeStampMils = String(Date.parse(formatTime));
    const timeStamp = timeStampMils.match(/\d{10}/);
    return timeStamp[0];
}

function getHourlyWeather(resultObj, latitude, longitude){
    document.querySelector("#weatherTitle").innerText = "Lucky Time Weather";

    const hourlyData = async ()=> {
        const timeStamp = await getLuckyTime().then(result => convertToTimestamp(result, selectedDay))
        if(parseInt(timeStamp) >= (Date.parse(new Date())/1000)){
            for (let i = 0; i < resultObj["hourly"].length; i++) {
                const dt = resultObj["hourly"][i]["dt"];
                if(parseInt(timeStamp) === dt){
                    renderHourlyWeather(resultObj, timeStamp, resultObj["hourly"][i]);
                }
            }
        } else {
            fetch(`${baseOpenWeatherURL}/onecall/timemachine?lat=${latitude}&lon=${longitude}&dt=${timeStamp}&appid=974057dc1632b35f6f14e11fe1ca1394`)
            .then(resp => resp.json())
            .then(hourlyObj => {
                renderHourlyWeather(hourlyObj, hourlyObj["current"]["dt"], hourlyObj["current"])
            })
            .catch(err => console.log(err));
        }
    }

    function renderHourlyWeather(obj, timestamp, weatherObj){
        document.querySelector("#weatherLocation").innerText = obj["timezone"].split("/")[1];
        let unixDate = new Date(timestamp * 1000);
        document.querySelector("#luckyTime").innerText = `${unixDate.getHours()}:00`;
        function kelToCel(kelvin){
            return Math.round((kelvin - 272.15) * 10) / 10;
        }
        document.querySelector("#temperature").innerText = `${kelToCel(weatherObj["temp"])}°`;
        document.querySelector("#description").innerText = weatherObj["weather"][0]["main"];
        feelslike.innerText = `Feels like ${kelToCel(weatherObj["feels_like"])}°`;
    }

    hourlyData();
}

// Quote sort by lucky number
function fetchQuotes(luckyNumber){
    fetch(`${baseQuotesURL}?page=${luckyNumber}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "b7a882fa24msh824e4db22062f83p1d21a1jsn6da2b4c75e08",
		"x-rapidapi-host": "quotejoy.p.rapidapi.com"
	}
    })
    .then(resp => resp.json())
    .then(quoteObj => renderQuotes(quoteObj, luckyNumber))
    .catch(err => console.error(err));
}

function renderQuotes(quoteObj, luckyNumber){
    document.querySelector("#quoteTitle").innerText = "Lucky Number Quotes";
    document.querySelector("#quote").innerText = `"${quoteObj["quotes"][Math.floor(Math.random() * quoteObj.quotes.length)]["quote"]}"`;

    const quoteBtn = document.createElement("button");
    quoteBtn.innerText = "Get other quote"
    document.querySelector("#quoteContainer").appendChild(quoteBtn);
    quoteBtn.addEventListener("click", function() {
        fetchQuotes(luckyNumber);
        this.remove();
    })
}

//Joke sort by lucky number
function fetchJokes(luckyNumber){
    fetch(`${baseJokesURL}/Any?idRange=${luckyNumber}&blacklistFlags=nsfw%2Cracist`, {
        "method": "GET",
	    "headers": {
		"x-rapidapi-key": "b7a882fa24msh824e4db22062f83p1d21a1jsn6da2b4c75e08",
		"x-rapidapi-host": "jokeapi-v2.p.rapidapi.com"
	    }
    })
    .then(resp => resp.json())
    .then(jokeObj => renderJokes(jokeObj))
    .catch(err => console.log(err));
}

function renderJokes(jokeObj){
    const setup = document.querySelector("#setup"),
        delivery = document.querySelector("#delivery");
    document.querySelector("#jokeTitle").innerText = "Lucky Number Jokes";
    if(jokeObj["error"] === true){
        setup.innerText = "This is a censored jokes";
        delivery.innerText = "No joke today."
    } else {
        setup.innerText = jokeObj["setup"];
        delivery.innerText = jokeObj["delivery"];
    }
}

//Love Calculator
function checkResult(){
    const yourName = document.querySelector("#yourName").value;
    const partnerName = document.querySelector("#partnerName").value;
    fetchLoveCalculator(yourName, partnerName);
}

function fetchLoveCalculator(yourName, partnerName){
    fetch(`${baseLoveCalculatorURL}?fname=${yourName}&sname=${partnerName}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "b7a882fa24msh824e4db22062f83p1d21a1jsn6da2b4c75e08",
            "x-rapidapi-host": "love-calculator.p.rapidapi.com"
        }
    })
    .then(resp => resp.json())
    .then(result => renderLoveResult(result))
    .catch(err => console.error(err));
}

function renderLoveResult(result){
    const heartImg = document.querySelector("#heartImg");
        
    document.querySelector("#calculateResult").innerText = `${result.percentage}%`;
    document.querySelector("#comment").innerText = `Comment: ${result.result}`;
    if(parseInt(result.percentage) >= 50){
        heartImg.src = "./img/hearts/heart.png";
    } else {
        heartImg.src = "./img/hearts/breakHeart.png";
    }
}

// All result contents invisible till user submits
function visibilityOn(){
    let visible = document.querySelector("#visibility");
    visible.style.visibility = "visible";
}