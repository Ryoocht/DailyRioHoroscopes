const baseAztroURL = "https://sameer-kumar-aztro-v1.p.rapidapi.com";
const searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", e => {
    e.preventDefault();
    showResult();
});

function getZodiacSigns(day, month){
    console.log(day, month)
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
    fetch(`${baseAztroURL}/?sign=${zodiacSign}&day=${dayDropdown}`, {
        "method": "POST",
	    "headers": {
		"x-rapidapi-key": "b7a882fa24msh824e4db22062f83p1d21a1jsn6da2b4c75e08",
		"x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com"
	    }
    })
    .then(resp => resp.json())
    .then(horoObj => renderHoroScope(horoObj))
    .catch(err => console.error(err));
}


function renderHoroScope(horoObj){
    const displayResultDiv = document.querySelector(".displayResultDiv");
    const zodiac = document.createElement("h1"),
        color = document.createElement("h3"),
        number = document.createElement("h3"),
        time = document.createElement("h3"),
        mood = document.createElement("h3"),
        desc = document.createElement("p");
    zodiac.innerText = `Zodiac Sign: ${horoObj.compatibility}`;
    color.innerText = `Lucky Color: ${horoObj.color}`;
    number.innerText = `Lucky Number: ${horoObj.lucky_number}`;
    time.innerText = `Lucky Time: ${horoObj.lucky_time}`;
    mood.innerText = `Mood: ${horoObj.mood}`;
    desc.innerText = horoObj.description;
    displayResultDiv.append(zodiac, color, number, time, mood, desc);
}