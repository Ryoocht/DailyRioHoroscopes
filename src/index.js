const baseAztroURL = "https://sameer-kumar-aztro-v1.p.rapidapi.com";
const baseDevbrewerShortURL = "https://devbrewer-horoscope.p.rapidapi.com/today/short";
const baseDevbrewerLongURL = "https://devbrewer-horoscope.p.rapidapi.com/today/long";
const baseLoveCalculatorURL = "https://love-calculator.p.rapidapi.com/getPercentage";
const baseOpenWeatherURL = "https://api.openweathermap.org/data/2.5";
const searchForm = document.querySelector("#search-form");
const displayResultDiv = document.querySelector(".displayResultDiv");
const list = document.querySelector("#descList");
const calculateForm = document.querySelector("#calculateForm");
let selectedDay;
let luckyTime;

searchForm.addEventListener("submit", e => {
    e.preventDefault();
    showResult();
});

calculateForm.addEventListener("submit", e => {
    e.preventDefault();
    checkResult();
})

function getZodiacSigns(day, month){
    let zodiacName;
    if(month < 13 && day < 32){
        if (month == 3 && day >= 21 || month == 4 && day <= 19) {
            return zodiacName = "Aries";
        } else if (month == 4 && day >= 20 || month == 5 && day <= 20) {
            return zodiacName = "Taurus";
        } else if (month == 5 && day >= 21 || month == 6 && day <= 21) {
            return zodiacName = "Gemini";
        } else if (month == 6 && day >= 22 || month == 7 && day <= 22) {
            return zodiacName = "Cancer";
        } else if (month == 7 && day >= 23 || month == 8 && day <= 22) {
            return zodiacName = "Leo";
        } else if (month == 8 && day >= 23 || month == 9 && day <= 22) {
            return zodiacName = "Virgo";
        } else if (month == 9 && day >= 23 || month == 10 && day <= 23) {
            return zodiacName = "Libra";
        } else if (month == 10 && day >= 24 || month == 11 && day <= 22) {
            return zodiacName = "Scorpio";
        } else if (month == 11 && day >= 23 || month == 12 && day <= 21) {
            return zodiacName = "Sagittarius";
        } else if (month == 12 && day >= 22 || month == 1 && day <= 19) {
            return zodiacName = "Capricorn";
        } else if (month == 1 && day >= 20 || month == 2 && day <= 18) {
            return zodiacName = "Aquarius";
        } else {
            return zodiacName = "Pisces";
        }
    } else {
        alert("Invalid Date of Birth, Please try again.");
    }
}

function showResult(){
    const inputDay = document.getElementById("day-input").value;
    const inputMonth = document.getElementById("month-input").value;
    let zodiacSign = getZodiacSigns(parseInt(inputDay), parseInt(inputMonth));
    const dayDropdown = document.querySelector("#dayDropdown").value;
    if(dayDropdown === "selectTab"){
        return alert("Select Horoscope day")
    }
    const location = document.querySelector("#location").value;
    if(location === ""){
        return alert("Current Location cannot be empty");
    }
    selectedDay = dayDropdown;

    fetchAztroHoro(zodiacSign, dayDropdown);
    fetchDevbrewerShort(zodiacSign);
    fetchDevbrewerLong(zodiacSign);
    fetchCurrentWeather(location);
    
}

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
    const zodiac = document.querySelector("#yourZodiac"),
        compatibility = document.querySelector("#compatibility"),
        color = document.querySelector("#lucky_color"),
        number = document.querySelector("#lucky_number"),
        time = document.querySelector("#lucky_time"),
        mood = document.querySelector("#mood"),
        descList = document.querySelector("#descList"),
        desc = document.createElement("li");

    zodiac.innerText = `Your Zodiac Sign: ${zodiacSign}`;
    compatibility.innerText = `Zodiac Compatibility: ${horoObj.compatibility}`;
    color.innerText = `Lucky Color: ${horoObj.color}`;
    number.innerText = `Lucky Number: ${horoObj.lucky_number}`;
    time.innerText = `Lucky Time: ${horoObj.lucky_time}`;
    mood.innerText = `Mood: ${horoObj.mood}`;
    desc.innerText = horoObj.description;
    descList.appendChild(desc);
    luckyTime = horoObj.lucky_time;
}

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
    list.appendChild(desc);
    
    const title = document.querySelector("#matchTitle"),
        love = document.querySelector("#love"),
        friend = document.querySelector("#friendship"),
        career = document.querySelector("#career"),
        loveImg = document.querySelector("#loveImg"),
        friendImg = document.querySelector("#friendImg"),
        careerImg = document.querySelector("#careerImg"),
        loveZodiac = document.querySelector("#loveZodiac"),
        friendZodiac = document.querySelector("#friendZodiac"),
        careerZodiac = document.querySelector("#careerZodiac");

    title.innerText = "Matches";
    love.innerText = "LOVE";
    friend.innerText = "FRIENDSHIP";
    career.innerText = "CAREER";
    loveImg.src = zodiacImgs(horoObj["Matchs"].Love);
    friendImg.src = zodiacImgs(horoObj["Matchs"].Friendship);
    careerImg.src = zodiacImgs(horoObj["Matchs"].Career);
    loveZodiac.innerText = horoObj["Matchs"].Love;
    friendZodiac.innerText = horoObj["Matchs"].Friendship;
    careerZodiac.innerText = horoObj["Matchs"].Career;
}

