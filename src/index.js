const baseAztroURL = "https://sameer-kumar-aztro-v1.p.rapidapi.com";
const baseDevbrewerShortURL = "https://devbrewer-horoscope.p.rapidapi.com/today/short";
const baseDevbrewerLongURL = "https://devbrewer-horoscope.p.rapidapi.com/today/long";
const searchForm = document.querySelector("#search-form");
const displayResultDiv = document.querySelector(".displayResultDiv");
const list = document.querySelector("#descList");

searchForm.addEventListener("submit", e => {
    e.preventDefault();
    showResult();
});

function getZodiacSigns(day, month){
    let zodiacName = "";
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
    fetchAztroHoro(zodiacSign, dayDropdown);
    fetchDevbrewerShort(zodiacSign);
    fetchDevbrewerLong(zodiacSign);
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
    const zodiac = document.createElement("h1"),
        compatibility = document.createElement("h3"),
        color = document.createElement("h3"),
        number = document.createElement("h3"),
        time = document.createElement("h3"),
        mood = document.createElement("h3"),
        desc = document.createElement("li");
    zodiac.innerText = `Your Zodiac Sign: ${zodiacSign}`;
    compatibility.innerText = `Zodiac Compatibility: ${horoObj.compatibility}`;
    color.innerText = `Lucky Color: ${horoObj.color}`;
    number.innerText = `Lucky Number: ${horoObj.lucky_number}`;
    time.innerText = `Lucky Time: ${horoObj.lucky_time}`;
    mood.innerText = `Mood: ${horoObj.mood}`;
    desc.innerText = horoObj.description;
    list.appendChild(desc);
    displayResultDiv.append(zodiac ,compatibility, color, number, time, mood, list);
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
    
    const loveMatchDiv = document.querySelector(".loveMatchDiv"),
        title = document.querySelector(".title"),
        divContainers = document.querySelector("divContainers"),
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

    divContainers.append(love, friend, career, loveImg, friendImg, careerImg, loveZodiac, friendZodiac, careerZodiac);
    loveMatchDiv.append(title, divContainers);
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
    .then(horoObj => console.log(horoObj)) //renderLong(horoObj))
    .catch(err => console.log(err));
}

function renderLong(horoObj){

}