function zodiacImgs(matchZodiac){
    let imgRef;
    switch (matchZodiac) {
        case "Aries": imgRef =  "./img/zodiacImgs/Aries.png"
            break;
        case "Taurus": imgRef =  "./img/zodiacImgs/Taurus.png"
            break;
        case "Gemini": imgRef =  "./img/zodiacImgs/Gemini.png"
            break;
        case "Cancer": imgRef =  "./img/zodiacImgs/Cancer.png"
            break;
        case "Leo": imgRef =  "./img/zodiacImgs/Leo.png"
            break;
        case "Virgo": imgRef =  "./img/zodiacImgs/Virgo.png"
            break;
        case "Libra": imgRef =  "./img/zodiacImgs/Libra.png"
            break;
        case "Scorpio": imgRef =  "./img/zodiacImgs/Scorpio.png"
            break;
        case "Sagittarius": imgRef =  "./img/zodiacImgs/Saggitarius.png"
            break;
        case "Capricorn": imgRef =  "./img/zodiacImgs/Capricorn.png"
            break;
        case "Aquarius": imgRef =  "./img/zodiacImgs/Aquarius.png"
            break;
        case "Pisces": imgRef =  "./img/zodiacImgs/Pisces.png"
            break;
    }
    return imgRef;
}

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
    const daily = document.querySelector("#dailyDesc"),
        health = document.querySelector("#healthDesc"),
        career = document.querySelector("#careerDesc"),
        love = document.querySelector("#loveDesc"),
        loveCalculatorEvent = document.querySelector("#loveCalculatorEvent");

    daily.innerText = horoObj[`${zodiacSign}`].Daily;
    health.innerText = horoObj[`${zodiacSign}`].Health;
    career.innerText = horoObj[`${zodiacSign}`].Career;
    love.innerText = horoObj[`${zodiacSign}`].Love;

    // loveCalculatorEvent.addEventListener("click", ) //invisible div will be appeared
}

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
    const calculateResult = document.querySelector("#calculateResult"),
        heartImg = document.querySelector("#heartImg"),
        comment = document.querySelector("#comment");
    calculateResult.innerText = `${result.percentage}%`;
    comment.innerText = `Comment: ${result.result}`;
    if(parseInt(result.percentage) >= 50){
        heartImg.src = "./img/hearts/heart.png";
    } else {
        heartImg.src = "./img/hearts/breakHeart.png";
    }
}

// OpenWeatherMap(weather) to get latitude & longitude for onecall
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

// Get hourly/daily weather based on the lucky-time
function fetchOneCall(latitude, longitude){
    fetch(`${baseOpenWeatherURL}/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely&appid=974057dc1632b35f6f14e11fe1ca1394`)
    .then(resp => resp.json())
    .then(resultObj => getHourlyWeather(resultObj, latitude, longitude))
    .catch(err => console.log(err));
}

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
    const title = document.querySelector("#weatherTitle"),
        location = document.querySelector("#weatherLocation"),
        luckyTime = document.querySelector("#luckyTime"),
        temperature = document.querySelector("#temperature"),
        description = document.querySelector("#description"),
        feelslike = document.querySelector("#feelslike");
    title.innerText = "Lucky Time Weather";

    const hourlyData = async ()=> {
        const timeStamp = await getLuckyTime().then(result => convertToTimestamp(result, selectedDay))
        if(parseInt(timeStamp) >= (Date.parse(new Date())/1000)){
            for (let i = 0; i < resultObj["hourly"].length; i++) {
                const dt = resultObj["hourly"][i]["dt"];
                if(parseInt(timeStamp) === dt){
                    const locationStr = resultObj["timezone"];
                    location.innerText = locationStr.split("/")[1];
                    let unixDate = new Date(timeStamp * 1000);
                    luckyTime.innerText = `${unixDate.getHours()}:00`;

                    console.log(resultObj["hourly"][i])
                }
            }
        } else {
            fetch(`${baseOpenWeatherURL}/onecall/timemachine?lat=${latitude}&lon=${longitude}&dt=${timeStamp}&appid=974057dc1632b35f6f14e11fe1ca1394`)
            .then(resp => resp.json())
            .then(hourlyObj => {
                hourlyObj["current"]
            })
            .catch(err => console.log(err));
        }
    }
    hourlyData();
}